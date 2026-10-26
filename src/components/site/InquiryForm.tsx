import { AlertCircle, Loader2, Mail, Phone } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { CLINIC, type Lang } from "@/content/site";
import { inquirySchema, submitInquiry, type InquiryResult } from "@/lib/inquiry.functions";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./Button";

const T = {
  en: {
    title: "Appointment Inquiry",
    lead: "Tell us how we can help and our team will contact you to arrange a time.",
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    service: "Service of interest",
    choose: "Select a service",
    services: { general: "General Dentistry", cosmetic: "Cosmetic Dentistry", surgical: "Surgical Dentistry", implant: "Dental Implants", other: "Other Inquiry" },
    method: "Preferred contact method",
    methods: { phone: "Phone", email: "Email" },
    message: "General inquiry",
    messageHint: "Optional — preferred days or times, or a short question.",
    consent: "I agree to be contacted by Dr. Joyce Wu Dental Kerrisdale about this inquiry.",
    notice: "Please do not include sensitive personal or medical information in this form. Submitting this inquiry does not confirm an appointment.",
    submit: "Send Inquiry",
    sending: "Sending…",
    required: "Required",
    errors: { name: "Please enter your full name.", email: "Please enter a valid email address.", phone: "Please enter a valid phone number.", service: "Please choose a service.", consent: "Please confirm you agree to be contacted." },
    notConfigured: "Online inquiries are not yet being delivered to the clinic. Your message has not been sent — please call or email us directly and we'll be glad to help.",
    rejected: "We couldn't send this inquiry. Please call or email the clinic directly.",
    failed: "Something went wrong. Please try again, or call or email the clinic.",
  },
  zh: {
    title: "預約查詢",
    lead: "請告訴我們您的需要，我們的團隊會與您聯絡安排時間。",
    name: "全名",
    email: "電郵地址",
    phone: "電話號碼",
    service: "查詢服務",
    choose: "請選擇服務",
    services: { general: "一般牙科", cosmetic: "美容牙科", surgical: "牙科手術", implant: "植牙", other: "其他查詢" },
    method: "首選聯絡方式",
    methods: { phone: "電話", email: "電郵" },
    message: "一般查詢",
    messageHint: "選填——方便的日子或時間，或簡短問題。",
    consent: "本人同意 Dr. Joyce Wu Dental Kerrisdale 就此查詢與本人聯絡。",
    notice: "請勿在此表格填寫敏感的個人或醫療資料。提交查詢並不代表預約已確認。",
    submit: "提交查詢",
    sending: "提交中…",
    required: "必填",
    errors: { name: "請輸入您的全名。", email: "請輸入有效的電郵地址。", phone: "請輸入有效的電話號碼。", service: "請選擇服務。", consent: "請確認同意我們與您聯絡。" },
    notConfigured: "網上查詢目前尚未接通至診所，您的訊息未有送出。請直接致電或發送電郵，我們樂意為您服務。",
    rejected: "未能送出此查詢，請直接致電或發送電郵至診所。",
    failed: "發生錯誤，請重試，或直接致電或發送電郵至診所。",
  },
} as const;

type Field = "name" | "email" | "phone" | "service" | "consent";

const inputCls =
  "mt-2 block w-full rounded-lg border border-input bg-surface px-4 py-3 text-[0.95rem] text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive";

export function InquiryForm({ lang, defaultService }: { lang: Lang; defaultService?: string }) {
  const t = T[lang];
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "loading" | InquiryResult["status"] | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      contactMethod: String(fd.get("contactMethod") ?? "phone"),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current,
    };
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const f = issue.path[0] as Field;
        if (f in t.errors) next[f] = t.errors[f];
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setState("loading");
    try {
      const res = await submitInquiry({ data: parsed.data as never });
      setState(res.status);
    } catch {
      setState("error");
    }
  }

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-err`} className="mt-1.5 text-sm text-destructive">
        {errors[f]}
      </p>
    ) : null;

  const message = state === "not_configured" ? t.notConfigured : state === "rejected" ? t.rejected : state === "error" ? t.failed : null;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border bg-surface p-6 shadow-soft md:p-9" aria-labelledby="inquiry-title">
      <h2 id="inquiry-title" className="font-display text-2xl font-semibold md:text-[1.7rem]">
        {t.title}
      </h2>
      <p className="mt-2 text-muted-foreground">{t.lead}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-primary-deep">
          {t.name} <span className="text-destructive" aria-hidden>*</span>
          <input name="name" autoComplete="name" required maxLength={100} className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
          {err("name")}
        </label>
        <label className="block text-sm font-medium text-primary-deep">
          {t.phone} <span className="text-destructive" aria-hidden>*</span>
          <input name="phone" type="tel" autoComplete="tel" required maxLength={30} className={inputCls} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
          {err("phone")}
        </label>
        <label className="block text-sm font-medium text-primary-deep md:col-span-2">
          {t.email} <span className="text-destructive" aria-hidden>*</span>
          <input name="email" type="email" autoComplete="email" required maxLength={255} className={inputCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
          {err("email")}
        </label>
        <label className="block text-sm font-medium text-primary-deep">
          {t.service} <span className="text-destructive" aria-hidden>*</span>
          <select name="service" required defaultValue={defaultService ?? ""} className={inputCls} aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-err" : undefined}>
            <option value="" disabled>
              {t.choose}
            </option>
            {Object.entries(t.services).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
          {err("service")}
        </label>
        <fieldset>
          <legend className="text-sm font-medium text-primary-deep">{t.method}</legend>
          <div className="mt-2 flex gap-3">
            {(["phone", "email"] as const).map((m, i) => (
              <label key={m} className="flex min-h-12 flex-1 cursor-pointer items-center gap-2 rounded-lg border border-input bg-surface px-4 text-sm has-[:checked]:border-primary has-[:checked]:bg-muted">
                <input type="radio" name="contactMethod" value={m} defaultChecked={i === 0} className="accent-[var(--color-primary)]" />
                {t.methods[m]}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm font-medium text-primary-deep md:col-span-2">
          {t.message}
          <textarea name="message" rows={4} maxLength={1000} className={inputCls} aria-describedby="message-hint" />
          <span id="message-hint" className="mt-1.5 block text-xs font-normal text-muted-foreground">
            {t.messageHint}
          </span>
        </label>
        {/* Honeypot */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-sm text-foreground">
            <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-[var(--color-primary)]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} />
            <span>
              {t.consent} <span className="text-destructive" aria-hidden>*</span>
            </span>
          </label>
          {err("consent")}
        </div>
      </div>

      <p className="mt-6 flex gap-3 rounded-lg bg-muted px-4 py-3 text-sm text-primary-deep">
        <AlertCircle className="mt-0.5 size-4 shrink-0 text-champagne-ink" aria-hidden />
        {t.notice}
      </p>

      <div aria-live="polite" className="mt-4">
        {message && (
          <div role="status" className={cn("rounded-lg border px-4 py-3 text-sm", state === "not_configured" ? "border-champagne bg-ivory text-primary-deep" : "border-destructive/40 text-destructive")}>
            <p>{message}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={CLINIC.phoneHref} className={buttonStyles({ size: "sm" })}>
                <Phone className="size-4" aria-hidden /> {CLINIC.phoneDisplay}
              </a>
              <a href={`mailto:${CLINIC.email}`} className={buttonStyles({ size: "sm", variant: "outline" })}>
                <Mail className="size-4" aria-hidden /> {CLINIC.email}
              </a>
            </div>
          </div>
        )}
      </div>

      <button type="submit" disabled={state === "loading"} className={cn(buttonStyles({ size: "lg" }), "mt-6 w-full md:w-auto")}>
        {state === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden /> {t.sending}
          </>
        ) : (
          t.submit
        )}
      </button>
    </form>
  );
}
