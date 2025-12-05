'use client';

import { create } from 'zustand';
import { User, Message, Conversation } from '@/types';

interface AuthStore {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsGuest: (isGuest: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isGuest: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsGuest: (isGuest) => set({ isGuest }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isGuest: false }),
}));

interface ChatStore {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: Message[];
  isLoadingMessages: boolean;
  setConversations: (conversations: Conversation[]) => void;
  setSelectedConversation: (conversation: Conversation | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setIsLoadingMessages: (isLoading: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],
  isLoadingMessages: false,
  setConversations: (conversations) => set({ conversations }),
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setIsLoadingMessages: (isLoading) => set({ isLoadingMessages: isLoading }),
  clearChat: () =>
    set({
      conversations: [],
      selectedConversation: null,
      messages: [],
    }),
}));

interface UIStore {
  sidebarOpen: boolean;
  darkMode: boolean;
  setSidebarOpen: (open: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  darkMode: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setDarkMode: (darkMode) => set({ darkMode }),
}));
