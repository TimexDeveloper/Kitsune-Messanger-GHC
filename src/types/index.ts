// User types
export interface User {
  id: string;
  email?: string;
  name: string;
  avatar?: string;
  isGuest: boolean;
  guestName?: string;
  createdAt: Date;
  lastActive: Date;
}

// Message types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  type: 'text' | 'image';
  createdAt: Date;
  updatedAt: Date;
  readBy: string[];
}

// Conversation types
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Call types
export interface Call {
  id: string;
  conversationId: string;
  callerId: string;
  receiverId: string;
  type: 'voice' | 'video';
  status: 'pending' | 'active' | 'ended';
  startedAt?: Date;
  endedAt?: Date;
  duration?: number;
}

// Session types
export interface GuestSession {
  token: string;
  guestName: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

// Auth types
export interface AuthSession {
  user?: User;
  expires: string;
}
