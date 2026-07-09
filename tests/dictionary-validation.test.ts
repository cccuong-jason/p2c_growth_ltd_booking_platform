import { describe, expect, it } from "vitest";
import { getDictionary } from "@/lib/i18n/dictionary";

describe("dictionary validation", () => {
  it("verifies bookingWizard translation keys exist for all locales", () => {
    const locales = ["en", "vi", "hk"] as const;

    locales.forEach((locale) => {
      const d = getDictionary(locale);
      expect(d).toBeDefined();
      // @ts-ignore
      expect(d.physiotherapy.bookingWizard).toBeDefined();
      // @ts-ignore
      expect(d.physiotherapy.bookingWizard.backToLanding).toBeDefined();
      // @ts-ignore
      expect(d.physiotherapy.bookingWizard.steps).toBeDefined();
      // @ts-ignore
      expect(d.physiotherapy.bookingWizard.scheduleVisitTitle).toBeDefined();
      // @ts-ignore
      expect(d.physiotherapy.bookingWizard.scheduleVisitDesc).toBeDefined();
      // @ts-ignore
      expect(d.physiotherapy.bookingWizard.confirmTitle).toBeDefined();
      // @ts-ignore
      expect(d.physiotherapy.bookingWizard.confirmDesc).toBeDefined();
      // @ts-ignore
      expect(d.layout.legal).toBeDefined();
      // @ts-ignore
      expect(d.layout.action).toBeDefined();
      // -ignore
      expect(d.serviceFunnels.website.hero.title).toBeDefined();
      // -ignore
      expect(d.serviceFunnels.website.request.websiteTypeOptions).toBeDefined();
      // -ignore
      expect(d.serviceFunnels.automation.hero.title).toBeDefined();
      // -ignore
      expect(d.serviceFunnels.automation.request.systemTypeOptions).toBeDefined();
    });
  });
});
