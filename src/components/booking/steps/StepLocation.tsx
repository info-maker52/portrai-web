"use client";

import { useLocale } from "next-intl";
import { useBookingFlow } from "../BookingFlowProvider";
import type { SiteLocale } from "@/lib/site-content";

const COPY = {
  en: {
    question: "Where is the event?",
    hint: "City + venue if you have it. Just a city is fine.",
    label: "Location",
    placeholder: "Tallinn, Kultuurikatel",
  },
  et: {
    question: "Kus üritus toimub?",
    hint: "Linn + venue, kui see on teada. Ainult linn on ka okei.",
    label: "Asukoht",
    placeholder: "Tallinn, Kultuurikatel",
  },
} as const;

export function StepLocation() {
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
        <input
          type="text"
          value={state.eventLocation}
          onChange={(e) => setField("eventLocation", e.target.value)}
          placeholder={copy.placeholder}
          className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-brand-primary)] focus:outline-none"
        />
      </label>
    </div>
  );
}
