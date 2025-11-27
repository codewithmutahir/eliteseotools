import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Extract relevant metadata
    const result = {
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
      space: metadata.space,
      channels: metadata.channels,
      depth: metadata.depth,
      density: metadata.density,
      hasAlpha: metadata.hasAlpha,
      orientation: metadata.orientation,
      exif: metadata.exif ? parseExif(metadata.exif) : null,
      size: buffer.length,
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Metadata extraction error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to extract metadata' },
      { status: 500 }
    );
  }
}

function parseExif(exifBuffer: Buffer): Record<string, any> {
  try {
    // Basic EXIF parsing - in production, use a proper EXIF library
    return {
      raw: exifBuffer.toString('base64').substring(0, 100) + '...',
    };
  } catch {
    return {};
  }
}

