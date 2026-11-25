"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Cloudflare Web Analytics — без cookie, вмикається завжди (якщо є токен).
 * GA4 — лише після згоди користувача (банер нижче).
 * Ідентифікатори задаються змінними середовища під час збірки (див. .env.example).
 */
const CF_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "empai-consent";

export function Analytics() {
  const [consent, setConsent] = useState<"yes" | "no" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "yes" || v === "no") setConsent(v);
    } catch {}
    setReady(true);
  }, []);

  const save = (v: "yes" | "no") => {
    setConsent(v);
    try {
      localStorage.setItem(KEY, v);
    } catch {}
  };

  return (
    <>
      {CF_TOKEN && (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: CF_TOKEN })}
          strategy="afterInteractive"
        />
      )}
      {GA_ID && consent === "yes" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {GA_ID && ready && consent === null && (
        <div
          role="dialog"
          aria-label="Згода на cookie"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl flex-col gap-3 rounded-xl border bg-card p-4 shadow-lg sm:flex-row sm:items-center"
        >
          <p className="text-sm text-muted-foreground">
            Ми використовуємо Google Analytics, щоб покращувати сайт. Дозволити аналітичні cookie?
          </p>
          <div className="flex shrink-0 gap-2">
            <Button size="sm" variant="outline" onClick={() => save("no")}>Ні</Button>
            <Button size="sm" onClick={() => save("yes")}>Так</Button>
          </div>
        </div>
      )}
    </>
  );
}
