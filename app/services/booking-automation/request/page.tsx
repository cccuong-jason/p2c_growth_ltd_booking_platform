"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { RequestFunnelPage } from "@/components/services/request-funnel-page";
import { AutomationRequestForm } from "@/components/services/request-forms";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function BookingAutomationRequestPage() {
  const { locale } = useLocale();
  const content = getDictionary(locale).serviceFunnels.automation.request;

  return (
    <RequestFunnelPage content={content} backHref="/services/booking-automation">
      <AutomationRequestForm content={content} />
    </RequestFunnelPage>
  );
}
