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

## Персональные приглашения

Список гостей — в [`data/guests.json`](data/guests.json). Каждая семья получает короткую ссылку вида `/i/ivanovy`.

Пример записи:

```json
{
  "ivanovy": {
    "familyName": "Ивановы",
    "guestNames": "Елена и Александр",
    "guestCount": 2,
    "salutation": "plural"
  }
}
```

- **code** (ключ) — латиница, транслит фамилии: `ivanovy`, `sidorovy`
- **salutation** — `"plural"` | `"female"` | `"male"` для «Дорогие / Дорогая / Дорогой»
- **guestCount** — сколько человек приглашено

Генерация ссылок для рассылки:

```bash
NEXT_PUBLIC_SITE_URL=https://ваш-сайт.ru npm run invites
```

Скрипт создаст файл `invites.csv` с колонками code, familyName, guestNames, link. Скопируйте ссылки в WhatsApp или Telegram.

- `/` — общее приглашение без имён
- `/i/ivanovy` — персональная страница с приветствием и упрощённой RSVP-формой

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
| `app/i/[code]/page.tsx` | Персональное приглашение |
| `app/api/rsvp/route.ts` | Приём формы → Telegram |
| `data/guests.json` | Список гостей и коды приглашений |
| `components/` | Hero, PersonalizedGreeting, PhotoSection, Invitation, Program, DressCode, Rsvp, Countdown |
| `lib/wedding.ts` | Конфиг свадьбы |
| `lib/guests.ts` | Поиск гостей и форматирование приветствия |
| `lib/design.ts` | Цвета и ссылки на ассеты |
| `lib/rsvp-schema.ts` | Валидация полей |
| `lib/telegram.ts` | Формат и отправка сообщения |

## Скрипты

- `npm run dev` — разработка
- `npm run build` — production-сборка
- `npm run start` — запуск собранного приложения
- `npm run lint` — ESLint
- `npm run invites` — генерация CSV со ссылками на приглашения
