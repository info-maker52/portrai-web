import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { getAllBlogPosts } from "@/lib/blog";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // For now we show all posts regardless of locale — most current Wix posts
  // are EN-only. Once translations exist, switch to `getAllBlogPosts(locale)`.
  const posts = await getAllBlogPosts();
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <PageShell>
      <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          (03) — {t("tagline")}
        </p>
        <h1
          className="max-w-4xl font-medium leading-none tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          {t("title")}
        </h1>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-12 md:px-12">
        {posts.length === 0 ? (
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            No posts yet.
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
                  {t("readMore")} →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
