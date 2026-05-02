import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portrai-web.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/**
 * Root layout — minimal: <html> + fonts. Per-locale metadata,
 * NextIntlClientProvider, and motion providers all live in
 * `app/[locale]/layout.tsx`.
 *
 * `template` is intentionally NOT set here — that's the [locale] layout's
 * job, otherwise Next.js double-wraps the home title into "PortrAI - PortrAI".
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PortrAI",
  description:
    "AI photo booth for events in Estonia. Weddings, corporate events, and trade shows with award-winning guest portraits.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dynamic per-locale lang attribute — fixes WCAG language identification.
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
