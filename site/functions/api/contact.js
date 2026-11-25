/**
 * POST /api/contact — заявка з форми сайту → повідомлення в Telegram.
 *
 * Секрети Cloudflare Pages (Settings → Variables and Secrets):
 *   TELEGRAM_BOT_TOKEN — токен бота, що надсилає заявки
 *   TELEGRAM_CHAT_ID   — ваш chat ID або ID службового чату
 *
 * Захист: пастка-поле `company` для ботів, перевірка довжини полів,
 * лише same-origin запити.
 */
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const clip = (v, n) => String(v ?? "").trim().slice(0, n);
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

export async function onRequestPost({ request, env }) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.error("contact: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set");
    return json({ ok: false, message: "Форма тимчасово недоступна. Напишіть нам на пошту." }, 503);
  }

  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ ok: false, message: "Forbidden" }, 403);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, message: "Некоректні дані." }, 400);
  }

  // Пастка для ботів: вдаємо успіх.
  if (clip(data.company, 200)) return json({ ok: true });

  const name = clip(data.name, 100);
  const contact = clip(data.contact, 200);
  const topic = clip(data.topic, 200);
  const message = clip(data.message, 3000);
  const page = clip(data.page, 200);

  if (!name || !contact || !message) {
    return json({ ok: false, message: "Заповніть ім'я, контакт і повідомлення." }, 400);
  }

  const country = request.headers.get("CF-IPCountry") || "";
  const text =
    `<b>Нова заявка з empai.store</b>\n` +
    `<b>Ім'я:</b> ${esc(name)}\n` +
    `<b>Контакт:</b> ${esc(contact)}\n` +
    (topic ? `<b>Тема:</b> ${esc(topic)}\n` : "") +
    `<b>Сторінка:</b> ${esc(page)} ${country ? `(${esc(country)})` : ""}\n\n` +
    esc(message);

  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });

  if (!res.ok) {
    console.error("contact: telegram error", res.status, await res.text());
    return json({ ok: false, message: "Не вдалося надіслати. Спробуйте пізніше." }, 502);
  }
  return json({ ok: true });
}

export function onRequest() {
  return json({ ok: false, message: "Method not allowed" }, 405);
}
