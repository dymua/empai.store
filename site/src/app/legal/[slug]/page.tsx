import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/section";
import { getLegalDocs } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getLegalDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = getLegalDocs().find((x) => x.slug === slug);
  return d ? { title: d.title, alternates: { canonical: `/legal/${slug}/` } } : {};
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const d = getLegalDocs().find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <>
      <PageHero title={d.title} subtitle={d.updated ? `Оновлено: ${d.updated}` : undefined} />
      <Section>
        <article className="prose-empai max-w-3xl" dangerouslySetInnerHTML={{ __html: d.html }} />
      </Section>
    </>
  );
}
