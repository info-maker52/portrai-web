import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Image optimisation defaults — overridden per <Image /> as needed.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Allow images from the live Wix site during migration.
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
  // Strict mode catches more bugs in dev.
  reactStrictMode: true,
  // Server actions are on by default in Next 16.

  /**
   * Sitemap surgery — permanent 308 redirects for routes that moved or merged
   * during the 2026 copy rebuild. Keeps inbound links + search-engine
   * authority pointed at the new canonical URLs.
   */
  async redirects() {
    return [
      // /turundus → /studio (Estonian)
      { source: "/turundus", destination: "/studio", permanent: true },
      { source: "/turundus/:path*", destination: "/studio/:path*", permanent: true },
      // /marketing → /studio (English)
      { source: "/en/marketing", destination: "/en/studio", permanent: true },
      {
        source: "/en/marketing/:path*",
        destination: "/en/studio/:path*",
        permanent: true,
      },
      // /firmapidu-fotoboks → /peod (merged into events page)
      {
        source: "/firmapidu-fotoboks",
        destination: "/peod#firmapidu",
        permanent: true,
      },
      {
        source: "/en/firmapidu-fotoboks",
        destination: "/en/events#firmapidu",
        permanent: true,
      },
      // /broneeri → /kontakt (booking wizard absorbed by contact page)
      { source: "/broneeri", destination: "/kontakt", permanent: true },
      { source: "/en/broneeri", destination: "/en/kontakt", permanent: true },
      // /teenused → /studio (deprecated services index)
      { source: "/teenused", destination: "/studio", permanent: true },
      { source: "/en/teenused", destination: "/en/studio", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
