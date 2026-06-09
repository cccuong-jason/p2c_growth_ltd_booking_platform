export const bookingStatuses = [
  "new_request",
  "need_more_info",
  "awaiting_provider",
  "quote_sent",
  "appointment_confirmed",
  "completed",
  "cancelled",
  "no_show"
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export function isBookingStatus(value: unknown): value is BookingStatus {
  return typeof value === "string" && (bookingStatuses as readonly string[]).includes(value);
}

export function normalizeStatus(value: unknown): BookingStatus {
  if (!isBookingStatus(value)) {
    throw new Error(`Invalid booking status: ${value}`);
  }

  return value;
}

export function getStatusLabel(status: BookingStatus): string {
  const labels: Record<BookingStatus, string> = {
    new_request: "New Request",
    need_more_info: "Need More Info",
    awaiting_provider: "Awaiting Provider",
    quote_sent: "Quote / Availability Sent",
    appointment_confirmed: "Appointment Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
    no_show: "No Show"
  };
  return labels[status];
}

export function getStatusColor(status: BookingStatus): string {
  const colors: Record<BookingStatus, string> = {
    new_request: "bg-blue-50 text-blue-700 border-blue-200",
    need_more_info: "bg-amber-50 text-amber-700 border-amber-200",
    awaiting_provider: "bg-purple-50 text-purple-700 border-purple-200",
    quote_sent: "bg-cyan-50 text-cyan-700 border-cyan-200",
    appointment_confirmed: "bg-indigo-50 text-indigo-700 border-indigo-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    no_show: "bg-slate-50 text-slate-700 border-slate-200"
  };
  return colors[status];
}

export function isAdminEmailAllowed(email: string | undefined, allowlist: string | undefined): boolean {
  if (!email || !allowlist) {
    return false;
  }

  return allowlist
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

export interface OperationalDataUpdate {
  status?: BookingStatus;
  assigned_partner_name?: string | null;
  internal_notes?: string | null;
  missing_information?: string | null;
  priority_level?: string;
  provider_reason?: string | null;
  booking_date?: string;
}
