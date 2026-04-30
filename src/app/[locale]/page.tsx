import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero />
      <ShowcaseReel />
      <Awards />
      <Metrics />
      <FeaturedWork />
      <International />
      <Testimonials />
      <CallToAction />
      <FAQ />
    </PageShell>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  const t = useTranslations("home.hero");
  const tMeta = useTranslations("meta");
  const tSection = useTranslations("home.section");

  return (
    <section className="relative flex min-h-[80vh] flex-col items-start justify-center gap-8 px-6 py-24 md:min-h-[88vh] md:px-12">
      <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        (01) — {tSection("tagline")}
      </p>

      {/* Cursor-reveal portrait placeholder — replaced in Phase 5 with WebGL */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:right-12 md:block">
        <div className="flex h-[480px] w-[360px] items-center justify-center rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)]">
          <p className="text-center font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            Cursor-reveal<br />portrait shader<br />[Phase 5]
          </p>
        </div>
      </div>

      <h1
        className="max-w-4xl font-medium leading-none tracking-tight"
        style={{ fontSize: "var(--text-display-xl)" }}
      >
        {t("headline")}
        <br />
        <span className="bg-gradient-to-r from-[color:var(--color-brand-primary)] via-[color:var(--color-brand-secondary)] to-[color:var(--color-brand-accent)] bg-clip-text text-transparent">
          {t("headlineLine2")}
        </span>
      </h1>

      <p
        className="max-w-xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("leadIn")}
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/kontakt"
          className="rounded-md bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
        >
          {t("cta")}
        </Link>
        <Link
          href="/tood"
          className="rounded-md border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
        >
          {t("ctaSecondary")}
        </Link>
      </div>

      <p className="mt-8 hidden font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)] md:block">
        {tMeta("tagline")}
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SHOWCASE REEL                                                               */
/* -------------------------------------------------------------------------- */

function ShowcaseReel() {
  const t = useTranslations("home");
  const tSection = useTranslations("home.section");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] py-20">
      <div className="mb-8 flex items-center justify-between px-6 md:px-12">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          {tSection("showcase")}
        </p>
        <Link
          href="/tood"
          className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] underline-offset-4 transition-all hover:text-white hover:underline"
        >
          {t("showcase.viewAll")} →
        </Link>
      </div>

      <h2
        className="mb-12 max-w-3xl px-6 font-medium leading-tight tracking-tight md:px-12"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {t("showcase.title")}
      </h2>

      {/* Marquee placeholder — Phase 5 turns this into an infinite loop */}
      <div className="overflow-hidden">
        <div className="flex gap-6 px-6 md:px-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex aspect-[3/4] w-[280px] flex-shrink-0 items-center justify-center rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)] md:w-[360px]"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                Project {String(i).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* AWARDS                                                                       */
/* -------------------------------------------------------------------------- */

function Awards() {
  const t = useTranslations("home.awards");
  const tSection = useTranslations("home.section");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {tSection("awards")}
      </p>
      <h2
        className="mb-4 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {t("title")}
      </h2>
      <p
        className="mb-12 max-w-2xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("subtitle")}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {[
          { label: "Booth Mastermind Awards 2024", title: t("best_ai") },
          { label: "Booth Mastermind Awards 2024", title: t("best_newcomer") },
        ].map((award, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-lg border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-8 transition-all hover:border-[color:var(--color-brand-primary)]/40 hover:shadow-[var(--glow-soft)]"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
              ★ {award.label}
            </p>
            <p
              className="font-medium leading-tight"
              style={{ fontSize: "var(--text-headline)" }}
            >
              {award.title}
            </p>
            <p className="text-sm text-[color:var(--color-text-tertiary)]">
              Las Vegas, USA
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* METRICS                                                                      */
/* -------------------------------------------------------------------------- */

function Metrics() {
  const t = useTranslations("home.metrics");
  const tSection = useTranslations("home.section");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <p className="mb-12 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {tSection("metrics")}
      </p>
      <div className="grid gap-12 md:grid-cols-3">
        {[
          { value: "200+", label: t("events") },
          { value: "7", label: t("countries") },
          { value: "50K+", label: t("prints") },
        ].map((m, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border-l border-[color:var(--color-brand-primary)] pl-6"
          >
            <p
              className="font-mono font-medium tabular-nums leading-none"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              {m.value}
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FEATURED WORK                                                                */
/* -------------------------------------------------------------------------- */

function FeaturedWork() {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <h2
        className="mb-12 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-md)" }}
      >
        {t("showcase.title")}
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { client: "Postimees", event: "Laulupidu", year: "2024" },
          { client: "Von Fock", event: "Brand activation", year: "2024" },
          { client: "MELT", event: "Innovation forum", year: "2024" },
        ].map((p, i) => (
          <Link
            key={i}
            href="/tood"
            className="group flex flex-col gap-3"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)] transition-all duration-300 group-hover:border-[color:var(--color-brand-primary)]/40 group-hover:shadow-[var(--glow-soft)]">
              <div className="flex h-full items-center justify-center">
                <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                  {p.client}
                </p>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="font-medium">{p.client}</p>
              <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                {p.year}
              </p>
            </div>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              {p.event}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* INTERNATIONAL                                                                */
/* -------------------------------------------------------------------------- */

function International() {
  const t = useTranslations("home.international");
  const tSection = useTranslations("home.section");

  const countries = [
    { code: "EE", city: "Tallinn" },
    { code: "FI", city: "Helsinki" },
    { code: "DE", city: "Berlin" },
    { code: "LV", city: "Riga" },
    { code: "PL", city: "Warsaw" },
    { code: "BE", city: "Brussels" },
    { code: "US", city: "Las Vegas" },
  ];

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {tSection("international")}
      </p>
      <h2
        className="mb-4 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {t("title")}
      </h2>
      <p
        className="mb-12 max-w-2xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("subtitle")}
      </p>

      {/* World map placeholder — Phase 5 replaces with SVG + pulsing dots */}
      <div className="mb-8 flex aspect-[16/7] items-center justify-center rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)]">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          World map with pulsing project dots [Phase 5]
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {countries.map((c) => (
          <div
            key={c.code}
            className="flex items-center gap-2 rounded-full border border-[color:var(--color-stroke-medium)] px-4 py-2 font-mono text-xs uppercase tracking-wider"
          >
            <span className="text-[color:var(--color-brand-accent)]">
              {c.code}
            </span>
            <span>—</span>
            <span className="text-[color:var(--color-text-secondary)]">
              {c.city}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* TESTIMONIALS                                                                  */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  const t = useTranslations("home.testimonials");
  const tSection = useTranslations("home.section");

  // Placeholder testimonials — replaced with real ones from E3 task
  const items = [
    {
      quote:
        "PortrAI muutis meie ürituse külalised räägivad veel kuid hiljem. AI lahendus oli täpselt see, mida vajasime.",
      name: "Eve Kärner",
      role: "Demo Area Coordinator, Tallinna Strateegiakeskus",
    },
    {
      quote:
        "Esimene fotoboks, mille tellimine tundub investeering — ei kulutus.",
      name: "[Placeholder]",
      role: "[Awaiting testimonial — task E3]",
    },
    {
      quote:
        "Kvaliteet ja kiirus on hämmastav. Iga külaline sai eksklusiivse kunstiteose.",
      name: "[Placeholder]",
      role: "[Awaiting testimonial — task E3]",
    },
  ];

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {tSection("testimonials")}
      </p>
      <h2
        className="mb-12 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-md)" }}
      >
        {t("title")}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <figure
            key={i}
            className="flex flex-col gap-6 rounded-lg border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-8"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
              ★★★★★
            </p>
            <blockquote
              className="leading-relaxed"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              "{item.quote}"
            </blockquote>
            <figcaption className="mt-auto flex flex-col gap-1 border-t border-[color:var(--color-stroke-subtle)] pt-4">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {item.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                          */
/* -------------------------------------------------------------------------- */

function CallToAction() {
  const t = useTranslations("home.cta");
  const tSection = useTranslations("home.section");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {tSection("cta")}
      </p>
      <div className="flex flex-col items-start gap-8">
        <h2
          className="max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          {t("title")}
        </h2>
        <p
          className="max-w-xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {t("subtitle")}
        </p>
        <Link
          href="/kontakt"
          className="rounded-md bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-strong)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {t("button")} →
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                           */
/* -------------------------------------------------------------------------- */

function FAQ() {
  const tSection = useTranslations("home.section");

  // Placeholder FAQ — replaced with real questions from E7 task
  const items = [
    {
      q: "Kuidas AI fotoboks töötab?",
      a: "[Placeholder — awaiting copy from task E7]",
    },
    {
      q: "Kas saame brändida fotoboksi oma ettevõtte kujundusega?",
      a: "[Placeholder — awaiting copy from task E7]",
    },
    {
      q: "Mis on hind?",
      a: "[Placeholder — awaiting copy from task E7]",
    },
    {
      q: "Kui kiiresti pildid valmis saavad?",
      a: "[Placeholder — awaiting copy from task E7]",
    },
  ];

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <p className="mb-12 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {tSection("faq")}
      </p>
      <div className="grid gap-12 md:grid-cols-[300px_1fr]">
        <h2
          className="font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          FAQ
        </h2>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <details
              key={i}
              className="group border-b border-[color:var(--color-stroke-subtle)] py-6"
            >
              <summary className="flex cursor-pointer items-baseline justify-between gap-4 font-medium transition-colors hover:text-[color:var(--color-brand-accent)]">
                <span style={{ fontSize: "var(--text-title)" }}>{item.q}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-[color:var(--color-text-secondary)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
