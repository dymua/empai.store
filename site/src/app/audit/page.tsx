import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/section";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { getJson, type Settings } from "@/lib/content";

const s = getJson<Settings>("settings");

export const metadata: Metadata = {
  title: "AI-аудит",
  description: "Безкоштовний AI-аудит: агент ставить 10–15 питань і підбирає спеціалістів і процеси під вашу роботу.",
  alternates: { canonical: "/audit/" },
};

const STEPS = [
  "Увійдіть в agents.empai.store через Google або Microsoft.",
  "Виберіть агента «Аудит EmpAI» і дайте відповідь на 10–15 питань.",
  "Отримайте звіт: карта автоматизацій і рекомендований набір спеціалістів.",
  "Запустіть пілот: встановіть набір і отримайте перший результат.",
];

export default function AuditPage() {
  return (
    <>
      <PageHero title="AI-аудит" subtitle="5 хвилин розмови з агентом — і ви знаєте, які спеціалісти та процеси потрібні саме вам. Безкоштовно." />
      <Section>
        <ol className="grid gap-4 md:grid-cols-2">
          {STEPS.map((t, i) => (
            <li key={t} className="flex gap-4 rounded-2xl border bg-card p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>
              <p className="pt-2">{t}</p>
            </li>
          ))}
        </ol>
        <div className="relative mt-10 overflow-hidden rounded-3xl border p-10 text-center">
          <AuroraBackground intensity="subtle" />
          <div className="relative">
            <Button asChild size="lg">
              <a href={s.audit_url}>Почати аудит у agents.empai.store</a>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">Безкоштовно, з денним лімітом використання.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
