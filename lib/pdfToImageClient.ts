/**
 * Client-side PDF to Image conversion using PDF.js
 * This is a fallback when server-side canvas is not available
 */

export async function convertPdfPageToImage(
  pdfFile: File,
  pageNumber: number,
  format: 'png' | 'jpg' = 'png',
  scale: number = 2.0
): Promise<Blob> {
  try {
    // Dynamically import PDF.js
    const pdfjs = await import('pdfjs-dist');
    
    // Set up worker - use CDN with proper error handling
    if (typeof window !== 'undefined' && pdfjs.GlobalWorkerOptions) {
      const version = pdfjs.version || '4.10.38';
      // Use jsdelivr CDN - reliable and supports CORS
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
    }

    // Load PDF
    const arrayBuffer = await pdfFile.arrayBuffer();
    
    // Wait a moment for worker to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const loadingTask = pdfjs.getDocument({ 
      data: arrayBuffer,
      verbosity: 0, // Suppress warnings
    });
    
    const pdf = await loadingTask.promise;
    
    // Ensure PDF is fully loaded
    if (!pdf || !pdf.numPages) {
      throw new Error('Failed to load PDF. The file may be corrupted.');
    }

    // Ensure PDF is fully loaded by getting page count
    const totalPages = pdf.numPages;
    if (!totalPages || totalPages < 1) {
      throw new Error('PDF appears to be empty or corrupted.');
    }

    // Validate page number (pageNumber is 1-indexed from UI)
    if (pageNumber < 1 || pageNumber > totalPages) {
      throw new Error(`Page ${pageNumber} is out of range. PDF has ${totalPages} pages.`);
    }

    // Get the page - ensure PDF is ready
    // Note: PDF.js uses 1-indexed page numbers (not 0-indexed)
    let page;
    try {
      // Small delay to ensure PDF is fully parsed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verify PDF is valid
      if (!pdf || !pdf.numPages) {
        throw new Error('PDF document is not properly loaded.');
      }
      
      // Ensure page number is valid
      if (pageNumber < 1 || pageNumber > totalPages) {
        throw new Error(`Page ${pageNumber} is out of range (1-${totalPages}).`);
      }
      
      // Get the page (PDF.js uses 1-indexed page numbers)
      page = await pdf.getPage(pageNumber);
      
      if (!page) {
        throw new Error(`Failed to retrieve page ${pageNumber}.`);
      }
    } catch (pageError: any) {
      console.error('Page access error:', {
        error: pageError.message,
        pageNumber,
        totalPages,
        pdfReady: !!pdf,
        numPages: pdf?.numPages,
        stack: pageError.stack?.substring(0, 200)
      });
      
      // Provide helpful error message
      if (pageError.message && (
        pageError.message.includes('Invalid page') || 
        pageError.message.includes('page request') ||
        pageError.message.includes('Cannot access')
      )) {
        throw new Error(`Unable to access page ${pageNumber}. This may be a PDF.js compatibility issue. The standalone server-side conversion is recommended.`);
      }
      throw pageError;
    }
    const viewport = page.getViewport({ scale: parseFloat(scale.toString()) });

    // Create canvas with proper dimensions
    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to initialize canvas. Your browser may not support canvas rendering.');
    }

    // Set white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Render PDF page to canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate image from canvas. Please try again.'));
          }
        },
        format === 'jpg' ? 'image/jpeg' : 'image/png',
        0.9
      );
    });
  } catch (error: any) {
    // Provide more specific error messages
    if (error.message) {
      throw error;
    }
    throw new Error(`PDF conversion failed: ${error.toString()}`);
  }
}

