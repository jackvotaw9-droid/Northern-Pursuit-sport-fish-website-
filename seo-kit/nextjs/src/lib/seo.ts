import type { Metadata } from "next";
import type { SeoLanding } from "./landing-data";

// Verify the production domain before publishing this to a real site.
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://northernpursuitsportfish.com").replace(/\/$/, "");

export function pageUrl(path: string): string {
  return SITE_ORIGIN + path;
}

export function landingMetadata(page: SeoLanding): Metadata {
  const url = pageUrl(page.path);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      siteName: "Northern Pursuit Sportfishing",
      url,
      locale: "en_US"
    },
    twitter: { card: "summary", title: page.title, description: page.description }
  };
}

export function serviceStructuredData(page: SeoLanding) {
  if (page.schemaKind !== "service") return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.heading,
    description: page.description,
    url: pageUrl(page.path),
    serviceType: "Private guided fishing trip",
    areaServed: { "@type": "Place", name: page.location },
    provider: {
      "@type": "Organization",
      name: "Northern Pursuit Sportfishing",
      url: SITE_ORIGIN
    },
    ...(typeof page.schemaPrice === "number" ? {
      offers: {
        "@type": "Offer",
        price: page.schemaPrice.toFixed(2),
        priceCurrency: "USD",
        description: "Private boat trip; not a per-person rate"
      }
    } : {})
  };
}
