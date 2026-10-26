import { createFileRoute } from "@tanstack/react-router";
import { SITE_ORIGIN } from "@/content/site";

// Production host gets an indexable robots.txt; every other host (preview/staging) is blocked.
const PRODUCTION_HOSTS = ["joycewudentalvan.ca", "www.joycewudentalvan.ca"];

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const host = new URL(request.url).hostname;
        const body = PRODUCTION_HOSTS.includes(host)
          ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`
          : `# Staging / preview — not for indexing\nUser-agent: *\nDisallow: /\n`;
        return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
