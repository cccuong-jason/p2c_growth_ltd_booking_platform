export const bookingStatuses = [
  "pending",
  "partner_assigned",
  "confirmed",
  "completed",
  "cancelled"
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export function isBookingStatus(value: unknown): value is BookingStatus {
  return typeof value === "string" && bookingStatuses.includes(value as BookingStatus);
}

export function normalizeStatus(value: unknown): BookingStatus {
  if (!isBookingStatus(value)) {
    throw new Error("Invalid booking status");
  }

  return value;
}

export function getStatusLabel(status: BookingStatus): string {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function isAdminEmailAllowed(email: string | undefined, allowlist: string | undefined): boolean {
  if (!email || !allowlist) {
    return false;
  }

  return allowlist
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}
