import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CursorRevealHero } from "@/components/hero/CursorRevealHero";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ShowcaseMarquee } from "@/components/showcase/ShowcaseMarquee";
import { WorldMap } from "@/components/world/WorldMap";
import {
  AIVAR_CREDIT,
  AIVAR_QUOTE,
  AWARD_BADGES,
  CTA,
  PRODUCT_LINES,
} from "@/lib/copy";
import { ProofMicrocopy } from "@/components/trust/ProofMicrocopy";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import { INTERNATIONAL_REACH, PARTNERSHIPS } from "@/lib/contact";
import { type SiteLocale, text } from "@/lib/site-content";

/**
 * Home page — the hub.
 *
 * Job in 8 seconds: tell the visitor what PortrAI is, hand them the
 * vocabulary, route them to the right path (Studio for marketing buyers,
 * Events for HR / planners / couples).
 *
 * Voice: Linear restraint in the H1, Snapbar peer-positioning in the sub,
 * one MSCHF moment in the (00) product primer.
 */

/**
 * Representative thumbnail per product line — surfaces on hover of the
 * primer card so the visitor learns what each tier *looks like* without
 * leaving the page. Keys must match `PRODUCT_LINES[*].id` from lib/copy.ts.
 */
const PRIMER_THUMBNAILS: Record<string, string> = {
  boks: "/images/site/portrait-base.png",
  branded: "/images/work/telia-rohekusimustik-cover.jpg",
  custom: "/images/work/swedbank-unistused-cover.jpg",
  widget: "/images/work/von-fock-cover.jpg",
};

const COPY = {
  en: {
    heroEyebrow: "(01) PortrAI · AI photo studio",
    heroHeadline: "An AI photo studio for brands, agencies and events.",
    heroSub:
      "From brief to booth, under one studio roof. Awarded by the Pronksmuna jury, ERR's Innovative Campaign jury, and the Booth Mastermind Las Vegas jury — and by guests at Swedbank, Telia, Synlab, ERR and Postimees.",
    heroPathMarketing: "For brands & marketing",
    heroPathEvents: "For events & parties",

    primerEyebrow: "(00) What we make",
    primerTitle: "Four shapes the studio takes.",

    pathsEyebrow: "(02) Two ways we work",
    pathsTitle: "Pick a path.",

    marketingCardEyebrow: "Studio · brands & agencies",
    marketingCardTitle: "Brand activations, not booth rentals.",
    marketingCardBody:
      "Campaign concepts with AI photo as the medium. Briefs from agencies, marketing teams, and brand owners — output ranges from booth to virtual widget to both.",
    marketingCardStat: "Swedbank · Synlab · Von Fock · Laulupidu",
    marketingCardCta: "Open the studio",

    eventsCardEyebrow: "Events · parties & weddings",
    eventsCardTitle: "The booth your team is still talking about on Monday.",
    eventsCardBody:
      "AI photo experiences for company parties, private events and weddings. On-site host, up to 200 portraits per hour, every photo delivered by dawn.",
    eventsCardStat: '"Täielik hitt — ürituse populaarseim osa."',
    eventsCardCta: "Open events",

    showcaseEyebrow: "(03) Recent work",
    showcaseTitle: "What we have made.",
    showcaseAll: "All work",

    awardsEyebrow: "(04) Awards",
    awardsTitle: "Graded by the juries your buyer recognises.",
    awardsBody:
      "Estonian marketing-industry awards first. The international photo-booth jury comes third — useful, but not what your CMO has heard of.",

    reachEyebrow: "(05) Reach",
    reachTitle: "Estonia is home. The work has travelled.",
    reachBody:
      "PortrAI is the official photobooth partner of the European Innovation Council Summit 2025–2026. Experiences also delivered in Finland, Germany, Latvia, Belgium, Poland and the USA.",
    reachMetrics: [
      { value: "780K+", label: "Portraits delivered" },
      { value: "7", label: "Countries shipped to" },
      { value: "200+", label: "Events activated" },
    ],

    quoteEyebrow: "(06) What organisers say",

    ctaEyebrow: "(07) Talk to us",
    ctaTitle: "Tell us about your event.",
    ctaBody: "We reply within 3 business hours.",
    ctaButton: "Get a quote",
  },
  et: {
    heroEyebrow: "(01) PortrAI · AI fotostuudio",
    heroHeadline: "AI fotostuudio brändidele, agentuuridele ja üritustele.",
    heroSub:
      "Briifist boksini, ühe stuudio katuse all. Auhinnatud Postimehe Laulupeo Pronksmuna, ERR-i Aasta innovaatilisema turunduskampaania ja Booth Mastermind Las Vegas żürii poolt — ning külaliste poolt Swedbankis, Telias, Synlabis, ERR-is ja Postimehes.",
    heroPathMarketing: "Brändidele ja turundusele",
    heroPathEvents: "Üritustele ja pidudele",

    primerEyebrow: "(00) Mida me teeme",
    primerTitle: "Neli kuju, milleks stuudio saab muutuda.",

    pathsEyebrow: "(02) Kahel viisil töötame",
    pathsTitle: "Vali rada.",

    marketingCardEyebrow: "Studio · brändid & agentuurid",
    marketingCardTitle: "Brändi-aktivatsioonid, mitte boksi rent.",
    marketingCardBody:
      "Kampaania-kontseptsioonid AI fotoga meediumina. Briifid agentuuridelt, turundustiimidelt ja brändi-omanikelt — väljund ulatub boksist virtuaalse widgetini ja mõlemast korraga.",
    marketingCardStat: "Swedbank · Synlab · Von Fock · Laulupidu",
    marketingCardCta: "Ava stuudio",

    eventsCardEyebrow: "Peod · firmad, pulmad, eraüritused",
    eventsCardTitle: "Boks, millest räägitakse esmaspäeval kontoris.",
    eventsCardBody:
      "AI fotokogemus firma-, era- ja pulmaüritustele. Kohapealne host, kuni 200 portreed tunnis, kõik pildid valmis öö lõpuks.",
    eventsCardStat: '„Täielik hitt — ürituse populaarseim osa."',
    eventsCardCta: "Ava peod",

    showcaseEyebrow: "(03) Hiljutised tööd",
    showcaseTitle: "Mida oleme teinud.",
    showcaseAll: "Kõik tööd",

    awardsEyebrow: "(04) Auhinnad",
    awardsTitle: "Hinnatud žüriide poolt, keda sinu ostja tunneb.",
    awardsBody:
      "Eesti turunduselt esimesena. Rahvusvaheline fotoboksi żürii kolmandana — kasulik, aga mitte see, millest sinu turundusjuht on kuulnud.",

    reachEyebrow: "(05) Kus oleme töötanud",
    reachTitle: "Eesti on kodu. Töö on rännanud.",
    reachBody:
      "PortrAI on European Innovation Council Summit 2025–2026 ametlik fotoboksi partner. Kogemusi oleme pakkunud ka Soomes, Saksamaal, Lätis, Belgias, Poolas ja USAs.",
    reachMetrics: [
      { value: "780K+", label: "Portreed tarnitud" },
      { value: "7", label: "Riiki, kuhu tarnisime" },
      { value: "200+", label: "Üritust" },
    ],

    quoteEyebrow: "(06) Mida korraldajad ütlevad",

    ctaEyebrow: "(07) Räägi meiega",
    ctaTitle: "Räägi meile oma üritusest.",
    ctaBody: "Vastame 3 töötunni jooksul.",
    ctaButton: "Küsi pakkumist",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "PortrAI — AI photo studio for brands and events"
        : "PortrAI — AI fotostuudio brändidele ja üritustele",
    description:
      locale === "en"
        ? "An AI photo studio for Estonian brands, agencies and events. From booth to virtual widget, from brief to award-winning campaign."
        : "AI fotostuudio Eesti brändidele, agentuuridele ja üritustele. Briifist boksini, boksist auhinnatud kampaaniani.",
    locale,
    ogImage: "/images/site/interactive-booth.png",
    path: localizedSitePath(locale, "/"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  const marketingHref = "/studio";
  const eventsHref = locale === "en" ? "/events" : "/peod";

  return (
    <PageShell>
      {/* 1 — Hero */}
      <section className="relative isolate overflow-hidden border-b border-[color:var(--color-stroke-subtle)] px-4 pb-16 pt-6 md:px-8 lg:px-12">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 20% 24%, rgba(121,72,255,0.14), transparent 18%), radial-gradient(circle at 78% 18%, rgba(255,162,255,0.10), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0) 26%)",
          }}
        />

        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.55fr)] lg:items-end">
          <div className="flex min-h-[64vh] flex-col justify-end gap-6 pb-6 lg:min-h-[78vh] lg:pb-12">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.heroEyebrow}
            </p>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)] backdrop-blur-sm">
              <span aria-hidden>★</span>
              {locale === "en"
                ? "Pronksmuna · Most Innovative Campaign · Booth Mastermind Las Vegas"
                : "Pronksmuna · Aasta innovaatilisem turunduskampaania · Booth Mastermind Las Vegas"}
            </p>
            <h1
              className="max-w-5xl font-medium leading-[1.04] tracking-tight"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              {copy.heroHeadline}
            </h1>
            <p
              className="max-w-2xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.heroSub}
            </p>
            <ProofMicrocopy locale={locale} variant="clients" />
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href={marketingHref as "/studio"}
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.heroPathMarketing} →
                </Link>
              </MagneticButton>
              <MagneticButton strength={8}>
                <Link
                  href={eventsHref as "/peod" | "/events"}
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.heroPathEvents} →
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Cursor-reveal portrait — kept as the signature centerpiece */}
          <div className="relative h-[60vh] min-h-[420px] self-center overflow-hidden rounded-2xl lg:h-[78vh]">
            <CursorRevealHero
              baseTexture="/images/hero/portrait-base.png"
              revealTexture="/images/hero/portrait-reveal.png"
            />
          </div>
        </div>
      </section>

      {/* (00) Product primer — each card carries a hidden representative
          thumbnail that fades in on hover so the buyer learns what the
          tier looks like visually, not just verbally. */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-16 md:px-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.primerEyebrow}
          </p>
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {copy.primerTitle}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_LINES.map((p) => {
            const thumb = PRIMER_THUMBNAILS[p.id];
            return (
              <Link
                key={p.id}
                href={"/studio" as "/studio"}
                className="group relative flex flex-col gap-3 border-l border-[color:var(--color-brand-primary)] pl-5 pr-20 transition-colors hover:border-[color:var(--color-brand-accent)] md:pr-24"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                  {text(locale, p.priceLabel)}
                </p>
                <p
                  className="font-medium leading-tight transition-colors group-hover:text-[color:var(--color-brand-accent)]"
                  style={{ fontSize: "var(--text-title)" }}
                >
                  {text(locale, p.name)}
                </p>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  {text(locale, p.body)}
                </p>
                {thumb && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 h-16 w-16 overflow-hidden rounded-xl border border-[color:var(--color-stroke-subtle)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 md:h-20 md:w-20"
                    style={{
                      backgroundImage: `url(${thumb})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2 — Two-paths picker */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.pathsEyebrow}
          </p>
          <h2
            className="max-w-3xl font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            {copy.pathsTitle}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PathCard
            href={marketingHref as "/studio"}
            eyebrow={copy.marketingCardEyebrow}
            title={copy.marketingCardTitle}
            body={copy.marketingCardBody}
            stat={copy.marketingCardStat}
            cta={copy.marketingCardCta}
            image="/images/work/von-fock-cover.jpg"
            imageAlt={
              locale === "en"
                ? "Von Fock AI campaign for ERR"
                : "Von Focki AI kampaania ERR-ile"
            }
          />
          <PathCard
            href={eventsHref as "/peod" | "/events"}
            eyebrow={copy.eventsCardEyebrow}
            title={copy.eventsCardTitle}
            body={copy.eventsCardBody}
            stat={copy.eventsCardStat}
            cta={copy.eventsCardCta}
            image="/images/work/melt-cover.png"
            imageAlt={
              locale === "en"
                ? "PortrAI booth at the MELT innovation forum"
                : "PortrAI boks MELT innovatsioonifoorumil"
            }
          />
        </div>
      </section>

      {/* 3 — Showcase marquee */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] py-20">
        <div className="mb-8 flex items-center justify-between px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.showcaseEyebrow}
          </p>
          <Link
            href={"/tood" as "/tood" | "/work"}
            className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {copy.showcaseAll} →
          </Link>
        </div>
        <h2
          className="mb-12 max-w-3xl px-6 font-medium leading-tight tracking-tight md:px-12"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.showcaseTitle}
        </h2>
        <ShowcaseMarquee locale={locale} />
      </section>

      {/* 4 — Awards (reordered: marketing-industry first, vendor third) */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.awardsEyebrow}
            </p>
            <h2
              className="mb-4 max-w-3xl font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              {copy.awardsTitle}
            </h2>
            <p
              className="mb-10 max-w-xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.awardsBody}
            </p>
            <div className="grid gap-4">
              {AWARD_BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-4 rounded-2xl border border-[color:var(--color-brand-primary)]/30 bg-[color:var(--color-brand-primary)]/5 p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-brand-primary)]/15 font-mono text-lg text-[color:var(--color-brand-accent)]">
                    ★
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-white">
                    {text(locale, badge.label)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real Las Vegas award photo */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]">
            <Image
              src="/images/awards/booth-mastermind-las-vegas.jpg"
              alt={
                locale === "en"
                  ? "PortrAI receiving the Booth Mastermind Award in Las Vegas"
                  : "PortrAI võtab vastu Booth Mastermind Awardi Las Vegases"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(2,9,30,0.85)] via-[rgba(2,9,30,0.18)] to-transparent p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/85">
                ★ Las Vegas · 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Reach + EUIC */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.reachEyebrow}
            </p>
            <h2
              className="mb-6 max-w-2xl font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.reachTitle}
            </h2>
            <p
              className="max-w-md text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.reachBody}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {PARTNERSHIPS.map((p) => (
                <p
                  key={p.id}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--color-brand-primary)]/30 bg-[color:var(--color-brand-primary)]/8 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]"
                >
                  <span aria-hidden>★</span>
                  {text(locale, p.label)}
                </p>
              ))}
              <p
                className="flex flex-wrap items-center gap-2 text-lg"
                aria-label={
                  locale === "en"
                    ? "Countries where PortrAI has delivered"
                    : "Riigid, kus PortrAI on töötanud"
                }
              >
                {INTERNATIONAL_REACH.map((c) => (
                  <span key={c.code} title={c.code}>
                    {c.flag}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="self-end">
            <WorldMap />
          </div>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {copy.reachMetrics.map((m, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-l border-[color:var(--color-brand-primary)] pl-6"
            >
              <p
                className="font-mono font-medium tabular-nums leading-none"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {m.value}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 — Aivar Kuusk quote */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-gradient-to-b from-[color:var(--color-surface-raised)] to-transparent px-6 py-24 md:px-12">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.quoteEyebrow}
        </p>
        <figure className="mx-auto max-w-4xl">
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
        </figure>
      </section>

      {/* 7 — Booking CTA */}
      <section className="px-6 py-32 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.ctaEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
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
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-strong)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.ctaButton} →
          </Link>
        </MagneticButton>
      </section>
    </PageShell>
  );
}

function PathCard({
  href,
  eyebrow,
  title,
  body,
  stat,
  cta,
  image,
  imageAlt,
}: {
  href: "/studio" | "/peod" | "/events";
  eyebrow: string;
  title: string;
  body: string;
  stat: string;
  cta: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-8 transition-all duration-300 hover:border-[color:var(--color-brand-primary)]/40 hover:shadow-[var(--glow-medium)] md:p-10"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-40 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(2,9,30,0.85)] via-[rgba(2,9,30,0.78)] to-[rgba(2,9,30,0.65)]" />
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
        {eyebrow}
      </p>
      <h3
        className="font-medium leading-[1.1] tracking-tight"
        style={{ fontSize: "var(--text-display-md)" }}
      >
        {title}
      </h3>
      <p
        className="text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {body}
      </p>
      <p className="rounded-xl border border-[color:var(--color-brand-primary)]/30 bg-[color:var(--color-brand-primary)]/15 p-4 font-mono text-xs uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        {stat}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white transition-colors group-hover:text-[color:var(--color-brand-accent)]">
        {cta} →
      </span>
    </Link>
  );
}
