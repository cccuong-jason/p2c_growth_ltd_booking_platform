import { Resend } from "resend";

import { getEnv, hasResendConfig } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type RecoverableEmailMessage = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  notificationType: string;
  sourceType?: string;
  sourceId?: string | null;
};

export type EmailDeliveryResult =
  | { skipped: true; reason: string }
  | { skipped: false; errors?: string[] };

type DeliveryRow = {
  id: string;
  payload: RecoverableEmailMessage;
  attempts: number;
};

const MAX_ATTEMPTS = 5;

function nextAttemptAt(attempts: number): string {
  const delayMinutes = Math.min(60, Math.max(1, 2 ** Math.max(0, attempts - 1)));
  return new Date(Date.now() + delayMinutes * 60 * 1000).toISOString();
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown email delivery error";
}

function deliveryInsert(message: RecoverableEmailMessage) {
  return {
    notification_type: message.notificationType,
    source_type: message.sourceType ?? null,
    source_id: message.sourceId ?? null,
    recipient_email: message.to,
    subject: message.subject,
    payload: message,
    status: "pending",
    attempts: 0,
    next_attempt_at: new Date().toISOString()
  };
}

function sendPayload(message: RecoverableEmailMessage) {
  const resend = new Resend(getEnv("RESEND_API_KEY"));
  const { notificationType: _notificationType, sourceType: _sourceType, sourceId: _sourceId, ...payload } = message;
  return resend.emails.send(payload);
}

async function recordStatus(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  id: string,
  data: Record<string, unknown>
) {
  if (!supabase) return;

  const { error } = await supabase
    .from("email_deliveries")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Unable to update email delivery status", error.message);
  }
}

async function sendTrackedMessage(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  message: RecoverableEmailMessage
): Promise<string | null> {
  let deliveryId: string | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("email_deliveries")
      .insert(deliveryInsert(message))
      .select("id")
      .single();

    if (error) {
      console.error("Unable to create email delivery record", error.message);
    } else {
      deliveryId = data.id;
    }
  }

  try {
    const { data, error } = await sendPayload(message);
    if (error) {
      throw new Error(error.message);
    }

    if (deliveryId) {
      await recordStatus(supabase, deliveryId, {
        status: "sent",
        attempts: 1,
        last_error: null,
        resend_email_id: data?.id ?? null,
        sent_at: new Date().toISOString(),
        next_attempt_at: null
      });
    }

    return null;
  } catch (error) {
    const messageText = errorMessage(error);
    if (deliveryId) {
      await recordStatus(supabase, deliveryId, {
        status: "failed",
        attempts: 1,
        last_error: messageText,
        next_attempt_at: nextAttemptAt(1)
      });
    }
    return messageText;
  }
}

export async function sendRecoverableEmails(messages: RecoverableEmailMessage[]): Promise<EmailDeliveryResult> {
  if (!hasResendConfig()) {
    return { skipped: true, reason: "Resend is not configured" };
  }

  const supabase = createSupabaseAdminClient();
  const errors: string[] = [];

  for (const message of messages) {
    const error = await sendTrackedMessage(supabase, message);
    if (error) {
      errors.push(error);
    }
  }

  if (errors.length > 0) {
    console.error("Email delivery failed", errors);
    return { skipped: false, errors };
  }

  return { skipped: false };
}

export async function retryPendingEmailDeliveries(limit = 10) {
  if (!hasResendConfig()) {
    return { ok: false, retried: 0, sent: 0, failed: 0, message: "Resend is not configured" };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { ok: false, retried: 0, sent: 0, failed: 0, message: "Supabase is not configured" };
  }

  const { data, error } = await supabase
    .from("email_deliveries")
    .select("id,payload,attempts")
    .in("status", ["pending", "failed"])
    .lte("next_attempt_at", new Date().toISOString())
    .lt("attempts", MAX_ATTEMPTS)
    .order("next_attempt_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Unable to load retryable email deliveries", error.message);
    return { ok: false, retried: 0, sent: 0, failed: 0, message: error.message };
  }

  let sent = 0;
  let failed = 0;

  for (const row of (data ?? []) as DeliveryRow[]) {
    const attempts = row.attempts + 1;

    try {
      const { data: sentData, error: sendError } = await sendPayload(row.payload);
      if (sendError) {
        throw new Error(sendError.message);
      }

      sent += 1;
      await recordStatus(supabase, row.id, {
        status: "sent",
        attempts,
        last_error: null,
        resend_email_id: sentData?.id ?? null,
        sent_at: new Date().toISOString(),
        next_attempt_at: null
      });
    } catch (error) {
      failed += 1;
      await recordStatus(supabase, row.id, {
        status: attempts >= MAX_ATTEMPTS ? "abandoned" : "failed",
        attempts,
        last_error: errorMessage(error),
        next_attempt_at: attempts >= MAX_ATTEMPTS ? null : nextAttemptAt(attempts)
      });
    }
  }

  return { ok: true, retried: data?.length ?? 0, sent, failed };
}
