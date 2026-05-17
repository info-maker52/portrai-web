import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrustRow } from "@/components/trust/TrustRow";
import {
  buildPageMetadata,
  localizedSitePath,
  SITE_URL,
  styleListSchema,
} from "@/lib/seo";
import {
  AI_STYLES,
  STYLE_CATEGORY_LABELS,
  type StyleCategory,
} from "@/lib/styles-catalog";
import { type SiteLocale, text } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "AI photobooth style catalog — 12 named styles | PortrAI"
        : "AI fotoboksi stiilikataloog — 12 nimega stiili | PortrAI",
    description:
      locale === "en"
        ? "Twelve AI portrait styles for your event — acrylic, watercolour, pencil, cartoon, neon, renaissance and more. Each style has a sample, a vibe, and a best-fit event type."
        : "Kaksteist AI portreestiili sinu üritusele — akrüül, akvarell, pliiats, koomiks, neoon, renessanss ja teised. Igal stiilil on näide, meeleolu ja sobivaim ürituse tüüp.",
    locale,
    ogImage: "/images/site/portrait-detail.png",
    path: localizedSitePath(locale, "/stiilid"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) AI styles",
    headline: "12 AI styles. One studio.",
    subhead:
      "Every style is a starting point — we tune the prompts, frames and on-screen flow to your event. Custom themes ship in 2 weeks; they are built around your brand, not picked from a catalog.",
    bestFor: "Best for",
    categoriesAll: "All",
    customCta: "Want one built around your brand?",
    customBody:
      "Custom AI themes are a Custom Activation deliverable — designed from your brief, your visual language, your guest journey. Delivered inside 2 weeks.",
    customLink: "Open the studio",
  },
  et: {
    eyebrow: "(01) AI stiilid",
    headline: "12 AI stiili. Üks stuudio.",
    subhead:
      "Iga stiil on lähtepunkt — häälestame promptid, raamid ja ekraani-voo sinu ürituse järgi. Kohandatud teemad valmivad 2 nädalaga; need on ehitatud sinu brändi ümber, mitte kataloogist valitud.",
    bestFor: "Sobib",
    categoriesAll: "Kõik",
    customCta: "Tahad sellise, mis on sinu brändi ümber ehitatud?",
    customBody:
      "Kohandatud AI teemad on Custom Activation väljund — disainitud sinu briifist, sinu visuaalsest keelest, sinu külalise teekonnast. Valmib 2 nädalaga.",
    customLink: "Ava stuudio",
  },
} as const;

export default async function StylesPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/stiilid")}`;
  const schema = styleListSchema(
    AI_STYLES.map((s) => ({
      name: text(locale, s.name),
      description: text(locale, s.vibe),
      image: `${SITE_URL}${s.sample}`,
      url: `${pageUrl}#${s.id}`,
    })),
  );

  const categories: StyleCategory[] = ["painted", "illustrated", "cinematic", "experimental"];

  return (
    <PageShell>
      <JsonLd data={schema} />

      <section className="px-6 pb-12 pt-24 md:px-12 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.eyebrow}
        </p>
        <h1
          className="mb-6 max-w-4xl font-medium leading-[1.05] tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          {copy.headline}
        </h1>
        <p
          className="mb-8 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.subhead}
        </p>
        <TrustRow locale={locale} />
      </section>

      {categories.map((category) => {
        const styles = AI_STYLES.filter((s) => s.category === category);
        if (styles.length === 0) return null;
        return (
          <section
            key={category}
            className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12"
          >
            <p className="mb-10 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
              {text(locale, STYLE_CATEGORY_LABELS[category])}
            </p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {styles.map((style) => (
                <article
                  key={style.id}
                  id={style.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] transition-colors hover:border-[color:var(--color-brand-primary)]/40"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={style.sample}
                      alt={`${text(locale, style.name)} — ${text(locale, style.vibe)}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.78)] via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
                      {text(locale, style.name)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <h3
                      className="font-medium leading-tight"
                      style={{ fontSize: "var(--text-title)" }}
                    >
                      {text(locale, style.name)}
                    </h3>
                    <p className="text-sm text-[color:var(--color-text-secondary)]">
                      {text(locale, style.vibe)}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-text-tertiary)]">
                      {copy.bestFor}: {text(locale, style.bestFor)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* Custom theme CTA */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-brand-primary)]/8 px-6 py-24 md:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
            {copy.customCta}
          </p>
          <h2
            className="mb-6 font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {copy.customBody}
          </h2>
          <Link
            href={"/studio" as "/studio"}
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
          >
            {copy.customLink} →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
