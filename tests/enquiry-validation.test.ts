import { describe, expect, it } from "vitest";

import { validateEnquiryInput } from "@/lib/booking";

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
