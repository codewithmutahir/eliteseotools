import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const left = parseInt(formData.get('left') as string) || 0;
    const top = parseInt(formData.get('top') as string) || 0;
    const width = parseInt(formData.get('width') as string);
    const height = parseInt(formData.get('height') as string);

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!width || !height) {
      return NextResponse.json(
        { error: 'Width and height are required' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);
    const metadata = await image.metadata();

    const cropped = await image
      .extract({ left, top, width, height })
      .toBuffer();

    return new Response(new Blob([cropped as BlobPart], { type: `image/${metadata.format}` }), {
      headers: {
        'Content-Type': `image/${metadata.format}`,
        'X-Original-Width': metadata.width?.toString() || '0',
        'X-Original-Height': metadata.height?.toString() || '0',
        'X-Cropped-Width': width.toString(),
        'X-Cropped-Height': height.toString(),
      },
    });
  } catch (error: any) {
    console.error('Image crop error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to crop image' },
      { status: 500 }
    );
  }
}

