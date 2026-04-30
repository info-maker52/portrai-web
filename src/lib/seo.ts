import type { Metadata } from "next";

/**
 * SEO helpers — central place for metadata + structured data.
 * Per-page metadata composes on top of this.
 *
 * Phase 6 will fill this out with full schema.org generators
 * (Organization, LocalBusiness, Service, Review, Event, FAQPage,
 * BreadcrumbList) and OG image generation.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portrai.cloud";

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  locale: "et" | "en";
  ogImage?: string;
}): Metadata {
  const { title, description, path, locale, ogImage } = input;
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: locale === "et" ? "et_EE" : "en_US",
      siteName: "PortrAI",
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: url,
      languages: {
        et: path.replace(/^\/en/, "") || "/",
        en: path.startsWith("/en") ? path : `/en${path}`,
      },
    },
  };
}

/**
 * Organization schema — used in root layout.
 * Phase 6 will expand this with logo, founder, social profiles, awards.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PortrAI",
  url: SITE_URL,
  email: "info@portrai.ee",
  // address, logo, sameAs (social), award — fill in Phase 6
};
