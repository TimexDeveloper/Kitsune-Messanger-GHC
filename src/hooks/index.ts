'use client';

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = useCallback(
    async (file: File, token: string): Promise<{ url: string; alt: string } | null> => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return null;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return null;
      }

      setUploading(true);
      setProgress(0);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setProgress(percentComplete);
          }
        });

        return new Promise((resolve, reject) => {
          xhr.addEventListener('load', () => {
            if (xhr.status === 201 || xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              toast.success('Image uploaded');
              resolve({
                url: response.imageUrl,
                alt: file.name,
              });
            } else {
              reject(new Error('Upload failed'));
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error('Upload error'));
          });

          xhr.open('POST', '/api/upload');
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
          xhr.send(formData);
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image');
        return null;
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    []
  );

  return { uploadImage, uploading, progress };
}

export function useChatMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(
    async (conversationId: string, token: string, limit = 50, offset = 0) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/messages/${conversationId}?limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(data.messages);
        return data.messages;
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const sendMessage = useCallback(
    async (
      conversationId: string,
      content: string,
      token: string,
      userId: string,
      type: 'text' | 'image' = 'text',
      imageUrl?: string
    ) => {
      try {
        const response = await fetch(`/api/messages/${conversationId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-user-id': userId,
          },
          body: JSON.stringify({
            content,
            type,
            imageUrl,
            imageAlt: type === 'image' ? 'Shared image' : undefined,
          }),
        });

        if (!response.ok) throw new Error('Failed to send message');
        const data = await response.json();
        setMessages((prev) => [...prev, data.message]);
        return data.message;
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message');
        return null;
      }
    },
    []
  );

  return { messages, loading, fetchMessages, sendMessage };
}
