# Design Spec: Enhanced P2C Physiotherapy Booking Page

* **Date:** 2026-06-23
* **Author:** Antigravity (AI Coding Assistant)
* **Status:** DRAFT
* **Target Path:** `app/services/physiotherapy/page.tsx`
* **Translation File:** `lib/i18n/dictionary.ts`

---

## 1. Overview
The customer wants to enhance the dedicated P2C Physiotherapy Booking page to include extensive background, trust-building, and coordination program information, instead of just displaying the intake wizard. 

As per the project directives:
1. **English-First and Routed Through Dictionary:** The page content will support both English and Vietnamese. All text will be loaded from a translation dictionary.
2. **Reuses Existing Styles and Components:** It will integrate cleanly with the existing design language (colors, typography, grid, buttons, animations) and reuse `BookingWizard` and `FaqAccordion`.
3. **No Hallucinated/External Components:** Only standard React state tab patterns and pre-existing components will be used.

---

## 2. Layout Structure (Option A - Single-Page Flow)
The page will be organized vertically as a single long-form layout, wrapping each major section in `Reveal` motion transitions:

1. **Hero Header:**
   * Headline: "Physiotherapy Booking Support for the Asian Community in the UK"
   * Lead text describing the booking-to-dispatch service.
   * Language selector toggle (EN / VI) in the top-right corner.
   * Primary CTA button: "Submit Physio Request" (scrolls smoothly down to the booking form).
   * Secondary CTA button: "View Pricing" (scrolls smoothly to the pricing table).
2. **Important Disclaimer Banner:**
   * Clear callout highlighted with warning colors (using `bg-amber-50` and border `border-amber-200`).
   * Highlights that P2C is a coordination platform, not a clinic.
   * Emergency hard stop directing serious symptoms to call 999 or NHS 111.
3. **Who Is This Service For (Audience Grid):**
   * A responsive 3-column grid displaying the 6 target demographics defined in the PDF:
     1. Elderly Mobility
     2. Post-Surgery Recovery
     3. Stroke & Neurological Support
     4. Home Visits
     5. Multilingual Support
     6. Busy Families
4. **Why Choose P2C (Benefits Section):**
   * Explains how P2C simplifies care coordination (solving waiting lists, language barriers, and travel constraints).
   * Features a decorative block with the quote: *"Pain is not a normal part of aging. Early support preserves mobility, confidence, and daily independence."*
5. **Services We Coordinate (Interactive Tabs):**
   * A clean, state-based tab switcher showing the 5 service categories and their bullet lists:
     * *Elderly Rehab:* Mobility support, Balance problems, Walking difficulties, Strengthening, Fall prevention, General elderly rehab.
     * *Stroke & Neuro Rehab:* Stroke rehab, Parkinson's support, Mobility retraining, Walking practice, Balance and coordination, Daily movement support.
     * *Post-surgery Rehab:* Knee replacement, Hip replacement, ACL surgery, Spine surgery, Post-operative mobility, Strength and movement recovery.
     * *Sports & Gym Injury Rehab:* Shoulder pain, Lower back pain, Runner's knee, Gym injuries, Sports injuries, Injury prevention.
     * *Workers Program:* Nail salon workers, Restaurant workers, Office workers, Business owners.
6. **Operational Steps (How It Works):**
   * A step-by-step horizontal/vertical progress tracker mapping the 4 phases:
     * *Step 1: Submit Request*
     * *Step 2: Needs Review*
     * *Step 3: Match Provider*
     * *Step 4: Confirm Appointment*
7. **Pricing Table Grid:**
   * Side-by-side grids detailing reference pricing for:
     * *Home Visits:* Initial Assessment (60 mins: £120), Follow-ups (45 mins: £90; 30 mins: £70).
     * *Online Assessment & Training:* Online assessment (30 mins: £55), Online assessment & training (60 mins: £95).
   * A clear note clarifying prices are reference rates subject to change based on distance, region, and provider availability.
8. **Intake Form Section:**
   * Prominent header: "Submit Physio Request".
   * Directly mounts the existing `BookingWizard` component.
9. **Frequently Asked Questions (FAQs):**
   * Renders the 7 key Q&As from the PDF using the existing `FaqAccordion` component.

---

## 3. i18n Translation Dictionary Schema
We will update `lib/i18n/dictionary.ts` to define a new `physiotherapy` key mapping for both English and Vietnamese.

---

## 4. Verification Checkpoints
To ensure perfect delivery before ship, the following checks are mandated:
1. **Compilation Validation:** `npm run build` must complete with exit 0.
2. **Linting Check:** `npm run lint` must pass with zero issues.
3. **Locale Sync:** Verify language state toggle switches labels, grids, and accordion text seamlessly between English and Vietnamese.
4. **Scrolling Anchor Check:** Ensure the "Submit Physio Request" and "View Pricing" hero buttons scroll smoothly to their respective targets.
