import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { ProofMicrocopy } from "@/components/trust/ProofMicrocopy";
import { SlaBadges } from "@/components/trust/SlaBadges";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /firmapidu-fotoboks — corporate-party landing.
 *
 * Distinct from /peod by audience focus: this page speaks only to HR /
 * event planners booking annual parties, summer days, jõulupidu, team
 * kick-offs. Anniversary-of-the-company evenings. Throughput, branding,
 * Monday-conversation outcomes are the headline; weddings + private
 * events get their own dedicated pages.
 *
 * Content angle the visitor only sees here: occasion-aware sections
 * (jõulupidu / suvepäev / aastapäev / käivitus) — different from /peod's
 * three-audience strips.
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
        ? "Company-party AI photo booth | PortrAI"
        : "Firmapidu AI fotoboks | PortrAI",
    description:
      locale === "en"
        ? "AI photo booth for company parties, summer days, jõulupidu, team kick-offs and corporate anniversaries. Branded UI, on-site host, 200+ portraits per hour."
        : "AI fotoboks firmapidudele, suvepäevadele, jõulupidudele, meeskonna käivitustele ja firma juubelitele. Bränditud UI, kohapealne host, 200+ portreed tunnis.",
    locale,
    ogImage: "/images/work/melt-cover.png",
    path: localizedSitePath(locale, "/firmapidu-fotoboks"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Company party · AI photo booth",
    headline:
      "The company-party booth your team is still talking about on Monday.",
    sub: "PortrAI runs branded AI photo experiences at annual parties, summer days, jõulupidu, anniversary nights and team kick-offs. On-site host, up to 200 portraits per hour, every photo delivered by dawn.",
    primaryCta: "Get a corporate quote",
    secondaryCta: "See pricing",

    whyEyebrow: "(02) Why HR teams pick us",
    why: [
      {
        title: "Throughput tuned for crowds",
        body: "Up to 200 portraits per hour at peak. Even a 400-person party gets through the booth in under 30 minutes without a queue stretching across the venue.",
      },
      {
        title: "Branded UI in your company colours",
        body: "Not just a logo on the start screen. The prompts, the photo frame, the QR landing page, the follow-up email — every guest touchpoint in your design language.",
      },
      {
        title: "On-site host reads the room",
        body: "Calm for the senior dinner, hype for the year-end party. Our host opens conversations, helps shy guests pose, packs everything down at the end.",
      },
      {
        title: "Monday-morning gallery",
        body: "Every photo to every guest via QR + a shared link in the company Slack the next morning. The Monday conversation writes itself.",
      },
    ],

    occasionEyebrow: "(03) Built for the occasions HR books",
    occasions: [
      {
        title: "Aastapidu / year-end party",
        body: "December bookings fill out 8–10 weeks ahead. Book early to lock the date.",
      },
      {
        title: "Suvepäev / summer day",
        body: "Outdoor venues, daylight setup, weather-aware kit. We've delivered at lake houses, farms, manors.",
      },
      {
        title: "Jõulupidu",
        body: "Themed prompts (winter, holiday, retro-magic) tuned for the December mood without going kitsch.",
      },
      {
        title: "Anniversary / launch",
        body: "Custom themes for company milestones — 10-year, IPO, office opening, product launch. Add the Branded tier for full UI takeover.",
      },
    ],

    pricingEyebrow: "(04) Typical corporate booking",
    pricingTitle: "Most company parties land in the Branded tier.",
    pricingBody:
      "5 hours, fully branded UI, 10+ AI styles, host, live gallery wall, prints, digital delivery within 24h. Larger anniversaries upgrade to Custom Activation with a campaign concept.",
    pricingFromLabel: "Branded · from €890",
    pricingCustomLabel: "Anniversaries → Custom (by quote)",
    pricingCta: "See full pricing",

    faqEyebrow: "(05) Corporate FAQ",
    faqTitle: "What HR and event planners ask first.",
    faq: [
      {
        q: "How early should we book for a December company party?",
        a: "8–10 weeks before. Late November and December weekends fill out by early October. Mid-week jõulupidu dates open up faster.",
      },
      {
        q: "Can we have our logo + colours everywhere, not just the start screen?",
        a: "Yes. The Branded tier is full UI takeover — every prompt, frame, QR landing and follow-up email in your design language. The Custom Activation tier adds bespoke AI themes per company milestone.",
      },
      {
        q: "Do you handle 400+ guest parties?",
        a: "Yes. We add a second on-site host and tune throughput so the queue stays under 5 minutes at peak. The Custom Activation tier is built for this scale.",
      },
      {
        q: "What if our office is far from Tallinn?",
        a: "Tallinn within 25 km is included. €90 within 100 km, €180 within 200 km. Beyond that we quote per event. Setup time is the same anywhere.",
      },
      {
        q: "Can we collect emails or opt-ins for our internal newsletter?",
        a: "Yes. GDPR-clean opt-in per guest with consent timestamps. We deliver a clean CSV the morning after — straight into your CRM or HRIS.",
      },
      {
        q: "How does invoicing work?",
        a: "We invoice the company directly after the event. Standard 14-day net. Larger projects can be split into deposit + final.",
      },
    ],

    ctaTitle: "Make this year's party the one people still mention next year.",
    ctaBody:
      "Tell us the date and the team size. We come back with a precise quote within 3 business hours.",
    ctaButton: "Get a corporate quote",
  },
  et: {
    eyebrow: "(01) Firmapidu · AI fotoboks",
    headline: "Firmapidu fotoboks, mille üle räägitakse esmaspäeval kontoris.",
    sub: "PortrAI jookseb bränditud AI fotokogemusi aastapidudel, suvepäevadel, jõulupidudel, juubelitel ja meeskonna käivitustel. Kohapealne host, kuni 200 portreed tunnis, kõik pildid valmis hommikuks.",
    primaryCta: "Küsi firma pakkumist",
    secondaryCta: "Vaata hindu",

    whyEyebrow: "(02) Miks HR meeskonnad valivad meid",
    why: [
      {
        title: "Läbilask, mis sobib rahvale",
        body: "Kuni 200 portreed tunnis tipphetkel. Ka 400-inimese pidu jõuab boksist läbi alla 30 minutiga ilma järjekorrata.",
      },
      {
        title: "Bränditud UI sinu ettevõtte värvides",
        body: "Mitte ainult logo avaekraanil. Promptid, fotoraam, QR-lehekülg, järelkiri — iga külalise puutepunkt sinu disainikeeles.",
      },
      {
        title: "Kohapealne host loeb saali",
        body: "Rahulik juhtide õhtul, energiline aastapeol. Meie host avab vestlusi, aitab häbelikel poseerida, pakib lõpus kõik kokku.",
      },
      {
        title: "Esmaspäeva-hommiku galerii",
        body: "Iga pilt igale külalisele QR-i kaudu + jagatud link ettevõtte Slacki järgmisel hommikul. Esmaspäeva-vestlus kirjutab end ise.",
      },
    ],

    occasionEyebrow: "(03) Loodud sündmustele, mida HR broneerib",
    occasions: [
      {
        title: "Aastapidu",
        body: "Detsembri broneeringud lähevad täis 8–10 nädalat ette. Broneeri varakult, et kuupäev kinni panna.",
      },
      {
        title: "Suvepäev",
        body: "Välitingimused, päevavalguse setup, ilmastiku-teadlik komplekt. Oleme tarnitud järveäärsetes majades, taludes, mõisates.",
      },
      {
        title: "Jõulupidu",
        body: "Temaatilised promptid (talv, püha, retro-maagia) häälestatud detsembri meeleolule ilma kitschiks muutumata.",
      },
      {
        title: "Juubel / käivitus",
        body: "Kohandatud teemad ettevõtte verstapostidele — 10-aastane, IPO, kontori avamine, toote-launch. Lisa Branded tase täielikuks UI-ülevõtuks.",
      },
    ],

    pricingEyebrow: "(04) Tüüpiline firma broneering",
    pricingTitle: "Enamik firmapidudest läheb Branded tasemesse.",
    pricingBody:
      "5 tundi, täielikult bränditud UI, 10+ AI stiili, host, live-galerii sein, printimine, digikoopiad 24h jooksul. Suuremad juubelid kasvavad Custom Activationiks koos kampaania-kontseptsiooniga.",
    pricingFromLabel: "Branded · alates 890 €",
    pricingCustomLabel: "Juubelid → Custom (pakkumise alusel)",
    pricingCta: "Vaata terve hinnaleht",

    faqEyebrow: "(05) Firma KKK",
    faqTitle: "Mida HR ja korraldajad kõige sagedamini küsivad.",
    faq: [
      {
        q: "Kui vara peaks broneerima detsembri firmapeo jaoks?",
        a: "8–10 nädalat ette. Hilis-novembri ja detsembri nädalavahetuse kuupäevad lähevad täis oktoobri alguseks. Nädala-sees jõulupeo kuupäevad on kauem avatud.",
      },
      {
        q: "Kas meie logo ja värvid saavad olla kõigel, mitte ainult avaekraanil?",
        a: "Jah. Branded tase on täielik UI-ülevõtt — iga prompt, raam, QR-lehekülg ja järelkiri sinu disainikeeles. Custom Activation tase lisab kohandatud AI teemad ettevõtte verstapostidele.",
      },
      {
        q: "Kas saate hakkama 400+ külalisega?",
        a: "Jah. Lisame teise kohapealse hosti ja häälestame läbilaskvuse nii, et järjekord jääb tipus alla 5 minuti. Custom Activation tase on selleks skaalaks tehtud.",
      },
      {
        q: "Mis siis, kui meie kontor on Tallinnast kaugel?",
        a: "Tallinn kuni 25 km on sees. 90 € kuni 100 km, 180 € kuni 200 km. Kaugemale teeme eraldi pakkumise. Setup-aeg on igal pool sama.",
      },
      {
        q: "Kas saame koguda e-posti aadresse või opt-ineid sisemise listi jaoks?",
        a: "Jah. GDPR-puhas opt-in iga külalise kohta koos nõusoleku ajatemplitega. Tarnime puhta CSV hommikul — otse sinu CRM-i või HRIS-i.",
      },
      {
        q: "Kuidas arveldus käib?",
        a: "Esitame arve ettevõttele pärast üritust. Standardne 14-päevane maksetähtaeg. Suuremad projektid saab jagada ettemaks + lõppmakse.",
      },
    ],

    ctaTitle: "Tee selle aasta peost see, millest järgmisel aastal räägitakse.",
    ctaBody:
      "Räägi meile kuupäev ja meeskonna suurus. Tuleme tagasi täpse pakkumisega 3 töötunni jooksul.",
    ctaButton: "Küsi firma pakkumist",
  },
} as const;

export default async function FirmapiduPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/firmapidu-fotoboks")}`;

  const service = serviceSchema({
    name:
      locale === "en"
        ? "Company-party AI photo booth"
        : "Firmapidu AI fotoboks",
    description:
      locale === "en"
        ? "AI photo booth for corporate parties and company events in Estonia. Branded UI, on-site host, lead capture available."
        : "AI fotoboks firmapidudele ja ettevõtte üritustele Eestis. Bränditud UI, kohapealne host, valikuline leadide kogumine.",
    serviceType: "Corporate photo booth rental",
    url: pageUrl,
    priceRange: "890+ €",
    image: `${SITE_URL}/images/work/melt-cover.png`,
  });
  const faqLd = faqSchema(copy.faq);
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: locale === "en" ? "Company party" : "Firmapidu", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs} />

      {/* Hero */}
      <section className="px-6 pb-12 pt-24 md:px-12 md:pt-32">
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
              className="mb-8 max-w-2xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.sub}
            </p>
            <ProofMicrocopy locale={locale} variant="throughput" className="mb-4" />
            <div className="mb-8 flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/kontakt"
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </Link>
              </MagneticButton>
              <Link
                href={"/hinnad" as "/hinnad"}
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)]">
            <Image
              src="/images/work/melt-cover.png"
              alt={
                locale === "en"
                  ? "PortrAI booth at a corporate event"
                  : "PortrAI boks firma üritusel"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.55)] via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
              ◆ Corporate event
            </div>
          </div>
        </div>
      </section>

      {/* (02) Why HR picks us */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.whyEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {copy.why.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)] p-6"
            >
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {item.title}
              </h3>
              <p className="text-[color:var(--color-text-secondary)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* (03) Occasions */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.occasionEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {copy.occasions.map((occ) => (
            <div
              key={occ.title}
              className="flex flex-col gap-3 border-l border-[color:var(--color-brand-primary)] pl-5"
            >
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {occ.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {occ.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <SlaBadges locale={locale} />
        </div>
      </section>

      {/* (04) Pricing snapshot */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.pricingEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.pricingTitle}
        </h2>
        <p
          className="mb-8 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.pricingBody}
        </p>
        <div className="mb-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white">
            {copy.pricingFromLabel}
          </span>
          <span className="rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {copy.pricingCustomLabel}
          </span>
        </div>
        <Link
          href={"/hinnad" as "/hinnad"}
          className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-base)]"
        >
          {copy.pricingCta} →
        </Link>
      </section>

      {/* (05) FAQ */}
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
