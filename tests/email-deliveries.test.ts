import { afterEach, describe, expect, it, vi } from "vitest";
import { Resend } from "resend";

import { retryPendingEmailDeliveries, sendRecoverableEmails, type RecoverableEmailMessage } from "@/lib/email-deliveries";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const sendMock = vi.fn().mockResolvedValue({ data: { id: "email-1" }, error: null });

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function MockResend() {
    return {
      emails: {
        send: sendMock
      }
    };
  })
}));

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseAdminClient: vi.fn()
}));

function queryBuilder(result: any = { data: null, error: null }) {
  return {
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(result),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockResolvedValue(result),
    in: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    lt: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue(result)
  };
}

describe("email delivery recovery", () => {
  const originalEnv = process.env;
  const message: RecoverableEmailMessage = {
    from: "P2C Growth <partnertocustomer@p2cgrowths.co.uk>",
    to: "customer@example.com",
    subject: "Subject",
    text: "Text",
    html: "<p>Text</p>",
    notificationType: "booking_customer_confirmation",
    sourceType: "booking"
  };

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.clearAllMocks();
    sendMock.mockResolvedValue({ data: { id: "email-1" }, error: null });
  });

  it("records delivery as sent when Resend accepts the email", async () => {
    process.env.RESEND_API_KEY = "re_valid";
    process.env.RESEND_FROM_EMAIL = "from@example.com";
    const builder = queryBuilder({ data: { id: "delivery-1" }, error: null });
    vi.mocked(createSupabaseAdminClient).mockReturnValue({ from: vi.fn().mockReturnValue(builder) } as any);

    const result = await sendRecoverableEmails([message]);

    expect(result).toEqual({ skipped: false });
    expect(Resend).toHaveBeenCalledWith("re_valid");
    expect(builder.insert).toHaveBeenCalledWith(expect.objectContaining({
      notification_type: "booking_customer_confirmation",
      recipient_email: "customer@example.com",
      status: "pending"
    }));
    expect(builder.update).toHaveBeenCalledWith(expect.objectContaining({
      status: "sent",
      resend_email_id: "email-1"
    }));
  });

  it("keeps a failed delivery retryable when Resend rejects it", async () => {
    process.env.RESEND_API_KEY = "re_bad";
    process.env.RESEND_FROM_EMAIL = "from@example.com";
    sendMock.mockResolvedValue({ data: null, error: { message: "API key is invalid" } });
    const builder = queryBuilder({ data: { id: "delivery-1" }, error: null });
    vi.mocked(createSupabaseAdminClient).mockReturnValue({ from: vi.fn().mockReturnValue(builder) } as any);

    const result = await sendRecoverableEmails([message]);

    expect(result).toEqual({ skipped: false, errors: ["API key is invalid"] });
    expect(builder.update).toHaveBeenCalledWith(expect.objectContaining({
      status: "failed",
      attempts: 1,
      last_error: "API key is invalid",
      next_attempt_at: expect.any(String)
    }));
  });

  it("retries due failed deliveries and marks them sent", async () => {
    process.env.RESEND_API_KEY = "re_valid";
    process.env.RESEND_FROM_EMAIL = "from@example.com";
    const builder = queryBuilder({
      data: [{ id: "delivery-1", attempts: 1, payload: message }],
      error: null
    });
    vi.mocked(createSupabaseAdminClient).mockReturnValue({ from: vi.fn().mockReturnValue(builder) } as any);

    const result = await retryPendingEmailDeliveries();

    expect(result).toEqual({ ok: true, retried: 1, sent: 1, failed: 0 });
    expect(builder.update).toHaveBeenCalledWith(expect.objectContaining({
      status: "sent",
      attempts: 2,
      resend_email_id: "email-1"
    }));
  });
});
