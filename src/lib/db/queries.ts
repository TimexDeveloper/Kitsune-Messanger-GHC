import { sql } from '@vercel/postgres';

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255) NOT NULL,
        avatar TEXT,
        is_guest BOOLEAN DEFAULT FALSE,
        guest_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        last_active TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Conversations table
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id VARCHAR(36) PRIMARY KEY,
        participant_ids TEXT[] NOT NULL,
        last_message_at TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Messages table
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL REFERENCES conversations(id),
        sender_id VARCHAR(36) NOT NULL REFERENCES users(id),
        content TEXT NOT NULL,
        image_url TEXT,
        image_alt VARCHAR(255),
        type VARCHAR(20) DEFAULT 'text',
        read_by TEXT[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Calls table
    await sql`
      CREATE TABLE IF NOT EXISTS calls (
        id VARCHAR(36) PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL REFERENCES conversations(id),
        caller_id VARCHAR(36) NOT NULL REFERENCES users(id),
        receiver_id VARCHAR(36) NOT NULL REFERENCES users(id),
        type VARCHAR(20) DEFAULT 'voice',
        status VARCHAR(20) DEFAULT 'pending',
        started_at TIMESTAMP,
        ended_at TIMESTAMP,
        duration INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Guest sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS guest_sessions (
        token VARCHAR(64) PRIMARY KEY,
        guest_name VARCHAR(255) NOT NULL,
        user_id VARCHAR(36) NOT NULL UNIQUE REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL
      );
    `;

    console.log('✓ Database initialized successfully');
  } catch (error) {
    console.error('✗ Database initialization failed:', error);
    throw error;
  }
}

// User queries
export async function getUserById(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM users WHERE id = ${userId}
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function createUser(id: string, name: string, email?: string, isGuest = false) {
  try {
    const result = await sql`
      INSERT INTO users (id, name, email, is_guest)
      VALUES (${id}, ${name}, ${email || null}, ${isGuest})
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Conversation queries
export async function getOrCreateConversation(participantIds: string[]) {
  try {
    const sortedIds = participantIds.sort();
    
    // Try to find existing conversation
    const existing = await sql`
      SELECT * FROM conversations 
      WHERE participant_ids @> ${JSON.stringify(sortedIds)}
      LIMIT 1
    `;

    if (existing.rows.length > 0) {
      return existing.rows[0];
    }

    // Create new conversation
    const id = require('crypto').randomUUID();
    const result = await sql`
      INSERT INTO conversations (id, participant_ids)
      VALUES (${id}, ${JSON.stringify(sortedIds)})
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting/creating conversation:', error);
    throw error;
  }
}

export async function getUserConversations(userId: string) {
  try {
    const result = await sql`
      SELECT c.*, 
        (SELECT json_build_object('id', id, 'content', content, 'sender_id', sender_id, 'created_at', created_at)
         FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message
      FROM conversations c
      WHERE ${userId} = ANY(c.participant_ids)
      ORDER BY c.last_message_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
}

// Message queries
export async function createMessage(
  conversationId: string,
  senderId: string,
  content: string,
  type: 'text' | 'image' = 'text',
  imageUrl?: string,
  imageAlt?: string
) {
  try {
    const id = require('crypto').randomUUID();
    const result = await sql`
      INSERT INTO messages (id, conversation_id, sender_id, content, image_url, image_alt, type)
      VALUES (${id}, ${conversationId}, ${senderId}, ${content}, ${imageUrl || null}, ${imageAlt || null}, ${type})
      RETURNING *
    `;

    // Update conversation's last_message_at
    await sql`
      UPDATE conversations SET last_message_at = NOW() WHERE id = ${conversationId}
    `;

    return result.rows[0];
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
}

export async function getConversationMessages(conversationId: string, limit = 50, offset = 0) {
  try {
    const result = await sql`
      SELECT * FROM messages 
      WHERE conversation_id = ${conversationId}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return result.rows.reverse();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

// Guest session queries
export async function createGuestSession(guestName: string, userId: string, token: string) {
  try {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const result = await sql`
      INSERT INTO guest_sessions (token, guest_name, user_id, expires_at)
      VALUES (${token}, ${guestName}, ${userId}, ${expiresAt})
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating guest session:', error);
    throw error;
  }
}

export async function getGuestSessionByToken(token: string) {
  try {
    const result = await sql`
      SELECT * FROM guest_sessions 
      WHERE token = ${token} AND expires_at > NOW()
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching guest session:', error);
    throw error;
  }
}
