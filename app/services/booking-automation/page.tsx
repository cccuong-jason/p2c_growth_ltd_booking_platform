"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { AutomationServicePage } from "@/components/services/automation-service-page";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function BookingAutomationPage() {
  const { locale } = useLocale();
  const content = getDictionary(locale).serviceFunnels.automation;

  return (
    <AutomationServicePage
      content={content}
      primaryHref="/services/booking-automation/request"
      secondaryHref="/contact"
      secondaryLabel={content.hero.secondaryCta}
    />
  );
}
