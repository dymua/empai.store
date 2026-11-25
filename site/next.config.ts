import type { NextConfig } from "next";

// Повністю статичний сайт: `next build` → `out/` для Cloudflare Pages.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
