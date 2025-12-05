import crypto from 'crypto';

export function generateGuestToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateUserId(): string {
  return crypto.randomUUID();
}

export function generateConversationId(): string {
  return crypto.randomUUID();
}

export function generateMessageId(): string {
  return crypto.randomUUID();
}

export function generateCallId(): string {
  return crypto.randomUUID();
}

export function isValidToken(token: string): boolean {
  return /^[a-f0-9]{64}$/.test(token);
}
