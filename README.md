# lucasachaval.com

Personal landing page, built with [Astro](https://astro.build) as a fully static site.

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # outputs to dist/
pnpm preview
```

The build emits a single self-contained `dist/index.html`: CSS, the Geist font subsets and the
animation script are inlined, so the page renders from one request. `@astrojs/sitemap` generates
the sitemap; `public/` holds the favicons and `robots.txt`.

The page ships in English at `/` and Spanish at `/es/`; the copy lives in `src/i18n.ts` and both
routes render `src/components/Landing.astro`. Each page links the other with `hreflang`, and so
does the sitemap. A visitor on `/` whose browser lists Spanish first (`Accept-Language`) is
307-redirected to `/es/` by `vercel.json`. Picking a language with the switch sets a `lang`
cookie, which then decides instead, and `/?lang=en` always stays English. Visitors without an
`Accept-Language` header, like most crawlers, stay on `/`. The redirect only runs on Vercel, not
under `pnpm dev`.

`public/og.jpg` and `public/og-es.jpg` (the 1200×630 link-preview images) are screenshots of the
built pages at that size with reduced motion on. Regenerate them if the page copy changes.

Hosting is Vercel (framework and redirects in `vercel.json`, Node version in `package.json`).
`www.lucasachaval.com` 308-redirects to the bare domain.
