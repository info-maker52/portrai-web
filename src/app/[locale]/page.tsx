import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Home />;
}

function Home() {
  const t = useTranslations();
  return (
    <main className="relative flex min-h-[100dvh] flex-col">
      {/* Top nav placeholder (proper component lands in Phase 4) */}
      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="font-mono text-sm uppercase tracking-wider">
          PortrAI
        </Link>
        <nav className="hidden gap-8 md:flex">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
          >
            01 — {t("nav.work")}
          </Link>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
          >
            02 — {t("nav.services")}
          </Link>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
          >
            03 — {t("nav.awards")}
          </Link>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
          >
            04 — {t("nav.contact")}
          </Link>
        </nav>
        <Link
          href="/"
          locale="en"
          className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
        >
          {t("nav.switchLanguage")}
        </Link>
      </header>

      {/* Hero — placeholder until cursor-reveal shader lands in Phase 5 */}
      <section className="flex flex-1 flex-col items-start justify-center gap-8 px-6 py-24 md:px-12">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          (01) {t("meta.tagline")}
        </p>
        <h1
          className="font-medium leading-none tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          {t("hero.headline")}
          <br />
          <span className="bg-gradient-to-r from-[color:var(--color-brand-primary)] via-[color:var(--color-brand-secondary)] to-[color:var(--color-brand-accent)] bg-clip-text text-transparent">
            {t("hero.headlineLine2")}
          </span>
        </h1>
        <p
          className="max-w-xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {t("hero.leadIn")}
        </p>
        <div className="flex gap-4">
          <button className="rounded-md bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]">
            {t("hero.cta")}
          </button>
          <button className="rounded-md border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]">
            {t("hero.ctaSecondary")}
          </button>
        </div>
      </section>

      <footer className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-6 md:px-12">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          © 2026 PortrAI — {t("footer.rights")}
        </p>
      </footer>
    </main>
  );
}
