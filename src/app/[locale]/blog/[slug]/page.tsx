import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";

// Placeholder — Phase 7 reads MDX from src/content/blog/{slug}.mdx
const POSTS: Record<string, { title: string; date: string; excerpt: string }> = {
  "why-an-ai-photobooth-is-the-perfect-addition-to-your-company-summer-gatherings":
    {
      title:
        "Why an AI photobooth is the perfect addition to your company summer gatherings",
      date: "2024-06-12",
      excerpt: "[Placeholder excerpt — content lands in task H1]",
    },
  "halloween-party-coming-up-but-no-pumpkins-in-sight": {
    title: "Halloween party coming up but no pumpkins in sight",
    date: "2024-10-01",
    excerpt: "[Placeholder excerpt — content lands in task H1]",
  },
  "how-ai-makes-event-photos-more-memorable": {
    title: "How AI makes event photos more memorable",
    date: "2024-09-15",
    excerpt: "[Placeholder excerpt — content lands in task H1]",
  },
  "the-next-level-of-photo-booths-how-ai-makes-your-event-unforgettable-1": {
    title:
      "The next level of photo booths: how AI makes your event unforgettable",
    date: "2024-04-20",
    excerpt: "[Placeholder excerpt — content lands in task H1]",
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).flatMap((slug) =>
    ["et", "en"].map((locale) => ({ locale, slug })),
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = POSTS[slug];

  if (!post) {
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
            Post not found.
          </h1>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Hero post={post} />
      <Body />
    </PageShell>
  );
}

function Hero({ post }: { post: { title: string; date: string; excerpt: string } }) {
  const t = useTranslations("blog");

  return (
    <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 pb-16 pt-20 md:px-12 md:pt-32">
      <Link
        href="/blog"
        className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
      >
        ← {t("back")}
      </Link>

      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {t("publishedOn")} {post.date}
      </p>
      <h1
        className="max-w-4xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {post.title}
      </h1>

      {/* Cover image placeholder */}
      <div className="mt-12 aspect-[16/9] overflow-hidden rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)]">
        <div className="flex h-full items-center justify-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            Cover image — task H1
          </p>
        </div>
      </div>
    </section>
  );
}

function Body() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 md:px-0">
      <div className="prose prose-invert flex flex-col gap-6 text-[color:var(--color-text-primary)]">
        <p style={{ fontSize: "var(--text-body-lg)" }}>
          [Placeholder body — Phase 7 wires this up to render MDX from
          <code className="mx-2 rounded bg-[color:var(--color-surface-raised)] px-2 py-1 font-mono text-xs">
            src/content/blog/[slug].mdx
          </code>
          using next-mdx-remote. Codex task H1 will scrape the existing 4 Wix
          posts and produce the MDX files.]
        </p>
        <h2
          className="font-medium tracking-tight"
          style={{ fontSize: "var(--text-headline)" }}
        >
          Sample heading
        </h2>
        <p>
          Body copy renders here at <code>--text-body</code> with{" "}
          <code>--text-body--line-height: 1.6</code>.
        </p>
        <p>
          Inline links use the brand accent colour:{" "}
          <a
            href="#"
            className="text-[color:var(--color-brand-accent)] underline-offset-4 hover:underline"
          >
            example link
          </a>
          .
        </p>
      </div>
    </article>
  );
}
