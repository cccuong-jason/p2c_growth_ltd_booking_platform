export function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : undefined;
}

export function hasSupabasePublicConfig(): boolean {
  return Boolean(getEnv("NEXT_PUBLIC_SUPABASE_URL") && getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"));
}

export function hasSupabaseServiceConfig(): boolean {
  return Boolean(hasSupabasePublicConfig() && getEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

export function hasResendConfig(): boolean {
  return Boolean(getEnv("RESEND_API_KEY") && getEnv("RESEND_FROM_EMAIL"));
}
