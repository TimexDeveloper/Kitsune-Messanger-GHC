'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

export const GuestLoginForm: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!guestName.trim()) {
      setError('Please enter a guest name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName: guestName.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create guest account');
      }

      const data = await response.json();
      localStorage.setItem('guestToken', data.token);
      localStorage.setItem('guestName', guestName.trim());
      
      router.push('/chat');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Guest Login</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Enter a name to join as a guest
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Guest Name"
            placeholder="Enter your name..."
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            error={error}
            disabled={loading}
          />
          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            Continue as Guest
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
