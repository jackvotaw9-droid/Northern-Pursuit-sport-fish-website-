/**
 * Pure functions for the money math that matters most to get right. Kept
 * dependency-free (no Prisma, no Stripe) specifically so they're cheap and
 * fast to unit test — see tests/pricing.test.ts.
 */

export type GiftCardApplication = {
  amountToChargeCents: number;
  giftCardAppliedCents: number;
  fullyCovered: boolean;
};

/**
 * Applies a gift card's remaining balance toward a deposit, never applying
 * more than either the card holds or the deposit actually costs.
 */
export function applyGiftCardToDeposit(depositCents: number, giftCardRemainingCents: number): GiftCardApplication {
  if (depositCents < 0) throw new Error("depositCents cannot be negative.");
  if (giftCardRemainingCents < 0) throw new Error("giftCardRemainingCents cannot be negative.");

  const giftCardAppliedCents = Math.min(depositCents, giftCardRemainingCents);
  const amountToChargeCents = depositCents - giftCardAppliedCents;

  return {
    amountToChargeCents,
    giftCardAppliedCents,
    fullyCovered: amountToChargeCents === 0 && giftCardAppliedCents > 0,
  };
}

/** A package's balance is always whatever the deposit doesn't cover — never negative, never more than the price. */
export function computeBalanceCents(priceCents: number, depositCents: number): number {
  if (depositCents > priceCents) throw new Error("depositCents cannot exceed priceCents.");
  return priceCents - depositCents;
}

/**
 * How much of a booking's balance a given payment (cash, in-person card, or a
 * gift card) actually covers — never more than what's still owed.
 */
export function computeBalanceCoverage(balanceCents: number, paymentCents: number) {
  const amountCoveredCents = Math.min(balanceCents, paymentCents);
  return { amountCoveredCents, fullyCovered: amountCoveredCents >= balanceCents };
}
