import type { Metadata } from "next";

/**
 * SEO helpers — central place for metadata + structured data.
 *
 * Per-page metadata composes on top of these primitives. Schema-org
 * generators return plain objects you wrap in
 * `<script type="application/ld+json">` server-side.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portrai-web.vercel.app";

export function localizedSitePath(
  locale: "et" | "en",
  pathname: string,
): string {
  const normalizedPath =
    pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (locale === "et") {
    return normalizedPath;
  }

  return normalizedPath === "/" ? "/en" : `/en${normalizedPath}`;
}

/* -------------------------------------------------------------------------- */
/* Metadata builders                                                            */
/* -------------------------------------------------------------------------- */

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  locale: "et" | "en";
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const {
    title,
    description,
    path,
    locale,
    ogImage,
    type = "website",
    publishedTime,
  } = input;
  const normalizedPath = path === "" ? "/" : path;
  const url = `${SITE_URL}${normalizedPath}`;
  const enPath = path.startsWith("/en") ? path : `/en${path}`;
  const etPath = path.replace(/^\/en/, "") || "/";
  const resolvedOgImage = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : undefined;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url,
      type,
      locale: locale === "et" ? "et_EE" : "en_US",
      siteName: "PortrAI",
      publishedTime,
      images: resolvedOgImage ? [resolvedOgImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedOgImage ? [resolvedOgImage] : undefined,
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

/**
 * Organization schema — strong brand entity signals.
 *
 * Important context: Google currently autocorrects "portrai" → "portrait"
 * because the brand has insufficient web entity signals. This schema is
 * the on-site lever for fixing it. The off-site work (Google Business
 * Profile, LinkedIn page, press, directory listings, branded backlinks)
 * is what actually moves the needle long-term.
 *
 * `alternateName` covers spelling/casing variants we want associated with
 * the brand. `sameAs` links cement the entity to known social profiles
 * — Google's Knowledge Graph weighs this heavily.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PortrAI",
  alternateName: ["PortrAI OÜ", "Portrai", "PortrAI Estonia", "Portrai Eesti"],
  description:
    "AI photobooth and fotopeegel rental in Estonia. Award-winning at Booth Mastermind Awards Las Vegas 2025.",
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
    // TODO: add LinkedIn company page URL once Reijo creates it
    // TODO: add Google Business Profile URL once set up
  ],
  award: [
    "Booth Mastermind Awards 2025 — Best AI Photo Solution",
    "Booth Mastermind Awards 2025 — Best Newcomer in Photo Booth World",
  ],
  knowsAbout: [
    "AI photobooth",
    "AI fotoboks",
    "fotopeegel",
    "photobooth rental",
    "fotoboksi rent",
    "brand activation",
    "messilahendused",
    "event marketing",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#business`,
  name: "PortrAI",
  alternateName: ["PortrAI OÜ", "Portrai"],
  description:
    "AI photobooth, classic photobooth and fotopeegel (mirror booth) rental for events in Estonia and across Europe. Award-winning at Booth Mastermind Awards Las Vegas.",
  url: SITE_URL,
  image: `${SITE_URL}/images/awards/booth-mastermind-las-vegas.jpg`,
  email: "info@portrai.ee",
  telephone: "+372 5663 9304",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
  areaServed: ["EE", "FI", "DE", "LV", "PL", "BE", "US"],
  priceRange: "€€€",
  serviceType: [
    "AI photobooth rental",
    "Photobooth rental",
    "Fotopeegel (mirror booth) rental",
    "Brand activation",
    "Trade show solutions",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
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
