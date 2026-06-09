import { type BookingStatus } from "@/lib/admin";
import { type ServiceCategory, type PreferredLanguage } from "@/lib/booking";

export type AdminRole = "super_admin" | "dispatcher";

export interface BookingRow {
  id: string;
  patient_name: string;
  customer_name: string | null;
  relationship_to_patient: string | null;
  patient_phone: string;
  patient_email: string;
  dob: string;
  service_category: ServiceCategory;
  booking_date: string;
  preferred_language: PreferredLanguage;
  is_home_visit: boolean;
  uk_postcode: string | null;
  address_details: string | null;
  status: BookingStatus;
  assigned_partner_name: string | null;
  internal_notes: string | null;
  missing_information: string | null;
  priority_level: string;
  provider_reason: string | null;
  acknowledge_coordinator_only: boolean;
  consent_contact: boolean;
  acknowledge_emergency_advice: boolean;
  consented_at: string;
  updated_at: string;
  created_at: string;
}

export interface EnquiryRow {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

export interface AdminProfileRow {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  status: "active" | "pending";
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: BookingRow;
        Insert: Omit<BookingRow, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<BookingRow, "id" | "created_at">>;
      };
      enquiries: {
        Row: EnquiryRow;
        Insert: Omit<EnquiryRow, "id" | "created_at">;
        Update: Partial<Omit<EnquiryRow, "id" | "created_at">>;
      };
      admin_profiles: {
        Row: AdminProfileRow;
        Insert: Omit<AdminProfileRow, "created_at">;
        Update: Partial<Omit<AdminProfileRow, "id" | "created_at">>;
      };
    };
  };
};
