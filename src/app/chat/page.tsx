'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Phone, Video, Settings, LogOut, Menu, X } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'You',
      content: 'Hey! How are you?',
      timestamp: '10:30 AM',
      isOwn: true,
    },
    {
      id: '2',
      sender: 'Friend',
      content: 'I\'m doing great! You?',
      timestamp: '10:31 AM',
      isOwn: false,
    },
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: '👤',
      lastMessage: 'I\'m doing great! You?',
      unread: 0,
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: '👩',
      lastMessage: 'See you tomorrow!',
      unread: 2,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0]
  );
  const [messageInput, setMessageInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: 'You',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const handleLogout = () => {
    localStorage.removeItem('guestToken');
    localStorage.removeItem('guestName');
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } bg-gray-900 border-r border-gray-800 transition-all duration-200 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Messages</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                selectedConversation?.id === conv.id
                  ? 'bg-primary-500 bg-opacity-10'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{conv.avatar}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white">{conv.name}</h3>
                  <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Button variant="secondary" className="w-full justify-start" size="sm">
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
          <Button variant="danger" className="w-full justify-start" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {selectedConversation && (
          <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu size={20} />
              </Button>
              <div className="text-3xl">{selectedConversation.avatar}</div>
              <div>
                <h2 className="font-semibold text-white">{selectedConversation.name}</h2>
                <p className="text-xs text-gray-400">Active now</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Phone size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Video size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.isOwn
                    ? 'bg-primary-500 text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-100 rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.isOwn ? 'text-primary-100' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-gray-900 border-t border-gray-800 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500"
            />
            <Button variant="primary" size="md">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
