import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Save with compression options
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    });

    const originalSize = arrayBuffer.byteLength;
    const compressedSize = pdfBytes.length;
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    return new Response(new Blob([pdfBytes], { type: 'application/pdf' }), {
      headers: {
        'Content-Type': 'application/pdf',
        'X-Original-Size': originalSize.toString(),
        'X-Compressed-Size': compressedSize.toString(),
        'X-Savings': savings,
      },
    });
  } catch (error: any) {
    console.error('PDF compression error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to compress PDF' },
      { status: 500 }
    );
  }
}

