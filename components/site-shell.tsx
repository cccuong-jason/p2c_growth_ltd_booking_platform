import Link from "next/link";
import { Activity, ArrowRight, CalendarPlus, LayoutDashboard } from "lucide-react";

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
    <header className="fixed inset-x-0 top-6 z-50 px-4 md:px-6">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 rounded-md pr-2 font-extrabold text-ink tracking-tight text-lg">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-ocean to-cyan text-white shadow-lg shadow-blue-500/30">
            <Activity className="h-6 w-6" aria-hidden />
          </span>
          P2C Growth
        </Link>
        
        <nav className="hidden items-center gap-1 rounded-xl bg-slate-900/5 p-1 text-[13px] font-bold text-slate-500 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-4 py-2 transition hover:bg-white hover:text-ocean hover:shadow-sm">
              {copy.nav[item.label]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/services/physiotherapy" className="hidden h-11 items-center gap-2 rounded-xl bg-ocean px-5 text-sm font-bold text-white transition hover:scale-105 hover:bg-blue-600 shadow-lg shadow-blue-500/20 sm:inline-flex active:scale-95">
            <CalendarPlus className="h-4 w-4" aria-hidden />
            Book Now
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white/50 px-4 text-sm font-bold text-ink transition hover:border-ocean hover:text-ocean active:scale-95"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{copy.nav.admin}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 text-sm text-slate-500 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 font-extrabold text-ink tracking-tight text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ocean text-white">
              <Activity className="h-5 w-5" aria-hidden />
            </span>
            P2C Growth
          </Link>
          <p className="max-w-xs leading-relaxed font-medium">
            Providing premium healthcare coordination and next-gen booking infrastructure for high-trust professional teams across the UK.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-ink mb-6 uppercase tracking-widest text-[10px]">Legal</h4>
          <div className="flex flex-col gap-4 font-bold">
            <Link href="/privacy" className="hover:text-ocean transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ocean transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-ink mb-6 uppercase tracking-widest text-[10px]">Action</h4>
          <Link
            href="/services/physiotherapy"
            className="inline-flex items-center gap-2 font-bold text-ocean hover:gap-3 transition-all"
          >
            Start a physio request <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-50 py-8 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} P2C Growth LTD. ALL RIGHTS RESERVED.
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
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ocean">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-extrabold text-ink md:text-5xl leading-[1.1] tracking-tight display-heading">{title}</h2>
      {description ? <p className="mt-6 text-lg leading-relaxed text-slate-500 font-medium">{description}</p> : null}
    </div>
  );
}

export function PageBand({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-5 py-16 md:py-24 ${className}`}>{children}</section>;
}
