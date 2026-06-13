import { useEffect, type RefObject } from "react";

/**
 * Trap keyboard focus inside `ref` while `active` is true, and restore
 * focus to whatever was focused before (the trigger) when it deactivates.
 *
 * Hand-written (no dependency) — the project has no focus-trap library and
 * the booking sheet is the only modal that needs it. Tab / Shift+Tab cycle
 * within the panel; hidden elements are skipped.
 */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
): void {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || !node) return;

      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);

      if (focusables.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const activeEl = document.activeElement;

      if (e.shiftKey) {
        if (activeEl === first || activeEl === node) {
          e.preventDefault();
          last.focus();
        }
      } else if (activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    }

    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [ref, active]);
}
