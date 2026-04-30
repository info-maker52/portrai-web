import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";

// Placeholder data until real case studies arrive (Task E1)
const PROJECTS = [
  { slug: "laulupidu", client: "Postimees", event: "Laulupidu", year: "2024", category: "festival" },
  { slug: "von-fock", client: "Von Fock", event: "Brand activation", year: "2024", category: "corporate" },
  { slug: "melt", client: "MELT", event: "Innovation forum", year: "2024", category: "corporate" },
  { slug: "demo-1", client: "Project [04]", event: "Wedding event", year: "2024", category: "wedding" },
  { slug: "demo-2", client: "Project [05]", event: "Trade show", year: "2024", category: "fair" },
  { slug: "demo-3", client: "Project [06]", event: "Corporate party", year: "2023", category: "corporate" },
  { slug: "demo-4", client: "Project [07]", event: "Wedding event", year: "2023", category: "wedding" },
  { slug: "demo-5", client: "Project [08]", event: "Trade show", year: "2023", category: "fair" },
  { slug: "demo-6", client: "Project [09]", event: "Corporate event", year: "2023", category: "corporate" },
];

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero />
      <Filters />
      <Grid />
    </PageShell>
  );
}

function Hero() {
  const t = useTranslations("work");
  return (
    <section className="px-6 pb-16 pt-20 md:px-12 md:pt-32">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        (01) — {t("tagline")}
      </p>
      <h1
        className="max-w-4xl font-medium leading-none tracking-tight"
        style={{ fontSize: "var(--text-display-xl)" }}
      >
        {t("title")}
      </h1>
    </section>
  );
}

function Filters() {
  const t = useTranslations("work.filters");
  const filters = [
    { key: "all", label: t("all"), active: true },
    { key: "wedding", label: t("wedding"), active: false },
    { key: "corporate", label: t("corporate"), active: false },
    { key: "fair", label: t("fair"), active: false },
    { key: "festival", label: t("festival"), active: false },
  ];

  return (
    <div className="flex flex-wrap gap-3 border-t border-[color:var(--color-stroke-subtle)] px-6 py-6 md:px-12">
      {filters.map((f) => (
        <button
          key={f.key}
          className={
            "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all " +
            (f.active
              ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)] text-white"
              : "border-[color:var(--color-stroke-medium)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-stroke-strong)] hover:text-white")
          }
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function Grid() {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-12 md:px-12">
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <Link
            key={p.slug}
            href={`/tood/${p.slug}`}
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
