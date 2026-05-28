# UI/UX Design Guidelines
**Project Name:** P2C Growth LTD Corporate & Brokerage Platform
**Theme Style:** Modern SaaS, Hi-Tech, Premium Brokerage
**Reference Styles:** Alytics, Fizens, Setrex, Linear, Vercel

---

## 1. Design Philosophy & Core Vibe
The goal is to mask a standard booking utility behind an enterprise-grade, high-ticket facade. The platform should feel like a cutting-edge tech product rather than a traditional, clinical hospital website. 
* **Key Adjectives:** Futuristic, trustworthy, minimalist, high-performance, premium.
* **Primary Visual Elements:** Dark mode, glowing neon accents, 3D interactive elements, deep shadows, and translucent layers.

## 2. Color Palette
The platform defaults strictly to **Dark Mode** to emphasize the "Tech SaaS" aesthetic.
* **Backgrounds:**
  * Base Background: `#050505` or `bg-zinc-950` (Deep Space/OLED black).
  * Card/Surface Background: `#09090B` with a `1px` border of `#27272A` (Zinc-800).
* **Accents (Neon/Electric):**
  * Primary Action: Electric Cyan (`#00F2FF`) or Neon Lime Green (per Fizens reference).
  * Secondary/Glow Effects: Deep Purple (`#7000FF`) to create mesh gradient backgrounds.
* **Typography Colors:**
  * Primary Text: `#FFFFFF` or `text-zinc-50` (High contrast).
  * Muted Text: `#A1A1AA` or `text-zinc-400` (For descriptions and secondary labels).

## 3. Typography
Use geometric, highly legible sans-serif fonts characteristic of modern tech startups.
* **Primary Font:** `Inter`, `Plus Jakarta Sans`, or `Urbanist`.
* **Headings:** Tight tracking (letter-spacing: negative), bold weights (700/800).
* **Body:** Clean, line-height of 1.6 for readability.
* **Monospace (for data/numbers):** `JetBrains Mono` or `Roboto Mono` to add a subtle developer/tech feel.

## 4. Key UI Components & Treatments
* **Glassmorphism:** Use heavily on modals, dropdowns, and floating navbars. Background blur (`backdrop-blur-md`) with a highly transparent dark fill (`bg-black/40`) and a subtle white border (`border-white/10`).
* **Bento Grids:** Use a tiled, asymmetrical grid layout for displaying services or features. Cards should slightly scale up or have their borders glow on hover.
* **Buttons:** * Primary: Solid neon color or a gradient glow effect behind a dark button.
  * Secondary: Outline buttons with subtle hover backgrounds.

## 5. The Hero Section (The Hook)
This is the most critical visual element to establish the "Hi-Tech" spirit immediately.
* **Layout:** Centered alignment.
* **Headline:** Massive, high-contrast text. Example: "Next-Gen Healthcare Coordination."
* **Visual Element (3D Globe):** Implement a spinning 3D dot-matrix globe (using the `cobe` WebGL library) positioned slightly behind or below the main text.
* **Background:** A subtle, dark radial mesh gradient (Cyan/Purple) behind the globe to give it depth.

## 6. Booking Flow UX (Client Side)
The booking form must not look like a traditional long-scroll web form.
* **Structure:** A multi-step wizard contained within a Glassmorphism modal/card.
* **Transitions:** Smooth fade and slide effects between steps using `Framer Motion`.
* **Interactions:**
  * Selecting a service category should use large icon cards (Bento style), not a standard dropdown.
  * Toggling "Home Visit" should smoothly expand the Postcode input field with a subtle pulse animation on the input border to draw attention.

## 7. Admin Dashboard UX (Internal Side)
Prioritize data density and high-speed operation, referencing the `Linear` app design system.
* **Sidebar:** Narrow, dark sidebar with minimalist Lucide icons.
* **Data View:** High-contrast tables. Use small, highly legible fonts.
* **Status Badges:** Use glowing dot indicators for booking status (e.g., a glowing yellow dot for 'Pending', glowing cyan for 'Confirmed').
* **Borders:** Extremely subtle, thin borders separating rows and columns. Avoid heavy boxes.
