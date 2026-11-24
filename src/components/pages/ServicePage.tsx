import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/content/pages";
import { routeTo, SERVICE_KEYS, UI, type Lang, type ServiceKey } from "@/content/site";
import { buttonStyles } from "@/components/site/Button";
import { CtaBand, PageHeader } from "@/components/site/Blocks";
import { cn } from "@/lib/utils";

const HERO: Record<ServiceKey, { src: string; w: number; h: number; alt: Record<Lang, string> }> = {
  general: { src: "/images/service-general-consultation.webp", w: 1600, h: 900, alt: { en: "Dentist matching tooth shade with a smiling patient, with a bridge model on screen", zh: "牙醫為微笑的病人比對牙齒顏色，螢幕上顯示牙橋模型" } },
  cosmetic: { src: "/images/service-cosmetic-shade-consultation.webp", w: 1600, h: 900, alt: { en: "Dentist holding a shade guide beside a smiling patient holding a clear aligner", zh: "牙醫拿著比色板，微笑的病人手持隱形牙套" } },
  surgical: { src: "/images/service-surgical-examination.webp", w: 1600, h: 900, alt: { en: "Dentist wearing loupes examining a patient's gums and teeth", zh: "牙醫配戴放大鏡為病人檢查牙齦及牙齒" } },
  implant: { src: "/images/service-implant-crown-placement.webp", w: 1600, h: 900, alt: { en: "Dentist placing a crown on an implant in a dental model", zh: "牙醫在牙齒模型上為植體安裝牙冠" } },
};

export function ServicePage({ service, lang }: { service: ServiceKey; lang: Lang }) {
  const content = SERVICES[service][lang];
  const ui = UI[lang];
  const L = lang === "en"
    ? { onPage: "On this page", ask: "Ask about this treatment", other: "Other services", heroAlt: "Inside Dr. Joyce Wu Dental Kerrisdale", suitability: "Treatment recommendations depend on an examination by your dentist." }
    : { onPage: "本頁內容", ask: "查詢此治療", other: "其他服務", heroAlt: "Dr. Joyce Wu Dental Kerrisdale 診所內部", suitability: "治療建議須視乎牙醫的檢查結果而定。" };

  return (
    <>
      <PageHeader page={service} lang={lang} image={{ src: HERO[service].src, alt: HERO[service].alt[lang] }}>
        <nav aria-label={L.onPage} className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{L.onPage}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {content.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex min-h-10 items-center rounded-full border border-primary/20 bg-surface px-4 text-sm text-primary-deep transition-colors hover:border-primary hover:text-primary">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="py-16 md:py-24">
        <div className="container-page space-y-20 md:space-y-28">
          {content.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
              <div className={cn("grid items-center gap-10 lg:gap-16", s.image ? "lg:grid-cols-2" : "lg:grid-cols-[1fr_1.4fr]")}>
                <div className={cn(s.image && i % 2 === 1 && "lg:order-2")}>
                  <span className="font-display text-sm text-champagne-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h2 id={`${s.id}-h`} className="mt-2 font-display text-3xl font-semibold leading-tight md:text-[2.25rem]">
                    {s.title}
                  </h2>
                  <div className="rule-champagne mt-5 w-16" />
                  {!s.image && s.body.length === 0 && !s.sub && null}
                  {s.image && (
                    <div className="prose-clinic mt-6 text-[1.02rem]">
                      {s.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  )}
                  {s.image && s.sub && <SubList sub={s.sub} />}
                  {s.image && (
                    <Link to={routeTo("contact", lang)} hash="inquiry" className={cn(buttonStyles({ variant: "outline", size: "sm" }), "mt-8")}>
                      {L.ask} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  )}
                </div>
                {s.image ? (
                  <figure className={cn("overflow-hidden rounded-2xl border bg-surface", i % 2 === 1 && "lg:order-1")}>
                    <img src={s.image.src} alt={s.image.alt} width={s.image.w} height={s.image.h} loading="lazy" className={cn("w-full", s.image.h > s.image.w ? "mx-auto max-h-[560px] object-contain" : "object-cover")} />
                  </figure>
                ) : (
                  <div>
                    <div className="prose-clinic text-[1.02rem]">
                      {s.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                    {s.sub && <SubList sub={s.sub} />}
                    <Link to={routeTo("contact", lang)} hash="inquiry" className={cn(buttonStyles({ variant: "outline", size: "sm" }), "mt-8")}>
                      {L.ask} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                )}
              </div>
            </section>
          ))}
          <p className="border-t pt-8 text-sm text-muted-foreground">{L.suitability}</p>
        </div>
      </div>

      <CtaBand lang={lang} />

      <section className="py-16 md:py-20" aria-labelledby="other-services">
        <div className="container-page">
          <h2 id="other-services" className="font-display text-2xl font-semibold">
            {L.other}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {SERVICE_KEYS.filter((k) => k !== service).map((k) => (
              <li key={k}>
                <Link to={routeTo(k, lang)} className="group flex items-center justify-between rounded-xl border bg-surface px-6 py-5 transition-colors hover:border-primary">
                  <span className="font-display font-semibold text-primary-deep">{ui.pageName[k]}</span>
                  <ArrowUpRight className="size-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function SubList({ sub }: { sub: { title: string; body: string }[] }) {
  return (
    <div className="mt-6 space-y-4">
      {sub.map((x) => (
        <div key={x.title} className="rounded-xl border bg-surface p-6">
          <h3 className="font-display text-lg font-semibold">{x.title}</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{x.body}</p>
        </div>
      ))}
    </div>
  );
}
