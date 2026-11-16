// MYRA — астро-движок (Cloudflare Worker)
// Залежності: astronomy-engine (MIT, ±1′), luxon (вбудований у n8n)
// Вхід item.json: { birth_date:'1990-05-15', birth_time:'14:30'|null, tz:'Europe/Kyiv', lat:50.45, lon:30.52 }
// Вихід: { utc, planets:{Sun:{lon,sign,deg,retro,house}}, asc, mc, houses[12], aspects[], time_known }

import * as A from 'astronomy-engine';
import { DateTime } from 'luxon';

const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const BODIES = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const ASPECTS = [['conjunction',0,8],['sextile',60,4],['square',90,6],['trine',120,6],['opposition',180,8]];
const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;
const norm = x => ((x % 360) + 360) % 360;

function bodyLon(body, date) {
  if (body === 'Sun') return A.SunPosition(date).elon;
  if (body === 'Moon') return A.EclipticGeoMoon(date).lon;
  return A.Ecliptic(A.GeoVector(body, date, true)).elon;      // геоцентрична, справжня екліптика дати
}

function meanNodeAndLilith(jd) {                                // Meeus, гл. 47 (середні значення)
  const T = (jd - 2451545.0) / 36525;
  const node = norm(125.0445479 - 1934.1362891*T + 0.0020754*T*T);
  const lilith = norm(83.3532465 + 4069.0137287*T - 0.0103200*T*T + 180); // середній апогей Місяця
  return { node, lilith };
}

function obliquity(jd) {                                        // середній нахил екліптики, Meeus 22.2
  const T = (jd - 2451545.0) / 36525;
  return 23.439291111 - 0.013004167*T - 1.639e-7*T*T + 5.036e-7*T*T*T;
}

function ascMc(date, lat, lon) {
  const jd = date.ut + 2451545.0;
  const eps = rad(obliquity(jd));
  const ramc = rad(norm(A.SiderealTime(date) * 15 + lon));     // місцевий зоряний час у градусах
  const mc = norm(deg(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps))));
  const asc = norm(deg(Math.atan2(Math.cos(ramc), -(Math.sin(ramc)*Math.cos(eps) + Math.tan(rad(lat))*Math.sin(eps)))));
  return { asc, mc, ramc: deg(ramc), eps: deg(eps) };
}

// Плацидус (ітеративно); за |lat| > 66° не існує — тоді Whole Sign
function placidus(ramcDeg, epsDeg, lat, asc, mc) {
  const e = rad(epsDeg), f = rad(lat), R = rad(ramcDeg);
  const cusp = (offset, frac, above) => {
    let lam = norm(deg(R) + offset);
    for (let i = 0; i < 50; i++) {
      const dec = Math.asin(Math.sin(e) * Math.sin(rad(lam)));
      const ad = Math.asin(Math.max(-1, Math.min(1, Math.tan(f) * Math.tan(dec))));
      const H = above ? frac * (Math.PI/2 + ad) : frac * (Math.PI/2 - ad);
      const ra = above ? R + H : R + Math.PI - H;
      const next = norm(deg(Math.atan2(Math.sin(ra), Math.cos(ra) * Math.cos(e))));
      if (Math.abs(next - lam) < 1e-6) break;
      lam = next;
    }
    return lam;
  };
  const c11 = cusp(30, 1/3, true), c12 = cusp(60, 2/3, true);
  const c2 = cusp(120, 2/3, false), c3 = cusp(150, 1/3, false);
  const h = [asc, c2, c3, norm(mc+180), norm(c11+180), norm(c12+180), norm(asc+180), norm(c2+180), norm(c3+180), mc, c11, c12];
  return h;
}

function houseOf(lon, cusps) {
  for (let i = 0; i < 12; i++) {
    const a = cusps[i], b = cusps[(i+1) % 12];
    if (norm(lon - a) < norm(b - a)) return i + 1;
  }
  return 12;
}

export function chart({ birth_date, birth_time, tz, lat, lon }) {
  const timeKnown = !!birth_time;
  const local = DateTime.fromISO(`${birth_date}T${timeKnown ? birth_time : '12:00'}`, { zone: tz }); // історичні DST/пояси з IANA
  if (!local.isValid) throw new Error('Invalid date/tz: ' + local.invalidExplanation);
  const date = A.MakeTime(local.toUTC().toJSDate());
  const jd = date.ut + 2451545.0;

  const planets = {};
  for (const b of BODIES) {
    const l = bodyLon(b, date);
    const l2 = bodyLon(b, date.AddDays(1/24));
    planets[b] = { lon: +l.toFixed(4), sign: SIGNS[Math.floor(l/30)], deg: +(l % 30).toFixed(2), retro: b !== 'Sun' && b !== 'Moon' && norm(l2 - l) > 180 };
  }
  const { node, lilith } = meanNodeAndLilith(jd);
  planets.NorthNode = { lon: +node.toFixed(4), sign: SIGNS[Math.floor(node/30)], deg: +(node%30).toFixed(2), retro: true };
  planets.Lilith = { lon: +lilith.toFixed(4), sign: SIGNS[Math.floor(lilith/30)], deg: +(lilith%30).toFixed(2), retro: false };

  let asc = null, mc = null, houses = null, system = null;
  if (timeKnown) {
    const am = ascMc(date, lat, lon);
    asc = am.asc; mc = am.mc;
    if (Math.abs(lat) < 66) { houses = placidus(am.ramc, am.eps, lat, asc, mc); system = 'Placidus'; }
    else { const s = Math.floor(asc/30)*30; houses = [...Array(12)].map((_,i)=>norm(s+30*i)); system = 'WholeSign'; }
    for (const k in planets) planets[k].house = houseOf(planets[k].lon, houses);
  }

  const keys = Object.keys(planets).filter(k => k !== 'Lilith');
  const aspects = [];
  for (let i = 0; i < keys.length; i++) for (let j = i+1; j < keys.length; j++) {
    let d = Math.abs(planets[keys[i]].lon - planets[keys[j]].lon); if (d > 180) d = 360 - d;
    for (const [name, angle, orb] of ASPECTS) {
      const o = Math.abs(d - angle);
      if (o <= (timeKnown || (keys[i] !== 'Moon' && keys[j] !== 'Moon') ? orb : orb/2)) aspects.push({ a: keys[i], b: keys[j], type: name, orb: +o.toFixed(2) });
    }
  }
  const sign = l => l == null ? null : SIGNS[Math.floor(l/30)];
  return {
    utc: local.toUTC().toISO(), time_known: timeKnown, house_system: system,
    sun_sign: planets.Sun.sign, moon_sign: planets.Moon.sign, asc_sign: sign(asc),
    asc: asc && +asc.toFixed(4), mc: mc && +mc.toFixed(4),
    houses: houses && houses.map(h => +h.toFixed(4)), planets, aspects,
  };
}


// Положення планет на момент (транзити, гороскоп дня)
export function sky({ datetime }) {
  const d = datetime ? new Date(datetime) : new Date();
  if (isNaN(d)) throw new Error('Invalid datetime');
  const date = A.MakeTime(d);
  const planets = {};
  for (const b of BODIES) {
    const l = bodyLon(b, date), l2 = bodyLon(b, date.AddDays(1/24));
    planets[b] = { lon: +l.toFixed(4), sign: SIGNS[Math.floor(l/30)], deg: +(l % 30).toFixed(2), retro: b !== 'Sun' && b !== 'Moon' && norm(l2 - l) > 180 };
  }
  const phase = A.MoonPhase(date);                       // 0 = новий Місяць, 180 = повня
  const phaseName = ['new','waxing_crescent','first_quarter','waxing_gibbous','full','waning_gibbous','last_quarter','waning_crescent'][Math.floor(((phase + 22.5) % 360) / 45)];
  return { utc: d.toISOString(), planets, moon_phase_deg: +phase.toFixed(2), moon_phase: phaseName,
           retrograde: Object.keys(planets).filter(k => planets[k].retro) };
}

// Аспекти між двома наборами планет (синастрія або транзити до натальної карти)
export function crossAspects(pa, pb, skip = ['Lilith']) {
  const out = [];
  for (const a of Object.keys(pa)) for (const b of Object.keys(pb)) {
    if (skip.includes(a) || skip.includes(b)) continue;
    let d = Math.abs(pa[a].lon - pb[b].lon); if (d > 180) d = 360 - d;
    for (const [name, angle, orb] of ASPECTS) {
      const o = Math.abs(d - angle);
      if (o <= orb) out.push({ a, b, type: name, orb: +o.toFixed(2) });
    }
  }
  return out.sort((x, y) => x.orb - y.orb);
}

export function synastry({ a, b }) {
  const ca = chart(a), cb = chart(b);
  return { a: ca, b: cb, aspects: crossAspects(ca.planets, cb.planets) };
}

export function transits({ natal, datetime }) {
  const c = chart(natal), s = sky({ datetime });
  return { natal: c, sky: s, aspects: crossAspects(s.planets, c.planets, ['Lilith','NorthNode']) };
}
