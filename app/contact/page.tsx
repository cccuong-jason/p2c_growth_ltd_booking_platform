import { ContactForm } from "@/components/contact-form";
import { PageBand, SectionHeading } from "@/components/site-shell";

export default function ContactPage() {
  return (
    <main>
      <PageBand>
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to P2C Growth about a booking or CRM workflow."
            description="Use this form for B2B enquiries about websites, booking systems, automation, or CRM tooling."
          />
          <ContactForm />
        </div>
      </PageBand>
    </main>
  );
}
