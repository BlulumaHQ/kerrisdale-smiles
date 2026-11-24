import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Mail, MapPin, Phone, Plus, Star } from "lucide-react";
import { useCallback, useState, type KeyboardEvent, type ReactNode } from "react";
import { META, type Faq } from "@/content/pages";
import { CLINIC, HOURS, routeTo, TESTIMONIALS, UI, type Lang, type PageKey } from "@/content/site";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./Button";
import { InquiryForm } from "./InquiryForm";

export function PageHeader({ page, lang, image, children }: { page: PageKey; lang: Lang; image?: { src: string; alt: string }; children?: ReactNode }) {
  const m = META[page][lang];
  const ui = UI[lang];
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <div className="container-page grid items-end gap-10 py-12 md:py-16 lg:grid-cols-[1.15fr_1fr] lg:py-20">
        <div className="fade-up">
          <nav aria-label={lang === "en" ? "Breadcrumb" : "導覽路徑"}>
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link to={routeTo("home", lang)} className="hover:text-primary">
                  {ui.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-primary-deep">
                {ui.pageName[page]}
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-[3.5rem]">{m.h1}</h1>
          <div className="rule-champagne mt-7 w-24" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{m.intro}</p>
          {children}
        </div>
        {image && (
          <div className="relative hidden lg:block">
            <img src={image.src} alt={image.alt} width={585} height={444} fetchPriority="high" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift" />
            <div aria-hidden className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border border-champagne/60" />
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, body, center, dark }: { eyebrow?: string; title: string; body?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow", dark && "eyebrow-dark", center && "justify-center")}>{eyebrow}</p>}
      <h2 className={cn("mt-4 font-display text-3xl font-semibold leading-tight md:text-[2.6rem]", dark && "text-on-dark")}>{title}</h2>
      {body && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-on-dark-muted" : "text-muted-foreground")}>{body}</p>}
    </div>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} / 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="size-4 fill-champagne text-champagne" aria-hidden />
      ))}
    </span>
  );
}

export function Testimonials({ lang }: { lang: Lang }) {
  const [i, setI] = useState(0);
  const n = TESTIMONIALS.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);
  const [touchX, setTouchX] = useState<number | null>(null);
  const L = lang === "en"
    ? { title: "What Patients Say", eyebrow: "Google Reviews", prev: "Previous review", next: "Next review", slide: "Review", more: "See Google reviews", note: "Reviews shown as published by patients on Google." }
    : { title: "患者評價", eyebrow: "Google 評價", prev: "上一則評價", next: "下一則評價", slide: "評價", more: "查看 Google 評價", note: "以下為患者於 Google 發表的原文評價。" };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  return (
    <section className="bg-surface py-20 md:py-28" aria-roledescription="carousel" aria-label={L.title}>
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={L.eyebrow} title={L.title} />
          <p className="mt-5 text-sm text-muted-foreground">{L.note}</p>
          <a href={CLINIC.reviewsUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles({ variant: "outline" }), "mt-8")}>
            {L.more} <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
        <div
          tabIndex={0}
          onKeyDown={onKey}
          onTouchStart={(e) => setTouchX(e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
          className="relative rounded-2xl"
        >
          <div className="grid">
            {TESTIMONIALS.map((t, idx) => (
              <figure
                key={t.name}
                role="group"
                aria-roledescription="slide"
                aria-label={`${L.slide} ${idx + 1} / ${n}`}
                aria-hidden={idx !== i}
                lang="en"
                className={cn(
                  "col-start-1 row-start-1 flex flex-col justify-between rounded-2xl border bg-ivory p-8 transition-all duration-500 md:p-12",
                  idx === i ? "visible translate-x-0 opacity-100" : "invisible translate-x-4 opacity-0",
                )}
              >
                <div>
                  <span aria-hidden className="font-display text-6xl leading-none text-champagne">“</span>
                  <blockquote className="mt-2 font-display text-xl leading-relaxed text-primary-deep md:text-[1.45rem]">{t.text}</blockquote>
                </div>
                <figcaption className="mt-8 flex items-center justify-between gap-4 border-t pt-6">
                  <span className="font-medium text-primary-deep">{t.name}</span>
                  <Stars n={t.rating} />
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`${L.slide} ${idx + 1}`}
                  aria-current={idx === i}
                  className="flex size-11 items-center justify-center"
                >
                  <span className={cn("block h-1.5 rounded-full transition-all", idx === i ? "w-8 bg-primary" : "w-4 bg-border")} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label={L.prev} className="inline-flex size-11 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={L.next} className="inline-flex size-11 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items, lang, reviewNotes = false }: { items: Faq[]; lang: Lang; reviewNotes?: boolean }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y rounded-2xl border bg-surface">
      {items.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} id={f.id} className="scroll-mt-28">
            <h3 className="font-display text-base font-semibold md:text-lg">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${f.id}-panel`}
                id={`${f.id}-btn`}
                onClick={() => setOpen(isOpen ? null : f.id)}
                className={cn("flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors md:px-8", isOpen ? "text-primary" : "text-primary-deep hover:text-primary")}
              >
                {f.q}
                <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300", isOpen ? "rotate-45 border-primary bg-primary text-primary-foreground" : "border-primary/25")}>
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <div id={`${f.id}-panel`} role="region" aria-labelledby={`${f.id}-btn`} hidden={!isOpen} className="prose-clinic px-6 pb-7 md:px-8">
              {f.a.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {f.list && (
                <ol>
                  {f.list.map((l) => (
                    <li key={l.t}>
                      <strong>{l.t}:</strong> {l.d}
                    </li>
                  ))}
                </ol>
              )}
              {f.after?.map((p, i) => (
                <p key={i} className="mt-4">
                  {p}
                </p>
              ))}
              {f.link && (
                <p className="mt-4">
                  <a href={f.link.href} target="_blank" rel="noopener noreferrer">
                    {f.link.label}
                  </a>
                </p>
              )}
              {f.image && (
                <img src="/images/radiation-dose-examples.webp" alt={lang === "en" ? "Government of Canada chart of example radiation doses from artificial sources" : "加拿大政府發佈的人工輻射源劑量示例圖表"} width={751} height={630} loading="lazy" className="mt-6 w-full max-w-lg rounded-lg border" />
              )}
              {reviewNotes && f.review && <p className="mt-4 text-xs text-muted-foreground">* {lang === "en" ? "Fees follow the BC Dental Association Fee Guide, which is updated annually. Please call for current pricing." : "收費以每年更新的 BC 牙科協會收費指南為準，最新價格請致電查詢。"}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function HoursList({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <dl className={cn("divide-y", className)}>
      {HOURS.map((h) => (
        <div key={h.schema} className="flex justify-between gap-4 py-2.5 text-[0.95rem]">
          <dt className="text-muted-foreground">{h.day[lang]}</dt>
          <dd className={cn("font-medium", h.open ? "text-primary-deep" : "text-muted-foreground")}>{h.label[lang]}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ContactDetails({ lang }: { lang: Lang }) {
  const ui = UI[lang];
  const rows = [
    { icon: MapPin, label: ui.address, value: CLINIC.addressLine, href: CLINIC.mapsUrl, ext: true },
    { icon: Phone, label: ui.phone, value: CLINIC.phoneDisplay, href: CLINIC.phoneHref },
    { icon: Mail, label: ui.email, value: CLINIC.email, href: `mailto:${CLINIC.email}` },
  ];
  return (
    <address className="space-y-5 not-italic">
      {rows.map((r) => (
        <a key={r.label} href={r.href} {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <r.icon className="size-[1.1rem]" aria-hidden />
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{r.label}</span>
            <span className="mt-1 block font-medium [overflow-wrap:anywhere] text-primary-deep group-hover:text-primary">{r.value}</span>
          </span>
        </a>
      ))}
    </address>
  );
}

export function MapEmbed({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <iframe
      title={UI[lang].mapTitle}
      src={CLINIC.mapEmbed}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={cn("h-full min-h-[320px] w-full rounded-2xl border-0 grayscale-[35%]", className)}
    />
  );
}

/** Final conversion block: details, hours, map and inquiry form. */
export function ContactSection({ lang, heading = true, defaultService }: { lang: Lang; heading?: boolean; defaultService?: string | undefined }) {
  const ui = UI[lang];
  const L = lang === "en"
    ? { eyebrow: "Visit Us", title: "Find Us in Kerrisdale", body: "We're on Balsam Street in Kerrisdale, Vancouver. Call, email or send an inquiry to arrange your visit." }
    : { eyebrow: "歡迎蒞臨", title: "位於 Kerrisdale 的診所", body: "我們位於溫哥華 Kerrisdale 的 Balsam Street。歡迎致電、發送電郵或提交查詢以安排看診。" };
  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby={heading ? "visit-title" : undefined}>
      <div className="container-page">
        {heading && (
          <div className="mb-12" id="visit-title">
            <SectionHeading eyebrow={L.eyebrow} title={L.title} body={L.body} />
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border bg-surface p-7 md:p-9">
              <h3 className="font-display text-xl font-semibold">{CLINIC.name}</h3>
              <div className="mt-6">
                <ContactDetails lang={lang} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={CLINIC.phoneHref} className={buttonStyles({ size: "sm" })}>
                  <Phone className="size-4" aria-hidden /> {ui.callShort}
                </a>
                <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles({ size: "sm", variant: "outline" })}>
                  <MapPin className="size-4" aria-hidden /> {ui.directions}
                </a>
              </div>
            </div>
            <div className="flex-1 rounded-2xl border bg-surface p-7 md:p-9">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                <Clock className="size-5 text-champagne-ink" aria-hidden /> {ui.hours}
              </h3>
              <HoursList lang={lang} className="mt-4" />
              <p className="mt-4 text-xs text-muted-foreground">{ui.hoursNote}</p>
            </div>
          </div>
          <div id="inquiry" className="scroll-mt-28">
            <InquiryForm lang={lang} defaultService={defaultService} />
          </div>
        </div>
        <MapEmbed lang={lang} className="mt-8 h-[360px] min-h-0 md:h-[440px]" />
      </div>
    </section>
  );
}

export function CtaBand({ lang, title, body }: { lang: Lang; title?: string; body?: string }) {
  const ui = UI[lang];
  return (
    <section className="bg-primary-deep py-16 md:py-20">
      <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold text-on-dark md:text-3xl">{title ?? ui.inquiryCta}</h2>
          <p className="mt-3 text-on-dark-muted">{body ?? ui.inquiryCtaBody}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={routeTo("contact", lang)} hash="inquiry" className={buttonStyles({ variant: "champagne", size: "lg" })}>
            {ui.request}
          </Link>
          <a href={CLINIC.phoneHref} className={buttonStyles({ variant: "ghostDark", size: "lg" })}>
            <Phone className="size-4" aria-hidden /> {CLINIC.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
