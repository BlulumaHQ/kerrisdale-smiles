import { Link } from "@tanstack/react-router";
import { CLINIC, HOURS, routeTo, SERVICE_KEYS, UI, type PageKey } from "@/content/site";
import { LangSwitch } from "./SiteHeader";
import { useCurrentPage } from "./LangContext";
import { Logo } from "./Logo";

export function SiteFooter() {
  const { lang } = useCurrentPage();
  const ui = UI[lang];
  const year = new Date().getFullYear();
  const useful: PageKey[] = ["home", "about", "team", "faq", "cdcp", "contact"];

  return (
    <footer className="bg-primary-deep text-on-dark">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,1.1fr)_auto_auto_auto] xl:gap-x-16">
          <div className="max-w-sm xl:mr-[200px] xl:max-w-xs">
            <Logo dark />
            <p className="mt-6 text-sm leading-relaxed text-on-dark-muted">{ui.footerAbout}</p>
            <div className="mt-6">
              <LangSwitch dark />
            </div>
          </div>

          <nav aria-label={ui.usefulLinks}>
            <h2 className="eyebrow eyebrow-dark">{ui.usefulLinks}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {useful.map((k) => (
                <li key={k}>
                  <Link to={routeTo(k, lang)} className="text-on-dark-muted transition-colors hover:text-on-dark">
                    {ui.pageName[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={ui.ourServices}>
            <h2 className="eyebrow eyebrow-dark">{ui.ourServices}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICE_KEYS.map((k) => (
                <li key={k}>
                  <Link to={routeTo(k, lang)} className="text-on-dark-muted transition-colors hover:text-on-dark">
                    {ui.pageName[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow eyebrow-dark">{ui.contactInfo}</h2>
            <address className="mt-5 space-y-3 text-sm not-italic text-on-dark-muted">
              <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-on-dark">
                {CLINIC.addressLine}
              </a>
              <a href={CLINIC.phoneHref} className="block hover:text-on-dark">
                {CLINIC.phoneDisplay}
              </a>
              <a href={`mailto:${CLINIC.email}`} className="block break-all hover:text-on-dark">
                {CLINIC.email}
              </a>
            </address>
            <h2 className="eyebrow eyebrow-dark mt-8">{ui.hours}</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm text-on-dark-muted">
              {HOURS.map((h) => (
                <div key={h.schema} className="contents">
                  <dt>{h.day[lang]}</dt>
                  <dd className="text-on-dark">{h.label[lang]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border-dark pt-8 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {CLINIC.name}. {ui.rights}
          </p>
          <p>
            <a href="https://bluluma.com/" target="_blank" rel="noopener noreferrer" className="opacity-80 transition-opacity hover:opacity-100">
              Web Design by Bluluma.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
