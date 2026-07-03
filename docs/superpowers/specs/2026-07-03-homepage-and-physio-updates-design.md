# Design Spec: Home Page and Physio Page Updates

This document describes the design and implementation details for updating the Home Page and the Physiotherapy Landing/Booking page.

## 1. Scope & Goals

- Improve visual assets on both the Home Page and Physio Page.
- Restructure the Home Page's "Explore Service" layout to be a single-column vertical stack of large cards with alternating side-aligned images.
- Add an auto-playing image slider for the P2C Health block.
- Increase the quality/clarity of the interactive Globe graphic.
- Implement dynamic auto-rotating background image functionality for the Physio page hero.
- Re-layout the Target Patients section to include images at the top and floating icon badges.
- Expand the Care Bridging section with a composite image card and glassmorphic informational callout overlays.
- Resolve localization issues across pages so that English (`en`), Vietnamese (`vi`), and Traditional Chinese/Hong Kong (`hk`) display correctly without mixing languages or falling back incorrectly.

## 2. Architecture & Components

### 2.1 Localization Namespace
All strings will be routed through `lib/i18n/dictionary.ts`. We will add a new sub-object named `bookingWizard` inside each of the main language objects:

```typescript
// Structure inside dictionary.ts
export const dictionary = {
  en: {
    // ...
    bookingWizard: {
      backToLanding: "Back to Physio Landing",
      requestSystem: "REQUEST SYSTEM",
      submitTitle: "Submit Physio Request",
      submitDesc: "Please fill in the form below to book an expert physiotherapy session.",
      steps: {
        service: { label: "SERVICE", desc: "Area of support" },
        details: { label: "DETAILS", desc: "Patient info" },
        schedule: { label: "SCHEDULE", desc: "Select date" },
        confirm: { label: "CONFIRM", desc: "Review consent" }
      },
      // ...
    }
  },
  vi: { ... },
  hk: { ... }
}
```

Both `components/booking/booking-wizard.tsx` and `app/services/physiotherapy/booking/page.tsx` will be refactored to read from this dictionary using the `locale` provided by `useLocale()`.

### 2.2 Home Page Updates
- **Globe Performance & Clarity**: Set `devicePixelRatio` to `2.0` and `mapSamples` to `22000` in both `app/page.tsx` and `components/ui/globe.tsx`.
- **Explore Service Section**: 
  - Restructured to a `flex flex-col gap-8` container.
  - Alternating layout on desktop: odd items show text on left, image on right; even items show image on left, text on right.
  - Sized-up card elements (`p-8 md:p-12`, title size `text-2xl md:text-3xl`).
  - Folder for assets: `/assets/our-services/`
- **P2C Health Slider**:
  - Toggled automatically using React state every 4 seconds.
  - Folder for assets: `/assets/p2c-health/`
  - Cross-faded layout transition.
- **Website Development Mockup Image**:
  - Folder for assets: `/assets/website-development/`
  - Uses `web-dev-main.png` placeholder inside a browser shell frame.

### 2.3 Physio Page Updates
- **Auto-rotating Background**:
  - Folder for assets: `/assets/main-background/`
  - Switches between `bg1.png` and `bg2.png` every 6 seconds using absolute overlay layers.
- **Target Patients Section**:
  - Folder for assets: `/assets/target-patients/`
  - Cards include a `h-[180px]` top image, a circular overlapping icon badge (`w-12 h-12`), and a description container below.
- **Care Bridging Section**:
  - Folder for assets: `/assets/care-bridging/`
  - Split right column to stack the testimonial card and a composite image block.
  - Layered glassmorphic badges on top of the image to show key comments (with no emojis).

## 3. Validation & Quality Checks
- Run `npm run lint` and verify no linting errors.
- Run `npm run build` to ensure the project compiles successfully.
- Verify multi-lingual routing triggers no fallback overlap.
