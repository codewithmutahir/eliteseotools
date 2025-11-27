import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

// Dynamic import to handle pdf-parse
async function extractTextWithPdfParse(buffer: Buffer) {
  try {
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);
    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info,
      metadata: data.metadata,
    };
  } catch (error) {
    console.error('pdf-parse error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Try to extract text using pdf-parse
    const extracted = await extractTextWithPdfParse(buffer);
    
    if (extracted) {
      return NextResponse.json({
        success: true,
        text: extracted.text,
        pageCount: extracted.numPages,
        info: extracted.info,
        metadata: extracted.metadata,
        wordCount: extracted.text.split(/\s+/).filter(w => w.length > 0).length,
        characterCount: extracted.text.length,
      });
    }
    
    // Fallback to metadata only if pdf-parse fails
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();
    const title = pdfDoc.getTitle() || 'Untitled';
    const author = pdfDoc.getAuthor() || 'Unknown';
    const subject = pdfDoc.getSubject() || '';
    
    return NextResponse.json({
      success: false,
      message: 'Full text extraction failed. Showing metadata only.',
      pageCount,
      title,
      author,
      subject,
      note: 'pdf-parse may not be properly installed or the PDF format is not supported.',
    });
  } catch (error: any) {
    console.error('PDF text extraction error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to extract text from PDF' },
      { status: 500 }
    );
  }
}

