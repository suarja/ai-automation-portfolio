import { SiteHeader } from "@/components/site-header";
import { MOBILE_APP_STACK, getMobileApps, type CandidateLocale } from "@/lib/apps";
import { AppCard } from "@/components/apps/app-card";

const COPY: Record<CandidateLocale, {
  title: string;
  intro: string;
  eyebrow: string;
  appsHeading: string;
  stackHeading: string;
  stackIntro: string;
}> = {
  fr: {
    title: "Applications mobiles",
    intro: "Des produits mobiles conçus autour de besoins concrets, puis développés et suivis dans la durée.",
    eyebrow: "PRODUITS INDÉPENDANTS · 01 — 03",
    appsHeading: "Trois produits, trois usages.",
    stackHeading: "Une base mobile commune",
    stackIntro: "Les trois applications partagent la même stack :",
  },
  en: {
    title: "Mobile apps",
    intro: "Mobile products built around real needs, then developed and supported over time.",
    eyebrow: "INDEPENDENT PRODUCTS · 01 — 03",
    appsHeading: "Three products, three needs.",
    stackHeading: "A shared mobile foundation",
    stackIntro: "All three apps share the same stack:",
  },
  es: {
    title: "Aplicaciones móviles",
    intro: "Productos móviles creados para responder a necesidades concretas y acompañados a lo largo del tiempo.",
    eyebrow: "PRODUCTOS INDEPENDIENTES · 01 — 03",
    appsHeading: "Tres productos, tres usos.",
    stackHeading: "Una base móvil común",
    stackIntro: "Las tres aplicaciones comparten la misma stack:",
  },
};

export function AppGrid({ locale }: { locale: CandidateLocale }) {
  const apps = getMobileApps(locale);
  return (
    <ul className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
      {apps.map((app, index) => (
        <li key={app.slug}>
          <AppCard app={app} locale={locale} index={index} />
        </li>
      ))}
    </ul>
  );
}

export function AppsOverview({ locale }: { locale: CandidateLocale }) {
  const copy = COPY[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-6 md:py-10">
        <SiteHeader locale={locale} />

        <header className="mb-9 grid gap-6 border-b border-border pb-8 text-center md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:items-end md:gap-12 md:text-left">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">{copy.title}</h1>
          </div>
          <p className="mx-auto max-w-xl text-base leading-7 text-soft md:mx-0 md:justify-self-end md:text-lg md:leading-8">{copy.intro}</p>
        </header>

        <section aria-labelledby="apps-heading" className="mb-12">
          <h2 id="apps-heading" className="sr-only">{copy.appsHeading}</h2>
          <AppGrid locale={locale} />
        </section>

        <section aria-labelledby="apps-stack-heading" className="border-t border-border pt-8">
          <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <h2 id="apps-stack-heading" className="text-lg font-semibold tracking-tight">{copy.stackHeading}</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy.stackIntro}</p>
            </div>
            <ul className="flex flex-wrap justify-center gap-2 md:justify-start" aria-label={copy.stackHeading}>
              {MOBILE_APP_STACK.map((technology) => (
                <li key={technology} className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium shadow-sm">
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
