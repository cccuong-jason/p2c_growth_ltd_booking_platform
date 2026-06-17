# Design Specification: Booking, Services, Simplified About Page, and Footer Updates

**Date:** 2026-06-17  
**Status:** APPROVED  
**Author:** Antigravity  

## 1. Overview

This design specification details updates to the navigation, home page services section, services bento grid, physiotherapy booking wizard, about page, and footer. The goal is to:
- Simplify navigation by removing header actions and secondary CTAs.
- Improve contrast and clarity of card elements based on customer feedback.
- Group secondary services on the Services page into a single, cohesive, three-column bento card.
- Convert the home page "Our services" section from an expanding accordion into a smooth horizontal slider carousel with visible card images.
- Replace the "View More" CTA on the P2C Health service card with a "Book expert" button linking directly to the booking form.
- Add an elegant placeholder background image behind the booking page hero section.
- Revamp and drastically simplify the About page to only show the core company information alongside exactly 2 high-contrast placeholder images, removing all extra sections (FAQ, Team, Stats, Zig-zags).
- Colorize the Site Footer with the brand's blue color code (`bg-ocean`) to boost contrast and make it distinct.

---

## 2. Detailed Changes

### 2.1 Navigation & CTA Simplification
- **File:** [components/site-shell.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/components/site-shell.tsx)
  - Remove "Book expert" button in desktop header.
  - Remove "Book expert" button in mobile navigation dropdown.
- **File:** [app/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/page.tsx)
  - Remove the "Explore systems" secondary button in the hero section.

### 2.2 Card Contrast and Clarity Improvements
- **File:** [components/booking/booking-wizard.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/components/booking/booking-wizard.tsx)
  - Modify step-wizard content card wrappers, summary panels, and option cards.
  - Change background colors from `bg-porcelain` / light-gray to pure `bg-white`.
  - Update borders from `border-slate-100` to `border-slate-200` with shadow utilities.
- **File:** [app/services/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/page.tsx)
  - Modify BentoCard background styling from `bg-porcelain` to `bg-white` and borders to `border-slate-200`.

### 2.3 Grouped Bento Card (Services Page)
- **File:** [app/services/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/page.tsx)
  - Replace the separate maps/reveals of the three secondary features ("Booking System & Email Automation", "Mini CRM", and "Customer-Partner Platform") with a single full-width `BentoCard`.
  - Inside this card, implement a responsive 3-column sub-grid on desktop (1-column on mobile) displaying each feature.

### 2.4 "Our Services" Slider Carousel (Home Page)
- **File:** [app/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/page.tsx)
  - Convert the accordion into a smooth horizontal slider carousel.
  - Render a horizontal scrollable container controlled via React Ref `scrollBy`.
  - For each card, render a visible rounded placeholder image container in the middle/bottom of the card (`h-40 w-full rounded-xl`).
  - For **P2C Health**, replace the "View More" CTA with a "Book expert" button linking to `/services/physiotherapy`. For others, retain the default "View More" coming-soon link styling.

### 2.5 Booking Hero Section Background
- **File:** [app/services/physiotherapy/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/services/physiotherapy/page.tsx)
  - Add a full-bleed placeholder background image to the hero section.
  - Overlay it with a gradient/solid overlay (`bg-porcelain/90`) to preserve text readability and ensure text contrast is high.

### 2.6 Simplified About Page
- **File:** [app/about/page.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/app/about/page.tsx)
  - Rewrite the page to follow an ultra-clean structure:
    - **Header:** Title and description.
    - **Core Grid (2 columns):**
      - **Left Column:** Mission details, brief explanation of the "P2C" acronym, and three bullet points outlining key features (Workflow Automation, Partner Coordination, UK Operational Focus) using crisp icons (`Activity`, `Users`, `Target`).
      - **Right Column:** Staggered display of exactly two high-contrast, border-rounded placeholder images representing P2C Health and operations.
    - **Bottom Block:** A simple call-to-action button prompting users to explore services or get in touch.
  - Remove all other sections (Team list, Stats cards, FAQ accordions, Zig-zag sub-features) to fulfill the customer request for extreme simplicity.

### 2.7 Colorized Footer
- **File:** [components/site-shell.tsx](file:///home/cuongchung/Jason/p2c_growth_ltd_booking_platform/components/site-shell.tsx)
  - Update `SiteFooter` background to `bg-ocean` (the brand's blue color code).
  - Update text elements to high-contrast colors: `text-white` for titles/logos and `text-blue-100` for descriptions and links.
  - Restyle links to feature soft white hover states (`hover:text-white`).
  - Restyle copyright bottom separator line to `border-blue-400/30` with `text-blue-200/80`.

---

## 3. Review Checklist

- [x] All header buttons removed.
- [x] Card border/background classes updated to `bg-white` and `border-slate-200`.
- [x] Home page accordion replaced with slider carousel.
- [x] Visible placeholder images added to all service carousel cards.
- [x] "Book expert" button in Services carousel directs directly to `/services/physiotherapy`.
- [x] Secondary features grouped inside a single Bento Card.
- [x] Background image setup in booking hero section with readable overlay.
- [x] About page simplified to contain exactly 2 images and core text only.
- [x] Site footer styled in blue background (`bg-ocean`) with white high-contrast text.
