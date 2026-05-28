# P2C Growth Phase 1 BA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the Phase 1 P2C Growth physiotherapy booking platform without mismatches against the customer quotation, PRD, and UI/UX specification.

**Architecture:** Keep the product as a Next.js 14 App Router application with English-first content routed through the i18n dictionary, Supabase-aware persistence, Resend-aware email, and a protected internal admin workflow. Separate public marketing/booking surfaces from admin dispatch surfaces while reusing a consistent premium SaaS visual system.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase, Supabase Auth, Resend, React Email-compatible server email integration, Jest/Testing Library where available, Playwright/browser smoke checks for UI verification.

---

## 1. Source Documents And Priority

This plan is based on:

- `docs/Bao_gia_He_thong_Booking_Y_khoa_V5.docx` as the customer quotation and commercial scope source.
- `docs/P2C_Growth_PRD_v1.md` as the product/business requirements source.
- `docs/P2C_Growth_UI_UX_Guidelines_v1.md` as the design direction source.
- `AGENTS.md` as the local implementation guardrail.

Priority order when requirements appear to conflict:

1. Customer quotation scope in `Bao_gia_He_thong_Booking_Y_khoa_V5.docx`.
2. PRD business rules and legal constraints.
3. UI/UX guidelines and reference-site direction.
4. Existing implementation convenience.

## 2. Business Analysis Coverage Matrix

| Customer / PRD Requirement | Source | Implementation Coverage | Verification |
| --- | --- | --- | --- |
| Brand identity: logo options, color palette, medical typography, exported assets for web/social | Quote item 1 | Define a documented brand system and implement the chosen visual direction in global styles and shared shell components. Visual export deliverables remain a separate design handoff item unless assets are provided. | Review brand system section, visual screenshots, responsive checks. |
| Professional landing page | Quote item 2, PRD IA | Redesign homepage as a premium SaaS/healthcare coordination landing page with hero, product mockups, service positioning, trust section, and CTA. | Browser screenshots desktop/mobile; content checklist. |
| Display HCPC/CSP medical certificates | Quote item 2, PRD compliance | Add certificate/trust readiness blocks on homepage and physiotherapy service page. Avoid claiming certification ownership beyond “services delivered by HCPC/CSP professionals” unless customer provides exact certificate assets. | Copy review against legal disclaimer; UI screenshot. |
| Clear service categories | Quote item 2, PRD Module A | Surface physiotherapy treatment categories and P2C technical services clearly on Services and Physio pages. | Route review and booking service-card validation. |
| Multilingual support: English, Chinese, Vietnamese | Quote item 2, PRD business rule | Keep English as shipped content and route user-facing copy through `lib/i18n/dictionary.ts`; preserve language field in booking. Add visible language-readiness signals without promising completed translations. | Static code review for dictionary usage; booking preferred-language field test. |
| Booking form collects basic patient contact | Quote item 3, PRD Module A | Booking wizard collects name, DOB, phone, email, service, language, date/time preference. | Form validation tests/manual smoke. |
| Home Visit option with postcode | Quote item 3, PRD hard rule | Home Visit selection requires postcode and detailed address before submission. | Validation test: home visit blocks without postcode/address; in-clinic does not require address. |
| Auto confirmation email after successful booking | Quote item 3, PRD business rule | Use Resend integration after successful booking insert; compile without credentials and return environment-aware behavior locally. | Build without secrets; integration smoke once credentials arrive. |
| Internal admin dashboard for appointments: view, approve, cancel, reschedule | Quote item 4 | Admin route lists bookings, filters/sorts queue, supports status updates. “Reschedule” means internal date/time preference/status update in Phase 1 unless calendar scheduling is separately scoped. | Auth guard test; status update smoke; admin table screenshot. |
| Mini CRM stores basic customer contact info | Quote item 4 | Store and display basic booking/enquiry contact records in Supabase-backed tables. | Schema review; admin contact visibility check. |
| Infrastructure/deployment: server config, SSL, data safety | Quote item 5 | Document env contract, Supabase schema, local setup, deployment expectations, and SSL responsibility. Do not imply production hosting is included without credentials/domain. | `npm run build`; docs review; env placeholder check. |
| No online payments | PRD business constraints | Do not add payment CTAs, Stripe, PayPal, checkout, or payment status. | Code/content search for payment integrations. |
| Internal admin only, no vendor dashboard/RBAC | PRD constraints | Keep `/admin` internal; no partner/vendor portal in Phase 1. | Route map review. |
| Legal hard-stop checkboxes | PRD Module A | Booking cannot submit unless all legal acknowledgements are accepted; server action also validates them. | Client and server validation tests. |
| Medical liability disclaimer | PRD compliance | Show P2C as coordination platform, not clinic; emergency guidance and HCPC/CSP professional execution. | Copy checklist on physio booking and legal pages. |
| UK GDPR privacy | PRD compliance | Privacy policy states storage/sharing of health inquiry data; admin routes protected; Supabase service key server-only. | Privacy page review; env usage review. |
| 03-04 week delivery phases through UAT/go-live | Quote timeline | Represent project lifecycle in internal plan and optionally homepage trust/process copy; implementation phases remain Jira-managed. | Jira statuses and this plan. |
| Customer provides content/images/translations/email template | Quote responsibilities | Use placeholder-safe copy and avoid blocking local build on missing assets/translations/templates. Track customer-supplied content as separate acceptance dependency. | Open dependency list review. |

## 2.1 Visual Quality Bar

The next UI pass must treat "premium" as an acceptance requirement, not just a styling preference. The homepage should feel closer to Setrex/Fizens/Alytics quality than to a simple corporate brochure.

Required visual signals:

- Cinematic first viewport with a large Setrex-inspired Earth horizon/starfield and clear depth.
- Rich, viable product mockups that show the real Phase 1 workflow: booking intake, legal consent, Home Visit postcode logic, auto email, admin queue, and Mini CRM.
- Strong typography hierarchy with hero-scale messaging, compact product labels, and no cramped text.
- Motion/effects layer: subtle planet drift, animated route lines, floating product cards, scan/radar effects, hover polish, and `prefers-reduced-motion` support.
- Social proof and trust: testimonial-style quotes, HCPC/CSP readiness, data-safety/SSL, multilingual readiness, and UAT/go-live lifecycle cues.
- More spatial composition: overlapping panels, glass, depth shadows, highlighted metrics, and a clear story from public request to internal dispatch.

## 3. Jira Work Breakdown Model

Follow the corrected hierarchy:

- Epic: `SCRUM-5` - Phase 1 P2C Growth platform.
- Task/Story: larger scope items under the Epic. A Story must be justified by business analysis or user value; a Task can be technical/platform work of similar size.
- Subtask: implementation slices under a Task/Story. All UI correction work should remain under `SCRUM-41`, with `SCRUM-48` covering the homepage hero/globe/product cockpit correction.

Current UI/DX parent:

- `SCRUM-41` `[UI/DX] Premium platform polish for Phase 1 local review`
  - `SCRUM-47` `[UI] Define premium visual system and motion primitives`
  - `SCRUM-48` `[UI] Build homepage hero, globe, and product cockpit`
  - `SCRUM-49` `[UI] Polish physiotherapy booking wizard`
  - `SCRUM-50` `[UI] Polish internal admin dashboard shell`
  - `SCRUM-51` `[DX] Add Makefile workflow shortcuts`

## 4. File Structure Plan

Public UI:

- Modify `app/page.tsx` for homepage structure, hero, product mockups, trust strip, and BA-aligned sections.
- Modify `app/services/page.tsx` for service category clarity and technical-services positioning.
- Modify `app/services/physiotherapy/page.tsx` for medical disclaimer, service categories, home-visit clarity, HCPC/CSP trust language, and booking CTA.
- Modify `app/contact/page.tsx` for B2B enquiries and customer-provided-content expectations.
- Modify `app/privacy/page.tsx` and `app/terms/page.tsx` for UK GDPR, medical disclaimer, and service coordination language.

Shared UI and content:

- Modify `app/globals.css` for premium visual system, globe/planet styling, animation primitives, mockup surfaces, and responsive behavior.
- Modify `components/site-shell.tsx` only if shared shell/navigation/footer needs updated premium variants.
- Modify `lib/i18n/dictionary.ts` for all public copy, trust labels, legal copy, service category copy, and language-ready content keys.

Booking and backend integration:

- Modify `components/booking/booking-wizard.tsx` or equivalent booking UI component for validation, animation, service cards, and home-visit fields.
- Modify `app/services/physiotherapy/actions.ts` or equivalent server action/API route for server-side legal/home-visit validation.
- Modify `lib/supabase/*` for environment-aware inserts and admin queries.
- Modify `lib/email/*` for Resend confirmation email behavior.

Admin:

- Modify `app/admin/login/page.tsx` for admin-only access experience.
- Modify `app/admin/page.tsx` for dashboard queue, enquiries, status updates, and Mini CRM visibility.
- Modify `app/admin/actions.ts` or equivalent server actions for status updates.

Docs and DX:

- Modify `docs/supabase-schema.md` for bookings/enquiries schema and legal consent fields.
- Modify `.env.example` if present, otherwise create it for required environment variables.
- Create/modify `Makefile` for setup, dev, lint, test, build, verify.
- Keep this plan in `docs/P2C_Growth_Phase1_BA_Implementation_Plan.md`.

## 5. Implementation Tasks

### Task 1: Confirm Scope Traceability And Acceptance Gates

**Files:**

- Modify: `docs/P2C_Growth_Phase1_BA_Implementation_Plan.md`
- Modify: Jira `SCRUM-41` / `SCRUM-48` comments

- [ ] Add this plan to `docs/`.
- [ ] Add Jira comment linking this plan and summarizing quote/PRD coverage.
- [ ] Ensure no implementation starts until the relevant UI redesign direction is approved.
- [ ] Acceptance: every quote item has a row in the BA coverage matrix.

### Task 2: Premium Visual System And Homepage Globe Correction

**Files:**

- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `lib/i18n/dictionary.ts`

- [ ] Replace the current abstract globe with a Setrex-inspired Earth horizon: dark starfield, large grayscale planet arc, visible surface texture, and smooth fade into the page body.
- [ ] Add richer product mockups: booking intake, legal consent, home-visit postcode logic, auto-email event, admin queue, Mini CRM contact card.
- [ ] Add testimonial/social-proof cards and stronger trust storytelling.
- [ ] Add trust/spec chips: HCPC/CSP-ready display, multilingual EN/ZH/VI, SSL/data-safety, UAT/go-live.
- [ ] Ensure typography feels premium: large centered hero, strong contrast, compact supporting copy, no oversized text inside small cards.
- [ ] Ensure animations are subtle and disabled by `prefers-reduced-motion`.
- [ ] Run: `npm run lint`
- [ ] Run: `npm run build`
- [ ] Browser check desktop and mobile hero screenshots.
- [ ] Update Jira `SCRUM-48` comment with files changed and verification.

### Task 3: Client Website And Service Category Alignment

**Files:**

- Modify: `app/services/page.tsx`
- Modify: `app/services/physiotherapy/page.tsx`
- Modify: `lib/i18n/dictionary.ts`

- [ ] Confirm service hub includes physiotherapy plus website development, booking/workflow automation, and Mini CRM/customer management.
- [ ] Confirm physiotherapy page lists required treatment categories: elderly, neurological/stroke, post-surgery, sports/gym, occupational/office, medico-legal assessment.
- [ ] Add compliant copy for HCPC/CSP professionals without overstating certification ownership.
- [ ] Add medical liability disclaimer near booking CTA.
- [ ] Run route smoke checks for `/services` and `/services/physiotherapy`.
- [ ] Update Jira `SCRUM-49` or relevant subtask comment.

### Task 4: Booking Wizard Business Rules

**Files:**

- Modify: booking wizard component path used by `/services/physiotherapy`
- Modify: booking server action/API route
- Modify: tests for booking validation if test framework is available

- [ ] Verify basic patient contact fields: full name, DOB, phone, email.
- [ ] Verify operational fields: preferred language, date/time preference.
- [ ] Verify service category selection uses card-style controls.
- [ ] Verify Home Visit requires UK postcode and address details.
- [ ] Verify legal acknowledgements are client and server hard stops.
- [ ] Verify no payment fields or checkout behavior exists.
- [ ] Run: `npm run test`
- [ ] Run: `npm run lint`
- [ ] Update Jira `SCRUM-49` comment with validation evidence.

### Task 5: Supabase, Resend, And Environment Safety

**Files:**

- Modify: `lib/supabase/*`
- Modify: `lib/email/*`
- Modify: `docs/supabase-schema.md`
- Create/modify: `.env.example`

- [ ] Confirm app compiles without real Supabase/Resend credentials.
- [ ] Confirm required env variables are documented: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL_ALLOWLIST`.
- [ ] Confirm booking inserts include legal booleans/timestamps and home-visit fields.
- [ ] Confirm enquiry inserts cover B2B contact submissions.
- [ ] Confirm Resend sends only after successful booking insert when configured.
- [ ] Run: `npm run build`
- [ ] Update Jira implementation comment with credential-dependent items clearly marked.

### Task 6: Internal Admin Dashboard And Mini CRM

**Files:**

- Modify: `app/admin/login/page.tsx`
- Modify: `app/admin/page.tsx`
- Modify: admin server actions/API routes
- Modify: admin tests if available

- [ ] Confirm unauthenticated users are blocked from `/admin`.
- [ ] Confirm admin can view bookings and enquiries in separate tabs.
- [ ] Confirm booking queue supports filtering/sorting.
- [ ] Confirm statuses support `pending`, `partner_assigned`, `confirmed`, `completed`, `cancelled`.
- [ ] Confirm contact details needed for Mini CRM are visible.
- [ ] Clarify “reschedule” as a Phase 1 internal workflow/status/date preference operation, not full calendar booking unless separately approved.
- [ ] Run: `npm run lint`
- [ ] Run: `npm run build`
- [ ] Browser check admin desktop layout.
- [ ] Update Jira `SCRUM-50` comment.

### Task 7: Legal, Privacy, And Compliance Pages

**Files:**

- Modify: `app/privacy/page.tsx`
- Modify: `app/terms/page.tsx`
- Modify: `lib/i18n/dictionary.ts`

- [ ] Privacy page states what health inquiry/contact data is collected.
- [ ] Privacy page states data may be shared with professional partners for service coordination.
- [ ] Terms state P2C is not a clinic and does not diagnose/treat.
- [ ] Terms include emergency guidance: call 999 or NHS urgent/appropriate urgent care.
- [ ] Ensure copy is understandable to UK users and compatible with English-first launch.
- [ ] Run: `npm run lint`
- [ ] Update Jira comment if legal copy changes.

### Task 8: DX, Makefile, And Local Review

**Files:**

- Create/modify: `Makefile`
- Create/modify: `.env.example`
- Modify: `README.md` if present
- Modify: `AGENTS.md` only if workflow commands change

- [ ] Add `make install`, `make dev`, `make test`, `make lint`, `make build`, and `make verify` shortcuts.
- [ ] Ensure `make verify` runs lint, tests, and build in the correct order.
- [ ] Document local credential placeholders and what cannot be end-to-end verified until credentials arrive.
- [ ] Run: `make verify`
- [ ] Update Jira `SCRUM-51` comment.

### Task 9: Final Verification And Jira Status Loop

**Files:**

- No code files unless fixes are needed.
- Update Jira subtasks and parent task comments/statuses.

- [ ] Run: `npm run lint`
- [ ] Run: `npm run test`
- [ ] Run: `npm run build`
- [ ] Run browser checks for `/`, `/services/physiotherapy`, `/admin/login`, `/admin` where environment permits.
- [ ] Confirm no payment implementation exists.
- [ ] Confirm all BA matrix rows are either implemented, documented as customer dependency, or explicitly deferred.
- [ ] Move relevant subtasks to `In Review` only after fresh verification evidence.
- [ ] Add final Jira parent comment on `SCRUM-41` summarizing completed scope, verification, and remaining credential-dependent checks.

## 6. Open Dependencies

- Real Supabase credentials are needed for live insert/query verification.
- Real Resend credentials and approved sender email are needed for live email verification.
- Customer-provided translations are needed before shipping full `zh-Hant`, `zh-Hans`, and `vi` content.
- Customer-provided logo/certificate/media assets are needed for final brand export and exact certificate display.
- Domain/hosting/SSL production details are excluded from the quoted build price unless separately supplied; the app should remain deployment-ready.

## 7. Acceptance Checklist

- [ ] Homepage visually matches premium dark SaaS direction and no longer uses the simple abstract globe treatment.
- [ ] Customer quotation scope is represented in UI, docs, or dependency list.
- [ ] Booking form enforces home-visit postcode/address.
- [ ] Booking form enforces legal acknowledgements.
- [ ] Auto-email is integrated and environment-aware.
- [ ] Admin dashboard supports booking queue, enquiry tab, statuses, and Mini CRM contact visibility.
- [ ] No payments, vendor dashboard, or staff RBAC appear in Phase 1.
- [ ] `npm run lint` passes.
- [ ] `npm run test` passes or documented if no tests exist.
- [ ] `npm run build` passes.
- [ ] Jira comments/statuses reflect the actual verified state.
