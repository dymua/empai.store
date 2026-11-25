import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Шар контенту. Усе, що редагується в CMS (/admin), лежить у `content/`.
 * Сторінки читають контент тут під час збірки — у коді тексту немає.
 */

const ROOT = path.join(process.cwd(), "content");

export type Section = "team" | "apps" | "mcp";

export type Status = "ready" | "beta" | "soon";

export interface Process {
  name: string;
  freq?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Item {
  section: Section;
  slug: string;
  title: string;
  summary: string;
  icon?: string;
  status: Status;
  order: number;
  draft: boolean;
  /** Середовища: Claude, ChatGPT, agents.empai.store … */
  platforms: string[];
  /** Галузеві добавки (для /team). */
  industries: string[];
  /** Мінімальний рівень: Free / Starter / Pro / Business. */
  tier?: string;
  features: string[];
  processes: Process[];
  connectors: string[];
  install: string[];
  faq: FaqItem[];
  cta_label?: string;
  cta_url?: string;
  seo_title?: string;
  seo_description?: string;
  html: string;
}

function readMd(file: string) {
  const raw = fs.readFileSync(file, "utf8");
  return matter(raw);
}

function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

/** Рядки списку. Захист від YAML-пастки: «Текст: ще текст» без лапок стає об'єктом. */
function asStrings(v: unknown): string[] {
  return asArray<unknown>(v).map((x) =>
    x && typeof x === "object" ? Object.entries(x as Record<string, unknown>).map(([k, val]) => `${k}: ${val}`).join(" ") : String(x)
  );
}

export function getItems(section: Section, opts: { includeDrafts?: boolean } = {}): Item[] {
  const dir = path.join(ROOT, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = readMd(path.join(dir, f));
      const slug = (data.slug as string) || f.replace(/\.md$/, "");
      return {
        section,
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        icon: data.icon,
        status: (data.status as Status) ?? "soon",
        order: Number(data.order ?? 100),
        draft: Boolean(data.draft),
        platforms: asStrings(data.platforms),
        industries: asStrings(data.industries),
        tier: data.tier,
        features: asStrings(data.features),
        processes: asArray<Process>(data.processes),
        connectors: asStrings(data.connectors),
        install: asStrings(data.install),
        faq: asArray<FaqItem>(data.faq),
        cta_label: data.cta_label,
        cta_url: data.cta_url,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        html: marked.parse(content, { async: false }) as string,
      } satisfies Item;
    })
    .filter((i) => opts.includeDrafts || !i.draft)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "uk"));
}

export function getItem(section: Section, slug: string): Item | undefined {
  return getItems(section).find((i) => i.slug === slug);
}

export function getJson<T>(name: string): T {
  return JSON.parse(fs.readFileSync(path.join(ROOT, `${name}.json`), "utf8")) as T;
}

export interface LegalDoc {
  slug: string;
  title: string;
  updated?: string;
  html: string;
}

export function getLegalDocs(): LegalDoc[] {
  const dir = path.join(ROOT, "legal");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = readMd(path.join(dir, f));
      return {
        slug: f.replace(/\.md$/, ""),
        title: String(data.title ?? f),
        updated: data.updated ? String(data.updated) : undefined,
        html: marked.parse(content, { async: false }) as string,
      };
    });
}

/* ---------- Типи JSON-файлів ---------- */

export interface Settings {
  site_name: string;
  site_url: string;
  tagline: string;
  description: string;
  email: string;
  telegram_channel?: string;
  telegram_bot?: string;
  agents_url: string;
  audit_url: string;
  location: string;
  nav: { label: string; href: string }[];
}

export interface Home {
  hero: {
    eyebrow: string;
    title: string;
    rotate: string[];
    subtitle: string;
    primary_label: string;
    primary_url: string;
    secondary_label: string;
    secondary_url: string;
  };
  stats: { value: number; suffix?: string; label: string }[];
  directions_eyebrow?: string;
  directions_title: string;
  directions_subtitle?: string;
  directions: { title: string; text: string; href: string; icon: string }[];
  lego_eyebrow?: string;
  lego_title: string;
  lego_text: string;
  lego: { title: string; text: string }[];
  team_eyebrow?: string;
  team_title: string;
  team_subtitle?: string;
  how_eyebrow?: string;
  how_title: string;
  how_subtitle?: string;
  how: { title: string; text: string }[];
  why_eyebrow?: string;
  why_title: string;
  why_subtitle?: string;
  why: { title: string; text: string; icon?: string }[];
  cta_title: string;
  cta_text: string;
}

export interface Tier {
  name: string;
  price_uah: string;
  price_eur: string;
  period?: string;
  description: string;
  features: string[];
  cta_label: string;
  cta_url: string;
  for_whom?: string;
  highlight?: boolean;
  soon?: boolean;
}

export interface CompareGroup {
  group: string;
  rows: { label: string; hint?: string; values: string[] }[];
}

export interface Pricing {
  title: string;
  subtitle: string;
  note: string;
  annual_note?: string;
  tiers: Tier[];
  compare: CompareGroup[];
  faq: FaqItem[];
}

export interface Automation {
  title: string;
  subtitle: string;
  examples: { role: string; process: string; freq: string }[];
  steps: { title: string; text: string }[];
  business_title: string;
  business_text: string;
}

export interface Faq {
  title: string;
  items: FaqItem[];
}
