'use client';

import '@/styles/globals.css';
import React, { useEffect } from 'react';
import { useUIStore } from '@/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { darkMode } = useUIStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>狐 Fox Messenger</title>
        <meta name="description" content="A modern web-based messenger" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        {children}
      </body>
    </html>
  );
}
