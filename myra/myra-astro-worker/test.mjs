import worker from './src/index.js';
const env = { MYRA_ASTRO_KEY: 'test' };
const call = async (path, body, key = 'test') => {
  const r = await worker.fetch(new Request('https://x' + path, { method: 'POST', headers: { 'x-myra-key': key, 'content-type': 'application/json' }, body: JSON.stringify(body) }), env);
  return [r.status, await r.json()];
};
const assert = (c, m) => { if (!c) { console.error('FAIL', m); process.exit(1); } console.log('ok ', m); };

let [s, j] = await call('/natal', { birth_date: '2000-01-01', birth_time: '12:00', tz: 'UTC', lat: 51.5, lon: -0.13 });
assert(s === 200 && Math.abs(j.planets.Sun.lon - 280.37) < 0.02, 'Sun J2000 = 280.37°');
assert(Math.abs(j.planets.Moon.lon - 223.32) < 0.05, 'Moon J2000 = 223.32°');
assert(j.asc_sign === 'Aries', 'ASC London J2000 = Aries');
[s, j] = await call('/natal', { birth_date: '1985-03-20', birth_time: '07:15', tz: 'Europe/Kyiv', lat: 50.45, lon: 30.52 });
assert(j.utc.startsWith('1985-03-20T04:15'), 'Kyiv 1985 = UTC+3');
[s, j] = await call('/sky', { datetime: '2026-11-06T12:00:00Z' });
assert(s === 200 && j.moon_phase, 'sky: ' + j.moon_phase + ', retro: ' + j.retrograde.join(','));
[s, j] = await call('/synastry', { a: { birth_date: '1990-05-15', birth_time: '14:30', tz: 'Europe/Kyiv', lat: 50.45, lon: 30.52 }, b: { birth_date: '1992-11-02', birth_time: null, tz: 'Europe/Warsaw', lat: 52.23, lon: 21.01 } });
assert(s === 200 && j.aspects.length > 0, 'synastry aspects: ' + j.aspects.length);
[s, j] = await call('/transits', { natal: { birth_date: '1990-05-15', birth_time: '14:30', tz: 'Europe/Kyiv', lat: 50.45, lon: 30.52 }, datetime: '2026-11-06T12:00:00Z' });
assert(s === 200 && j.aspects.length > 0, 'transits aspects: ' + j.aspects.length);
[s] = await call('/natal', {}, 'wrong');
assert(s === 401, 'wrong key → 401');
[s, j] = await call('/natal', { birth_date: 'bad', tz: 'UTC' });
assert(s === 422, 'bad date → 422');
