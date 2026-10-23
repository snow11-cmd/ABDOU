import crypto from "node:crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const webhookSchema = z.object({
  orderId: z.string().min(1).max(120),
  providerPaymentId: z.string().min(1).max(200).optional(),
  status: z.enum(["paid", "failed", "refunded"]),
  amount: z.number().nonnegative().optional(),
});

/**
 * Generic provider webhook.
 *
 * Security:
 * - Requires PAYMENT_WEBHOOK_SECRET; refuses to process events otherwise.
 * - Verifies an HMAC-SHA256 signature over the RAW body.
 * - Updates orders only through the service-role client (never the browser).
 *
 * When integrating a real provider, adapt the signature check to that
 * provider's documented scheme (e.g. Stripe's `Stripe-Signature`).
 */
export async function POST(request: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "webhook_not_configured" }, { status: 503 });
  }

  const signature = request.headers.get("x-payment-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 401 });
  }

  const rawBody = await request.text();
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const signatureBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = webhookSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { orderId, providerPaymentId, status, amount } = parsed.data;

  const { data: order, error: orderError } = await admin
    .from("orders")
    .select("id, amount, currency, status")
    .eq("id", orderId)
    .maybeSingle();

  if (orderError || !order) {
    return NextResponse.json({ error: "order_not_found" }, { status: 404 });
  }

  // Defense in depth: never mark an order paid for an amount that does not match.
  if (status === "paid" && amount !== undefined && Math.abs(Number(order.amount) - amount) > 0.01) {
    return NextResponse.json({ error: "amount_mismatch" }, { status: 400 });
  }

  const paymentUpdate = admin
    .from("payments")
    .update({ status: status === "paid" ? "paid" : status === "refunded" ? "refunded" : "failed" })
    .eq("order_id", orderId);

  if (providerPaymentId) {
    paymentUpdate.eq("provider_payment_id", providerPaymentId);
  }

  const { error: paymentError } = await paymentUpdate;
  if (paymentError) {
    console.error("webhook payment update error:", paymentError.message);
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  const orderStatus = status === "paid" ? "paid" : status === "refunded" ? "cancelled" : "failed";
  const { error: statusError } = await admin
    .from("orders")
    .update({ status: orderStatus })
    .eq("id", orderId);

  if (statusError) {
    console.error("webhook order update error:", statusError.message);
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
