-- Run this in your Supabase SQL Editor to initialize the database

-- 1. Create the Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  patient_phone text not null,
  patient_email text not null,
  dob date not null,
  service_category text not null,
  booking_date timestamptz not null,
  preferred_language text not null,
  is_home_visit boolean not null default false,
  uk_postcode text,
  address_details text,
  status text not null default 'pending',
  assigned_partner_name text,
  internal_notes text,
  acknowledge_coordinator_only boolean not null,
  consent_contact boolean not null,
  acknowledge_emergency_advice boolean not null,
  consented_at timestamptz not null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 2. Create the Enquiries table (for the Contact form)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

-- 3. Create the Admin Profiles table (for Dashboard access)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  role text not null default 'dispatcher',
  created_at timestamptz not null default now()
);

-- 4. Create the Email Deliveries table (durable email send/retry outbox)
CREATE TABLE IF NOT EXISTS public.email_deliveries (
  id uuid primary key default gen_random_uuid(),
  notification_type text not null,
  source_type text,
  source_id uuid,
  recipient_email text not null,
  subject text not null,
  payload jsonb not null,
  status text not null default 'pending',
  attempts integer not null default 0,
  next_attempt_at timestamptz,
  last_error text,
  resend_email_id text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint email_deliveries_status_check check (status in ('pending', 'sent', 'failed', 'abandoned'))
);

CREATE INDEX IF NOT EXISTS email_deliveries_retry_idx
  ON public.email_deliveries (status, next_attempt_at)
  WHERE status in ('pending', 'failed');

-- 5. Setup Row Level Security (RLS)
-- Since we are using Server Actions with the Service Role Key for writes, 
-- and fetching data in the admin dashboard via the Service Role Key,
-- we can safely disable public access to these tables.
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_deliveries ENABLE ROW LEVEL SECURITY;

-- 6. Create an Admin User (Optional step, you can also do this in the Auth UI)
-- To log into the /admin dashboard, you must create a user in the Supabase 
-- Authentication > Users menu using one of the emails you added to the 
-- ADMIN_EMAIL_ALLOWLIST in your .env.local (e.g., admin@example.com)
