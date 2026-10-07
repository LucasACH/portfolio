// The landing page ships in English at / and Spanish at /es/. Picking one for a visitor on / happens in vercel.json.
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const site = "https://lucasachaval.com/";
export const paths: Record<Locale, string> = { en: "/", es: "/es/" };

export const strings = {
  en: {
    ogLocale: "en_US",
    title: "Lucas Achaval · Tech Lead at Shield",
    description:
      "Lucas Achaval is the tech lead at a fintech that enables stablecoin payments and US banking for global trade.",
    socialDescription: "Tech lead at a fintech that enables stablecoin payments and US banking for global trade.",
    image: "/og.jpg",
    imageAlt: "Lucas Achaval, tech lead at Shield, on a dark grainy background",
    location: "Buenos Aires, Argentina",
    resume: "Resume",
    about: "I’m the tech lead at Shield, building stablecoin payments and US banking for global trade.",
    switchTo: { label: "ES", title: "Leer en español", href: "/es/" },
  },
  es: {
    ogLocale: "es_AR",
    title: "Lucas Achaval · Tech Lead en Shield",
    description:
      "Lucas Achaval es el tech lead de una fintech que ofrece pagos con stablecoins y banca en EE. UU. para el comercio internacional.",
    socialDescription:
      "Tech lead de una fintech que ofrece pagos con stablecoins y banca en EE. UU. para el comercio internacional.",
    image: "/og-es.jpg",
    imageAlt: "Lucas Achaval, tech lead en Shield, sobre un fondo oscuro con grano",
    location: "Buenos Aires, Argentina",
    resume: "CV",
    about: "Soy el tech lead de Shield, donde construimos pagos con stablecoins y banca en EE. UU. para el comercio internacional.",
    // The query keeps a Spanish browser on English without JS or cookies; vercel.json skips the redirect when it is set.
    switchTo: { label: "EN", title: "Read in English", href: "/?lang=en" },
  },
} satisfies Record<Locale, Record<string, unknown>>;
