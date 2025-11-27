import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!['jpeg', 'png', 'webp', 'jpg'].includes(format)) {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);

    let converted: Buffer;
    let contentType: string;

    switch (format) {
      case 'jpeg':
      case 'jpg':
        converted = await image.jpeg({ quality: 90 }).toBuffer();
        contentType = 'image/jpeg';
        break;
      case 'png':
        converted = await image.png({ quality: 90 }).toBuffer();
        contentType = 'image/png';
        break;
      case 'webp':
        converted = await image.webp({ quality: 90 }).toBuffer();
        contentType = 'image/webp';
        break;
      default:
        throw new Error('Unsupported format');
    }

    return new NextResponse(converted, {
      headers: {
        'Content-Type': contentType,
        'X-Format': format,
      },
    });
  } catch (error: any) {
    console.error('Image conversion error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to convert image' },
      { status: 500 }
    );
  }
}

