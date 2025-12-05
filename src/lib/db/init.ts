import { sql } from '@vercel/postgres';

/**
 * Initialize database tables for local development
 * Run this after connecting Vercel Postgres
 */
export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database tables...\n');

    // Drop existing tables (for development only!)
    // Uncomment if you need a clean slate
    /*
    await sql`DROP TABLE IF EXISTS guest_sessions CASCADE`;
    await sql`DROP TABLE IF EXISTS calls CASCADE`;
    await sql`DROP TABLE IF EXISTS messages CASCADE`;
    await sql`DROP TABLE IF EXISTS conversations CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    */

    // Create users table
    console.log('📝 Creating users table...');
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
      )
    `;

    // Create conversations table
    console.log('📝 Creating conversations table...');
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id VARCHAR(36) PRIMARY KEY,
        participant_ids TEXT[] NOT NULL,
        last_message_at TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create messages table
    console.log('📝 Creating messages table...');
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
        sender_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        image_url TEXT,
        image_alt VARCHAR(255),
        type VARCHAR(20) DEFAULT 'text',
        read_by TEXT[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create calls table
    console.log('📝 Creating calls table...');
    await sql`
      CREATE TABLE IF NOT EXISTS calls (
        id VARCHAR(36) PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
        caller_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        receiver_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(20) DEFAULT 'voice',
        status VARCHAR(20) DEFAULT 'pending',
        started_at TIMESTAMP,
        ended_at TIMESTAMP,
        duration INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create guest sessions table
    console.log('📝 Creating guest_sessions table...');
    await sql`
      CREATE TABLE IF NOT EXISTS guest_sessions (
        token VARCHAR(64) PRIMARY KEY,
        guest_name VARCHAR(255) NOT NULL,
        user_id VARCHAR(36) NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL
      )
    `;

    // Create indexes for better performance
    console.log('⚡ Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations(participant_ids)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_guest_sessions_user ON guest_sessions(user_id)`;

    console.log('\n✅ Database initialized successfully!\n');
    console.log('Tables created:');
    console.log('  ✓ users');
    console.log('  ✓ conversations');
    console.log('  ✓ messages');
    console.log('  ✓ calls');
    console.log('  ✓ guest_sessions');
    console.log('\nIndexes created for performance optimization.\n');

    return true;
  } catch (error) {
    // Table might already exist, which is fine
    if (error instanceof Error && error.message.includes('already exists')) {
      console.log('ℹ️  Tables already exist. Skipping initialization.\n');
      return true;
    }

    console.error('❌ Database initialization failed:');
    console.error(error);
    throw error;
  }
}

/**
 * Seed sample data for development
 */
export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with sample data...\n');

    const userId1 = '550e8400-e29b-41d4-a716-446655440000';
    const userId2 = '550e8400-e29b-41d4-a716-446655440001';
    const conversationId = '550e8400-e29b-41d4-a716-446655550000';

    // Create sample users
    console.log('👤 Creating sample users...');
    try {
      await sql`
        INSERT INTO users (id, name, is_guest, guest_name, created_at, last_active)
        VALUES 
          (${userId1}, 'John', true, 'John', NOW(), NOW()),
          (${userId2}, 'Jane', true, 'Jane', NOW(), NOW())
      `;
    } catch (error) {
      // Users might already exist
      console.log('ℹ️  Sample users already exist.');
    }

    // Create sample conversation
    console.log('💬 Creating sample conversation...');
    try {
      await sql`
        INSERT INTO conversations (id, participant_ids, created_at)
        VALUES (${conversationId}, ARRAY[${userId1}, ${userId2}], NOW())
      `;
    } catch (error) {
      // Conversation might already exist
      console.log('ℹ️  Sample conversation already exists.');
    }

    // Create sample messages
    console.log('📝 Creating sample messages...');
    try {
      await sql`
        INSERT INTO messages (id, conversation_id, sender_id, content, type, created_at)
        VALUES
          ('msg-1', ${conversationId}, ${userId1}, 'Hey Jane! How are you?', 'text', NOW()),
          ('msg-2', ${conversationId}, ${userId2}, 'Hi John! I\'m doing great!', 'text', NOW()),
          ('msg-3', ${conversationId}, ${userId1}, 'That\'s awesome! Want to chat?', 'text', NOW())
      `;
    } catch (error) {
      // Messages might already exist
      console.log('ℹ️  Sample messages already exist.');
    }

    console.log('\n✅ Database seeding completed!\n');
    return true;
  } catch (error) {
    console.error('❌ Database seeding failed:');
    console.error(error);
    throw error;
  }
}

/**
 * Reset database (for development only!)
 * WARNING: This will delete all data!
 */
export async function resetDatabase() {
  try {
    console.log('⚠️  WARNING: Resetting database will delete ALL data!\n');
    console.log('🔄 Resetting database...\n');

    await sql`DROP TABLE IF EXISTS guest_sessions CASCADE`;
    await sql`DROP TABLE IF EXISTS calls CASCADE`;
    await sql`DROP TABLE IF EXISTS messages CASCADE`;
    await sql`DROP TABLE IF EXISTS conversations CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;

    console.log('✅ Database reset completed!\n');
    console.log('All tables have been deleted.\n');

    return true;
  } catch (error) {
    console.error('❌ Database reset failed:');
    console.error(error);
    throw error;
  }
}
