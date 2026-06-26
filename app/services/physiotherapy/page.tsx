"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  Languages, 
  Clock, 
  Briefcase, 
  UserCheck, 
  Heart, 
  Award, 
  Check, 
  ChevronRight, 
  ChevronDown,
  HeartPulse,
  Home,
  Video,
  Info,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/motion-primitives";
import { SectionBadge } from "@/components/ui/section-badge";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { getDictionary } from "@/lib/i18n/dictionary";
import { useLocale } from "@/components/providers/locale-provider";

// Map audience card index to a Lucide icon for rich visuals
const AUDIENCE_ICONS = [
  HeartPulse,  // Elderly
  Activity,    // Post-Surgery
  Award,       // Stroke & Neuro
  MapPin,      // Home Visit
  Languages,   // Multilingual
  Heart        // Busy Families
];

export default function PhysiotherapyPage() {
  const { locale, setLocale } = useLocale();
  const [activeTabId, setActiveTabId] = useState<string>("elderly");
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const d = getDictionary(locale);
  const t = d.physiotherapy;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeTab = t.services.tabs.find(tab => tab.id === activeTabId) || t.services.tabs[0];

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pb-24 md:pb-32">


      {/* Hero Header Section */}
      <section className="relative pt-24 pb-16 md:pt-36 bg-porcelain overflow-hidden flex items-center justify-center min-h-[420px]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-porcelain/90 backdrop-blur-[1px] z-0" />
        <div className="absolute inset-0 tech-grid opacity-30 z-0" />

        <div className="relative z-10 w-full px-4 sm:px-6 max-w-5xl mx-auto text-center mt-8">
          <Reveal>
            <SectionBadge icon={Activity}>{t.hero.eyebrow}</SectionBadge>
            <h1 className="page-heading text-ink mb-6 mt-4 tracking-tight leading-tight max-w-4xl mx-auto text-3xl md:text-5xl font-black">
              {t.hero.title}
            </h1>
            <p className="text-base md:text-lg font-semibold leading-relaxed text-slate-600 max-w-3xl mx-auto mb-8">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/services/physiotherapy/booking"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-md transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.hero.primaryCta}
                <ChevronRight className="h-4 w-4" />
              </Link>
              <button 
                onClick={() => scrollToSection("pricing-section")}
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.hero.secondaryCta}
              </button>
            </div>
            <p className="mt-4 text-[10px] font-bold text-slate-400 max-w-xl mx-auto uppercase tracking-wide">
              {t.hero.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Important Notice Callout Banner */}
      <section className="relative z-20 px-4 sm:px-6 max-w-5xl mx-auto mt-12">
        <Reveal>
          <div className="rounded-3xl border border-blue-100 bg-[#f0f7ff]/70 shadow-sm overflow-hidden transition-all duration-300">
            {/* Accordion Trigger */}
            <button
              onClick={() => setIsNoticeOpen(!isNoticeOpen)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none hover:bg-[#f0f7ff]/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 flex flex-wrap items-center gap-2 leading-none">
                    {t.notice.title} 
                    <span className="rounded-full bg-blue-100/50 px-2 py-0.5 text-[9px] font-black uppercase text-ocean tracking-wide">
                      {locale === "en" ? "Read Coordination Disclaimer" : "Xem Điều Khoản Hỗ Trợ"}
                    </span>
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1.5 leading-normal">
                    {locale === "en" 
                      ? "P2C Growth acts as a coordination assistant, not a clinical provider. Click to read full details."
                      : "P2C Growth hoạt động như một đơn vị hỗ trợ điều phối, không phải cơ sở lâm sàng. Click để xem chi tiết."}
                  </p>
                </div>
              </div>
              <div className="text-slate-400 p-1.5 hover:text-slate-650 transition-colors shrink-0 ml-4">
                <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", isNoticeOpen && "rotate-180")} />
              </div>
            </button>

            {/* Accordion Content */}
            <div className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden",
              isNoticeOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}>
              <div className="p-6 md:p-8 pt-0 space-y-4">
                <div className="h-px bg-blue-100/30 mb-4" />
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                  {t.notice.body1}
                </p>
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                  {t.notice.body2}
                </p>
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                  {t.notice.body3}
                </p>
                <div className="pt-4 border-t border-blue-200/40 text-xs font-black text-rose-800 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-800 mt-0.5" />
                  <span>{t.notice.emergency}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Who is it for (Audience Grid) */}
      <section id="audience-section" className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <SectionBadge icon={UserCheck}>{locale === "en" ? "TARGET PATIENTS" : "ĐỐI TƯỢNG PHÙ HỢP"}</SectionBadge>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ink mt-4 mb-4">
              {t.audience.title}
            </h2>
            <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-500">
              {t.audience.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.audience.items.map((item, idx) => {
            const Icon = AUDIENCE_ICONS[idx] || HeartPulse;
            return (
              <Reveal key={idx} delay={0.05 * idx}>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:border-ocean/30 transition-all group duration-300 h-full flex flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ocean/5 text-ocean transition-colors group-hover:bg-ocean group-hover:text-white shadow-sm border border-ocean/10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-extrabold tracking-tight text-ink mb-3 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold leading-relaxed text-slate-600 flex-grow">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why Choose P2C Section */}
      <section className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-28 bg-slate-50 py-16 md:py-24 rounded-[3rem] border border-slate-200">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionBadge icon={Clock}>{locale === "en" ? "CARE BRIDGING" : "CẦU NỐI Y TẾ"}</SectionBadge>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ink mt-4 mb-6 leading-tight">
              {t.why.title}
            </h2>
            <p className="text-sm md:text-base font-bold leading-relaxed text-slate-700 mb-8">
              {t.why.intro}
            </p>
            <div className="space-y-3 mb-8">
              {t.why.problems.map((prob, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-800 mt-0.5 border border-rose-200 shadow-sm">
                    <X className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{prob}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold leading-relaxed text-slate-600">
              {t.why.summary}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-premium">
              <div className="absolute top-6 left-6 text-7xl font-serif text-ocean/10 leading-none pointer-events-none select-none">“</div>
              <blockquote className="relative z-10 text-base md:text-lg font-bold italic leading-relaxed text-ink/80 pt-6">
                {t.why.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-200">
                <div className="h-8 w-8 rounded-full bg-ocean/10 flex items-center justify-center text-ocean font-extrabold text-xs border border-ocean/20">P2C</div>
                <div>
                  <h4 className="text-xs font-bold text-ink uppercase tracking-wider">P2C Growth Health Support</h4>
                  <p className="text-[10px] font-bold text-slate-500">UK Booking & Referral Network</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services We Coordinate (Interactive Tabs) */}
      <section id="services-section" className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <SectionBadge icon={Briefcase}>{locale === "en" ? "COORDINATED PROGRAMS" : "CHƯƠNG TRÌNH ĐIỀU PHỐI"}</SectionBadge>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ink mt-4 mb-4">
              {t.services.title}
            </h2>
            <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-500">
              {t.services.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Tab Selection Row */}
        <Reveal>
          <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-6 mb-8 max-w-4xl mx-auto">
            {t.services.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-200 whitespace-nowrap uppercase tracking-wider ${
                  activeTabId === tab.id
                    ? "bg-ocean text-white shadow-md shadow-blue-500/10 border border-ocean"
                    : "text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tab Content Area */}
        <div className="max-w-4xl mx-auto">
          <Reveal key={activeTabId}>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-premium">
              <h3 className="text-lg md:text-xl font-extrabold text-ink mb-2 uppercase tracking-wide">
                {activeTab.name}
              </h3>
              <p className="text-xs font-bold leading-relaxed text-slate-600 mb-8 border-b border-slate-200 pb-4">
                {activeTab.desc}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab.items.map((subService, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-ocean/30 transition-colors">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ocean/10 text-ocean shadow-sm border border-ocean/5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-700">{subService}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Operational Steps Timeline */}
      <section className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-28 bg-slate-50 py-20 rounded-[3rem] border border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <SectionBadge icon={UserCheck}>{locale === "en" ? "WORKFLOW" : "QUY TRÌNH"}</SectionBadge>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ink mt-4 mb-4">
              {t.steps.title}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
          {t.steps.items.map((step, idx) => (
            <Reveal key={idx} delay={0.1 * idx}>
              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-premium flex flex-col items-center text-center h-full">
                <div className="absolute -top-4 bg-ocean text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
                  {step.number}
                </div>
                <h3 className="text-sm font-black text-ink mt-4 mb-3 uppercase tracking-wider">
                  {step.name}
                </h3>
                <p className="text-[11px] font-bold leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing Tables Section */}
      <section id="pricing-section" className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <SectionBadge icon={Award}>{locale === "en" ? "PRICING RATES" : "BẢNG GIÁ DỊCH VỤ"}</SectionBadge>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ink mt-4 mb-4">
              {t.pricing.title}
            </h2>
            <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-500">
              {t.pricing.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Home Visit Pricing */}
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-premium hover:border-ocean/30 transition-all duration-300 h-full flex flex-col">
              <h3 className="text-base font-extrabold tracking-wide text-ink mb-6 uppercase border-b border-slate-200 pb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-ocean" />
                {t.pricing.homeTitle}
              </h3>
              <div className="space-y-4 flex-grow">
                {t.pricing.homeItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{item.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold mt-0.5">{item.duration}</p>
                    </div>
                    <span className="text-sm font-black text-ocean bg-ocean/5 px-3 py-1.5 rounded-lg shrink-0 border border-ocean/10">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Online Assessment Pricing */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-premium hover:border-ocean/30 transition-all duration-300 h-full flex flex-col">
              <h3 className="text-base font-extrabold tracking-wide text-ink mb-6 uppercase border-b border-slate-200 pb-4 flex items-center gap-2">
                <Video className="h-5 w-5 text-ocean" />
                {t.pricing.onlineTitle}
              </h3>
              <div className="space-y-4 flex-grow">
                {t.pricing.onlineItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{item.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold mt-0.5">{item.duration}</p>
                    </div>
                    <span className="text-sm font-black text-ocean bg-ocean/5 px-3 py-1.5 rounded-lg shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="text-center text-[10px] font-bold text-slate-500 max-w-xl mx-auto uppercase tracking-wide mt-8 flex items-center justify-center gap-2">
            <Info className="h-4 w-4 text-slate-400 shrink-0" />
            <span>{t.pricing.note}</span>
          </p>
        </Reveal>
      </section>



      {/* Frequently Asked Questions (FaqAccordion) */}
      <section id="faq-section" className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <SectionBadge icon={ShieldCheck}>FAQ</SectionBadge>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ink mt-4 mb-4">
              {t.faqs.title}
            </h2>
          </Reveal>
        </div>

        <div className="relative z-20">
          <FaqAccordion items={t.faqs.items} />
        </div>
      </section>

      {/* Footer Banner Section */}
      <section className="relative px-4 sm:px-6 max-w-5xl mx-auto mt-28 text-center bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 overflow-hidden shadow-xl">
        <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
        <Reveal>
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight mb-4">
            {t.footer.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-semibold leading-relaxed max-w-2xl mx-auto mb-8">
            {t.footer.desc}
          </p>
          <Link 
            href="/services/physiotherapy/booking"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-8 text-sm font-black text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.footer.button}
            <ChevronRight className="h-4 w-4" />
          </Link>
          <p className="mt-8 text-[9px] font-bold text-slate-500 max-w-2xl mx-auto uppercase tracking-wide leading-relaxed border-t border-slate-800/80 pt-6">
            {t.footer.disclaimer}
          </p>
        </Reveal>
      </section>
    </main>
  );
}
