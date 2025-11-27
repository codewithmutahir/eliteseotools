import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'At least one image file is required' },
        { status: 400 }
      );
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      
      // Convert to JPEG using sharp for better compatibility
      const jpegBuffer = await sharp(Buffer.from(arrayBuffer))
        .jpeg({ quality: 90 })
        .toBuffer();

      const image = await pdfDoc.embedJpg(jpegBuffer);
      const page = pdfDoc.addPage([image.width, image.height]);
      
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'X-Page-Count': files.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('Images to PDF error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to convert images to PDF' },
      { status: 500 }
    );
  }
}

