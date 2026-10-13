# Northern Pursuit Sportfishing — SEO Page Kit

Prepared October 13, 2026. These files are **staged SEO additions**, not a live deployment.

## Important: preserve the existing site
This repository currently has a collection of Next.js files at its root and an unfinished scaffold described in its README. The live ChatGPT site is **not verified to use this repository**, and this GitHub repo does **not** appear to contain an assembled `src/app` tree. Accordingly, the SEO files are intentionally isolated in `seo-kit/nextjs/`. They do not replace the current homepage, booking form, availability calendar, pricing, visual style, or deployment. **Do not point Vercel at this subdirectory as though it were a complete site.**

## What is included
- Six uniquely written, ready-to-integrate App Router SEO landing pages (lake trout, salmon, cisco, coho, Betsie River, Captain Jack).
- Reusable branded page component, page content, title and description metadata, canonical URLs, and lightweight Service structured data where appropriate.
- Next.js App Router sitemap and robots metadata routes.
- Keyword / URL map and homepage SEO text.
- All existing repo files and main branch code remain unchanged by this kit.

## How to integrate when the correct production source is available
1. Confirm the actual live website's source, hosting, booking implementation, and domain before editing it.
2. On a copy of the **correct** Next.js App Router source, merge folders from `seo-kit/nextjs/src/` into its existing `src/`, adapting aliases as needed. Do not replace any files at identical paths until reviewed.
3. Link these pages from relevant homepage trip cards, `/charters`, and the footer; keep existing booking handlers intact. Each page links to `/book`; change that if the real site's booking route differs.
4. Merge `sitemap.ts` and `robots.ts` with existing indexing rules if the production site already defines them.
5. Set `NEXT_PUBLIC_SITE_URL` to the **verified** preferred production https URL. The default in this kit is the intended `https://northernpursuitsportfish.com`, which must be checked before publishing.
6. Keep these pages public, indexable, navigable, and server-rendered. Test URLs, metadata, mobile presentation, redirects, canonicalization, booking CTAs, and structured data.
7. Connect the verified domain to Google Search Console, verify ownership, and submit the actual published `/sitemap.xml`. Indexing and search rankings are not guaranteed.
8. Update trip facts when confirmed. Do not claim reviews, guaranteed catches, a physical office, or vessel certifications without evidence.

## Facts used for content (from the latest charter plan)
- Lake trout, Grand Traverse Bay: April–September; morning 6–11 AM (5 hours) $700; PM 3–9 PM (6 hours) $700.
- Salmon, Frankfort: July–September; morning depart 5:30 AM $900; evening power hour 5–9 PM $700.
- Cisco, Grand Traverse Bay: late October–mid November, $600, morning trip. Exact hours not asserted due to conflicting prior drafts.
- Platte Bay coho: early September, price not published.
- Betsie River drift boat: fall, $600, 1–2 guests.
- Lake boat up to 4 guests; private-boat prices, $150 deposit after captain confirms.
- Launch details to be coordinated with Captain Jack; no invented street addresses or claims of permanent storefront.
- Captain Jack's MMC application was submitted in September 2026; this copy does **not** independently claim a finalized license status.

## Launch caution
Current repository README labels the wider booking site scaffold as untested and requiring database/payment credentials. SEO changes should **never** trigger publication of that unfinished booking platform in place of the existing working site.
