import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const pageRanges = formData.get('pageRanges') as string; // e.g., "1-3,5,7-9"

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();

    // Parse page ranges
    const pages = parsePageRanges(pageRanges, totalPages);

    if (pages.length === 0) {
      return NextResponse.json(
        { error: 'No valid pages specified' },
        { status: 400 }
      );
    }

    // Create new PDF with selected pages
    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, pages);
    copiedPages.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'X-Total-Pages': totalPages.toString(),
        'X-Extracted-Pages': pages.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('PDF split error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to split PDF' },
      { status: 500 }
    );
  }
}

function parsePageRanges(rangeString: string, totalPages: number): number[] {
  const pages: Set<number> = new Set();

  if (!rangeString) return [];

  const ranges = rangeString.split(',').map((r) => r.trim());

  for (const range of ranges) {
    if (range.includes('-')) {
      const [start, end] = range.split('-').map((n) => parseInt(n.trim()));
      for (let i = start; i <= end && i <= totalPages; i++) {
        if (i > 0) pages.add(i - 1); // Convert to 0-indexed
      }
    } else {
      const pageNum = parseInt(range);
      if (pageNum > 0 && pageNum <= totalPages) {
        pages.add(pageNum - 1); // Convert to 0-indexed
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

