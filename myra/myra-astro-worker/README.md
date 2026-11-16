# MYRA Astro Worker

Розраховує натальну карту, небо на дату, синастрію і транзити.
Движок: astronomy-engine (MIT, точність ±1′) + luxon (історичні часові пояси).

## Розгортання (5 хвилин)

```bash
cd myra-astro-worker
npm install
npx wrangler login                       # вхід у Cloudflare
npx wrangler secret put MYRA_ASTRO_KEY   # вигадайте довгий ключ і збережіть його
npm test                                 # локальна перевірка (9 тестів)
npm run deploy                           # адреса: https://myra-astro.<акаунт>.workers.dev
```

Власний домен: розкоментуйте `routes` у `wrangler.toml` і знову `npm run deploy`.

Перевірка: `GET /health` → `{"ok":true}`.

## API

Усі запити: `POST`, заголовок `x-myra-key: <ваш ключ>`, тіло JSON.

| Шлях | Тіло | Відповідь |
|---|---|---|
| `/natal` | `{birth_date, birth_time\|null, tz, lat, lon}` | планети, знаки, доми (Плацидус), ASC, MC, аспекти |
| `/sky` | `{datetime?}` (ISO, за замовчуванням зараз) | планети, ретроградність, фаза Місяця |
| `/synastry` | `{a:{…}, b:{…}}` | дві карти + аспекти між ними |
| `/transits` | `{natal:{…}, datetime?}` | натальна карта, небо, аспекти транзитів |

Приклад тіла `/natal`:
```json
{"birth_date":"1990-05-15","birth_time":"14:30","tz":"Europe/Kyiv","lat":50.45,"lon":30.52}
```

Без часу народження (`birth_time: null`) доми й ASC не розраховуються — це чесно.

## n8n (HTTP Request)

- Method: `POST`, URL: `https://<адреса воркера>/natal`
- Authentication: Generic → Header Auth, Name `x-myra-key`, Value — ваш ключ
- Body: JSON з полями користувача з `myra_users`

## Ліміти

Безкоштовний план Cloudflare Workers покриває очікуваний обсяг MYRA з великим запасом. Один розрахунок триває мілісекунди.
