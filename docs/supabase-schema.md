# Supabase Schema

Phase 1 expects four tables to support the dispatch workflow, internal hierarchy, and durable email recovery. Exact RLS policy can be tightened during production rollout; local MVP writes use the service role through server actions only.

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
- `assigned_partner_name` text nullable
- `internal_notes` text nullable
- `acknowledge_coordinator_only` boolean not null
- `consent_contact` boolean not null
- `acknowledge_emergency_advice` boolean not null
- `consented_at` timestamptz not null
- `updated_at` timestamptz not null default `now()`
- `created_at` timestamptz not null default `now()`

## `enquiries`

- `id` uuid primary key default `gen_random_uuid()`
- `name` text not null
- `email` text not null
- `company` text nullable
- `message` text not null
- `created_at` timestamptz not null default `now()`

## `admin_profiles`

- `id` uuid primary key default `gen_random_uuid()` (references `auth.users.id`)
- `email` text not null
- `full_name` text not null
- `role` text not null default `dispatcher` (e.g., `super_admin`, `dispatcher`)
- `created_at` timestamptz not null default `now()`

## `email_deliveries`

- `id` uuid primary key default `gen_random_uuid()`
- `notification_type` text not null
- `source_type` text nullable
- `source_id` uuid nullable
- `recipient_email` text not null
- `subject` text not null
- `payload` jsonb not null
- `status` text not null default `pending` (`pending`, `sent`, `failed`, `abandoned`)
- `attempts` integer not null default `0`
- `next_attempt_at` timestamptz nullable
- `last_error` text nullable
- `resend_email_id` text nullable
- `sent_at` timestamptz nullable
- `created_at` timestamptz not null default `now()`
- `updated_at` timestamptz not null default `now()`
