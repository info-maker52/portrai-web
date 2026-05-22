import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { ProofMicrocopy } from "@/components/trust/ProofMicrocopy";
import { SlaBadges } from "@/components/trust/SlaBadges";
import { CTA } from "@/lib/copy";
import {
  breadcrumbSchema,
  buildPageMetadata,
  localizedSitePath,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /boksid — equipment showcase.
 *
 * Two booths (Neon AI booth + Everybooth ICON 2 wooden), one mirror booth
 * (fotopeegel). Not an SEO landing — the supporting SEO landings exist at
 * /fotopeegel + /pulma-fotoboks and link in here.
 *
 * MSCHF moment: H1 "Two booths. One studio."
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
        ? "PortrAI booths — neon AI booth, ICON 2, fotopeegel"
        : "PortrAI boksid — neoon AI boks, ICON 2, fotopeegel",
    description:
      locale === "en"
        ? "Two booths and a mirror, run by one team. Neon LED for corporate energy, handcrafted Everybooth ICON 2 for weddings, fotopeegel for premium moments."
        : "Kaks boksi ja peegel, ühe meeskonna juhtimisel. Neoon LED firma-energiale, käsitsi valmistatud Everybooth ICON 2 pulmadele, fotopeegel premium-hetkedele.",
    locale,
    ogImage: "/images/site/interactive-booth.png",
    path: localizedSitePath(locale, "/boksid"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) PortrAI booths",
    headline: "Two booths. One team.",
    sub: "Every booth is a tool. The team makes the experience. Pick the booth that fits the room — not the other way round.",

    neonEyebrow: "(02) Neon AI booth",
    neonTagline: "Cold light. Brand purple. The default for corporate energy.",
    neonBody:
      "Black metal frame, LED uplighting, touch-screen on the front. This is what we run at corporate parties, trade-show stands, and brand activations. Built for crowds — the throughput is tuned to keep the queue under five minutes at peak.",
    neonSpecs: [
      "Footprint: ~2×2 m",
      "Power: one standard 230 V outlet",
      "Throughput: up to 200 portraits / hour",
      "On-site host included",
      "Brand-purple LED · cool-light vibe",
    ],
    neonPriceFrom: "Boks from €490 · Branded from €890",

    iconEyebrow: "(03) Everybooth ICON 2",
    iconTag: "Spring 2026",
    iconTagline: "Warm wood. Handcrafted. The new default for weddings.",
    iconBody:
      "Light wood frame, neutral fabric finish, soft tungsten light. Manufactured by Everybooth, joining the PortrAI lineup in Spring 2026 specifically for weddings and premium private events. Same AI engine inside — radically different aesthetic outside.",
    iconSpecs: [
      "Footprint: ~2×2 m",
      "Power: one standard 230 V outlet",
      "Throughput: up to 120 portraits / hour",
      "On-site host included",
      "Warm tungsten · invitation-paper vibe",
    ],
    iconPriceFrom: "Pricing announced with launch · join the waitlist for 2026 dates",
    iconWaitlistCta: "Join the wedding waitlist",

    fotopeegelEyebrow: "(04) Fotopeegel",
    fotopeegelTagline: "The mirror booth — for gala evenings and stylised brand moments.",
    fotopeegelBody:
      "A full-length mirror with a camera and animated screen prompts behind it. Quieter than the AI booth, more theatrical. Often booked alongside the AI booth for events that want both energies in different rooms.",
    fotopeegelCta: "Read the full fotopeegel page",

    includedEyebrow: "(05) On every booth",
    included: [
      { title: "On-site host", body: "We run the queue, the energy and the after-pack." },
      { title: "Branded prints", body: "On-site printing with your event frame or our default." },
      { title: "Digital gallery", body: "Every photo to every guest via QR + a shared link the morning after." },
      { title: "GDPR opt-in", body: "Lead capture per guest with consent timestamps." },
      { title: "Fast setup", body: "40 minutes total from doors-closed to guests-arriving." },
      { title: "Liability insurance", body: "€100 000 cover for every event we deliver." },
    ],

    ctaTitle: "Pick the booth that fits the room.",
    ctaBody: "Or tell us about the event and we'll pick for you.",
    primaryCta: "Talk about your event",
    secondaryCta: "See pricing",
  },
  et: {
    eyebrow: "(01) PortrAI boksid",
    headline: "Kaks boksi. Üks meeskond.",
    sub: "Iga boks on tööriist. Meeskond teeb kogemuse. Vali boks, mis sobib saalile — mitte vastupidi.",

    neonEyebrow: "(02) Neoon AI boks",
    neonTagline: "Külm valgus. Brändi purpur. Vaikevalik firma-energiale.",
    neonBody:
      "Must metallraam, LED-valgustus, puutetundlik ekraan. See on, mida me jookseme firmapidudel, messistandidel ja brändi-aktivatsioonides. Tehtud rahvahulkadele — läbilask on häälestatud, et järjekord jääks tipus alla viie minuti.",
    neonSpecs: [
      "Pind: ~2×2 m",
      "Vool: üks standardne 230 V pistik",
      "Läbilask: kuni 200 portreed tunnis",
      "Kohapealne host sees",
      "Brändi-purpur LED · külm valguse-vibe",
    ],
    neonPriceFrom: "Boks alates 490 € · Branded alates 890 €",

    iconEyebrow: "(03) Everybooth ICON 2",
    iconTag: "Kevad 2026",
    iconTagline: "Soe puit. Käsitsi valmistatud. Uus vaikevalik pulmadele.",
    iconBody:
      "Hele puidust raam, neutraalne kanga viimistlus, pehme tungsten-valgus. Tootja Everybooth — liitub PortrAI valikuga kevadel 2026 spetsiifiliselt pulmade ja premium-eraürituste jaoks. Sama AI-mootor sees — radikaalselt teine esteetika väljaspool.",
    iconSpecs: [
      "Pind: ~2×2 m",
      "Vool: üks standardne 230 V pistik",
      "Läbilask: kuni 120 portreed tunnis",
      "Kohapealne host sees",
      "Soe tungsten · kutsete-paberi vibe",
    ],
    iconPriceFrom: "Hinnad teatame koos lansseerimisega · liitu 2026 kuupäevade ootejärjekorraga",
    iconWaitlistCta: "Liitu pulma ootejärjekorraga",

    fotopeegelEyebrow: "(04) Fotopeegel",
    fotopeegelTagline: "Peegel-fotoboks — gala-õhtutele ja stiliseeritud brändi-hetkedele.",
    fotopeegelBody:
      "Täismõõdus peegel, mille taga on kaamera ja animeeritud ekraani-juhised. Vaiksem kui AI-boks, teatraalsem. Tihti broneeritakse koos AI-boksiga — eri ruumid, eri energiad.",
    fotopeegelCta: "Loe terve fotopeegli leht",

    includedEyebrow: "(05) Igal boksil sees",
    included: [
      { title: "Kohapealne host", body: "Me hoiame järjekorda, energiat ja peale-pakkimist." },
      { title: "Bränditud prindid", body: "Kohapealne printimine sinu ürituse raami või meie vaikeraamiga." },
      { title: "Digi-galerii", body: "Iga pilt igale külalisele QR-i kaudu + jagatud link hommikuks." },
      { title: "GDPR opt-in", body: "Leadide kogumine iga külalise jaoks koos nõusoleku ajatemplitega." },
      { title: "Kiire setup", body: "40 minutit kokku uste-sulgemisest külaliste-saabumiseni." },
      { title: "Vastutuskindlustus", body: "100 000 € kate iga ürituse jaoks, mille me tarnime." },
    ],

    ctaTitle: "Vali boks, mis sobib saalile.",
    ctaBody: "Või räägi meile üritusest ja me valime sinu eest.",
    primaryCta: "Räägi oma üritusest",
    secondaryCta: "Vaata hindu",
  },
} as const;

export default async function BoothsPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/boksid")}`;

  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: locale === "en" ? "Booths" : "Boksid", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />

      {/* Hero — split-screen MSCHF moment: Neon left, ICON 2 right */}
      <section className="relative isolate overflow-hidden border-b border-[color:var(--color-stroke-subtle)] px-6 pb-12 pt-24 md:px-12 md:pt-32">
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
          {copy.sub}
        </p>

        {/* Split-vibe visual composite */}
        <div className="relative grid overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)] md:grid-cols-2">
          {/* Left half — neon */}
          <div
            className="relative flex aspect-[3/4] flex-col justify-end p-6 md:aspect-auto md:min-h-[420px] md:p-10"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(121,72,255,0.45), transparent 60%), radial-gradient(circle at 50% 80%, rgba(255,162,255,0.22), transparent 60%), linear-gradient(180deg, #0A1232, #02091E)",
            }}
          >
            <ImagePlaceholder
              description="Neon AI booth — black metal frame, brand-purple LED uplighting, touch screen front, isolated on dark backdrop"
              className="absolute inset-0 h-full w-full opacity-30"
              showTag={false}
            />
            <div className="relative z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-brand-accent)]">
                {copy.neonEyebrow}
              </p>
              <p className="mt-2 font-medium text-white" style={{ fontSize: "var(--text-title)" }}>
                {copy.neonTagline}
              </p>
            </div>
          </div>

          {/* Right half — ICON 2 (warm wood) */}
          <div
            className="relative flex aspect-[3/4] flex-col justify-end border-t border-[color:var(--color-stroke-subtle)] p-6 md:aspect-auto md:min-h-[420px] md:border-l md:border-t-0 md:p-10"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(232,184,124,0.32), transparent 60%), linear-gradient(180deg, #2A1F14, #0F0A06)",
            }}
          >
            <ImagePlaceholder
              description="Everybooth ICON 2 — handcrafted light-wood photo booth, neutral fabric finish, warm tungsten light, isolated on dark backdrop"
              className="absolute inset-0 h-full w-full opacity-30"
              showTag={false}
            />
            <div className="relative z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8B87C]">
                {copy.iconEyebrow}{" · "}
                <span className="rounded-full border border-[#E8B87C]/40 bg-[#E8B87C]/15 px-2 py-0.5 text-[#E8B87C]">
                  {copy.iconTag}
                </span>
              </p>
              <p className="mt-2 font-medium text-white" style={{ fontSize: "var(--text-title)" }}>
                {copy.iconTagline}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ProofMicrocopy locale={locale} variant="clients" />
        </div>
      </section>

      {/* (02) Neon AI booth — full section */}
      <section
        id="neon"
        className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
              {copy.neonEyebrow}
            </p>
            <h2
              className="mb-6 font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.neonTagline}
            </h2>
            <p
              className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.neonBody}
            </p>
            <ul className="mb-8 flex flex-col gap-2">
              {copy.neonSpecs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)]"
                >
                  <span className="text-[color:var(--color-brand-accent)]">·</span>
                  {spec}
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white">
              {copy.neonPriceFrom}
            </p>
          </div>
          <ImagePlaceholder
            description="Neon AI booth — product shot, 3/4 angle, isolated on dark studio backdrop, brand-purple LED uplighting visible"
            className="aspect-[3/4] rounded-3xl"
          />
        </div>
      </section>

      {/* (03) ICON 2 — full section */}
      <section
        id="icon-2"
        className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <ImagePlaceholder
            description="Everybooth ICON 2 — handcrafted wooden photo booth, light wood with neutral fabric, soft tungsten light, isolated on dark studio backdrop"
            className="aspect-[3/4] rounded-3xl"
          />
          <div>
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#E8B87C]">
              {copy.iconEyebrow}
              <span className="rounded-full border border-[#E8B87C]/40 bg-[#E8B87C]/15 px-2 py-0.5 text-[#E8B87C]">
                {copy.iconTag}
              </span>
            </p>
            <h2
              className="mb-6 font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.iconTagline}
            </h2>
            <p
              className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.iconBody}
            </p>
            <ul className="mb-8 flex flex-col gap-2">
              {copy.iconSpecs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)]"
                >
                  <span className="text-[#E8B87C]">·</span>
                  {spec}
                </li>
              ))}
            </ul>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-white">
              {copy.iconPriceFrom}
            </p>
            <MagneticButton>
              <Link
                href="/pulma-fotoboks"
                className="inline-block rounded-full border border-[#E8B87C]/60 bg-[#E8B87C]/10 px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#E8B87C]/20"
              >
                {copy.iconWaitlistCta} →
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* (04) Fotopeegel — slimmer section, routes to /fotopeegel */}
      <section
        id="fotopeegel"
        className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
              {copy.fotopeegelEyebrow}
            </p>
            <h2
              className="mb-6 font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.fotopeegelTagline}
            </h2>
            <p
              className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.fotopeegelBody}
            </p>
            <Link
              href="/fotopeegel"
              className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-base)]"
            >
              {copy.fotopeegelCta} →
            </Link>
          </div>
          <ImagePlaceholder
            description="Hero photo: PortrAI fotopeegel mirror booth, elegant gala setting"
            className="aspect-[4/5] rounded-3xl"
          />
        </div>
      </section>

      {/* (05) On every booth — included items + SLA badges */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.includedEyebrow}
        </p>
        <div className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {copy.included.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-2 border-l border-[color:var(--color-brand-primary)] pl-5"
            >
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <SlaBadges locale={locale} />
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
        <div className="flex flex-wrap gap-4">
          <MagneticButton>
            <BookingTrigger
              className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-strong)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.primaryCta} →
            </BookingTrigger>
          </MagneticButton>
          <Link
            href={"/hinnad" as "/hinnad" | "/pricing"}
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-8 py-4 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.secondaryCta} →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
