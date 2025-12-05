'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helpText, type = 'text', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
          'border-gray-300 dark:border-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder-gray-500 dark:placeholder-gray-400',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helpText && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>}
    </div>
  )
);

Input.displayName = 'Input';
