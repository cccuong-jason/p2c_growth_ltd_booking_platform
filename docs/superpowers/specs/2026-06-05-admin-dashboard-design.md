# Admin Dashboard System Design Specification
**Date:** June 5, 2026
**Topic:** P2C Growth Platform - Admin Dashboard Architecture & Functionality

## 1. Overview
This document outlines the functional architecture and logic for the Phase 1 Admin Dashboard of the P2C Growth Platform. The system is designed as a centralized dispatch and coordination hub for internal staff, handling bookings, general inquiries, and internal user hierarchy.

## 2. Core Architecture & Security
* **Environment:** Next.js 14 (App Router).
* **Access Control:** Protected `/admin` routes. Unauthenticated access is redirected to login.
* **Authentication:** Supabase Auth (Email/Password). *Note: Credentials mocked for initial development.*
* **Data Mutability:** All database updates (status changes, note additions) occur via Next.js Server Actions utilizing the Supabase Service Role key (to bypass RLS for internal operations).
* **Email Integration:** Resend. *Note: Credentials mocked for initial development.*

## 3. Role-Based Access Control (RBAC)
The internal admin team requires a hierarchical structure to manage permissions safely.

### Roles
1. **Super Admin:** Full system control. Can view/edit all records, manage internal users, and perform destructive actions if necessary.
2. **Dispatcher:** Operational control. Can view queues, update statuses, assign partners, and edit notes. Cannot manage users.

### Implementation
* A new `admin_profiles` table linked to Supabase `auth.users` will store the `role` enum.
* Server Actions will verify the user's role against this table before executing sensitive mutations.
* The UI will conditionally render administrative tabs (e.g., User Management) based on the active role.

## 4. Database Schema Updates
The original `bookings` schema is expanded to support generalized dispatch workflows.

**Table: `bookings`**
* *Existing:* `id`, `patient_name`, `patient_phone`, `patient_email`, `dob`, `service_category`, `booking_date`, `preferred_language`, `is_home_visit`, `uk_postcode`, `address_details`, `status`, legal booleans, `created_at`.
* *New (Operational):*
  * `assigned_partner_name` (text, nullable): Tracks fulfillment partner.
  * `internal_notes` (text, nullable): Dispatcher scratchpad.
  * `updated_at` (timestamptz): Tracks last modification.

**Table: `admin_profiles` (New)**
* `id` (uuid, pk, references `auth.users.id`)
* `email` (text)
* `full_name` (text)
* `role` (text)
* `created_at` (timestamptz)

## 5. Functional Modules

### Module A: The Dispatch Queue
* **Purpose:** The primary operational view for managing bookings.
* **Features:**
  * High-density Data Table.
  * Global Search (Name, Email, Phone, ID).
  * Filters (Status, Service Category, Location Type).
  * Quick-action status updates from the row level.

### Module B: Booking Detail & Mutation View (Slide-out/Drawer)
* **Purpose:** Deep dive into a specific booking and execution of coordination tasks.
* **Features:**
  * Read-only view of patient submission data.
  * Editable Status dropdown (`pending` -> `partner_assigned` -> `confirmed` -> `completed` / `cancelled`).
  * Editable `assigned_partner_name` input.
  * Editable `booking_date` (serves as manual reschedule mechanism).
  * Editable `internal_notes` text area.

### Module C: Enquiry Queue
* **Purpose:** Secondary inbox for general B2B/tech inquiries (`enquiries` table).
* **Features:**
  * Read-only list view sorted by date.

### Module D: System Settings (Super Admin Only)
* **Purpose:** Internal user management.
* **Features:**
  * Interface to invite new admin users and assign roles.

## 6. Implementation Notes for Mocking
Until production credentials for Supabase and Resend are provided:
* Use environment variable checks (`if (!process.env.SUPABASE_URL)`) to return mocked data or log to the console instead of failing.
* The UI components should be built to accept standard data structures that will eventually be hydrated by Supabase.