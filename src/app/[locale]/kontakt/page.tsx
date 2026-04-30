import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/layout/PageShell";

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
      <Form />
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

function Form() {
  const t = useTranslations("contact.form");
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

        {/* Form (real submission lands in Phase 4) */}
        <form
          className="flex flex-col gap-8"
          action="/api/booking"
          method="POST"
        >
          <Field name="name" label={t("name")} type="text" required />
          <Field name="email" label={t("email")} type="email" required />
          <Field name="phone" label={t("phone")} type="tel" />
          <div className="grid gap-8 md:grid-cols-2">
            <Field name="eventType" label={t("eventType")} type="text" />
            <Field name="eventDate" label={t("eventDate")} type="date" />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Field name="eventLocation" label={t("eventLocation")} type="text" />
            <Field name="guestCount" label={t("guestCount")} type="number" />
          </div>
          <FieldArea name="message" label={t("message")} />

          <button
            type="submit"
            disabled
            className="self-start rounded-md bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)] disabled:cursor-not-allowed disabled:opacity-60"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {t("submit")} → <span className="ml-2 font-mono text-xs uppercase">[Phase 4]</span>
          </button>

          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            Form posts to /api/booking → Gmail SMTP. Wired up in Phase 4
            once Reijo provides the App Password.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type,
  required,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {label}
        {required && (
          <span className="ml-1 text-[color:var(--color-brand-accent)]">*</span>
        )}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-lg transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}

function FieldArea({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {label}
      </span>
      <textarea
        name={name}
        rows={5}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-lg transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}
