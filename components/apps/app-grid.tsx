import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProfileHeader from "@/components/profile-header";
import { MOBILE_APP_STACK, getMobileApps, type CandidateLocale } from "@/lib/apps";
import { AppCard } from "@/components/apps/app-card";

const COPY: Record<CandidateLocale, {
  title: string;
  intro: string;
  backHome: string;
  appsHeading: string;
  stackHeading: string;
  stackIntro: string;
}> = {
  fr: {
    title: "Applications mobiles",
    intro: "Des produits mobiles conçus autour de besoins concrets, puis développés et suivis dans la durée.",
    backHome: "Retour à l’accueil",
    appsHeading: "Les applications",
    stackHeading: "Une base mobile commune",
    stackIntro: "Les trois applications partagent la même stack :",
  },
  en: {
    title: "Mobile apps",
    intro: "Mobile products built around real needs, then developed and supported over time.",
    backHome: "Back to the homepage",
    appsHeading: "The apps",
    stackHeading: "A shared mobile foundation",
    stackIntro: "All three apps share the same stack:",
  },
  es: {
    title: "Aplicaciones móviles",
    intro: "Productos móviles creados para responder a necesidades concretas y acompañados a lo largo del tiempo.",
    backHome: "Volver al inicio",
    appsHeading: "Las aplicaciones",
    stackHeading: "Una base móvil común",
    stackIntro: "Las tres aplicaciones comparten la misma stack:",
  },
};

export function AppGrid({ locale }: { locale: CandidateLocale }) {
  const apps = getMobileApps(locale);
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {apps.map((app) => (
        <li key={app.slug}>
          <AppCard app={app} locale={locale} />
        </li>
      ))}
    </ul>
  );
}

export function AppsOverview({ locale }: { locale: CandidateLocale }) {
  const copy = COPY[locale];
  const homeHref = locale === "fr" ? "/" : `/${locale}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <ProfileHeader locale={locale} titleLevel="h2" />
        <Link
          href={homeHref}
          className="mt-10 inline-flex items-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ChevronLeft aria-hidden="true" className="mr-1 h-4 w-4" />
          {copy.backHome}
        </Link>

        <header className="mb-10 mt-8">
          <h1 className="text-4xl font-bold md:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-soft">{copy.intro}</p>
        </header>

        <section aria-labelledby="apps-heading" className="mb-12">
          <h2 id="apps-heading" className="mb-6 text-2xl font-bold">{copy.appsHeading}</h2>
          <AppGrid locale={locale} />
        </section>

        <section aria-labelledby="apps-stack-heading" className="card-glow rounded-3xl border border-border bg-gradient-to-br from-elevated to-card p-6 shadow-card md:p-8">
          <h2 id="apps-stack-heading" className="text-2xl font-bold">{copy.stackHeading}</h2>
          <p className="mt-3 text-soft">{copy.stackIntro}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={copy.stackHeading}>
            {MOBILE_APP_STACK.map((technology) => (
              <li key={technology} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium">
                {technology}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
