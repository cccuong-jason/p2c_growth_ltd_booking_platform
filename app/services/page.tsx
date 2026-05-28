import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageBand, SectionHeading } from "@/components/site-shell";

const services = [
  ["Physio Booking", "Patient request capture and internal dispatch for physiotherapy coordination.", "/services/physiotherapy"],
  ["Website Development", "Premium conversion-focused sites for service businesses."],
  ["Booking System & Workflow Email Automation", "Forms, workflows, notifications, and operational handoff."],
  ["Customer Management System / Mini CRM", "Lightweight dashboards for teams managing high-trust customer relationships."]
];

export default function ServicesPage() {
  return (
    <main className="surface-page">
      <PageBand className="pt-32">
        <SectionHeading
          eyebrow="Services"
          title="Systems for capture, coordination, and follow-up."
          description="P2C Growth combines polished user experiences with practical workflow tooling so teams can manage requests without operational drift."
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
