"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ADD_ONS,
  DISTANCE_TIERS,
  formatEur,
  PACKAGES,
  type PackageId,
} from "@/lib/pricing";
import { type SiteLocale, text } from "@/lib/site-content";

/**
 * Multi-step booking wizard.
 * Borrows the fotoboksi-rent.ee staircase pattern: date → event type →
 * package + add-ons → details → review/send. Perceived progress converts
 * better than a single contact form.
 *
 * Reads URL params on mount so the calculator can deep-link straight into
 * a pre-filled wizard.
 */

type Status = "idle" | "submitting" | "success" | "error";

const COPY = {
  en: {
    steps: ["Event", "Package", "Details", "Review"],
    eventTypeLabel: "What kind of event?",
    eventDateLabel: "Event date",
    eventLocationLabel: "Where is it?",
    guestCountLabel: "How many guests?",
    packageLabel: "Pick a starting package",
    addOnsLabel: "Add-ons",
    distanceLabel: "Distance from Tallinn",
    nameLabel: "Your name",
    emailLabel: "Email",
    phoneLabel: "Phone (optional)",
    notesLabel: "Anything else we should know?",
    notesPlaceholder:
      "Theme idea, schedule, brand colours — anything that helps shape the quote.",
    next: "Next",
    back: "Back",
    submit: "Send request",
    sending: "Sending...",
    success: "Got it. We'll reply within 24 hours.",
    sendAnother: "Send another",
    error: "Something went wrong. Please try again or email info@portrai.ee.",
    eventTypes: [
      { value: "wedding", label: "Wedding / private" },
      { value: "corporate", label: "Company party" },
      { value: "trade-show", label: "Trade show / conference" },
      { value: "festival", label: "Festival / public event" },
      { value: "marketing", label: "Brand activation" },
      { value: "custom", label: "Something else" },
    ],
    review: "Review",
    summaryEvent: "Event",
    summaryPackage: "Package",
    summaryAddOns: "Add-ons",
    summaryNone: "None",
    placeholders: {
      name: "Reijo Pullai",
      email: "you@company.ee",
      phone: "+372 5555 5555",
      location: "Tallinn, Tartu, Helsinki...",
    },
    intro:
      "Four short steps. We'll come back with a precise quote within 24 hours.",
  },
  et: {
    steps: ["Üritus", "Pakett", "Detailid", "Ülevaade"],
    eventTypeLabel: "Millise üritusega on tegu?",
    eventDateLabel: "Ürituse kuupäev",
    eventLocationLabel: "Kus üritus toimub?",
    guestCountLabel: "Kui palju külalisi?",
    packageLabel: "Vali lähtepakett",
    addOnsLabel: "Lisad",
    distanceLabel: "Kaugus Tallinnast",
    nameLabel: "Sinu nimi",
    emailLabel: "E-post",
    phoneLabel: "Telefon (valikuline)",
    notesLabel: "Mida võiks veel teada?",
    notesPlaceholder:
      "Teema idee, ajakava, brändi värvid — kõik, mis aitab pakkumist täpsustada.",
    next: "Edasi",
    back: "Tagasi",
    submit: "Saada päring",
    sending: "Saadan...",
    success: "Aitäh! Vastame 24 tunni jooksul.",
    sendAnother: "Saada uus",
    error: "Midagi läks valesti. Proovi uuesti või kirjuta info@portrai.ee.",
    eventTypes: [
      { value: "wedding", label: "Pulm / privaatne" },
      { value: "corporate", label: "Firmapidu" },
      { value: "trade-show", label: "Mess / konverents" },
      { value: "festival", label: "Festival / avalik üritus" },
      { value: "marketing", label: "Brändi-aktivatsioon" },
      { value: "custom", label: "Midagi muud" },
    ],
    review: "Ülevaade",
    summaryEvent: "Üritus",
    summaryPackage: "Pakett",
    summaryAddOns: "Lisad",
    summaryNone: "Pole",
    placeholders: {
      name: "Reijo Pullai",
      email: "sina@ettevote.ee",
      phone: "+372 5555 5555",
      location: "Tallinn, Tartu, Helsinki...",
    },
    intro:
      "Neli lühikest sammu. Tuleme tagasi täpse pakkumisega 24 tunni jooksul.",
  },
} as const;

type WizardState = {
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  packageId: PackageId;
  distance: string;
  addOns: string[];
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL: WizardState = {
  eventType: "",
  eventDate: "",
  eventLocation: "",
  guestCount: "",
  packageId: "signature",
  distance: "tallinn",
  addOns: [],
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function BookingWizard({
  initial,
}: {
  initial?: Partial<WizardState>;
}) {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const copy = COPY[locale];

  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({ ...INITIAL, ...initial });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Pull URL params on mount (calculator → wizard deep link).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const overrides: Partial<WizardState> = {};
    const pkgParam = params.get("package");
    const distParam = params.get("distance");
    const guests = params.get("guests");
    const addOnsParam = params.get("addOns");
    if (pkgParam && PACKAGES.some((p) => p.id === pkgParam)) {
      overrides.packageId = pkgParam as PackageId;
    }
    if (distParam && DISTANCE_TIERS.some((d) => d.id === distParam)) {
      overrides.distance = distParam;
    }
    if (guests) overrides.guestCount = guests;
    if (addOnsParam) {
      overrides.addOns = addOnsParam
        .split(",")
        .filter((id) => ADD_ONS.some((a) => a.id === id));
    }
    if (Object.keys(overrides).length > 0) {
      setState((prev) => ({ ...prev, ...overrides }));
    }
  }, []);

  const totalSteps = copy.steps.length;
  const stepValid = useMemo(() => stepIsValid(step, state), [step, state]);

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAddOn(id: string) {
    setState((prev) =>
      prev.addOns.includes(id)
        ? { ...prev, addOns: prev.addOns.filter((x) => x !== id) }
        : { ...prev, addOns: [...prev.addOns, id] },
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < totalSteps - 1) {
      if (stepValid) setStep((s) => s + 1);
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const pkg = PACKAGES.find((p) => p.id === state.packageId);
      const addOnNames = state.addOns
        .map(
          (id) =>
            ADD_ONS.find((a) => a.id === id) &&
            text(locale, ADD_ONS.find((a) => a.id === id)!.name),
        )
        .filter(Boolean)
        .join(", ");
      const distance = DISTANCE_TIERS.find((d) => d.id === state.distance);

      const messageWithSummary = [
        state.message.trim(),
        "",
        "— Wizard summary —",
        `Package: ${pkg ? text(locale, pkg.name) : state.packageId}`,
        `Add-ons: ${addOnNames || copy.summaryNone}`,
        `Distance: ${distance ? text(locale, distance.label) : state.distance}`,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          phone: state.phone,
          eventType: state.eventType,
          eventDate: state.eventDate,
          eventLocation: state.eventLocation,
          guestCount: state.guestCount,
          message: messageWithSummary,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error ?? "Request failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/8 p-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
          ✓
        </p>
        <p
          className="mb-6 font-medium leading-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.success}
        </p>
        <button
          type="button"
          onClick={() => {
            setState(INITIAL);
            setStep(0);
            setStatus("idle");
          }}
          className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-white hover:underline"
        >
          {copy.sendAnother} →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        {copy.steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div
              className={[
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]",
                i <= step
                  ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)] text-white"
                  : "border-[color:var(--color-stroke-medium)] text-[color:var(--color-text-tertiary)]",
              ].join(" ")}
            >
              {i + 1}
            </div>
            <p
              className={[
                "hidden font-mono text-[11px] uppercase tracking-[0.2em] md:block",
                i === step
                  ? "text-white"
                  : "text-[color:var(--color-text-tertiary)]",
              ].join(" ")}
            >
              {label}
            </p>
            {i < totalSteps - 1 && (
              <div className="h-px flex-1 bg-[color:var(--color-stroke-subtle)]" />
            )}
          </div>
        ))}
      </div>

      {step === 0 && (
        <Step
          eyebrow={`(0${step + 1}/${totalSteps})`}
          title={copy.eventTypeLabel}
        >
          <div className="grid gap-2 md:grid-cols-2">
            {copy.eventTypes.map((opt) => (
              <SelectButton
                key={opt.value}
                label={opt.label}
                active={state.eventType === opt.value}
                onClick={() => update("eventType", opt.value)}
              />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FieldInput
              label={copy.eventDateLabel}
              type="date"
              value={state.eventDate}
              onChange={(v) => update("eventDate", v)}
            />
            <FieldInput
              label={copy.eventLocationLabel}
              type="text"
              value={state.eventLocation}
              placeholder={copy.placeholders.location}
              onChange={(v) => update("eventLocation", v)}
            />
          </div>
          <FieldInput
            label={copy.guestCountLabel}
            type="number"
            value={state.guestCount}
            placeholder="120"
            onChange={(v) => update("guestCount", v)}
          />
        </Step>
      )}

      {step === 1 && (
        <Step
          eyebrow={`(0${step + 1}/${totalSteps})`}
          title={copy.packageLabel}
        >
          <div className="grid gap-3 md:grid-cols-2">
            {PACKAGES.filter((p) => !p.customPricing).map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => update("packageId", pkg.id as PackageId)}
                className={[
                  "flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors",
                  state.packageId === pkg.id
                    ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)]/8"
                    : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)]",
                ].join(" ")}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
                  {text(locale, pkg.name)}
                </span>
                <span className="font-medium tabular-nums">
                  {formatEur(pkg.basePrice, locale)} · {pkg.hours}h
                </span>
                <span className="text-xs text-[color:var(--color-text-tertiary)]">
                  {text(locale, pkg.tagline)}
                </span>
              </button>
            ))}
            {/* Custom Activation off-ramp — quote-by-conversation */}
            <Link
              href="/turundus"
              className="flex flex-col items-start gap-2 rounded-2xl border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/8 p-4 text-left transition-colors hover:border-[color:var(--color-brand-primary)] md:col-span-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                {locale === "en" ? "Custom Activation" : "Kohandatud aktivatsioon"}
              </span>
              <span className="font-medium">
                {locale === "en"
                  ? "Bespoke campaigns + virtual AI widgets — talk to us"
                  : "Eritellimusel kampaaniad + virtuaalsed AI-widgetid — räägi meiega"}
              </span>
              <span className="text-xs text-[color:var(--color-text-tertiary)]">
                {locale === "en"
                  ? "Award territory — Swedbank, Synlab, Von Fock, Laulupidu"
                  : "Auhinnatud territoorium — Swedbank, Synlab, Von Fock, Laulupidu"}
              </span>
            </Link>
          </div>

          <FieldLabel label={copy.distanceLabel}>
            <div className="grid gap-2 md:grid-cols-2">
              {DISTANCE_TIERS.map((tier) => (
                <SelectButton
                  key={tier.id}
                  label={`${text(locale, tier.label)}${
                    tier.fee > 0 ? `  ·  +${formatEur(tier.fee, locale)}` : ""
                  }`}
                  active={state.distance === tier.id}
                  onClick={() => update("distance", tier.id)}
                />
              ))}
            </div>
          </FieldLabel>

          <FieldLabel label={copy.addOnsLabel}>
            <div className="grid gap-2 md:grid-cols-2">
              {ADD_ONS.map((addOn) => (
                <SelectButton
                  key={addOn.id}
                  label={`${text(locale, addOn.name)}  ·  +${formatEur(
                    addOn.price,
                    locale,
                  )}`}
                  active={state.addOns.includes(addOn.id)}
                  onClick={() => toggleAddOn(addOn.id)}
                />
              ))}
            </div>
          </FieldLabel>
        </Step>
      )}

      {step === 2 && (
        <Step
          eyebrow={`(0${step + 1}/${totalSteps})`}
          title={copy.nameLabel}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <FieldInput
              label={copy.nameLabel}
              type="text"
              value={state.name}
              placeholder={copy.placeholders.name}
              onChange={(v) => update("name", v)}
              required
            />
            <FieldInput
              label={copy.emailLabel}
              type="email"
              value={state.email}
              placeholder={copy.placeholders.email}
              onChange={(v) => update("email", v)}
              required
            />
          </div>
          <FieldInput
            label={copy.phoneLabel}
            type="tel"
            value={state.phone}
            placeholder={copy.placeholders.phone}
            onChange={(v) => update("phone", v)}
          />
          <FieldArea
            label={copy.notesLabel}
            value={state.message}
            placeholder={copy.notesPlaceholder}
            onChange={(v) => update("message", v)}
          />
        </Step>
      )}

      {step === 3 && (
        <Step eyebrow={`(0${step + 1}/${totalSteps})`} title={copy.review}>
          <SummaryRow
            label={copy.summaryEvent}
            value={[
              state.eventType
                ? copy.eventTypes.find((e) => e.value === state.eventType)?.label
                : null,
              state.eventDate || null,
              state.eventLocation || null,
              state.guestCount
                ? `${state.guestCount} ${
                    locale === "en" ? "guests" : "külalist"
                  }`
                : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          />
          <SummaryRow
            label={copy.summaryPackage}
            value={[
              text(locale, PACKAGES.find((p) => p.id === state.packageId)!.name),
              text(locale, DISTANCE_TIERS.find((d) => d.id === state.distance)!.label),
            ].join(" · ")}
          />
          <SummaryRow
            label={copy.summaryAddOns}
            value={
              state.addOns.length === 0
                ? copy.summaryNone
                : state.addOns
                    .map((id) =>
                      text(locale, ADD_ONS.find((a) => a.id === id)!.name),
                    )
                    .join(", ")
            }
          />
          <SummaryRow label={copy.nameLabel} value={state.name} />
          <SummaryRow label={copy.emailLabel} value={state.email} />
          {state.phone && (
            <SummaryRow label={copy.phoneLabel} value={state.phone} />
          )}
          {state.message && (
            <SummaryRow label={copy.notesLabel} value={state.message} />
          )}
        </Step>
      )}

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-danger)]">
          {copy.error}
          {error && (
            <span className="ml-2 normal-case text-[color:var(--color-text-tertiary)]">
              ({error})
            </span>
          )}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-full border border-[color:var(--color-stroke-medium)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
          >
            ← {copy.back}
          </button>
        )}
        <button
          type="submit"
          disabled={!stepValid || status === "submitting"}
          className="rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-soft)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting"
            ? copy.sending
            : step === totalSteps - 1
              ? copy.submit
              : `${copy.next} →`}
        </button>
        <Link
          href="/kalkulaator"
          className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-white hover:underline"
        >
          {locale === "en" ? "Open calculator" : "Ava kalkulaator"} →
        </Link>
      </div>
    </form>
  );
}

function stepIsValid(step: number, s: WizardState): boolean {
  switch (step) {
    case 0:
      return s.eventType.length > 0;
    case 1:
      return Boolean(s.packageId && s.distance);
    case 2:
      return s.name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email);
    case 3:
      return true;
    default:
      return false;
  }
}

function Step({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
        {eyebrow}
      </p>
      <h2
        className="font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-md)" }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function SelectButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
        active
          ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)]/8 text-white"
          : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-stroke-medium)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
        {label}
      </p>
      {children}
    </div>
  );
}

function FieldInput({
  label,
  type,
  value,
  placeholder,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
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
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}

function FieldArea({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
        {label}
      </span>
      <textarea
        rows={5}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-[color:var(--color-stroke-subtle)] py-3 md:flex-row md:items-baseline md:justify-between md:gap-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
        {label}
      </span>
      <span className="text-sm text-white">{value || "—"}</span>
    </div>
  );
}
