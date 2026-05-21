# Supabase Schema

Phase 1 expects two tables. Exact RLS policy can be tightened during production rollout; local MVP writes use the service role through server actions only.

## `bookings`

- `id` uuid primary key default `gen_random_uuid()`
- `patient_name` text not null
- `patient_phone` text not null
- `patient_email` text not null
- `dob` date not null
- `service_category` text not null
- `booking_date` timestamp or text not null
- `preferred_language` text not null
- `is_home_visit` boolean not null default false
- `uk_postcode` text nullable
- `address_details` text nullable
- `status` text not null default `pending`
- `acknowledge_coordinator_only` boolean not null
- `consent_contact` boolean not null
- `acknowledge_emergency_advice` boolean not null
- `consented_at` timestamptz not null
- `created_at` timestamptz not null default `now()`

## `enquiries`

- `id` uuid primary key default `gen_random_uuid()`
- `name` text not null
- `email` text not null
- `company` text nullable
- `message` text not null
- `created_at` timestamptz not null default `now()`
