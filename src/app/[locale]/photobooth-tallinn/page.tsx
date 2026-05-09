import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /photobooth-tallinn — geo SEO landing page.
 *
 * Target keyword: "photobooth tallinn" (110/mo, Medium comp, +57% 3-mo).
 * Secondaries: photobooth rent · photobox tallinn · fotobox tallinn ·
 * fotoboks rent tallinn (combined ~150/mo addressable).
 *
 * NOTE: Estonian copy is DRAFT — needs Reijo's native pass.
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
        ? "Photobooth rental Tallinn | AI photobooth and fotoboks | PortrAI"
        : "Fotoboks rent Tallinnas | AI photobooth ja fotopeegel | PortrAI",
    description:
      locale === "en"
        ? "Photobooth rental in Tallinn with AI photo booth, classic fotoboks, and fotopeegel options. Fast local setup, instant prints, digital delivery, and branded event flows."
        : "Fotoboks rent Tallinnas koos AI photoboothi, klassikalise fotoboksi ja fotopeegli valikutega. Kiire kohalik setup, kohesed printid, digitaalne jagamine ja bränditud üritusevood.",
    locale,
    ogImage: "/images/site/event-action.jpg",
    path: localizedSitePath(locale, "/photobooth-tallinn"),
  });
}

const COPY = {
  en: {
    eyebrow: "(02) PortrAI · Tallinn",
    headline: "Photobooth rental in Tallinn — same week, branded, award-winning.",
    subhead:
      "PortrAI delivers AI photobooth, classic fotoboks, and fotopeegel for events across Tallinn. We're based in Tallinn, so setup arrives early, the team knows the venues, and the experience is dialled in before guests arrive.",
    primaryCta: "Book PortrAI in Tallinn",
    secondaryCta: "See what we've made",

    whyEyebrow: "(03) Why Tallinn events pick PortrAI",
    whyTitle: "Local team. Award-winning experience. Same calendar for all formats.",
    whyBullets: [
      {
        title: "Tallinn-based, fast setup",
        body: "We're physically based in Tallinn. We arrive 90 minutes before the event, set up in 45, and don't bill mileage for venues inside the city.",
      },
      {
        title: "Three formats, one team",
        body: "AI photobooth, classic fotoboks, fotopeegel (mirror booth) — pick whichever fits the event, or run two at the same venue. Same booking calendar, same on-site host.",
      },
      {
        title: "Branded for your event",
        body: "Frames, prompts, on-screen graphics, QR landing page, follow-up email — every touch-point in your event's colours and theme.",
      },
      {
        title: "Award-winning",
        body: "First in the Baltics to win Booth Mastermind Awards Las Vegas 2025 — Best AI Photo Solution and Best Newcomer.",
      },
    ],

    venuesEyebrow: "(04) Venues we've delivered to",
    venuesTitle: "From Vabaduse väljak to Telliskivi.",
    venues: [
      "Solaris Centre",
      "Kultuurikatel",
      "Fotografiska Tallinn",
      "Telliskivi Loomelinnak",
      "Hilton Tallinn Park",
      "Estonia kontserdimaja",
      "Saku Suurhall",
      "Proto Invention Factory",
      "Forum Cinemas Coca-Cola Plaza",
      "Erinevad korporatiivkeskused",
    ],

    faqEyebrow: "(05) Frequently asked",
    faqTitle: "Tallinn-specific questions.",
    faq: [
      {
        q: "How fast can you arrive at a venue in Tallinn?",
        a: "We arrive 90 minutes before the event start time as standard. For last-minute bookings inside the city we can do same-day setup — call us directly at +372 5663 9304 if your event is within 24 hours.",
      },
      {
        q: "Do you charge for delivery within Tallinn?",
        a: "No. Delivery and setup inside the city is included in the rental price. We bill mileage only for events outside Tallinn (and that's still usually under €50 round-trip for anywhere in Harjumaa).",
      },
      {
        q: "Can the booth fit in a typical Tallinn event venue?",
        a: "Yes — our footprint is 2x2 metres plus 1.5 metres of clear standing room. Every venue we've worked at in Tallinn (Hilton Park, Kultuurikatel, Fotografiska, Solaris, etc.) has accommodated us without issue.",
      },
      {
        q: "How much power and internet does the booth need?",
        a: "One regular 230V power outlet. Internet is preferred but not required — we have a 4G backup that works at every Tallinn venue we've tested.",
      },
      {
        q: "Can I see a working booth before I book?",
        a: "Yes. We do paid demo days at our Tallinn studio twice a month — book a slot and we'll run you through every format (AI photobooth, classic fotoboks, fotopeegel) in 30 minutes.",
      },
    ],

    ctaTitle: "Book PortrAI for your Tallinn event.",
    ctaBody:
      "Tell us the date and venue. We confirm availability within a few hours.",
    ctaButton: "Book PortrAI",
  },
  et: {
    // [ET DRAFT — needs your native pass]
    eyebrow: "(02) PortrAI · Tallinn",
    headline:
      "Photobooth rent Tallinnas — sama nädal, bränditud, auhinnatud.",
    subhead:
      "PortrAI pakub AI photoboothi, klassikalist fotoboksi ja fotopeegelt üritustele üle Tallinna. Asume Tallinnas, seega setup saabub varakult, meeskond tunneb venue'sid ja kogemus on häälestatud enne külaliste saabumist.",
    primaryCta: "Broneeri PortrAI Tallinnas",
    secondaryCta: "Vaata, mida oleme teinud",

    whyEyebrow: "(03) Miks Tallinna üritused valivad PortrAI",
    whyTitle: "Kohalik meeskond. Auhinnatud kogemus. Sama kalender kõikidele formaatidele.",
    whyBullets: [
      {
        title: "Tallinnas baseerunud, kiire setup",
        body: "Asume füüsiliselt Tallinnas. Saabume 90 minutit enne ürituse algust, setup võtab 45 minutit, ja kilometraaži linnas ei arvelda.",
      },
      {
        title: "Kolm formaati, üks meeskond",
        body: "AI photobooth, klassikaline fotoboks, fotopeegel — vali, mis üritusele sobib, või jooksuta kahte samas asukohas. Sama broneerimiskalender, sama kohapealne host.",
      },
      {
        title: "Sinu üritusele bränditud",
        body: "Raamid, juhised, ekraani-graafika, QR-leht, järelpost — iga puutepunkt sinu ürituse värvides ja teemas.",
      },
      {
        title: "Auhinnatud",
        body: "Esimene Balti riikidest, kes võitis Booth Mastermind Awardsi Las Vegases 2025 — Parim AI fotolahendus ja Parim uustulnuk.",
      },
    ],

    venuesEyebrow: "(04) Venue'd, kuhu oleme tarninud",
    venuesTitle: "Vabaduse väljakust Telliskivini.",
    venues: [
      "Solaris Keskus",
      "Kultuurikatel",
      "Fotografiska Tallinn",
      "Telliskivi Loomelinnak",
      "Hilton Tallinn Park",
      "Estonia kontserdimaja",
      "Saku Suurhall",
      "Proto Invention Factory",
      "Forum Cinemas Coca-Cola Plaza",
      "Erinevad korporatiivkeskused",
    ],

    faqEyebrow: "(05) Korduvad küsimused",
    faqTitle: "Tallinna-spetsiifilised küsimused.",
    faq: [
      {
        q: "Kui kiiresti jõuate Tallinnas venue'sse?",
        a: "Saabume vaikimisi 90 minutit enne ürituse algust. Viimase hetke broneeringute puhul linnas saame teha sama päeva setupi — helista otse +372 5663 9304, kui üritus on 24 tunni jooksul.",
      },
      {
        q: "Kas Tallinnasse tarnimine maksab eraldi?",
        a: "Ei. Linnasisene tarne ja setup on rendi hinnas. Kilometraaži arveldame ainult linnaväliste ürituste puhul (ja see on tavaliselt alla €50 edasi-tagasi kõikjal Harjumaal).",
      },
      {
        q: "Kas boks mahub tüüpilisse Tallinna venue'sse?",
        a: "Jah — meie põrandapind on 2x2 meetrit pluss 1,5 meetrit vaba seismisruumi. Iga Tallinna venue, kus oleme töötanud (Hilton Park, Kultuurikatel, Fotografiska, Solaris jne), on meid probleemideta mahutanud.",
      },
      {
        q: "Kui palju voolu ja internetti boks vajab?",
        a: "Üks tavaline 230V pistik. Internet on eelistatud, kuid mitte kohustuslik — meil on 4G backup, mis töötab igas testitud Tallinna venue's.",
      },
      {
        q: "Kas saan boksi enne broneerimist näha?",
        a: "Jah. Korraldame Tallinna stuudios tasulisi demo-päevi kaks korda kuus — broneeri slot ja näitame sulle 30 minutiga iga formaadi (AI photobooth, klassikaline fotoboks, fotopeegel).",
      },
    ],

    ctaTitle: "Broneeri PortrAI oma Tallinna üritusele.",
    ctaBody:
      "Räägi meile kuupäev ja venue. Kinnitame saadavuse paari tunni jooksul.",
    ctaButton: "Broneeri PortrAI",
  },
} as const;

export default async function PhotoboothTallinnPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = COPY[locale];
  const eventsHref = locale === "en" ? "/events" : "/peod";

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.eyebrow}
            </p>
            <h1
              className="mb-6 max-w-4xl font-medium leading-[1.05] tracking-tight"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              {copy.headline}
            </h1>
            <p
              className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.subhead}
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/kontakt"
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </Link>
              </MagneticButton>
              <Link
                href="/tood"
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          <ImagePlaceholder
            description="Hero photo: PortrAI booth at a recognisable Tallinn venue (e.g. Kultuurikatel, Fotografiska, or Solaris) — wide shot showing the venue context and the booth setup"
            className="aspect-[4/5] rounded-3xl"
          />
        </div>
      </section>

      {/* Why Tallinn events pick PortrAI */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.whyEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.whyTitle}
            </h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {copy.whyBullets.map((b, i) => (
            <article
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                0{i + 1}
              </p>
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {b.title}
              </h3>
              <p className="text-[color:var(--color-text-secondary)]">
                {b.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Venues — geo signal for SEO */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.venuesEyebrow}
        </p>
        <h2
          className="mb-10 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.venuesTitle}
        </h2>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {copy.venues.map((venue) => (
            <li
              key={venue}
              className="flex items-center gap-3 rounded-xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-4 py-3"
            >
              <span className="font-mono text-xs text-[color:var(--color-brand-accent)]">
                ●
              </span>
              <span className="text-sm">{venue}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-[300px_1fr]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.faqEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.faqTitle}
            </h2>
          </div>
          <FaqAccordion items={[...copy.faq]} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          {copy.ctaTitle}
        </h2>
        <p
          className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.ctaBody}
        </p>
        <MagneticButton>
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.ctaButton} →
          </Link>
        </MagneticButton>
      </section>
    </PageShell>
  );
}
