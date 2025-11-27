import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

// Try to import canvas for server-side rendering
let createCanvas: any = null;
let loadImage: any = null;
let canvasAvailable = false;

try {
  const canvas = require('canvas');
  createCanvas = canvas.createCanvas;
  loadImage = canvas.loadImage;
  canvasAvailable = true;
} catch (error) {
  console.warn('Canvas not available. Server-side PDF to image conversion requires canvas package.');
  canvasAvailable = false;
}

// Dynamic import for pdfjs-dist (server-side)
async function getPdfJs() {
  try {
    // Use legacy build for Node.js compatibility
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    return pdfjs;
  } catch (error) {
    try {
      // Fallback to standard import
      const pdfjs = await import('pdfjs-dist');
      return pdfjs;
    } catch (e) {
      console.error('Failed to load pdfjs-dist:', e);
      return null;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const pageNumber = formData.get('page') ? parseInt(formData.get('page') as string) : null;
    const format = (formData.get('format') as string) || 'png'; // png or jpg
    const scale = formData.get('scale') ? parseFloat(formData.get('scale') as string) : 2.0; // DPI multiplier

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get page count using pdf-lib (fast and reliable)
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();

    // Return page count for initial request
    if (pageNumber === null) {
      return NextResponse.json({
        pageCount,
        serverSideAvailable: canvasAvailable,
        message: canvasAvailable 
          ? 'PDF loaded successfully. Server-side conversion available.' 
          : 'PDF loaded. Using client-side conversion (canvas not installed).',
      });
    }

    // Validate page number
    if (pageNumber < 1 || pageNumber > pageCount) {
      return NextResponse.json(
        { error: `Invalid page number. PDF has ${pageCount} pages.` },
        { status: 400 }
      );
    }

    // Check if canvas is available for server-side conversion
    if (!canvasAvailable || !createCanvas) {
      // Try to use standalone PDF server if available
      const pdfServerUrl = process.env.PDF_SERVER_URL || 'http://localhost:3002';
      
      try {
        // Proxy request to standalone PDF server
        // Create FormData with the file buffer
        const formDataForServer = new FormData();
        const fileBlob = new Blob([buffer], { type: file.type || 'application/pdf' });
        formDataForServer.append('file', fileBlob, file.name);
        formDataForServer.append('page', pageNumber.toString());
        formDataForServer.append('format', format);
        formDataForServer.append('scale', scale.toString());

        const serverResponse = await fetch(`${pdfServerUrl}/convert`, {
          method: 'POST',
          body: formDataForServer,
          // Don't set Content-Type header - let fetch set it with boundary
        });

        if (serverResponse.ok) {
          const imageBuffer = await serverResponse.arrayBuffer();
          const contentType = serverResponse.headers.get('content-type') || 'image/png';
          const fileExtension = format === 'jpg' || format === 'jpeg' ? 'jpg' : 'png';

          return new NextResponse(imageBuffer, {
            headers: {
              'Content-Type': contentType,
              'Content-Disposition': `attachment; filename="page_${pageNumber}.${fileExtension}"`,
              'X-Page-Number': pageNumber.toString(),
              'X-Total-Pages': pageCount.toString(),
              'X-Format': format,
            },
          });
        } else {
          const errorData = await serverResponse.json().catch(() => ({}));
          console.warn('PDF server error:', errorData);
        }
      } catch (serverError: any) {
        console.warn('Standalone PDF server not available:', serverError.message);
      }

      // Fallback to client-side
      return NextResponse.json(
        { 
          error: 'Server-side conversion requires canvas package or standalone PDF server.',
          useClientSide: true,
          requiresCanvas: true,
          instructions: 'Run: npm run pdf-server (in a separate terminal)',
        },
        { status: 503 }
      );
    }

    // Convert PDF page to image using pdfjs-dist and canvas (SERVER-SIDE)
    const pdfjs = await getPdfJs();
    if (!pdfjs) {
      return NextResponse.json(
        { error: 'Failed to load PDF.js library.' },
        { status: 500 }
      );
    }

    // Disable worker for server-side (not needed in Node.js)
    if (pdfjs.GlobalWorkerOptions) {
      pdfjs.GlobalWorkerOptions.workerSrc = '';
    }

    // Load PDF document
    const loadingTask = pdfjs.getDocument({ 
      data: buffer,
      useSystemFonts: true,
      verbosity: 0, // Suppress warnings
    });
    
    const pdf = await loadingTask.promise;

    // Validate PDF loaded correctly
    if (!pdf || !pdf.numPages || pdf.numPages !== pageCount) {
      return NextResponse.json(
        { error: 'Failed to load PDF. Page count mismatch.' },
        { status: 500 }
      );
    }

    // Get the specific page (PDF.js uses 1-indexed page numbers)
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: parseFloat(scale.toString()) });

    // Create canvas with proper dimensions
    const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height));
    const context = canvas.getContext('2d');

    // Set white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Render PDF page to canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Convert canvas to buffer
    const canvasBuffer = canvas.toBuffer('image/png');

    // Convert to requested format using sharp
    let imageBuffer: Buffer;
    let contentType: string;
    let fileExtension: string;

    if (format.toLowerCase() === 'jpg' || format.toLowerCase() === 'jpeg') {
      imageBuffer = await sharp(canvasBuffer)
        .jpeg({ quality: 90 })
        .toBuffer();
      contentType = 'image/jpeg';
      fileExtension = 'jpg';
    } else {
      // Default to PNG
      imageBuffer = await sharp(canvasBuffer)
        .png({ quality: 90 })
        .toBuffer();
      contentType = 'image/png';
      fileExtension = 'png';
    }

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="page_${pageNumber}.${fileExtension}"`,
        'X-Page-Number': pageNumber.toString(),
        'X-Total-Pages': pageCount.toString(),
        'X-Format': format,
      },
    });
  } catch (error: any) {
    console.error('PDF to images error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to convert PDF page to image',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
