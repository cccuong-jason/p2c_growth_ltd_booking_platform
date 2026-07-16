import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getEnv,
  getGeneralInboxEmail,
  getGeneralSenderEmail,
  getPhysioInboxEmail,
  getPhysioSenderEmail,
  hasResendConfig,
  hasSupabasePublicConfig,
  hasSupabaseServiceConfig
} from "@/lib/env";

describe("env utilities", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("getEnv returns a trimmed value if present", () => {
    process.env.TEST_VAR = "  hello  ";
    expect(getEnv("TEST_VAR")).toBe("hello");
  });

  it("getEnv returns undefined for missing or empty variables", () => {
    process.env.TEST_VAR = "";
    expect(getEnv("TEST_VAR")).toBeUndefined();
    expect(getEnv("NON_EXISTENT")).toBeUndefined();
  });

  it("hasSupabasePublicConfig returns true only if both keys are present", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "url";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "key";
    expect(hasSupabasePublicConfig()).toBe(true);

    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(hasSupabasePublicConfig()).toBe(false);
  });

  it("hasSupabaseServiceConfig requires public config and service key", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "url";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service";
    expect(hasSupabaseServiceConfig()).toBe(true);

    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(hasSupabaseServiceConfig()).toBe(false);
  });

  it("hasResendConfig requires an API key", () => {
    process.env.RESEND_API_KEY = "api";
    delete process.env.RESEND_FROM_EMAIL;
    expect(hasResendConfig()).toBe(true);

    delete process.env.RESEND_API_KEY;
    expect(hasResendConfig()).toBe(false);
  });

  it("provides default inboxes with env overrides", () => {
    delete process.env.P2C_GENERAL_INBOX;
    delete process.env.P2C_PHYSIO_INBOX;

    expect(getGeneralInboxEmail()).toBe("partnertocustomer@p2cgrowths.co.uk");
    expect(getPhysioInboxEmail()).toBe("medicoexpert@p2cgrowths.co.uk");

    process.env.P2C_GENERAL_INBOX = "general@example.com";
    process.env.P2C_PHYSIO_INBOX = "physio@example.com";

    expect(getGeneralInboxEmail()).toBe("general@example.com");
    expect(getPhysioInboxEmail()).toBe("physio@example.com");
  });

  it("provides default sender identities by message type", () => {
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.P2C_GENERAL_FROM_EMAIL;
    delete process.env.P2C_PHYSIO_FROM_EMAIL;
    delete process.env.P2C_GENERAL_INBOX;
    delete process.env.P2C_PHYSIO_INBOX;

    expect(getGeneralSenderEmail()).toBe("P2C Growth <partnertocustomer@p2cgrowths.co.uk>");
    expect(getPhysioSenderEmail()).toBe("P2C Health <medicoexpert@p2cgrowths.co.uk>");

    process.env.P2C_GENERAL_FROM_EMAIL = "General Desk <general@example.com>";
    process.env.P2C_PHYSIO_FROM_EMAIL = "physio@example.com";

    expect(getGeneralSenderEmail()).toBe("General Desk <general@example.com>");
    expect(getPhysioSenderEmail()).toBe("P2C Health <physio@example.com>");
  });
});
