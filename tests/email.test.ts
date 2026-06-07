import { afterEach, describe, expect, it, vi } from "vitest";
import { Resend } from "resend";

import { sendBookingConfirmation } from "@/lib/email";

// Mock the Resend library
vi.mock("resend", () => {
  const mockSend = vi.fn().mockResolvedValue({ id: "mock-id" });
  function MockResend() {
    return {
      emails: {
        send: mockSend
      }
    };
  }
  return {
    Resend: vi.fn().mockImplementation(MockResend)
  };
});

describe("email integration", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  const mockBooking = {
    patientName: "John Doe",
    patientEmail: "john@doe.com",
    // ... rest of payload not needed for the skip check
  } as any;

  it("skips sending if Resend config is missing", async () => {
    delete process.env.RESEND_API_KEY;
    
    const result = await sendBookingConfirmation(mockBooking);
    expect(result.skipped).toBe(true);
    expect(result.reason).toBe("Resend is not configured");
  });

  it("calls Resend with correct parameters when configured", async () => {
    process.env.RESEND_API_KEY = "re_123";
    process.env.RESEND_FROM_EMAIL = "hello@p2cgrowth.com";

    const result = await sendBookingConfirmation(mockBooking);
    
    expect(result.skipped).toBe(false);
    expect(Resend).toHaveBeenCalledWith("re_123");
    
    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    expect(resendInstance.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "hello@p2cgrowth.com",
        to: "john@doe.com",
        subject: expect.stringContaining("physiotherapy request"),
      })
    );
  });
});
