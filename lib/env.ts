export const DEFAULT_GENERAL_INBOX_EMAIL = "partnertocustomer@p2cgrowths.co.uk";
export const DEFAULT_PHYSIO_INBOX_EMAIL = "medicoexpert@p2cgrowths.co.uk";

export function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

export function hasSupabasePublicConfig(): boolean {
  return Boolean(getEnv("NEXT_PUBLIC_SUPABASE_URL") && getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"));
}

export function hasSupabaseServiceConfig(): boolean {
  return Boolean(hasSupabasePublicConfig() && getEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

export function hasResendConfig(): boolean {
  return Boolean(getEnv("RESEND_API_KEY"));
}

export function getGeneralInboxEmail(): string {
  return getEnv("P2C_GENERAL_INBOX") ?? DEFAULT_GENERAL_INBOX_EMAIL;
}

export function getPhysioInboxEmail(): string {
  return getEnv("P2C_PHYSIO_INBOX") ?? DEFAULT_PHYSIO_INBOX_EMAIL;
}

function formatSender(name: string, email: string): string {
  if (email.includes("<")) {
    return email;
  }

  return `${name} <${email}>`;
}

export function getGeneralSenderEmail(): string {
  return formatSender(
    "P2C Growth",
    getEnv("P2C_GENERAL_FROM_EMAIL") ?? getEnv("RESEND_FROM_EMAIL") ?? getGeneralInboxEmail()
  );
}

export function getPhysioSenderEmail(): string {
  return formatSender(
    "P2C Health",
    getEnv("P2C_PHYSIO_FROM_EMAIL") ?? getPhysioInboxEmail()
  );
}

export function getEmailRetrySecret(): string | undefined {
  return getEnv("EMAIL_RETRY_SECRET") ?? getEnv("CRON_SECRET");
}
