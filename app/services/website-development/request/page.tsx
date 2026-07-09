"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { RequestFunnelPage } from "@/components/services/request-funnel-page";
import { WebsiteRequestForm } from "@/components/services/request-forms";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function WebsiteDevelopmentRequestPage() {
  const { locale } = useLocale();
  const content = getDictionary(locale).serviceFunnels.website.request;

  return (
    <RequestFunnelPage content={content} backHref="/services/website-development">
      <WebsiteRequestForm content={content} />
    </RequestFunnelPage>
  );
}
