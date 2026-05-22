import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import type { Metadata } from "next";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.flatMap((slug) =>
    ["et", "en"].map((locale) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "et" | "en"; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    locale,
    ogImage: post.coverImage || undefined,
    path: localizedSitePath(locale, `/blog/${slug}`),
    type: "article",
    publishedTime: post.date,
  });
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-12 font-medium leading-tight tracking-tight"
      style={{ fontSize: "var(--text-display-md)" }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 font-medium leading-tight tracking-tight"
      style={{ fontSize: "var(--text-headline)" }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 font-medium leading-tight tracking-tight"
      style={{ fontSize: "var(--text-title)" }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mt-6 leading-relaxed text-[color:var(--color-text-primary)]"
      style={{ fontSize: "var(--text-body-lg)" }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-6 flex flex-col gap-3 pl-0" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="flex items-start gap-3 leading-relaxed text-[color:var(--color-text-primary)]"
      style={{ fontSize: "var(--text-body)" }}
    >
      <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
        {"->"}
      </span>
      <span>{props.children}</span>
    </li>
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[color:var(--color-brand-accent)] underline-offset-4 hover:underline"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium text-white" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 border-l-2 border-[color:var(--color-brand-primary)] pl-6 italic text-[color:var(--color-text-secondary)]"
      {...props}
    />
  ),
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const url = typeof src === "string" ? src : "";

    return (
      <span className="mt-12 block">
        {url.startsWith("/") ? (
          <Image
            src={url}
            alt={alt ?? ""}
            width={1200}
            height={800}
            className="rounded-md"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={alt ?? ""}
            className="rounded-md"
            loading="lazy"
          />
        )}
      </span>
    );
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 pb-16 pt-20 md:px-12 md:pt-32">
        <Link
          href="/blog"
          className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
        >
          {"<-"} {t("back")}
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

        {post.coverImage && (
          <div className="mt-12 overflow-hidden rounded-md">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-8 max-w-2xl rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
            {locale === "en" ? "Imported article" : "Imporditud artikkel"}
          </p>
          <p className="text-sm leading-7 text-[color:var(--color-text-secondary)]">
            {locale === "en"
              ? "The article body is already live. Custom intros, related-post modules, and conversion blocks can be layered in later without changing the reading layout below."
              : "Artikli sisu on juba live'is. Kohandatud sissejuhatused, seotud postituste moodulid ja konversiooniplokid saab hiljem juurde kihistada ilma allolevat lugemisvaadet muutmata."}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-2xl px-6 py-20 md:px-0">
        <MDXRemote source={post.body} components={mdxComponents} />
      </article>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
          >
            {"<-"} {t("back")}
          </Link>
          <BookingTrigger className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white">
            {locale === "en" ? "Start a project" : "Alusta projekti"} {"->"}
          </BookingTrigger>
        </div>
      </section>
    </PageShell>
  );
}
