# 🦊 Fox Messenger - Project Structure

Полный список всех файлов и папок в проекте.

## Дерево структуры

```
fox-messenger/
│
├── 📁 src/
│   ├── 📁 app/                          # Next.js App Router
│   │   ├── 📁 api/
│   │   │   ├── 📁 auth/
│   │   │   │   ├── guest/
│   │   │   │   │   └── route.ts         # Guest authentication endpoint
│   │   │   │   └── session/
│   │   │   │       └── route.ts         # Session check endpoint
│   │   │   ├── 📁 messages/
│   │   │   │   ├── route.ts             # Conversations endpoints
│   │   │   │   └── [conversationId]/
│   │   │   │       └── route.ts         # Message endpoints
│   │   │   ├── 📁 upload/
│   │   │   │   └── route.ts             # Image upload endpoint
│   │   │   └── 📁 users/
│   │   │       └── [userId]/
│   │   │           └── route.ts         # User profile endpoint
│   │   ├── 📁 chat/
│   │   │   └── page.tsx                 # Chat interface page
│   │   ├── layout.tsx                   # Root layout component
│   │   └── page.tsx                     # Landing page
│   │
│   ├── 📁 components/
│   │   ├── 📁 auth/
│   │   │   └── GuestLoginForm.tsx       # Guest login form
│   │   ├── 📁 chat/
│   │   │   └── CallInterface.tsx        # Voice/video call UI
│   │   ├── 📁 layout/
│   │   │   └── (future layout components)
│   │   └── 📁 ui/
│   │       ├── Button.tsx               # Reusable button component
│   │       ├── Card.tsx                 # Reusable card component
│   │       ├── Input.tsx                # Reusable input component
│   │       └── index.ts                 # UI component exports
│   │
│   ├── 📁 lib/
│   │   └── 📁 db/
│   │       └── queries.ts               # Database queries
│   │
│   ├── 📁 store/
│   │   └── index.ts                     # Zustand stores
│   │
│   ├── 📁 styles/
│   │   └── globals.css                  # Global styles
│   │
│   ├── 📁 types/
│   │   └── index.ts                     # TypeScript types
│   │
│   ├── 📁 utils/
│   │   ├── cn.ts                        # classname utility
│   │   ├── crypto.ts                    # Token generation
│   │   └── validation.ts                # Input validation
│   │
│   ├── 📁 hooks/
│   │   └── index.ts                     # Custom hooks
│   │
│   └── middleware.ts                    # Auth middleware
│
├── 📁 public/
│   └── (static assets will go here)
│
├── 📁 .vercel/
│   └── project.json                     # Vercel project config
│
├── 📄 .env.example                      # Environment variables template
├── 📄 .env.local                        # Local dev environment (git ignored)
├── 📄 .gitignore                        # Git ignore file
├── 📄 .eslintrc.json                    # ESLint configuration
├── 📄 .prettierrc                       # Prettier configuration
│
├── 📄 vercel.json                       # Vercel deployment config
├── 📄 tsconfig.json                     # TypeScript config
├── 📄 next.config.js                    # Next.js config
├── 📄 tailwind.config.js                # Tailwind CSS config
├── 📄 postcss.config.js                 # PostCSS config
├── 📄 package.json                      # Dependencies
│
├── 📄 README.md                         # Main documentation
├── 📄 DEPLOYMENT.md                     # Vercel deployment guide
├── 📄 ARCHITECTURE.md                   # Architecture documentation
├── 📄 API.md                            # API documentation
├── 📄 CONTRIBUTING.md                   # Contributing guidelines
├── 📄 CHANGELOG.md                      # Version history
├── 📄 LICENSE                           # MIT License
└── 📄 PROJECT_STRUCTURE.md              # This file
```

## Описание ключевых файлов

### Configuration Files

| Файл | Назначение |
|------|----------|
| `tsconfig.json` | TypeScript конфигурация с path mapping |
| `next.config.js` | Next.js конфигурация для изображений |
| `tailwind.config.js` | Tailwind CSS с темой и расширениями |
| `postcss.config.js` | PostCSS плагины для Tailwind |
| `.eslintrc.json` | ESLint правила кода |
| `.prettierrc` | Prettier форматирование |
| `vercel.json` | Vercel deployment конфигурация |
| `.vercel/project.json` | Vercel проект конфигурация |
| `package.json` | npm зависимости и скрипты |

### Source Code

| Файл/Папка | Назначение |
|-----------|----------|
| `src/app/` | Next.js App Router (страницы и API) |
| `src/components/` | React компоненты (UI, auth, chat) |
| `src/lib/` | Вспомогательные функции (DB queries) |
| `src/store/` | Zustand state management |
| `src/types/` | TypeScript типы данных |
| `src/utils/` | Утилиты (crypto, validation, cn) |
| `src/hooks/` | Пользовательские React hooks |
| `src/styles/` | CSS стили (globals, themes) |
| `src/middleware.ts` | Next.js middleware для аутентификации |

### Documentation

| Файл | Содержание |
|-----|----------|
| `README.md` | Полное руководство и overview |
| `DEPLOYMENT.md` | Пошаговый гайд по развертыванию на Vercel |
| `ARCHITECTURE.md` | Архитектурное описание приложения |
| `API.md` | API endpoints и примеры использования |
| `CONTRIBUTING.md` | Гайды для контрибьюторов |
| `CHANGELOG.md` | История версий и изменений |
| `LICENSE` | MIT лицензия |

### Environment & Git

| Файл | Назначение |
|-----|----------|
| `.env.example` | Шаблон переменных окружения |
| `.env.local` | Локальные переменные (git ignored) |
| `.gitignore` | Git игнор-файлы |

## API Routes Structure

```
/api
├── /auth
│   ├── POST   /guest          Create guest account
│   └── GET    /session        Check session
├── /messages
│   ├── GET    /              Get all conversations
│   ├── POST   /              Create/get conversation
│   ├── GET    /[id]          Get conversation messages
│   └── POST   /[id]          Send message
├── /upload
│   └── POST   /              Upload image
└── /users
    └── GET    /[id]          Get user profile
```

## Component Hierarchy

```
App (src/app/layout.tsx)
├── Landing Page (src/app/page.tsx)
│   └── GuestLoginForm
│       ├── Input
│       ├── Button
│       └── Card
│
└── Chat Page (src/app/chat/page.tsx)
    ├── Sidebar
    │   ├── Header
    │   ├── ConversationList
    │   │   └── ConversationItem
    │   └── Footer
    │       ├── Button (Settings)
    │       └── Button (Logout)
    │
    ├── ChatArea
    │   ├── ChatHeader
    │   │   ├── UserInfo
    │   │   ├── Button (Call)
    │   │   └── Button (Video)
    │   │
    │   ├── MessageList
    │   │   └── Message (x N)
    │   │
    │   └── MessageInput
    │       ├── Input
    │       └── Button (Send)
    │
    └── CallInterface (conditional)
        ├── CallHeader
        ├── CallStatus
        └── CallControls
```

## Data Flow

```
User Input
    ↓
Component Handler
    ↓
API Call (fetch)
    ↓
API Route Handler
    ↓
Database Query
    ↓
Database
    ↓
API Response
    ↓
Zustand Store Update
    ↓
Component Re-render
    ↓
UI Update
```

## State Management Structure

```
Zustand Store
├── useAuthStore
│   ├── user: User | null
│   ├── isGuest: boolean
│   ├── isLoading: boolean
│   ├── setUser()
│   ├── setIsGuest()
│   ├── setIsLoading()
│   └── logout()
│
├── useChatStore
│   ├── conversations: Conversation[]
│   ├── selectedConversation: Conversation | null
│   ├── messages: Message[]
│   ├── isLoadingMessages: boolean
│   ├── setConversations()
│   ├── setSelectedConversation()
│   ├── setMessages()
│   ├── addMessage()
│   ├── setIsLoadingMessages()
│   └── clearChat()
│
└── useUIStore
    ├── sidebarOpen: boolean
    ├── darkMode: boolean
    ├── setSidebarOpen()
    └── setDarkMode()
```

## Database Schema

```
PostgreSQL
├── users
├── conversations
├── messages
├── calls
└── guest_sessions
```

## Key Features Location

| Фичера | Расположение |
|-------|-------------|
| Guest Login | `src/components/auth/GuestLoginForm.tsx` + `/api/auth/guest` |
| Chat Interface | `src/app/chat/page.tsx` |
| Messages | `/api/messages/*` + `src/store/index.ts` |
| Image Upload | `/api/upload` + `src/hooks/index.ts` |
| Voice Calls | `src/components/chat/CallInterface.tsx` |
| Dark Theme | `src/styles/globals.css` + `tailwind.config.js` |
| Auth Middleware | `src/middleware.ts` |
| Database | `src/lib/db/queries.ts` |

## Third-party Dependencies

```json
Dependencies:
  - next: ^14.0.0 (Framework)
  - react: ^18.2.0 (UI)
  - typescript: ^5.3.0 (Language)
  - tailwindcss: ^3.4.0 (Styling)
  - zustand: ^4.4.0 (State)
  - next-auth: ^4.24.0 (Auth)
  - axios: ^1.6.0 (HTTP)
  - date-fns: ^2.30.0 (Dates)
  - react-hot-toast: ^2.4.1 (Notifications)
  - lucide-react: ^0.294.0 (Icons)

Dev Dependencies:
  - @types/node, @types/react (Types)
  - autoprefixer: ^10.4.0 (CSS)
  - eslint: ^8.53.0 (Linting)
  - prettier: ^3.0.0 (Formatting)
```

## Git Ignore Patterns

```
node_modules/
.next/
out/
dist/
.env.local
.env.*.local
.DS_Store
*.pem
.vercel/
.vscode/
.idea/
*.swp
npm-debug.log*
```

## Build Output

```
fox-messenger/
└── .next/                   # Build output
    ├── static/              # Static assets
    ├── server/              # Server-side code
    ├── public/              # Public assets
    └── cache/               # Build cache
```

## Deployment Files

```
Vercel:
├── .vercel/project.json    # Project metadata
├── vercel.json             # Build config
└── [API routes are auto-deployed as functions]
```

---

## How to Navigate This Project

1. **Want to add a feature?**
   - Check `src/components/` for UI components
   - Add API route in `src/app/api/`
   - Update store in `src/store/index.ts`
   - Update types in `src/types/index.ts`

2. **Want to modify styling?**
   - Update `src/styles/globals.css` for global styles
   - Update `tailwind.config.js` for theme
   - Modify component styles inline with Tailwind classes

3. **Want to deploy?**
   - Follow `DEPLOYMENT.md`
   - Ensure `.env.local` variables are set in Vercel

4. **Want to contribute?**
   - Read `CONTRIBUTING.md`
   - Follow code standards
   - Create feature branch
   - Submit PR

---

**Last Updated:** 2024-01-15
**Version:** 1.0.0
