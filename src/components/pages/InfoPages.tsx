import { Link } from "@tanstack/react-router";
import { ArrowRight, Banknote, CalendarX, ExternalLink, HeartHandshake, ShieldCheck } from "lucide-react";
import { FAQS } from "@/content/pages";
import { CLINIC, DOCTORS, routeTo, UI, type Lang } from "@/content/site";
import { buttonStyles } from "@/components/site/Button";
import { ContactSection, CtaBand, FaqList, PageHeader } from "@/components/site/Blocks";
import { cn } from "@/lib/utils";

/* ---------- About ---------- */
const ABOUT = {
  en: {
    policy: "Office Policy",
    payment: { t: "Payment Options", d: "We accept various payment methods for your convenience:", items: ["Cash", "Visa", "MasterCard", "WeChat Pay", "Alipay", "Debit", "Personal Cheque"] },
    insurance: {
      t: "Dental Insurance",
      d: [
        "We accept most dental insurance plans and are happy to help you find out whether treatments are covered by your provider. It is your responsibility to provide us with updated coverage information and any relevant details, such as changes to your plan, recent claims or past treatment that may affect your coverage.",
        "We are happy to submit a predetermination to your plan provider. A predetermination gives you an estimate of what your plan will cover and what you will be responsible for. Please be aware this is not a guarantee of coverage.",
      ],
      kidsT: "BC Healthy Kids Program (MSH)",
      kids: "We also accept the BC Healthy Kids Program. A co-payment is required for the fee difference between the 2024 Standard Dental Fee Guide and the 2017 MSH BC Child Fee Guide. You may also apply for the Canadian Dental Benefit yourself to cover the co-payment.",
    },
    cdcp: { t: "Canada Dental Care Plan", d: "Our office gladly accepts the Canada Dental Care Plan (CDCP). To learn about the application process and eligibility, please visit the federal government's Canadian Dental Care Plan page.", link: "CDCP at our clinic", gov: "Government of Canada — CDCP" },
    cancel: {
      t: "Cancellation & Missed Appointments",
      d: [
        "We reserve enough time for each treatment, so we require a minimum of 24 hours' notice if you can't attend an appointment as scheduled. This lets us offer the time to other patients in need.",
        "If you miss an appointment without contacting our office within the required time, a fee of $50.00 will be charged. This fee is your responsibility and can't be billed to your insurance company. No future appointment can be scheduled, nor records transferred, until the fee is paid.",
      ],
    },
    gallery: "Inside our clinic",
  },
  zh: {
    policy: "診所政策",
    payment: { t: "付款方式", d: "為方便您，我們接受多種付款方式：", items: ["現金", "Visa", "MasterCard", "微信支付", "支付寶", "Debit 借記卡", "個人支票"] },
    insurance: {
      t: "牙科保險",
      d: [
        "我們接受大多數牙科保險計劃，並樂意協助您確認治療是否在保險範圍內。您有責任向我們提供最新的保險資料及相關資訊，例如計劃變更、近期索償或可能影響保障的過往治療。",
        "我們可代您向保險公司提交預估申請（predetermination），讓您了解保險計劃將承擔的費用及您需自付的部分。請注意，這並不保證一定獲得保障。",
      ],
      kidsT: "BC Healthy Kids Program (MSH)",
      kids: "我們亦接受 BC Healthy Kids Program，但需支付 2024 年標準牙科收費指南與 2017 年 MSH BC 兒童收費指南之間的差額。您亦可自行申請加拿大牙科福利以支付此差額。",
    },
    cdcp: { t: "加拿大牙科護理計劃", d: "我們診所欣然接受加拿大牙科護理計劃（CDCP）。如欲了解申請程序及資格，請瀏覽聯邦政府的加拿大牙科護理計劃網頁。", link: "本診所的 CDCP 資訊", gov: "加拿大政府 — CDCP（英文）" },
    cancel: {
      t: "取消及錯過預約",
      d: [
        "我們會為每項治療預留充足時間，因此如未能如期赴約，請至少提前 24 小時通知我們，好讓我們把時段安排給其他有需要的患者。",
        "如未在規定時間內聯絡診所而錯過預約，將收取 50.00 加元費用。此費用須由您承擔，不能向保險公司申領。在繳付費用前，將無法安排日後預約或轉移病歷。",
      ],
    },
    gallery: "診所環境",
  },
} as const;

export function AboutPage({ lang }: { lang: Lang }) {
  const a = ABOUT[lang];
  return (
    <>
      <PageHeader page="about" lang={lang} image={{ src: "/images/clinic-front-desk.webp", alt: lang === "en" ? "Front desk at Dr. Joyce Wu Dental Kerrisdale" : "診所接待處" }} />
      <section className="py-16 md:py-24">
        <div className="container-page">
          <p className="eyebrow">{a.policy}</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article id="payment" className="scroll-mt-28 rounded-2xl border bg-surface p-8">
              <Banknote className="size-6 text-primary" strokeWidth={1.5} aria-hidden />
              <h2 className="mt-5 font-display text-2xl font-semibold">{a.payment.t}</h2>
              <p className="mt-3 text-muted-foreground">{a.payment.d}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {a.payment.items.map((p) => (
                  <li key={p} className="rounded-full bg-secondary px-3.5 py-1.5 text-sm text-primary-deep">
                    {p}
                  </li>
                ))}
              </ul>
            </article>
            <article id="insurance" className="scroll-mt-28 rounded-2xl border bg-surface p-8 lg:col-span-2">
              <ShieldCheck className="size-6 text-primary" strokeWidth={1.5} aria-hidden />
              <h2 className="mt-5 font-display text-2xl font-semibold">{a.insurance.t}</h2>
              <div className="prose-clinic mt-3">
                {a.insurance.d.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-muted p-5">
                <h3 className="font-display text-base font-semibold">{a.insurance.kidsT}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{a.insurance.kids}</p>
              </div>
            </article>
            <article id="cdcp" className="scroll-mt-28 rounded-2xl bg-primary-deep p-8 text-on-dark lg:col-span-1">
              <HeartHandshake className="size-6 text-champagne" strokeWidth={1.5} aria-hidden />
              <h2 className="mt-5 font-display text-2xl font-semibold text-on-dark">{a.cdcp.t}</h2>
              <p className="mt-3 leading-relaxed text-on-dark-muted">{a.cdcp.d}</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link to={routeTo("cdcp", lang)} className={buttonStyles({ variant: "champagne", size: "sm" })}>
                  {a.cdcp.link}
                </Link>
                <a href={CLINIC.cdcpGovUrlEn} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: "ghostDark", size: "sm" })}>
                  {a.cdcp.gov} <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </div>
            </article>
            <article id="cancellation" className="scroll-mt-28 rounded-2xl border bg-surface p-8 lg:col-span-2">
              <CalendarX className="size-6 text-primary" strokeWidth={1.5} aria-hidden />
              <h2 className="mt-5 font-display text-2xl font-semibold">{a.cancel.t}</h2>
              <div className="prose-clinic mt-3">
                {a.cancel.d.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="pb-20" aria-labelledby="gallery-h">
        <div className="container-page">
          <h2 id="gallery-h" className="font-display text-2xl font-semibold">
            {a.gallery}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["/images/clinic-waiting-area.webp", lang === "en" ? "Waiting area" : "候診區"],
              ["/images/clinic-treatment-room.webp", lang === "en" ? "Treatment room" : "治療室"],
              ["/images/clinic-treatment-room-map.webp", lang === "en" ? "Treatment room with world-map wall" : "設有世界地圖牆飾的治療室"],
            ].map(([src, alt]) => (
              <figure key={src}>
                <img src={src} alt={alt} width={585} height={444} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
                <figcaption className="mt-2 text-sm text-muted-foreground">{alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand lang={lang} title={lang === "en" ? "Questions about insurance or coverage?" : "對保險或保障有疑問？"} body={lang === "en" ? "Our front desk is happy to help you check coverage or submit a predetermination." : "我們的前台團隊樂意協助您確認保障或提交預估申請。"} />
    </>
  );
}

/* ---------- Team ---------- */
export function TeamPage({ lang }: { lang: Lang }) {
  const L = lang === "en"
    ? { implant: "Offers Nobel Biocare dental implants.", implantLink: "Dental implants", group: "Dr. Miles Chu, Dr. Cindy Wang and Dr. Joyce Wu at the clinic" }
    : { implant: "為患者提供 Nobel Biocare 植體。", implantLink: "植牙服務", group: "Dr. Miles Chu、Dr. Cindy Wang 及 Dr. Joyce Wu 在診所內" };
  return (
    <>
      <PageHeader page="team" lang={lang} image={{ src: "/images/dental-team-group.webp", alt: L.group }} />
      <section className="py-16 md:py-24">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {DOCTORS.map((d) => (
              <li key={d.name} className="flex flex-col overflow-hidden rounded-2xl border bg-surface">
                <img src={d.image} alt={`${d.name}, ${d.designation}`} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl font-semibold">{d.name}</h2>
                  <p className="mt-1 text-sm font-medium tracking-wide text-champagne-ink">{d.designation}</p>
                  {d.name === "Dr. Miles Chu" && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {L.implant}{" "}
                      <Link to={routeTo("implant", lang)} className="text-primary underline underline-offset-4">
                        {L.implantLink}
                      </Link>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------- FAQ ---------- */
export function FaqPage({ lang }: { lang: Lang }) {
  const items = FAQS[lang];
  const L = lang === "en" ? { jump: "Questions", still: "Still have a question?" } : { jump: "問題列表", still: "還有其他問題？" };
  return (
    <>
      <PageHeader page="faq" lang={lang} />
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
          <nav aria-label={L.jump} className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{L.jump}</p>
            <ol className="mt-4 space-y-1 border-l">
              {items.map((f) => (
                <li key={f.id}>
                  <a href={`#${f.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    {f.q}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <FaqList items={items} lang={lang} reviewNotes />
        </div>
      </section>
      <CtaBand lang={lang} title={L.still} />
    </>
  );
}

/* ---------- CDCP ---------- */
export function CdcpPage({ lang }: { lang: Lang }) {
  const L = lang === "en"
    ? {
        what: "Using the CDCP at our clinic",
        body: [
          "Our office gladly accepts the Canada Dental Care Plan (CDCP).",
          "Eligibility, enrolment and coverage are set by the Government of Canada. For the application process and eligibility criteria, please refer to the official CDCP information.",
          "If you are enrolled, contact our office to arrange your visit, and bring your plan details to your appointment.",
        ],
        gov: "Official Government of Canada CDCP information",
        poster: "Our clinic's CDCP notice",
        posterAlt: "Bilingual clinic notice announcing that Dr. Joyce Wu Dental Kerrisdale is accepting the Canadian Dental Care Plan, with application steps",
        posterNote: "Notice as previously published by the clinic. For current eligibility and co-payment details, refer to the Government of Canada.",
        about: "Insurance & office policies",
      }
    : {
        what: "在本診所使用 CDCP",
        body: ["我們診所欣然接受加拿大牙科護理計劃（CDCP）。", "申請資格、登記及保障範圍均由加拿大政府訂定。有關申請程序及資格標準，請參閱官方 CDCP 資訊。", "如您已登記參加，歡迎聯絡我們安排看診，並於看診時攜帶您的計劃資料。"],
        gov: "加拿大政府官方 CDCP 資訊（英文）",
        poster: "本診所的 CDCP 通告",
        posterAlt: "Dr. Joyce Wu Dental Kerrisdale 接受加拿大全民牙科保險計劃的中英文通告及申請步驟",
        posterNote: "此為診所過往發佈的通告。最新資格及共付額資料，請以加拿大政府公佈為準。",
        about: "保險及診所政策",
      };
  return (
    <>
      <PageHeader page="cdcp" lang={lang} />
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <h2 className="font-display text-3xl font-semibold">{L.what}</h2>
            <div className="rule-champagne mt-5 w-16" />
            <div className="prose-clinic mt-6 text-[1.05rem]">
              {L.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={CLINIC.cdcpGovUrlEn} target="_blank" rel="noopener noreferrer" className={buttonStyles()}>
                {L.gov} <ExternalLink className="size-4" aria-hidden />
              </a>
              <Link to={routeTo("about", lang)} hash="insurance" className={buttonStyles({ variant: "outline" })}>
                {L.about} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <figure className="rounded-2xl border bg-surface p-4">
            <img src="/images/cdcp-announcement.webp" alt={L.posterAlt} width={900} height={1600} loading="lazy" className="mx-auto max-h-[720px] w-auto rounded-lg" />
            <figcaption className="mt-4 px-2 text-sm text-muted-foreground">
              <span className="font-medium text-primary-deep">{L.poster}.</span> {L.posterNote}
            </figcaption>
          </figure>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------- Contact ---------- */
export function ContactPage({ lang }: { lang: Lang }) {
  const ui = UI[lang];
  return (
    <>
      <PageHeader page="contact" lang={lang}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={CLINIC.phoneHref} className={buttonStyles({ size: "lg" })}>
            {ui.call} · {CLINIC.phoneDisplay}
          </a>
          <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles({ variant: "outline", size: "lg" }))}>
            {ui.directions}
          </a>
        </div>
      </PageHeader>
      <ContactSection lang={lang} heading={false} />
    </>
  );
}
