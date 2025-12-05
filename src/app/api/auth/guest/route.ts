import { NextRequest, NextResponse } from 'next/server';
import { generateGuestToken, generateUserId } from '@/utils/crypto';
import { createUser, createGuestSession } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const { guestName } = await request.json();

    if (!guestName || typeof guestName !== 'string' || guestName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid guest name' },
        { status: 400 }
      );
    }

    const userId = generateUserId();
    const token = generateGuestToken();

    // Create user
    await createUser(userId, guestName, undefined, true);

    // Create guest session
    await createGuestSession(guestName, userId, token);

    return NextResponse.json(
      {
        success: true,
        token,
        userId,
        guestName,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Guest login error:', error);
    return NextResponse.json(
      { error: 'Failed to create guest account' },
      { status: 500 }
    );
  }
}
