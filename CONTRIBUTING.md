# Contributing to Fox Messenger

Спасибо за интерес к Fox Messenger! Мы рады сотрудничеству.

## 📋 Процесс разработки

### 1. Форк репозитория

```bash
# Нажмите "Fork" на GitHub
# Клонируйте ваш форк
git clone https://github.com/YOUR_USERNAME/fox-messenger.git
cd fox-messenger
```

### 2. Создайте branch

```bash
git checkout -b feature/amazing-feature
# или для bugfix:
git checkout -b bugfix/issue-description
```

### 3. Установите зависимости

```bash
npm install
```

### 4. Запустите dev сервер

```bash
npm run dev
```

### 5. Внесите изменения

Следуйте нашим стандартам кода:

- **TypeScript** - используйте для типизации
- **ESLint** - запустите перед коммитом
- **Prettier** - форматирование кода

```bash
# Проверка типов
npm run type-check

# Форматирование
npm run format

# Lint проверка
npm run lint
```

### 6. Тестируйте

```bash
# Локально протестируйте функциональность
npm run build
npm run start
```

### 7. Коммитьте изменения

```bash
git add .
git commit -m "feat: add amazing feature"

# Используйте conventional commits:
# feat:     new feature
# fix:      bug fix
# docs:     documentation
# style:    code style
# refactor: refactoring
# test:     testing
# chore:    maintenance
```

### 8. Push и Pull Request

```bash
git push origin feature/amazing-feature
```

На GitHub:
1. Нажмите "Compare & pull request"
2. Заполните описание PR
3. Отправьте

## 🎯 Направления для контрибьюции

### 🐛 Исправление ошибок

- Найдите issue с меткой `bug`
- Оставьте комментарий что работаете над ней
- Отправьте PR с исправлением

### ✨ Новые фичи

Рассмотрим:
- Real-time messaging (WebSocket)
- WebRTC implementation
- Message search
- Group chats
- User profiles
- Message reactions
- Dark/light mode toggle

### 📚 Документация

- Улучшение README
- Пополнение API документации
- Туториалы и примеры
- Перевод документации

### 🎨 UI/UX улучшения

- Новые компоненты
- Стилевые улучшения
- Адаптивный дизайн
- Доступность (a11y)

### ⚡ Performance

- Оптимизация сборки
- Уменьшение размера бандла
- Кэширование
- Оптимизация запросов

## 💻 Стандарты кода

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email?: string;
}

function getUserName(user: User): string {
  return user.name;
}

// ❌ Bad
function getUserName(user) {
  return user.name;
}
```

### React Components

```typescript
// ✅ Good
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return <button className={`btn-${variant}`} {...props} />;
};

// ❌ Bad
export const Button = ({ variant, ...props }) => {
  return <button className={`btn-${variant}`} {...props} />;
};
```

### Tailwind CSS

```jsx
// ✅ Good
<div className="p-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors" />

// ❌ Bad
<div style={{ padding: '16px', backgroundColor: '#f97316', color: 'white' }} />
```

## 📝 Commit Messages

Используйте [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add OAuth support
fix(chat): resolve message duplication
docs(readme): update installation steps
style(components): format button styles
refactor(api): simplify message handler
test(messages): add unit tests
chore: update dependencies
```

## 🔍 Процесс review

1. Ваш PR будет проверен мейнтейнерами
2. Может быть запрошены изменения
3. После approve - PR будет merged
4. Ваше имя добавится в Contributors ✨

## ⚙️ Настройка окружения

### Требования

- Node.js 18+
- npm или yarn
- Git
- Текстовый редактор (VS Code рекомендуется)

### VS Code Extensions (рекомендуемые)

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Prettier
- ESLint

### Файлы конфигурации

```
.eslintrc.json      # ESLint конфиг
.prettierrc          # Prettier конфиг
tsconfig.json       # TypeScript конфиг
tailwind.config.js  # Tailwind конфиг
next.config.js      # Next.js конфиг
```

## 🚀 Перед отправкой PR

- [ ] Код прошел ESLint (`npm run lint`)
- [ ] Код отформатирован (`npm run format`)
- [ ] Типы проверены (`npm run type-check`)
- [ ] Build успешен (`npm run build`)
- [ ] Тестировано локально
- [ ] Обновлена документация
- [ ] Добавлена ссылка на issue (если есть)

## 📖 Документация для контрибьюторов

- [Architecture](./ARCHITECTURE.md) - Архитектура приложения
- [API Documentation](./API.md) - API reference
- [Deployment Guide](./DEPLOYMENT.md) - Развертывание

## 🐛 Отчет об ошибках

При создании issue:

1. Используйте понятный заголовок
2. Опишите проблему
3. Приложите шаги для воспроизведения
4. Укажите ожидаемое поведение
5. Укажите версию браузера/OS

**Пример:**

```
Title: Images don't load after upload

Description:
When uploading an image, it shows as uploaded but doesn't display in chat.

Steps to reproduce:
1. Go to chat
2. Click upload button
3. Select image
4. Image doesn't show

Expected: Image should display in chat
Actual: Broken image icon

Environment:
- Browser: Chrome 120
- OS: Windows 11
- App version: 1.0.0
```

## 💬 Получение помощи

- **Questions**: GitHub Discussions
- **Bugs**: GitHub Issues
- **Chat**: GitHub Issues comments
- **Email**: contact@example.com

## 📜 Лицензия

Все контрибьюции публикуются под MIT License.

Отправляя PR, вы соглашаетесь с условиями MIT License.

## 🌟 Благодарности

Спасибо всем, кто контрибьютит в Fox Messenger!

Ваше имя будет добавлено в:
- [CONTRIBUTORS.md](./CONTRIBUTORS.md)
- GitHub contributors page
- Project README

---

**Спасибо за вклад! 🙏**

Если у вас есть вопросы, не стесняйтесь спрашивать. Мы здесь, чтобы помочь!

Happy coding! 🚀
