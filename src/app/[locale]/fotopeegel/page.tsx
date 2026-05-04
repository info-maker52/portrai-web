import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /fotopeegel — SEO landing page targeting "fotopeegel" (170/mo, EE).
 *
 * Mirror-booth offering as a separate product alongside AI photobooth.
 * Same clientele, same delivery model, different physical experience.
 *
 * NOTE: Estonian copy is DRAFT — needs Reijo's native pass.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const enMeta = {
    title: "Fotopeegel rental in Estonia · PortrAI",
    description:
      "Fotopeegel (mirror photobooth) rental for weddings, company parties, and events in Tallinn and across Estonia. Same booking team as PortrAI AI photobooth — pick the format that fits your event.",
  };
  const etMeta = {
    // [ET DRAFT — needs your native pass]
    title: "Fotopeegli rent Eestis · PortrAI",
    description:
      "Fotopeegli rent pulmadeks, firmapidudeks ja üritusteks Tallinnas ning üle Eesti. Sama meeskond, mis pakub AI photoboothi — vali oma üritusele sobivaim formaat.",
  };
  const meta = locale === "en" ? enMeta : etMeta;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

const COPY = {
  en: {
    eyebrow: "(02) PortrAI · fotopeegel",
    headline: "Fotopeegel rental — the elegant mirror booth.",
    subhead:
      "A floor-to-ceiling mirror that takes the photo, prints it on the spot, and adds animated brand graphics. Same PortrAI delivery team. Same calendar. A different experience for events where the mirror is the star.",
    primaryCta: "Book a fotopeegel",
    secondaryCta: "Compare with AI photobooth",

    whyEyebrow: "(03) Why people choose fotopeegel",
    whyTitle: "When the mirror beats the AI booth.",
    whyBullets: [
      {
        title: "Elegant aesthetic",
        body: "A full-length lit mirror feels at home at weddings, gala dinners, and premium private events.",
      },
      {
        title: "Animated screen prompts",
        body: "Guests interact with on-screen graphics, voice prompts, and signing — the experience is theatrical.",
      },
      {
        title: "Faster per guest",
        body: "Mirror booth flow is designed for ~15-second guest turns. High-throughput by default.",
      },
      {
        title: "Custom branding",
        body: "Frames, intros, and animations all carry your event's brand or theme.",
      },
    ],

    productEyebrow: "(04) The PortrAI difference",
    productTitle: "Two booths, one team.",
    productBody:
      "Most providers force a choice. PortrAI delivers AI photobooth, classic fotoboks, and fotopeegel from the same calendar — pick whichever fits your event, or run two formats at the same venue.",

    faqEyebrow: "(05) Frequently asked",
    faqTitle: "What event organisers ask about fotopeegel.",
    faq: [
      {
        q: "How is fotopeegel different from a regular photobooth?",
        a: "A fotopeegel is a full-length interactive mirror — guests see themselves life-size, the mirror prompts and signs them, and prints come out the side. A classic photobooth is a closed kiosk with a screen. Same end result (prints + digital), different physical experience.",
      },
      {
        q: "Can we have both AI photobooth AND fotopeegel at the same event?",
        a: "Yes — and we recommend it for larger events. The mirror handles the elegant ceremony moments; the AI booth runs in parallel for the fun side. One team, one setup window, two parallel queues.",
      },
      {
        q: "How much space does the fotopeegel need?",
        a: "About 2x2 metres of footprint plus 1.5 metres of clear standing space in front. One regular power outlet. Setup ~45 minutes.",
      },
      {
        q: "Can the mirror be branded for our event?",
        a: "Yes. Animated intros, on-screen graphics, the photo frame, and the signing-pen prompts all use your event's colours, logo, and theme. Custom theming included in the rental.",
      },
      {
        q: "Are the prints physical, digital, or both?",
        a: "Both. Every guest gets an instant print AND a QR code that delivers the photo to their phone. Plus a shared gallery link for the next morning.",
      },
    ],

    ctaTitle: "Tell us about your event.",
    ctaBody:
      "We'll suggest the right format — fotopeegel, AI photobooth, classic fotoboks, or a mix.",
    ctaButton: "Book PortrAI",
  },
  et: {
    // [ET DRAFT — needs your native pass]
    eyebrow: "(02) PortrAI · fotopeegel",
    headline: "Fotopeegli rent — elegantne peegel-fotoboks.",
    subhead:
      "Põrandast laeni peegel, mis teeb pildi, prindib kohapeal ja lisab animeeritud brändi-graafika. Sama PortrAI meeskond. Sama kalender. Erinev kogemus üritustele, kus peegel on staar.",
    primaryCta: "Broneeri fotopeegel",
    secondaryCta: "Võrdle AI photoboothiga",

    whyEyebrow: "(03) Miks valitakse fotopeegel",
    whyTitle: "Millal peegel võidab AI boksi.",
    whyBullets: [
      {
        title: "Elegantne esteetika",
        body: "Täispikkuses valgustatud peegel sobib pulmadesse, gala-õhtutele ja premium-eraüritustele.",
      },
      {
        title: "Animeeritud ekraani-juhised",
        body: "Külalised suhtlevad ekraani-graafika, hääljuhiste ja allkirjastamisega — kogemus on teatraalne.",
      },
      {
        title: "Kiirem külalise kohta",
        body: "Peegel-boksi voog on disainitud ~15-sekundilisteks järkudeks. Suur läbilask vaikimisi.",
      },
      {
        title: "Kohandatud bränding",
        body: "Raamid, sissejuhatused ja animatsioonid kannavad sinu ürituse brändi või teemat.",
      },
    ],

    productEyebrow: "(04) PortrAI eelis",
    productTitle: "Kaks boksi, üks meeskond.",
    productBody:
      "Enamik pakkujaid sunnib sind valima. PortrAI pakub AI photoboothi, klassikalist fotoboksi ja fotopeegelt samast kalendrist — vali, mis su üritusele sobib, või jooksuta kahte formaati samas asukohas.",

    faqEyebrow: "(05) Korduvad küsimused",
    faqTitle: "Mida korraldajad fotopeegli kohta küsivad.",
    faq: [
      {
        q: "Mis vahe on fotopeeglil ja tavalisel fotoboksil?",
        a: "Fotopeegel on täispikkuses interaktiivne peegel — külalised näevad end loomulikus suuruses, peegel suhtleb ja palub neil allkirjastada, ning printeri väljutab pildid küljelt. Klassikaline fotoboks on suletud kiosk ekraaniga. Sama lõpptulemus (print + digital), erinev füüsiline kogemus.",
      },
      {
        q: "Kas saab samal üritusel olla nii AI photobooth kui ka fotopeegel?",
        a: "Jah — ja suuremate ürituste puhul soovitame. Peegel hoiab elegantset õhkkonda; AI boks jookseb paralleelselt naljakal poolel. Üks meeskond, üks setupi-aken, kaks paralleelset järjekorda.",
      },
      {
        q: "Kui palju ruumi fotopeegel vajab?",
        a: "Umbes 2x2 meetrit põrandapinda pluss 1,5 meetrit vaba seismisruumi ees. Üks tavaline pistik. Setup ~45 minutit.",
      },
      {
        q: "Kas peeglit saab brändida meie ürituse jaoks?",
        a: "Jah. Animeeritud sissejuhatused, ekraani-graafika, pildi raam ja allkirjastamise juhised kasutavad kõik sinu ürituse värve, logo ja teemat. Kohandatud teema on rendi-paketis.",
      },
      {
        q: "Kas pildid on füüsilised, digitaalsed või mõlemad?",
        a: "Mõlemad. Iga külaline saab kohese prindi JA QR-koodi, mis annab pildi telefoni. Lisaks jagatud galerii-link järgmiseks hommikuks.",
      },
    ],

    ctaTitle: "Räägi meile oma üritusest.",
    ctaBody:
      "Soovitame õige formaadi — fotopeegel, AI photobooth, klassikaline fotoboks või kombinatsioon.",
    ctaButton: "Broneeri PortrAI",
  },
} as const;

export default async function FotopeegelPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = COPY[locale];
  const eventsHref = locale === "en" ? "/events" : "/peod";

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
                href={eventsHref}
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          {/* Mirror booth hero — placeholder until Reijo provides a real shot */}
          <ImagePlaceholder
            description="Hero photo: PortrAI fotopeegel (mirror booth) at a wedding — full-length lit mirror, animated brand graphic on screen, guest mid-pose"
            className="aspect-[4/5] rounded-3xl"
          />
        </div>
      </section>

      {/* Why fotopeegel */}
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
        <div className="grid gap-6 md:grid-cols-2">
          {copy.whyBullets.map((b, i) => (
            <article
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]"
            >
              <ImagePlaceholder
                description={`Detail shot illustrating: ${b.title}`}
                className="aspect-[16/9]"
              />
              <div className="flex flex-col gap-3 p-6">
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
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Product positioning */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.productEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.productTitle}
        </h2>
        <p
          className="max-w-3xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.productBody}
        </p>
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
