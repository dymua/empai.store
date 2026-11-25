import type { MetadataRoute } from "next";
import { getJson, type Settings } from "@/lib/content";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getJson<Settings>("settings").site_url.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_NOINDEX === "1") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin/"] }, sitemap: `${base}/sitemap.xml` };
}
