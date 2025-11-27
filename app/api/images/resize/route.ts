import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const width = parseInt(formData.get('width') as string) || undefined;
    const height = parseInt(formData.get('height') as string) || undefined;
    const maintainAspectRatio = formData.get('maintainAspectRatio') === 'true';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!width && !height) {
      return NextResponse.json(
        { error: 'At least width or height must be provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);
    const metadata = await image.metadata();

    const resized = await image
      .resize(width, height, {
        fit: maintainAspectRatio ? 'inside' : 'fill',
        withoutEnlargement: false,
      })
      .toBuffer();

    const resizedMetadata = await sharp(resized).metadata();

    return new Response(new Blob([resized as BlobPart], { type: `image/${metadata.format}` }), {
      headers: {
        'Content-Type': `image/${metadata.format}`,
        'X-Original-Width': metadata.width?.toString() || '0',
        'X-Original-Height': metadata.height?.toString() || '0',
        'X-New-Width': resizedMetadata.width?.toString() || '0',
        'X-New-Height': resizedMetadata.height?.toString() || '0',
      },
    });
  } catch (error: any) {
    console.error('Image resize error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to resize image' },
      { status: 500 }
    );
  }
}

