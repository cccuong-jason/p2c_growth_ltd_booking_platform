# Design Spec: Homepage Typography Polish & Centralized FAQ Consolidation

* **Date:** 2026-06-27
* **Author:** Antigravity (AI Coding Assistant)
* **Status:** APPROVED
* **Target Paths:**
  - `app/page.tsx`
  - `app/services/physiotherapy/page.tsx`
  - `app/contact/page.tsx`
  - `components/ui/faq-accordion.tsx`
  - `app/globals.css`
  - `lib/i18n/dictionary.ts`

---

## 1. Overview
This specification addresses two key user experience requests:
1. **Typography Polish (Approach 1):** Revamp solid black, heavy headers to mitigate reading fatigue and size clunkiness. We will apply multi-tone slate gradients, tighter letter tracking, line heights, inline word highlight accents, and scroll-reveal transitions.
2. **FAQ Consolidation (Homepage-Only Option 1):** Consolidate all FAQ sections from across the website (General, Physiotherapy coordination, and Accounts/Billing) into a single, unified, tabbed FAQ section on the Homepage, removing inline FAQ blocks from other pages.

---

## 2. Typographic Style Changes (Approach 1)

### A. Global Utility Styles (`app/globals.css`)
We will introduce or refine CSS helper variables and classes:
- **Title Tracking & Gradients:** Headings will shift from solid black to multi-tone slate gradients using background clips.
- Refine `.display-heading`, `.page-heading`, and `.section-heading` in [app/globals.css](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/globals.css):
  ```css
  .display-heading {
    letter-spacing: -0.035em;
    line-height: 1.05;
    font-weight: 800;
  }
  .page-heading {
    font-size: clamp(2.25rem, 4vw, 3.75rem);
    letter-spacing: -0.03em;
    line-height: 1.06;
    font-weight: 800;
  }
  .section-heading {
    font-size: clamp(1.875rem, 3.25vw, 3.25rem);
    letter-spacing: -0.025em;
    line-height: 1.1;
    font-weight: 800;
  }
  ```

### B. Inline Typography Implementation
- **Hero Title (`app/page.tsx`):**
  - Revamp the headline inside the `TypingAnimation` component with:
    - Gradient text mask: `bg-clip-text text-transparent bg-gradient-to-br from-slate-950 via-slate-800 to-blue-600/90`.
    - Tighten padding and sizing rules.
    - Highlight power words like "workflow" or "systems" with a pale-blue backdrop badge or underlines.
- **Section Titles:**
  - Revamp section headings across `app/page.tsx`, `app/services/physiotherapy/page.tsx`, and `app/contact/page.tsx` to use:
    - Text gradient mask: `bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700` or standard gradient tokens.
    - Tightened margins and letter tracking (`tracking-tighter` or `tracking-tight`).

---

## 3. Consolidated Homepage FAQ Architecture

### A. Centralized FAQ Dictionary (`lib/i18n/dictionary.ts`)
We will reuse the existing translations from the dictionary:
- General FAQs: `home.faq`
- Physiotherapy Q&As: `physiotherapy.faqs.items`
- Contact/Billing FAQs: `contact.faqs`

### B. Stepped/Tabbed Component (`components/ui/faq-accordion.tsx`)
We will upgrade `FaqAccordion` to support tabbed switching of categories:
- **Tabs Selection:** Provide a tab controller row at the top of the component displaying categories dynamically:
  - `General Platform`
  - `P2C Health (Physiotherapy)`
  - `Accounts & Billing`
- **Dynamic Filter:** Change active content items array based on the chosen category state.
- **Visuals:** Add a decorative background panel with soft shadows matching the light-theme palette.

### C. Remove Inline FAQ blocks from Subpages
- **Physiotherapy page (`app/services/physiotherapy/page.tsx`):** Delete the FAQ section `<section id="faq-section" ...>` to keep the landing page focused.
- **Contact page (`app/contact/page.tsx`):** Delete the inline FAQ section to simplify the inquiry page.

---

## 4. Success Criteria
1. The Homepage FAQ section successfully allows users to toggle between General, Physiotherapy, and Billing questions.
2. Inline FAQ sections are completely removed from the Physiotherapy and Contact pages.
3. Headings look modern, utilizing gradients, tighter line heights, and letter-spacing with 0 clunky text overflow.
4. The project compiles successfully (`npm run build` and `npm run lint` return 0 errors).
