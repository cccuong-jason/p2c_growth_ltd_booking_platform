"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, Monitor, Workflow, UserCheck, Activity } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/home/motion-primitives";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { SectionBadge } from "@/components/ui/section-badge";
import { useLocale } from "@/components/providers/locale-provider";
import { getDictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

function HealthImageSlider() {
  const images = [
    "/assets/homepage/our-services/p2c-health/p2c-health-1.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-2.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-3.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-4.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-5.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-6.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-7.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-8.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-9.webp",
    "/assets/homepage/our-services/p2c-health/p2c-health-10.webp"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>
    </div>
  );
}

export default function ServicesPage() {
  const { locale } = useLocale();
  const d = getDictionary(locale);
  const t = d.servicesPage;

  const SERVICES = [
    {
      id: "health",
      eyebrow: locale === "en" ? "Medical" : locale === "vi" ? "Y tế" : "醫療",
      title: "P2C Health",
      body: locale === "en" 
        ? "A guided booking and referral workflow for patients, legal cases, insurers, and expert follow-up." 
        : locale === "vi" 
        ? "Một quy trình đặt lịch và giới thiệu có hướng dẫn dành cho bệnh nhân, các trường hợp pháp lý, bảo hiểm và theo dõi chuyên gia." 
        : "為患者、法律案例、保險公司和專家跟進提供引導式預約和轉介工作流。",
      href: "/services/physiotherapy",
      image: "/assets/homepage/our-services/p2c-health/p2c-health-1.webp",
    },
    {
      id: "web-dev",
      eyebrow: locale === "en" ? "Design" : locale === "vi" ? "Thiết kế" : "設計",
      title: locale === "en" ? "Website Development" : locale === "vi" ? "Thiết kế Website" : "網站開發",
      body: locale === "en" 
        ? "Premium websites for UK service companies that need clear offers, trust, and conversion paths." 
        : locale === "vi" 
        ? "Các trang web cao cấp tập trung vào chuyển đổi cho các doanh nghiệp dịch vụ tại UK." 
        : "為英國服務型企業提供以轉化為中心的高端網站。",
      href: "/services/website-development",
      image: "/assets/homepage/our-services/carousel/website-development-elementor-io-optimized.webp",
    },
    {
      id: "automation",
      eyebrow: locale === "en" ? "Automation" : locale === "vi" ? "Tự động hóa" : "自動化",
      title: locale === "en" ? "Booking System & Email Automation" : locale === "vi" ? "Đặt lịch & Tự động hóa email" : "預約系統與電子郵件自動化",
      body: locale === "en" 
        ? "Forms, status handoff, confirmation emails, and internal operations without manual chasing." 
        : locale === "vi" 
        ? "Biểu mẫu, bàn giao trạng thái, email xác nhận và vận hành nội bộ không cần xử lý thủ công." 
        : "表單、工作流、確認、通知和運營交接，無需人工催促。",
      href: "/services/booking-automation",
      image: "/assets/homepage/our-services/carousel/booking-system-and-email-automation-elementor-io-optimized.webp",
    },
    {
      id: "crm",
      eyebrow: locale === "en" ? "CRM" : locale === "vi" ? "CRM" : "CRM",
      title: locale === "en" ? "Customer Management / Mini CRM" : locale === "vi" ? "Quản lý khách hàng / Mini CRM" : "客戶管理 / 微型 CRM",
      body: locale === "en" 
        ? "Simple customer, enquiry, status, and partner context for teams that need visibility fast." 
        : locale === "vi" 
        ? "Thông tin khách hàng, yêu cầu hỗ trợ, trạng thái và đối tác đơn giản cho các đội ngũ cần hiển thị nhanh chóng." 
        : "為管理高信任度客戶關係的團隊提供輕量級儀表板。",
      href: "/coming-soon",
      image: "/assets/our-services/crm.png",
    },
    {
      id: "platform",
      eyebrow: locale === "en" ? "Platform" : locale === "vi" ? "Nền tảng" : "平台",
      title: locale === "en" ? "Customer-Partner Platform" : locale === "vi" ? "Nền tảng Khách hàng - Đối tác" : "客戶與合作夥伴平台",
      body: locale === "en" 
        ? "A reusable software layer for routing customers to professional partners and tracking outcomes." 
        : locale === "vi" 
        ? "Một lớp phần mềm có thể tái sử dụng để định tuyến khách hàng đến các đối tác chuyên môn và theo dõi kết quả." 
        : "客戶、內部團隊和專業合作夥伴之間的可重用協調層。",
      href: "/coming-soon",
      image: "/assets/homepage/our-services/carousel/customer-partner-platform-elementor-io-optimized.webp",
    },
    {
      id: "custom",
      eyebrow: locale === "en" ? "Custom" : locale === "vi" ? "Tùy chỉnh" : "自訂",
      title: locale === "en" ? "Tailored Solutions" : locale === "vi" ? "Giải pháp thiết kế riêng" : "定制解決方案",
      body: locale === "en" 
        ? "Custom integrations, API links, and specialized databases built around your specific dispatching rules." 
        : locale === "vi" 
        ? "Các tích hợp tùy chỉnh, liên kết API và cơ sở dữ liệu chuyên biệt được xây dựng xung quanh các quy tắc vận hành cụ thể của bạn." 
        : "根據您的特定派發規則構建的自定義集成、API 鏈接和專用數據庫。",
      href: "/contact",
      image: "/assets/our-services/tailored.png",
    },
  ];

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-porcelain overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <Reveal>
            <SectionBadge icon={LayoutDashboard}>{t.eyebrow}</SectionBadge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="page-heading text-ink mb-6">
              {t.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-2xl text-lg font-semibold leading-relaxed text-slate-600 md:text-xl">
              {t.subtitle}
            </p>
          </Reveal>
        </div>
        <ProgressiveBlur className="bottom-0 z-30 h-28" />
      </section>

      {/* Services List (1-Column Vertical Stack) */}
      <section className="relative z-40 -mt-10 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col gap-8">
        {SERVICES.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const isP2CHealth = item.id === "health";

          return (
            <Reveal key={item.id} delay={idx * 0.05} className="w-full">
              <article className={cn(
                "group relative w-full rounded-[2.5rem] border border-slate-200 bg-white p-8 md:p-12 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between gap-8 md:items-center",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              )}>
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                
                {/* Content Block */}
                <div className="relative z-10 flex-1 max-w-lg">
                  <span className="rounded-lg bg-blue-50 text-[10px] font-black uppercase tracking-widest text-ocean px-3 py-1.5 inline-block mb-4">
                    {item.eyebrow}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-ink tracking-tight mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-500 mb-8">
                    {item.body}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    {isP2CHealth ? (
                      <>
                        <Link
                          href="/services/physiotherapy/booking"
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ocean px-5 text-xs font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95"
                        >
                          {locale === "en" ? "Book expert" : locale === "vi" ? "Đặt lịch chuyên gia" : "預約專家"} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <Link
                          href="/services/physiotherapy"
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-black text-slate-600 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                        >
                          {locale === "en" ? "Learn more" : locale === "vi" ? "Tìm hiểu thêm" : "了解更多"}
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ocean px-5 text-xs font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95"
                      >
                        {item.id === "custom"
                          ? (locale === "en" ? "Contact Us" : locale === "vi" ? "Liên hệ" : "聯絡我們")
                          : (locale === "en" ? "Explore" : locale === "vi" ? "Khám phá" : "探索")}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Image / Graphic Block */}
                <div className="relative w-full md:w-[45%] h-[200px] md:h-[260px] rounded-2xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0">
                  {isP2CHealth ? (
                    <HealthImageSlider />
                  ) : (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>
    </main>
  );
}
