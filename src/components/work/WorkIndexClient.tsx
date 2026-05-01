"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  projects,
  text,
  type PlaceholderProject,
  type ProjectCategory,
  type SiteLocale,
} from "@/lib/site-content";

type FilterKey = "all" | ProjectCategory;

export function WorkIndexClient({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("work.filters");
  const [active, setActive] = useState<FilterKey>("all");

  const filters: Array<{ key: FilterKey; label: string }> = [
    { key: "all", label: t("all") },
    { key: "wedding", label: t("wedding") },
    { key: "corporate", label: t("corporate") },
    { key: "fair", label: t("fair") },
    { key: "festival", label: t("festival") },
  ];

  const visibleProjects = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((project) => project.category === active);
  }, [active]);

  const intro =
    locale === "en"
      ? "Structured with seeded case-study copy, placeholder gallery slots, and category filters so the overall work architecture can be reviewed before final assets arrive."
      : "Leht on struktureeritud seemendatud case-study copy, placeholder-galeriide ja toimivate filtritega, et kogu toode arhitektuuri saaks hinnata enne loplike failide saabumist.";

  return (
    <>
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-8 md:px-12">
        <div className="mb-6 max-w-2xl text-[color:var(--color-text-secondary)]">
          {intro}
        </div>

        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const count =
              filter.key === "all"
                ? projects.length
                : projects.filter((project) => project.category === filter.key)
                    .length;

            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActive(filter.key)}
                className={
                  "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all " +
                  (active === filter.key
                    ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)] text-white"
                    : "border-[color:var(--color-stroke-medium)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-stroke-strong)] hover:text-white")
                }
              >
                {filter.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-12 md:px-12">
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} locale={locale} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectCard({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  return (
    <Link
      href={`/tood/${project.slug}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-5 transition-all duration-300 hover:border-[color:var(--color-brand-primary)]/40 hover:shadow-[var(--glow-soft)]"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
          {project.countryCode} - {project.year}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          {project.city}
        </p>
      </div>

      <div className="aspect-[4/5] overflow-hidden rounded-xl border border-dashed border-[color:var(--color-stroke-medium)] bg-[radial-gradient(circle_at_top,_rgba(121,72,255,0.18),_transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
        <div className="flex h-full flex-col justify-between p-5">
          <div className="self-start rounded-full border border-[color:var(--color-stroke-medium)] bg-black/20 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {text(locale, project.service)}
          </div>
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
              {text(locale, project.galleryLabel)}
            </p>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              {text(locale, project.summary)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-title)" }}
          >
            {project.client}
          </h2>
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            {project.countryCode}
          </p>
        </div>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          {text(locale, project.event)}
        </p>
      </div>

      <ul className="mt-auto space-y-2 border-t border-[color:var(--color-stroke-subtle)] pt-4">
        {project.deliverables.slice(0, 2).map((item) => (
          <li
            key={item.en}
            className="flex items-start gap-3 text-sm text-[color:var(--color-text-secondary)]"
          >
            <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
              {"->"}
            </span>
            <span>{text(locale, item)}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
