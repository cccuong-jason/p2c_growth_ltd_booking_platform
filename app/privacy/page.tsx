import { PageBand, SectionHeading } from "@/components/site-shell";

export default function PrivacyPage() {
  return (
    <main>
      <PageBand>
        <SectionHeading
          eyebrow="Privacy"
          title="Privacy Policy"
          description="P2C Growth stores booking and enquiry data only to coordinate requested services and business follow-up."
        />
        <div className="prose prose-slate mt-10 max-w-3xl">
          <p>
            Health inquiry data may be shared with appropriate professional partners for coordination purposes. P2C Growth does not sell personal data and does not provide medical diagnosis or treatment.
          </p>
          <p>
            Data access is limited to internal administrators and configured service providers needed to operate the platform, including Supabase and email delivery services.
          </p>
        </div>
      </PageBand>
    </main>
  );
}
