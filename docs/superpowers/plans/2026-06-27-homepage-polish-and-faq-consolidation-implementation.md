# Implementation Plan: Homepage Polish & FAQ Consolidation

**Problem:** Headings use solid black heavy text leading to layout fatigue, and duplicate/multiple FAQ accordions are scattered across different pages on the site.
**Approach:** Poland typography headings with text gradients, tighter tracking, and inline highlights; consolidate all Q&As into a unified tabbed Accordion on the Homepage, removing them from other subpages.

### Tasks

- [ ] 1. Modify [app/globals.css](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/globals.css) to adjust `.display-heading`, `.page-heading`, and `.section-heading` configurations to use tighter letter-spacing and line-heights, and add a `.text-gradient` custom utility class.
      Verify: `npm run build` exits 0
- [ ] 2. Modify [app/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/page.tsx) to apply gradient text styling and highlight inline spans to the hero `TypingAnimation` heading.
      Verify: `npm run build` exits 0
- [ ] 3. Modify [app/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/page.tsx) to apply gradient text styling to the section headings (`Stats`, `Services`, `About`, `CTA`, `FAQ`).
      Verify: `npm run build` exits 0
- [ ] 4. Modify [app/services/physiotherapy/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/physiotherapy/page.tsx) to apply refined font tracking and gradient headings.
      Verify: `npm run build` exits 0
- [ ] 5. Modify [app/contact/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/contact/page.tsx) to apply refined font tracking and gradient headings.
      Verify: `npm run build` exits 0
- [ ] 6. Modify [components/ui/faq-accordion.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/components/ui/faq-accordion.tsx) to accept grouped/categorized questions and support tabbed toggling of categories (General, Physiotherapy, Billing).
      Verify: `npm run build` exits 0
- [ ] 7. Modify [app/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/page.tsx) to import all FAQ arrays from the dictionary and feed them into the upgraded tabbed `FaqAccordion`.
      Verify: `npm run build` exits 0
- [ ] 8. Modify [app/services/physiotherapy/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/physiotherapy/page.tsx) to completely delete the inline Q&As section block.
      Verify: `npm run build` exits 0
- [ ] 9. Modify [app/contact/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/contact/page.tsx) to completely delete the inline Q&As section block.
      Verify: `npm run build` exits 0
- [ ] 10. Run final project verification checks.
      Verify: `npm run lint` and `npm run build` return 0 errors.
