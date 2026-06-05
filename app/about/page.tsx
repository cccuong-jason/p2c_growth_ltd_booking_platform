"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/home/motion-primitives";
import { SectionBadge } from "@/components/ui/section-badge";
import { BentoCard } from "@/components/ui/bento-card";
import { GlassOverlay } from "@/components/ui/glass-overlay";
import { FaqAccordion } from "@/components/ui/faq-accordion";

const TEAM_MEMBERS = [
  { name: "Royal Hooper", role: "CEO - Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
  { name: "Matilda Shelton", role: "Head of Product", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { name: "Tony Manning", role: "Lead Engineer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
  { name: "Jennifer Davis", role: "Operations Manager", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  { name: "Tommie Harvey", role: "Product Manager", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
  { name: "Christi Hampton", role: "Lead Marketing Strategist", image: "https://images.unsplash.com/photo-1598550874175-4d0ef43eeed7?auto=format&fit=crop&w=800&q=80" }
];

const FAQ_CATEGORIES = ["General", "Platform", "Features", "Support"];

const FAQ_ITEMS = [
  {
    question: "What is P2C Global Fulfillment?",
    answer: "P2C Fulfillment combines real-time saving with smart order orchestration to deliver products through the best channel for faster and more reliable service across global networks."
  },
  {
    question: "How do I switch between accounts?",
    answer: "On the Main Menu, you will find a change account button for you to swap between sub-accounts easily."
  },
  {
    question: "What is P2C Pulse Dynamic Safety Stock solution and how does it work?",
    answer: "P2C Pulse Dynamic Safety Stock is an AI-driven microservice that autonomously adjusts safety stock levels based on real-time demand."
  },
  {
    question: "What are P2C Customer Success Support Services offerings available?",
    answer: "P2C Customer Success Support Services are a comprehensive suite of advisory, technical, and operational services designed to maximize your ROI."
  }
];

export default function AboutPage() {
  const [activeFaqCategory, setActiveFaqCategory] = useState("General");

  return (
    <main className="relative bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans pb-32">
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight leading-[1.1] display-heading max-w-3xl mx-auto">
            Connecting businesses, <br />partners, and customers
          </h1>
          <p className="mt-6 text-lg font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
            P2C Growth LTD is a UK-based technology and software company that builds practical digital systems to help businesses, partners, and customers connect more easily.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 h-[300px] md:h-[400px]">
            {/* Left Image */}
            <div className="relative w-full md:w-1/3 h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg hidden md:block">
              <Image 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" 
                alt="Clinic Medical" 
                fill 
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-ink shadow-sm">
                Medical Network
              </div>
            </div>
            
            {/* Center Image */}
            <div className="relative w-full md:w-[45%] h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl z-10">
              <Image 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80" 
                alt="Tech Dashboard" 
                fill 
                className="object-cover"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full text-xs font-bold text-ink shadow-lg flex items-center gap-2">
                <span className="flex -space-x-2">
                   <span className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white z-20"></span>
                   <span className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white z-10"></span>
                </span>
                100+ Partners
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full md:w-1/3 h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg hidden md:block">
              <Image 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80" 
                alt="Team Coordination" 
                fill 
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-ocean text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm">
                AI Automation
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Mission & Stats */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mt-20 md:mt-32 text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-ink leading-relaxed max-w-4xl mx-auto">
            Our mission is to help service businesses <span className="text-ocean">grow</span> through practical, easy-to-use, <span className="text-ocean">customer-focused technology</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <BentoCard className="mt-16 p-10 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-50">
            {[
              { stat: "25", label: "Industry Awards" },
              { stat: "100+", label: "Global Enterprise Partners" },
              { stat: "~500", label: "Workflows Automated" },
              { stat: "3,000", label: "Customers Served" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl font-black text-ink">{item.stat}</p>
                <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </BentoCard>
        </Reveal>
      </section>

      {/* Feature 1 (Zig-Zag Left) */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mt-32 md:mt-48">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <SectionBadge>Partner to Customer</SectionBadge>
              <h3 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-6">Managing the full journey</h3>
              <p className="text-base font-medium text-slate-500 leading-relaxed mb-10">
                P2C stands for Partner to Customer. We do not only create business websites; we develop systems that help companies manage the full customer journey, from receiving enquiries and storing information to tracking progress.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="w-8 h-8 rounded-full bg-ocean/10 text-ocean flex items-center justify-center mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <h4 className="font-bold text-ink text-sm mb-2">Workflow Automation</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">Booking systems, email automation, and mini CRM tools.</p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  </div>
                  <h4 className="font-bold text-ink text-sm mb-2">Partner Connection</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">Dedicated platforms to link customers seamlessly with professional partners.</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-[400px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
                alt="Office Dashboard" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <GlassOverlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48">
                 <p className="text-2xl font-black text-ink">10x</p>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Faster decisions</p>
                 <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-2xl font-black text-ocean">95%</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sustainable growth</p>
                 </div>
              </GlassOverlay>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature 2 (Zig-Zag Right) */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mt-32 md:mt-48">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative h-[450px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" 
                alt="Team working" 
                fill 
                className="object-cover"
              />
              <GlassOverlay className="absolute bottom-8 left-8 right-8">
                <p className="text-sm font-bold text-ink leading-relaxed">
                  &quot;P2C brings results, better efficiency, and consistent performance we can rely on.&quot;
                </p>
                <p className="text-xs font-extrabold text-ocean mt-3">P2C Growth</p>
              </GlassOverlay>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div>
              <SectionBadge>Real operations</SectionBadge>
              <h3 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-6">Focus on execution</h3>
              <p className="text-base font-medium text-slate-500 leading-relaxed mb-8">
                What makes P2C Growth LTD different is our focus on real business operations. We don&apos;t replace professional service providers. Instead, we use technology to make coordination faster, clearer, and more efficient.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                   <div className="mt-1 h-5 w-5 rounded-full bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   <p className="text-sm font-bold text-ink">Example: Physio Booking model</p>
                </li>
                <li className="flex items-start gap-3">
                   <div className="mt-1 h-5 w-5 rounded-full bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   <p className="text-sm font-bold text-ink">Connect customers with suitable providers</p>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mt-32 md:mt-48 text-center bg-porcelain rounded-[3rem] py-20">
        <Reveal>
          <SectionBadge className="bg-white border-slate-200 text-ink">Team</SectionBadge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">Meet the P2C Growth people</h2>
          <p className="text-sm font-medium text-slate-500 mb-16">We deliver reliable service coordination solutions for a sustainable future.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left px-6">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group transition-all hover:-translate-y-1 hover:shadow-premium">
                 <div className="p-6 pb-4">
                    <h4 className="text-lg font-bold text-ink">{member.name}</h4>
                    <p className="text-xs font-semibold text-slate-400 mt-1">{member.role}</p>
                 </div>
                 <div className="px-6 pb-6 pt-2 flex-1 flex items-end justify-center">
                    <div className="relative w-full aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden">
                       <Image 
                         src={member.image} 
                         alt={member.name} 
                         fill 
                         className="object-cover object-center filter grayscale transition duration-500 group-hover:grayscale-0"
                       />
                       <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mt-32 md:mt-48 text-center">
        <Reveal>
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.1] display-heading mb-4">Frequently Asked Question</h2>
          <p className="text-lg font-medium text-slate-500 mb-10">Clear answers to common questions about our platform, features, and support.</p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFaqCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFaqCategory === cat 
                    ? "border-ocean bg-ocean/5 text-ocean ring-1 ring-ocean/20 shadow-sm" 
                    : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <FaqAccordion items={FAQ_ITEMS} />
        </Reveal>
      </section>

    </main>
  );
}