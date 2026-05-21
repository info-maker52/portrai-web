import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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

// Display face — distinctive editorial serif. Pairs with Geist body for
// the 2+1 typography discipline (display + body + mono). Replaces the
// previous one-font (Geist-everywhere) layout that read as templated.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Root layout — minimal: <html> + fonts. Per-locale metadata,
 * NextIntlClientProvider, and motion providers all live in
 * `app/[locale]/layout.tsx`.
 *
 * `template` intentionally NOT set here — that's the [locale] layout's
 * job, otherwise Next.js double-wraps the home title into "PortrAI - PortrAI".
 *
 * `lang="et"` is the static default (ET is the default locale). The
 * [locale] layout overrides this client-side via a tiny inline script
 * for /en/* paths, so screen readers and a11y tools see the right
 * language without forcing dynamic rendering on every route.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PortrAI",
  description:
    "AI photo booth for events in Estonia. Weddings, corporate events, and trade shows with award-winning guest portraits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="et"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
