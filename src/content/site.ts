// Central source of truth: clinic facts, bilingual route map, and navigation.
// Facts below are taken from https://joycewudentalvan.ca/ (audited Oct 2026).

export type Lang = "en" | "zh";
export type PageKey =
  | "home"
  | "about"
  | "team"
  | "general"
  | "cosmetic"
  | "surgical"
  | "implant"
  | "faq"
  | "cdcp"
  | "contact";

export const SITE_ORIGIN = "https://joycewudentalvan.ca";

/** `to` = router path (typed), `path` = exact original public URL (canonical, trailing slash). */
export const ROUTES = {
  home: { en: { to: "/", path: "/" }, zh: { to: "/zh-hant/", path: "/zh-hant/" } },
  about: { en: { to: "/about", path: "/about/" }, zh: { to: "/zh-hant/about-cn", path: "/zh-hant/about-cn/" } },
  team: { en: { to: "/our-team", path: "/our-team/" }, zh: { to: "/zh-hant/our-team-cn", path: "/zh-hant/our-team-cn/" } },
  general: { en: { to: "/general", path: "/general/" }, zh: { to: "/zh-hant/general-cn", path: "/zh-hant/general-cn/" } },
  cosmetic: { en: { to: "/cosmetic", path: "/cosmetic/" }, zh: { to: "/zh-hant/cosmetic-cn", path: "/zh-hant/cosmetic-cn/" } },
  surgical: { en: { to: "/surgical", path: "/surgical/" }, zh: { to: "/zh-hant/surgical-cn", path: "/zh-hant/surgical-cn/" } },
  implant: { en: { to: "/implant", path: "/implant/" }, zh: { to: "/zh-hant/implant-cn", path: "/zh-hant/implant-cn/" } },
  faq: { en: { to: "/faq", path: "/faq/" }, zh: { to: "/zh-hant/faq-cn", path: "/zh-hant/faq-cn/" } },
  cdcp: {
    en: { to: "/canada-dental-care-plan", path: "/canada-dental-care-plan/" },
    zh: { to: "/zh-hant/canada-dental-care-plan-ch", path: "/zh-hant/canada-dental-care-plan-ch/" },
  },
  contact: { en: { to: "/contact", path: "/contact/" }, zh: { to: "/zh-hant/contact-cn", path: "/zh-hant/contact-cn/" } },
} as const;

export const PAGE_KEYS = Object.keys(ROUTES) as PageKey[];

export function routeTo(key: PageKey, lang: Lang) {
  return ROUTES[key][lang].to;
}
export function routePath(key: PageKey, lang: Lang) {
  return ROUTES[key][lang].path;
}

/** Find the page key + language for a pathname (with or without trailing slash). */
export function resolvePath(pathname: string): { key: PageKey; lang: Lang } | null {
  const norm = pathname.endsWith("/") ? pathname : `${pathname}/`;
  for (const key of PAGE_KEYS) {
    for (const lang of ["en", "zh"] as const) {
      if (ROUTES[key][lang].path === norm) return { key, lang };
    }
  }
  return null;
}

export const CLINIC = {
  name: "Dr. Joyce Wu Dental Kerrisdale",
  street: "5763 Balsam St",
  city: "Vancouver",
  region: "BC",
  postal: "V6M 4B8",
  country: "CA",
  addressLine: "5763 Balsam St, Vancouver, BC V6M 4B8, Canada",
  phoneDisplay: "+1 604-263-1878",
  phoneHref: "tel:+16042631878",
  email: "drjoycewukerr@hotmail.com",
  mapsUrl: "https://maps.app.goo.gl/WApapXZj3mNWvXPK8",
  mapEmbed: "https://www.google.com/maps?q=5763+Balsam+St,+Vancouver,+BC+V6M+4B8&output=embed",
  reviewsUrl:
    "https://www.google.com/search?q=google+review+of+dr.+joyce+wu+kerrisdale#lrd=0x5486737a57f4f623:0x149c2bca7cef610d,1,,,,",
  cdcpGovUrlEn: "https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html",
  cdcpGovUrlFr: "https://www.canada.ca/fr/services/prestations/dentaire/regime-soins-dentaires.html",
} as const;

/** Hours as published on the source Contact page (not independently confirmed). */
export const HOURS: { day: { en: string; zh: string }; schema: string; open?: string; close?: string; label: { en: string; zh: string } }[] = [
  { day: { en: "Monday", zh: "星期一" }, schema: "Monday", open: "10:00", close: "18:00", label: { en: "10 am – 6 pm", zh: "上午10時 – 下午6時" } },
  { day: { en: "Tuesday", zh: "星期二" }, schema: "Tuesday", open: "09:00", close: "17:00", label: { en: "9 am – 5 pm", zh: "上午9時 – 下午5時" } },
  { day: { en: "Wednesday", zh: "星期三" }, schema: "Wednesday", label: { en: "Closed", zh: "休息" } },
  { day: { en: "Thursday", zh: "星期四" }, schema: "Thursday", open: "09:00", close: "17:00", label: { en: "9 am – 5 pm", zh: "上午9時 – 下午5時" } },
  { day: { en: "Friday", zh: "星期五" }, schema: "Friday", open: "09:00", close: "17:00", label: { en: "9 am – 5 pm", zh: "上午9時 – 下午5時" } },
  { day: { en: "Saturday", zh: "星期六" }, schema: "Saturday", open: "09:00", close: "17:00", label: { en: "9 am – 5 pm", zh: "上午9時 – 下午5時" } },
  { day: { en: "Sunday", zh: "星期日" }, schema: "Sunday", label: { en: "Closed", zh: "休息" } },
];

export const DOCTORS = [
  { name: "Dr. Joyce Wu", designation: "DDS", image: "/images/dr-joyce-wu.webp" },
  { name: "Dr. Miles Chu", designation: "D.M.D.", image: "/images/dr-miles-chu.webp" },
  { name: "Dr. Cindy Wang", designation: "D.M.D.", image: "/images/dr-cindy-wang.webp" },
  { name: "Dr. Sherry Liu", designation: "D.M.D.", image: "/images/dr-sherry-liu.webp" },
] as const;

/** Verbatim Google reviews displayed on the source homepage (max three shown). */
export const TESTIMONIALS = [
  {
    name: "Elizabeth Bion",
    rating: 5,
    text: "Dr. Chu and Dr. Cindy Wang gave me my smile back! I am forever grateful for their impeccable work. I highly recommend them.",
  },
  {
    name: "Ken Lapp",
    rating: 5,
    text: "Dr. Sherry Liu, who works out of the Kerrisdale office of Joyce Wu Dental, did a wonderful job of cleaning my teeth. I've never had such an excellent job with so little discomfort. I highly recommend Dr. Sherry Liu.",
  },
  {
    name: "gerard koo",
    rating: 5,
    text: "Dentists and other staff are very friendly and nice. They are quite thorough with all of the patience's dental work. My family has been happy with their service and work for several years. Definitely recommended for anyone looking for a dentist.",
  },
] as const;

export const SERVICE_KEYS = ["general", "cosmetic", "surgical", "implant"] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const UI = {
  en: {
    nav: { home: "Home", about: "About", team: "Our Team", services: "Services", faq: "FAQ", contact: "Contact", cdcp: "Canada Dental Care Plan", officePolicy: "Office Policy" },
    pageName: {
      home: "Home", about: "About", team: "Our Team", general: "General Dentistry", cosmetic: "Cosmetic Dentistry",
      surgical: "Surgical Dentistry", implant: "Dental Implants", faq: "FAQ", cdcp: "Canada Dental Care Plan", contact: "Contact",
    },
    request: "Request an Appointment",
    call: "Call Our Clinic",
    callShort: "Call Us",
    directions: "Get Directions",
    explore: "Explore Our Services",
    viewServices: "View Services",
    learnMore: "Learn more",
    menu: "Menu",
    close: "Close",
    switchTo: "繁中",
    switchLabel: "切換至繁體中文",
    breadcrumbHome: "Home",
    hours: "Opening Hours",
    hoursNote: "Hours as currently published. Please call to confirm, especially around holidays.",
    contactInfo: "Contact",
    address: "Address",
    phone: "Telephone",
    email: "Email",
    footerAbout: "A neighbourhood dental practice on Balsam Street offering general, cosmetic, surgical and implant dentistry for patients in Kerrisdale and across Vancouver.",
    usefulLinks: "Useful Links",
    ourServices: "Our Services",
    language: "Language",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    skip: "Skip to main content",
    inquiryCta: "Have a question about this treatment?",
    inquiryCtaBody: "Our team can talk you through options and arrange a consultation.",
    mapTitle: "Map showing Dr. Joyce Wu Dental Kerrisdale on Balsam Street",
  },
  zh: {
    nav: { home: "首頁", about: "關於診所", team: "醫師團隊", services: "牙科服務", faq: "常見問題", contact: "聯絡我們", cdcp: "加拿大牙科護理計劃", officePolicy: "診所政策" },
    pageName: {
      home: "首頁", about: "關於診所", team: "醫師團隊", general: "一般牙科", cosmetic: "美容牙科",
      surgical: "牙科手術", implant: "植牙", faq: "常見問題", cdcp: "加拿大牙科護理計劃", contact: "聯絡我們",
    },
    request: "預約諮詢",
    call: "致電診所",
    callShort: "致電我們",
    directions: "取得路線",
    explore: "了解牙科服務",
    viewServices: "查看服務",
    learnMore: "了解更多",
    menu: "選單",
    close: "關閉",
    switchTo: "EN",
    switchLabel: "Switch to English",
    breadcrumbHome: "首頁",
    hours: "營業時間",
    hoursNote: "以上為目前公佈的營業時間，節假日安排請致電確認。",
    contactInfo: "聯絡資料",
    address: "地址",
    phone: "電話",
    email: "電郵",
    footerAbout: "位於 Balsam Street 的社區牙科診所，為 Kerrisdale 及溫哥華各區居民提供一般牙科、美容牙科、牙科手術及植牙服務。",
    usefulLinks: "實用連結",
    ourServices: "牙科服務",
    language: "語言",
    rights: "版權所有。",
    backToTop: "返回頁首",
    skip: "跳至主要內容",
    inquiryCta: "對這項治療有疑問嗎？",
    inquiryCtaBody: "我們的團隊樂意為您說明治療選擇，並協助安排諮詢。",
    mapTitle: "Dr. Joyce Wu Dental Kerrisdale 位於 Balsam Street 的地圖",
  },
} as const;
