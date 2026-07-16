import { NextResponse } from "next/server";

import { retryPendingEmailDeliveries } from "@/lib/email-deliveries";
import { getEmailRetrySecret } from "@/lib/env";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = getEmailRetrySecret();
  if (!secret) {
    return false;
  }

  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const result = await retryPendingEmailDeliveries();
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}
