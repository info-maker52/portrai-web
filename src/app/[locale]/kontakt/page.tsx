import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/layout/PageShell";
import { BookingForm } from "@/components/booking/BookingForm";
import {
  planningPrompts,
  text,
  type SiteLocale,
} from "@/lib/site-content";

const CONTACT_COPY: Record<
  SiteLocale,
  {
    direct: string;
    planning: string;
    planningIntro: string;
    formIntro: string;
  }
> = {
  en: {
    direct: "Direct contact",
    planning: "Useful inputs",
    planningIntro:
      "You do not need a finished brief yet. These are simply the inputs that help the right concept emerge faster.",
    formIntro:
      "This draft form is already structured for the final flow, so even placeholder answers are useful for judging density and hierarchy.",
  },
  et: {
    direct: "Otsene kontakt",
    planning: "Kasulikud sisendid",
    planningIntro:
      "Sul ei pea veel valmis briefi olema. Need on lihtsalt sisendid, mis aitavad õigel kontseptsioonil kiiremini välja joonistuda.",
    formIntro:
      "See draft-vorm on juba üles ehitatud lõpliku flow jaoks, seega on ka placeholder-vastused kasulikud tiheduse ja hierarhia hindamiseks.",
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero />
      <FormSection locale={locale} />
    </PageShell>
  );
}

function Hero() {
  const t = useTranslations("contact");
  return (
    <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        (04) - Kontakt
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

function FormSection({ locale }: { locale: SiteLocale }) {
  const tDetails = useTranslations("contact.details");
  const copy = CONTACT_COPY[locale];

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="grid gap-16 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-10">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              {copy.direct}
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
          </div>

          <div className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
              {copy.planning}
            </p>
            <p className="mb-6 text-sm leading-7 text-[color:var(--color-text-secondary)]">
              {copy.planningIntro}
            </p>
            <div className="space-y-5">
              {planningPrompts.map((item) => (
                <div key={item.label.en} className="space-y-2">
                  <p className="font-medium">{text(locale, item.label)}</p>
                  <p className="text-sm text-[color:var(--color-text-secondary)]">
                    {text(locale, item.body)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
              {locale === "en" ? "Draft form" : "Draft-vorm"}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--color-text-secondary)]">
              {copy.formIntro}
            </p>
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  );
}
