import type { Metadata } from "next";

/**
 * SEO helpers — central place for metadata + structured data.
 *
 * Per-page metadata composes on top of these primitives. Schema-org
 * generators return plain objects you wrap in
 * `<script type="application/ld+json">` server-side.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portrai.cloud";

/* -------------------------------------------------------------------------- */
/* Metadata builders                                                            */
/* -------------------------------------------------------------------------- */

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  locale: "et" | "en";
  ogImage?: string;
}): Metadata {
  const { title, description, path, locale, ogImage } = input;
  const url = `${SITE_URL}${path}`;
  const enPath = path.startsWith("/en") ? path : `/en${path}`;
  const etPath = path.replace(/^\/en/, "") || "/";

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
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
        et: etPath,
        en: enPath,
      },
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data (schema.org)                                                  */
/* -------------------------------------------------------------------------- */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PortrAI",
  alternateName: "PortrAI OÜ",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  email: "info@portrai.ee",
  telephone: "+372 5663 9304",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
  sameAs: [
    "https://www.instagram.com/portrai.ee",
    "https://www.facebook.com/portrai.ee",
  ],
  award: [
    "Booth Mastermind Awards 2024 — Best AI Photo Solution",
    "Booth Mastermind Awards 2024 — Best Newcomer in Photo Booth World",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#business`,
  name: "PortrAI",
  url: SITE_URL,
  email: "info@portrai.ee",
  telephone: "+372 5663 9304",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
  areaServed: ["EE", "FI", "DE", "LV", "PL", "BE", "US"],
  priceRange: "€€€",
};

export function caseStudySchema(input: {
  title: string;
  description: string;
  client: string;
  year: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.description,
    creator: { "@type": "Organization", name: "PortrAI" },
    about: input.client,
    datePublished: input.year,
    url: input.url,
    image: input.image,
  };
}

export function blogPostSchema(input: {
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    image: input.image,
    author: { "@type": "Organization", name: input.author ?? "PortrAI" },
    publisher: { "@type": "Organization", name: "PortrAI" },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Serialize a schema.org object to a JSON string for inlining in
 * <script type="application/ld+json">. Use the JsonLd component in
 * `components/seo/JsonLd.tsx` to render it.
 */
export function jsonLdString(data: object): string {
  return JSON.stringify(data);
}
