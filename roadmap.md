# Domain-aware indexing

- [x] Add conditional noindex to platform-host HTML without changing access, content or custom-domain responses.
- [x] Allow crawler access in platform robots.txt and preserve production canonicals/sitemap.
- [x] Test platform/custom host behavior and inspect available public HTTP responses.

QA: 52 tests passed; latest build OK. Public preview auth responses were verified with platform-supplied noindex. The unpublished primary host returns a platform-controlled 404 that application code cannot tag; deployment is required before app-generated public HTML can be verified. No custom domain or workers.dev/pages.dev/netlify.app deployment is connected; those behaviors are code-tested only.

# Homepage interactions

- [x] Add bilingual Dental Service Finder after the introduction.
- [x] Enhance new-patient section with First Visit Journey; retain insurance, CDCP and policy information.
- [x] Verify selections, keyboard controls, bilingual destinations and six viewport sizes.
- [x] Run route and interaction tests; preserve existing design, SEO, imagery and inquiry form.

QA: 28 tests passed; browser checks passed in both languages at 320, 375, 390, 768, 1024 and 1440px for the new sections, service navigation/refresh and contact navigation. No runtime errors. Existing English header overflows at 1024px; left unchanged under the explicit header-preservation requirement. Inquiry delivery remains unconfigured and was not modified.