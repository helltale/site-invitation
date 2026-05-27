# Сайт-приглашение на свадьбу

Одностраничный сайт-приглашение: обратный отсчёт, детали торжества, RSVP-форма. Ответы гостей приходят в Telegram.

Референс: [eventpoligrafia.ru/karina](https://eventpoligrafia.ru/karina)

## Быстрый старт

```bash
npm install
cp .env.example .env.local
# заполните TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Настройка контента

Все тексты свадьбы — в одном файле [`lib/wedding.ts`](lib/wedding.ts):

- имена молодожёнов;
- дата и время (`date.iso` — для таймера и сортировки);
- место, ссылка на карту, дресс-код, программа;
- контакты (телефон, Telegram, WhatsApp);
- дедлайн RSVP (`date.rsvpDeadline`).

Визуал и URL картинок с референса — в [`lib/design.ts`](lib/design.ts) (палитра `#f4f0ed`, `#8d6645`, ассеты Tilda CDN). Для своей свадьбы замените SVG/фото на свои и обновите `lib/wedding.ts`.

## Telegram-бот

1. Откройте [@BotFather](https://t.me/BotFather) → `/newbot` → скопируйте токен в `TELEGRAM_BOT_TOKEN`.
2. Напишите боту любое сообщение в Telegram.
3. Откройте в браузере:  
   `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`  
   Найдите `"chat":{"id":123456789}` → это `TELEGRAM_CHAT_ID`.
4. Для локальной разработки создайте `.env.local` с обеими переменными.

## Деплой на Vercel

1. Загрузите репозиторий на GitHub.
2. [vercel.com/new](https://vercel.com/new) → Import → выберите репозиторий.
3. **Environment Variables** → добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
4. Deploy.

После деплоя проверьте форму с телефона и с компьютера.

## Структура

| Путь | Назначение |
|------|------------|
| `app/page.tsx` | Главная страница |
| `app/api/rsvp/route.ts` | Приём формы → Telegram |
| `components/` | Hero, PhotoSection, Invitation, Program, DressCode, Rsvp, Countdown |
| `lib/wedding.ts` | Конфиг свадьбы |
| `lib/design.ts` | Цвета и ссылки на ассеты |
| `lib/rsvp-schema.ts` | Валидация полей |
| `lib/telegram.ts` | Формат и отправка сообщения |

## Скрипты

- `npm run dev` — разработка
- `npm run build` — production-сборка
- `npm run start` — запуск собранного приложения
- `npm run lint` — ESLint
