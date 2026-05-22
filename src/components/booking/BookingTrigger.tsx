"use client";

import { useBookingFlow, type BookingState } from "./BookingFlowProvider";

/**
 * Drop-in replacement for `<Link href="/kontakt">…</Link>` on
 * booking CTAs. Calls `openBookingFlow()` instead of navigating.
 *
 * Visual styling stays on the caller — pass `className` exactly as
 * you would on a Link. The component renders a `<button>` underneath
 * so semantics are correct for an action that opens a dialog.
 *
 * `initialState` allows callers to pre-fill the flow — used by the
 * pricing calculator to push package/distance/guests/add-on summary
 * into the message field, so the visitor doesn't re-enter what they
 * already configured.
 */

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initialState?: Partial<BookingState>;
  /** Optional explicit aria-label for screen readers. */
  ariaLabel?: string;
  /** Hide from assistive tech (mirrors aria-hidden on the underlying button). */
  ariaHidden?: boolean;
};

export function BookingTrigger({
  children,
  className,
  style,
  initialState,
  ariaLabel,
  ariaHidden,
}: Props) {
  const { open } = useBookingFlow();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      onClick={() => open(initialState)}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
