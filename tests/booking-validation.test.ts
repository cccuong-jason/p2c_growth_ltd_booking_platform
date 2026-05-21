import { describe, expect, it } from "vitest";

import { validateBookingInput } from "@/lib/booking";

const baseBooking = {
  patientName: "Mai Nguyen",
  patientPhone: "+44 7000 000000",
  patientEmail: "mai@example.com",
  dob: "1955-04-12",
  serviceCategory: "neurological",
  bookingDate: "2026-06-03",
  preferredLanguage: "vi",
  isHomeVisit: false,
  ukPostcode: "",
  addressDetails: "",
  acknowledgeCoordinatorOnly: true,
  consentContact: true,
  acknowledgeEmergencyAdvice: true
};

describe("validateBookingInput", () => {
  it("accepts an in-clinic booking without address fields", () => {
    const result = validateBookingInput(baseBooking);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.isHomeVisit).toBe(false);
      expect(result.data.ukPostcode).toBeNull();
    }
  });

  it("requires postcode and address for home visits", () => {
    const result = validateBookingInput({
      ...baseBooking,
      isHomeVisit: true,
      ukPostcode: "",
      addressDetails: ""
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.ukPostcode).toContain("required");
      expect(result.errors.addressDetails).toContain("required");
    }
  });

  it("blocks submission until every legal acknowledgement is accepted", () => {
    const result = validateBookingInput({
      ...baseBooking,
      acknowledgeCoordinatorOnly: false,
      consentContact: false,
      acknowledgeEmergencyAdvice: false
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.acknowledgeCoordinatorOnly).toContain("required");
      expect(result.errors.consentContact).toContain("required");
      expect(result.errors.acknowledgeEmergencyAdvice).toContain("required");
    }
  });
});
