import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CreditCard, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import { FAQS, META, SERVICES } from "@/content/pages";
import { DOCTORS, routeTo, SERVICE_KEYS, UI, type Lang } from "@/content/site";
import { buttonStyles } from "@/components/site/Button";
import { ContactSection, FaqList, SectionHeading, Testimonials } from "@/components/site/Blocks";
import { cn } from "@/lib/utils";
import { DentalServiceFinder } from "@/components/site/DentalServiceFinder";
import { FirstVisitJourney } from "@/components/site/FirstVisitJourney";

const C = {
  en: {
    heroEyebrow: "Dentist · Kerrisdale, Vancouver",
    welcomeEyebrow: "Welcome",
    welcomeTitle: "Welcome to Dr. Joyce Wu Dental Kerrisdale",
    welcome: [
      "Your health and safety are our top priorities. We are committed to providing a safe and comfortable dental experience every time you visit our Balsam Street office.",
      "Our team of four dentists offers general, cosmetic, surgical and implant dentistry under one roof, taking time to explain treatment options so you can make informed decisions about your care.",
    ],
    safetyTitle: "Infection control, every visit",
    safety:
      "Our staff train regularly on current sterilization and hygiene practices. Each treatment room is thoroughly sanitized between patients, instruments are sterilized, and disposable materials are used wherever possible.",
    aboutLink: "About our clinic",
    servicesEyebrow: "Our Dental Services",
    servicesTitle: "Care for every stage of your smile",
    whyEyebrow: "Why Patients Choose Us",
    whyTitle: "A neighbourhood practice, with the range of a larger clinic",
    why: [
      { icon: MapPin, t: "Convenient Kerrisdale location", d: "Find us at 5763 Balsam St, in the heart of Kerrisdale, Vancouver." },
      { icon: Stethoscope, t: "Four areas of dentistry", d: "General, cosmetic, surgical and implant care provided by our team of four dentists." },
      { icon: ShieldCheck, t: "Careful infection control", d: "Rooms sanitized between patients and instruments sterilized for every visit." },
      { icon: CreditCard, t: "Insurance & CDCP support", d: "We accept most dental insurance plans and the Canada Dental Care Plan, and can submit predeterminations." },
    ],
    teamEyebrow: "Meet Our Dental Team",
    teamTitle: "The dentists behind your care",
    teamLink: "Meet the team",
    npEyebrow: "New Patients & Insurance",
    npTitle: "Getting started with us",
    np: [
      { t: "New patient inquiries", d: "Call us or send an inquiry. Our team will follow up to find a suitable appointment time." },
      { t: "Dental insurance", d: "We accept most plans and are happy to help check coverage or submit a predetermination. Please bring your current coverage details." },
      { t: "Canada Dental Care Plan", d: "Our office gladly accepts the CDCP. Eligibility is determined by the Government of Canada." },
      { t: "Before your visit", d: "We ask for at least 24 hours' notice if you need to change or cancel an appointment." },
    ],
    cdcpLink: "Canada Dental Care Plan",
    policyLink: "Office policies",
    faqEyebrow: "Questions",
    faqTitle: "Frequently asked",
    faqLink: "View all FAQs",
  },
  zh: {
    heroEyebrow: "牙科診所 · 溫哥華 Kerrisdale",
    welcomeEyebrow: "歡迎",
    welcomeTitle: "歡迎蒞臨 Dr. Joyce Wu Dental Kerrisdale",
    welcome: [
      "您的健康與安全是我們的首要考慮。每次您到訪我們位於 Balsam Street 的診所，我們都致力為您提供安全、舒適的牙科體驗。",
      "我們由四位牙醫組成的團隊，在同一診所提供一般牙科、美容牙科、牙科手術及植牙服務，並會詳細說明治療選擇，讓您在了解後作出決定。",
    ],
    safetyTitle: "每次看診，嚴格感染控制",
    safety: "我們的員工定期接受最新消毒及衛生規範培訓。每間治療室在患者之間均徹底消毒，器械經嚴格消毒處理，並盡可能使用一次性物料。",
    aboutLink: "關於我們的診所",
    servicesEyebrow: "我們的牙科服務",
    servicesTitle: "照顧笑容的每一個階段",
    whyEyebrow: "患者選擇我們的原因",
    whyTitle: "社區診所的親切，大型診所的服務範圍",
    why: [
      { icon: MapPin, t: "Kerrisdale 便利位置", d: "診所位於溫哥華 Kerrisdale 核心地段 5763 Balsam St。" },
      { icon: Stethoscope, t: "四大牙科範疇", d: "由四位牙醫組成的團隊提供一般、美容、手術及植牙治療。" },
      { icon: ShieldCheck, t: "嚴謹感染控制", d: "治療室於患者之間徹底消毒，每次看診的器械均經消毒處理。" },
      { icon: CreditCard, t: "保險及 CDCP 協助", d: "接受大多數牙科保險及加拿大牙科護理計劃，並可代為提交預估申請。" },
    ],
    teamEyebrow: "認識我們的牙醫團隊",
    teamTitle: "為您護理的醫師",
    teamLink: "認識團隊",
    npEyebrow: "新患者及保險",
    npTitle: "首次看診須知",
    np: [
      { t: "新患者查詢", d: "歡迎致電或提交查詢，我們的團隊會與您聯絡，安排合適的看診時間。" },
      { t: "牙科保險", d: "我們接受大多數保險計劃，樂意協助確認保障或提交預估申請。請攜帶最新的保險資料。" },
      { t: "加拿大牙科護理計劃", d: "本診所欣然接受 CDCP。申請資格由加拿大政府決定。" },
      { t: "看診前", d: "如需更改或取消預約，請至少提前 24 小時通知我們。" },
    ],
    cdcpLink: "加拿大牙科護理計劃",
    policyLink: "診所政策",
    faqEyebrow: "常見問題",
    faqTitle: "患者常問",
    faqLink: "查看全部問題",
  },
} as const;

export function HomePage({ lang }: { lang: Lang }) {
  const c = C[lang];
  const ui = UI[lang];
  const m = META.home[lang];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary-deep">
        <img
          src="/images/clinic-reception-kerrisdale.webp"
          alt={lang === "en" ? "Reception desk at Dr. Joyce Wu Dental Kerrisdale" : "Dr. Joyce Wu Dental Kerrisdale 診所接待處"}
          width={1200}
          height={630}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
        />
        <div aria-hidden className="hero-overlay absolute inset-0 -z-10" />
        <div className="container-page flex min-h-[560px] flex-col justify-center py-20 md:min-h-[640px] lg:min-h-[700px]">
          <div className="fade-up max-w-2xl">
            <p className="eyebrow eyebrow-dark">{c.heroEyebrow}</p>
            <h1 className="mt-6 font-display text-[2.35rem] font-semibold leading-[1.08] text-on-dark sm:text-5xl lg:text-[4rem]">{m.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted">{m.intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to={routeTo("contact", lang)} hash="inquiry" className={buttonStyles({ variant: "champagne", size: "lg" })}>
                {ui.request}
              </Link>
              <Link to={routeTo("home", lang)} hash="services" className={buttonStyles({ variant: "ghostDark", size: "lg" })}>
                {ui.explore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <img src="/images/clinic-waiting-area.webp" alt={lang === "en" ? "Bright patient waiting area with large windows" : "光線充足的候診區"} width={585} height={444} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <img src="/images/clinic-treatment-room.webp" alt={lang === "en" ? "Treatment room with dental chair" : "設有牙科椅的治療室"} width={585} height={444} loading="lazy" className="absolute -bottom-10 -right-4 hidden w-[46%] rounded-xl border-4 border-background object-cover shadow-lift sm:block md:-right-8" />
          </div>
          <div>
            <p className="eyebrow">{c.welcomeEyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-[2.6rem]">{c.welcomeTitle}</h2>
            {c.welcome.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <div className="mt-8 border-l-2 border-champagne pl-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                <ShieldCheck className="size-5 text-primary" aria-hidden /> {c.safetyTitle}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{c.safety}</p>
            </div>
            <Link to={routeTo("about", lang)} className={cn(buttonStyles({ variant: "outline" }), "mt-8")}>
              {c.aboutLink} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <DentalServiceFinder key={`finder-${lang}`} lang={lang} />

      {/* Services */}
      <section id="services" className="scroll-mt-24 bg-surface py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={c.servicesEyebrow} title={c.servicesTitle} />
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_KEYS.map((k, idx) => {
              const s = SERVICES[k][lang];
              return (
                <Link
                  key={k}
                  to={routeTo(k, lang)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-background transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface">
                    <img src={s.image} alt="" width={585} height={444} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-display text-sm text-champagne-ink">0{idx + 1}</span>
                    <h3 className="mt-2 font-display text-xl font-semibold">{ui.pageName[k]}</h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{s.card}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      {ui.viewServices}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-primary-deep py-20 md:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={c.whyEyebrow} title={c.whyTitle} dark />
            <img src="/images/clinic-treatment-room-map.webp" alt={lang === "en" ? "Treatment room with world-map wall feature" : "設有世界地圖牆飾的治療室"} width={585} height={444} loading="lazy" className="mt-10 aspect-[4/3] w-full rounded-2xl object-cover" />
          </div>
          <ul className="grid gap-px self-center overflow-hidden rounded-2xl bg-border-dark sm:grid-cols-2">
            {c.why.map((w) => (
              <li key={w.t} className="bg-primary-deep p-8">
                <w.icon className="size-6 text-champagne" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 font-display text-lg font-semibold text-on-dark">{w.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-on-dark-muted">{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={c.teamEyebrow} title={c.teamTitle} />
            <Link to={routeTo("team", lang)} className={buttonStyles({ variant: "outline" })}>
              {c.teamLink} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {DOCTORS.map((d) => (
              <li key={d.name}>
                <Link to={routeTo("team", lang)} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-shadow hover:shadow-lift">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img src={d.image} alt={`${d.name}, ${d.designation}`} width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold">{d.name}</h3>
                    <p className="mt-1 text-sm font-medium tracking-wide text-champagne-ink">{d.designation}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* New patients */}
      <FirstVisitJourney key={`journey-${lang}`} lang={lang}>
        <div className="mt-12 grid gap-8 border-t border-primary/20 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow={c.npEyebrow} title={c.npTitle} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={routeTo("cdcp", lang)} className={buttonStyles()}>
                {c.cdcpLink}
              </Link>
              <Link to={routeTo("about", lang)} className={buttonStyles({ variant: "outline" })}>
                {c.policyLink}
              </Link>
            </div>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2">
            {c.np.map((n, i) => (
              <li key={n.t} className="border-l border-primary/20 pl-5">
                <span className="font-display text-3xl font-light text-champagne-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{n.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{n.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </FirstVisitJourney>

      <Testimonials lang={lang} />

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionHeading eyebrow={c.faqEyebrow} title={c.faqTitle} />
            <Link to={routeTo("faq", lang)} className={cn(buttonStyles({ variant: "outline" }), "mt-8")}>
              {c.faqLink} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <FaqList items={FAQS[lang].slice(0, 4)} lang={lang} />
        </div>
      </section>

      <div className="border-t">
        <ContactSection lang={lang} />
      </div>
    </>
  );
}
