import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  buildPageMetadata,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /fotopeegel — thin SEO landing for "fotopeegel" (170/mo).
 *
 * Page exists to capture the keyword. Routes the visitor into the booths
 * page where the fotopeegel sits alongside the other booth offerings.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "Fotopeegel rental — mirror booth for weddings and galas | PortrAI"
        : "Fotopeegli rent — peegel-fotoboks pulma ja galaõhtutele | PortrAI",
    description:
      locale === "en"
        ? "Fotopeegel — the full-length mirror booth with camera and animated screen prompts. Elegant, theatrical, often booked alongside the AI booth."
        : "Fotopeegel — täismõõdus peegel-fotoboks koos kaamera ja animeeritud ekraani-juhistega. Elegantne, teatraalne, tihti broneeritud koos AI boksiga.",
    locale,
    ogImage: "/images/site/portrait-detail.png",
    path: localizedSitePath(locale, "/fotopeegel"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Fotopeegel",
    headline: "The mirror booth — for galas, weddings, premium nights.",
    sub: "Fotopeegel is a full-length mirror with a camera and animated screen prompts behind it. Guests approach, the mirror wakes up, takes the photo, prints it on the spot and emails the digital copy. Quieter than the AI booth, more theatrical.",
    body1:
      "We run fotopeegel at events where the booth needs to feel like furniture, not equipment — wedding receptions, gala dinners, anniversary nights, premium brand launches. The mirror's chrome edge and warm light fit a room where the AI booth's neon LEDs would feel out of place.",
    body2:
      "Often booked alongside our AI booth in different rooms of the same event — fotopeegel for the elegant moment, AI booth for the late-night energy. Same team, two energies.",
    cta: "See it on the booths page",
    secondaryCta: "Get a quote",
  },
  et: {
    eyebrow: "(01) Fotopeegel",
    headline: "Peegel-fotoboks — galaõhtutele, pulmadele, premium-üritustele.",
    sub: "Fotopeegel on täismõõdus peegel, mille taga on kaamera ja animeeritud ekraani-juhised. Külaline läheneb, peegel ärkab, teeb pildi, prindib kohapeal ja saadab digikoopia e-postile. Vaiksem kui AI boks, teatraalsem.",
    body1:
      "Me jookseme fotopeeglit üritustel, kus boks peab tunduma mööblina, mitte tehnikana — pulma-õhtusöögid, galad, juubelid, premium brändi-lansseerimised. Peegli kroomi-äär ja soe valgus sobivad ruumi, kus AI boksi neoon-LED-id tunduksid kohatutena.",
    body2:
      "Tihti broneeritakse koos meie AI boksiga — eri ruumid ühel üritusel. Fotopeegel elegantsele hetkele, AI boks hilisõhtu energiale. Sama meeskond, kaks energiat.",
    cta: "Vaata boksite lehel",
    secondaryCta: "Küsi pakkumist",
  },
} as const;

export default async function FotopeegelPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/fotopeegel")}`;
  const service = serviceSchema({
    name: locale === "en" ? "Fotopeegel rental" : "Fotopeegli rent",
    description:
      locale === "en"
        ? "Mirror photo booth rental for weddings, galas and premium events in Estonia."
        : "Peegel-fotoboksi rent pulmadele, galadele ja premium-üritustele Eestis.",
    serviceType: "Mirror photobooth rental",
    url: pageUrl,
    image: `${SITE_URL}/images/site/portrait-detail.png`,
  });
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: "Fotopeegel", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />

      <section className="px-6 pb-16 pt-24 md:px-12 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.eyebrow}
            </p>
            <h1
              className="mb-6 font-medium leading-[1.05] tracking-tight"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              {copy.headline}
            </h1>
            <p
              className="mb-6 max-w-2xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.sub}
            </p>
            <p className="mb-6 max-w-2xl text-[color:var(--color-text-secondary)]">
              {copy.body1}
            </p>
            <p className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]">
              {copy.body2}
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href={"/boksid" as "/boksid" | "/booths"}
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.cta} →
                </Link>
              </MagneticButton>
              <BookingTrigger
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </BookingTrigger>
            </div>
          </div>
          <ImagePlaceholder
            description="Hero photo: PortrAI fotopeegel mirror booth at an elegant venue, warm light"
            className="aspect-[4/5] rounded-3xl"
          />
        </div>
      </section>
    </PageShell>
  );
}
