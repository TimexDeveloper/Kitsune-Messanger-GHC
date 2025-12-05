# 🔌 API Documentation

API endpoints для Fox Messenger.

## Базовая информация

- **Base URL**: `https://your-app.vercel.app`
- **Auth Method**: Bearer Token (в заголовке Authorization)
- **Content-Type**: `application/json`

## Аутентификация

### Создание гостевого аккаунта

**Endpoint:** `POST /api/auth/guest`

**Request:**

```bash
curl -X POST https://your-app.vercel.app/api/auth/guest \
  -H "Content-Type: application/json" \
  -d '{"guestName": "John"}'
```

**Response (201):**

```json
{
  "success": true,
  "token": "abc123def456...",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "guestName": "John"
}
```

### Проверка сессии

**Endpoint:** `GET /api/auth/session`

**Request:**

```bash
curl -X GET https://your-app.vercel.app/api/auth/session \
  -H "Authorization: Bearer abc123def456..."
```

**Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John",
    "email": null,
    "is_guest": true,
    "guest_name": "John",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "session": {
    "token": "abc123def456...",
    "guest_name": "John",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "expires_at": "2024-02-14T10:30:00Z"
  }
}
```

## Сообщения

### Получить все разговоры пользователя

**Endpoint:** `GET /api/messages`

**Request:**

```bash
curl -X GET https://your-app.vercel.app/api/messages \
  -H "Authorization: Bearer abc123def456..." \
  -H "x-user-id: 550e8400-e29b-41d4-a716-446655440000"
```

**Response (200):**

```json
{
  "success": true,
  "conversations": [
    {
      "id": "conv-001",
      "participant_ids": ["user-1", "user-2"],
      "last_message_at": "2024-01-15T14:30:00Z",
      "created_at": "2024-01-10T10:00:00Z"
    }
  ]
}
```

### Создать или получить разговор

**Endpoint:** `POST /api/messages`

**Request:**

```bash
curl -X POST https://your-app.vercel.app/api/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer abc123def456..." \
  -d '{
    "participantIds": ["user-1", "user-2"]
  }'
```

**Response (200/201):**

```json
{
  "success": true,
  "conversation": {
    "id": "conv-001",
    "participant_ids": ["user-1", "user-2"],
    "last_message_at": "2024-01-15T14:30:00Z"
  }
}
```

### Получить сообщения из разговора

**Endpoint:** `GET /api/messages/[conversationId]`

**Query Parameters:**
- `limit`: Количество сообщений (по умолчанию: 50)
- `offset`: Смещение для пагинации (по умолчанию: 0)

**Request:**

```bash
curl -X GET "https://your-app.vercel.app/api/messages/conv-001?limit=20&offset=0" \
  -H "Authorization: Bearer abc123def456..."
```

**Response (200):**

```json
{
  "success": true,
  "messages": [
    {
      "id": "msg-001",
      "conversation_id": "conv-001",
      "sender_id": "user-1",
      "content": "Hello!",
      "image_url": null,
      "type": "text",
      "read_by": ["user-2"],
      "created_at": "2024-01-15T14:00:00Z"
    }
  ]
}
```

### Отправить сообщение

**Endpoint:** `POST /api/messages/[conversationId]`

**Request (текстовое сообщение):**

```bash
curl -X POST https://your-app.vercel.app/api/messages/conv-001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer abc123def456..." \
  -H "x-user-id: user-1" \
  -d '{
    "content": "Hello there!",
    "type": "text"
  }'
```

**Request (сообщение с изображением):**

```bash
curl -X POST https://your-app.vercel.app/api/messages/conv-001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer abc123def456..." \
  -H "x-user-id: user-1" \
  -d '{
    "content": "Check this out!",
    "type": "image",
    "imageUrl": "https://example.com/image.jpg",
    "imageAlt": "A nice image"
  }'
```

**Response (201):**

```json
{
  "success": true,
  "message": {
    "id": "msg-002",
    "conversation_id": "conv-001",
    "sender_id": "user-1",
    "content": "Hello there!",
    "type": "text",
    "read_by": [],
    "created_at": "2024-01-15T14:30:00Z"
  }
}
```

## Загрузка изображений

### Загрузить изображение

**Endpoint:** `POST /api/upload`

**Request:**

```bash
curl -X POST https://your-app.vercel.app/api/upload \
  -H "Authorization: Bearer abc123def456..." \
  -F "file=@/path/to/image.jpg"
```

**Response (201):**

```json
{
  "success": true,
  "imageUrl": "/uploads/img-1705331400000-image.jpg",
  "fileName": "img-1705331400000-image.jpg"
}
```

**Ограничения:**
- Максимальный размер: 5 MB
- Поддерживаемые форматы: JPG, PNG, WebP, GIF

## Пользователи

### Получить профиль пользователя

**Endpoint:** `GET /api/users/[userId]`

**Request:**

```bash
curl -X GET https://your-app.vercel.app/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer abc123def456..."
```

**Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John",
    "email": null,
    "avatar": null,
    "is_guest": true,
    "guest_name": "John",
    "created_at": "2024-01-15T10:30:00Z",
    "last_active": "2024-01-15T14:35:00Z"
  }
}
```

## Примеры использования (JavaScript)

### Пример 1: Создание гостевого аккаунта

```javascript
async function createGuestAccount(guestName) {
  const response = await fetch('/api/auth/guest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestName }),
  });

  const data = await response.json();
  localStorage.setItem('guestToken', data.token);
  localStorage.setItem('userId', data.userId);
  
  return data;
}

// Использование
const { token, userId } = await createGuestAccount('John');
```

### Пример 2: Получение сообщений

```javascript
async function getMessages(conversationId, token, userId) {
  const response = await fetch(`/api/messages/${conversationId}?limit=50`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-user-id': userId,
    },
  });

  const { messages } = await response.json();
  return messages;
}

// Использование
const messages = await getMessages('conv-001', token, userId);
```

### Пример 3: Отправка сообщения

```javascript
async function sendMessage(conversationId, content, token, userId) {
  const response = await fetch(`/api/messages/${conversationId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-user-id': userId,
    },
    body: JSON.stringify({
      content,
      type: 'text',
    }),
  });

  const { message } = await response.json();
  return message;
}

// Использование
const message = await sendMessage(
  'conv-001',
  'Hello!',
  token,
  userId
);
```

### Пример 4: Загрузка изображения

```javascript
async function uploadImage(file, token) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const { imageUrl } = await response.json();
  return imageUrl;
}

// Использование
const imageUrl = await uploadImage(fileInput.files[0], token);
```

## Коды ошибок

| Код | Описание |
|-----|---------|
| 200 | OK - запрос успешен |
| 201 | Created - ресурс создан |
| 400 | Bad Request - некорректные данные |
| 401 | Unauthorized - требуется аутентификация |
| 404 | Not Found - ресурс не найден |
| 500 | Internal Server Error - ошибка сервера |

## Rate Limiting

Текущих ограничений по rate limiting нет, но рекомендуется:
- Максимум 100 запросов в минуту на IP
- Максимум 1000 запросов в часов на пользователя

## CORS

API поддерживает CORS для запросов от всех источников.

---

**Версия API:** 1.0.0
**Последнее обновление:** 2024-01-15
