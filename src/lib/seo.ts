import { META } from "@/content/pages";
import { CLINIC, HOURS, ROUTES, SITE_ORIGIN, UI, type Lang, type PageKey } from "@/content/site";

// Platform hosts are excluded by the serving layer's conditional X-Robots-Tag.
// Keeping HTML index-follow avoids leaking preview noindex rules to custom domains.
const OG_IMAGE = `${SITE_ORIGIN}/images/og-joyce-wu-dental.jpg`;

export function dentistJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_ORIGIN}/#dentist`,
    name: CLINIC.name,
    url: `${SITE_ORIGIN}/`,
    image: OG_IMAGE,
    telephone: "+1-604-263-1878",
    email: CLINIC.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.street,
      addressLocality: CLINIC.city,
      addressRegion: CLINIC.region,
      postalCode: CLINIC.postal,
      addressCountry: CLINIC.country,
    },
    hasMap: CLINIC.mapsUrl,
    availableLanguage: ["English", "Chinese"],
    paymentAccepted: "Cash, Visa, MasterCard, WeChat Pay, Alipay, Debit, Personal Cheque",
    openingHoursSpecification: HOURS.filter((h) => h.open).map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.schema}`,
      opens: h.open,
      closes: h.close,
    })),
  };
}

export function pageHead(key: PageKey, lang: Lang) {
  const m = META[key][lang];
  const path = ROUTES[key][lang].path;
  const url = `${SITE_ORIGIN}${path}`;
  const enUrl = `${SITE_ORIGIN}${ROUTES[key].en.path}`;
  const zhUrl = `${SITE_ORIGIN}${ROUTES[key].zh.path}`;
  const ui = UI[lang];

  const crumbs =
    key === "home"
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: ui.breadcrumbHome, item: `${SITE_ORIGIN}${ROUTES.home[lang].path}` },
            { "@type": "ListItem", position: 2, name: ui.pageName[key], item: url },
          ],
        };

  const webPage = {
    "@context": "https://schema.org",
    "@type": key === "faq" ? "FAQPage" : key === "contact" ? "ContactPage" : key === "about" ? "AboutPage" : "WebPage",
    name: m.title,
    description: m.description,
    url,
    inLanguage: lang === "en" ? "en-CA" : "zh-Hant-CA",
    isPartOf: { "@type": "WebSite", name: CLINIC.name, url: `${SITE_ORIGIN}/` },
    about: { "@id": `${SITE_ORIGIN}/#dentist` },
  };

  const scripts: { type: string; children: string }[] = [{ type: "application/ld+json", children: JSON.stringify(webPage) }];
  if (crumbs) scripts.push({ type: "application/ld+json", children: JSON.stringify(crumbs) });
  if (key === "home" || key === "contact") scripts.push({ type: "application/ld+json", children: JSON.stringify(dentistJsonLd()) });

  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: key === "home" ? "website" : "article" },
      { property: "og:site_name", content: CLINIC.name },
      { property: "og:locale", content: lang === "en" ? "en_CA" : "zh_TW" },
      { property: "og:locale:alternate", content: lang === "en" ? "zh_TW" : "en_CA" },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: m.title },
      { name: "twitter:description", content: m.description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en-CA", href: enUrl },
      { rel: "alternate", hrefLang: "zh-Hant-CA", href: zhUrl },
      { rel: "alternate", hrefLang: "x-default", href: enUrl },
    ],
    scripts,
  };
}
