import Link from "next/link";
import { CheckIcon, ClockIcon, PlugIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StatusBadge } from "@/components/status-badge";
import { CtaBand, FeatureIcon, Section, SectionTitle, Shapes } from "@/components/section";
import type { Item } from "@/lib/content";

const SECTION_LABEL: Record<Item["section"], string> = {
  team: "Спеціалісти",
  apps: "Додатки",
  mcp: "MCP-сервіси",
};

/**
 * Шаблон міні-лендінгу для /<розділ>/<slug>:
 * Hero → Що робить → Процеси і конектори → Інтерфейс → Опис → Встановлення → FAQ → CTA.
 * Порожні блоки не показуються.
 */
export function ItemLanding({ item, auditUrl }: { item: Item; auditUrl: string }) {
  const ctaUrl = item.cta_url || auditUrl;
  const ctaLabel = item.cta_label || "Спробувати";
  const ctaExternal = ctaUrl.startsWith("http");
  return (
    <>
      <div className="on-brand bg-brand-gradient relative overflow-hidden text-white">
        <Shapes />
        <div className="relative mx-auto max-w-[1200px] px-4 pt-14 pb-20 lg:pt-20 lg:pb-28">
          <nav className="mb-10 text-sm text-white/80" aria-label="Навігація">
            <Link href={`/${item.section}/`} className="hover:text-white">{SECTION_LABEL[item.section]}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{item.title}</span>
          </nav>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[720px]">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={item.status} onBrand />
                {item.tier && <Badge className="bg-white/[0.14] text-white">від {item.tier}</Badge>}
              </div>
              <h1 className="mt-5 text-4xl leading-[1.15] font-bold sm:text-5xl lg:text-[56px]">{item.title}</h1>
              <p className="mt-5 text-base font-medium text-white/90 sm:text-lg sm:leading-[1.44]">{item.summary}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild size="lg" variant="white">
                  {ctaExternal ? <a href={ctaUrl}>{ctaLabel}</a> : <Link href={ctaUrl}>{ctaLabel}</Link>}
                </Button>
                <Button asChild size="lg" variant="glass">
                  <Link href="/audit/">Пройти AI-аудит</Link>
                </Button>
              </div>
            </div>
            {item.platforms.length > 0 && (
              <div className="rounded-xl bg-white/[0.12] p-6 backdrop-blur-sm lg:min-w-[300px]">
                <p className="mb-3 text-sm font-semibold text-white/85">Працює в</p>
                <ul className="space-y-2">
                  {item.platforms.map((p) => (
                    <li key={p} className="flex items-center gap-2 font-medium">
                      <CheckIcon className="size-4" aria-hidden /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {item.features.length > 0 && (
        <Section>
          <SectionTitle eyebrow="Можливості" title="Що робить" />
          <ul className="grid gap-6 sm:grid-cols-2">
            {item.features.map((f) => (
              <li key={f} className="flex gap-4 rounded-xl bg-card p-6 shadow-card dark:border">
                <span className="bg-brand-gradient grid size-8 shrink-0 place-items-center rounded-full text-white">
                  <CheckIcon className="size-4" aria-hidden />
                </span>
                <span className="pt-1 text-base">{f}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(item.processes.length > 0 || item.connectors.length > 0) && (
        <Section muted>
          <div className="grid gap-12 lg:grid-cols-2">
            {item.processes.length > 0 && (
              <div>
                <SectionTitle eyebrow="Автоматично" title="Процеси за розкладом" align="left" className="lg:mb-10" />
                <ul className="space-y-4">
                  {item.processes.map((p) => (
                    <li key={p.name} className="flex items-center justify-between gap-4 rounded-xl bg-card p-5 shadow-card dark:border">
                      <span className="flex items-center gap-3 font-medium">
                        <ClockIcon className="size-5 text-primary" aria-hidden />
                        {p.name}
                      </span>
                      {p.freq && <Badge variant="outline">{p.freq}</Badge>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.connectors.length > 0 && (
              <div>
                <SectionTitle eyebrow="Інтеграції" title="Конектори" align="left" className="lg:mb-10" />
                <div className="flex flex-wrap gap-3">
                  {item.connectors.map((c) => (
                    <span key={c} className="inline-flex items-center gap-2 rounded-md bg-card px-5 py-3 font-medium shadow-card dark:border">
                      <PlugIcon className="size-4 text-primary" aria-hidden />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {item.section === "team" && (
        <Section>
          <div className="flex flex-col items-start gap-8 rounded-xl bg-card p-10 shadow-pricing md:flex-row md:items-center dark:border">
            <FeatureIcon name="app-window" />
            <div>
              <h2 className="mb-3 text-2xl font-bold">Інтерфейс у чаті</h2>
              <p className="max-w-[720px] text-base text-muted-foreground">
                Форми, таблиці та дашборди відкриваються прямо в розмові (MCP Apps) — у Claude, ChatGPT та інших клієнтах.
                Для довгої роботи — окремий дашборд у Claude (Artifact).
              </p>
            </div>
          </div>
        </Section>
      )}

      {item.html.trim() && (
        <Section className="pt-0 lg:pt-0">
          <div className="prose-empai mx-auto max-w-[760px] text-base" dangerouslySetInnerHTML={{ __html: item.html }} />
        </Section>
      )}

      {item.install.length > 0 && (
        <Section muted>
          <SectionTitle eyebrow="Старт" title="Як встановити" />
          <ol className="grid gap-8 md:grid-cols-3">
            {item.install.map((s, i) => (
              <li key={s} className="rounded-xl bg-card p-8 shadow-card dark:border">
                <span className="text-gradient-brand text-4xl font-extrabold">0{i + 1}</span>
                <p className="mt-4 text-base">{s}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {item.faq.length > 0 && (
        <Section>
          <SectionTitle eyebrow="FAQ" title="Питання" />
          <Accordion type="single" collapsible className="mx-auto max-w-[760px]">
            {item.faq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      )}

      <CtaBand
        title="Не впевнені, що підходить саме вам?"
        text="AI-аудит за 5 хвилин підбере спеціалістів і процеси під вашу роботу."
        label="Пройти AI-аудит"
        href="/audit/"
        secondaryLabel="Ціни"
        secondaryHref="/pricing/"
      />
    </>
  );
}
