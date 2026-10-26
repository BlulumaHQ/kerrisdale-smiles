import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { ROUTES, resolvePath } from "@/content/site";
import { buildSitemap } from "@/routes/sitemap[.]xml";

// The 20 original public URLs that must be preserved exactly (SEO continuity).
const ORIGINAL_URLS = [
  "/", "/about/", "/our-team/", "/general/", "/cosmetic/", "/surgical/", "/implant/", "/faq/", "/canada-dental-care-plan/", "/contact/",
  "/zh-hant/", "/zh-hant/about-cn/", "/zh-hant/our-team-cn/", "/zh-hant/general-cn/", "/zh-hant/cosmetic-cn/", "/zh-hant/surgical-cn/",
  "/zh-hant/implant-cn/", "/zh-hant/faq-cn/", "/zh-hant/canada-dental-care-plan-ch/", "/zh-hant/contact-cn/",
];

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });

  it.each(ORIGINAL_URLS)("matches a real page for %s", (url) => {
    expect(router.matchRoutes(url).at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("route map covers exactly the 20 original URLs", () => {
    const mapped = Object.values(ROUTES).flatMap((r) => [r.en.path, r.zh.path]).sort();
    expect(mapped).toEqual([...ORIGINAL_URLS].sort());
  });

  it("language switch pairs /general/ with /zh-hant/general-cn/", () => {
    expect(resolvePath("/general/")).toEqual({ key: "general", lang: "en" });
    expect(ROUTES.general.zh.path).toBe("/zh-hant/general-cn/");
    expect(ROUTES.cdcp.zh.path).toBe("/zh-hant/canada-dental-care-plan-ch/");
  });

  it("sitemap lists all 20 canonical URLs on the production origin", () => {
    const xml = buildSitemap();
    for (const u of ORIGINAL_URLS) expect(xml).toContain(`<loc>https://joycewudentalvan.ca${u}</loc>`);
  });
});
