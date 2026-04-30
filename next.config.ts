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
};

export default withNextIntl(nextConfig);
