"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import {
  ADD_ONS,
  calculatePrice,
  DISTANCE_TIERS,
  formatEur,
  PACKAGES,
  type CalculatorInputs,
  type PackageId,
} from "@/lib/pricing";
import { type SiteLocale, text } from "@/lib/site-content";

const COPY = {
  en: {
    package: "Package",
    distance: "Where is the event?",
    guests: "How many guests?",
    timing: "Day & time",
    weekend: "Saturday or Sunday",
    lateNight: "Runs past 00:00",
    addOns: "Add-ons",
    breakdown: "Breakdown",
    subtotal: "Subtotal",
    vat: "VAT (22%)",
    total: "Total incl. VAT",
    ctaQuote: "Send these details as a quote request",
    note: "Indicative. Final quote confirmed after we check the date.",
    customCalloutTitle: "Need a custom concept?",
    customCalloutBody:
      "Bespoke campaigns and virtual AI widgets aren't priced by calculator — talk to us about your event.",
    customCalloutCta: "PortrAI Studio →",
  },
  et: {
    package: "Pakett",
    distance: "Kus üritus toimub?",
    guests: "Kui palju külalisi?",
    timing: "Päev ja aeg",
    weekend: "Laupäev või pühapäev",
    lateNight: "Kestab üle 00:00",
    addOns: "Lisad",
    breakdown: "Hinnastruktuur",
    subtotal: "Vahesumma",
    vat: "Käibemaks (22%)",
    total: "Kokku koos käibemaksuga",
    ctaQuote: "Saada need andmed pakkumise päringuna",
    note: "Indikatiivne. Lõplik pakkumine kinnitub pärast kuupäeva kontrolli.",
    customCalloutTitle: "Vajad kohandatud kontseptsiooni?",
    customCalloutBody:
      "Eritellimusel kampaaniad ja virtuaalsed AI-widgetid ei sobi kalkulaatorisse — räägi meiega oma üritusest.",
    customCalloutCta: "PortrAI Studio →",
  },
} as const;

export function PriceCalculator() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const copy = COPY[locale];

  const [inputs, setInputs] = useState<CalculatorInputs>({
    packageId: "signature",
    distanceTierId: "tallinn",
    guestCount: 120,
    addOnIds: [],
    weekend: true,
    lateNight: false,
  });

  const result = useMemo(() => calculatePrice(inputs), [inputs]);

  function toggleAddOn(id: string) {
    setInputs((prev) =>
      prev.addOnIds.includes(id)
        ? { ...prev, addOnIds: prev.addOnIds.filter((x) => x !== id) }
        : { ...prev, addOnIds: [...prev.addOnIds, id] },
    );
  }

  /**
   * Compose a message summary from the calculator state so the booking
   * sheet opens with the configured tier / distance / guests / add-ons
   * pre-filled into the message field. Visitor doesn't re-enter what
   * they already configured.
   */
  const calculatorSummary = useMemo(() => {
    const pkg = PACKAGES.find((p) => p.id === inputs.packageId);
    const distance = DISTANCE_TIERS.find((d) => d.id === inputs.distanceTierId);
    const addOnNames = inputs.addOnIds
      .map((id) => ADD_ONS.find((a) => a.id === id))
      .filter((a): a is (typeof ADD_ONS)[number] => Boolean(a))
      .map((a) => text(locale, a.name));

    const lines = [
      locale === "en"
        ? "Configured in the calculator:"
        : "Kalkulaatoris konfigureeritud:",
      pkg ? `${text(locale, pkg.name)} · ${pkg.hours}h` : "",
      distance ? text(locale, distance.label) : "",
      `${inputs.guestCount} ${locale === "en" ? "guests" : "külalist"}`,
      addOnNames.length
        ? `${locale === "en" ? "Add-ons" : "Lisad"}: ${addOnNames.join(", ")}`
        : "",
      inputs.weekend
        ? locale === "en"
          ? "Weekend"
          : "Nädalavahetus"
        : "",
      inputs.lateNight
        ? locale === "en"
          ? "Late-night (past 00:00)"
          : "Hiline õhtu (üle 00:00)"
        : "",
      `${locale === "en" ? "Indicative total" : "Indikatiivne kokku"}: ${formatEur(result.total, locale)}`,
    ];
    return lines.filter(Boolean).join("\n");
  }, [inputs, result.total, locale]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-8 rounded-3xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6 md:p-10">
        {/* Package — Custom Activation is intentionally excluded; pricing-by-quote */}
        <Field label={copy.package}>
          <div className="grid gap-3 md:grid-cols-2">
            {PACKAGES.filter((p) => !p.customPricing).map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() =>
                  setInputs((prev) => ({ ...prev, packageId: pkg.id as PackageId }))
                }
                className={[
                  "flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors",
                  inputs.packageId === pkg.id
                    ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)]/8"
                    : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)] hover:border-[color:var(--color-stroke-medium)]",
                ].join(" ")}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
                  {text(locale, pkg.name)}
                </span>
                <span className="font-medium tabular-nums">
                  {formatEur(pkg.basePrice, locale)} · {pkg.hours}h
                </span>
              </button>
            ))}
          </div>

          {/* Custom-tier off-ramp */}
          <Link
            href={"/turundus" as "/turundus"}
            className="mt-3 flex flex-col gap-1 rounded-xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)] px-4 py-3 text-left transition-colors hover:border-[color:var(--color-brand-primary)]/50"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
              {copy.customCalloutTitle}
            </span>
            <span className="text-sm text-[color:var(--color-text-secondary)]">
              {copy.customCalloutBody}
            </span>
            <span className="mt-1 font-mono text-xs uppercase tracking-wider text-white">
              {copy.customCalloutCta}
            </span>
          </Link>
        </Field>

        {/* Distance */}
        <Field label={copy.distance}>
          <div className="grid gap-2 md:grid-cols-2">
            {DISTANCE_TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() =>
                  setInputs((prev) => ({ ...prev, distanceTierId: tier.id }))
                }
                className={[
                  "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  inputs.distanceTierId === tier.id
                    ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)]/8"
                    : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)] hover:border-[color:var(--color-stroke-medium)]",
                ].join(" ")}
              >
                <span>{text(locale, tier.label)}</span>
                <span className="font-mono tabular-nums text-[color:var(--color-text-tertiary)]">
                  {tier.fee > 0 ? `+${formatEur(tier.fee, locale)}` : "–"}
                </span>
              </button>
            ))}
          </div>
        </Field>

        {/* Guests */}
        <Field
          label={copy.guests}
          hint={`${inputs.guestCount} ${
            locale === "en" ? "guests" : "külalist"
          }`}
        >
          <input
            type="range"
            min={20}
            max={600}
            step={10}
            value={inputs.guestCount}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                guestCount: Number(e.target.value),
              }))
            }
            className="w-full accent-[color:var(--color-brand-primary)]"
          />
        </Field>

        {/* Timing */}
        <Field label={copy.timing}>
          <div className="flex flex-wrap gap-3">
            <Toggle
              label={copy.weekend}
              checked={inputs.weekend}
              onChange={(v) =>
                setInputs((prev) => ({ ...prev, weekend: v }))
              }
            />
            <Toggle
              label={copy.lateNight}
              checked={inputs.lateNight}
              onChange={(v) =>
                setInputs((prev) => ({ ...prev, lateNight: v }))
              }
            />
          </div>
        </Field>

        {/* Add-ons */}
        <Field label={copy.addOns}>
          <div className="grid gap-2 md:grid-cols-2">
            {ADD_ONS.map((addOn) => {
              const active = inputs.addOnIds.includes(addOn.id);
              return (
                <button
                  key={addOn.id}
                  type="button"
                  onClick={() => toggleAddOn(addOn.id)}
                  className={[
                    "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    active
                      ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)]/8"
                      : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)] hover:border-[color:var(--color-stroke-medium)]",
                  ].join(" ")}
                >
                  <span>{text(locale, addOn.name)}</span>
                  <span className="font-mono tabular-nums text-[color:var(--color-brand-accent)]">
                    +{formatEur(addOn.price, locale)}
                  </span>
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      {/* Breakdown */}
      <aside className="sticky top-24 flex h-fit flex-col gap-6 rounded-3xl border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/8 p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
          {copy.breakdown}
        </p>
        <ul className="flex flex-col divide-y divide-white/10">
          {result.lines.map((line, i) => (
            <li
              key={i}
              className="flex items-baseline justify-between gap-3 py-3 text-sm"
            >
              <span className="text-[color:var(--color-text-secondary)]">
                {text(locale, line.label)}
              </span>
              <span className="font-mono tabular-nums">
                {formatEur(line.amount, locale)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-1 border-t border-white/15 pt-4">
          <Row label={copy.subtotal} value={formatEur(result.subtotal, locale)} />
          <Row label={copy.vat} value={formatEur(result.vat, locale)} />
          <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-white/20 pt-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white">
              {copy.total}
            </p>
            <p
              className="font-medium tabular-nums leading-none"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {formatEur(result.total, locale)}
            </p>
          </div>
        </div>
        <BookingTrigger
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand-primary)] px-5 py-3 text-center font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-brand-secondary)]"
          initialState={{ message: calculatorSummary }}
        >
          {copy.ctaQuote} →
        </BookingTrigger>
        <p className="text-xs text-[color:var(--color-text-tertiary)]">
          {copy.note}
        </p>
      </aside>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {label}
        </p>
        {hint && (
          <p className="font-mono text-xs text-[color:var(--color-text-tertiary)]">
            {hint}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
        checked
          ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)]/15 text-white"
          : "border-[color:var(--color-stroke-medium)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-surface-raised)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between text-sm">
      <span className="text-[color:var(--color-text-secondary)]">{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  );
}
