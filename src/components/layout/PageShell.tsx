import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { StickyContactBar } from "./StickyContactBar";
import { StickyQuoteCta } from "./StickyQuoteCta";

/**
 * Standard page shell — header + main + footer.
 * Use for every page except the home (which gets a special intro/full-bleed layout).
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 pb-20 outline-none md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <StickyContactBar />
      <StickyQuoteCta />
    </div>
  );
}
