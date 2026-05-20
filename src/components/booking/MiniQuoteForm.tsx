"use client";

import { type FormEvent, useState } from "react";
import { useLocale } from "next-intl";
import type { SiteLocale } from "@/lib/site-content";

type Status = "idle" | "submitting" | "success" | "error";

const COPY: Record<
  SiteLocale,
  {
    eyebrow: string;
    title: string;
    sub: string;
    emailLabel: string;
    emailPlaceholder: string;
    button: string;
    sending: string;
    success: string;
    error: string;
    sendAnother: string;
    or: string;
  }
> = {
  en: {
    eyebrow: "Lowest-friction option",
    title: "Just drop your email.",
    sub: "We'll send a 3-question follow-up — enough to send back a sharp first proposal.",
    emailLabel: "Email",
    emailPlaceholder: "you@company.ee",
    button: "Send me the brief",
    sending: "Sending...",
    success: "Got it. Check your inbox within 3 business hours.",
    error: "Something went wrong. Try the full wizard below.",
    sendAnother: "Send another",
    or: "Or use the full wizard below ↓",
  },
  et: {
    eyebrow: "Madalaima hõõrdumisega valik",
    title: "Jäta lihtsalt oma e-posti aadress.",
    sub: "Saadame 3-küsimusega järeluuringu — sellest piisab, et saata tagasi terav esimene ettepanek.",
    emailLabel: "E-post",
    emailPlaceholder: "sina@ettevote.ee",
    button: "Saatke brief",
    sending: "Saadan...",
    success: "Saime kätte. Vasta saabub 3 töötunni jooksul.",
    error: "Midagi läks valesti. Proovi täisvormi all.",
    sendAnother: "Saada uus",
    or: "Või kasuta täisvormi all ↓",
  },
};

/**
 * Single-field email capture above the wizard on /kontakt. Catches
 * top-of-funnel visitors who want the lowest-friction path. Posts the
 * minimum required payload (name = "Quick brief", email, message) to
 * the existing /api/booking endpoint so the email lands in the same
 * inbox as full wizard submissions.
 */
export function MiniQuoteForm() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const copy = COPY[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formEl = e.currentTarget;
    const email = String(new FormData(formEl).get("email") ?? "").trim();
    if (!email) {
      setStatus("error");
      setError("Email required");
      return;
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Quick brief",
          email,
          message:
            "[MiniQuoteForm] Visitor used the one-field email capture on /kontakt. Send the 3-question follow-up to shape the brief.",
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error ?? "Request failed");
      }
      setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/8 p-6">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
          ✓
        </p>
        <p
          className="mb-3 font-medium leading-tight"
          style={{ fontSize: "var(--text-title)" }}
        >
          {copy.success}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-white hover:underline"
        >
          {copy.sendAnother} →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/8 p-6"
    >
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
        {copy.eyebrow}
      </p>
      <p
        className="mb-3 font-medium leading-tight"
        style={{ fontSize: "var(--text-title)" }}
      >
        {copy.title}
      </p>
      <p className="mb-5 text-sm text-[color:var(--color-text-secondary)]">
        {copy.sub}
      </p>

      <label className="mb-4 flex flex-col gap-2">
        <span className="sr-only">{copy.emailLabel}</span>
        <input
          type="email"
          name="email"
          required
          placeholder={copy.emailPlaceholder}
          className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-brand-primary)] focus:outline-none"
        />
      </label>

      {status === "error" && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-danger)]">
          {copy.error}
          {error && (
            <span className="ml-2 normal-case text-[color:var(--color-text-tertiary)]">
              ({error})
            </span>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[color:var(--color-brand-primary)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? copy.sending : `${copy.button} →`}
      </button>

      <p className="mt-4 text-[11px] text-[color:var(--color-text-tertiary)]">
        {copy.or}
      </p>
    </form>
  );
}
