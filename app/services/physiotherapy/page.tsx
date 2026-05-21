import { AlertTriangle } from "lucide-react";

import { BookingWizard } from "@/components/booking/booking-wizard";
import { PageBand, SectionHeading } from "@/components/site-shell";

export default function PhysiotherapyPage() {
  return (
    <main>
      <PageBand>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Physiotherapy MVP"
              title="Request coordinated physiotherapy support."
              description="Submit your details and P2C Growth will coordinate follow-up with a suitable professional partner. Home visits require postcode and address details."
            />
            <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <AlertTriangle className="mb-3 h-5 w-5" aria-hidden />
              P2C Growth LTD does not diagnose or treat medical conditions. Clinical care is provided by qualified professionals. For emergencies, call 999 or NHS urgent care.
            </div>
          </div>
          <BookingWizard />
        </div>
      </PageBand>
    </main>
  );
}
