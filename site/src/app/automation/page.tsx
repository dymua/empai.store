import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero, Section, SectionTitle } from "@/components/section";
import { getJson, type Automation } from "@/lib/content";

const a = getJson<Automation>("automation");

export const metadata: Metadata = { title: a.title, description: a.subtitle, alternates: { canonical: "/automation/" } };

export default function AutomationPage() {
  return (
    <>
      <PageHero title={a.title} subtitle={a.subtitle} />
      <Section>
        <SectionTitle title="Приклади процесів" />
        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 font-semibold">Роль</th>
                <th className="p-4 font-semibold">Процес</th>
                <th className="p-4 font-semibold">Частота</th>
              </tr>
            </thead>
            <tbody>
              {a.examples.map((e) => (
                <tr key={e.process} className="border-t">
                  <td className="p-4 font-medium">{e.role}</td>
                  <td className="p-4 text-muted-foreground">{e.process}</td>
                  <td className="p-4"><Badge variant="outline">{e.freq}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section className="pt-0 lg:pt-0">
        <SectionTitle title="Аудит → Пілот → Впровадження" />
        <ol className="grid gap-6 md:grid-cols-3">
          {a.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border bg-card p-6">
              <span className="text-sm font-semibold text-primary">Крок {i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href="/audit/">Пройти AI-аудит</Link></Button>
        </div>
      </Section>
      <Section className="pt-0 lg:pt-0">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="text-2xl font-bold">{a.business_title}</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{a.business_text}</p>
          <Button asChild variant="outline" className="mt-6"><Link href="/contact/?topic=Business">Залишити заявку</Link></Button>
        </div>
      </Section>
    </>
  );
}
