import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CursorRevealHero } from "@/components/hero/CursorRevealHero";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ShowcaseMarquee } from "@/components/showcase/ShowcaseMarquee";
import { WorldMap } from "@/components/world/WorldMap";
import { type SiteLocale } from "@/lib/site-content";

/**
 * Home is a hub. It does ONE thing: route the visitor to the path that
 * matches their job — marketing/brand activation OR fun events.
 *
 * Sections (top to bottom):
 *   1. Hero with cursor-reveal portrait + two-path CTAs (equal weight)
 *   2. Two-paths picker (the decision moment, big visual cards)
 *   3. Showcase marquee
 *   4. Awards strip
 *   5. Reach + metrics + world map
 *   6. Booking CTA
 *
 * Process, FAQ, partner wall, case-study structure live on the path
 * subpages — they're contextual to which job-to-be-done you're on.
 *
 * NOTE: Estonian copy is DRAFT — needs Reijo's native pass.
 */

const COPY = {
  en: {
    heroEyebrow: "(01) AI photo booth",
    heroHeadline:
      "AI photo booth that makes your event the talk of the room.",
    heroSub:
      "Award-winning in Las Vegas. Trusted by ERR, Postimees, Telia, Swedbank — and a hundred company parties.",
    heroPathMarketing: "For brands & marketing",
    heroPathEvents: "For company parties & events",

    pathsEyebrow: "(02) Two ways we work",
    pathsTitle: "Pick your path.",

    marketingCardEyebrow: "Brands & marketing",
    marketingCardTitle: "Brand activation that's actually measurable.",
    marketingCardBody:
      "Lead generation, branded UGC, GDPR-clean data — every touch-point in your design language. We come from a marketing background, so the booth solves the campaign problem behind it.",
    marketingCardStat: "681K images · Von Fock (ERR campaign)",
    marketingCardCta: "See the marketing path",

    eventsCardEyebrow: "Parties & events",
    eventsCardTitle: "The booth your guests will talk about for weeks.",
    eventsCardBody:
      "Estonia's largest theme catalog. Live gallery on the screen. Interactive themes that let guests shape the photos. An on-site host who keeps the energy up.",
    eventsCardStat:
      '"The most impactful photo booth experience in 20 years." — Aivar Kuusk',
    eventsCardCta: "See the events path",

    showcaseEyebrow: "(03) Recent work",
    showcaseTitle: "What we've made.",
    showcaseAll: "All work",

    awardsEyebrow: "(04) Awards",
    awardsTitle: "Award-winning.",
    awardsBody:
      "First in the Baltics to win Booth Mastermind Awards in Las Vegas — in two categories.",
    awardsBadges: [
      "Best AI photo solution · Booth Mastermind Awards",
      "Best newcomer in the photo booth world · Booth Mastermind Awards",
    ],

    reachEyebrow: "(05) Where we've delivered",
    reachTitle: "Estonia is home. The work travels.",
    reachBody:
      "Beyond Estonia, PortrAI has been delivered in Finland, Germany, Latvia, Poland, Belgium and the USA.",
    reachMetrics: [
      { value: "780K+", label: "Photos generated across campaigns" },
      { value: "7", label: "Countries delivered in" },
      { value: "200+", label: "Events activated" },
    ],

    ctaEyebrow: "(06) Talk to us",
    ctaTitle: "Tell us about your event.",
    ctaBody: "We respond within 24 hours.",
    ctaButton: "Book PortrAI",
  },
  et: {
    // [ET DRAFT — needs your native pass]
    heroEyebrow: "(01) AI fotoboks",
    heroHeadline: "AI fotoboks, millest külalised räägivad veel kuid hiljem.",
    heroSub:
      "Auhinnatud Las Vegases. Kasutusel ERR-is, Postimehes, Telias ja Swedbankis — lisaks sadadel firmapidudel ja eraüritustel.",
    heroPathMarketing: "Brändidele ja turundusele",
    heroPathEvents: "Firmapidudele ja eraüritustele",

    pathsEyebrow: "(02) Kahel viisil töötame",
    pathsTitle: "Vali oma rada.",

    marketingCardEyebrow: "Brändid ja turundus",
    marketingCardTitle: "Brändi-aktivatsioon, mida saab tegelikult mõõta.",
    marketingCardBody:
      "Leadid, jagatav UGC, GDPR-iga puhtad andmed — iga puutepunkt sinu disainikeeles. Tuleme turundustaustast, seega boks lahendab kampaania-probleemi, mis on selle taga.",
    marketingCardStat: "681K pilti · Von Fock (ERR kampaania)",
    marketingCardCta: "Vaata turundus-rada",

    eventsCardEyebrow: "Peod ja üritused",
    eventsCardTitle: "Boks, millest külalised räägivad veel kuid hiljem.",
    eventsCardBody:
      "Eesti suurim teemakogum. Live-galerii ekraanil. Interaktiivsed teemad, kus külalised piltide tulemust mõjutavad. Kohapealne host, kes hoiab energia üleval.",
    eventsCardStat:
      '"Kõige mõjuvam fotoboksi-elamus 20 aasta jooksul." — Aivar Kuusk',
    eventsCardCta: "Vaata peo-rada",

    showcaseEyebrow: "(03) Hiljutised tööd",
    showcaseTitle: "Mida oleme teinud.",
    showcaseAll: "Kõik tööd",

    awardsEyebrow: "(04) Auhinnad",
    awardsTitle: "Auhinnatud.",
    awardsBody:
      "Esimene Balti riikidest võitnud Booth Mastermind Awardsi Las Vegases — kahes kategoorias.",
    awardsBadges: [
      "Parim AI-fotolahendus · Booth Mastermind Awards",
      "Parim uustulnuk fotoboksi maailmas · Booth Mastermind Awards",
    ],

    reachEyebrow: "(05) Kus oleme töötanud",
    reachTitle: "Eesti on kodu. Töö rändab.",
    reachBody:
      "Peale Eesti oleme PortrAI lahendusi pakkunud Soomes, Saksamaal, Lätis, Poolas, Belgias ja USAs.",
    reachMetrics: [
      { value: "780K+", label: "Pilti loodud kampaaniates" },
      { value: "7", label: "Riiki, kus oleme töötanud" },
      { value: "200+", label: "Üritust" },
    ],

    ctaEyebrow: "(06) Räägi meiega",
    ctaTitle: "Räägi meile oma üritusest.",
    ctaBody: "Vastame 24 tunni jooksul.",
    ctaButton: "Broneeri PortrAI",
  },
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  const marketingHref = locale === "en" ? "/marketing" : "/turundus";
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
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href={marketingHref}
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.heroPathMarketing} →
                </Link>
              </MagneticButton>
              <MagneticButton strength={8}>
                <Link
                  href={eventsHref}
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.heroPathEvents} →
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Cursor-reveal portrait — Direction B centerpiece */}
          <div className="relative h-[60vh] min-h-[420px] self-center overflow-hidden rounded-2xl lg:h-[78vh]">
            <CursorRevealHero
              baseTexture="/images/hero/portrait-base.png"
              revealTexture="/images/hero/portrait-reveal.png"
            />
          </div>
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
            href={marketingHref}
            eyebrow={copy.marketingCardEyebrow}
            title={copy.marketingCardTitle}
            body={copy.marketingCardBody}
            stat={copy.marketingCardStat}
            cta={copy.marketingCardCta}
          />
          <PathCard
            href={eventsHref}
            eyebrow={copy.eventsCardEyebrow}
            title={copy.eventsCardTitle}
            body={copy.eventsCardBody}
            stat={copy.eventsCardStat}
            cta={copy.eventsCardCta}
          />
        </div>
      </section>

      {/* 3 — Showcase marquee */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] py-20">
        <div className="mb-8 flex items-center justify-between px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.showcaseEyebrow}
          </p>
          <Link
            href="/tood"
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

      {/* 4 — Awards strip */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
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
          className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.awardsBody}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {copy.awardsBadges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-[color:var(--color-brand-primary)]/30 bg-[color:var(--color-brand-primary)]/5 p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-brand-primary)]/15 font-mono text-lg text-[color:var(--color-brand-accent)]">
                ★
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white">
                {badge}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — Reach + metrics */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
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

      {/* 6 — Booking CTA */}
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
}: {
  href: "/turundus" | "/peod" | "/marketing" | "/events";
  eyebrow: string;
  title: string;
  body: string;
  stat: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-6 rounded-3xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-8 transition-all duration-300 hover:border-[color:var(--color-brand-primary)]/40 hover:shadow-[var(--glow-medium)] md:p-10"
    >
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
      <p className="rounded-xl border border-[color:var(--color-brand-primary)]/20 bg-[color:var(--color-brand-primary)]/10 p-4 font-mono text-xs uppercase tracking-[0.18em] text-white">
        {stat}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white transition-colors group-hover:text-[color:var(--color-brand-accent)]">
        {cta} →
      </span>
    </Link>
  );
}
