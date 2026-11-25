import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogGrid } from "@/components/catalog-grid";
import { ItemLanding } from "@/components/item-landing";
import { PageHero, Section } from "@/components/section";
import { getItem, getItems, getJson, type Section as S, type Settings } from "@/lib/content";

/** Спільна логіка для /team, /apps, /mcp та їхніх /<slug>. */

export function catalogPage(section: S, title: string, subtitle: string, filterBy?: "industries" | "platforms") {
  const metadata: Metadata = { title, description: subtitle, alternates: { canonical: `/${section}/` } };
  function Page() {
    const items = getItems(section).map((i) => ({
      href: `/${section}/${i.slug}/`,
      title: i.title,
      summary: i.summary,
      icon: i.icon,
      status: i.status,
      platforms: i.platforms,
      industries: i.industries,
    }));
    return (
      <>
        <PageHero title={title} subtitle={subtitle} />
        <Section>
          <CatalogGrid items={items} filterBy={filterBy} />
        </Section>
      </>
    );
  }
  return { metadata, Page };
}

type Params = { params: Promise<{ slug: string }> };

// Статичний експорт вимагає хоча б один шлях — тому заглушка "_" для порожнього розділу.
const EMPTY = "_";

export function itemPage(section: S) {
  function generateStaticParams() {
    const items = getItems(section);
    return items.length ? items.map((i) => ({ slug: i.slug })) : [{ slug: EMPTY }];
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const item = getItem(section, slug);
    if (!item) return {};
    return {
      title: item.seo_title || item.title,
      description: item.seo_description || item.summary,
      alternates: { canonical: `/${section}/${item.slug}/` },
      openGraph: { title: item.seo_title || item.title, description: item.seo_description || item.summary },
    };
  }

  async function Page({ params }: Params) {
    const { slug } = await params;
    const item = getItem(section, slug);
    if (!item) notFound();
    const s = getJson<Settings>("settings");
    return <ItemLanding item={item} auditUrl={s.audit_url} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
