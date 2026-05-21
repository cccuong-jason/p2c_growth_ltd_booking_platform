import Link from "next/link";
import { Activity, ArrowRight, LayoutDashboard } from "lucide-react";

import { getDictionary } from "@/lib/i18n/dictionary";

const navItems = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/services", label: "services" },
  { href: "/services/physiotherapy", label: "physiotherapy" },
  { href: "/contact", label: "contact" }
] as const;

export function SiteHeader() {
  const copy = getDictionary();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/86 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white">
            <Activity className="h-5 w-5" aria-hidden />
          </span>
          P2C Growth
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ocean">
              {copy.nav[item.label]}
            </Link>
          ))}
        </nav>
        <Link
          href="/admin/login"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold text-ink transition hover:border-ocean hover:text-ocean"
        >
          <LayoutDashboard className="h-4 w-4" aria-hidden />
          {copy.nav.admin}
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-sm text-slate-600 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-ink">P2C Growth LTD</p>
          <p className="mt-3 max-w-md">
            A UK technology solutions provider for booking systems, CRMs, workflow automation, and
            professional partner coordination.
          </p>
        </div>
        <div className="grid gap-2">
          <Link href="/privacy" className="hover:text-ocean">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-ocean">
            Terms & Conditions
          </Link>
        </div>
        <div>
          <Link
            href="/services/physiotherapy"
            className="inline-flex items-center gap-2 font-semibold text-ocean"
          >
            Start a physio request <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ocean">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-bold text-ink md:text-6xl">{title}</h1>
      {description ? <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}

export function PageBand({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-5 py-16 md:py-24 ${className}`}>{children}</section>;
}
