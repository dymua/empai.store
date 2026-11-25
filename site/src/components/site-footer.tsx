import Link from "next/link";
import { getJson, getLegalDocs, type Settings } from "@/lib/content";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  const s = getJson<Settings>("settings");
  const legal = getLegalDocs();
  return (
    <footer className="border-t bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">{s.tagline}</p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Продукти</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {s.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-foreground">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Допомога</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/audit/" className="hover:text-foreground">AI-аудит</Link></li>
            <li><Link href="/faq/" className="hover:text-foreground">Питання та відповіді</Link></li>
            <li><Link href="/contact/" className="hover:text-foreground">Контакти</Link></li>
            <li><a href={s.agents_url} className="hover:text-foreground">agents.empai.store</a></li>
            {s.telegram_channel && (
              <li><a href={s.telegram_channel} className="hover:text-foreground">Telegram-канал</a></li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Документи</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {legal.map((d) => (
              <li key={d.slug}>
                <Link href={`/legal/${d.slug}/`} className="hover:text-foreground">{d.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} EMPAI.store · EmpAI™ · {s.location}</p>
          <p>
            <a href={`mailto:${s.email}`} className="hover:text-foreground">{s.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
