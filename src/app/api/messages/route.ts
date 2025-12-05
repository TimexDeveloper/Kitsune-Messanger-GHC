import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateConversation, getUserConversations } from '@/lib/db/queries';

// Get user conversations
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = request.headers.get('x-user-id') || '';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 401 }
      );
    }

    const conversations = await getUserConversations(userId);

    return NextResponse.json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

// Create or get conversation
export async function POST(request: NextRequest) {
  try {
    const { participantIds } = await request.json();
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!Array.isArray(participantIds) || participantIds.length < 2) {
      return NextResponse.json(
        { error: 'Invalid participant IDs' },
        { status: 400 }
      );
    }

    const conversation = await getOrCreateConversation(participantIds);

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}
