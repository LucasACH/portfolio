// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lucasachaval.com",
  integrations: [
    // Adds the hreflang alternates for / and /es/ to the sitemap.
    sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", es: "es" } } }),
  ],
  build: {
    // Single page: ship CSS inside the HTML so first paint needs one request.
    inlineStylesheets: "always",
  },
  vite: {
    build: {
      // Inline the two Geist subsets (~7 KB and ~4 KB) as data URIs, as the original page did.
      assetsInlineLimit: 8 * 1024,
    },
  },
});
