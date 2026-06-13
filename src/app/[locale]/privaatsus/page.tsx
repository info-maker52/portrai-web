import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT } from "@/lib/contact";
import {
  breadcrumbSchema,
  buildPageMetadata,
  localizedSitePath,
  SITE_URL,
} from "@/lib/seo";
import type { SiteLocale } from "@/lib/site-content";

/**
 * /privaatsus — privacy policy (GDPR).
 *
 * TODO (Reijo): have a lawyer review before relying on this, and fill in
 * the company registration number + any named data processors.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "Privacy policy | PortrAI"
        : "Privaatsuspoliitika | PortrAI",
    description:
      locale === "en"
        ? "How PortrAI collects, uses, and protects your personal data — contact requests and AI photobooth images."
        : "Kuidas PortrAI kogub, kasutab ja kaitseb sinu isikuandmeid — päringud ja AI fotoboksi pildid.",
    locale,
    path: localizedSitePath(locale, "/privaatsus"),
  });
}

type Section = { h: string; body: string[] };

const COPY: Record<
  SiteLocale,
  {
    eyebrow: string;
    title: string;
    updated: string;
    intro: string;
    sections: Section[];
  }
> = {
  en: {
    eyebrow: "Privacy",
    title: "Privacy policy",
    updated: "Last updated: June 2026",
    intro:
      "This explains what personal data PortrAI processes, why, and the rights you have over it. It covers both this website and the AI photobooth we run at events.",
    sections: [
      {
        h: "Who we are",
        body: [
          `PortrAI OÜ, registered in Tallinn, Estonia. Contact: ${CONTACT.email}, ${CONTACT.phone}.`,
          "We are the data controller for the personal data described below.",
        ],
      },
      {
        h: "What we collect",
        body: [
          "Website / booking requests: your name, email, and — if you provide them — phone number, company, event date, location, guest count, and anything you write in the message field.",
          "AI photobooth at events: a photo of each guest who chooses to use the booth, which is transformed into AI-styled portraits on the spot. Guests opt in by stepping up to the booth and taking a photo.",
          "Basic analytics: anonymous, aggregated usage data to understand how the site is used. No advertising trackers.",
        ],
      },
      {
        h: "Why we process it, and our legal basis",
        body: [
          "To answer your quote request and plan your event — legal basis: steps taken at your request prior to a contract, and your consent given when you submit the form.",
          "To run the photobooth and deliver your portraits — legal basis: the event contract and guests' consent at the booth.",
          "We do not use your data for unrelated marketing without separate consent, and we never sell it.",
        ],
      },
      {
        h: "How long we keep it",
        body: [
          "Quote requests and correspondence: kept while we are in contact and for a reasonable period after, then deleted.",
          "Event booth photos: delivered to the client and deleted from our systems after the agreed delivery window, unless the event contract specifies otherwise.",
        ],
      },
      {
        h: "Who we share it with",
        body: [
          "Service providers that help us operate — for example email and hosting — acting as our processors under contract. They may only use the data to provide their service to us.",
          "We do not sell your personal data or share it for others' marketing.",
        ],
      },
      {
        h: "Your rights",
        body: [
          "You can ask us to access, correct, delete, restrict, or port your data, and you can object to processing or withdraw consent at any time.",
          `To exercise any right, email ${CONTACT.email}. You also have the right to complain to the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon).`,
        ],
      },
    ],
  },
  et: {
    eyebrow: "Privaatsus",
    title: "Privaatsuspoliitika",
    updated: "Viimati uuendatud: juuni 2026",
    intro:
      "Siin on kirjas, milliseid isikuandmeid PortrAI töötleb, miks ja millised õigused sul nende üle on. See hõlmab nii seda veebilehte kui ka üritustel kasutatavat AI fotoboksi.",
    sections: [
      {
        h: "Kes me oleme",
        body: [
          `PortrAI OÜ, registreeritud Tallinnas. Kontakt: ${CONTACT.email}, ${CONTACT.phone}.`,
          "Oleme allpool kirjeldatud isikuandmete vastutav töötleja.",
        ],
      },
      {
        h: "Mida me kogume",
        body: [
          "Veebilehe / broneerimispäringud: sinu nimi, e-post ning — kui need annad — telefon, ettevõte, ürituse kuupäev, asukoht, külaliste arv ja kõik, mille sõnumiväljale kirjutad.",
          "AI fotoboks üritustel: iga külalise foto, kes boksi kasutab, mis muudetakse kohapeal AI-stiilis portreedeks. Külaline annab nõusoleku boksi juurde astudes ja pilti tehes.",
          "Lihtne analüütika: anonüümne ja koondatud kasutusinfo, et mõista, kuidas lehte kasutatakse. Reklaami-jälitajaid ei ole.",
        ],
      },
      {
        h: "Miks me töötleme ja õiguslik alus",
        body: [
          "Et vastata sinu pakkumispäringule ja planeerida üritust — õiguslik alus: sinu taotlusel enne lepingut tehtavad sammud ja vormi esitamisel antud nõusolek.",
          "Et fotoboksi käitada ja portreed üle anda — õiguslik alus: ürituse leping ja külaliste nõusolek boksis.",
          "Me ei kasuta su andmeid mitteseotud turunduseks ilma eraldi nõusolekuta ega müü neid kunagi.",
        ],
      },
      {
        h: "Kui kaua me hoiame",
        body: [
          "Pakkumispäringud ja kirjavahetus: hoiame, kuni oleme ühenduses, ja mõistliku aja pärast seda, seejärel kustutame.",
          "Ürituse boksipildid: anname kliendile üle ja kustutame oma süsteemidest pärast kokkulepitud üleandmisaega, kui leping ei sätesta teisiti.",
        ],
      },
      {
        h: "Kellega me jagame",
        body: [
          "Teenusepakkujad, kes aitavad meil tegutseda — näiteks e-post ja majutus — tegutsevad lepingu alusel meie volitatud töötlejana. Nad tohivad andmeid kasutada ainult meile teenuse osutamiseks.",
          "Me ei müü su isikuandmeid ega jaga neid teiste turunduse jaoks.",
        ],
      },
      {
        h: "Sinu õigused",
        body: [
          "Võid paluda meil oma andmetega tutvuda, neid parandada, kustutada, piirata või üle kanda, samuti töötlemisele vastu olla või nõusoleku igal ajal tagasi võtta.",
          `Õiguse kasutamiseks kirjuta ${CONTACT.email}. Sul on ka õigus pöörduda Andmekaitse Inspektsiooni poole.`,
        ],
      },
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/privaatsus")}`;

  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    {
      name: locale === "en" ? "Privacy" : "Privaatsus",
      url: pageUrl,
    },
  ]);

  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />

      <section className="px-6 pb-12 pt-24 md:px-12 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.eyebrow}
        </p>
        <h1
          className="mb-6 max-w-3xl leading-[1.05] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display-lg)",
            fontWeight: 400,
          }}
        >
          {copy.title}
        </h1>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
          {copy.updated}
        </p>
        <p
          className="max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.intro}
        </p>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12">
        <div className="mx-auto flex max-w-2xl flex-col gap-12">
          {copy.sections.map((section) => (
            <div key={section.h} className="flex flex-col gap-4">
              <h2
                className="leading-tight tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-title)",
                  fontWeight: 400,
                }}
              >
                {section.h}
              </h2>
              {section.body.map((p, i) => (
                <p
                  key={i}
                  className="leading-relaxed text-[color:var(--color-text-secondary)]"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
