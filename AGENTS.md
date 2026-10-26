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
- Indexing is off unless `VITE_SITE_INDEXABLE=true`; `robots.txt` is a server route that only allows crawling on the joycewudentalvan.ca host. Why: keep preview builds out of search.
- Factual clinic content must come from the source site; never invent credentials, prices, ratings or outcomes. Why: real healthcare business.
- The inquiry form's server function has no delivery channel until the clinic approves one; it must never report fake success. Why: no lost patient inquiries.
