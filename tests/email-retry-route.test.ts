import { describe, expect, it, vi, beforeEach } from "vitest";

import { GET } from "@/app/api/email/retry/route";
import { retryPendingEmailDeliveries } from "@/lib/email-deliveries";

vi.mock("@/lib/email-deliveries", () => ({
  retryPendingEmailDeliveries: vi.fn().mockResolvedValue({ ok: true, retried: 0, sent: 0, failed: 0 })
}));

describe("email retry route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CRON_SECRET = "secret";
  });

  it("rejects unauthorized retry requests", async () => {
    const response = await GET(new Request("https://example.com/api/email/retry"));

    expect(response.status).toBe(401);
    expect(retryPendingEmailDeliveries).not.toHaveBeenCalled();
  });

  it("runs retry worker when bearer token matches the cron secret", async () => {
    const response = await GET(
      new Request("https://example.com/api/email/retry", {
        headers: { authorization: "Bearer secret" }
      })
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, retried: 0, sent: 0, failed: 0 });
    expect(retryPendingEmailDeliveries).toHaveBeenCalled();
  });
});
