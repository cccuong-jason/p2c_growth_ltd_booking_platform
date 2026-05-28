# Gemini UI Handoff - P2C Growth Booking Platform

## Current Context

The project is a Next.js 14 App Router application for P2C Growth Phase 1: a UK physiotherapy booking and internal dispatch platform.

The user is not satisfied with the current UI quality and wants Gemini to continue the UI work. The backend/Supabase/Resend credential work is intentionally deferred until credentials are supplied.

## Framework State

- Tailwind CSS is installed and used across the app.
- Framer Motion is installed and has been introduced for homepage reveal/parallax primitives.
- shadcn/ui is not installed.
- lucide-react is used for icons.

## Important User Feedback

The user specifically said:

- The UI is not impressive enough compared with the reference sites.
- The current layout feels boring/simple.
- The mockups look bad and need to be more viable/product-like.
- Typography is too large and inconvenient.
- There is too much text.
- The main black/dark color is disliked.
- The page needs animated-on-scroll effects.
- The page needs parallax scrolling.
- The page needs more mockups, animated buttons, animated text, scrolling effects.
- FAQ, CTA, and testimonials should be clearly present.
- Use the reference direction from Fizens/Framer more carefully.

## Reference Material

Primary references already discussed:

- `https://alytics.framer.website/`
- `https://fizens.framer.ai/`
- User-provided recording: `C:\Users\jason\Videos\RecForth\20260526000204.mp4`

Local reference/document files:

- `docs/Bao_gia_He_thong_Booking_Y_khoa_V5.docx`
- `docs/P2C_Growth_PRD_v1.md`
- `docs/P2C_Growth_UI_UX_Guidelines_v1.md`
- `docs/P2C_Growth_Phase1_BA_Implementation_Plan.md`
- `docs/supabase-schema.md`
- `alytics-home.png`
- `fizens-home.png`

## Current UI Implementation State

Recent UI work touched:

- `app/page.tsx`
- `app/globals.css`
- `lib/i18n/dictionary.ts`
- `components/site-shell.tsx`
- `components/home/motion-primitives.tsx`
- Basic route shell spacing in:
  - `app/about/page.tsx`
  - `app/services/page.tsx`
  - `app/contact/page.tsx`
  - `app/privacy/page.tsx`
  - `app/terms/page.tsx`
  - `app/admin/login/page.tsx`
  - `app/admin/page.tsx`

The latest homepage attempt:

- Makes `app/page.tsx` a client component.
- Uses `components/home/motion-primitives.tsx` for Framer Motion reveal/parallax primitives.
- Adds lighter hero mockups, FAQ, testimonials, CTA, and product-surface sections.
- Moves the palette away from heavy black toward blue/cyan SaaS surfaces.
- Reduces text density in `lib/i18n/dictionary.ts`.

This is still not user-approved and should be considered an in-progress attempt, not final design.

## Known Technical Notes

Next dev cache has broken more than once after running `next build` while a dev server was still running. If dev routes 500 with missing modules such as `.next/server/app/webpack-runtime.js` or `.next/server/chunks/*.js`, stop the dev server, delete `.next`, then restart dev.

Recommended safe sequence:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
Remove-Item -LiteralPath .next -Recurse -Force -ErrorAction SilentlyContinue
npm run dev
```

Do not run `npm run build` while `npm run dev` is still running.

## Last Known Verification

Before the final handoff request:

- `npm run lint` passed.
- `npm run test` passed.
- `npm run build` passed after fixing the client/server Framer Motion boundary.

Then route smoke found `/about` returning 500 because dev server and build output conflicted in `.next`; this was identified as generated cache inconsistency, not source failure. The proper next step is to restart dev from a clean `.next` and re-run route smoke.

## Jira Workflow Context

The user expects Jira to be kept updated. Existing relevant Jira items:

- `SCRUM-41` parent implementation scope.
- `SCRUM-48` homepage hero/globe/product cockpit UI. Currently should remain `In Progress` because the user rejected the current UI quality.
- `SCRUM-49` booking wizard UI.
- `SCRUM-50` admin dashboard shell UI.

Important workflow correction from the user:

- Story and Task are equal large scopes.
- Stories are based on business analysis.
- Implementation work should be broken down into subtasks under those larger scopes.
- Do not create tasks/stories as tiny implementation slices.

## Suggested Gemini Plan

1. Re-read business/design docs.
2. Inspect the current homepage and identify what should be kept versus replaced.
3. Use Tailwind + Framer Motion; do not add shadcn/ui unless deliberately choosing to install/configure it.
4. Rebuild the homepage as a polished SaaS product landing page:
   - smaller, more comfortable typography;
   - lighter palette with blue/cyan/white, minimal black;
   - stronger product mockups above the fold;
   - real scroll reveal/parallax, not only static CSS animation;
   - concise copy;
   - FAQ, testimonials, and CTA sections clearly visible;
   - mobile layout where mockups and CTA appear quickly.
5. Recheck non-home pages for fixed-header spacing and visual consistency.
6. Verify:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - route smoke for `/`, `/about`, `/services`, `/services/physiotherapy`, `/contact`, `/privacy`, `/terms`, `/admin/login`, `/admin`, `/icon.svg`
   - desktop and mobile screenshots via browser tooling.
7. Update Jira comments/status after meaningful changes.

## Remaining Business/Backend Work

Backend work remains pending user credentials:

- Supabase insert verification for bookings and enquiries.
- Supabase Auth admin verification.
- Admin booking status update verification against live data.
- Resend booking confirmation email verification.
- Production/Vercel deployment is not yet the milestone; current milestone is local dev.

## Immediate Cleanup Needed

Generated screenshot files currently appear in git status and should be removed before committing/handoff if not needed:

- `p2c-ui-pass-desktop.png`
- `p2c-ui-pass-mobile-top-v3.png`
- `p2c-ui-pass-mobile-v2.png`
- `p2c-ui-pass-mobile.png`
- `p2c-ui-pass-top-desktop-v2.png`
- `p2c-ui-pass-top-desktop.png`

Do not delete the reference files `alytics-home.png` and `fizens-home.png`.
