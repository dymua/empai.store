import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero, Section } from "@/components/section";
import { getJson, type Faq } from "@/lib/content";

const f = getJson<Faq>("faq");

export const metadata: Metadata = { title: f.title, alternates: { canonical: "/faq/" } };

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: f.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <>
      <PageHero title={f.title} />
      <Section>
        <Accordion type="single" collapsible className="max-w-3xl">
          {f.items.map((i) => (
            <AccordionItem key={i.q} value={i.q}>
              <AccordionTrigger>{i.q}</AccordionTrigger>
              <AccordionContent>{i.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
