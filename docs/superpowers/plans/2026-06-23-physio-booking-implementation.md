## Plan: P2C Physiotherapy Page Layout Enhancement

**Problem:** The dedicated P2C Physiotherapy Booking page has only the booking wizard and lacks the background, pricing, FAQ, audience, and coordination program details requested by the customer.
**Approach:** Re-implement the page as a rich single-page scrollable flow containing 9 distinct sections with full English and Vietnamese (EN/VI) language selection, storing all text strings in `lib/i18n/dictionary.ts` and reusing `BookingWizard` and `FaqAccordion`.

### Tasks

- [ ] 1. Add `physiotherapy` translation keys for English (`en`) and Vietnamese (`vi`) in `/home/cuongchung/Jason/p2c_growth_ltd_booking_platform/lib/i18n/dictionary.ts`
      Verify: `npm run lint` completes without syntax errors.
- [ ] 2. Scaffolding, language toggle state, and Hero section in `/home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/physiotherapy/page.tsx`
      Verify: `npm run build` exits 0.
- [ ] 3. Implement Disclaimer Banner, Target Audience Grid, and Why P2C sections in `/home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/physiotherapy/page.tsx`
      Verify: `npm run build` exits 0.
- [ ] 4. Implement Interactive Services Tabs, Steps Progress, and Pricing Card components in `/home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/physiotherapy/page.tsx`
      Verify: `npm run build` exits 0.
- [ ] 5. Mount existing `BookingWizard` and `FaqAccordion` components in `/home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/physiotherapy/page.tsx`
      Verify: `npm run build` exits 0.
- [ ] 6. Run full verification verification checks
      Verify: `npm run lint` and `npm run build` both exit 0 with clean outcomes.
