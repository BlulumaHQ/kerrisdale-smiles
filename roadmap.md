# Domain-aware indexing

- [ ] Add conditional noindex to platform-host HTML without changing access, content or custom-domain responses.
- [ ] Allow crawler access in platform robots.txt and preserve production canonicals/sitemap.
- [ ] Test platform/custom host behavior and inspect available public HTTP responses.

# Homepage interactions

- [x] Add bilingual Dental Service Finder after the introduction.
- [x] Enhance new-patient section with First Visit Journey; retain insurance, CDCP and policy information.
- [x] Verify selections, keyboard controls, bilingual destinations and six viewport sizes.
- [x] Run route and interaction tests; preserve existing design, SEO, imagery and inquiry form.

QA: 28 tests passed; browser checks passed in both languages at 320, 375, 390, 768, 1024 and 1440px for the new sections, service navigation/refresh and contact navigation. No runtime errors. Existing English header overflows at 1024px; left unchanged under the explicit header-preservation requirement. Inquiry delivery remains unconfigured and was not modified.