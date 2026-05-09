import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /messilahendused — B2B trade-show landing page.
 *
 * Target keyword: "messiboks" (20/mo, Medium comp, but €1.51-€11.76 CPC
 * range = premium commercial intent — buyers).
 * Secondaries: messilahendused, messilahendus, konverentsi fotoboks,
 * messi fotoboks, ettevõtte üritus.
 *
 * Differentiated from /turundus (which is broad campaigns) — this is
 * specifically about trade-show booth integration with measurable ROI.
 *
 * NOTE: Estonian copy is DRAFT — needs Reijo's native pass.
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
        ? "Trade show photo booth and messilahendused | PortrAI"
        : "Messilahendused ja AI fotoboks messile | PortrAI",
    description:
      locale === "en"
        ? "Trade show and conference activation with AI photo booth lead capture, branded touch-points, and GDPR-clean data. Built for high foot traffic in Estonia and abroad."
        : "Messilahendused ja AI fotoboks messidele ning konverentsidele: lead capture, bränditud puutepunktid ja GDPR-kohased andmed. Loodud suure külastajamahu jaoks Eestis ja välismaal.",
    locale,
    ogImage: "/images/site/interactive-booth.png",
    path: localizedSitePath(locale, "/messilahendused"),
  });
}

const COPY = {
  en: {
    eyebrow: "(02) PortrAI · trade shows",
    headline: "Messibox that pulls visitors and captures leads.",
    subhead:
      "PortrAI is the trade-show booth solution that turns foot traffic into measurable lead lists. Branded, GDPR-clean, fast at peak — and the AI portrait gives visitors a reason to stop, share, and remember the brand.",
    primaryCta: "Book a 15-min strategy call",
    secondaryCta: "See the Telia activation",

    problemEyebrow: "(03) The trade-show problem",
    problemTitle: "A premium booth without a magnet wastes the budget.",
    problemBody:
      "You pay for the booth, the staff, the swag, and the airfare — and most visitors walk past. The branded AI photobooth gives them a reason to stop, a reason to share, and gives you their email at the same time. Lead capture without it feeling like lead capture.",

    whyEyebrow: "(04) Why brands pick PortrAI for trade shows",
    whyTitle: "Built for the realities of a trade-show floor.",
    whyBullets: [
      {
        title: "Branded every touch-point",
        body: "On-screen UI, the prompt, the photo frame, the QR landing page, the email. All in your booth's brand language — same touch-point as the rest of your booth design.",
      },
      {
        title: "Lead capture, GDPR-clean",
        body: "Per-visitor opt-in flow. Exported CSV with consent timestamps. Plug into HubSpot, Salesforce, Pipedrive the next morning. No manual scanning, no badge-readers.",
      },
      {
        title: "Fast at peak",
        body: "30-60 second guest experience. We've handled 200+ portraits per hour at single-booth peaks. The queue keeps moving while every visitor leaves with a branded asset.",
      },
      {
        title: "Booth-floor footprint",
        body: "2x2 metres including printer, plus 1.5m of clear standing space. Fits any standard 3x3 or 4x4 booth. One regular power outlet. Setup in 45 minutes.",
      },
      {
        title: "Concept logic, not just a kiosk",
        body: "Quizzes, character matching, dream prompts, study-advisor flows — we can build any decision-tree the AI uses, so the visitor experience is genuinely differentiated, not just another photobooth.",
      },
      {
        title: "Award-winning, real campaigns",
        body: "Booth Mastermind Awards Las Vegas 2025. Real numbers: 681K images for ERR Von Fock, 103K + 23K opt-ins for Postimees Laulupidu, +10% episode-2 viewership lift.",
      },
    ],

    proofEyebrow: "(05) Real trade-show results",
    proofTitle: "These numbers are from real activations, not slides.",
    proofMetrics: [
      { value: "681K", label: "Images · Von Fock (ERR)" },
      { value: "103K", label: "Images + 23K opt-ins · Laulupidu (Postimees)" },
      { value: "200+", label: "Portraits/hour at peak (single booth)" },
      { value: "5+", label: "Brand-activation case studies" },
    ],

    faqEyebrow: "(06) Frequently asked",
    faqTitle: "Things marketing leads ask before booking.",
    faq: [
      {
        q: "How quickly can a lead reach our CRM?",
        a: "Within hours of the trade-show day ending. We export a CSV with timestamps and consent records. You can import it into HubSpot, Salesforce, Pipedrive, or any CRM the next morning. We can also wire up live API delivery if you need it real-time during the event.",
      },
      {
        q: "Can it match our existing booth design?",
        a: "Yes — that's the default. We design the on-screen interface, the photo frame, the QR landing page, and the follow-up email to match your booth's design system. We need your brand assets 2 weeks before the show.",
      },
      {
        q: "What's the throughput in a busy hour?",
        a: "200+ portraits per hour with a single booth at peak. If your trade show expects more visitor flow, we can run two parallel booths from the same booking — same brand assets, doubled throughput.",
      },
      {
        q: "What does it cost?",
        a: "Trade-show pricing depends on event length, branding depth, and CRM integration scope. Strategy-call quotes typically come back in the €1,500–€8,000 range per event. Book a 15-minute call and we'll send a budget range within 48 hours.",
      },
      {
        q: "Can we use this internationally?",
        a: "Yes. We've delivered in Estonia, Finland, Germany, Latvia, Poland, Belgium, and the USA. International setups need 4 weeks lead time for shipping logistics.",
      },
    ],

    ctaTitle: "Talk to us about your trade show.",
    ctaBody:
      "Book a 15-minute strategy call. We'll send a concept direction and a budget range within 48 hours.",
    ctaButton: "Book a strategy call",
  },
  et: {
    // [ET DRAFT — needs your native pass]
    eyebrow: "(02) PortrAI · messid",
    headline: "Messiboks, mis tõmbab külastajaid ja kogub leadi.",
    subhead:
      "PortrAI on messiboksi-lahendus, mis muudab jalakäijate liikluse mõõdetavateks leadi-nimekirjadeks. Bränditud, GDPR-iga puhas, kiire tippkoormusel — ja AI-portree annab külastajale põhjuse peatuda, jagada ja brändi mäletada.",
    primaryCta: "Broneeri 15-min strateegiakõne",
    secondaryCta: "Vaata Telia aktivatsiooni",

    problemEyebrow: "(03) Messi probleem",
    problemTitle: "Premium boks ilma magnetita raiskab eelarvet.",
    problemBody:
      "Sa maksad boksi, töötajate, kingituste ja lennupiletite eest — ja enamik külastajaid kõnnib mööda. Bränditud AI photobooth annab neile põhjuse peatuda, põhjuse jagada ja annab sulle samal ajal nende e-posti. Lead-kogumine, mis ei tundu lead-kogumisena.",

    whyEyebrow: "(04) Miks brändid valivad PortrAI messide jaoks",
    whyTitle: "Loodud messiplatside reaalsuste jaoks.",
    whyBullets: [
      {
        title: "Bränditud iga puutepunkt",
        body: "Ekraani-liides, prompt, pildi raam, QR-leht, e-kiri. Kõik sinu boksi brändikeeles — sama puutepunkt nagu ülejäänud boksi disain.",
      },
      {
        title: "Lead-kogumine, GDPR-iga puhas",
        body: "Iga külastaja vabatahtlik nõusolek. Eksporditud CSV koos ajatemplite ja nõusoleku-kirjetega. Hommikul HubSpoti, Salesforce'i, Pipedrive'i. Ei mingit käsitsi skannimist, badge-lugejaid ei vaja.",
      },
      {
        title: "Kiire tippkoormusel",
        body: "30-60 sekundit külalise kohta. Oleme tippkoormusel ühe boksiga teinud 200+ portreed tunnis. Järjekord liigub, igaüks lahkub bränditud varandusega.",
      },
      {
        title: "Messipõranda jälg",
        body: "2x2 meetrit koos printeriga, pluss 1,5m vaba seismisruumi. Mahub iga standardse 3x3 või 4x4 boksi sisse. Üks tavaline pistik. Setup 45 minutiga.",
      },
      {
        title: "Kontseptsiooniloogika, mitte ainult kiosk",
        body: "Viktoriinid, karakterisobitus, unistuse-promptid, õppenõustaja-loogika — saame ehitada mistahes otsustuspuu, mida AI kasutab, nii et külastaja kogemus on tegelikult erinev, mitte lihtsalt järjekordne fotoboks.",
      },
      {
        title: "Auhinnatud, päris kampaaniad",
        body: "Booth Mastermind Awards Las Vegas 2025. Päris numbrid: 681K pilti ERR Von Focki kampaanias, 103K + 23K registreerimist Postimehe Laulupeol, +10% 2. seeria vaatajakasv.",
      },
    ],

    proofEyebrow: "(05) Päris messi-tulemused",
    proofTitle: "Need numbrid on päris aktivatsioonidest, mitte slaididelt.",
    proofMetrics: [
      { value: "681K", label: "Pilti · Von Fock (ERR)" },
      {
        value: "103K",
        label: "Pilti + 23K registreerimist · Laulupidu (Postimees)",
      },
      { value: "200+", label: "Portreed/tunnis tipus (üks boks)" },
      { value: "5+", label: "Brändi-aktivatsiooni juhtumit" },
    ],

    faqEyebrow: "(06) Korduvad küsimused",
    faqTitle: "Mida turundusjuhid enne broneerimist küsivad.",
    faq: [
      {
        q: "Kui kiiresti jõuab lead meie CRM-i?",
        a: "Tundide jooksul pärast messi lõppu. Ekspordime CSV-faili koos ajatemplite ja nõusoleku-kirjetega. Saad selle hommikul HubSpoti, Salesforce'i, Pipedrive'i või muusse CRM-i importida. Saame ka API-põhise live-edastuse seadistada, kui vajad seda reaalajas ürituse ajal.",
      },
      {
        q: "Kas see saab sobituda meie olemasoleva boksi disainiga?",
        a: "Jah — see on vaikimisi. Disainime ekraani-liidese, pildi raami, QR-lehe ja järelkirja teie boksi disainisüsteemiga sobivaks. Vajame teie brändi-materjalid 2 nädalat enne messi.",
      },
      {
        q: "Mis on läbilask tipphekti tunnil?",
        a: "200+ portreed tunnis ühe boksiga tipus. Kui teie mess ootab suuremat külastajavoolu, saame jooksutada kahte paralleelset boksi sama broneeringuga — samad brändi-materjalid, kahekordne läbilask.",
      },
      {
        q: "Mis see maksab?",
        a: "Messi-hinnad sõltuvad ürituse kestusest, brändingu sügavusest ja CRM-integratsiooni ulatusest. Strateegiakõne pakkumised tulevad tavaliselt vahemikku €1,500–€8,000 ürituse kohta. Broneeri 15-minutiline kõne ja saadame eelarvevahemiku 48 tunni jooksul.",
      },
      {
        q: "Kas me saame seda kasutada rahvusvaheliselt?",
        a: "Jah. Oleme tarninud Eestisse, Soome, Saksamaale, Lätti, Poola, Belgiasse ja USA-sse. Rahvusvahelised setupid vajavad 4-nädalast varust transpordi-logistika jaoks.",
      },
    ],

    ctaTitle: "Räägi meiega oma messist.",
    ctaBody:
      "Broneeri 15-minutiline strateegiakõne. Saadame kontseptsiooni-suuna ja eelarvevahemiku 48 tunni jooksul.",
    ctaButton: "Broneeri strateegiakõne",
  },
} as const;

export default async function MessilahendusedPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = COPY[locale];

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
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
              className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.subhead}
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/kontakt"
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </Link>
              </MagneticButton>
              <Link
                href="/tood/telia-rohekusimustik"
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          <ImagePlaceholder
            description="Hero photo: PortrAI booth integrated into a brand's trade-show stand — booth visible in context with the larger booth setup, queue of visitors visible"
            className="aspect-[4/5] rounded-3xl"
          />
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.problemEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.problemTitle}
        </h2>
        <p
          className="max-w-3xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.problemBody}
        </p>
      </section>

      {/* Why brands pick PortrAI */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.whyEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.whyTitle}
            </h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {copy.whyBullets.map((b, i) => (
            <article
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                0{i + 1}
              </p>
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {b.title}
              </h3>
              <p className="text-[color:var(--color-text-secondary)]">
                {b.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Real metrics */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.proofEyebrow}
        </p>
        <h2
          className="mb-12 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.proofTitle}
        </h2>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))` }}
        >
          {copy.proofMetrics.map((m, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-l border-[color:var(--color-brand-primary)] pl-6"
            >
              <p
                className="font-mono font-medium tabular-nums leading-none"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {m.value}
              </p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-[300px_1fr]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.faqEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.faqTitle}
            </h2>
          </div>
          <FaqAccordion items={[...copy.faq]} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          {copy.ctaTitle}
        </h2>
        <p
          className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.ctaBody}
        </p>
        <MagneticButton>
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.ctaButton} →
          </Link>
        </MagneticButton>
      </section>
    </PageShell>
  );
}
