"use client";

import { useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe-client";

export default function StripePaymentForm({
  clientSecret,
  amountLabel,
  onSuccess,
  onError,
}: {
  clientSecret: string;
  amountLabel: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  return (
    <Elements stripe={getStripe()} options={{ clientSecret, appearance: { theme: "stripe", variables: { colorPrimary: "#3B9BC2" } } }}>
      <InnerForm amountLabel={amountLabel} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}

function InnerForm({
  amountLabel,
  onSuccess,
  onError,
}: {
  amountLabel: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);

    // redirect: "if_required" keeps the customer on this page for cards that don't
    // need 3D Secure; Apple Pay / Google Pay /3DS flows are handled by Stripe.js
    // automatically and only redirect away when truly necessary.
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/book?step=confirm` },
      redirect: "if_required",
    });

    setSubmitting(false);

    if (error) {
      onError(error.message || "Payment failed. Please check your card details and try again.");
      return;
    }
    if (paymentIntent && (paymentIntent.status === "succeeded" || paymentIntent.status === "processing")) {
      onSuccess();
    } else {
      onError("Payment did not complete. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || submitting} className="btn btn-primary w-full mt-6 disabled:opacity-40">
        {submitting ? "Processing…" : `Pay ${amountLabel} Deposit`}
      </button>
    </form>
  );
}
