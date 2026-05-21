import { PageBand, SectionHeading } from "@/components/site-shell";

export default function TermsPage() {
  return (
    <main>
      <PageBand>
        <SectionHeading
          eyebrow="Terms"
          title="Terms & Conditions"
          description="P2C Growth is a technology and coordination platform. Bookings are requests, not confirmed appointments or clinical advice."
        />
        <div className="prose prose-slate mt-10 max-w-3xl">
          <p>
            No online payment is collected in Phase 1. Any clinical service, pricing, appointment confirmation, or treatment plan is handled by the relevant professional partner.
          </p>
          <p>
            Users must provide accurate contact and visit information. Emergency or urgent medical situations should be directed to 999, NHS 111, or urgent care.
          </p>
        </div>
      </PageBand>
    </main>
  );
}
