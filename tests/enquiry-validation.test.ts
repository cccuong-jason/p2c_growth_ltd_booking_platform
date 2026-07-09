import { describe, expect, it } from "vitest";

import {
  validateAutomationRequestInput,
  validateEnquiryInput,
  validateWebsiteRequestInput
} from "@/lib/booking";

describe("validateEnquiryInput", () => {
  it("accepts a valid enquiry", () => {
    const result = validateEnquiryInput({
      name: "Jane Doe",
      email: "jane@company.com",
      company: "Tech Corp",
      message: "I am interested in your booking solutions."
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.company).toBe("Tech Corp");
    }
  });

  it("accepts an enquiry without a company name", () => {
    const result = validateEnquiryInput({
      name: "Jane Doe",
      email: "jane@company.com",
      company: "",
      message: "I am interested in your booking solutions."
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.company).toBeNull();
    }
  });

  it("rejects an invalid email", () => {
    const result = validateEnquiryInput({
      name: "Jane Doe",
      email: "not-an-email",
      message: "I am interested in your booking solutions."
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toContain("Valid email is required");
    }
  });

  it("rejects a message that is too short", () => {
    const result = validateEnquiryInput({
      name: "Jane Doe",
      email: "jane@company.com",
      message: "Hi"
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.message).toContain("Message is required");
    }
  });

  it("requires a name", () => {
    const result = validateEnquiryInput({
      name: "",
      email: "jane@company.com",
      message: "I am interested in your booking solutions."
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toContain("Name is required");
    }
  });
});


describe("validateWebsiteRequestInput", () => {
  it("accepts a valid website request", () => {
    const result = validateWebsiteRequestInput({
      name: "Jane Doe",
      phone: "07700900123",
      email: "jane@company.com",
      businessName: "Tech Corp",
      websiteType: "new_business_website"
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.businessName).toBe("Tech Corp");
      expect(result.data.websiteType).toBe("new_business_website");
    }
  });

  it("requires website type selection", () => {
    const result = validateWebsiteRequestInput({
      name: "Jane Doe",
      phone: "07700900123",
      email: "jane@company.com",
      businessName: "Tech Corp",
      websiteType: ""
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.websiteType).toContain("Website type is required");
    }
  });
});

describe("validateAutomationRequestInput", () => {
  it("accepts a valid automation request with multi-select fields", () => {
    const result = validateAutomationRequestInput({
      name: "John Smith",
      phone: "07700900123",
      email: "john@company.com",
      systemType: "full_system",
      contactChannels: ["phone", "whatsapp"],
      automatedEmails: ["customer_confirmation", "internal_notification"],
      dashboardNeed: "yes",
      bookingVolume: "20_50",
      currentTools: ["gmail", "google_sheets"],
      notes: "We manage requests manually today."
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contactChannels).toEqual(["phone", "whatsapp"]);
      expect(result.data.automatedEmails).toEqual([
        "customer_confirmation",
        "internal_notification"
      ]);
    }
  });

  it("requires at least one contact channel and one automated email selection", () => {
    const result = validateAutomationRequestInput({
      name: "John Smith",
      phone: "07700900123",
      email: "john@company.com",
      systemType: "full_system",
      contactChannels: [],
      automatedEmails: [],
      dashboardNeed: "yes",
      bookingVolume: "20_50",
      currentTools: ["gmail"],
      notes: ""
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.contactChannels).toContain(
        "Select at least one customer contact channel"
      );
      expect(result.errors.automatedEmails).toContain(
        "Select at least one email automation need"
      );
    }
  });
});
