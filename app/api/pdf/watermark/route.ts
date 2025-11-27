import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const watermarkText = formData.get('text') as string;
    const opacity = parseFloat(formData.get('opacity') as string) || 0.3;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!watermarkText) {
      return NextResponse.json(
        { error: 'Watermark text is required' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add watermark to each page
    for (const page of pages) {
      const { width, height } = page.getSize();
      const fontSize = 48;
      const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);

      page.drawText(watermarkText, {
        x: (width - textWidth) / 2,
        y: height / 2,
        size: fontSize,
        font: font,
        color: rgb(0.7, 0.7, 0.7),
        opacity: opacity,
        rotate: { angle: 45, type: 'degrees' } as any,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new Response(new Blob([pdfBytes as BlobPart], { type: 'application/pdf' }), {
      headers: {
        'Content-Type': 'application/pdf',
        'X-Page-Count': pages.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('PDF watermark error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add watermark' },
      { status: 500 }
    );
  }
}

