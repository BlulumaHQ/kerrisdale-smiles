import { createFileRoute } from "@tanstack/react-router";
import { SITE_ORIGIN } from "@/content/site";
import { isPlatformHostname } from "@/lib/indexing";

// Platform pages use X-Robots-Tag instead of Disallow so crawlers can see noindex.
export function buildRobotsTxt(hostname: string): string {
  if (isPlatformHostname(hostname)) {
    return `# Platform preview — HTML responses carry X-Robots-Tag: noindex\nUser-agent: *\nAllow: /\n`;
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const body = buildRobotsTxt(new URL(request.url).hostname);
        return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
