import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { WordRotate } from "@/components/velora/word-rotate";
import { NumberTicker } from "@/components/velora/number-ticker";
import { BlurFade } from "@/components/velora/blur-fade";
import { Marquee } from "@/components/velora/marquee";
import { Button } from "@/components/ui/button";
import { CtaBand, FeatureIcon, Section, SectionTitle, Shapes } from "@/components/section";
import { CatalogGrid } from "@/components/catalog-grid";
import { getItems, getJson, type Home } from "@/lib/content";

export default function HomePage() {
  const h = getJson<Home>("home");
  const team = getItems("team").map((i) => ({
    href: `/team/${i.slug}/`,
    title: i.title,
    summary: i.summary,
    icon: i.icon,
    status: i.status,
    platforms: i.platforms,
    industries: i.industries,
  }));
  const platforms = ["Claude", "ChatGPT", "Gemini CLI", "Cursor", "VS Code", "agents.empai.store", "MCP", "Agent Skills"];

  return (
    <>
      {/* Hero — насичений брендовий фон (стиль Play) */}
      <div className="on-brand bg-brand-gradient relative overflow-hidden text-white">
        <Shapes />
        <div className="relative mx-auto max-w-[1200px] px-4 pt-[100px] pb-16 text-center md:pt-[120px] lg:pt-[140px]">
          <BlurFade>
            <span className="inline-flex rounded-full bg-white/[0.14] px-5 py-2 text-sm font-medium">{h.hero.eyebrow}</span>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h1 className="mx-auto mt-6 max-w-[860px] text-4xl leading-[1.15] font-bold sm:text-5xl lg:text-[64px]">
              {h.hero.title}
              <br />
              <WordRotate words={h.hero.rotate} className="text-gradient-brand" />
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mx-auto mt-6 max-w-[640px] text-base font-medium text-white/90 sm:text-lg sm:leading-[1.44]">
              {h.hero.subtitle}
            </p>
          </BlurFade>
          <BlurFade delay={0.3}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="white">
                <Link href={h.hero.primary_url}>{h.hero.primary_label}</Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link href={h.hero.secondary_url}>{h.hero.secondary_label}</Link>
              </Button>
            </div>
          </BlurFade>
          <dl className="mx-auto mt-16 grid max-w-[860px] gap-4 sm:grid-cols-3">
            {h.stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.12] px-6 py-5 backdrop-blur-sm">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-4xl font-bold">
                  <NumberTicker value={s.value} suffix={s.suffix} />
                </dd>
                <p className="mt-1 text-sm text-white/85">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Платформи */}
      <div className="border-b py-7">
        <Marquee pauseOnHover fade className="[--duration:30s]">
          {platforms.map((p) => (
            <span key={p} className="mx-8 text-base font-semibold text-muted-foreground">{p}</span>
          ))}
        </Marquee>
      </div>

      {/* Напрямки */}
      <Section>
        <SectionTitle eyebrow={h.directions_eyebrow} title={h.directions_title} subtitle={h.directions_subtitle} />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {h.directions.map((d) => (
            <Link key={d.href} href={d.href} className="group">
              <FeatureIcon name={d.icon} />
              <h3 className="mt-8 mb-3 text-xl font-bold group-hover:text-primary">{d.title}</h3>
              <p className="mb-6 text-base text-muted-foreground">{d.text}</p>
              <span className="inline-flex items-center gap-1 text-base font-medium group-hover:text-primary">
                Детальніше <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Конструктор */}
      <Section muted>
        <SectionTitle eyebrow={h.lego_eyebrow} title={h.lego_title} subtitle={h.lego_text} />
        <div className="grid gap-6 md:grid-cols-4">
          {h.lego.map((l, i) => (
            <div key={l.title} className="relative rounded-xl bg-card p-8 shadow-card">
              <span className="bg-brand-gradient grid size-10 place-items-center rounded-full text-base font-bold text-white">{i + 1}</span>
              <h3 className="mt-6 mb-2 text-xl font-bold">{l.title}</h3>
              <p className="text-base text-muted-foreground">{l.text}</p>
              {i < h.lego.length - 1 && (
                <span className="bg-brand-gradient absolute top-1/2 -right-[22px] z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full text-lg font-bold text-white md:grid" aria-hidden>
                  +
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Спеціалісти */}
      <Section>
        <SectionTitle eyebrow={h.team_eyebrow} title={h.team_title} subtitle={h.team_subtitle} />
        <CatalogGrid items={team} />
      </Section>

      {/* Як почати */}
      <Section muted>
        <SectionTitle eyebrow={h.how_eyebrow} title={h.how_title} subtitle={h.how_subtitle} />
        <ol className="grid gap-8 md:grid-cols-3">
          {h.how.map((s, i) => (
            <li key={s.title} className="rounded-xl bg-card p-10 text-center shadow-card">
              <span className="text-gradient-brand text-5xl font-extrabold">0{i + 1}</span>
              <h3 className="mt-4 mb-3 text-xl font-bold">{s.title}</h3>
              <p className="text-base text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Переваги */}
      <Section>
        <SectionTitle eyebrow={h.why_eyebrow} title={h.why_title} subtitle={h.why_subtitle} />
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {h.why.map((w) => (
            <div key={w.title} className="flex gap-6">
              <FeatureIcon name={w.icon} size="md" />
              <div>
                <h3 className="mb-2 text-xl font-bold">{w.title}</h3>
                <p className="text-base text-muted-foreground">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title={h.cta_title} text={h.cta_text} label="Пройти AI-аудит" href="/audit/" secondaryLabel="Дивитися ціни" secondaryHref="/pricing/" />
    </>
  );
}
