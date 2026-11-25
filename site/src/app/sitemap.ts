import type { MetadataRoute } from "next";
import { getItems, getJson, getLegalDocs, type Settings } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getJson<Settings>("settings").site_url.replace(/\/$/, "");
  const pages = ["/", "/team/", "/apps/", "/mcp/", "/automation/", "/pricing/", "/audit/", "/faq/", "/contact/"];
  const items = (["team", "apps", "mcp"] as const).flatMap((s) => getItems(s).map((i) => `/${s}/${i.slug}/`));
  const legal = getLegalDocs().map((d) => `/legal/${d.slug}/`);
  return [...pages, ...items, ...legal].map((p) => ({ url: `${base}${p}` }));
}
