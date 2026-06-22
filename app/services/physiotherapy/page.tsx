"use client";

import { useState } from "react";
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
  HeartPulse 
} from "lucide-react";
import { BookingWizard } from "@/components/booking/booking-wizard";
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
      {/* Floating Language Toggle & Navigation Subbar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1">
            <button 
              onClick={() => scrollToSection("audience-section")}
              className="text-xs font-bold text-slate-500 hover:text-ocean whitespace-nowrap"
            >
              {locale === "en" ? "Who is it for" : "Đối tượng"}
            </button>
            <button 
              onClick={() => scrollToSection("services-section")}
              className="text-xs font-bold text-slate-500 hover:text-ocean whitespace-nowrap"
            >
              {locale === "en" ? "Services" : "Dịch vụ"}
            </button>
            <button 
              onClick={() => scrollToSection("pricing-section")}
              className="text-xs font-bold text-slate-500 hover:text-ocean whitespace-nowrap"
            >
              {locale === "en" ? "Pricing" : "Bảng giá"}
            </button>
            <button 
              onClick={() => scrollToSection("booking-section")}
              className="text-xs font-bold text-slate-500 hover:text-ocean whitespace-nowrap"
            >
              {locale === "en" ? "Book Now" : "Đặt lịch"}
            </button>
            <button 
              onClick={() => scrollToSection("faq-section")}
              className="text-xs font-bold text-slate-500 hover:text-ocean whitespace-nowrap"
            >
              FAQ
            </button>
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition ${
                locale === "en"
                  ? "bg-white text-ocean shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("vi")}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition ${
                locale === "vi"
                  ? "bg-white text-ocean shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              VI
            </button>
          </div>
        </div>
      </div>

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
              <button 
                onClick={() => scrollToSection("booking-section")}
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-md transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.hero.primaryCta}
                <ChevronRight className="h-4 w-4" />
              </button>
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
          <div className="rounded-3xl border border-amber-200/80 bg-amber-50/50 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-amber-900">{t.notice.title}</h3>
              <p className="text-xs font-semibold leading-relaxed text-slate-600">
                {t.notice.body1}
              </p>
              <p className="text-xs font-semibold leading-relaxed text-slate-600">
                {t.notice.body2}
              </p>
              <p className="text-xs font-semibold leading-relaxed text-slate-600">
                {t.notice.body3}
              </p>
              <div className="pt-2 border-t border-amber-200/60 text-xs font-black text-rose-700">
                🚨 {t.notice.emergency}
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
                <div className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm hover:border-ocean/20 transition-all group duration-300 h-full flex flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ocean/5 text-ocean transition-colors group-hover:bg-ocean group-hover:text-white shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-extrabold tracking-tight text-ink mb-3 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 flex-grow">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why Choose P2C Section */}
      <section className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-28 bg-slate-50/50 py-16 md:py-24 rounded-[3rem] border border-slate-100">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionBadge icon={Clock}>{locale === "en" ? "CARE BRIDGING" : "CẦU NỐI Y TẾ"}</SectionBadge>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ink mt-4 mb-6 leading-tight">
              {t.why.title}
            </h2>
            <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-600 mb-8">
              {t.why.intro}
            </p>
            <div className="space-y-3 mb-8">
              {t.why.problems.map((prob, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 mt-0.5">
                    <span className="text-[10px] font-bold">✕</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{prob}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold leading-relaxed text-slate-500">
              {t.why.summary}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-md">
              <div className="absolute top-6 left-6 text-7xl font-serif text-ocean/10 leading-none pointer-events-none select-none">“</div>
              <blockquote className="relative z-10 text-base md:text-lg font-bold italic leading-relaxed text-ink/80 pt-6">
                {t.why.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-100">
                <div className="h-8 w-8 rounded-full bg-ocean/10 flex items-center justify-center text-ocean font-extrabold text-xs">P2C</div>
                <div>
                  <h4 className="text-xs font-bold text-ink uppercase tracking-wider">P2C Growth Health Support</h4>
                  <p className="text-[10px] font-semibold text-slate-400">UK Booking & Referral Network</p>
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
                    : "text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/60"
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
            <div className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm">
              <h3 className="text-lg md:text-xl font-extrabold text-ink mb-2 uppercase tracking-wide">
                {activeTab.name}
              </h3>
              <p className="text-xs font-semibold leading-relaxed text-slate-500 mb-8 border-b border-slate-100 pb-4">
                {activeTab.desc}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab.items.map((subService, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 hover:border-ocean/10 transition-colors">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ocean/5 text-ocean shadow-sm">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{subService}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Operational Steps Timeline */}
      <section className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-28 bg-porcelain/60 py-20 rounded-[3rem] border border-slate-100">
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
              <div className="relative rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm flex flex-col items-center text-center h-full">
                <div className="absolute -top-4 bg-ocean text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
                  {step.number}
                </div>
                <h3 className="text-sm font-black text-ink mt-4 mb-3 uppercase tracking-wider">
                  {step.name}
                </h3>
                <p className="text-[11px] font-semibold leading-relaxed text-slate-500">
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
            <div className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm hover:border-ocean/20 transition-all duration-300 h-full flex flex-col">
              <h3 className="text-base font-extrabold tracking-wide text-ink mb-6 uppercase border-b border-slate-100 pb-4">
                🏡 {t.pricing.homeTitle}
              </h3>
              <div className="space-y-4 flex-grow">
                {t.pricing.homeItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4 py-3 border-b border-slate-50 last:border-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.duration}</p>
                    </div>
                    <span className="text-sm font-black text-ocean bg-ocean/5 px-3 py-1.5 rounded-lg shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Online Assessment Pricing */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm hover:border-ocean/20 transition-all duration-300 h-full flex flex-col">
              <h3 className="text-base font-extrabold tracking-wide text-ink mb-6 uppercase border-b border-slate-100 pb-4">
                💻 {t.pricing.onlineTitle}
              </h3>
              <div className="space-y-4 flex-grow">
                {t.pricing.onlineItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4 py-3 border-b border-slate-50 last:border-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.duration}</p>
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
          <p className="text-center text-[10px] font-bold text-slate-400 max-w-xl mx-auto uppercase tracking-wide mt-8">
            📢 {t.pricing.note}
          </p>
        </Reveal>
      </section>

      {/* Main Intake Form Section (BookingWizard) */}
      <section id="booking-section" className="relative px-4 sm:px-6 max-w-7xl mx-auto mt-28">
        <div className="max-w-4xl mx-auto bg-slate-50/40 rounded-[3rem] border border-slate-100 p-6 md:p-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Reveal>
              <SectionBadge icon={Activity}>{locale === "en" ? "REQUEST SYSTEM" : "HỆ THỐNG GỬI YÊU CẦU"}</SectionBadge>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-ink mt-4 mb-4">
                {locale === "en" ? "Submit Physio Request" : "Gửi Yêu Cầu Physio Booking"}
              </h2>
            </Reveal>
          </div>
          <div className="relative z-30">
            <BookingWizard />
          </div>
        </div>
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
          <button 
            onClick={() => scrollToSection("booking-section")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-8 text-sm font-black text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.footer.button}
            <ChevronRight className="h-4 w-4" />
          </button>
          <p className="mt-8 text-[9px] font-bold text-slate-500 max-w-2xl mx-auto uppercase tracking-wide leading-relaxed border-t border-slate-800/80 pt-6">
            {t.footer.disclaimer}
          </p>
        </Reveal>
      </section>
    </main>
  );
}
