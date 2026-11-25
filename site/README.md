# empai.store — сайт (Next.js, статичний)

Скелет нового сайту EmpAI. Живе в теці `site/` репозиторію `dymua/empai.store`.
Старий сайт (`docs/`) і інші теки репозиторію цей проєкт не чіпає.

## Стек
- Next.js 16 (static export → `out/`), React 19, TypeScript
- Tailwind CSS 4 + компоненти shadcn/ui та Velora UI (MIT, див. `VELORA-LICENSE`)
- Контент: `content/` (Markdown + JSON) → редагується в Sveltia CMS на `/admin`
- Cloudflare Pages + Pages Functions (`functions/api/contact.js`: форма → Telegram)

## Локально
```bash
cd site
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # статичний сайт у out/
```

## Cloudflare Pages (тестовий домен *.pages.dev)
Створіть **новий** Pages-проєкт (старий для empai.store не змінюйте, поки не перевірите):

| Налаштування | Значення |
|---|---|
| Repository | `dymua/empai.store` |
| Production branch | `master` |
| Root directory | `site` |
| Build command | `pnpm build` |
| Build output directory | `out` |
| Environment variable | `NODE_VERSION=22` |

Змінні середовища (Settings → Variables and Secrets) — див. `.env.example`:
- `NEXT_PUBLIC_NOINDEX=1` на тестовому домені (заборона індексації).
- `NEXT_PUBLIC_CF_BEACON_TOKEN`, `NEXT_PUBLIC_GA_ID` — аналітика (необов'язково).
- Секрети `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — для форми контактів.

Перехід на бойовий домен: прибрати `NEXT_PUBLIC_NOINDEX`, під'єднати `empai.store` до нового проєкту.

## CMS (`/admin`)
Sveltia CMS, бекенд GitHub. Кожне збереження = коміт → Cloudflare перезбирає сайт (~1–2 хв).
1. Розгорніть OAuth-проксі: https://github.com/sveltia/sveltia-cms-auth (Cloudflare Worker, 1 раз).
2. Створіть GitHub OAuth App, callback — адреса воркера + `/callback`.
3. Вкажіть адресу воркера в `public/admin/config.yml` → `backend.base_url`.
Без воркера можна входити через «Sign in with Token» (GitHub Personal Access Token).

## Структура
```
content/            ← увесь текст сайту (CMS)
  settings.json home.json pricing.json automation.json faq.json
  team/*.md apps/*.md mcp/*.md plugins/*.md legal/*.md
src/app/            ← сторінки (/, /team, /team/[slug], /apps, /mcp, /plugins, /pricing, /automation, /audit, /faq, /contact, /legal/[slug])
src/components/     ← UI (ui/ — shadcn, velora/ — анімовані компоненти Velora)
functions/api/      ← Cloudflare Pages Functions
public/             ← статика; assistants/ edu/ tools/ images/ res/ — старі підсайти за тими ж URL
public/_redirects   ← 301 зі старих адрес (*.html → /legal/…)
```
