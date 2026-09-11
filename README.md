# Northern Pursuit Sport Fishing — Website & Booking Platform

Full-stack Next.js 14 (App Router) + TypeScript + Tailwind + Prisma/PostgreSQL site for
Northern Pursuit Sport Fishing (Captain Jack Votaw), with a Stripe-backed booking and
deposit system, an admin dashboard, fishing reports, gallery, gift cards, and
email/SMS notification scaffolding.

## ⚠️ Build status — read this first

This codebase was generated in a sandboxed environment with **no internet access**, so
it has not been run through `npm install`, a live database, or a real Stripe account.
Everything is written to the real target architecture (Next.js App Router, Prisma,
Stripe, Resend, Twilio) and should run correctly once you:

1. Install dependencies
2. Point it at a real Postgres database
3. Add your own API keys

Treat this as a **complete, ready-to-run scaffold**, not yet a tested production build.
Run `npm run build` and `npm run typecheck` yourself after install and fix anything
your specific dependency versions surface — this is normal for any freshly generated
codebase and shouldn't take long.

## What's fully built

- All public pages: Home, Charters (list + detail), Book, About, Fishing Reports,
  Gallery, Reviews, Gift Cards, FAQ, Contact
- 5-step booking wizard UI (trip → date/party → guest info → payment → confirmation),
  now backed by a **live availability calendar** and **real Stripe PaymentElement**
- Prisma schema covering bookings, availability, boats, packages, payments, gift
  cards, reviews, fishing reports, gallery, admin users, and webhook idempotency
- API routes: booking creation (with transactional double-booking prevention and
  captain-opened-dates-only enforcement), Stripe deposit PaymentIntent creation,
  Stripe webhook handler (signature-verified, idempotent), `/api/availability`
  (returns booked/blocked/unopened dates per month), contact form
- **Admin authentication**: `/admin/login` page, `/api/admin/login` (bcrypt password
  check, signed httpOnly JWT session cookie, basic per-IP rate limiting) and
  `/api/admin/logout`. The `/admin` layout now genuinely redirects unauthenticated
  visitors to `/admin/login` rather than only hiding a nav link.
- **Gift cards, end to end**: `/gift-cards` now calls a real `/api/gift-cards` route
  that creates a Stripe Checkout Session for the chosen amount; the webhook handler
  creates the `GiftCard` record on `checkout.session.completed`, generates a unique
  redemption code, and emails it to the recipient. `/admin/gift-cards` lists every
  card purchased with its remaining balance and delivery/redemption status.
- **Admin calendar management, fully working**: `/admin/calendar` lets Captain Jack
  pick a package and month, see each date's status (not opened / open / booked /
  blocked), and open, close, block, or unblock dates — backed by an authenticated
  `/api/admin/availability` route with its own admin-action audit log entry per
  change. This is what makes the public booking calendar's "only pre-opened dates
  are bookable" rule actually usable day to day.
- **Fishing reports, fully manageable**: `/admin/reports` lists every report with
  create/edit/delete at `/admin/reports/new` and `/admin/reports/[id]`, backed by
  authenticated `/api/admin/reports` routes. Publishing sets `publishedAt`
  automatically the first time a report goes live.
- **Gift card redemption toward a booking balance**: the admin bookings table has a
  "Mark Balance Paid" action supporting cash, in-person card, a Stripe payment
  link, or a gift card code — gift card redemption deducts from
  `GiftCard.remainingCents` in the same transaction that records the payment.
- **Abandoned-checkout cleanup**: `/api/cron/release-abandoned-slots` cancels
  `PENDING_PAYMENT` bookings older than 30 minutes and re-opens their calendar
  slot, wired up to run every 10 minutes via `vercel.json` once deployed (set
  `CRON_SECRET` in your environment to keep the endpoint from being called by
  anyone who finds the URL).
- **Gallery management, real Cloudinary upload**: `/admin/gallery` uploads
  directly to Cloudinary via a signed-request flow (`/api/admin/cloudinary-signature`
  proves the request came from an authenticated admin without ever exposing the
  API secret to the browser), saves the resulting URL as a `GalleryImage`, and the
  public `/gallery` page now renders real uploaded photos with category filters
  and a keyboard-accessible lightbox.
- **Scheduled reminders**: `/api/cron/send-reminders` (daily via `vercel.json`)
  sends the 7-day and 1-day reminder emails automatically, and sends the 3-day
  launch-location email + text — but only once Captain Jack has entered the
  location and clicked "Approve to Send" on a booking's admin detail page
  (`/admin/bookings/[id]`), matching the spec's requirement that this message is
  never sent without his review.
- **Gift card redemption at checkout**: the public booking wizard now has a gift
  card code field. If the card covers the full deposit, the booking confirms
  immediately with no Stripe charge at all; if it covers part of it, Stripe only
  charges the remainder, and the card is only actually debited once that reduced
  charge succeeds (never before, so a failed payment can't burn a gift card).
- **Site settings, fully editable**: `/admin/settings` (owner-only — see below)
  edits homepage intro copy, an optional announcement banner, the cancellation
  policy, license note, gratuity note, and the still-placeholder alcohol/child-age
  answers, all backed by the `SiteSetting` model with sensible fallbacks from
  `constants.ts` when nothing's been set yet. The FAQ, charter detail pages, the
  booking wizard, and the homepage now all read from these settings instead of
  hardcoded text. The four legal/policy pages the footer already linked to
  (`/policies/cancellation`, `/privacy`, `/terms`, `/accessibility`) exist now too
  — they were 404s before this stage.
- **Owner-only permission check**: `requireOwner()` in `src/lib/auth.ts` gates the
  settings API specifically, so if you add a staff login later, staff can manage
  bookings/reports/gallery but can't rewrite the cancellation policy or waiver
  language. Every other admin route still just checks "is there a valid session."
- **Post-trip thank-you / review request**: the same daily reminders cron now
  emails a thank-you once a trip's date has passed, and moves the booking to
  `COMPLETED` if it wasn't already (e.g. because the balance was settled in
  person after the trip).
- **Automated tests for the money-handling logic**: `npm test` runs Vitest
  against `src/lib/pricing.ts` (the deposit/gift-card/balance math, extracted
  into pure functions specifically so it's cheap to test in isolation — both
  `/api/checkout` and the admin balance-payment route now call these same
  functions instead of duplicating the math inline) and against
  `POST /api/bookings` itself, using an in-memory fake database to prove the
  double-booking prevention, the "date must be captain-opened first" rule, and
  the party-size limit actually hold up under a simulated race.
- Admin dashboard shell: overview stats, bookings table + detail view, sign-out
- Email/SMS helper libraries (Resend, Twilio) with dev-mode no-op fallback when keys
  aren't set, so the app doesn't crash in local dev without credentials
- Brand system (colors, type, components) matching the cool-blue/silver/charcoal
  direction, mobile-first with a sticky mobile book/call/text bar

## What's stubbed and needs finishing before launch

- **Staff invite flow** — `AdminUser.role` supports `OWNER`/`STAFF` and
  `requireOwner()` already gates the settings API, but there's no UI yet for the
  owner to create a staff login (currently only the seed script creates admins).

## Local setup

```bash
npm install
cp .env.example .env       # then fill in real values — see below
npm run db:migrate         # creates tables from prisma/schema.prisma
npm run db:seed            # creates boats, packages, and your admin user
npm run dev                # http://localhost:3000
```

### Running tests

```bash
npm test          # runs the Vitest suite in tests/ — no database needed
```

### Required accounts before things work end-to-end

| Service | Used for | Get keys at |
|---|---|---|
| PostgreSQL | All data storage | Supabase, Neon, Railway, or local Postgres |
| Stripe | Deposits, gift cards, refunds | dashboard.stripe.com (use **test mode** keys first) |
| Resend | Transactional email | resend.com |
| Twilio | SMS notifications | console.twilio.com |
| Cloudinary | Photo/gallery storage | cloudinary.com |

### Stripe webhook (local dev)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Copy the `whsec_...` it prints into `STRIPE_WEBHOOK_SECRET` in `.env`.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add all `.env` variables in Vercel's Environment Variables settings.
4. Point `DATABASE_URL` at your production Postgres instance.
5. Add the production webhook endpoint (`https://yourdomain.com/api/webhooks/stripe`)
   in the Stripe Dashboard and copy its signing secret into `STRIPE_WEBHOOK_SECRET`.
6. Switch Stripe keys from test to live once you're ready to accept real payments.

## Database models

See `prisma/schema.prisma` for the full schema. Key models: `AdminUser`,
`CharterPackage`, `Boat`, `AvailabilitySlot`, `Booking`, `Payment`,
`ProcessedWebhookEvent`, `NotificationLog`, `FishingReport`, `GalleryImage`,
`Review`, `GiftCard`, `ContactInquiry`, `SiteSetting`.

## Things Captain Jack still needs to provide or approve

- Logo files and real fishing/boat photographs (placeholders are marked
  `// TODO(admin)` throughout the codebase and in the UI itself)
- Exact Lund model name (currently "Lund HG" per your prompt — confirm this is complete)
- Morning jigging charter hours (currently marked TBD)
- Evening trolling charter end time (currently marked TBD)
- Seasonal opening/closing dates
- Final Michigan fishing-license wording (`LICENSE_NOTE` in `src/lib/constants.ts`)
- Alcohol policy and minimum child age / life-jacket policy (flagged in the FAQ)
- Final waiver language, reviewed for your business by someone qualified to do so
- Privacy policy and terms and conditions text (placeholder footer links exist —
  content still needs to be written and reviewed)
- Real customer reviews (never fabricate placeholders — the Reviews page and
  homepage both show an honest empty state until you add real, approved reviews)
- Stripe, Resend, Twilio, and Cloudinary account credentials
- A domain name

## Pre-launch checklist

- [ ] `npm run build` and `npm run typecheck` pass cleanly
- [ ] Real database connected, migrated, and seeded
- [ ] Admin login built and tested
- [ ] Stripe test-mode booking completed end-to-end, including webhook confirmation email
- [ ] Switch Stripe to live keys
- [ ] Real photos uploaded (hero, boats, captain, gallery)
- [ ] All `TODO(admin)` items above resolved
- [ ] Mobile pass on a real phone: booking flow, tap targets, sticky action bar
- [ ] Accessibility pass: keyboard nav, focus states, alt text, contrast
- [ ] robots.txt / sitemap.xml verified in production
