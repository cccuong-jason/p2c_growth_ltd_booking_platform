import { createSupabaseAdminClient } from "@/lib/supabase/server";

export interface ContactIdentity {
  email: string;
  phone: string;
  name: string;
}

/**
 * Finds or creates a contact record based on email and phone.
 * Prioritizes email for matching, then phone.
 */
export async function getOrCreateContact(identity: ContactIdentity) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    console.warn("Supabase credentials missing. Mocking CRM deduplication for:", identity.email);
    return { success: true, contactId: "mock-contact-uuid" };
  }

  // 1. Try to find by email
  const { data: byEmail, error: emailError } = await supabase
    .from("contacts")
    .select("id")
    .eq("email", identity.email.toLowerCase())
    .maybeSingle();

  if (byEmail) return { success: true, contactId: byEmail.id };

  // 2. Try to find by phone
  const { data: byPhone, error: phoneError } = await supabase
    .from("contacts")
    .select("id")
    .eq("phone", identity.phone)
    .maybeSingle();

  if (byPhone) return { success: true, contactId: byPhone.id };

  // 3. Create new contact if not found
  const { data: newContact, error: createError } = await supabase
    .from("contacts")
    .insert({
      email: identity.email.toLowerCase(),
      phone: identity.phone,
      full_name: identity.name,
    })
    .select("id")
    .single();

  if (createError) {
    console.error("Error creating contact:", createError);
    return { success: false, error: createError.message };
  }

  return { success: true, contactId: newContact.id };
}
