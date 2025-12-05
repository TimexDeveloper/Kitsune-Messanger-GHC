# 🏗️ Архитектура приложения

Полное описание архитектуры Fox Messenger.

## Обзор

Fox Messenger построен на основе современного стека:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  Next.js 14 App Router | TypeScript | Tailwind CSS | Zustand│
└────────────────────────┬────────────────────────────────────┘
                         │
                    API Routes
                         │
┌────────────────────────┴────────────────────────────────────┐
│                      Next.js API                             │
│            Serverless Functions on Vercel                    │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐      ┌────▼────┐     ┌────▼─────┐
   │PostgreSQL│      │Vercel KV│     │Vercel Blob│
   │ Database │      │  Cache  │     │ Storage   │
   └──────────┘      └─────────┘     └───────────┘
```

## Слои приложения

### 1. Frontend Layer (src/app, src/components)

**Ответственность:**
- UI/UX компоненты
- Маршрутизация страниц
- Управление состоянием пользователя
- Взаимодействие с API

**Ключевые файлы:**

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── chat/page.tsx        # Chat interface
│   ├── layout.tsx           # Root layout
│   └── api/                 # API routes
├── components/
│   ├── auth/                # Auth компоненты
│   ├── chat/                # Chat компоненты
│   ├── layout/              # Layout компоненты
│   └── ui/                  # UI компоненты
└── store/
    └── index.ts             # Zustand store
```

### 2. API Layer (src/app/api)

**Ответственность:**
- Обработка HTTP запросов
- Валидация данных
- Аутентификация
- Бизнес-логика

**Структура endpoints:**

```
/api
├── /auth
│   ├── /guest        (POST) - Create guest account
│   └── /session      (GET)  - Check session
├── /messages
│   ├── /            (GET/POST) - Get/create conversations
│   └── /[id]        (GET/POST) - Get/send messages
├── /upload
│   └── /            (POST) - Upload image
└── /users
    └── /[id]        (GET) - Get user profile
```

### 3. Data Layer (src/lib/db)

**Ответственность:**
- Работа с базой данных
- SQL queries
- Data persistence

**Таблицы:**

```sql
users
├── id (UUID)
├── name (VARCHAR)
├── email (VARCHAR, UNIQUE)
├── is_guest (BOOLEAN)
├── guest_name (VARCHAR)
├── created_at (TIMESTAMP)
└── last_active (TIMESTAMP)

conversations
├── id (UUID)
├── participant_ids (UUID[])
├── last_message_at (TIMESTAMP)
└── created_at (TIMESTAMP)

messages
├── id (UUID)
├── conversation_id (UUID, FK)
├── sender_id (UUID, FK)
├── content (TEXT)
├── image_url (TEXT)
├── type (ENUM: text/image)
├── read_by (UUID[])
└── created_at (TIMESTAMP)

calls
├── id (UUID)
├── conversation_id (UUID, FK)
├── caller_id (UUID, FK)
├── receiver_id (UUID, FK)
├── type (ENUM: voice/video)
├── status (ENUM: pending/active/ended)
├── started_at (TIMESTAMP)
├── ended_at (TIMESTAMP)
└── duration (INTEGER)

guest_sessions
├── token (VARCHAR, PRIMARY KEY)
├── guest_name (VARCHAR)
├── user_id (UUID, FK)
├── created_at (TIMESTAMP)
└── expires_at (TIMESTAMP)
```

### 4. State Management (src/store)

**Zustand stores:**

```typescript
// useAuthStore
- user: User | null
- isGuest: boolean
- setUser()
- logout()

// useChatStore
- conversations: Conversation[]
- selectedConversation: Conversation | null
- messages: Message[]
- addMessage()
- setMessages()

// useUIStore
- sidebarOpen: boolean
- darkMode: boolean
- setSidebarOpen()
- setDarkMode()
```

## Поток данных

### Сценарий 1: Создание гостевого аккаунта

```
User Input (Guest Name)
    ↓
GuestLoginForm Component
    ↓
POST /api/auth/guest
    ↓
API Route Handler
    ├─ Validate input
    ├─ Generate token + userId
    ├─ Create user in DB
    ├─ Create guest session
    └─ Return token
    ↓
Store in localStorage
    ↓
Redirect to /chat
```

### Сценарий 2: Отправка сообщения

```
User Input (Message Text)
    ↓
Chat Component
    ↓
POST /api/messages/[conversationId]
    ↓
API Route Handler
    ├─ Validate token
    ├─ Validate content
    ├─ Create message in DB
    ├─ Update conversation
    └─ Return message
    ↓
useChatStore.addMessage()
    ↓
UI re-renders with new message
```

### Сценарий 3: Загрузка изображения

```
User selects file
    ↓
useImageUpload hook
    ↓
FormData with file
    ↓
POST /api/upload (multipart)
    ↓
API Route Handler
    ├─ Validate file
    ├─ Upload to Vercel Blob
    ├─ Generate URL
    └─ Return imageUrl
    ↓
Send message with imageUrl
```

## Аутентификация и Авторизация

### Гостевая аутентификация

```
┌──────────────────────────────────────┐
│ POST /api/auth/guest                 │
│ { guestName: "John" }               │
└──────────────┬───────────────────────┘
               │
               ├─ Generate token (crypto.randomBytes)
               ├─ Generate userId (crypto.randomUUID)
               ├─ Create user record
               ├─ Create session token
               └─ Return { token, userId }
                    │
                    └─ Client stores in localStorage
                       (Used as Bearer token)
```

### Проверка сессии

```
┌──────────────────────────────────────┐
│ GET /api/auth/session                │
│ Authorization: Bearer <token>        │
└──────────────┬───────────────────────┘
               │
               ├─ Validate token format
               ├─ Lookup session in DB
               ├─ Check if not expired
               └─ Return user data
```

## Безопасность

### Защита API endpoints

```typescript
// Middleware проверка
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return 401 Unauthorized
}

const token = authHeader.substring(7);
const session = await getGuestSessionByToken(token);

if (!session || session.expires_at < NOW) {
  return 401 Unauthorized
}
```

### Защита данных

- ✅ HTTPS on Vercel (automatic)
- ✅ NEXTAUTH_SECRET for session encryption
- ✅ Token expiration (30 days)
- ✅ Input validation on all endpoints
- ✅ CORS configured
- ✅ SQL injection prevention (parameterized queries)

## Performance

### Оптимизация

1. **Code Splitting**
   - Next.js automatic route-based code splitting
   - Dynamic imports for heavy components

2. **Caching**
   - Next.js ISR for static content
   - Client-side caching with Zustand
   - Optional: Vercel KV for server-side cache

3. **Database**
   - Indexed queries on conversation_ids, user_ids
   - Connection pooling via PRISMA_URL
   - Read replicas optional

4. **Frontend**
   - Image optimization with next/image
   - CSS minification with Tailwind
   - Tree-shaking with TypeScript

## Масштабируемость

### Горизонтальное масштабирование

```
Vercel Edge Network
    ↓
├─ Multiple serverless functions
├─ Auto-scaling
└─ Geographic distribution

Database
    ↓
├─ Connection pooling
├─ Read replicas
└─ Auto-backup
```

### Вертикальное масштабирование

1. Upgrade Vercel plan (Pro, Enterprise)
2. Upgrade PostgreSQL plan
3. Add Redis for caching
4. Add CDN for static assets

## Развертывание

### Development

```bash
npm run dev
# Runs on localhost:3000
```

### Production (Vercel)

```
GitHub → Vercel
   ↓
- Install dependencies
- Build (npm run build)
- Deploy serverless functions
- Cache on CDN
- Auto-SSL with HTTPS
```

## Мониторинг и Logging

### Доступные логи

1. **Build logs** - Vercel dashboard → Deployments
2. **Runtime logs** - Vercel dashboard → Functions
3. **Error tracking** - Browser console
4. **Database logs** - Vercel Postgres dashboard

## Future Architecture Improvements

1. **Real-time messaging**
   - WebSocket implementation
   - Socket.io or Pusher integration
   - Serverless WebSocket support

2. **WebRTC for calls**
   - STUN/TURN servers
   - Peer connection management
   - Media stream handling

3. **Encryption**
   - End-to-end encryption
   - TweetNaCl.js or libsodium.js

4. **Caching layer**
   - Redis for sessions
   - Redis for conversation cache
   - Memcached alternative

5. **Search**
   - Elasticsearch for message search
   - Full-text search optimization

6. **Analytics**
   - User activity tracking
   - Performance metrics
   - Error tracking (Sentry)

---

**Архитектура версия:** 1.0
**Последнее обновление:** 2024-01-15
