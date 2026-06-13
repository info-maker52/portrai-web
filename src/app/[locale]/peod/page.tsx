import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { ProofMicrocopy } from "@/components/trust/ProofMicrocopy";
import { SlaBadges } from "@/components/trust/SlaBadges";
import { ThemeGallery } from "@/components/themes/ThemeGallery";
import { AIVAR_CREDIT, AIVAR_QUOTE } from "@/lib/copy";
import { formatEur, PACKAGES } from "@/lib/pricing";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale, text } from "@/lib/site-content";

/**
 * /peod — the fun-experience door.
 *
 * Three audience strips: Corporate / Wedding / Private. Each is its own
 * sub-section with photo + copy + path forward.
 *
 * Voice: Linear restraint + Snapbar peer-positioning. MSCHF moment is the
 * H1 itself — "The booth your team is still talking about on Monday."
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
        ? "AI photo booth for company parties, weddings and private events | PortrAI"
        : "AI fotoboks firmapidudele, pulmadele ja eraüritustele | PortrAI",
    description:
      locale === "en"
        ? "PortrAI runs the booth all night while you celebrate. AI portraits of every guest, on-site host, up to 200 portraits per hour. Boks from €490, Branded from €890."
        : "PortrAI hoiab boksi käigus terve öö, samal ajal kui sina pidu pead. AI portreed igast külalisest, kohapealne host, kuni 200 portreed tunnis. Boks alates 490 €, Branded alates 890 €.",
    locale,
    ogImage: "/images/site/event-action.jpg",
    path: localizedSitePath(locale, "/peod"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) PortrAI · Events",
    headline: "The booth your team is still talking about on Monday.",
    sub: "An AI photo experience for company parties, private events and weddings. On-site host, up to 200 portraits per hour, every photo delivered by dawn.",
    primaryCta: "Plan the night",
    secondaryCta: "See pricing",

    audienceEyebrow: "(02) Three rooms, one booth",
    audienceTitle: "Pick the one that fits.",
    audiences: [
      {
        anchor: "firmapidu",
        eyebrow: "Company parties",
        title: "The 200-guest hit of the night.",
        body: "Annual parties, summer days, team kick-offs, anniversaries. We host the booth, brand the UI to your company, and feed the live gallery on a wall so everyone watches the room turn into portraits.",
        bullets: [
          "Up to 200 portraits per hour at peak",
          "Branded UI from logo to email",
          "On-site host for the whole event",
          "Photo + phone in 15 seconds per guest",
        ],
        cta: "Get a corporate quote",
      },
      {
        anchor: "pulm",
        eyebrow: "Weddings",
        title: "Spring 2026 — with the Everybooth ICON 2.",
        body: "PortrAI's wedding line launches Spring 2026 with the handcrafted, light-wood Everybooth ICON 2 — a warmer booth than our usual neon-and-metal events kit. The first five couples to confirm get a custom AI theme included.",
        bullets: [
          "Handcrafted light-wood booth",
          "Watercolour, acrylic and editorial AI styles",
          "On-site host all night",
          "First 5 couples · custom theme included",
        ],
        cta: "Join the waitlist",
      },
      {
        anchor: "era",
        eyebrow: "Private events",
        title: "Birthdays, jubilees, dinners — without the queue.",
        body: "Smaller groups, tighter venues, no logistics on you. We arrive 90 minutes early, set up in 40, and the night flows around the booth instead of stopping for it.",
        bullets: [
          "Up to 100 guests in the Boks tier",
          "Five ready-made AI styles",
          "Unlimited prints + digital gallery",
          "Boks tier · from €490",
        ],
        cta: "Plan a private event",
      },
    ],

    whyEyebrow: "(03) Why it's the hit",
    why: [
      {
        title: "Live gallery wall",
        body: "Every portrait lands on a screen in the room. Guests come back to see themselves and everyone else.",
      },
      {
        title: "12 named AI styles",
        body: "From watercolour to neon to renaissance. We tune the catalog to the event mood.",
      },
      {
        title: "On-site host",
        body: "We run the queue, the energy and the after-pack. You don't manage the booth — you enjoy it.",
      },
      {
        title: "Throughput tuned for crowds",
        body: "Even at 200 guests/hour the queue stays under five minutes. Nobody waits, nobody bails.",
      },
    ],

    themesEyebrow: "(04) Theme catalog",
    themesTitle: "12 AI styles. Pick a starting point.",
    themesBody:
      "Each style is a starting point. We tune prompts, frames and the on-screen flow to your event. Custom themes ship in 2 weeks.",
    themesCta: "See the full style catalog",

    pricingEyebrow: "(05) Pricing snapshot",
    pricingTitle: "Booth tiers, transparent prices.",
    pricingCta: "See the full pricing page",

    quoteEyebrow: "(06) What organisers say",

    faqEyebrow: "(07) FAQ",
    faqTitle: "What planners ask first.",
    faq: [
      {
        q: "How much space and power do you need?",
        a: "About 2×2 metres and one standard 230 V outlet. We can work tighter — describe the venue and we'll confirm.",
      },
      {
        q: "How early should we book?",
        a: "Weekend dates in May, June, August, December book out 2–3 months ahead. Mid-week dates are usually open at 3–4 weeks. Talk to us early either way.",
      },
      {
        q: "Do guests get prints and digital photos?",
        a: "Both. Every photo prints on-site within seconds, and every guest gets a QR code that delivers the digital copies straight to their phone.",
      },
      {
        q: "Can the booth match our event theme?",
        a: "Yes — the Branded tier takes over the full UI (logo, colours, prompts, email). Fully custom AI themes are a €290 add-on and ship in two weeks.",
      },
      {
        q: "What if our venue is far from Tallinn?",
        a: "Flat distance fees — €90 within 100 km, €180 within 200 km. Beyond that we quote per event. Setup is the same anywhere.",
      },
      {
        q: "Is there always a host on-site?",
        a: "Always. Our host welcomes guests, keeps the queue moving, helps shy guests pose, and packs everything down at the end. The booth feels staffed, not abandoned.",
      },
    ],

    ctaTitle: "Tell us about your event.",
    ctaBody: "We reply within 3 business hours.",
    ctaButton: "Get a quote",
  },
  et: {
    eyebrow: "(01) PortrAI · Peod",
    headline: "Boks, millest räägitakse esmaspäeval kontoris.",
    sub: "AI fotokogemus firma-, era- ja pulmaüritustele. Kohapealne host, kuni 200 portreed tunnis, kõik pildid valmis öö lõpuks.",
    primaryCta: "Planeeri õhtu",
    secondaryCta: "Vaata hindu",

    audienceEyebrow: "(02) Kolm saali, üks boks",
    audienceTitle: "Vali see, mis sobib.",
    audiences: [
      {
        anchor: "firmapidu",
        eyebrow: "Firmapeod",
        title: "200 külalise õhtu hitt.",
        body: "Aastapeod, suvepäevad, meeskonna käivitused, juubelid. Me hostime boksi, brändime UI sinu ettevõttele ja toidame live-galeriid seina peal — kõik vaatavad, kuidas saal muutub portreedeks.",
        bullets: [
          "Kuni 200 portreed tunnis tipphetkel",
          "Bränditud UI logost e-postini",
          "Kohapealne host kogu õhtuks",
          "Foto + telefon 15 sekundiga külalise kohta",
        ],
        cta: "Küsi firma pakkumist",
      },
      {
        anchor: "pulm",
        eyebrow: "Pulmad",
        title: "Kevad 2026 — Everybooth ICON 2-ga.",
        body: "PortrAI pulmaformaat tuleb kevadel 2026 koos käsitsi valmistatud heleda puiduga Everybooth ICON 2 boksiga — soojem boks kui meie tavaline neoonist-metallist üritus-komplekt. Esimesed viis paari, kes kinnitavad, saavad kohandatud AI teema hinnas sees.",
        bullets: [
          "Käsitsi valmistatud heleda puiduga boks",
          "Akvarell, akrüül, ajakirjalik AI stiil",
          "Kohapealne host terve öö",
          "Esimesed 5 paari · kohandatud teema hinnas",
        ],
        cta: "Liitu ootejärjekorraga",
      },
      {
        anchor: "era",
        eyebrow: "Eraüritused",
        title: "Sünnipäevad, juubelid, õhtusöögid — ilma järjekorrata.",
        body: "Väiksemad grupid, kitsamad ruumid, logistika meie poolt. Saabume 90 minutit varem, paneme üles 40 minutiga — õhtu voolab ümber boksi, mitte ei seisa selle taga.",
        bullets: [
          "Kuni 100 külalist Boks paketis",
          "Viis valmis AI stiili",
          "Piiramatult printe + digi-galerii",
          "Boks pakett · alates 490 €",
        ],
        cta: "Planeeri eraüritus",
      },
    ],

    whyEyebrow: "(03) Miks see on hitt",
    why: [
      {
        title: "Live-galerii sein",
        body: "Iga portree jõuab ekraanile ruumis. Külalised tulevad tagasi, et näha ennast ja teisi.",
      },
      {
        title: "12 nimega AI stiili",
        body: "Akvarellist neoonini ja renessanssini. Häälestame kataloogi ürituse meeleolule.",
      },
      {
        title: "Kohapealne host",
        body: "Me hoiame järjekorda, energiat ja peale-pakkimist. Sa ei halda boksi — sa naudid seda.",
      },
      {
        title: "Läbilask, mis sobib rahvale",
        body: "Ka 200 külalise tunnis tipphetkel jääb järjekord alla viie minuti. Keegi ei oota, keegi ei lahku.",
      },
    ],

    themesEyebrow: "(04) Teemakataloog",
    themesTitle: "12 AI stiili. Vali lähtepunkt.",
    themesBody:
      "Iga stiil on lähtepunkt. Häälestame promptid, raamid ja ekraani-voo sinu ürituse järgi. Kohandatud teemad valmivad 2 nädalaga.",
    themesCta: "Vaata terve stiilikataloog",

    pricingEyebrow: "(05) Hinna-ülevaade",
    pricingTitle: "Boksi-tasemed, läbipaistvad hinnad.",
    pricingCta: "Vaata terve hinnaleht",

    quoteEyebrow: "(06) Mida korraldajad ütlevad",

    faqEyebrow: "(07) KKK",
    faqTitle: "Mida korraldajad kõige sagedamini küsivad.",
    faq: [
      {
        q: "Kui palju ruumi ja voolu vajate?",
        a: "Umbes 2×2 meetrit ja üks standardne 230 V pistik. Saame töötada ka kitsamates ruumides — kirjelda venuet ja kinnitame.",
      },
      {
        q: "Kui vara peaks broneerima?",
        a: "Mai, juuni, augusti, detsembri nädalavahetuse kuupäevad lähevad täis 2–3 kuud ette. Nädala-sees kuupäevad on tavaliselt avatud 3–4 nädala peale. Räägi meiega varakult kummalgi juhul.",
      },
      {
        q: "Kas külalised saavad nii printe kui digifotosid?",
        a: "Mõlemat. Iga pilt prinditakse kohapeal sekunditega, ja iga külaline saab QR-koodi, mis tarnib digitaalsed koopiad otse tema telefoni.",
      },
      {
        q: "Kas boks saab sobituda meie ürituse teemaga?",
        a: "Jah — Branded tase võtab üle terve UI (logo, värvid, promptid, e-kiri). Täiesti kohandatud AI teemad on 290 € lisa ja valmivad kahe nädalaga.",
      },
      {
        q: "Mis siis, kui meie venue on Tallinnast kaugel?",
        a: "Fikseeritud transporditasud — 90 € kuni 100 km, 180 € kuni 200 km. Kaugemale teeme eraldi pakkumise. Setup on igal pool sama.",
      },
      {
        q: "Kas alati on host kohapeal?",
        a: "Alati. Meie host tervitab külalisi, hoiab järjekorra liikuvana, aitab häbelikel poseerida ja pakib lõpus kõik kokku. Boks tundub mehitatud, mitte hüljatud.",
      },
    ],

    ctaTitle: "Räägi meile oma üritusest.",
    ctaBody: "Vastame 3 töötunni jooksul.",
    ctaButton: "Küsi pakkumist",
  },
} as const;

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/peod")}`;

  const service = serviceSchema({
    name:
      locale === "en"
        ? "AI photo booth for events"
        : "AI fotoboks üritustele",
    description:
      locale === "en"
        ? "AI photo booth rental for company parties, weddings, and private events in Estonia."
        : "AI fotoboksi rent firmapidudele, pulmadele ja eraüritustele Eestis.",
    serviceType: "Event photo booth rental",
    url: pageUrl,
    priceRange: "490+ €",
    image: `${SITE_URL}/images/site/event-action.jpg`,
  });
  const faqLd = faqSchema(copy.faq);
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: locale === "en" ? "Events" : "Peod", url: pageUrl },
  ]);

  const publicPackages = PACKAGES.filter((p) => !p.customPricing);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-[color:var(--color-stroke-subtle)] px-6 pb-12 pt-24 md:px-12 md:pt-32">
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
                <BookingTrigger
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </BookingTrigger>
              </MagneticButton>
              <Link
                href={"/hinnad" as "/hinnad" | "/pricing"}
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)]">
            <Image
              src="/images/site/event-action.jpg"
              alt={
                locale === "en"
                  ? "PortrAI booth at a live event with guests engaging"
                  : "PortrAI boks live-üritusel külalistega"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.55)] via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
              ◆ Live event
            </div>
          </div>
        </div>
      </section>

      {/* (02) Three audience strips */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.audienceEyebrow}
          </p>
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {copy.audienceTitle}
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {copy.audiences.map((aud, i) => (
            <article
              key={aud.anchor}
              id={aud.anchor}
              className="grid gap-8 lg:grid-cols-2 lg:items-center"
            >
              {/* Alternate image side on odd indexes */}
              <ImagePlaceholder
                description={
                  aud.anchor === "firmapidu"
                    ? "Corporate party photo — guests at the PortrAI booth, energetic crowd, brand-purple uplighting"
                    : aud.anchor === "pulm"
                      ? "Wedding photo with the Everybooth ICON 2 — light wood booth in a warm reception room (placeholder until Spring 2026 shoot)"
                      : "Private birthday or jubilee at a smaller venue with the PortrAI booth in the corner"
                }
                className={`aspect-[5/4] rounded-3xl ${i % 2 === 1 ? "lg:order-2" : ""}`}
              />
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                  {aud.eyebrow}
                </p>
                <h3
                  className="mb-4 font-medium leading-tight"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  {aud.title}
                </h3>
                <p
                  className="mb-6 text-[color:var(--color-text-secondary)]"
                  style={{ fontSize: "var(--text-body-lg)" }}
                >
                  {aud.body}
                </p>
                <ul className="mb-8 flex flex-col gap-2">
                  {aud.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)]"
                    >
                      <span className="text-[color:var(--color-brand-accent)]">·</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={aud.anchor === "pulm" ? "/pulma-fotoboks" : "/kontakt"}
                  className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
                >
                  {aud.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* (03) Why it's the hit */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.whyEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {copy.why.map((w, i) => (
            <article
              key={w.title}
              className="flex flex-col gap-3 border-l border-[color:var(--color-brand-primary)] pl-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {w.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {w.body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <SlaBadges locale={locale} />
        </div>
      </section>

      {/* (04) Theme catalog teaser */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.themesEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.themesTitle}
            </h2>
          </div>
          <p
            className="self-end max-w-xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.themesBody}
          </p>
        </div>
        <ThemeGallery />
        <div className="mt-10">
          <Link
            href="/stiilid"
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
          >
            {copy.themesCta} →
          </Link>
        </div>
      </section>

      {/* (05) Pricing snapshot */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.pricingEyebrow}
        </p>
        <h2
          className="mb-10 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.pricingTitle}
        </h2>
        <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publicPackages.map((pkg) => (
            <article
              key={pkg.id}
              className={`flex flex-col gap-3 rounded-2xl border p-6 ${
                pkg.highlight
                  ? "border-[color:var(--color-brand-primary)]/60 bg-[color:var(--color-brand-primary)]/8"
                  : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]"
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
                {text(locale, pkg.name)} · {pkg.hours}h
              </p>
              <p
                className="font-medium tabular-nums leading-none"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {locale === "en" ? "from" : "alates"}{" "}
                {formatEur(pkg.basePrice, locale)}
              </p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {text(locale, pkg.tagline)}
              </p>
            </article>
          ))}
          <article className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {locale === "en" ? "Custom Activation" : "Custom Activation"}
            </p>
            <p
              className="font-medium leading-none text-[color:var(--color-brand-accent)]"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {locale === "en" ? "By quote" : "Pakkumise alusel"}
            </p>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              {locale === "en"
                ? "Campaign concepts and virtual widgets. The Swedbank / Synlab / Von Fock tier."
                : "Kampaania-kontseptsioonid ja virtuaalsed widgetid. Swedbanki / Synlabi / Von Focki tase."}
            </p>
          </article>
        </div>
        <Link
          href={"/hinnad" as "/hinnad" | "/pricing"}
          className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
        >
          {copy.pricingCta} →
        </Link>
      </section>

      {/* (06) Aivar quote */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-gradient-to-b from-[color:var(--color-surface-raised)] to-transparent px-6 py-24 md:px-12">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.quoteEyebrow}
        </p>
        <figure className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[160px_minmax(0,1fr)] md:items-start">
          <ImagePlaceholder
            description="Headshot of Aivar Kuusk, founder of Kuusk Events — friendly, professional, against neutral background"
            className="aspect-square w-40 rounded-full"
            showTag={false}
          />
          <div>
            <blockquote
              className="font-medium leading-[1.1] tracking-tight text-white"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              <span className="text-[color:var(--color-brand-accent)]">"</span>
              {text(locale, AIVAR_QUOTE)}
              <span className="text-[color:var(--color-brand-accent)]">"</span>
            </blockquote>
            <figcaption className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              — {text(locale, AIVAR_CREDIT)}
            </figcaption>
          </div>
        </figure>
      </section>

      {/* (07) FAQ */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
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
      <section className="px-6 py-32 md:px-12">
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
          <BookingTrigger
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.ctaButton} →
          </BookingTrigger>
        </MagneticButton>
      </section>
    </PageShell>
  );
}
