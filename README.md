# P2C Growth LTD Booking Platform

Phase 1 local MVP for P2C Growth: a light SaaS corporate site, physiotherapy booking request flow, Supabase-backed enquiry/booking persistence, Resend confirmation email integration, and a protected internal admin dashboard.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Make shortcuts are also available:

```bash
make install
make dev
```

## Verification

```bash
npm run test
npm run lint
npm run build
```

Or run the full local gate:

```bash
make verify
```

Security audit shortcut:

```bash
make audit
```

## Environment

Copy `.env.example` to `.env.local` and provide:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `P2C_GENERAL_INBOX`
- `P2C_PHYSIO_INBOX`
- `P2C_GENERAL_FROM_EMAIL` optional override for general request sender
- `P2C_PHYSIO_FROM_EMAIL` optional override for physio booking sender
- `CRON_SECRET`
- `ADMIN_EMAIL_ALLOWLIST`

Without credentials, the app still builds and shows configuration-aware local states. Supabase inserts, Supabase Auth, and Resend email delivery require real credentials. Physio booking notifications and accepted-booking confirmations send from the physio sender, while general enquiries and other website requests send from the general sender.

Email delivery failures are recorded in `email_deliveries` and retried by the protected `/api/email/retry` cron endpoint. Run `supabase-setup.sql` after deployment updates so the retry table exists before relying on automatic recovery.
