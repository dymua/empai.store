import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold tracking-tight" aria-label="EmpAI — на головну">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-mark.png" alt="" width={32} height={32} className="size-8" />
      <span className="text-lg">
        Emp<span className="text-gradient-brand">AI</span>
      </span>
    </Link>
  );
}
