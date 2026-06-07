import { afterEach, describe, expect, it, vi } from "vitest";

import { getEnv, hasResendConfig, hasSupabasePublicConfig, hasSupabaseServiceConfig } from "@/lib/env";

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

  it("hasResendConfig requires API key and from email", () => {
    process.env.RESEND_API_KEY = "api";
    process.env.RESEND_FROM_EMAIL = "email";
    expect(hasResendConfig()).toBe(true);

    delete process.env.RESEND_API_KEY;
    expect(hasResendConfig()).toBe(false);
  });
});
