import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CLINIC, routeTo, SERVICE_KEYS, UI, type Lang, type PageKey } from "@/content/site";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./Button";
import { useCurrentPage } from "./LangContext";
import { Logo } from "./Logo";

type Item = { key: PageKey; children?: PageKey[]; label?: keyof (typeof UI)["en"]["nav"] };

const NAV: Item[] = [
  { key: "home" },
  { key: "about", children: ["about", "cdcp"] },
  { key: "team" },
  { key: "general", label: "services", children: [...SERVICE_KEYS] },
  { key: "faq" },
  { key: "contact" },
];

function labelFor(item: Item, lang: Lang) {
  const ui = UI[lang];
  if (item.label) return ui.nav[item.label];
  return ui.nav[item.key as keyof typeof ui.nav] ?? ui.pageName[item.key];
}

function childLabel(key: PageKey, lang: Lang) {
  return key === "about" ? UI[lang].nav.officePolicy : UI[lang].pageName[key];
}

function Dropdown({ item, lang, current }: { item: Item; lang: Lang; current: PageKey | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const active = item.children!.includes(current as PageKey);
  const id = `menu-${item.label ?? item.key}`;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !ref.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors hover:text-primary",
          active ? "text-primary" : "text-foreground",
        )}
      >
        {labelFor(item, lang)}
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden />
        {active && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-champagne" aria-hidden />}
      </button>
      <div
        id={id}
        className={cn(
          "absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition-all duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul className="rounded-xl border bg-popover p-2 shadow-lift">
          {item.children!.map((c) => (
            <li key={c}>
              <Link
                to={routeTo(c, lang)}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-muted hover:text-primary",
                  current === c ? "bg-muted font-medium text-primary" : "text-foreground",
                )}
                aria-current={current === c ? "page" : undefined}
              >
                {childLabel(c, lang)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function LangSwitch({ className, dark }: { className?: string; dark?: boolean }) {
  const { lang, key } = useCurrentPage();
  const target = lang === "en" ? "zh" : "en";
  const ui = UI[lang];
  return (
    <Link
      to={routeTo(key ?? "home", target)}
      hrefLang={target === "en" ? "en-CA" : "zh-Hant-CA"}
      lang={target === "en" ? "en" : "zh-Hant"}
      aria-label={ui.switchLabel}
      onClick={() => {
        try {
          localStorage.setItem("jwd-lang", target);
        } catch {
          /* storage unavailable */
        }
      }}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-sm font-medium transition-colors",
        dark ? "border-on-dark/30 text-on-dark hover:bg-on-dark hover:text-primary-deep" : "border-primary/20 text-primary-deep hover:border-primary",
        className,
      )}
    >
      <span className={cn(lang === "en" ? "font-semibold" : "opacity-55")}>EN</span>
      <span aria-hidden className="opacity-40">/</span>
      <span className={cn(lang === "zh" ? "font-semibold" : "opacity-55")}>繁中</span>
    </Link>
  );
}

export function SiteHeader() {
  const { lang, key } = useCurrentPage();
  const ui = UI[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = drawerRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && drawerRef.current) {
        const f = Array.from(drawerRef.current.querySelectorAll<HTMLElement>("a,button"));
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z?.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-[var(--header-h)] border-b transition-all duration-300",
        scrolled ? "border-border bg-surface/95 shadow-soft backdrop-blur" : "border-transparent bg-background",
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <Link to={routeTo("home", lang)} aria-label={`${ui.nav.home} — Dr. Joyce Wu Dental Kerrisdale`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={lang === "en" ? "Main" : "主選單"} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) =>
              item.children ? (
                <Dropdown key={item.label ?? item.key} item={item} lang={lang} current={key} />
              ) : (
                <li key={item.key} className="relative">
                  <Link
                    to={routeTo(item.key, lang)}
                    aria-current={key === item.key ? "page" : undefined}
                    className={cn(
                      "block whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors hover:text-primary",
                      key === item.key ? "text-primary" : "text-foreground",
                    )}
                  >
                    {labelFor(item, lang)}
                    {key === item.key && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-champagne" aria-hidden />}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch className="hidden sm:inline-flex" />
          <a
            href={CLINIC.phoneHref}
            aria-label={`${ui.call}: ${CLINIC.phoneDisplay}`}
            className="hidden size-11 items-center justify-center rounded-full border border-primary/20 text-primary-deep transition-colors hover:border-primary hover:bg-surface md:inline-flex 2xl:w-auto 2xl:gap-2 2xl:px-4"
          >
            <Phone className="size-4" aria-hidden />
            <span className="hidden whitespace-nowrap text-sm font-medium 2xl:inline">{CLINIC.phoneDisplay.replace("+1 ", "")}</span>
          </a>
          <Link to={routeTo("contact", lang)} hash="inquiry" className={cn(buttonStyles({ size: "sm" }), "hidden md:inline-flex")}>
            {ui.request}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-primary/20 text-primary-deep lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? ui.close : ui.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn("fixed inset-0 top-[var(--header-h)] z-40 bg-primary-deep/30 transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={ui.menu}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-50 overflow-y-auto bg-surface lg:hidden"
      >
        <nav aria-label={ui.menu} className="container-page flex min-h-full flex-col py-6">
          <ul className="divide-y border-y">
            {[
              { k: "home" as PageKey },
              { k: "about" as PageKey },
              { k: "cdcp" as PageKey },
              { k: "team" as PageKey },
            ].map(({ k }) => (
              <li key={k}>
                <Link to={routeTo(k, lang)} className={cn("flex min-h-14 items-center text-lg font-display", key === k ? "text-primary" : "text-primary-deep")}>
                  {k === "about" ? ui.nav.about : ui.pageName[k]}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                aria-expanded={svcOpen}
                aria-controls="m-services"
                onClick={() => setSvcOpen((s) => !s)}
                className="flex min-h-14 w-full items-center justify-between font-display text-lg text-primary-deep"
              >
                {ui.nav.services}
                <ChevronDown className={cn("size-5 transition-transform", svcOpen && "rotate-180")} aria-hidden />
              </button>
              <ul id="m-services" hidden={!svcOpen} className="pb-3 pl-4">
                {SERVICE_KEYS.map((s) => (
                  <li key={s}>
                    <Link to={routeTo(s, lang)} className={cn("flex min-h-12 items-center", key === s ? "text-primary font-medium" : "text-foreground")}>
                      {ui.pageName[s]}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {(["faq", "contact"] as PageKey[]).map((k) => (
              <li key={k}>
                <Link to={routeTo(k, lang)} className={cn("flex min-h-14 items-center text-lg font-display", key === k ? "text-primary" : "text-primary-deep")}>
                  {ui.pageName[k]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link to={routeTo("contact", lang)} hash="inquiry" className={buttonStyles({ size: "lg" })}>
              {ui.request}
            </Link>
            <a href={CLINIC.phoneHref} className={buttonStyles({ variant: "outline", size: "lg" })}>
              <Phone className="size-4" aria-hidden /> {CLINIC.phoneDisplay}
            </a>
            <LangSwitch className="justify-center" />
          </div>
        </nav>
      </div>
    </header>
  );
}
