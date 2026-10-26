import { ArrowUp } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { UI } from "@/content/site";
import { cn } from "@/lib/utils";
import { useCurrentPage } from "./LangContext";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

function ScrollTop() {
  const { lang } = useCurrentPage();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      type="button"
      aria-label={UI[lang].backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className={cn(
        "fixed bottom-5 right-5 z-30 inline-flex size-11 items-center justify-center rounded-full border border-primary/20 bg-surface text-primary shadow-soft transition-all duration-300 hover:bg-primary hover:text-primary-foreground",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}

/** Moves focus to <main> after client-side page changes so screen readers announce the new page. */
function FocusOnNavigate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (first) {
      setFirst(false);
      return;
    }
    if (!window.location.hash) document.getElementById("main")?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

export function Shell({ children }: { children: ReactNode }) {
  const { lang } = useCurrentPage();
  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {UI[lang].skip}
      </a>
      <SiteHeader />
      <FocusOnNavigate />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <ScrollTop />
    </>
  );
}
