# 🦊 Fox Messenger (狐 Messenger)

A modern, real-time web-based messenger built with Next.js 14, TypeScript, and Tailwind CSS. Plug-and-play deployment on Vercel with support for guest accounts, personal messaging, image sharing, and voice/video calls foundation.

## ✨ Features

- **🚀 Instant Messaging** - Real-time chat between any users
- **👤 Guest Accounts** - No registration needed, just enter your name and start chatting
- **📸 Image Sharing** - Send and receive images in conversations
- **☎️ Voice & Video Calls** - Call interface with WebRTC foundation (ready for implementation)
- **🎨 Dark Theme** - Beautiful dark interface with orange accents by default
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🔐 Secure Authentication** - NextAuth.js integration for secure sessions
- **⚡ Vercel-Ready** - Plug-and-play deployment on Vercel

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Vercel Postgres (optional, with SQL setup)
- **Authentication**: NextAuth.js + Custom Guest Auth
- **Storage**: Vercel Blob / Local uploads
- **Real-time**: Foundation for WebSocket integration
- **Hosting**: Vercel (serverless functions)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Vercel account (free) - [Sign up here](https://vercel.com)
- GitHub account for repository (free) - [Sign up here](https://github.com)
- Optional: PostgreSQL database (Vercel Postgres recommended)

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fox-messenger.git
cd fox-messenger
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set these required variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# Application Settings
NEXT_PUBLIC_APP_NAME=Fox Messenger
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

For PostgreSQL setup (optional for local development):

```env
# Vercel Postgres (if using)
POSTGRES_PRISMA_URL=postgresql://user:password@host:5432/fox_messenger
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Testing the App

1. Enter any guest name on the login page
2. Click "Continue as Guest"
3. You'll be redirected to the chat interface
4. Start exploring the messenger!

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🌐 Deploy to Vercel (Complete Guide)

### Step 1: Initialize Git Repository

If not already a git repo:

```bash
git init
git add .
git commit -m "Initial commit: Fox Messenger"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `fox-messenger`
3. Don't initialize with README (we have one)
4. Click "Create repository"

### Step 3: Push Code to GitHub

```bash
git remote add origin https://github.com/yourusername/fox-messenger.git
git branch -M main
git push -u origin main
```

### Step 4: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Paste your GitHub repository URL
5. Click "Continue"

### Step 5: Configure Project Settings

In Vercel's import dialog:

- **Project Name**: fox-messenger
- **Framework Preset**: Next.js
- **Root Directory**: ./ (leave as default)

Click "Continue" to proceed to environment variables.

### Step 6: Set Up Environment Variables

In the "Environment Variables" section, add:

```
NEXTAUTH_SECRET = [generate a random key or use: openssl rand -base64 32]
NEXTAUTH_URL = https://your-app-name.vercel.app
NEXT_PUBLIC_APP_NAME = Fox Messenger
NEXT_PUBLIC_APP_URL = https://your-app-name.vercel.app
NODE_ENV = production
```

**To generate NEXTAUTH_SECRET:**

Run this in your terminal:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/

### Step 7: Deploy

Click "Deploy" and wait for the deployment to complete (usually 2-3 minutes).

## 🗄️ Database Setup (Optional)

### Using Vercel Postgres

1. Go to your project in Vercel Dashboard
2. Click "Storage" tab
3. Click "Create" → "Postgres"
4. Select a region (closest to your users)
5. Click "Create"

Vercel automatically adds the environment variables to your project:
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_USER`
- `POSTGRES_DATABASE`

### Initialize Database Tables

After connecting Vercel Postgres, run:

```bash
curl https://your-app-name.vercel.app/api/db/init
```

Or create a route in your project:

```typescript
// src/app/api/db/init/route.ts
import { initializeDatabase } from '@/lib/db/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initializeDatabase();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

## 🖼️ Image Upload Setup (Optional)

### Option 1: Vercel Blob (Recommended)

1. In Vercel project → "Storage" tab
2. Click "Create" → "Blob"
3. Select a region
4. Click "Create"

Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.

### Option 2: AWS S3 or Alternative

Set these environment variables:

```env
STORAGE_API_KEY=your_api_key
STORAGE_API_URL=https://your-storage-endpoint
```

## 📁 Project Structure

```
fox-messenger/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── auth/              # Authentication endpoints
│   │   │   ├── messages/          # Message endpoints
│   │   │   ├── upload/            # Image upload
│   │   │   └── users/             # User endpoints
│   │   ├── chat/
│   │   │   └── page.tsx          # Chat interface
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Landing page
│   ├── components/
│   │   ├── auth/                 # Auth components
│   │   ├── chat/                 # Chat components
│   │   ├── layout/               # Layout components
│   │   └── ui/                   # Reusable UI components
│   ├── lib/
│   │   └── db/
│   │       └── queries.ts        # Database queries
│   ├── store/
│   │   └── index.ts              # Zustand stores
│   ├── styles/
│   │   └── globals.css           # Global styles
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── utils/
│       ├── cn.ts                 # Class name utility
│       └── crypto.ts             # Token generation
├── .vercel/
│   └── project.json              # Vercel project config
├── public/                        # Static files
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
├── next.config.js               # Next.js config
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind config
├── postcss.config.js            # PostCSS config
├── vercel.json                  # Vercel config
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🔐 Environment Variables Reference

### Required Variables

```env
# Authentication
NEXTAUTH_SECRET=random_secret_key_at_least_32_chars
NEXTAUTH_URL=https://your-production-url.vercel.app

# Application
NEXT_PUBLIC_APP_NAME=Fox Messenger
NEXT_PUBLIC_APP_URL=https://your-production-url.vercel.app
NODE_ENV=production
```

### Optional Database Variables

```env
# Vercel Postgres
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_USER=...
POSTGRES_DATABASE=...

# Vercel KV (Redis)
KV_URL=redis://...
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```

### Optional Storage Variables

```env
# Vercel Blob
BLOB_READ_WRITE_TOKEN=...

# Alternative Storage
STORAGE_API_KEY=...
STORAGE_API_URL=https://...
```

### Optional OAuth Variables

```env
# GitHub OAuth (future implementation)
GITHUB_ID=...
GITHUB_SECRET=...

# Google OAuth (future implementation)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js` to modify the primary color (currently orange/amber):

```javascript
colors: {
  primary: {
    // Change these values to your preferred colors
    500: '#f97316',  // Orange
    600: '#ea580c',
    // ... other shades
  }
}
```

### Dark/Light Mode Toggle

The app comes with dark mode enabled by default. To allow users to toggle:

Edit components and add a theme switcher in the UI store.

### Branding

Update these files for custom branding:
- `src/app/page.tsx` - Landing page
- `src/app/layout.tsx` - HTML title and metadata
- `public/` - Add your logo and favicon

## 🚀 API Endpoints

### Authentication

- `POST /api/auth/guest` - Create guest account
- `GET /api/auth/session` - Get current session

### Messages

- `GET /api/messages` - Get user conversations
- `POST /api/messages` - Create/get conversation
- `GET /api/messages/[conversationId]` - Get messages
- `POST /api/messages/[conversationId]` - Send message

### Upload

- `POST /api/upload` - Upload image

### Users

- `GET /api/users/[userId]` - Get user profile

## 🐛 Troubleshooting

### "Cannot find module" errors

```bash
npm install
rm -rf .next
npm run dev
```

### Environment variables not loading

1. Check `.env.local` exists in root directory
2. Ensure variables don't have spaces around `=`
3. Restart dev server after changing variables
4. For Vercel: Verify variables in project settings

### Database connection errors

1. Check `POSTGRES_PRISMA_URL` is correct
2. Ensure database is active in Vercel
3. Check firewall/IP allowlist if self-hosted

### Images not loading

1. Verify `BLOB_READ_WRITE_TOKEN` is set
2. Check image file size is under 5MB
3. Ensure image format is supported (JPG, PNG, WebP, GIF)

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Hosted on [Vercel](https://vercel.com/)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Support

- 📧 Email: support@example.com
- 🐛 Report issues on GitHub
- 💬 Discussions available on GitHub

## 🗺️ Roadmap

- [ ] Real-time messaging with WebSockets
- [ ] Complete WebRTC implementation for calls
- [ ] User profiles and avatars
- [ ] Message reactions and threading
- [ ] Dark/Light mode toggle
- [ ] Desktop notifications
- [ ] Message search
- [ ] Group chats
- [ ] End-to-end encryption
- [ ] Mobile app (React Native)

---

**Made with ❤️ for the community**

🦊 Fox Messenger - Modern Messaging for Everyone
