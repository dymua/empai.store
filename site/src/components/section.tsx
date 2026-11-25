import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";

/**
 * Типографіка і ритм у стилі Play (Tailgrids), у палітрі EmpAI:
 * секції py-20 / lg:py-[120px], центровані заголовки 40px/1.2,
 * надзаголовок text-lg semibold кольору primary, текст — muted-foreground.
 */

export function Section({ className, children, muted, ...props }: React.HTMLAttributes<HTMLElement> & { muted?: boolean }) {
  return (
    <section className={cn("py-20 lg:py-[120px]", muted && "bg-muted", className)} {...props}>
      <div className="mx-auto max-w-[1200px] px-4">{children}</div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("mb-12 lg:mb-[70px]", align === "center" ? "mx-auto max-w-[620px] text-center" : "max-w-[620px]", className)}>
      {eyebrow && <span className="mb-2 block text-lg font-semibold text-primary">{eyebrow}</span>}
      <h2 className="mb-4 text-3xl leading-[1.2] font-bold sm:text-4xl md:text-[40px]">{title}</h2>
      {subtitle && <p className="text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/** Шапка внутрішніх сторінок: насичений брендовий фон, білий текст. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="on-brand bg-brand-gradient relative overflow-hidden text-white">
      <Shapes />
      <div className="relative mx-auto max-w-[1200px] px-4 pt-16 pb-16 text-center lg:pt-24 lg:pb-24">
        {eyebrow && <span className="mb-3 block text-lg font-semibold text-white/85">{eyebrow}</span>}
        <h1 className="mx-auto max-w-[820px] text-3xl leading-[1.2] font-bold sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-[640px] text-base font-medium text-white/90 sm:text-lg sm:leading-[1.44]">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

/** Декоративні кола на брендовому фоні. */
export function Shapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute -top-24 -left-24 size-72 rounded-full bg-white/10" />
      <span className="absolute -right-16 -bottom-28 size-96 rounded-full bg-white/[0.07]" />
      <span className="absolute top-1/3 right-1/4 size-24 rounded-full border-[14px] border-white/10" />
    </div>
  );
}

/** Іконка-плитка 70×70 на primary (картки переваг). */
export function FeatureIcon({ name, size = "lg" }: { name?: string; size?: "lg" | "md" }) {
  return (
    <span
      className={cn(
        "bg-brand-gradient grid shrink-0 place-items-center text-white shadow-2",
        size === "lg" ? "size-[70px] rounded-[14px]" : "size-[50px] rounded-xl"
      )}
    >
      <Icon name={name} className={size === "lg" ? "size-8" : "size-6"} />
    </span>
  );
}

/** Повноширинний CTA на брендовому фоні. */
export function CtaBand({
  title,
  text,
  label,
  href,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  text?: string;
  label: string;
  href: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const external = href.startsWith("http");
  return (
    <section className="on-brand bg-brand-gradient relative overflow-hidden py-20 text-white lg:py-[115px]">
      <Shapes />
      <div className="relative mx-auto max-w-[620px] px-4 text-center">
        <h2 className="mb-4 text-3xl leading-[1.25] font-bold md:text-[38px]">{title}</h2>
        {text && <p className="mx-auto mb-8 max-w-[515px] text-base leading-relaxed text-white/90">{text}</p>}
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="white">
            {external ? <a href={href}>{label}</a> : <Link href={href}>{label}</Link>}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button asChild size="lg" variant="glass">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
