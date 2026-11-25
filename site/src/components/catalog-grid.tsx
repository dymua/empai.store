"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FeatureIcon } from "@/components/section";
import { StatusBadge } from "@/components/status-badge";
import type { Status } from "@/lib/content";

export interface CardItem {
  href: string;
  title: string;
  summary: string;
  icon?: string;
  status: Status;
  platforms: string[];
  industries: string[];
}

/** Сітка карток каталогу з фільтром за галуззю (для /team) або платформою. */
export function CatalogGrid({ items, filterBy }: { items: CardItem[]; filterBy?: "industries" | "platforms" }) {
  const [active, setActive] = useState<string | null>(null);
  const tags = useMemo(
    () => (filterBy ? Array.from(new Set(items.flatMap((i) => i[filterBy]))).sort((a, b) => a.localeCompare(b, "uk")) : []),
    [items, filterBy]
  );
  const shown = active && filterBy ? items.filter((i) => i[filterBy].includes(active)) : items;

  return (
    <div>
      {tags.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Фільтр">
          <FilterChip label="Усі" active={!active} onClick={() => setActive(null)} />
          {tags.map((t) => (
            <FilterChip key={t} label={t} active={active === t} onClick={() => setActive(t)} />
          ))}
        </div>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((i) => (
          <Link key={i.href} href={i.href} className="group block focus-visible:outline-none">
            <div className="h-full rounded-xl border border-transparent bg-card p-8 shadow-card transition-all group-hover:-translate-y-1 group-hover:border-primary/40 group-focus-visible:ring-2 group-focus-visible:ring-ring dark:border-border">
              <div className="flex items-start justify-between gap-4">
                <FeatureIcon name={i.icon} size="md" />
                <StatusBadge status={i.status} />
              </div>
              <h3 className="mt-6 mb-3 text-xl font-bold group-hover:text-primary">{i.title}</h3>
              <p className="text-base text-muted-foreground">{i.summary}</p>
              {i.platforms.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {i.platforms.map((p) => (
                    <Badge key={p} variant="outline" className="font-normal">{p}</Badge>
                  ))}
                </div>
              )}
              <span className="mt-6 inline-flex items-center gap-1 text-base font-medium text-primary">
                Детальніше <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "rounded-md border px-5 py-2 text-sm font-medium transition-colors " +
        (active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")
      }
    >
      {label}
    </button>
  );
}
