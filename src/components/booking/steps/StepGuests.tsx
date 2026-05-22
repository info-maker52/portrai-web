"use client";

import { useLocale } from "next-intl";
import { useBookingFlow } from "../BookingFlowProvider";
import type { SiteLocale } from "@/lib/site-content";

const COPY = {
  en: {
    question: "How many guests?",
    hint: "A rough number is fine — drag the slider or type.",
    label: "Guests",
    suffix: "guests",
  },
  et: {
    question: "Kui palju külalisi?",
    hint: "Umbkaudne number on okei — libista või kirjuta.",
    label: "Külalisi",
    suffix: "külalist",
  },
} as const;

const MIN = 20;
const MAX = 600;
const DEFAULT = 120;

export function StepGuests() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const { state, setField } = useBookingFlow();
  const copy = COPY[locale];

  const value = state.guestCount ?? DEFAULT;

  function set(n: number) {
    const clamped = Math.max(MIN, Math.min(MAX, n));
    setField("guestCount", clamped);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2
          className="leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            fontWeight: 400,
          }}
        >
          {copy.question}
        </h2>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          {copy.hint}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Big live read-out — display serif. */}
        <p
          className="leading-none tracking-tight text-[color:var(--color-brand-accent)]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 12vw, 7rem)",
            fontWeight: 400,
          }}
        >
          {value}
          <span
            className="ml-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {copy.suffix}
          </span>
        </p>

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={10}
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          className="w-full accent-[color:var(--color-brand-primary)]"
          aria-label={copy.label}
        />

        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
          <span>{MIN}</span>
          <span>{MAX}+</span>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.label}
          </span>
          <input
            type="number"
            min={MIN}
            max={MAX * 2}
            value={value}
            onChange={(e) => set(Number(e.target.value))}
            className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
