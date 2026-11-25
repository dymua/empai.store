import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaBand, PageHero, Section, SectionTitle } from "@/components/section";
import { getJson, type Pricing } from "@/lib/content";
import { cn } from "@/lib/utils";

const p = getJson<Pricing>("pricing");

export const metadata: Metadata = { title: p.title, description: p.subtitle, alternates: { canonical: "/pricing/" } };

function Cell({ v }: { v: string }) {
  if (v === "✓") return <CheckIcon className="mx-auto size-5 text-primary" aria-label="так" />;
  if (v === "—") return <MinusIcon className="mx-auto size-4 text-muted-foreground/60" aria-label="ні" />;
  return <span>{v}</span>;
}

// Приймає й передає далі className/props від Button asChild (Slot).
function TierLink({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
  return href.startsWith("http") ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Рівні" title={p.title} subtitle={p.subtitle}>
        {p.note && <p className="mt-4 text-sm text-white/80">{p.note}</p>}
      </PageHero>

      {/* Картки рівнів */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {p.tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-xl bg-card px-8 py-10 shadow-pricing dark:border",
                t.highlight && "ring-2 ring-primary"
              )}
            >
              {t.highlight && (
                <span className="bg-brand-gradient absolute top-0 right-0 rounded-bl-lg px-4 py-1.5 text-sm font-semibold text-white">
                  Рекомендуємо
                </span>
              )}
              <span className="mb-4 block text-xl font-semibold">{t.name}</span>
              <p className="text-[32px] leading-tight font-bold whitespace-nowrap xl:text-[30px] 2xl:text-[34px]">
                {t.price_uah}
                <span className="text-base font-medium text-muted-foreground">{t.period}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {t.price_eur}
                {t.period}
              </p>
              <p className="mt-5 text-base font-medium">{t.description}</p>
              {t.for_whom && <p className="mt-1 text-sm text-muted-foreground">Для кого: {t.for_whom}</p>}
              <div className="my-7 h-px bg-border" />
              <ul className="flex-1 space-y-3 text-base">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-9 w-full" variant={t.highlight ? "default" : "outline"}>
                <TierLink href={t.cta_url}>{t.cta_label}</TierLink>
              </Button>
              {t.soon && <p className="mt-3 text-center text-xs text-muted-foreground">Залиште заявку — повідомимо про запуск.</p>}
            </div>
          ))}
        </div>
        {p.annual_note && <p className="mt-8 text-center text-base text-muted-foreground">{p.annual_note}</p>}
      </Section>

      {/* Порівняння */}
      {p.compare?.length > 0 && (
        <Section muted>
          <SectionTitle eyebrow="Порівняння" title="Що входить у кожен рівень" />
          <div className="overflow-x-auto rounded-xl bg-card shadow-pricing dark:border">
            <table className="w-full min-w-[760px] text-left text-sm sm:text-base">
              <caption className="sr-only">Порівняння рівнів EmpAI</caption>
              <thead>
                <tr className="border-b">
                  <th scope="col" className="w-[30%] p-5" />
                  {p.tiers.map((t) => (
                    <th key={t.name} scope="col" className={cn("p-5 text-center font-bold", t.highlight && "text-primary")}>
                      {t.name}
                      <span className="block text-sm font-medium text-muted-foreground">
                        {t.price_uah}
                        {t.period}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {p.compare.map((g) => (
                <tbody key={g.group}>
                  <tr className="bg-muted/60">
                    <th scope="colgroup" colSpan={p.tiers.length + 1} className="px-5 py-3 text-sm font-semibold tracking-wide text-primary uppercase">
                      {g.group}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.label} className="border-t">
                      <th scope="row" className="p-5 font-medium">
                        {r.label}
                        {r.hint && <span className="mt-1 block text-xs font-normal text-muted-foreground">{r.hint}</span>}
                      </th>
                      {r.values.map((v, i) => (
                        <td key={i} className={cn("p-5 text-center text-muted-foreground", p.tiers[i]?.highlight && "bg-primary/[0.04]")}>
                          <Cell v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Section>
      )}

      {p.faq.length > 0 && (
        <Section>
          <SectionTitle eyebrow="FAQ" title="Питання про рівні та оплату" />
          <Accordion type="single" collapsible className="mx-auto max-w-[760px]">
            {p.faq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      )}

      <CtaBand title="Не знаєте, який рівень обрати?" text="Пройдіть AI-аудит — агент порадить рівень і спеціалістів під вашу роботу." label="Пройти AI-аудит" href="/audit/" />
    </>
  );
}
