# 🚀 Инструкция по развертыванию на Vercel БЕЗ ошибок

## Шаг 1: Push на GitHub

```bash
cd c:\Users\Tim\Desktop\Kitsune-Messanger

git add .
git commit -m "Fix: Remove environment variable references"
git push origin main
```

## Шаг 2: Откройте Vercel Dashboard

https://vercel.com/dashboard

## Шаг 3: Перейдите в Settings проекта

1. Откройте ваш проект **fox-messenger**
2. Нажмите **Settings** в верхнем меню
3. Слева выберите **Environment Variables**

## Шаг 4: Удалите старые переменные

Найдите и **УДАЛИТЕ**:
- ❌ `NEXTAUTH_SECRET = @NEXTAUTH_SECRET`
- ❌ `NEXTAUTH_URL = @NEXTAUTH_URL`
- ❌ Любые другие переменные со строкой `@...`

## Шаг 5: Добавьте новые переменные

Нажмите **Add New** и заполните ВСЕ переменные:

### Для Development & Production

```
Name: NEXTAUTH_SECRET
Value: foxmessenger2024secretkey12345678901234567890
Environments: ✓ Production ✓ Preview ✓ Development
```

```
Name: NEXTAUTH_URL
Value: https://fox-messenger.vercel.app
Environments: ✓ Production ✓ Preview ✓ Development
```

```
Name: NODE_ENV
Value: production
Environments: ✓ Production ✓ Preview ✓ Development
```

```
Name: NEXT_PUBLIC_APP_NAME
Value: Fox Messenger
Environments: ✓ Production ✓ Preview ✓ Development
```

```
Name: NEXT_PUBLIC_APP_URL
Value: https://fox-messenger.vercel.app
Environments: ✓ Production ✓ Preview ✓ Development
```

⚠️ **ВАЖНО:** Для каждой переменной выберите **ВСЕ** окружения (Production, Preview, Development)

## Шаг 6: Save

Нажмите **Save** для каждой переменной.

## Шаг 7: Redeploy

1. Откройте вкладку **Deployments**
2. Найдите последний деплой
3. Нажмите **Redeploy** → **Redeploy**

Или просто сделайте push в GitHub и Vercel автоматически перестроит:

```bash
git add .
git commit -m "Vercel deployment fix"
git push origin main
```

## ✅ Готово!

Развертывание должно пройти успешно без ошибок NEXTAUTH_SECRET!

---

### Если всё еще не работает:

1. **Очистите Vercel кэш:**
   - Settings → Git → Disconnect
   - Settings → Git → Connect снова

2. **Полный пересборка:**
   - Deployments → (последний) → Redeploy → Force Redeploy

3. **Проверьте URL:**
   - Убедитесь что `NEXTAUTH_URL` содержит правильный URL вашего приложения на Vercel
   - Формат: `https://[project-name].vercel.app`
