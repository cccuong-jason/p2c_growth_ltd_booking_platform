import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

import { getEnv, hasSupabasePublicConfig, hasSupabaseServiceConfig } from "@/lib/env";

export function createSupabaseAdminClient() {
  if (!hasSupabaseServiceConfig()) {
    return null;
  }

  return createClient(getEnv("NEXT_PUBLIC_SUPABASE_URL")!, getEnv("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export function createSupabaseServerClient() {
  if (!hasSupabasePublicConfig()) {
    return null;
  }

  const cookieStore = cookies();

  return createServerClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL")!,
    getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Components cannot always mutate cookies. Middleware can refresh sessions later.
          }
        }
      }
    }
  );
}
