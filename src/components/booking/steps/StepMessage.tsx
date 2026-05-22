"use client";

import { useLocale } from "next-intl";
import { useBookingFlow } from "../BookingFlowProvider";
import type { SiteLocale } from "@/lib/site-content";

const COPY = {
  en: {
    question: "Anything else we should know?",
    hint: "Optional. Theme, brand colours, schedule, who's hosting — whatever helps.",
    label: "Tell us about it",
    placeholder:
      "Saturday in May, ~150 people, want it to feel like a year-end party but in good taste.",
  },
  et: {
    question: "Mis veel võiks meile teada olla?",
    hint: "Valikuline. Teema, brändi värvid, ajakava, kes võõrustab — mis aitab.",
    label: "Räägi sellest",
    placeholder:
      "Laupäev mais, ~150 inimest, tahaks tunde nagu aastapeol, aga heas maitses.",
  },
} as const;

export function StepMessage() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const { state, setField } = useBookingFlow();
  const copy = COPY[locale];

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

      <label className="flex flex-col gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.label}
        </span>
        <textarea
          rows={6}
          value={state.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder={copy.placeholder}
          className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-brand-primary)] focus:outline-none"
        />
      </label>
    </div>
  );
}
