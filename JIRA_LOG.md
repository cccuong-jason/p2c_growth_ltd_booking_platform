# Jira Tracking Log - SCRUM-41 Pivot

## [SCRUM-41] [UI/DX] Premium platform polish for Phase 1 local review
- **Status:** In Review
- **Update (2026-05-29):** Pivoting UI direction to "Premium Light" theme complete. Build and Lint verified.
- **Comment:** "Pivoted from the dark space theme to a Premium Light theme based on Fizens references. Replaced the globe with an interactive Ripple Grid and implemented highly detailed code-based mockups. Build and lint pass. Ready for visual QA."

## [SCRUM-47] [UI] Define premium visual system and motion primitives
- **Status:** Done
- **Update (2026-05-29):** Defined new light-theme tokens and integrated the `RippleGrid` component.
- **Description Updated:** "Establish visual foundations for the Premium Light theme. Includes mesh grids, tech grid overlays, drop shadows (`shadow-premium`), and integration of the shader-based Ripple Grid."

## [SCRUM-48] [UI] Build homepage hero, globe, and product cockpit
- **Status:** Done
- **Update (2026-05-29):** Re-designed hero with Ripple Grid and code-based UI mockups.
- **Description Updated:** "Build a high-impact light hero with an interactive Ripple Grid background. Integrate highly detailed code-based UI mockups (Credit Card, Area Chart, Phone Frame) to replace static images."

## [SCRUM-52] [UI] Initialize shadcn/ui and configure Magic UI dependencies
- **Status:** Done
- **Update (2026-05-30):** Created `components.json` and initialized dependencies for Magic UI.
- **Description:** "Run `npx shadcn@latest init` to properly set up `components.json` and Tailwind utility classes for Magic UI components."

## [SCRUM-53] [UI] Implement Magic UI Globe background for Hero
- **Status:** Done
- **Update (2026-05-30):** Replaced Ripple Grid with Magic UI Globe background.
- **Description:** "Re-introduce the globe concept using `@magicui/globe` as a spinning background layer behind the hero content. Ensure `z-index` and `pointer-events-none` are configured correctly."

## [SCRUM-54] [UI] Implement 3D Marquee for Testimonials
- **Status:** Done
- **Update (2026-05-30):** Updated testimonials block to use `@magicui/marquee`.
- **Description:** "Use `@magicui/marquee` to create an infinite scrolling testimonial/social proof section. Enable `pauseOnHover` for better UX."

## [SCRUM-55] [UI] Implement Typing Animation for Hero Headline
- **Status:** Done
- **Update (2026-05-30):** Replaced TextJump with `@magicui/typing-animation`.
- **Description:** "Use `@magicui/typing-animation` on the main hero typography to create a dynamic, engaging entrance."

## [SCRUM-56] [UI] Implement Number Ticker for Platform Stats
- **Status:** Done
- **Update (2026-05-30):** Added a dedicated trust stats section with `@magicui/number-ticker`.
- **Description:** "Use `@magicui/number-ticker` to animate the counting of statistics (e.g., Active Users, Satisfaction rate) in the trust section."

## [SCRUM-57] [UI] Enhance P2C Physiotherapy Booking Page with translation support and content from PDF
- **Status:** Done
- **Update (2026-06-23):** Initializing layout enhancement and bilingual dictionary setup.
- **Description:** "Extend the physiotherapy booking page layout to include 9 key informational sections based on customer feedback, and add EN/VI translation support using local page state and i18n dictionaries."

## [SCRUM-58] [CRM/UI] Finalize Customers CRM and solutions filtering
- **Status:** Done
- **Update (2026-06-25):** Fully consolidated bookings and projects data, implemented solutions filtering, detail drawer with request/project timelines, direct Resend email communications, and customer deletion.
- **Description:** "Finalize customer directory with complete data integration across all products (P2C Health, Automation, Website Dev). Add filtering by Solution type and CRM status. Build Customer Details Side Drawer with request timelines, custom email follow-up form, and simulated deletion actions."

## [SCRUM-59] [UI/PERF] Homepage polish, layout expansions, notice banner redesign, and WebGL optimization
- **Status:** Done
- **Update (2026-06-25):** Configured consistent White <-> Pale Blue alternating background sections, redesigned notice banner using professional ShieldCheck and blue styles, light-themed final CTA card with dark slate typography, expanded booking page container width to max-w-7xl, and integrated IntersectionObserver to dynamically mount/destroy WebGL Globe on viewport exit/entrance to eliminate scroll lag.
- **Description:** "Execute premium visual polish: alternate section backgrounds, redesign medical disclaimer notice, light-theme the intensive dark blue CTA, expand booking page width, and optimize 3D Globe loading performance by viewport lazy-loading WebGL canvases."

## [SCRUM-60] [UI] notice accordion conversion and pill size consistency
- **Status:** Done
- **Update (2026-06-26):** Converted the static medical liability banner into a collapsible accordion-style card with a clean header toggle, bilingual support, and smooth expansion animations. Adjusted SectionBadge sizing logic so the larger pill size is applied consistently across all sections of the site.
- **Description:** "Convert the physiotherapy page's medical liability notice banner into an accordion and make SectionBadge pill size consistent across the site."

## [SCRUM-61] [UI] Homepage Carousel shadow clipping and Physiotherapy Landing CTA light-theming
- **Status:** Done
- **Update (2026-06-26):** Fixed homepage carousel shadow clipping by adjusting layout offsets to 32px vertical and 40px horizontal. Adjusted navigation arrow positioning (`left-4 xl:-left-8`) to prevent vertical clipping on medium viewport screen edges. Fully light-themed the physiotherapy landing page CTA banner. Build and Lint verified.
- **Description:** "Resolve homepage carousel layout clipping issues by introducing proper padding offset parameters (py-8 -my-8 px-10 -mx-10) and responsive nav control margins. Transition the physiotherapy bottom CTA banner completely to light-theme matching the platform's color palette."

## [SCRUM-62] [UI/PERF] Fix Services Carousel card height mismatch, optimize WebGL Globe performance, revamp typography, and consolidate FAQs
- **Status:** Done
- **Update (2026-06-27):** Standardized carousel card heights using `h-full` and optimized WebGL rendering loads. Added `.text-gradient` utility class and updated heading tracking across the site. Consolidated all regional Q&As into a unified tabbed `FaqAccordion` on the Homepage and removed redundant FAQ blocks from Physiotherapy and Contact pages. Verified build/lint clean.
- **Description:** "Fix height mismatch of services carousel, optimize WebGL Globe rendering load, revamp heading styling with text gradients, and merge all subpage FAQs into a unified tabbed Accordion on the Homepage."

## [SCRUM-63] [UI/LOCALIZATION] Implement feedback changes: Globe resolution, single-column services, P2C auto-slider, and full localization check
- **Status:** Done
- **Update (2026-07-04):** Completed all feedback updates and mapped new webp assets. Integrated auto-playing cross-fade image sliders for P2C Health (10 images) on Homepage/Services page, and P2C Health Hero (2 images) on Physiotherapy page. Replaced the care-bridging composite card with a balanced 2x2 grid gallery of 4 images. Mapped target patient cards (6 images) and other services elementor-io carousel assets. Verified build/lint clean and all 50 unit tests passing.
- **Description:** "Implement feedback updates: Globe performance/clarity, single-column Explore Services stack on Services Page, P2C Health auto-play slider, Website Dev mockup image, Physio Hero background switcher, Target Patients cards with top images, Care Bridging composite block with comment overlays, and centralized localization support."
