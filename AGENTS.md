# P2C Growth Platform Agent Guide

## Project Shape

- Next.js 14 App Router, TypeScript, Tailwind CSS.
- Phase 1 is a UK physiotherapy booking and internal dispatch platform.
- No online payments, no vendor dashboard, and no staff RBAC in Phase 1.

## Commands

- `npm run dev` starts local development.
- `npm run test` runs unit tests.
- `npm run lint` runs Next.js lint checks.
- `npm run build` verifies production compilation.

## Implementation Notes

- Keep user-facing copy English-first and route content through `lib/i18n/dictionary.ts`.
- Keep Supabase and Resend integrations environment-aware. The app must compile without real credentials.
- Booking legal acknowledgements are hard stops. Do not bypass them in UI or server validation.
- Home visits require postcode and address details.
