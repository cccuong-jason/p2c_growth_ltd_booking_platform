"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { WebsiteServicePage } from "@/components/services/website-service-page";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function WebsiteDevelopmentPage() {
  const { locale } = useLocale();
  const content = getDictionary(locale).serviceFunnels.website;

  return (
    <WebsiteServicePage
      content={content}
      primaryHref="/services/website-development/request"
      secondaryHref="/contact"
      secondaryLabel={content.hero.secondaryCta}
    />
  );
}
