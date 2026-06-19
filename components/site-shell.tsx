import React from "react";
import Link from "next/link";
import { Activity, ArrowRight, CalendarPlus, ChevronDown, Globe2, Menu, X } from "lucide-react";

import { getDictionary } from "@/lib/i18n/dictionary";
import { SectionBadge } from "@/components/ui/section-badge";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/services", label: "services" },
  { href: "/contact", label: "contact" }
] as const;

const serviceItems = [
  { href: "/services/physiotherapy", label: "P2C Health", body: "End-to-end booking, vetting, and coordination" },
  { href: "/services", label: "Website Development", body: "High-converting websites for service businesses" },
  { href: "/services", label: "Booking System & Email Automation", body: "Forms, notifications, and operational handoff" },
  { href: "/services", label: "Customer Management / Mini CRM", body: "Lightweight customer and status tracking" },
  { href: "/services", label: "Customer-Partner Platform", body: "Coordination layer between customers and experts" }
] as const;

const languages = [
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "ZH-T", label: "Traditional Chinese", flag: "🇭🇰" },
  { code: "ZH-S", label: "Simplified Chinese", flag: "🇨🇳" },
  { code: "VI", label: "Vietnamese", flag: "🇻🇳" },
] as const;

export function SiteHeader() {
  const copy = getDictionary();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-6">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/20 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 rounded-md pr-2 text-lg font-extrabold tracking-tight text-ink relative z-20">
          <Logo className="h-10 w-10 shrink-0" />
          P2C Growth
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden relative z-20 p-2 text-slate-600 hover:text-ink"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-4 top-[120%] bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 md:hidden">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-lg font-bold text-ink hover:text-ocean transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {copy.nav[item.label]}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-xl bg-slate-900/5 p-1 text-[13px] font-bold text-slate-600 md:flex relative z-20">
          {navItems.map((item) => (
            item.label === "services" ? (
              <div key={item.href} className="group relative">
                <Link href={item.href} className="inline-flex items-center gap-1 rounded-lg px-4 py-2 transition hover:bg-white hover:text-ocean hover:shadow-sm">
                  {copy.nav[item.label]}
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-[480px] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="grid gap-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl shadow-blue-500/10">
                    {serviceItems.map((service) => (
                      <Link key={service.label} href={service.href} className="rounded-xl p-3 transition hover:bg-blue-50">
                        <span className="block text-sm font-black text-ink">{service.label}</span>
                        <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">{service.body}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="rounded-lg px-4 py-2 transition hover:bg-white hover:text-ocean hover:shadow-sm">
                {copy.nav[item.label]}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="group relative" aria-label="Language switcher">
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 text-sm font-black text-ink transition hover:border-ocean hover:text-ocean active:scale-95 sm:px-4"
              aria-haspopup="true"
            >
              <span aria-hidden>{languages[0].flag}</span>
              <span className="hidden sm:inline">{languages[0].code}</span>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </button>
            <div className="invisible absolute right-0 top-full z-50 w-56 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-blue-500/10">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition hover:bg-blue-50 hover:text-ocean ${
                      language.code === "EN" ? "bg-ocean/10 text-ocean" : "text-slate-700"
                    }`}
                    aria-label={`Switch language to ${language.label}`}
                  >
                    <span className="text-base" aria-hidden>{language.flag}</span>
                    <span className="flex-1">{language.label}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{language.code}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-blue-400/20 bg-ocean text-blue-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 text-sm md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 font-extrabold text-white tracking-tight text-lg relative z-20">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-ocean">
              <Activity className="h-5 w-5" aria-hidden />
            </span>
            P2C Growth
          </Link>
          <p className="max-w-xs leading-relaxed font-semibold text-blue-50">
            Building websites, booking systems, automation, CRM tools, and customer-partner platforms for UK service companies.
          </p>
        </div>
        <div>
          <h4 className="font-black text-white mb-6 uppercase tracking-widest text-[10px]">Legal</h4>
          <div className="flex flex-col gap-4 font-bold">
            <Link href="/privacy" className="hover:text-white transition-colors text-blue-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors text-blue-100">
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-black text-white mb-6 uppercase tracking-widest text-[10px]">Action</h4>
          <Link
            href="/services/physiotherapy"
            className="inline-flex items-center gap-2 font-bold text-white hover:gap-3 transition-all underline underline-offset-4 decoration-blue-200/50 hover:decoration-white"
          >
            Start a medical expert request <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
      <div className="border-t border-blue-400/20 py-8 text-center text-[10px] font-bold text-blue-200/60 uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} P2C Growth LTD. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: any;
}) {
  return (
    <div className="max-w-3xl">
      <SectionBadge icon={icon}>{eyebrow}</SectionBadge>
      <h2 className="section-heading text-ink">{title}</h2>
      {description ? <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">{description}</p> : null}
    </div>
  );
}

export function PageBand({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-5 py-16 md:py-24 ${className}`}>{children}</section>;
}
