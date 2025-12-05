import { NextRequest, NextResponse } from 'next/server';

// Handle image upload
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // For now, we'll store in a temporary location
    // In production, use Vercel Blob or another storage provider
    const buffer = await file.arrayBuffer();
    const timestamp = Date.now();
    const fileName = `img-${timestamp}-${file.name}`;

    // Mock URL - in production, upload to Vercel Blob or S3
    const imageUrl = `/uploads/${fileName}`;

    return NextResponse.json(
      {
        success: true,
        imageUrl,
        fileName,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
