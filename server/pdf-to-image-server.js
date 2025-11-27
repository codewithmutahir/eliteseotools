/**
 * Standalone Node.js server for PDF to Image conversion
 * Run with: node server/pdf-to-image-server.js
 * Requires: canvas, pdfjs-dist, sharp, express, multer
 */

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const PORT = process.env.PDF_SERVER_PORT || 3002;

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Try to import canvas
let createCanvas = null;
let canvasAvailable = false;

try {
  const canvas = require('canvas');
  createCanvas = canvas.createCanvas;
  canvasAvailable = true;
  console.log('✅ Canvas loaded successfully');
} catch (error) {
  console.warn('⚠️  Canvas not available. Please install: npm install canvas');
  console.warn('   On Windows, you may need Visual Studio Build Tools');
  canvasAvailable = false;
}

// Import PDF.js using dynamic import (ESM)
let pdfjs = null;

async function initializePdfJs() {
  try {
    // Use dynamic import for ESM module
    const pdfjsModule = await import('pdfjs-dist/legacy/build/pdf.mjs');
    pdfjs = pdfjsModule.default || pdfjsModule;
    console.log('✅ PDF.js loaded successfully');
    
    // Disable worker for server-side
    if (pdfjs.GlobalWorkerOptions) {
      pdfjs.GlobalWorkerOptions.workerSrc = '';
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to load PDF.js:', error.message);
    return false;
  }
}

// Initialize PDF.js before starting server
let pdfjsReady = false;

initializePdfJs().then((success) => {
  pdfjsReady = success;
  if (!success) {
    console.error('❌ Cannot start server without PDF.js');
    process.exit(1);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware to check if PDF.js is ready
app.use((req, res, next) => {
  if (!pdfjsReady) {
    return res.status(503).json({
      error: 'PDF.js is still initializing. Please wait a moment and try again.',
    });
  }
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    canvasAvailable,
    pdfjsReady,
    pdfjsVersion: pdfjs?.version || 'unknown',
  });
});

// Convert PDF page to image
app.post('/convert', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    if (!canvasAvailable) {
      return res.status(503).json({
        error: 'Canvas not available. Please install canvas package.',
        requiresCanvas: true,
      });
    }

    if (!pdfjs) {
      return res.status(503).json({
        error: 'PDF.js not initialized',
      });
    }

    const pageNumber = parseInt(req.body.page) || 1;
    const format = (req.body.format || 'png').toLowerCase();
    const scale = parseFloat(req.body.scale) || 2.0;

    const buffer = Buffer.from(req.file.buffer);

    // Load PDF
    const loadingTask = pdfjs.getDocument({
      data: buffer,
      useSystemFonts: true,
      verbosity: 0,
    });

    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;

    if (pageNumber < 1 || pageNumber > totalPages) {
      return res.status(400).json({
        error: `Invalid page number. PDF has ${totalPages} pages.`,
      });
    }

    // Get page (PDF.js uses 1-indexed page numbers)
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });

    // Create canvas
    const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height));
    const context = canvas.getContext('2d');

    // Set white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Render PDF page
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Convert canvas to buffer
    const canvasBuffer = canvas.toBuffer('image/png');

    // Convert to requested format
    let imageBuffer;
    let contentType;
    let fileExtension;

    if (format === 'jpg' || format === 'jpeg') {
      imageBuffer = await sharp(canvasBuffer)
        .jpeg({ quality: 90 })
        .toBuffer();
      contentType = 'image/jpeg';
      fileExtension = 'jpg';
    } else {
      imageBuffer = await sharp(canvasBuffer)
        .png({ quality: 90 })
        .toBuffer();
      contentType = 'image/png';
      fileExtension = 'png';
    }

    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="page_${pageNumber}.${fileExtension}"`,
      'X-Page-Number': pageNumber.toString(),
      'X-Total-Pages': totalPages.toString(),
    });

    res.send(imageBuffer);
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      error: error.message || 'Failed to convert PDF page to image',
    });
  }
});

// Get page count
app.post('/page-count', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    if (!pdfjs) {
      return res.status(503).json({
        error: 'PDF.js not initialized',
      });
    }

    const buffer = Buffer.from(req.file.buffer);
    const loadingTask = pdfjs.getDocument({
      data: buffer,
      verbosity: 0,
    });

    const pdf = await loadingTask.promise;
    res.json({
      pageCount: pdf.numPages,
      serverSideAvailable: canvasAvailable,
    });
  } catch (error) {
    console.error('Page count error:', error);
    res.status(500).json({
      error: error.message || 'Failed to get page count',
    });
  }
});

// Start server after PDF.js is initialized
initializePdfJs().then((success) => {
  if (!success) {
    console.error('❌ Cannot start server without PDF.js');
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log(`\n🚀 PDF to Image Server running on http://localhost:${PORT}`);
    console.log(`📄 Health check: http://localhost:${PORT}/health`);
    console.log(`🔄 Convert endpoint: POST http://localhost:${PORT}/convert`);
    if (!canvasAvailable) {
      console.log('\n⚠️  WARNING: Canvas is not available. Server-side conversion will not work.');
      console.log('   Install canvas: npm install canvas');
      console.log('   On Windows, install Visual Studio Build Tools first.\n');
    } else {
      console.log('✅ Server ready for PDF to image conversion\n');
    }
  });
});
