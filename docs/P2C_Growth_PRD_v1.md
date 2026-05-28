# Product Requirements Document (PRD)
**Project Name:** P2C Growth LTD Corporate & Brokerage Platform (Phase 1: Physiotherapy MVP)
**Document Version:** 1.0
**Date:** May 2026

---

## 1. Executive Summary & Product Vision
**Product Name:** P2C Growth Platform
**Positioning:** A UK-based technology solutions provider specializing in booking systems, CRMs, and customer-partner connection platforms.
**Product Vision:** To build a scalable, multi-tenant tech infrastructure that captures customer service requests and seamlessly routes them to verified professional partners, starting with an MVP for Physiotherapy services.
**Business Model:** Lead Generation & Service Coordination (Platform as a Service / Brokerage). P2C handles the technology, booking flow, and communication; the Partners handle the actual service execution.

## 2. Target Audience & User Personas

### Persona 1: The End-User (Physio Patient / Family Member)
* **Demographics:** Asian community (Vietnamese, Chinese) residing in the UK. Includes elderly patients, post-surgery/stroke patients, and busy office workers.
* **Pain Points:** NHS waiting times are too long; severe language barriers; difficulty traveling to clinics (need home visits); cultural tendency to endure pain until it worsens.
* **Key Needs:** Quick access to native-speaking professionals, easy home-visit booking, and clear communication.

### Persona 2: The P2C Internal Admin (Dispatcher)
* **Pain Points:** Managing scattered inquiries across emails/calls; manually matching patients with available physiotherapists; tracking the status of a booking.
* **Key Needs:** A centralized, high-efficiency dashboard to view incoming requests, manage patient data, and automate workflows.

## 3. Business Rules & Constraints (Phase 1 MVP)
1. **NO Online Payments:** Do not integrate Stripe, PayPal, or any payment gateway. Bookings are submitted as "Requests" and paid in person later.
2. **Internal Admin ONLY:** There is NO multi-vendor or staff RBAC (Role-Based Access Control) in Phase 1. Build a single, secure Admin Dashboard for the internal team.
3. **The "Home Visit" Logic:** * During booking, users must choose "In-Clinic" or "Home Visit".
   * IF "Home Visit" is selected -> A "UK Postcode" and detailed address input field MUST become mandatory.
4. **Multi-Language (i18n):** The frontend MUST support English (Default), Traditional Chinese (HK/TW), Simplified Chinese (Mainland), and Vietnamese.
5. **Auto-Responder Email:** Upon successful booking submission, the system MUST trigger an automated confirmation email to the user.

## 4. Information Architecture (Site Map)
1. **Home:** High-tech hero section, company introduction & value proposition.
2. **About Us:** Mission, Vision, Core Values (Customer-centric, transparent, tech-driven).
3. **Services (Hub):**
   * Physio Booking (Core MVP focus)
   * Website Development
   * Booking System & Workflow Email Automation
   * Customer Management System / Mini CRM
4. **Contact Us:** General B2B inquiries for tech solutions.
5. **Legal & Compliance:** Privacy Policy, Terms & Conditions.

## 5. Functional Requirements (Core Modules)

### Module A: The Physio Booking Engine (User-Facing)
* **Service Display:** Dynamically list core treatment areas (Elderly, Neurological/Stroke, Post-Surgery, Sports/Gym, Occupational/Office, Medico-Legal Physiotherapy Assessments).
* **Booking Form Logic (Data Collection):**
   * *Standard Fields:* Full Name, DOB, Phone, Email.
   * *Operational Fields:* Preferred Language (EN/ZH/VI), Date/Time Preference.
   * *Service Selection:* Dropdown/Cards of the service types.
   * *Location Logic:* Postcode/City input (conditional based on Home Visit toggle).
* **Mandatory Legal Constraints (Hard Stop Checkboxes):**
   1. Acknowledge P2C is a booking/coordination platform, NOT a medical clinic.
   2. Consent to be contacted via Phone/Email/WhatsApp.
   3. Acknowledge that for emergencies, they must call 999 or NHS urgent care.

### Module B: Admin Dashboard & CRM (Internal)
* **Booking Queue:** A Data Table view of all incoming Physio bookings with filtering/sorting.
* **Enquiry Management:** A separate tab for general tech/B2B inquiries.
* **Status Tracking:** Ability to update booking status (e.g., *Pending -> Partner Assigned -> Confirmed -> Completed*).

## 6. Non-Functional Requirements & Legal Compliance
* **Medical Liability Disclaimer:** Must prominently display that P2C Growth LTD does not diagnose or treat. All clinical assessments are executed by HCPC-registered Chartered Physiotherapists.
* **Data Privacy (UK GDPR):** The database must have secure access controls. The Privacy Policy must explicitly state how health inquiry data is stored and shared.
* **Performance:** Must load instantly globally, especially optimized for UK routing. Mobile-first responsiveness is mandatory.

## 7. Technical Architecture & Data Model
* **Frontend:** Next.js 14 (App Router), Tailwind CSS.
* **Backend/DB:** Supabase (PostgreSQL).
* **Email Integration:** Resend + React Email.

### Recommended Database Schema (`bookings` table)
* `id` (uuid, pk)
* `patient_name` (text)
* `patient_phone` (text)
* `patient_email` (text)
* `dob` (date)
* `service_category` (text)
* `booking_date` (date)
* `preferred_language` (text)
* `is_home_visit` (boolean)
* `uk_postcode` (text, nullable)
* `address_details` (text, nullable)
* `status` (text, default: 'pending')
* `created_at` (timestamp)
