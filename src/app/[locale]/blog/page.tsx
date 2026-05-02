import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { getAllBlogPosts } from "@/lib/blog";

const BLOG_PAGE_COPY = {
  en: {
    heroTag: "(03) Journal",
    heroIntro:
      "Ideas, event notes, experiments, and practical lessons from the world around PortrAI.",
    notesTag: "What you will find here",
    importedTitle: "Real posts from the original site.",
    importedBody:
      "The first articles were imported from the original PortrAI site, so the archive already starts with real material instead of filler.",
    plannedTitle: "Where this section is heading.",
    plannedBody:
      "Over time, this becomes a mix of client stories, event learnings, prompt design, and practical guidance for brands planning activations.",
    bucketLabel: "Topics",
    buckets: ["Client stories", "Event learnings", "Prompt and concept notes"],
    listTag: "(04) Article index",
    empty: "No posts yet.",
  },
  et: {
    heroTag: "(03) Blogi struktuur",
    heroIntro:
      "Artiklid on juba live'is, kuid see leht on nuud raamitud nii, et saaksime testida editorial-rutmi, teemagruppide loogikat ja tulevasi konversiooniplokke enne lopliku blogistrateegia copy valmimist.",
    notesTag: "Praegune seis",
    importedTitle: "Imporditud artiklid jaavad nahtavale.",
    importedBody:
      "Wixist toodud postitused jaavad sisukihiks, et lugemisflow'd saaks hinnata paris pealkirjade, kuupaevade ja kokkuvotete pealt, mitte dummy-kaartidega.",
    plannedTitle: "Umber olevad moodulid on veel placeholderid.",
    plannedBody:
      "Teemablokid, uudiskirjaelemendid ja editorial-CTA-d saab hiljem juurde kihistada ilma pohiloendi struktuuri muutmata.",
    bucketLabel: "Planeeritud sisusuunad",
    buckets: ["Case study'd", "Uritusemarkmed", "Prompti ja kontseptsiooni katsed"],
    listTag: "(04) Artiklite indeks",
    empty: "Postitusi veel ei ole.",
  },
} as const;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getAllBlogPosts();
  const t = await getTranslations({ locale, namespace: "blog" });
  const copy = BLOG_PAGE_COPY[locale];

  return (
    <PageShell>
      <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          {copy.heroTag}
        </p>
        <h1
          className="max-w-4xl font-medium leading-none tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          {t("title")}
        </h1>
        <p
          className="mt-6 max-w-3xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.heroIntro}
        </p>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_360px]">
          <div className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
              {copy.notesTag}
            </p>
            <div className="space-y-6">
              <div className="space-y-2">
                <h2
                  className="font-medium leading-tight tracking-tight"
                  style={{ fontSize: "var(--text-title)" }}
                >
                  {copy.importedTitle}
                </h2>
                <p className="text-[color:var(--color-text-secondary)]">
                  {copy.importedBody}
                </p>
              </div>
              <div className="space-y-2 border-t border-[color:var(--color-stroke-subtle)] pt-6">
                <h2
                  className="font-medium leading-tight tracking-tight"
                  style={{ fontSize: "var(--text-title)" }}
                >
                  {copy.plannedTitle}
                </h2>
                <p className="text-[color:var(--color-text-secondary)]">
                  {copy.plannedBody}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
              {copy.bucketLabel}
            </p>
            <ul className="space-y-3">
              {copy.buckets.map((bucket) => (
                <li
                  key={bucket}
                  className="flex items-start gap-3 text-[color:var(--color-text-secondary)]"
                >
                  <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
                    {"->"}
                  </span>
                  <span>{bucket}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-12 md:px-12">
        <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          {copy.listTag}
        </p>

        {posts.length === 0 ? (
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            {copy.empty}
          </p>
        ) : (
          <div className="flex flex-col">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-6 border-b border-[color:var(--color-stroke-subtle)] py-12 md:grid-cols-[200px_1fr_auto] md:items-center md:gap-12"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                  {post.date}
                </p>
                <div className="flex flex-col gap-3">
                  <h2
                    className="font-medium leading-tight tracking-tight transition-colors group-hover:text-[color:var(--color-brand-accent)]"
                    style={{ fontSize: "var(--text-headline)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="max-w-2xl text-sm text-[color:var(--color-text-secondary)]">
                    {post.excerpt}
                  </p>
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors group-hover:text-white">
                  {t("readMore")} {"->"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
