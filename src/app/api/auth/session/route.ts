import { NextRequest, NextResponse } from 'next/server';
import { getGuestSessionByToken, getUserById } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const session = await getGuestSessionByToken(token);

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    const user = await getUserById(session.user_id);

    return NextResponse.json({
      success: true,
      user,
      session,
    });
  } catch (error) {
    console.error('Auth session error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}
