"use client";

import { useLocale } from "next-intl";
import { useBookingFlow } from "../BookingFlowProvider";
import type { SiteLocale } from "@/lib/site-content";

const COPY = {
  en: {
    question: "When is it?",
    hint: "A specific date or a rough window — both work.",
    dateLabel: "Event date",
    flexible: "I'm flexible",
    flexibleHint: "Pick a date later, on the call",
  },
  et: {
    question: "Millal see toimub?",
    hint: "Konkreetne kuupäev või umbkaudne aken — mõlemad sobivad.",
    dateLabel: "Ürituse kuupäev",
    flexible: "Olen paindlik",
    flexibleHint: "Vali kuupäev hiljem, kõnel",
  },
} as const;

export function StepDate() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const { state, setField, goNext } = useBookingFlow();
  const copy = COPY[locale];

  function pickFlexible() {
    setField("eventDate", "flexible");
    window.setTimeout(() => goNext(), 240);
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

      <label className="flex flex-col gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.dateLabel}
        </span>
        <input
          type="date"
          value={state.eventDate === "flexible" ? "" : state.eventDate}
          onChange={(e) => setField("eventDate", e.target.value)}
          className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
        />
      </label>

      <button
        type="button"
        onClick={pickFlexible}
        className={[
          "flex flex-col items-start gap-1 rounded-2xl border p-5 text-left transition-all duration-200",
          state.eventDate === "flexible"
            ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)]/12 shadow-[var(--glow-soft)]"
            : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] hover:border-[color:var(--color-stroke-medium)]",
        ].join(" ")}
      >
        <span
          className="font-medium leading-tight text-white"
          style={{ fontSize: "var(--text-title)" }}
        >
          {copy.flexible}
        </span>
        <span className="text-sm text-[color:var(--color-text-secondary)]">
          {copy.flexibleHint}
        </span>
      </button>
    </div>
  );
}
