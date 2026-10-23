import { NextResponse } from "next/server";

import { getServices } from "@/lib/data/queries";
import { getPaymentProvider, isSandboxPaymentsEnabled } from "@/lib/payments/provider";
import { createSandboxOrder } from "@/lib/payments/sandbox-store";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/utils";
import { checkoutSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const parsed = checkoutSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    // The amount is always resolved on the server from the database catalog.
    // When Supabase is configured we read the service directly (never from the
    // demo fallback used by public pages) and fail closed if the key is missing.
    const configured = isSupabaseConfigured();
    const admin = getSupabaseAdminClient();

    if (configured && !admin) {
      return NextResponse.json({ error: "payments_not_configured" }, { status: 503 });
    }

    let service: { id: string; titleAr: string; price: number };

    if (admin) {
      const { data, error } = await admin
        .from("services")
        .select("id, title_ar, price")
        .eq("slug", parsed.data.serviceSlug)
        .eq("active", true)
        .maybeSingle();

      if (error) {
        console.error("service lookup error:", error.message);
        return NextResponse.json({ error: "catalog_unavailable" }, { status: 500 });
      }
      if (!data) {
        return NextResponse.json({ error: "unknown_service" }, { status: 400 });
      }

      service = {
        id: data.id as string,
        titleAr: data.title_ar as string,
        price: Number(data.price),
      };
    } else {
      const services = await getServices();
      const demoService = services.find(
        (item) => item.slug === parsed.data.serviceSlug && item.active,
      );
      if (!demoService) {
        return NextResponse.json({ error: "unknown_service" }, { status: 400 });
      }
      service = {
        id: demoService.id,
        titleAr: demoService.titleAr,
        price: Number(demoService.price),
      };
    }

    const amount = service.price;
    if (!Number.isFinite(amount) || amount < 0) {
      return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
    }

    const provider = getPaymentProvider();
    if (!provider.isConfigured) {
      return NextResponse.json({ error: "payments_not_configured" }, { status: 503 });
    }
    if (provider.id === "sandbox" && !isSandboxPaymentsEnabled()) {
      return NextResponse.json({ error: "payments_not_configured" }, { status: 503 });
    }

    if (admin) {
      const { data: order, error: orderError } = await admin
        .from("orders")
        .insert({
          service_id: service.id,
          service_title: service.titleAr,
          customer_name: parsed.data.name,
          customer_email: parsed.data.email,
          notes: parsed.data.notes || null,
          amount,
          currency: "USD",
          status: "pending",
        })
        .select("id")
        .single();

      if (orderError || !order) {
        console.error("order insert error:", orderError?.message);
        return NextResponse.json({ error: "order_failed" }, { status: 500 });
      }

      let session: Awaited<ReturnType<typeof provider.createCheckout>>;
      try {
        session = await provider.createCheckout({
          orderId: order.id,
          amount,
          currency: "USD",
          customerEmail: parsed.data.email,
          serviceTitle: service.titleAr,
          successUrl: `${new URL(request.url).origin}/checkout/success?order=${order.id}`,
          cancelUrl: `${new URL(request.url).origin}/checkout`,
        });
      } catch (error) {
        console.error("payment provider error:", error);
        return NextResponse.json({ error: "provider_failed" }, { status: 502 });
      }

      const { error: paymentError } = await admin.from("payments").insert({
        order_id: order.id,
        provider: provider.id,
        provider_payment_id: session.providerReference,
        amount,
        currency: "USD",
        status: "pending",
      });

      if (paymentError) {
        console.error("payment insert error:", paymentError.message);
        return NextResponse.json({ error: "payment_failed" }, { status: 500 });
      }

      return NextResponse.json({
        orderId: order.id,
        sandbox: session.mode === "sandbox",
        redirectUrl: session.url,
      });
    }

    // No database: clearly-labelled, non-persistent sandbox order.
    if (!isSandboxPaymentsEnabled()) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }

    const sandboxOrder = createSandboxOrder({
      serviceId: service.id,
      serviceTitle: service.titleAr,
      customerName: parsed.data.name,
      customerEmail: parsed.data.email,
      notes: parsed.data.notes || null,
      amount,
    });

    return NextResponse.json({
      orderId: sandboxOrder.id,
      sandbox: true,
      redirectUrl: null,
    });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
