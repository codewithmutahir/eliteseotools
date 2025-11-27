import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const quality = parseInt(formData.get('quality') as string) || 80;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);
    const metadata = await image.metadata();

    let compressed: Buffer;

    if (metadata.format === 'png') {
      compressed = await image
        .png({ quality, compressionLevel: 9 })
        .toBuffer();
    } else if (metadata.format === 'webp') {
      compressed = await image
        .webp({ quality })
        .toBuffer();
    } else {
      // JPEG
      compressed = await image
        .jpeg({ quality })
        .toBuffer();
    }

    const originalSize = buffer.length;
    const compressedSize = compressed.length;
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    return new Response(new Blob([compressed as BlobPart], { type: `image/${metadata.format}` }), {
      headers: {
        'Content-Type': `image/${metadata.format}`,
        'X-Original-Size': originalSize.toString(),
        'X-Compressed-Size': compressedSize.toString(),
        'X-Savings': savings,
      },
    });
  } catch (error: any) {
    console.error('Image compression error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to compress image' },
      { status: 500 }
    );
  }
}

