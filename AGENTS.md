<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- Every public URL must match the original WordPress site path exactly (trailing slash, `/zh-hant/…-cn/` suffixes); the router runs with `trailingSlash: "always"`. Why: SEO equity preservation.
- Bilingual route pairs, clinic facts, hours and navigation live only in `src/content/site.ts`; page copy lives in `src/content/pages.ts`. Why: one source of truth for both languages.
- Language is derived from the URL (`useCurrentPage`), never from client state. Why: crawlable, direct-loadable language pages.
- Each route file only calls `pageHead(key, lang)` and renders a shared page component. Why: consistent canonical/hreflang/JSON-LD.
- HTML on `lovable.app`, `workers.dev`, `pages.dev` and `netlify.app` hosts gets conditional `X-Robots-Tag: noindex`; their `robots.txt` allows crawling, while custom domains retain index-follow metadata and the production canonical/sitemap. Why: keep platform previews out of search without blocking custom-domain indexing.
- Factual clinic content must come from the source site; never invent credentials, prices, ratings or outcomes. Why: real healthcare business.
- The inquiry form's server function has no delivery channel until the clinic approves one; it must never report fake success. Why: no lost patient inquiries.
- Homepage patient navigation uses reusable local-state tab components; bilingual interaction copy stays in `src/content/pages.ts` and destinations use `routeTo`. Why: accessible interaction without new URLs, services or backend dependencies.
