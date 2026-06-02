import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageBand, SectionHeading } from "@/components/site-shell";

const services = [
  ["Medical Experts Booking", "Medical booking, referral, and internal dispatch for expert-led appointments.", "/services/physiotherapy"],
  ["Website Development", "Premium conversion-focused websites for UK service businesses."],
  ["Booking System & Email Automation", "Forms, workflows, confirmations, notifications, and operational handoff."],
  ["Customer Management System / Mini CRM", "Lightweight dashboards for teams managing high-trust customer relationships."],
  ["Customer-Partner Platform", "A reusable coordination layer between customers, internal teams, and professional partners."]
];

export default function ServicesPage() {
  return (
    <main className="surface-page">
      <PageBand className="pt-32">
        <SectionHeading
          eyebrow="Services"
          title="Technology services for websites, booking, CRM, and partner coordination."
          description="P2C Growth LTD is a UK technology and software company building practical digital systems for service businesses."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map(([title, body, href]) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
              <h2 className="text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
              {href ? (
                <Link href={href} className="mt-5 inline-flex items-center gap-2 font-semibold text-ocean">
                  Open service <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </PageBand>
    </main>
  );
}
