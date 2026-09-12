"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PACKAGES, CANCELLATION_POLICY as CANCELLATION_POLICY_FALLBACK, LICENSE_NOTE as LICENSE_NOTE_FALLBACK } from "@/lib/constants";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import StripePaymentForm from "@/components/StripePaymentForm";

type Step = 1 | 2 | 3 | 4 | 5;

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("package");

  const [step, setStep] = useState<Step>(1);
  const [slug, setSlug] = useState<string | null>(preselected);
  const [date, setDate] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", experience: "", accessibility: "", allergies: "", emergencyContact: "", notes: "",
  });
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [giftCardAppliedCents, setGiftCardAppliedCents] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ code: string } | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [cancellationPolicy, setCancellationPolicy] = useState(CANCELLATION_POLICY_FALLBACK);
  const [licenseNote, setLicenseNote] = useState(LICENSE_NOTE_FALLBACK);

  useEffect(() => {
    fetch("/api/settings/public")
      .then((r) => r.json())
      .then((d) => {
        if (d.cancellationPolicy) setCancellationPolicy(d.cancellationPolicy);
        if (d.licenseNote) setLicenseNote(d.licenseNote);
      })
      .catch(() => {
        // Falls back to the constants.ts copy above if settings can't be reached.
      });
  }, []);

  const pkg = useMemo(() => PACKAGES.find((p) => p.slug === slug) || null, [slug]);

  // Creates the booking (reserving the slot server-side) and the Stripe deposit
  // PaymentIntent as soon as the customer reaches the payment step — not before,
  // so we never reserve a slot for someone who abandons the form earlier.
  async function startCheckout() {
    if (!pkg) return;
    setSubmitting(true);
    setError(null);
    try {
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageSlug: pkg.slug, date, guestCount, ...form }),
      });
      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) throw new Error(bookingData.error || "Could not create booking.");
      setConfirmation({ code: bookingData.confirmationCode });

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: bookingData.id, giftCardCode: giftCardCode || undefined }),
      });
      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok) throw new Error(checkoutData.error || "Could not start payment.");

      if (checkoutData.noPaymentNeeded) {
        // Gift card covered the entire deposit — nothing left to charge.
        setStep(5);
        return;
      }

      setGiftCardAppliedCents(checkoutData.giftCardAppliedCents || 0);
      setClientSecret(checkoutData.clientSecret);
      setStep(4);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const steps = ["Trip", "Date & Party", "Your Info", "Payment", "Confirm"];

  return (
    <div className="card overflow-hidden max-w-3xl mx-auto">
      <div className="flex bg-brand-900">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`flex-1 text-center py-3 text-xs uppercase tracking-wide border-b-2 ${
              step === i + 1 ? "text-white border-brand-300" : step > i + 1 ? "text-brand-300 border-transparent" : "text-white/40 border-transparent"
            }`}
          >
            {i + 1}. {s}
          </div>
        ))}
      </div>

      <div className="p-8">
        {error && <div className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">{error}</div>}

        {step === 1 && (
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              {PACKAGES.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setSlug(p.slug)}
                  className={`text-left border rounded p-4 transition-colors ${
                    slug === p.slug ? "border-brand-500 bg-ice" : "border-silver-light hover:border-silver-dark"
                  }`}
                >
                  <div className="font-display uppercase text-brand-900">{p.name}</div>
                  <div className="text-brand-700 font-semibold mt-1">${(p.priceCents / 100).toFixed(0)}</div>
                  <div className="text-xs text-silver-dark mt-1">{p.durationLabel} · up to {p.maxGuests} guests</div>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <button disabled={!slug} onClick={() => setStep(2)} className="btn btn-primary disabled:opacity-40">Continue</button>
            </div>
          </div>
        )}

        {step === 2 && pkg && (
          <div>
            <label className="block text-xs uppercase text-silver-dark mb-2">Trip Date</label>
            <AvailabilityCalendar packageSlug={pkg.slug} selectedDate={date} onSelect={setDate} />

            <label className="block text-xs uppercase text-silver-dark mb-2 mt-6">Party Size (max {pkg.maxGuests})</label>
            <div className="flex items-center gap-4">
              <button onClick={() => setGuestCount((g) => Math.max(1, g - 1))} className="w-9 h-9 border rounded">−</button>
              <span className="font-display text-xl">{guestCount}</span>
              <button onClick={() => setGuestCount((g) => Math.min(pkg.maxGuests, g + 1))} className="w-9 h-9 border rounded">+</button>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="btn btn-outline">Back</button>
              <button disabled={!date} onClick={() => setStep(3)} className="btn btn-primary disabled:opacity-40">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <Field label="Fishing Experience Level" value={form.experience} onChange={(v) => setForm({ ...form, experience: v })} placeholder="Beginner, some experience, experienced" />
            <Field label="Accessibility / Mobility Notes (optional)" value={form.accessibility} onChange={(v) => setForm({ ...form, accessibility: v })} />
            <Field label="Food Allergies / Dietary Restrictions (optional)" value={form.allergies} onChange={(v) => setForm({ ...form, allergies: v })} />
            <Field label="Emergency Contact" value={form.emergencyContact} onChange={(v) => setForm({ ...form, emergencyContact: v })} />
            <Field label="Special Requests (optional)" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} />

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase text-silver-dark mb-2">Gift Card Code (optional)</label>
              <input
                value={giftCardCode}
                onChange={(e) => setGiftCardCode(e.target.value)}
                placeholder="NPGIFT-XXXXXX"
                className="w-full border border-silver rounded p-3"
              />
            </div>

            <div className="sm:col-span-2 border-t border-silver-light pt-4 mt-2 space-y-3">
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={policyAccepted} onChange={(e) => setPolicyAccepted(e.target.checked)} className="mt-1" />
                <span>
                  I have read and accept the{" "}
                  <details className="inline">
                    <summary className="inline text-brand-700 cursor-pointer">cancellation & weather policy</summary>
                    <pre className="whitespace-pre-wrap text-xs text-charcoal/70 mt-2">{cancellationPolicy}</pre>
                  </details>.
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={waiverAccepted} onChange={(e) => setWaiverAccepted(e.target.checked)} className="mt-1" />
                <span>I have read and digitally sign the liability waiver, and consent to receive booking-related email and text messages.</span>
              </label>
            </div>

            <div className="sm:col-span-2 flex justify-between mt-4">
              <button onClick={() => setStep(2)} className="btn btn-outline">Back</button>
              <button
                disabled={!form.name || !form.email || !form.phone || !policyAccepted || !waiverAccepted || submitting}
                onClick={startCheckout}
                className="btn btn-primary disabled:opacity-40"
              >
                {submitting ? "Preparing payment…" : "Continue to Payment"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && pkg && (
          <div>
            <div className="bg-ice rounded p-5 mb-6 text-sm space-y-2">
              <Row label="Trip" value={pkg.name} />
              <Row label="Date" value={date} />
              <Row label="Party" value={`${guestCount} angler(s)`} />
              <Row label="Deposit due today" value={`$${(pkg.depositCents / 100).toFixed(0)}`} bold />
              <Row label="Balance due after trip" value={`$${(pkg.balanceCents / 100).toFixed(0)}`} />
              {giftCardAppliedCents ? (
                <Row label="Gift card applied" value={`-$${(giftCardAppliedCents / 100).toFixed(2)}`} />
              ) : null}
            </div>
            <p className="text-xs text-silver-dark mb-6">{licenseNote}</p>

            {clientSecret ? (
              <StripePaymentForm
                clientSecret={clientSecret}
                amountLabel={`$${((pkg.depositCents - (giftCardAppliedCents || 0)) / 100).toFixed(2)}`}
                onSuccess={() => setStep(5)}
                onError={(msg) => setError(msg)}
              />
            ) : (
              <div className="text-sm text-silver-dark">Preparing secure payment…</div>
            )}

            <button onClick={() => setStep(3)} className="btn btn-outline mt-4">Back</button>
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-brand-900 text-brand-300 flex items-center justify-center mx-auto mb-6 text-2xl font-display">✓</div>
            <h3 className="text-2xl mb-2">You're booked</h3>
            <p className="text-charcoal/70 max-w-sm mx-auto mb-2">Confirmation #{confirmation?.code}. A confirmation email is on its way.</p>
            <p className="text-charcoal/70 max-w-sm mx-auto">Captain Jack will text and email your exact launch location three days before your trip.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase text-silver-dark mb-2">{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full border border-silver rounded p-3" />
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-silver-dark uppercase text-xs">{label}</span>
      <span className={bold ? "font-display text-lg text-brand-900" : ""}>{value}</span>
    </div>
  );
}
