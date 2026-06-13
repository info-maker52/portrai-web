"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useBookingFlow } from "../BookingFlowProvider";
import type { SiteLocale } from "@/lib/site-content";

const COPY = {
  en: {
    question: "How do we reach you?",
    hint: "Name and email are all we need to send a quote.",
    nameLabel: "Your name",
    namePlaceholder: "Reijo Pullai",
    emailLabel: "Email",
    emailPlaceholder: "you@company.ee",
    phoneLabel: "Phone (optional)",
    phonePlaceholder: "+372 5555 5555",
    companyLabel: "Company / brand",
    companyPlaceholder: "Swedbank, Telia, your agency…",
    consentBefore: "I agree that PortrAI may process my data to reply to this request. See the ",
    consentLink: "privacy policy",
    consentAfter: ".",
  },
  et: {
    question: "Kuidas sinuga ühendust saame?",
    hint: "Nime ja e-postiga saame pakkumise saata.",
    nameLabel: "Sinu nimi",
    namePlaceholder: "Reijo Pullai",
    emailLabel: "E-post",
    emailPlaceholder: "sina@ettevote.ee",
    phoneLabel: "Telefon (valikuline)",
    phonePlaceholder: "+372 5555 5555",
    companyLabel: "Ettevõte / bränd",
    companyPlaceholder: "Swedbank, Telia, sinu agentuur…",
    consentBefore: "Nõustun, et PortrAI võib töödelda mu andmeid sellele päringule vastamiseks. Vaata ",
    consentLink: "privaatsuspoliitikat",
    consentAfter: ".",
  },
} as const;

export function StepContact() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const { state, setField } = useBookingFlow();
  const copy = COPY[locale];

  // Brand / trade-show buyers see the company field; everyone else doesn't.
  const showCompany =
    state.eventType === "brand" || state.eventType === "tradeshow";

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
        <Field
          label={copy.nameLabel}
          type="text"
          value={state.name}
          onChange={(v) => setField("name", v)}
          placeholder={copy.namePlaceholder}
          autoComplete="name"
          required
        />
        <Field
          label={copy.emailLabel}
          type="email"
          value={state.email}
          onChange={(v) => setField("email", v)}
          placeholder={copy.emailPlaceholder}
          autoComplete="email"
          required
        />
        {showCompany && (
          <Field
            label={copy.companyLabel}
            type="text"
            value={state.company}
            onChange={(v) => setField("company", v)}
            placeholder={copy.companyPlaceholder}
            autoComplete="organization"
          />
        )}
        <Field
          label={copy.phoneLabel}
          type="tel"
          value={state.phone}
          onChange={(v) => setField("phone", v)}
          placeholder={copy.phonePlaceholder}
          autoComplete="tel"
        />

        <label className="flex cursor-pointer items-start gap-3 text-sm text-[color:var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={state.consent}
            onChange={(e) => setField("consent", e.target.checked)}
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--color-brand-primary)]"
          />
          <span className="leading-relaxed">
            {copy.consentBefore}
            <Link
              href="/privaatsus"
              target="_blank"
              className="text-[color:var(--color-brand-accent)] underline underline-offset-4"
            >
              {copy.consentLink}
            </Link>
            {copy.consentAfter}
          </span>
        </label>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
        {label}
        {required && (
          <span className="ml-1 text-[color:var(--color-brand-accent)]">*</span>
        )}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}
