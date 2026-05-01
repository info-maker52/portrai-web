import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
 * Root layout: only wraps with <html> and font variables.
 * Per-locale metadata + <NextIntlClientProvider> live in `app/[locale]/layout.tsx`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PortrAI",
    template: "%s - PortrAI",
  },
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
