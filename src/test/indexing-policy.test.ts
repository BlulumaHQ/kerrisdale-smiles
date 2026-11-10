import { describe, expect, it } from "vitest";

import { applyPlatformNoindex, isPlatformHostname } from "@/lib/indexing";
import { pageHead } from "@/lib/seo";
import { buildRobotsTxt } from "@/routes/robots[.]txt";

const PLATFORM_HOSTS = [
  "id-preview--febc841c-c35d-41bc-95fc-91b2c4a71b75.lovable.app",
  "kerrisdale-smiles.lovable.app",
  "example.workers.dev",
  "example.pages.dev",
  "example.netlify.app",
];

describe("domain-aware indexing", () => {
  it.each(PLATFORM_HOSTS)("recognizes %s as a platform host", (hostname) => {
    expect(isPlatformHostname(hostname)).toBe(true);
  });

  it.each(["joycewudentalvan.ca", "www.joycewudentalvan.ca"])("does not classify %s as a platform host", (hostname) => {
    expect(isPlatformHostname(hostname)).toBe(false);
  });

  it.each(PLATFORM_HOSTS)("adds noindex to nested HTML routes on %s without changing the response", async (hostname) => {
    const original = new Response("<h1>General Dentistry</h1>", {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8", "X-Existing": "preserved" },
    });
    const response = applyPlatformNoindex(new Request(`https://${hostname}/zh-hant/general-cn/`), original);

    expect(response.status).toBe(200);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
    expect(response.headers.get("X-Existing")).toBe("preserved");
    await expect(response.text()).resolves.toBe("<h1>General Dentistry</h1>");
  });

  it.each([404, 500])("adds noindex to platform HTML error responses with status %s", (status) => {
    const response = applyPlatformNoindex(
      new Request("https://kerrisdale-smiles.lovable.app/missing/"),
      new Response("Not found", { status, headers: { "Content-Type": "text/html" } }),
    );
    expect(response.status).toBe(status);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
  });

  it.each(["joycewudentalvan.ca", "www.joycewudentalvan.ca"])("leaves custom-domain HTML index-eligible on %s", (hostname) => {
    const response = applyPlatformNoindex(
      new Request(`https://${hostname}/general/`),
      new Response("<h1>General Dentistry</h1>", { headers: { "Content-Type": "text/html" } }),
    );
    expect(response.headers.has("X-Robots-Tag")).toBe(false);
  });

  it("does not add noindex to non-HTML platform responses", () => {
    const response = applyPlatformNoindex(
      new Request("https://kerrisdale-smiles.lovable.app/sitemap.xml"),
      new Response("xml", { headers: { "Content-Type": "application/xml" } }),
    );
    expect(response.headers.has("X-Robots-Tag")).toBe(false);
  });

  it.each(PLATFORM_HOSTS)("allows crawler access without a sitemap on %s", (hostname) => {
    const robots = buildRobotsTxt(hostname);
    expect(robots).toContain("Allow: /");
    expect(robots).not.toContain("Disallow:");
    expect(robots).not.toContain("Sitemap:");
  });

  it("keeps the production sitemap in custom-domain robots.txt", () => {
    expect(buildRobotsTxt("joycewudentalvan.ca")).toContain("Sitemap: https://joycewudentalvan.ca/sitemap.xml");
  });

  it("keeps page metadata index-follow and the original canonical on custom domains", () => {
    const head = pageHead("general", "en");
    expect(head.meta).toContainEqual({ name: "robots", content: "index, follow, max-image-preview:large" });
    expect(head.links).toContainEqual({ rel: "canonical", href: "https://joycewudentalvan.ca/general/" });
  });
});
