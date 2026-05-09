import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { projects } from "@/lib/site-content";

/**
 * Auto-generated sitemap covering ET + EN versions of every static route
 * plus dynamic blog and case-study slugs.
 *
 * Submitted to Google Search Console + Bing Webmaster on launch day.
 */

// Top-level static pages (relative paths, locale prefix added below).
const STATIC_PATHS = [
  "",
  "/turundus",
  "/peod",
  "/fotopeegel",
  "/photobooth-tallinn",
  "/messilahendused",
  "/tood",
  "/blog",
  "/kontakt",
];

const CASE_STUDY_PATHS = projects.map((project) => `/tood/${project.slug}`);

function localizedHref(locale: string, path: string) {
  if (locale === routing.defaultLocale) return `${SITE_URL}${path || "/"}`;
  return `${SITE_URL}/${locale}${path || ""}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getAllBlogSlugs();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: localizedHref(locale, path),
        lastModified: now,
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, localizedHref(l, path)]),
          ),
        },
      });
    }

    for (const path of CASE_STUDY_PATHS) {
      entries.push({
        url: localizedHref(locale, path),
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, localizedHref(l, path)]),
          ),
        },
      });
    }

    for (const slug of blogSlugs) {
      const path = `/blog/${slug}`;
      entries.push({
        url: localizedHref(locale, path),
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, localizedHref(l, path)]),
          ),
        },
      });
    }
  }

  return entries;
}
