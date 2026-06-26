"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import type { COBEOptions } from "cobe";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Activity,
  UserCheck,
  Workflow,
  LayoutDashboard,
  MailCheck,
  MessageSquareQuote,
  Plus,
  Command,
  Monitor,
  Filter,
  Rocket,
  ShieldCheck,
  CalendarCheck,
  Bell,
  QrCode,
  Puzzle,
  Send,
  Database,
  FileText
} from "lucide-react";

import { SectionBadge } from "@/components/ui/section-badge";
import { BentoCard } from "@/components/ui/bento-card";
import { GlassOverlay } from "@/components/ui/glass-overlay";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import {
  Reveal,
  SpringReveal,
  Magnetic,
  ParallaxStage,
  MotionDiv
} from "@/components/home/motion-primitives";
import { Globe } from "@/components/ui/globe";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { Ripple } from "@/components/ui/ripple";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Iphone } from "@/registry/magicui/iphone";
import { getDictionary } from "@/lib/i18n/dictionary";
import { useLocale } from "@/components/providers/locale-provider";


// --- SUB-COMPONENTS FOR MOCKUPS ---

const HERO_GLOBE_CONFIG: COBEOptions = {
  width: 1000,
  height: 1000,
  onRender: () => {},
  devicePixelRatio: 1.5,
  phi: 6.28,
  theta: 0.5,
  dark: 0.15,
  diffuse: 3,
  mapSamples: 12000,
  mapBrightness: 3.5,
  mapBaseBrightness: 0,
  scale: 1.2,
  offset: [0, 0],
  baseColor: [0.92, 0.96, 1],
  markerColor: [16 / 255, 185 / 255, 129 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [51.5072, -0.1276], size: 0.13 },
    { location: [53.4808, -2.2426], size: 0.09 },
    { location: [52.4862, -1.8904], size: 0.085 },
    { location: [21.0285, 105.8542], size: 0.095 },
    { location: [10.8231, 106.6297], size: 0.105 },
    { location: [39.9042, 116.4074], size: 0.092 },
    { location: [31.2304, 121.4737], size: 0.092 },
    { location: [22.3193, 114.1694], size: 0.082 },
  ],
};

export default function HomePage() {
  const { locale } = useLocale();
  const { home } = getDictionary(locale);

  const HOME_SERVICE_BOXES = [
    {
      eyebrow: locale === "en" ? "Medical" : locale === "vi" ? "Y tế" : "醫療",
      title: "P2C Health",
      body: locale === "en" 
        ? "A guided booking and referral workflow for patients, legal cases, insurers, and expert follow-up." 
        : locale === "vi" 
        ? "Một quy trình đặt lịch và giới thiệu có hướng dẫn dành cho bệnh nhân, các trường hợp pháp lý, bảo hiểm và theo dõi chuyên gia." 
        : "為患者、法律案例、保險公司和專家跟進提供引導式預約和轉介工作流。",
      href: "/services/physiotherapy",
      icon: Activity,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
    },
    {
      eyebrow: locale === "en" ? "Design" : locale === "vi" ? "Thiết kế" : "設計",
      title: locale === "en" ? "Website Development" : locale === "vi" ? "Thiết kế Website" : "網站開發",
      body: locale === "en" 
        ? "Premium websites for UK service companies that need clear offers, trust, and conversion paths." 
        : locale === "vi" 
        ? "Các trang web cao cấp tập trung vào chuyển đổi cho các doanh nghiệp dịch vụ tại UK." 
        : "為英國服務型企業提供以轉化為中心的高端網站。",
      href: "/coming-soon",
      icon: Monitor,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
    },
    {
      eyebrow: locale === "en" ? "Automation" : locale === "vi" ? "Tự động hóa" : "自動化",
      title: locale === "en" ? "Booking System & Email Automation" : locale === "vi" ? "Đặt lịch & Tự động hóa email" : "預約系統與電子郵件自動化",
      body: locale === "en" 
        ? "Forms, status handoff, confirmation emails, and internal operations without manual chasing." 
        : locale === "vi" 
        ? "Biểu mẫu, bàn giao trạng thái, email xác nhận và vận hành nội bộ không cần xử lý thủ công." 
        : "表單、工作流、確認、通知和運營交接，無需人工催促。",
      href: "/coming-soon",
      icon: Workflow,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85",
    },
    {
      eyebrow: locale === "en" ? "CRM" : locale === "vi" ? "CRM" : "CRM",
      title: locale === "en" ? "Customer Management / Mini CRM" : locale === "vi" ? "Quản lý khách hàng / Mini CRM" : "客戶管理 / 微型 CRM",
      body: locale === "en" 
        ? "Simple customer, enquiry, status, and partner context for teams that need visibility fast." 
        : locale === "vi" 
        ? "Thông tin khách hàng, yêu cầu hỗ trợ, trạng thái và đối tác đơn giản cho các đội ngũ cần hiển thị nhanh chóng." 
        : "為管理高信任度客戶關係的團隊提供輕量級儀表板。",
      href: "/coming-soon",
      icon: LayoutDashboard,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
    },
    {
      eyebrow: locale === "en" ? "Platform" : locale === "vi" ? "Nền tảng" : "平台",
      title: locale === "en" ? "Customer-Partner Platform" : locale === "vi" ? "Nền tảng Khách hàng - Đối tác" : "客戶與合作夥伴平台",
      body: locale === "en" 
        ? "A reusable software layer for routing customers to professional partners and tracking outcomes." 
        : locale === "vi" 
        ? "Một lớp phần mềm có thể tái sử dụng để định tuyến khách hàng đến các đối tác chuyên môn và theo dõi kết quả." 
        : "客戶、內部團隊和專業合作夥伴之間的可重用協調層。",
      href: "/coming-soon",
      icon: UserCheck,
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    },
    {
      eyebrow: locale === "en" ? "Custom" : locale === "vi" ? "Tùy chỉnh" : "自訂",
      title: locale === "en" ? "Tailored Solutions" : locale === "vi" ? "Giải pháp thiết kế riêng" : "定制解決方案",
      body: locale === "en" 
        ? "Custom integrations, API links, and specialized databases built around your specific dispatching rules." 
        : locale === "vi" 
        ? "Các tích hợp tùy chỉnh, liên kết API và cơ sở dữ liệu chuyên biệt được xây dựng xung quanh các quy tắc vận hành cụ thể của bạn." 
        : "根據您的特定派發規則構建的自定義集成、API 鏈接和專用數據庫。",
      href: "/contact",
      icon: Workflow,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  const ANALYTICS_BEAM_NODES = useMemo(() => [
    {
      id: "discover",
      title: locale === "en" ? "Discover workflow" : locale === "vi" ? "Khám phá quy trình" : "探索工作流",
      body: locale === "en" 
        ? "Map enquiry sources, service types, team responsibilities, customer touchpoints, and the current manual follow-up load." 
        : locale === "vi" 
        ? "Bản đồ nguồn yêu cầu, loại dịch vụ, trách nhiệm của nhóm, điểm tiếp xúc khách hàng và lượng công việc theo dõi thủ công hiện tại." 
        : "規劃諮詢來源、服務類型、團隊職責、客戶接觸點以及當前的人工跟進工作量。",
      icon: Command,
      nodeClassName: "left-4 top-24 md:left-10 md:top-[210px]",
      side: "left",
      path: "M150 118 C210 88 244 84 314 132",
    },
    {
      id: "design",
      title: locale === "en" ? "Design interface" : locale === "vi" ? "Thiết kế giao diện" : "設計界面",
      body: locale === "en" 
        ? "Turn the workflow into clear screens for customers, internal teams, and partners before build effort is committed." 
        : locale === "vi" 
        ? "Chuyển quy trình làm việc thành màn hình rõ ràng cho khách hàng, đội ngũ nội bộ và đối tác trước khi tiến hành xây dựng." 
        : "在投入開發工作之前，將工作流轉化為客戶、內部團隊和合作夥伴的清晰界面。",
      icon: Monitor,
      nodeClassName: "left-4 top-[450px] md:left-8 md:top-[470px]",
      side: "left",
      path: "M154 294 C220 316 248 274 318 242",
    },
    {
      id: "build",
      title: locale === "en" ? "Build system" : locale === "vi" ? "Xây dựng hệ thống" : "構建系統",
      body: locale === "en" 
        ? "Implement the website, forms, status views, email triggers, and lightweight CRM records around the approved flow." 
        : locale === "vi" 
        ? "Triển khai trang web, biểu mẫu, chế độ xem trạng thái, trình kích hoạt email và hồ sơ CRM nhẹ xung quanh luồng đã được phê duyệt." 
        : "圍繞已批准的流程，開發網站、表單、狀態視圖、電子郵件觸發器和輕量級 CRM 記錄。",
      icon: Filter,
      nodeClassName: "right-4 top-24 md:right-6 md:top-[210px]",
      side: "right",
      path: "M290 118 C230 88 196 84 126 132",
    },
    {
      id: "launch",
      title: locale === "en" ? "Launch and iterate" : locale === "vi" ? "Ra mắt & Cải tiến" : "上線與迭代",
      body: locale === "en" 
        ? "Release the first version, review real usage, and improve the system as the business adds services or partners." 
        : locale === "vi" 
        ? "Phát hành phiên bản đầu tiên, đánh giá việc sử dụng thực tế và cải tiến hệ thống khi doanh nghiệp thêm dịch vụ hoặc đối tác." 
        : "發布首個版本，評估實際使用情況，並在業務增加服務或合作夥伴時改進系統。",
      icon: Rocket,
      nodeClassName: "right-4 top-[450px] md:right-6 md:top-[480px]",
      side: "right",
      path: "M286 300 C220 320 190 278 122 242",
    },
  ], [locale]);

  const FAQ_ITEMS = [
    {
      question: locale === "en" ? "What does P2C Growth build?" : locale === "vi" ? "P2C Growth xây dựng những gì?" : "P2C Growth 構建什麼？",
      answer: locale === "en" 
        ? "Websites, booking workflows, email automation, lightweight CRM tools, and customer-partner platforms for UK service businesses." 
        : locale === "vi" 
        ? "Website, quy trình đặt lịch, tự động hóa email, công cụ CRM gọn nhẹ và nền tảng kết nối khách hàng - đối tác cho các doanh nghiệp dịch vụ tại UK." 
        : "為英國服務型公司提供網站建設、預約工作流、自動化流程、微型 CRM 工具及客戶與合作夥伴協調平台。",
    },
    {
      question: locale === "en" ? "Can you improve an existing workflow?" : locale === "vi" ? "Bạn có thể cải thiện quy trình hiện có không?" : "你們能改進現有的工作流嗎？",
      answer: locale === "en" 
        ? "Yes. We can map the current enquiry, booking, follow-up, and handoff process, then rebuild the parts that create the most manual work." 
        : locale === "vi" 
        ? "Có. Chúng tôi có thể lập bản đồ quy trình yêu cầu, đặt lịch, theo dõi và bàn giao hiện tại, sau đó xây dựng lại các phần tạo ra nhiều công việc thủ công nhất." 
        : "可以。我們可以規劃當前的諮詢、預約、跟進和交接流程，然後重建產生最多人工工作的環節。",
    },
    {
      question: locale === "en" ? "Is P2C Health the whole business?" : locale === "vi" ? "P2C Health có phải là toàn bộ hoạt động kinh doanh không?" : "P2C Health 是全部業務嗎？",
      answer: locale === "en" 
        ? "No. It is one service offering. The homepage represents P2C Growth LTD as a broader technology and software company." 
        : locale === "vi" 
        ? "Không. Đó là một dịch vụ được cung cấp. Trang chủ đại diện cho P2C Growth LTD như một công ty phần mềm và công nghệ rộng lớn hơn." 
        : "不是。它只是其中一項服務。首頁代表 P2C Growth LTD 作為一家更廣泛的技術與軟件公司。",
    },
  ];
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const scrollServices = (direction: "left" | "right") => {
    if (servicesScrollRef.current) {
      const scrollAmount = servicesScrollRef.current.clientWidth;
      servicesScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const [activeAnalyticsNode, setActiveAnalyticsNode] = useState(ANALYTICS_BEAM_NODES[0].id);
  const [hasSelectedAnalyticsNode, setHasSelectedAnalyticsNode] = useState(false);
  const activeAnalytics = ANALYTICS_BEAM_NODES.find((node) => node.id === activeAnalyticsNode) ?? ANALYTICS_BEAM_NODES[0];
  const activeAnalyticsIndex = ANALYTICS_BEAM_NODES.findIndex((node) => node.id === activeAnalytics.id);
  const ActiveAnalyticsIcon = activeAnalytics.icon;

  useEffect(() => {
    if (hasSelectedAnalyticsNode) {
      return;
    }

    const rotation = window.setInterval(() => {
      setActiveAnalyticsNode((currentId) => {
        const currentIndex = ANALYTICS_BEAM_NODES.findIndex((node) => node.id === currentId);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % ANALYTICS_BEAM_NODES.length;

        return ANALYTICS_BEAM_NODES[nextIndex].id;
      });
    }, 3600);

    return () => window.clearInterval(rotation);
  }, [hasSelectedAnalyticsNode, ANALYTICS_BEAM_NODES]);

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">

      {/* --- HERO SECTION WITH GLOBE --- */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 md:pt-48 md:pb-40 bg-white overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[47%] z-0 w-[760px] max-w-[132vw] -translate-x-1/2 -translate-y-1/2 opacity-55 md:w-[980px]">
          <Globe config={HERO_GLOBE_CONFIG} className="mx-auto" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_33%,rgba(247,251,255,0.92)_0%,rgba(247,251,255,0.72)_30%,rgba(247,251,255,0.22)_56%),radial-gradient(circle_at_50%_74%,rgba(247,251,255,0.18)_20%,rgba(247,251,255,0.94)_68%)]" />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center relative z-20 px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <SpringReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-xl px-4 py-1.5 text-[11px] font-bold text-slate-700 mb-8 uppercase tracking-[0.2em] shadow-premium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ocean"></span>
              </span>
              {home.eyebrow}
            </div>
          </SpringReveal>
 
          <div className="max-w-5xl mx-auto min-h-[140px] flex items-center justify-center">
             <TypingAnimation
                className="text-5xl md:text-[5.5rem] font-extrabold text-ink tracking-tight leading-[1.1] justify-center display-heading"
                duration={50}
             >
                {home.heroTitle}
             </TypingAnimation>
          </div>
 
          <Reveal delay={0.6}>
            <p className="mt-10 max-w-2xl text-lg font-semibold leading-relaxed text-slate-600 md:text-xl">
              {home.subtitle}
            </p>
          </Reveal>
 
          <Reveal delay={0.8}>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              <Magnetic>
                <Link href="/services" className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-ocean px-12 text-base font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95">
                  {home.primaryCta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>

        </div>
        <ProgressiveBlur className="bottom-0 z-30 h-28" />
      </section>

      {/* --- SERVICES CAROUSEL --- */}
      <section className="bg-[#f0f7ff] px-4 py-24 sm:px-6 md:py-32 overflow-hidden relative border-y border-blue-100/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Reveal>
              <SectionBadge icon={LayoutDashboard} size="lg">{locale === "en" ? "Our services" : locale === "vi" ? "Dịch vụ của chúng tôi" : "我們的服務"}</SectionBadge>
            </Reveal>
          </div>

          {/* Desktop Layout (Hidden on mobile) */}
          <div className="hidden md:block relative px-1">
            <article className="group relative w-full rounded-[2.5rem] border border-slate-200 bg-white p-8 md:p-12 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row justify-between gap-8 md:items-center">
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              <div className="relative z-10 flex-1 max-w-xl">
                <span className="rounded-lg bg-blue-50 text-[10px] font-black uppercase tracking-widest text-ocean px-3 py-1.5 inline-block mb-6">
                  {locale === "en" ? "Medical" : locale === "vi" ? "Y tế" : "醫療"}
                </span>
                <h3 className="text-3xl md:text-5xl font-black text-ink tracking-tight mb-4 leading-none">P2C Health</h3>
                <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-500 mb-8">
                  {HOME_SERVICE_BOXES[0].body}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/services/physiotherapy/booking"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95"
                  >
                    {locale === "en" ? "Book expert" : locale === "vi" ? "Đặt lịch chuyên gia" : "預約專家"} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/services/physiotherapy"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-600 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                  >
                    {locale === "en" ? "Learn more" : locale === "vi" ? "Tìm hiểu thêm" : "了解更多"}
                  </Link>
                </div>
              </div>
              <div className="relative w-full md:w-[48%] h-[200px] md:h-[280px] rounded-2xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85)` }}
                />
              </div>
            </article>

            <div className="relative mt-6">
              <div
                ref={servicesScrollRef}
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-8 -my-8 px-10 -mx-10"
              >
                <div className="w-full flex-none snap-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Website Development */}
                  <article className="group relative w-full h-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          {HOME_SERVICE_BOXES[1].eyebrow}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">{HOME_SERVICE_BOXES[1].title}</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          {HOME_SERVICE_BOXES[1].body}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <Monitor className="h-5 w-5" />
                        </div>
                        <Link
                          href="/coming-soon"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          {locale === "en" ? "View More" : locale === "vi" ? "Xem thêm" : "查看更多"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>

                  {/* Booking System & Email Automation */}
                  <article className="group relative w-full h-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          {HOME_SERVICE_BOXES[2].eyebrow}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">{HOME_SERVICE_BOXES[2].title}</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          {HOME_SERVICE_BOXES[2].body}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <Workflow className="h-5 w-5" />
                        </div>
                        <Link
                          href="/coming-soon"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          {locale === "en" ? "View More" : locale === "vi" ? "Xem thêm" : "查看更多"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>
                </div>
              </div>

                <div className="w-full flex-none snap-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Management / Mini CRM */}
                  <article className="group relative w-full h-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          {HOME_SERVICE_BOXES[3].eyebrow}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">{HOME_SERVICE_BOXES[3].title}</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          {HOME_SERVICE_BOXES[3].body}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <Link
                          href="/coming-soon"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          {locale === "en" ? "View More" : locale === "vi" ? "Xem thêm" : "查看更多"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>

                  {/* Customer-Partner Platform */}
                  <article className="group relative w-full h-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          {HOME_SERVICE_BOXES[4].eyebrow}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">{HOME_SERVICE_BOXES[4].title}</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          {HOME_SERVICE_BOXES[4].body}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <UserCheck className="h-5 w-5" />
                        </div>
                        <Link
                          href="/coming-soon"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          {locale === "en" ? "View More" : locale === "vi" ? "Xem thêm" : "查看更多"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>
                </div>
              </div>

                <div className="w-full flex-none snap-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tailored Solutions */}
                  <article className="group relative w-full h-full rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4">
                          {HOME_SERVICE_BOXES[5].eyebrow}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-ink tracking-tight mb-2 leading-tight">{HOME_SERVICE_BOXES[5].title}</h3>
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 mb-6">
                          {HOME_SERVICE_BOXES[5].body}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50/50 border border-blue-100 text-ocean shadow-sm">
                          <Workflow className="h-5 w-5" />
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95"
                        >
                          {locale === "en" ? "Contact Us" : locale === "vi" ? "Liên hệ" : "聯絡我們"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="relative w-full sm:w-[40%] h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10 flex-shrink-0 self-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85)` }}
                      />
                    </div>
                  </article>
                </div>
              </div>
            </div>

              {/* Absolute side navigation controls */}
              <button
                type="button"
                onClick={() => scrollServices("left")}
                aria-label="Scroll left"
                className="absolute left-4 xl:-left-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl backdrop-blur-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95 flex items-center justify-center z-40"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => scrollServices("right")}
                aria-label="Scroll right"
                className="absolute right-4 xl:-right-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl backdrop-blur-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-95 flex items-center justify-center z-40"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Layout (Touch friendly scroll list, hidden on desktop) */}
          <div className="block md:hidden relative">
            <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar px-4">
              {HOME_SERVICE_BOXES.map((service) => {
                const isP2CHealth = service.title === "P2C Health";
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="snap-start flex-none w-[290px] h-[450px] rounded-[2rem] border border-slate-200 bg-white p-6 relative overflow-hidden flex flex-col justify-between shadow-premium transition-all duration-500"
                  >
                    <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                    <div className="relative z-10">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-ocean">
                        {service.eyebrow}
                      </span>
                      <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{service.title}</h3>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500 line-clamp-3">{service.body}</p>
                    </div>

                    <div className="relative w-full h-32 my-3 rounded-xl overflow-hidden border border-slate-100 shadow-sm z-10">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                    </div>

                    <div className="relative z-10 mt-auto flex flex-col gap-2 w-full">
                      {isP2CHealth ? (
                        <div className="flex gap-2 w-full">
                          <Link
                            href="/services/physiotherapy/booking"
                            className="flex-grow inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-ocean px-3 text-xs font-black text-white shadow-lg shadow-blue-500/20"
                          >
                            Book expert
                          </Link>
                          <Link
                            href="/services/physiotherapy"
                            className="flex-grow inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 text-xs font-bold text-slate-600 shadow-sm"
                          >
                            Learn more
                          </Link>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center w-full">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-ocean shadow-sm">
                            <Icon className="h-5 w-5" />
                          </div>
                          <Link
                            href={service.href}
                            className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-5 text-xs font-bold text-slate-600 shadow-sm"
                          >
                            {service.title === "Tailored Solutions" ? "Contact Us" : "View More"} <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE BUILD (Simplified Grid) --- */}
      <section className="bg-white text-ink py-24 md:py-32 relative overflow-hidden border-b border-slate-100">
        <div className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <Reveal>
               <SectionBadge icon={LayoutDashboard} size="lg">{home.extras.whatWeBuild}</SectionBadge>
            </Reveal>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: Website Development */}
          <Reveal className="lg:col-span-7 flex">
            <article className="group relative w-full rounded-[2.5rem] border border-slate-200/80 bg-white p-8 md:p-10 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-6 w-max">
                      {getDictionary(locale).servicesPage.webDevCard.title}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight leading-tight mb-4">
                      {home.extras.webDevTitle}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                      {home.extras.webDevBody}
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95 w-max mt-auto"
                  >
                    {home.extras.webDevBtn} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Mockup Graphic */}
                <div className="md:col-span-5 flex justify-center md:justify-end h-full items-center">
                  <div className="relative w-full max-w-[210px] aspect-[4/5] bg-white border border-slate-200/80 rounded-2xl shadow-xl p-3 flex flex-col gap-2 transition-transform duration-500 group-hover:scale-105">
                    {/* Browser Dots */}
                    <div className="flex gap-1 mb-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                    </div>
                    {/* Header bar */}
                    <div className="h-4 w-full bg-blue-50/50 rounded flex items-center px-1.5">
                      <div className="h-1 w-8 bg-ocean/20 rounded" />
                    </div>
                    {/* Hero title lines */}
                    <div className="h-2 w-3/4 bg-slate-100 rounded mt-2" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded" />
                    {/* Body content lines */}
                    <div className="h-1 w-full bg-slate-50 rounded mt-3" />
                    <div className="h-1 w-full bg-slate-50 rounded" />
                    <div className="h-1 w-5/6 bg-slate-50 rounded" />
                    {/* Placeholder image grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 flex-grow">
                      <div className="bg-slate-50/80 rounded-lg p-1.5 flex flex-col justify-end">
                        <div className="h-1.5 w-6 bg-slate-200 rounded" />
                      </div>
                      <div className="bg-slate-50/80 rounded-lg p-1.5 flex flex-col justify-end">
                        <div className="h-1.5 w-6 bg-slate-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Right Column: Stack of 3 Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Card 1: Booking Workflow Hub */}
            <Reveal delay={0.05} className="flex-1 flex">
              <article className="group relative w-full rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                <div className="relative z-10 flex-grow">
                  <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2 py-0.5 inline-block mb-3">
                    {locale === "en" ? "Workflow" : locale === "vi" ? "Quy trình" : "工作流"}
                  </span>
                  <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2 leading-tight">
                    {home.extras.workflowHubTitle}
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 mb-4">
                    {home.extras.workflowHubBody}
                  </p>
                </div>
                <div className="relative z-10 mt-auto flex justify-between items-center">
                  <Link
                    href="/coming-soon"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-ocean active:scale-95"
                  >
                    {locale === "en" ? "Get started" : locale === "vi" ? "Bắt đầu ngay" : "立即開始"} <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  </Link>
                </div>
              </article>
            </Reveal>

            {/* Card 2: Share with partners */}
            <Reveal delay={0.1} className="flex-1 flex">
              <article className="group relative w-full rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                <div className="relative z-10 flex-grow">
                  <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2 py-0.5 inline-block mb-3">
                    {locale === "en" ? "Collaboration" : locale === "vi" ? "Hợp tác" : "協同合作"}
                  </span>
                  <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2 leading-tight">
                    {home.extras.sharePartnersTitle}
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 mb-4">
                    {home.extras.sharePartnersBody}
                  </p>
                </div>
                <div className="relative z-10 mt-auto flex justify-between items-center">
                  <Link
                    href="/coming-soon"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-ocean active:scale-95"
                  >
                    {locale === "en" ? "Learn more" : locale === "vi" ? "Tìm hiểu thêm" : "了解更多"} <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  </Link>
                </div>
              </article>
            </Reveal>

            {/* Card 3: Instant updates */}
            <Reveal delay={0.15} className="flex-1 flex">
              <article className="group relative w-full rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                <div className="relative z-10 flex-grow">
                  <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2 py-0.5 inline-block mb-3">
                    {locale === "en" ? "Updates" : locale === "vi" ? "Cập nhật" : "即時更新"}
                  </span>
                  <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2 leading-tight">
                    {home.extras.instantUpdatesTitle}
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 mb-4">
                    {home.extras.instantUpdatesBody}
                  </p>
                </div>
                <div className="relative z-10 mt-auto flex justify-between items-center">
                  <Link
                    href="/coming-soon"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-ocean active:scale-95"
                  >
                    {locale === "en" ? "Learn more" : locale === "vi" ? "Tìm hiểu thêm" : "了解更多"} <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Bottom Card: Integrations */}
          <Reveal delay={0.2} className="lg:col-span-12">
            <article className="group relative w-full rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              <div className="relative z-10 flex-grow">
                <span className="rounded-md bg-blue-50 text-[9px] font-black uppercase tracking-widest text-ocean px-2.5 py-1 inline-block mb-4 w-max">
                  {home.extras.integrationsEyebrow}
                </span>
                <h3 className="text-2xl font-extrabold text-ink tracking-tight mb-2 leading-tight">
                  {home.extras.integrationsTitle}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed mb-6 max-w-xl">
                  {home.extras.integrationsBody}
                </p>
                <Link
                  href="/coming-soon"
                  className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-ocean"
                >
                  {home.extras.integrationsBtn} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Logo container */}
              <div className="relative z-10 flex flex-wrap gap-4 items-center justify-center">
                {/* Salesforce */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="Salesforce">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#00a1e0] fill-current">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                </div>
                {/* Pipedrive */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="Pipedrive">
                  <span className="text-[#00b853] font-black text-xl font-display">P</span>
                </div>
                {/* HubSpot */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="HubSpot">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#ff7a59] fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </div>
                {/* Intercom */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="Intercom">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#0057ff] fill-current">
                    <path d="M12 2C6.477 2 2 6.484 2 12.016 2 14.816 3.12 17.352 4.96 19.184l-.16 2.016c-.016.176.08.336.24.4.048.016.096.032.144.032.112 0 .224-.048.304-.128l2.064-2.064C10.384 21.36 11.184 21.52 12 21.52c5.523 0 10-4.484 10-10.016S17.523 2 12 2zm3.328 12.56c-.208.336-.592.512-.96.448l-2.064-.336c-.304-.048-.56-.24-.688-.512l-1.04-2.064c-.16-.336-.112-.736.128-1.008l1.456-1.6c.256-.288.688-.336 1.008-.128l1.68 1.12c.272.176.432.48.432.8v2.4c0 .32-.144.608-.384.768z" />
                  </svg>
                </div>
                {/* Zapier */}
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl h-14 w-14 flex items-center justify-center transition hover:scale-105" title="Zapier">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#ff4f00] fill-current">
                    <path d="M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10S2 17.523 2 12 6.478 2 12 2zm0 3.6c-3.535 0-6.4 2.865-6.4 6.4s2.865 6.4 6.4 6.4 6.4-2.865 6.4-6.4-2.865-6.4-6.4-6.4zm-1.8 3.6h3.6V11H10.2V9.2zm0 3.6h3.6V14.6H10.2v-1.8z" />
                  </svg>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
        </div>
      </section>

      {/* --- DELIVERY PROCESS (Reference Phone Orbit) --- */}
      <section className="relative overflow-hidden bg-[#f0f7ff] px-4 py-24 text-ink sm:px-6 md:py-32 border-y border-blue-100/50">
        <div className="absolute inset-0 tech-grid opacity-70" />
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-10 md:mb-12">
              <SectionBadge icon={LayoutDashboard} size="lg">{home.extras.deliveryProcess}</SectionBadge>
            </div>
          </Reveal>

          <div className="relative mx-auto mt-16 min-h-[760px] max-w-6xl">
            <div className="pointer-events-none absolute left-1/2 top-[52%] hidden h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 text-ocean/40 md:block">
              <Ripple mainCircleSize={260} mainCircleOpacity={0.24} numCircles={9} />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-[52%] hidden h-[620px] w-[720px] -translate-x-1/2 -translate-y-1/2 md:block">
              <AnimatedBeam path="M150 118 C210 88 244 84 314 132" duration={3.8} />
              <AnimatedBeam path="M154 294 C220 316 248 274 318 242" duration={4.4} reverse />
              <AnimatedBeam path="M290 118 C230 88 196 84 126 132" duration={4.1} />
              <AnimatedBeam path="M286 300 C220 320 190 278 122 242" duration={4.7} reverse />
            </div>

            <div className="absolute left-1/2 top-8 z-20 w-[330px] -translate-x-1/2 sm:w-[380px]">
              <ParallaxStage>
                {({ ySlow }) => (
                  <MotionDiv style={{ y: ySlow }}>
                    <Iphone className="w-full" screenClassName="bg-porcelain">
                      <div className="flex h-full flex-col bg-porcelain px-6 pb-8 pt-11 text-ink">
                        <div className="mb-5 flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>9:41</span>
                          <span className="rounded-full bg-ocean/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ocean">{home.extras.iphone.live}</span>
                        </div>
                        <div className="rounded-[1.6rem] border border-slate-100 bg-white p-5 shadow-premium">
                          <div className="mb-5 flex items-center justify-between">
                            <p className="text-sm font-black">{home.extras.iphone.projectFlow}</p>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                              {hasSelectedAnalyticsNode ? home.extras.iphone.selected : home.extras.iphone.auto}
                            </span>
                          </div>
                          <div className="rounded-2xl border border-ocean/15 bg-ocean/5 p-4">
                            <div className="mb-4 flex items-start gap-3">
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ocean text-white shadow-lg shadow-blue-500/20">
                                <ActiveAnalyticsIcon className="h-5 w-5" />
                              </span>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-ocean">{home.extras.iphone.activeStep}</p>
                                <p className="mt-1 text-base font-black leading-tight">{activeAnalytics.title}</p>
                              </div>
                            </div>
                            <p className="text-xs font-semibold leading-5 text-slate-600">{activeAnalytics.body}</p>
                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white ring-1 ring-slate-100">
                              <div
                                className="h-full rounded-full bg-ocean transition-all duration-700"
                                style={{ width: `${((activeAnalyticsIndex + 1) / ANALYTICS_BEAM_NODES.length) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="mt-4 space-y-3">
                            {ANALYTICS_BEAM_NODES.map((node, index) => (
                              <div key={node.title} className={`rounded-2xl border px-4 py-3 transition ${activeAnalytics.id === node.id ? "border-ocean/20 bg-blue-50" : "border-slate-100 bg-slate-50"}`}>
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-xs font-black text-ink">{node.title}</p>
                                  <span className={`h-2.5 w-2.5 rounded-full ${activeAnalytics.id === node.id ? "bg-ocean" : "bg-slate-300"}`} />
                                </div>
                                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                  {locale === "en" ? "Step" : locale === "vi" ? "Bước" : "步驟"} {String(index + 1).padStart(2, "0")}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-ocean/10 p-4">
                              <p className="text-2xl font-black text-ocean">{String(activeAnalyticsIndex + 1).padStart(2, "0")}</p>
                              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-700">{home.extras.iphone.currentStep}</p>
                            </div>
                            <div className="rounded-2xl bg-emerald-50 p-4">
                              <p className="text-2xl font-black text-emerald-600">{String(ANALYTICS_BEAM_NODES.length).padStart(2, "0")}</p>
                              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-700">{home.extras.iphone.processSteps}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto rounded-2xl bg-ocean px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                          {home.extras.iphone.reviewLaunchPath}
                        </div>
                      </div>
                    </Iphone>
                  </MotionDiv>
                )}
              </ParallaxStage>
            </div>

            <div className="grid gap-6 pt-[620px] md:block md:pt-0">
              {ANALYTICS_BEAM_NODES.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setHasSelectedAnalyticsNode(true);
                    setActiveAnalyticsNode(item.id);
                  }}
                  aria-pressed={activeAnalyticsNode === item.id}
                  className={`group flex items-center gap-4 rounded-2xl border p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40 md:absolute md:w-80 ${item.side === "left" ? "md:flex-row-reverse md:text-right" : "md:flex-row"} ${item.nodeClassName} ${activeAnalyticsNode === item.id ? "border-ocean/25 bg-white shadow-premium" : "border-slate-100 bg-white/95 shadow-md"}`}
                >
                  <span className={`order-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition md:order-none ${activeAnalyticsNode === item.id ? "bg-ocean text-white" : "bg-ocean/10 text-ocean group-hover:bg-ocean group-hover:text-white"}`}>
                    <item.icon className="h-6 w-6" />
                  </span>
                  <span className="block">
                    <span className="block text-xl font-bold text-ink">{item.title}</span>
                    <span className="mt-2 block text-sm font-semibold leading-6 text-slate-700">{item.body}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PURPOSE (Detailed Section) --- */}
      <section className="bg-white border-y border-slate-100 py-24 md:py-32">
        <div className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
             <Reveal>
                <SectionBadge icon={Workflow} size="lg">{home.extras.companyPurpose}</SectionBadge>
             </Reveal>
          </div>

          <div className="bg-porcelain/50 border border-slate-100 rounded-[4rem] p-12 md:p-20 grid lg:grid-cols-[1.2fr_1fr] gap-20 items-center overflow-hidden relative group">
           <BorderBeam colorFrom="var(--ocean)" colorTo="var(--mint)" duration={8} borderWidth={2} />
           <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

           <Reveal className="relative z-10">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium flex flex-col items-center relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/5 rounded-full blur-[80px] pointer-events-none" />
                 <div className="flex justify-between items-center w-full mb-10 relative z-10">
                    <p className="text-lg font-bold text-ink">{home.extras.operatingLoop}</p>
                    <div className="h-8 w-28 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{home.extras.serviceStack}</div>
                 </div>
                 <div className="relative z-10 flex h-64 w-64 items-center justify-center">
                    <AnimatedCircularProgressBar
                      value={75}
                      max={100}
                      min={0}
                      gaugePrimaryColor="var(--ocean)"
                      gaugeSecondaryColor="color-mix(in srgb, var(--ocean) 14%, white)"
                      className="size-64 text-4xl font-black text-ink"
                    />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-14">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{home.extras.coreWorkflow}</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-10 mt-10 w-full relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-ocean animate-pulse" />
                       <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{locale === "en" ? "Public" : locale === "vi" ? "Công khai" : "公開"}</p>
                          <p className="text-base font-bold text-ink">{home.extras.enquiry}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '1s' }} />
                       <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{locale === "en" ? "Internal" : locale === "vi" ? "Nội bộ" : "內部"}</p>
                          <p className="text-base font-bold text-ink">{home.extras.action}</p>
                       </div>
                    </div>
                 </div>
                 <div className="mt-12 grid w-full grid-cols-2 gap-3 relative z-10">
                    {home.extras.operatingSteps.map((step) => (
                      <div key={step} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-slate-500">
                        {step}
                      </div>
                    ))}
                 </div>
              </div>
           </Reveal>

           <div className="space-y-12 relative z-10">
              <Reveal delay={0.2}>
                 <div className="text-sm font-bold text-ocean uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ocean animate-ping" /> {home.extras.purposeEyebrow}
                 </div>
                 <h3 className="text-4xl font-bold text-ink tracking-tight">{home.extras.purposeTitle}</h3>
                 <p className="mt-6 text-slate-500 text-lg leading-relaxed font-medium">
                    {home.extras.purposeBody}
                 </p>
                 <div className="mt-10 space-y-4">
                    {home.extras.purposeList.map((item) => (
                    <div key={item} className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-slate-100 shadow-sm">
                       <div className="h-8 w-8 rounded-full bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5" />
                       </div>
                       <p className="text-sm font-bold text-ink">{item}</p>
                    </div>
                    ))}
                 </div>
              </Reveal>
            </div>
         </div>
        </div>
      </section>

      {/* --- WHY TEAMS CHOOSE P2C GROWTH --- */}
      <section className="py-24 md:py-32 overflow-hidden bg-[#f0f7ff] relative border-y border-blue-100/50">
        <div className="text-center mb-10 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
           <Reveal>
              <SectionBadge icon={MessageSquareQuote} size="lg">{home.extras.whyTeamsChoose}</SectionBadge>
           </Reveal>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Monitor,
              title: home.extras.whyCards[0].title,
              body: home.extras.whyCards[0].body,
            },
            {
              icon: Workflow,
              title: home.extras.whyCards[1].title,
              body: home.extras.whyCards[1].body,
            },
            {
              icon: LayoutDashboard,
              title: home.extras.whyCards[2].title,
              body: home.extras.whyCards[2].body,
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-[2rem] border border-slate-100 bg-porcelain p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-premium">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-ocean/5 blur-3xl transition-colors group-hover:bg-ocean/10" />
                <div className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ocean shadow-sm">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="relative z-10 text-2xl font-extrabold tracking-tight text-ink">{item.title}</h3>
                <p className="relative z-10 mt-5 text-sm font-semibold leading-7 text-slate-600">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="px-4 sm:px-6 pb-24 md:pb-32 max-w-7xl mx-auto">
        <ParallaxStage>
          {({ scale, ySlow, yFast, rotate, opacity }) => (
            <MotionDiv style={{ scale }} className="origin-center">
              <div className="relative overflow-hidden rounded-[4rem] bg-[#f0f7ff] border border-blue-100 p-8 text-center shadow-premium md:p-12 lg:p-14">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.6),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_40%)]" />
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

                <div className="relative z-10 grid gap-8 lg:grid-cols-[0.86fr_1fr_0.86fr] lg:items-center">
                  <MotionDiv style={{ y: yFast, rotate, opacity }} className="order-2 lg:order-1">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 text-left text-slate-800 shadow-xl">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">{home.extras.widgets.websiteEnquiry}</p>
                          <p className="mt-1 text-xl font-black text-ink">{home.extras.widgets.requestCaptured}</p>
                        </div>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ocean">{home.extras.iphone.live}</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          [home.extras.widgets.service, home.extras.widgets.bookingWorkflow],
                          [home.extras.widgets.source, home.extras.widgets.websiteForm],
                          [home.extras.widgets.nextStep, home.extras.widgets.discoveryCall],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                            <p className="mt-1 text-sm font-black text-ink">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>

                  <div className="order-1 lg:order-2">
                    <p className="mb-5 text-[11px] font-black uppercase tracking-[0.24em] text-ocean">{home.extras.ctaEyebrow}</p>
                    <h2 className="section-heading text-ink">
                      {home.extras.ctaTitle}
                    </h2>
                    <p className="mt-8 text-base md:text-lg text-slate-600 max-w-xl font-medium mx-auto">
                      {home.extras.ctaBody}
                    </p>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
                      <Magnetic>
                        <Link href="/contact" className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-ocean px-12 text-base font-extrabold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-650 active:scale-95">
                          {home.extras.ctaBtn}
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Magnetic>
                    </div>
                  </div>

                  <MotionDiv style={{ y: ySlow, scale, opacity }} className="order-3">
                    <div className="rounded-[2rem] border border-white/20 bg-white p-4 text-left shadow-2xl">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">{home.extras.widgets.internalView}</p>
                          <p className="mt-1 text-xl font-black text-ink">{home.extras.widgets.workflowBoard}</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">{home.extras.widgets.active}</span>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-slate-100">
                        {[
                          [home.extras.widgets.newEnquiry, "02"],
                          [home.extras.widgets.ownerAssigned, "01"],
                          [home.extras.widgets.customerUpdated, "03"],
                          [home.extras.widgets.completed, "04"],
                        ].map(([status, count]) => (
                          <div key={status} className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-3 last:border-b-0">
                            <div>
                              <p className="text-sm font-black text-ink">{status}</p>
                              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">{home.extras.widgets.serviceWorkflow}</p>
                            </div>
                            <span className="text-lg font-black text-ocean">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>
                </div>
              </div>
            </MotionDiv>
          )}
        </ParallaxStage>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 md:py-32 bg-[#f0f7ff] border-t border-blue-100/50">
        <div className="px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center mb-10">
             <Reveal>
                <SectionBadge icon={MessageSquareQuote} size="lg">{locale === "en" ? "FAQ" : locale === "vi" ? "Câu hỏi thường gặp" : "常見問題"}</SectionBadge>
                <p className="text-base font-semibold text-slate-500 max-w-2xl mx-auto mt-2">{home.extras.faqDescription}</p>
             </Reveal>
          </div>

          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

    </main>
  );
}
