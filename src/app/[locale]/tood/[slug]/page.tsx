import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";

// Placeholder — will read from MDX in /content/work/{slug}.mdx (Phase 4)
const PROJECTS: Record<
  string,
  { client: string; event: string; year: string; service: string; brief: string; awards?: string[] }
> = {
  laulupidu: {
    client: "Postimees",
    event: "Laulupidu",
    year: "2024",
    service: "PortrAI fotoboks",
    brief:
      "[Placeholder brief — awaiting copy from task E1 BRIEF.txt] Laulupidu is one of Estonia's largest and most iconic cultural events. PortrAI delivered an AI photo booth experience that captured the spirit of the festival.",
  },
  "von-fock": {
    client: "Von Fock",
    event: "Brand activation",
    year: "2024",
    service: "Erilahendus",
    brief:
      "[Placeholder brief — awaiting copy from task E1 BRIEF.txt] Award-winning brand activation campaign for Von Fock featuring custom AI portrait styles tailored to the brand identity.",
    awards: ["Booth Mastermind Awards 2024 — Best AI Photo Solution"],
  },
  melt: {
    client: "MELT",
    event: "Innovation forum",
    year: "2024",
    service: "Messilahendus",
    brief:
      "[Placeholder brief — awaiting copy from task E1 BRIEF.txt] Two distinct AI photo booth installations at Tallinn's MELT innovation forum.",
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).flatMap((slug) =>
    ["et", "en"].map((locale) => ({ locale, slug })),
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <PageShell>
        <section className="px-6 py-32 md:px-12">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            404
          </p>
          <h1
            className="mt-4 font-medium"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            Project not found.
          </h1>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <CaseStudyHero project={project} />
      <Brief brief={project.brief} />
      <Gallery />
      <PullQuote />
      <NextProject />
    </PageShell>
  );
}

function CaseStudyHero({
  project,
}: {
  project: (typeof PROJECTS)[string];
}) {
  const t = useTranslations("caseStudy");

  return (
    <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
      <Link
        href="/tood"
        className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
      >
        ← {t("back")}
      </Link>

      <div className="mb-12 grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
            {project.event}
          </p>
          <h1
            className="font-medium leading-none tracking-tight"
            style={{ fontSize: "var(--text-display-xl)" }}
          >
            {project.client}
          </h1>
        </div>

        <dl className="grid grid-cols-2 gap-6 self-end font-mono text-xs uppercase tracking-wider md:grid-cols-1">
          <Meta label={t("client")} value={project.client} />
          <Meta label={t("event")} value={project.event} />
          <Meta label={t("year")} value={project.year} />
          <Meta label={t("service")} value={project.service} />
        </dl>
      </div>

      {/* Hero image placeholder */}
      <div className="aspect-[16/9] overflow-hidden rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)]">
        <div className="flex h-full items-center justify-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            Hero image — {project.client}
          </p>
        </div>
      </div>

      {project.awards && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.awards.map((a, i) => (
            <p
              key={i}
              className="rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]"
            >
              ★ {a}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[color:var(--color-text-tertiary)]">{label}</dt>
      <dd className="text-white">{value}</dd>
    </div>
  );
}

function Brief({ brief }: { brief: string }) {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          (01) — Brief
        </p>
        <p
          className="max-w-3xl leading-relaxed"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {brief}
        </p>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="mb-8 grid gap-8 md:grid-cols-[300px_1fr]">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          (02) — Gallery
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        {[
          { col: "md:col-span-8", aspect: "aspect-[3/2]" },
          { col: "md:col-span-4", aspect: "aspect-[3/4]" },
          { col: "md:col-span-4", aspect: "aspect-[3/4]" },
          { col: "md:col-span-4", aspect: "aspect-[3/4]" },
          { col: "md:col-span-4", aspect: "aspect-[3/4]" },
          { col: "md:col-span-12", aspect: "aspect-[2/1]" },
        ].map((cell, i) => (
          <div
            key={i}
            className={`${cell.col} ${cell.aspect} flex items-center justify-center rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)]`}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
              Image {String(i + 1).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          (03) — Quote
        </p>
        <figure className="flex flex-col gap-6">
          <blockquote
            className="max-w-4xl font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            "[Placeholder client quote — awaiting from task E3]"
          </blockquote>
          <figcaption className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            — [Client name], [Role]
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function NextProject() {
  const t = useTranslations("caseStudy");
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <Link
        href="/tood"
        className="group flex items-baseline justify-between"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] group-hover:text-white">
          {t("next")}
        </span>
        <span
          className="font-medium leading-tight tracking-tight transition-colors group-hover:text-[color:var(--color-brand-accent)]"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          [Next] →
        </span>
      </Link>
    </section>
  );
}
