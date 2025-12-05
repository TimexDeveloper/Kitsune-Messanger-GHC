'use client';

import React from 'react';
import Link from 'next/link';
import { GuestLoginForm } from '@/components/auth/GuestLoginForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black dark:from-gray-900 dark:via-gray-950 dark:to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-4">狐</div>
          <h1 className="text-4xl font-bold text-white mb-2">Fox Messenger</h1>
          <p className="text-gray-400">Modern messaging for everyone</p>
        </div>

        {/* Login Form */}
        <GuestLoginForm />

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-primary-500 text-2xl mb-2">💬</div>
            <p className="text-gray-400">Instant Chat</p>
          </div>
          <div>
            <div className="text-primary-500 text-2xl mb-2">🖼️</div>
            <p className="text-gray-400">Share Images</p>
          </div>
          <div>
            <div className="text-primary-500 text-2xl mb-2">📞</div>
            <p className="text-gray-400">Voice Calls</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Get started by entering your name above</p>
        </div>
      </div>
    </div>
  );
}
