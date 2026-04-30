import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero />
      <Services />
      <CallToAction />
    </PageShell>
  );
}

function Hero() {
  const t = useTranslations("services");
  return (
    <section className="px-6 pb-12 pt-20 md:px-12 md:pb-20 md:pt-32">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        (02) — {t("tagline")}
      </p>
      <h1
        className="mb-6 max-w-4xl font-medium leading-none tracking-tight"
        style={{ fontSize: "var(--text-display-xl)" }}
      >
        {t("title")}
      </h1>
      <p
        className="max-w-2xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("intro")}
      </p>
    </section>
  );
}

function Services() {
  const t = useTranslations("services.items");
  const services = [
    {
      number: "01",
      key: "booth" as const,
      title: t("booth.title"),
      summary: t("booth.summary"),
      features: t.raw("booth.features") as string[],
    },
    {
      number: "02",
      key: "fairs" as const,
      title: t("fairs.title"),
      summary: t("fairs.summary"),
      features: t.raw("fairs.features") as string[],
    },
    {
      number: "03",
      key: "custom" as const,
      title: t("custom.title"),
      summary: t("custom.summary"),
      features: t.raw("custom.features") as string[],
    },
  ];

  return (
    <section>
      {services.map((s) => (
        <div
          key={s.key}
          className="grid gap-8 border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:grid-cols-[1fr_2fr] md:gap-16 md:px-12"
        >
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
              {s.number}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {s.title}
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <p
              className="max-w-2xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {s.summary}
            </p>

            <ul className="grid gap-3 md:grid-cols-2">
              {s.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
                    ↳
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Image placeholder — replaced with gallery in Phase 4 */}
            <div className="aspect-[16/9] overflow-hidden rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)]">
              <div className="flex h-full items-center justify-center">
                <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                  Service gallery — {s.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function CallToAction() {
  const t = useTranslations("home.cta");
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
      <h2
        className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {t("title")}
      </h2>
      <p
        className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("subtitle")}
      </p>
      <Link
        href="/kontakt"
        className="inline-block rounded-md bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
      >
        {t("button")} →
      </Link>
    </section>
  );
}
