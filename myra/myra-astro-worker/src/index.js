// MYRA Astro Worker — HTTP API для n8n
// Авторизація: заголовок x-myra-key = секрет MYRA_ASTRO_KEY (wrangler secret put MYRA_ASTRO_KEY)
import { chart, sky, synastry, transits } from './astro.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

const ROUTES = { '/natal': chart, '/sky': sky, '/synastry': synastry, '/transits': transits };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/health') return json({ ok: true, service: 'myra-astro', version: 1 });

    if (!env.MYRA_ASTRO_KEY || request.headers.get('x-myra-key') !== env.MYRA_ASTRO_KEY)
      return json({ error: 'unauthorized' }, 401);
    if (request.method !== 'POST') return json({ error: 'use POST' }, 405);

    const fn = ROUTES[url.pathname];
    if (!fn) return json({ error: 'not found', routes: Object.keys(ROUTES) }, 404);

    let body;
    try { body = await request.json(); } catch { return json({ error: 'invalid JSON body' }, 400); }
    try { return json(fn(body)); }
    catch (e) { return json({ error: String(e.message || e) }, 422); }
  },
};
