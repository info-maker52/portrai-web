import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
export default async function DesignPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (process.env.SHOW_DESIGN_SHEET !== "true") {
    notFound();
  }

  return <DesignSheet />;
}

function DesignSheet() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 py-16 md:px-12">
      <header className="mb-16 border-b border-[color:var(--color-stroke-subtle)] pb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          PortrAI — Stage 2 sign-off
        </p>
        <h1
          className="font-medium leading-none tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          Design tokens.
        </h1>
        <p
          className="mt-4 max-w-prose text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          Every visible primitive on the site reduces to these values. If
          something here looks wrong, we fix it now — before any page is built
          on top.
        </p>
      </header>

      <Section title="01 — Colour: brand">
        <Swatch name="brand-primary" hex="#7948FF" varName="--color-brand-primary" />
        <Swatch name="brand-secondary" hex="#8764FF" varName="--color-brand-secondary" />
        <Swatch name="brand-accent" hex="#FFA2FF" varName="--color-brand-accent" />
      </Section>

      <Section title="02 — Colour: surface">
        <Swatch name="surface-base" hex="#02091E" varName="--color-surface-base" />
        <Swatch name="surface-raised" hex="#0A1232" varName="--color-surface-raised" />
        <Swatch name="surface-high" hex="#141C44" varName="--color-surface-high" />
      </Section>

      <Section title="03 — Colour: text">
        <Swatch name="text-primary" hex="#FFFFFF" varName="--color-text-primary" />
        <Swatch name="text-secondary" hex="#B8B5C9" varName="--color-text-secondary" />
        <Swatch name="text-tertiary" hex="#7A7891" varName="--color-text-tertiary" />
      </Section>

      <Section title="04 — Colour: semantic">
        <Swatch name="success" hex="#3DD68C" varName="--color-success" />
        <Swatch name="warning" hex="#FFB13D" varName="--color-warning" />
        <Swatch name="danger" hex="#FF5C5C" varName="--color-danger" />
      </Section>

      <Section title="05 — Type scale">
        <TypeRow label="display-xl" sizeVar="--text-display-xl">
          Liiguta hiirt.
        </TypeRow>
        <TypeRow label="display-lg" sizeVar="--text-display-lg">
          Vaata, mis juhtub.
        </TypeRow>
        <TypeRow label="display-md" sizeVar="--text-display-md">
          AI fotoboks Eesti üritustele
        </TypeRow>
        <TypeRow label="headline" sizeVar="--text-headline">
          Auhinnatud lahendus
        </TypeRow>
        <TypeRow label="title" sizeVar="--text-title">
          Igale külalisele unikaalne pilt
        </TypeRow>
        <TypeRow label="body-lg" sizeVar="--text-body-lg">
          Lead paragraph. AI muudab külalised kunstiteosteks õhtu jooksul.
        </TypeRow>
        <TypeRow label="body" sizeVar="--text-body">
          Body copy. Tavaline tekst lehe sees.
        </TypeRow>
        <TypeRow label="caption" sizeVar="--text-caption">
          UPPERCASE CAPTION TEXT
        </TypeRow>
      </Section>

      <Section title="06 — Mono usage">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          (01) — SECTION LABEL
        </p>
        <p className="font-mono" style={{ fontSize: "var(--text-body)" }}>
          0123456789 / Mono numerals for stats
        </p>
      </Section>

      <Section title="07 — Spacing">
        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((step) => (
          <div key={step} className="flex items-center gap-4">
            <span className="w-24 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              space-{step}
            </span>
            <div
              className="h-2 rounded-sm bg-[color:var(--color-brand-primary)]"
              style={{ width: `${step * 4}px` }}
            />
            <span className="font-mono text-xs text-[color:var(--color-text-tertiary)]">
              {step * 4}px
            </span>
          </div>
        ))}
      </Section>

      <Section title="08 — Radii">
        {[
          { name: "sm", value: 4 },
          { name: "md", value: 8 },
          { name: "lg", value: 16 },
          { name: "xl", value: 24 },
          { name: "full", value: 9999 },
        ].map(({ name, value }) => (
          <div key={name} className="flex items-center gap-4">
            <div
              className="h-16 w-16 bg-[color:var(--color-surface-raised)] border border-[color:var(--color-stroke-medium)]"
              style={{ borderRadius: `${value}px` }}
            />
            <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              radius-{name}
            </span>
          </div>
        ))}
      </Section>

      <Section title="09 — Glows">
        <div className="flex flex-wrap gap-8">
          <div
            className="flex h-24 w-40 items-center justify-center rounded-md bg-[color:var(--color-surface-raised)] font-mono text-xs uppercase tracking-wider"
            style={{ boxShadow: "var(--glow-soft)" }}
          >
            glow-soft
          </div>
          <div
            className="flex h-24 w-40 items-center justify-center rounded-md bg-[color:var(--color-surface-raised)] font-mono text-xs uppercase tracking-wider"
            style={{ boxShadow: "var(--glow-medium)" }}
          >
            glow-medium
          </div>
          <div
            className="flex h-24 w-40 items-center justify-center rounded-md bg-[color:var(--color-surface-raised)] font-mono text-xs uppercase tracking-wider"
            style={{ boxShadow: "var(--glow-strong)" }}
          >
            glow-strong
          </div>
        </div>
      </Section>

      <Section title="10 — Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <button className="rounded-md bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]">
            Primary CTA
          </button>
          <button className="rounded-md border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]">
            Secondary
          </button>
          <button className="px-6 py-3 font-medium text-white underline-offset-4 transition-all duration-200 hover:underline">
            Ghost
          </button>
        </div>
      </Section>

      <Section title="11 — Inputs">
        <div className="flex max-w-md flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              Email
            </span>
            <input
              type="email"
              placeholder="info@portrai.ee"
              className="rounded-md border border-[color:var(--color-stroke-medium)] bg-transparent px-4 py-3 transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
            />
          </label>
        </div>
      </Section>

      <footer className="mt-24 border-t border-[color:var(--color-stroke-subtle)] pt-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          End of token sheet — sign off in TASKS.md or message Claude.
        </p>
      </footer>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16 border-b border-[color:var(--color-stroke-subtle)] pb-12">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Swatch({
  name,
  hex,
  varName,
}: {
  name: string;
  hex: string;
  varName: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-16 w-32 rounded-md border border-[color:var(--color-stroke-subtle)]"
        style={{ background: `var(${varName})` }}
      />
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-xs text-[color:var(--color-text-secondary)]">
          {hex}
        </span>
      </div>
    </div>
  );
}

function TypeRow({
  label,
  sizeVar,
  children,
}: {
  label: string;
  sizeVar: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[color:var(--color-stroke-subtle)] pb-4 last:border-0">
      <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {label}
      </span>
      <p style={{ fontSize: `var(${sizeVar})`, lineHeight: 1.1 }}>
        {children}
      </p>
    </div>
  );
}
