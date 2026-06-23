"use client";

import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/home/motion-primitives";
import { useLocale } from "@/components/providers/locale-provider";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function TermsPage() {
  const { locale } = useLocale();
  const d = getDictionary(locale);
  const t = d.terms;

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pb-24 md:pb-32">
      <section className="relative pt-32 pb-20 md:pt-40 bg-porcelain">
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 px-4 py-1.5 mb-6">
              <ShieldCheck className="h-4 w-4 text-ocean" />
              <span className="text-[11px] font-bold text-ocean uppercase tracking-[0.2em]">{t.tag}</span>
            </div>
            <h1 className="legal-page-heading text-ink mb-6">
              {t.title}
            </h1>
            <p className="text-lg font-medium leading-relaxed text-slate-600 mb-10">
              {t.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 max-w-4xl mx-auto mt-16">
        <Reveal delay={0.1}>
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium">
            <p>
              {t.p1}
            </p>
            <p>
              {t.p2}
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
