import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/layout/PageShell";
import { BookingForm } from "@/components/booking/BookingForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero />
      <FormSection />
    </PageShell>
  );
}

function Hero() {
  const t = useTranslations("contact");
  return (
    <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        (04) — Kontakt
      </p>
      <h1
        className="mb-6 max-w-4xl font-medium leading-none tracking-tight"
        style={{ fontSize: "var(--text-display-xl)" }}
      >
        {t("title")}
      </h1>
      <p
        className="max-w-2xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("tagline")}
      </p>
    </section>
  );
}

function FormSection() {
  const tDetails = useTranslations("contact.details");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
        {/* Contact details sidebar */}
        <aside className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            Otsene kontakt
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${tDetails("email")}`}
              className="text-lg font-medium transition-colors hover:text-[color:var(--color-brand-accent)]"
            >
              {tDetails("email")}
            </a>
            <a
              href={`tel:${tDetails("phone").replace(/\s/g, "")}`}
              className="text-lg font-medium transition-colors hover:text-[color:var(--color-brand-accent)]"
            >
              {tDetails("phone")}
            </a>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              {tDetails("hours")}
            </p>
          </div>
        </aside>

        <BookingForm />
      </div>
    </section>
  );
}
