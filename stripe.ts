import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Fail loudly in dev rather than silently no-op'ing payment code.
  console.warn(
    "[stripe] STRIPE_SECRET_KEY is not set — payment routes will fail until it's configured in .env"
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-06-20",
});

/**
 * Creates a Stripe PaymentIntent for a booking deposit.
 * Amounts are always in cents. Card, Apple Pay, and Google Pay are all
 * supported automatically via `automatic_payment_methods`.
 */
export async function createDepositIntent(params: {
  amountCents: number;
  bookingId: string;
  customerEmail: string;
  description: string;
  giftCardCode?: string;
  giftCardAppliedCents?: number;
}) {
  return stripe.paymentIntents.create({
    amount: params.amountCents,
    currency: "usd",
    description: params.description,
    receipt_email: params.customerEmail,
    automatic_payment_methods: { enabled: true },
    metadata: {
      bookingId: params.bookingId,
      type: "deposit",
      ...(params.giftCardCode ? { giftCardCode: params.giftCardCode, giftCardAppliedCents: String(params.giftCardAppliedCents || 0) } : {}),
    },
  });
}

/** Verifies the raw webhook signature — never trust an unverified event. */
export function verifyWebhookSignature(rawBody: string | Buffer, signature: string) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}

/**
 * Creates a Stripe Checkout Session for a gift-card purchase. Checkout (rather
 * than a raw PaymentIntent) is the right tool here because the amount is
 * customer-chosen and we want Stripe's hosted page to handle the full payment
 * UI, receipts, and redirect flow without us building custom card entry for it.
 */
export async function createGiftCardCheckoutSession(params: {
  amountCents: number;
  buyerName: string;
  buyerEmail: string;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  deliverAt?: string; // ISO date, optional
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: params.buyerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: params.amountCents,
          product_data: {
            name: "Northern Pursuit Sport Fishing Gift Card",
            description: `Gift card for ${params.recipientName}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "gift_card",
      buyerName: params.buyerName,
      buyerEmail: params.buyerEmail,
      recipientName: params.recipientName,
      recipientEmail: params.recipientEmail,
      message: params.message || "",
      deliverAt: params.deliverAt || "",
    },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });
}
