import type { Metadata } from "next";

import { CheckoutForm } from "@/components/checkout/checkout-form";
import { PageHeader } from "@/components/ui/page-header";
import { getServices } from "@/lib/data/queries";
import { getPaymentProvider, isSandboxPaymentsEnabled } from "@/lib/payments/provider";
import { isSupabaseConfigured } from "@/lib/utils";

export const metadata: Metadata = {
  title: "إتمام الطلب",
  description: "اختر الخدمة وأدخل بياناتك لبدء مشروعك.",
  robots: { index: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const [services, params] = await Promise.all([getServices(), searchParams]);

  const provider = getPaymentProvider();
  const paymentsEnabled =
    provider.isConfigured &&
    (provider.id !== "sandbox" || isSandboxPaymentsEnabled()) &&
    (!isSupabaseConfigured() || Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY));

  return (
    <div className="pt-32 pb-20 sm:pt-36">
      <div className="container-x">
        <PageHeader
          titleKey="checkout.title"
          subtitleKey="checkout.subtitle"
          eyebrowKey="services.label"
        />
        <div className="mt-10">
          <CheckoutForm
            services={services}
            initialService={params.service}
            paymentsEnabled={paymentsEnabled}
          />
        </div>
      </div>
    </div>
  );
}
