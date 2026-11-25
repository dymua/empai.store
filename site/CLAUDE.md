# EmpAI site — правила для Claude

- Сайт статичний (`output: "export"`). Жодних server actions, API routes Next.js, `cookies()`, ISR. Серверна логіка — лише в `functions/` (Cloudflare Pages Functions).
- Текст сайту — тільки в `content/`. Не хардкодьте тексти в компонентах; додайте поле в JSON/frontmatter і в `public/admin/config.yml`.
- Новий елемент каталогу = новий `.md` у `content/<розділ>/`. Назва файлу = slug = URL `/<розділ>/<slug>/`. Кожен розділ має містити хоча б один елемент без `draft: true`.
- Рядки YAML з двокрапкою беріть у лапки: `- "Огляд: ціни"`.
- Нова іконка: додайте в `src/components/icon.tsx` і в options поля icon у `config.yml`.
- Мова: українська. Стиль текстів: STE, BLUF, KISS — короткі речення, головне спочатку.
- Кольори бренду — токени в `src/app/globals.css` (`--brand-from` #FF4F12, `--brand-to` #B0166A). Не використовуйте довільні hex у компонентах.
- Перед комітом: `pnpm build` має проходити без помилок.
- Не змінюйте теки поза `site/` (старий сайт `docs/`, `myra/`, `poliguru.pp.ua/` тощо).
