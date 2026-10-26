import { createFileRoute } from "@tanstack/react-router";
import { PAGE_KEYS, ROUTES, SITE_ORIGIN } from "@/content/site";

// Lists the 20 original canonical URLs with reciprocal hreflang alternates.
export function buildSitemap() {
  const urls = PAGE_KEYS.flatMap((key) =>
    (["en", "zh"] as const).map((lang) => {
      const loc = `${SITE_ORIGIN}${ROUTES[key][lang].path}`;
      const en = `${SITE_ORIGIN}${ROUTES[key].en.path}`;
      const zh = `${SITE_ORIGIN}${ROUTES[key].zh.path}`;
      return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="en-CA" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hant-CA" href="${zh}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => new Response(buildSitemap(), { headers: { "Content-Type": "application/xml; charset=utf-8" } }),
    },
  },
});
