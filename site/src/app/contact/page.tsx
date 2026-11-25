import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero, Section } from "@/components/section";
import { getJson, type Settings } from "@/lib/content";

const s = getJson<Settings>("settings");

export const metadata: Metadata = { title: "Контакти", description: "Напишіть нам: пілот, рівень Business, питання.", alternates: { canonical: "/contact/" } };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Контакти" subtitle="Пілот, рівень Business або питання — напишіть, і ми відповімо протягом робочого дня." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="space-y-4 text-sm">
          <div className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Email</h2>
            <a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a>
          </div>
          {s.telegram_channel && (
            <div className="rounded-xl border bg-card p-5">
              <h2 className="font-semibold">Telegram-канал</h2>
              <a href={s.telegram_channel} className="text-primary hover:underline">Новини EmpAI</a>
            </div>
          )}
          <div className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Адреса</h2>
            <p className="text-muted-foreground">{s.location}</p>
          </div>
        </aside>
        </div>
      </Section>
    </>
  );
}
