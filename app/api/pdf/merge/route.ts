import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (files.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 PDF files are required' },
        { status: 400 }
      );
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Process each PDF file
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();

    return new Response(mergedPdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'X-Page-Count': mergedPdf.getPageCount().toString(),
      },
    });
  } catch (error: any) {
    console.error('PDF merge error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to merge PDFs' },
      { status: 500 }
    );
  }
}

