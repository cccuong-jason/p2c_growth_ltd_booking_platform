import { describe, expect, it } from "vitest";

import { validateBookingInput } from "@/lib/booking";

const baseBooking = {
  patientName: "Mai Nguyen",
  countryCode: "+44",
  patientPhone: "7000000000",
  patientEmail: "mai@example.com",
  dob: "1955-04-12",
  serviceCategory: "neurological" as const,
  bookingDate: "2026-06-03",
  preferredLanguage: "vi" as const,
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

  it("requires a referral type when service category is medico_legal", () => {
    const result = validateBookingInput({
      ...baseBooking,
      serviceCategory: "medico_legal",
      medicalLegalReferralType: "" as any
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.medicalLegalReferralType).toContain("required");
    }
  });

  it("accepts a valid medico_legal booking with referral type", () => {
    const result = validateBookingInput({
      ...baseBooking,
      serviceCategory: "medico_legal",
      medicalLegalReferralType: "insurance_claim"
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid date of birth (too old)", () => {
    const result = validateBookingInput({
      ...baseBooking,
      dob: "1850-01-01"
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.dob).toContain("Please enter a valid date of birth (max 150 years)");
    }
  });

  it("rejects invalid phone formats", () => {
    const result = validateBookingInput({
      ...baseBooking,
      patientPhone: "abc1234567"
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.patientPhone).toContain("Enter a valid phone number (7-15 digits)");
    }
  });

  it("rejects invalid email formats", () => {
    const result = validateBookingInput({
      ...baseBooking,
      patientEmail: "not-an-email"
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.patientEmail).toContain("Enter a valid email address");
    }
  });
});
