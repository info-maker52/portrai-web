import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";

// Placeholder posts — replaced by MDX read from src/content/blog/ (Phase 7)
const POSTS = [
  {
    slug: "why-an-ai-photobooth-is-the-perfect-addition-to-your-company-summer-gatherings",
    title: "Why an AI photobooth is the perfect addition to your company summer gatherings",
    date: "2024-06-12",
    excerpt: "[Placeholder excerpt — migrated content lands in task H1]",
  },
  {
    slug: "halloween-party-coming-up-but-no-pumpkins-in-sight",
    title: "Halloween party coming up but no pumpkins in sight",
    date: "2024-10-01",
    excerpt: "[Placeholder excerpt — migrated content lands in task H1]",
  },
  {
    slug: "how-ai-makes-event-photos-more-memorable",
    title: "How AI makes event photos more memorable",
    date: "2024-09-15",
    excerpt: "[Placeholder excerpt — migrated content lands in task H1]",
  },
  {
    slug: "the-next-level-of-photo-booths-how-ai-makes-your-event-unforgettable-1",
    title: "The next level of photo booths: how AI makes your event unforgettable",
    date: "2024-04-20",
    excerpt: "[Placeholder excerpt — migrated content lands in task H1]",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero />
      <List />
    </PageShell>
  );
}

function Hero() {
  const t = useTranslations("blog");
  return (
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
  );
}

function List() {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-12 md:px-12">
      <div className="flex flex-col">
        {POSTS.map((post) => (
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
              Read →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
