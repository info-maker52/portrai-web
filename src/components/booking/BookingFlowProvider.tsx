"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * BookingFlowProvider — single source of state for the guided booking
 * sheet. Mounted once at the locale layout level so any descendant
 * (sticky CTA, hero button, footer link, calculator) can call
 * `useBookingFlow().open()` without prop-drilling.
 *
 * State is in-memory only — no URL params, no shareable links. Closing
 * the sheet preserves state for the rest of the session so an accidental
 * close isn't a reset; opening fresh restores at step 0.
 *
 * Step routing depends on the event type:
 *   - `wedding` → skips "guests" step (smart default 80)
 *   - `brand`, `tradeshow` → skips "guests", contact step adds the
 *     company field
 *   - `other` → jumps from event-type straight to message + contact
 *
 * The provider does not render the sheet UI. The `<BookingFlow />`
 * component (a sibling under the same layout) subscribes to the
 * provider state and renders the sheet when `isOpen` is true.
 */

export type BookingStep =
  | "event-type"
  | "date"
  | "location"
  | "guests"
  | "message"
  | "contact"
  | "review";

export type BookingEventType =
  | "brand"
  | "corporate"
  | "wedding"
  | "private"
  | "tradeshow"
  | "other"
  | "";

export type BookingState = {
  step: BookingStep;
  eventType: BookingEventType;
  eventDate: string; // YYYY-MM-DD or "flexible" or ""
  eventLocation: string;
  guestCount: number | null;
  message: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  /** GDPR consent given on the contact step. Required before submit. */
  consent: boolean;
  status: "idle" | "submitting" | "success" | "error";
  errorMessage: string | null;
};

const INITIAL_STATE: BookingState = {
  step: "event-type",
  eventType: "",
  eventDate: "",
  eventLocation: "",
  guestCount: null,
  message: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  consent: false,
  status: "idle",
  errorMessage: null,
};

/**
 * Step order — used for progress dots and back/next navigation.
 * Steps are filtered per event type at render time; the canonical
 * list lives here so progress is computed against the SAME shape
 * the visitor sees, not against a global ordering.
 */
export const STEP_ORDER: BookingStep[] = [
  "event-type",
  "date",
  "location",
  "guests",
  "message",
  "contact",
  "review",
];

/**
 * Steps that are skipped based on the chosen event type. Returns the
 * visible step list. Always starts with event-type and ends with
 * review.
 */
export function visibleSteps(eventType: BookingEventType): BookingStep[] {
  if (eventType === "other") {
    // Short path — they didn't classify, jump to message + contact.
    return ["event-type", "message", "contact", "review"];
  }
  if (
    eventType === "wedding" ||
    eventType === "brand" ||
    eventType === "tradeshow"
  ) {
    // Skip the guests slider; we'll ask on the call.
    return ["event-type", "date", "location", "message", "contact", "review"];
  }
  // corporate / private / not-yet-chosen — full path.
  return [
    "event-type",
    "date",
    "location",
    "guests",
    "message",
    "contact",
    "review",
  ];
}

/**
 * Helper for the step components — given current state, returns the
 * next/previous step in the visible list, or null if at edges.
 */
function adjacentStep(
  current: BookingStep,
  eventType: BookingEventType,
  direction: "next" | "prev",
): BookingStep | null {
  const steps = visibleSteps(eventType);
  const idx = steps.indexOf(current);
  if (idx === -1) return null;
  const targetIdx = direction === "next" ? idx + 1 : idx - 1;
  if (targetIdx < 0 || targetIdx >= steps.length) return null;
  return steps[targetIdx]!;
}

type BookingFlowContextValue = {
  isOpen: boolean;
  state: BookingState;
  open: (initial?: Partial<BookingState>) => void;
  close: () => void;
  setField: <K extends keyof BookingState>(
    key: K,
    value: BookingState[K],
  ) => void;
  goNext: () => void;
  goBack: () => void;
  goToStep: (step: BookingStep) => void;
  reset: () => void;
  submit: () => Promise<void>;
};

const BookingFlowContext = createContext<BookingFlowContextValue | null>(null);

export function BookingFlowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<BookingState>(INITIAL_STATE);
  // Track whether the visitor has interacted at all — used to decide
  // whether closing should preserve state or reset.
  const hasInteractedRef = useRef(false);

  const open = useCallback((initial?: Partial<BookingState>) => {
    if (initial) {
      setState((prev) => ({ ...prev, ...initial }));
      hasInteractedRef.current = true;
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    hasInteractedRef.current = false;
  }, []);

  const setField = useCallback(
    <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
      hasInteractedRef.current = true;
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const goNext = useCallback(() => {
    setState((prev) => {
      const next = adjacentStep(prev.step, prev.eventType, "next");
      if (!next) return prev;
      return { ...prev, step: next };
    });
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      const prevStep = adjacentStep(prev.step, prev.eventType, "prev");
      if (!prevStep) return prev;
      return { ...prev, step: prevStep };
    });
  }, []);

  const goToStep = useCallback((step: BookingStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const submit = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "submitting", errorMessage: null }));

    // Compose the payload — the existing /api/booking endpoint expects
    // name, email, eventType, eventDate, eventLocation, guestCount,
    // phone, message. We push company + smart-routed values into
    // message so nothing is lost.
    const composedMessage = [
      state.message.trim(),
      state.company ? `Company / brand: ${state.company}` : "",
      state.guestCount ? `Guest count: ${state.guestCount}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
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
          guestCount: state.guestCount?.toString() ?? "",
          message: composedMessage || "[Booking flow submission]",
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error ?? "Request failed");
      }
      setState((prev) => ({ ...prev, status: "success", errorMessage: null }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: "error",
        errorMessage: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, [state]);

  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  const value = useMemo<BookingFlowContextValue>(
    () => ({
      isOpen,
      state,
      open,
      close,
      setField,
      goNext,
      goBack,
      goToStep,
      reset,
      submit,
    }),
    [isOpen, state, open, close, setField, goNext, goBack, goToStep, reset, submit],
  );

  return (
    <BookingFlowContext.Provider value={value}>
      {children}
    </BookingFlowContext.Provider>
  );
}

export function useBookingFlow(): BookingFlowContextValue {
  const ctx = useContext(BookingFlowContext);
  if (!ctx) {
    throw new Error("useBookingFlow must be used inside <BookingFlowProvider>");
  }
  return ctx;
}
