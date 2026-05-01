import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import {
  planningPrompts,
  text,
  type LocalizedText,
  type SiteLocale,
} from "@/lib/site-content";

type ServiceTrack = {
  key: string;
  number: string;
  title: LocalizedText;
  summary: LocalizedText;
  fit: LocalizedText;
  outputs: LocalizedText[];
  inputs: LocalizedText[];
  galleryLabel: LocalizedText;
};

const SERVICE_PAGE_COPY: Record<
  SiteLocale,
  {
    heroTag: string;
    heroIntro: string;
    matrixTag: string;
    matrixTitle: string;
    matrixIntro: string;
    fitLabel: string;
    outputsLabel: string;
    inputsLabel: string;
    planningTag: string;
    planningTitle: string;
    planningIntro: string;
    ctaTag: string;
  }
> = {
  en: {
    heroTag: "(02) Service structure",
    heroIntro:
      "This page is now shaped around the actual offer formats, with placeholder copy, seeded outputs, and client-input prompts in place before the final sales wording is locked.",
    matrixTag: "(03) Offer formats",
    matrixTitle: "Three service tracks, each with its own page logic.",
    matrixIntro:
      "Instead of one generic services list, the structure now shows how the conversation changes between a classic booth, a hybrid event format, and a custom branded activation.",
    fitLabel: "Best fit",
    outputsLabel: "Typical outputs",
    inputsLabel: "Inputs we will need",
    planningTag: "(04) Shared planning inputs",
    planningTitle: "What we need no matter which format you choose.",
    planningIntro:
      "These prompts are already stable enough to guide both the placeholder form and the later discovery process.",
    ctaTag: "(05) Next step",
  },
  et: {
    heroTag: "(02) Teenuste struktuur",
    heroIntro:
      "See leht on nuud ehitatud tegelike pakkumisformaatide umber, koos placeholder-copy, seemendatud valjundite ja kliendi sisenditega juba enne lopliku muugiteksti lukustamist.",
    matrixTag: "(03) Pakkumise formaadid",
    matrixTitle: "Kolm teenuserada, koik omaette leheloogikaga.",
    matrixIntro:
      "Uhe uldise teenuseloendi asemel naitab struktuur nuud seda, kuidas vestlus muutub klassikalise boksi, hubriidse sundmuseformaadi ja kohandatud brandiaktivatsiooni vahel.",
    fitLabel: "Sobib koige paremini",
    outputsLabel: "Tavalised valjundid",
    inputsLabel: "Sisendid, mida vajame",
    planningTag: "(04) Uhised sisendid",
    planningTitle: "Mida vajame olenemata valitud formaadist.",
    planningIntro:
      "Need promptid on juba piisavalt stabiilsed, et juhtida nii placeholder-vormi kui ka hilisemat discovery-protsessi.",
    ctaTag: "(05) Jargmine samm",
  },
};

const SERVICE_TRACKS: ServiceTrack[] = [
  {
    key: "booth",
    number: "01",
    title: {
      en: "Classic AI photo booth",
      et: "Klassikaline AI fotoboks",
    },
    summary: {
      en: "The fastest route when you want guests to step in, generate a portrait, share it instantly, and keep the queue moving.",
      et: "Koige kiirem tee siis, kui soovid, et kulaline astuks sisse, genereeriks portree, jagaks selle kohe ja liiguks sujuvalt edasi.",
    },
    fit: {
      en: "Weddings, private celebrations, gala dinners, and branded hospitality moments where elegance matters more than a complex story mechanic.",
      et: "Pulmad, privaatsed tahistamised, galad ja branditud kulaliskogemused, kus elegants on olulisem kui keerukas looskeem.",
    },
    outputs: [
      {
        en: "Styled AI portraits with instant digital delivery",
        et: "Stiliseeritud AI-portreed koos kohese digitaalse valjastusega",
      },
      {
        en: "Optional on-site print flow and gallery export",
        et: "Soovi korral kohapealne print ja galerii eksport",
      },
      {
        en: "A clean, premium booth rhythm with minimal briefing overhead",
        et: "Puhas ja premium boksirutm minimaalse ettevalmistusega",
      },
    ],
    inputs: [
      {
        en: "Event date, venue, guest count, and preferred visual mood",
        et: "Sundmuse kuupaev, venue, kulaliste arv ja eelistatud visuaalne meeleolu",
      },
      {
        en: "Whether guests should receive prints, QR delivery, or both",
        et: "Kas kulalised peaksid saama printe, QR-jagamist voi molemat",
      },
    ],
    galleryLabel: {
      en: "Portrait booth placeholder slots for final event imagery",
      et: "Portreeboksi placeholder-slotid ootavad loplikku uritusmaterjali",
    },
  },
  {
    key: "hybrid",
    number: "02",
    title: {
      en: "Hybrid event format",
      et: "Hubriidne urituseformaat",
    },
    summary: {
      en: "Built for trade shows, festivals, and launches where the physical setup should also echo online before, during, or after the event.",
      et: "Meldud messidele, festivalidele ja lansseerimistele, kus kohapealne setup peaks elama ka veebis enne, ajal voi parast sundmust.",
    },
    fit: {
      en: "Trade shows, large public activations, partner events, and culture formats where a booth alone would leave too much reach on the table.",
      et: "Messid, suured avalikud aktivatsioonid, partneruritused ja kultuuriformaadid, kus ainult kohapealne boks jataks liiga palju haaret kasutamata.",
    },
    outputs: [
      {
        en: "On-site queue plus parallel web participation",
        et: "Kohapealne jarjekord koos paralleelse veebiosalusega",
      },
      {
        en: "Campaign-ready image delivery with broader lead capture",
        et: "Kampaaniakolbulik pildiedastus laiema lead-capture voimekusega",
      },
      {
        en: "A stronger case-study shape for sponsors, media, or partners",
        et: "Tugevam case-study kuju sponsorite, meedia voi partnerite jaoks",
      },
    ],
    inputs: [
      {
        en: "Traffic expectations, event duration, and whether the web layer should launch before the live date",
        et: "Liiklusootus, urituse kestus ja kas veebikiht peaks avanema enne live-kuupaeva",
      },
      {
        en: "Brand, campaign, or region logic that should shape the outputs",
        et: "Brandi-, kampaania- voi piirkonnaloogika, mis peaks valjundit suunama",
      },
    ],
    galleryLabel: {
      en: "Hybrid campaign storyboard waiting for final venue and web assets",
      et: "Hubriidkampaania storyboard ootab venue ja veebi loplikke faile",
    },
  },
  {
    key: "custom",
    number: "03",
    title: {
      en: "Custom branded activation",
      et: "Kohandatud brandiaktivatsioon",
    },
    summary: {
      en: "The format for quizzes, character matching, dream prompts, study-advisor flows, or anything where the image is only one part of the idea.",
      et: "Formaat viktoriinideks, karakterisobituseks, unistusepromptideks, oppenoustaja loogikaks voi milleks tahes, kus pilt on ainult osa kogu ideest.",
    },
    fit: {
      en: "Brands that need narrative depth, custom logic, or a stronger bridge from attention to lead generation.",
      et: "Brandid, mis vajavad rohkem narratiivi, kohandatud loogikat voi tugevamat silda tahelepanust lead-generationini.",
    },
    outputs: [
      {
        en: "Questionnaire-led or prompt-led guest journey",
        et: "Kusimustiku- voi promptipohine kulalisteekond",
      },
      {
        en: "Brand-specific output rules, moderation logic, and follow-up hooks",
        et: "Brandipohised valjundireeglid, moderatsiooniloogika ja jareltegevuse konksud",
      },
      {
        en: "A stronger strategic story than a generic booth can offer",
        et: "Tugevam strateegiline lugu kui uldine fotoboks suudaks pakkuda",
      },
    ],
    inputs: [
      {
        en: "The campaign objective, the desired guest decision, and any custom data capture requirements",
        et: "Kampaaniaeesmark, soovitud kulalise otsus ja koik kohandatud andmekogumise vajadused",
      },
      {
        en: "Rough prompt direction, brand restrictions, and post-event use cases",
        et: "Esialgne promptisuund, brandipiirangud ja uritusejargsed kasutusjuhud",
      },
    ],
    galleryLabel: {
      en: "Custom activation frames waiting for final art direction",
      et: "Kohandatud aktivatsiooni raamistik ootab loplikku art directionit",
    },
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <Hero locale={locale} />
      <ServiceMatrix locale={locale} />
      <PlanningInputs locale={locale} />
      <CallToAction locale={locale} />
    </PageShell>
  );
}

function Hero({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("services");
  const copy = SERVICE_PAGE_COPY[locale];

  return (
    <section className="px-6 pb-12 pt-20 md:px-12 md:pb-20 md:pt-32">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {copy.heroTag}
      </p>
      <h1
        className="mb-6 max-w-4xl font-medium leading-none tracking-tight"
        style={{ fontSize: "var(--text-display-xl)" }}
      >
        {t("title")}
      </h1>
      <p
        className="max-w-3xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {copy.heroIntro}
      </p>
    </section>
  );
}

function ServiceMatrix({ locale }: { locale: SiteLocale }) {
  const copy = SERVICE_PAGE_COPY[locale];

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="mb-12 max-w-3xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          {copy.matrixTag}
        </p>
        <h2
          className="font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          {copy.matrixTitle}
        </h2>
        <p
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.matrixIntro}
        </p>
      </div>

      <div className="space-y-6">
        {SERVICE_TRACKS.map((track) => (
          <div
            key={track.key}
            className="grid gap-8 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-10"
          >
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
                {track.number}
              </p>
              <h2
                className="font-medium leading-tight tracking-tight"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {text(locale, track.title)}
              </h2>
              <p className="text-[color:var(--color-text-secondary)]">
                {text(locale, track.summary)}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-6">
                <InfoBlock title={copy.fitLabel}>
                  {text(locale, track.fit)}
                </InfoBlock>

                <InfoList
                  title={copy.outputsLabel}
                  locale={locale}
                  items={track.outputs}
                />

                <InfoList
                  title={copy.inputsLabel}
                  locale={locale}
                  items={track.inputs}
                />
              </div>

              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-dashed border-[color:var(--color-stroke-medium)] bg-[radial-gradient(circle_at_top,_rgba(121,72,255,0.18),_transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
                <div className="flex h-full flex-col justify-between p-5">
                  <div className="self-start rounded-full border border-[color:var(--color-stroke-medium)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
                    {text(locale, track.title)}
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                    {text(locale, track.galleryLabel)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlanningInputs({ locale }: { locale: SiteLocale }) {
  const copy = SERVICE_PAGE_COPY[locale];

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="grid gap-12 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {copy.planningTag}
          </p>
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {copy.planningTitle}
          </h2>
          <p
            className="text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.planningIntro}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {planningPrompts.map((item) => (
            <div
              key={item.label.en}
              className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
                {text(locale, item.label)}
              </p>
              <p className="text-sm leading-7 text-[color:var(--color-text-secondary)]">
                {text(locale, item.body)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("home.cta");
  const copy = SERVICE_PAGE_COPY[locale];

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {copy.ctaTag}
      </p>
      <h2
        className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {t("title")}
      </h2>
      <p
        className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("subtitle")}
      </p>
      <Link
        href="/kontakt"
        className="inline-block rounded-md bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
      >
        {t("button")} {"->"}
      </Link>
    </section>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
        {title}
      </p>
      <p className="text-[color:var(--color-text-secondary)]">{children}</p>
    </div>
  );
}

function InfoList({
  title,
  locale,
  items,
}: {
  title: string;
  locale: SiteLocale;
  items: LocalizedText[];
}) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
        {title}
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.en}
            className="flex items-start gap-3 text-[color:var(--color-text-secondary)]"
          >
            <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
              {"->"}
            </span>
            <span>{text(locale, item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
