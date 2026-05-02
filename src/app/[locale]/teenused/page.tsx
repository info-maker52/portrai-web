import type { ReactNode } from "react";
import Image from "next/image";
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
  mediaAlt: LocalizedText;
  mediaSrc: string;
  mediaPosition?: string;
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
      "PortrAI can be booked as a fast event booth, a wider campaign activation, or a custom concept built around your brand.",
    matrixTag: "(03) Offer formats",
    matrixTitle: "Choose the format that fits the job.",
    matrixIntro:
      "Some clients need a high-throughput booth. Others need a branded story, lead capture, or a web layer around the event. These are the three ways we usually package the work.",
    fitLabel: "Best fit",
    outputsLabel: "Typical outputs",
    inputsLabel: "Inputs we will need",
    planningTag: "(04) Shared planning inputs",
    planningTitle: "What we ask before we build.",
    planningIntro:
      "A short brief is enough to start. These are the details that help us recommend the right setup quickly.",
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
      en: "Event booth",
      et: "Klassikaline AI fotoboks",
    },
    summary: {
      en: "The fastest route when you want guests to step in, generate a portrait, and keep the queue moving without losing the premium feel.",
      et: "Koige kiirem tee siis, kui soovid, et kulaline astuks sisse, genereeriks portree, jagaks selle kohe ja liiguks sujuvalt edasi.",
    },
    fit: {
      en: "Launches, weddings, gala dinners, hospitality events, and branded guest experiences where a smooth live flow matters most.",
      et: "Pulmad, privaatsed tahistamised, galad ja branditud kulaliskogemused, kus elegants on olulisem kui keerukas looskeem.",
    },
    outputs: [
      {
        en: "Branded AI portraits with instant digital delivery",
        et: "Stiliseeritud AI-portreed koos kohese digitaalse valjastusega",
      },
      {
        en: "Optional prints, QR delivery, and gallery export",
        et: "Soovi korral kohapealne print ja galerii eksport",
      },
      {
        en: "A clean on-site setup that guests understand immediately",
        et: "Puhas ja premium boksirutm minimaalse ettevalmistusega",
      },
    ],
    inputs: [
      {
        en: "Event date, venue, guest count, and the kind of atmosphere you want the booth to create",
        et: "Sundmuse kuupaev, venue, kulaliste arv ja eelistatud visuaalne meeleolu",
      },
      {
        en: "Whether guests should receive prints, QR delivery, or both",
        et: "Kas kulalised peaksid saama printe, QR-jagamist voi molemat",
      },
    ],
    galleryLabel: {
      en: "Instant portraits, prints, and a smooth queue",
      et: "Portreeboksi placeholder-slotid ootavad loplikku uritusmaterjali",
    },
    mediaAlt: {
      en: "Guests receiving branded AI portraits at a live event booth",
      et: "Kulalised branditud AI-portreedega live-boksis",
    },
    mediaSrc: "/images/work/swedbank-unistused/gallery-02.jpg",
    mediaPosition: "50% 22%",
  },
  {
    key: "hybrid",
    number: "02",
    title: {
      en: "Campaign activation",
      et: "Hubriidne urituseformaat",
    },
    summary: {
      en: "Built for launches, festivals, and trade fairs where the event should keep working online before, during, or after the live date.",
      et: "Meldud messidele, festivalidele ja lansseerimistele, kus kohapealne setup peaks elama ka veebis enne, ajal voi parast sundmust.",
    },
    fit: {
      en: "Trade shows, public activations, partner events, and campaign moments where a booth alone would leave too much reach on the table.",
      et: "Messid, suured avalikud aktivatsioonid, partneruritused ja kultuuriformaadid, kus ainult kohapealne boks jataks liiga palju haaret kasutamata.",
    },
    outputs: [
      {
        en: "On-site guest flow with an online layer around the event",
        et: "Kohapealne jarjekord koos paralleelse veebiosalusega",
      },
      {
        en: "Campaign-ready image delivery with broader sharing and lead capture",
        et: "Kampaaniakolbulik pildiedastus laiema lead-capture voimekusega",
      },
      {
        en: "A format that keeps the activation useful beyond the venue itself",
        et: "Tugevam case-study kuju sponsorite, meedia voi partnerite jaoks",
      },
    ],
    inputs: [
      {
        en: "Traffic expectations, event duration, and whether the online layer should launch before the live date",
        et: "Liiklusootus, urituse kestus ja kas veebikiht peaks avanema enne live-kuupaeva",
      },
      {
        en: "Brand, campaign, or audience logic that should shape the outputs",
        et: "Brandi-, kampaania- voi piirkonnaloogika, mis peaks valjundit suunama",
      },
    ],
    galleryLabel: {
      en: "One event idea, extended into sharing and web reach",
      et: "Hubriidkampaania storyboard ootab venue ja veebi loplikke faile",
    },
    mediaAlt: {
      en: "Campaign portrait visual from a web-connected launch activation",
      et: "Veebiga seotud lansseerimisaktivatsiooni kampaaniavisuaal",
    },
    mediaSrc: "/images/work/von-fock-cover.jpg",
    mediaPosition: "50% 36%",
  },
  {
    key: "custom",
    number: "03",
    title: {
      en: "Custom interactive concept",
      et: "Kohandatud brandiaktivatsioon",
    },
    summary: {
      en: "The right format when a portrait alone is not enough and the real idea lives in questions, prompts, matching, or personalised output.",
      et: "Formaat viktoriinideks, karakterisobituseks, unistusepromptideks, oppenoustaja loogikaks voi milleks tahes, kus pilt on ainult osa kogu ideest.",
    },
    fit: {
      en: "Brands that need narrative depth, custom logic, or a stronger bridge from attention to lead generation.",
      et: "Brandid, mis vajavad rohkem narratiivi, kohandatud loogikat voi tugevamat silda tahelepanust lead-generationini.",
    },
    outputs: [
      {
        en: "Question-led or prompt-led guest journey",
        et: "Kusimustiku- voi promptipohine kulalisteekond",
      },
      {
        en: "Brand-specific output rules, moderation, and follow-up hooks",
        et: "Brandipohised valjundireeglid, moderatsiooniloogika ja jareltegevuse konksud",
      },
      {
        en: "A more distinctive brand story than a generic booth can offer",
        et: "Tugevam strateegiline lugu kui uldine fotoboks suudaks pakkuda",
      },
    ],
    inputs: [
      {
        en: "The campaign objective, the guest decision you want to trigger, and any custom data capture requirements",
        et: "Kampaaniaeesmark, soovitud kulalise otsus ja koik kohandatud andmekogumise vajadused",
      },
      {
        en: "Prompt direction, brand restrictions, and what should happen after the event",
        et: "Esialgne promptisuund, brandipiirangud ja uritusejargsed kasutusjuhud",
      },
    ],
    galleryLabel: {
      en: "Questions, logic, and brand-shaped outcomes",
      et: "Kohandatud aktivatsiooni raamistik ootab loplikku art directionit",
    },
    mediaAlt: {
      en: "Custom interactive activation visual with brand-specific worldbuilding",
      et: "Kohandatud interaktiivse aktivatsiooni visuaal brandipohise maailmaga",
    },
    mediaSrc: "/images/work/telia-rohekusimustik/gallery-03.jpg",
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

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)]">
                <Image
                  alt={text(locale, track.mediaAlt)}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  src={track.mediaSrc}
                  style={track.mediaPosition ? { objectPosition: track.mediaPosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.72)] via-[rgba(2,9,30,0.16)] to-transparent" />
                <div className="absolute inset-0 flex h-full flex-col justify-between p-5">
                  <div className="self-start rounded-full border border-white/16 bg-black/28 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/76 backdrop-blur-sm">
                    {text(locale, track.title)}
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-white/72">
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
