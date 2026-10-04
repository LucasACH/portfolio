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

`public/og.jpg` (the 1200×630 link-preview image) is a screenshot of the built page at that size
with reduced motion on. Regenerate it if the page copy changes.

Hosting is Vercel (framework and redirects in `vercel.json`, Node version in `package.json`).
`www.lucasachaval.com` 308-redirects to the bare domain.
