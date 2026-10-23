/**
 * Payment architecture (provider-agnostic).
 *
 * The public checkout flow NEVER trusts an amount sent by the browser. The
 * server reloads the service price from the database and computes the total.
 *
 * Only a clearly-labelled sandbox provider is implemented out of the box.
 * To go live, implement `PaymentProvider` for a provider supported in your
 * country (Stripe, Paddle, Paymob, Tap, Moyasar, etc.), set
 * PAYMENT_PROVIDER=<id> and PAYMENT_PROVIDER_SECRET, then verify webhooks.
 */

export type CheckoutSession = {
  mode: "sandbox" | "redirect";
  url: string | null;
  providerReference: string;
};

export type PaymentProvider = {
  id: string;
  displayName: string;
  isConfigured: boolean;
  createCheckout(params: {
    orderId: string;
    amount: number;
    currency: string;
    customerEmail: string;
    serviceTitle: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<CheckoutSession>;
};

export function isSandboxPaymentsEnabled() {
  return process.env.PAYMENTS_SANDBOX !== "false";
}

export function getPaymentProvider(): PaymentProvider {
  // Real providers intentionally are not faked. If one is requested but not
  // implemented, fail closed instead of silently falling back to sandbox.
  const requested = process.env.PAYMENT_PROVIDER?.trim();

  if (requested && requested !== "sandbox") {
    return {
      id: requested,
      displayName: requested,
      isConfigured: false,
      async createCheckout() {
        throw new Error(`Payment provider "${requested}" is not implemented.`);
      },
    };
  }

  return {
    id: "sandbox",
    displayName: "Sandbox (no real charge)",
    isConfigured: true,
    async createCheckout({ orderId }) {
      return {
        mode: "sandbox",
        url: null,
        providerReference: `sandbox_${orderId}_${Date.now()}`,
      };
    },
  };
}
