import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { contactSchema } from "@/lib/validations";

export const runtime = "nodejs";

// Best-effort in-memory rate limiting. For production, use a shared store
// (Upstash Redis, Supabase table, or your platform's rate limiter).
const buckets = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();

  // Keep the in-memory map bounded on long-running servers.
  if (buckets.size > 5000) {
    for (const [key, value] of buckets) {
      if (now > value.resetAt) buckets.delete(key);
    }
  }

  const bucket = buckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
    }

    const json: unknown = await request.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    // Honeypot: silently accept but do not store.
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Use the service role so inserts do not depend on a public insert policy
    // (which would let anyone bypass this route's rate limiting with the anon key).
    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      // No database configured: never pretend the message was stored.
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }

    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });

    if (error) {
      console.error("contact insert error:", error.message);
      return NextResponse.json({ error: "storage_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
