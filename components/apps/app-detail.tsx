import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AppDemoVideo } from "@/components/apps/app-demo-video";
import { AppScreenshotGallery } from "@/components/apps/app-screenshot-gallery";
import { Button } from "@/components/ui/button";
import type { CandidateLocale, MobileApp } from "@/lib/apps";

const COPY: Record<CandidateLocale, {
  problem: string;
  response: string;
  role: string;
  stores: string;
  available: string;
  upcoming: string;
  appsLink: string;
}> = {
  fr: {
    problem: "Le problème utilisateur",
    response: "La réponse du produit",
    role: "Mon rôle",
    stores: "Télécharger l’application",
    available: "Disponible",
    upcoming: "À venir",
    appsLink: "Voir toutes les applications",
  },
  en: {
    problem: "The user problem",
    response: "The product response",
    role: "My role",
    stores: "Get the app",
    available: "Available",
    upcoming: "Coming soon",
    appsLink: "See all apps",
  },
  es: {
    problem: "El problema del usuario",
    response: "La respuesta del producto",
    role: "Mi papel",
    stores: "Descargar la aplicación",
    available: "Disponible",
    upcoming: "Próximamente",
    appsLink: "Ver todas las aplicaciones",
  },
};

function storeLabel(platform: "apple" | "googlePlay") {
  return platform === "apple" ? "App Store" : "Google Play";
}

export function AppDetail({ app, locale }: { app: MobileApp; locale: CandidateLocale }) {
  const copy = COPY[locale];
  const appsHref = locale === "fr" ? "/apps" : `/${locale}/apps`;
  const statusLabel = app.status === "upcoming" ? copy.upcoming : copy.available;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-6 md:py-8">
        <SiteHeader locale={locale} />
        <header className="mb-8 mt-5 text-center sm:text-left">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Image
              src={app.icon}
              alt=""
              width={80}
              height={80}
              sizes="80px"
              className="mx-auto h-20 w-20 rounded-3xl border border-border object-cover shadow-card sm:mx-0"
            />
            <div className="flex flex-col items-center sm:items-start">
              <div className="mb-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <span className={app.status === "upcoming"
                  ? "rounded-full border border-border bg-secondary px-3 py-1 text-sm font-semibold"
                  : "rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"}>
                  {statusLabel}
                </span>
                {app.releaseNote && <p className="text-sm text-muted-foreground">{app.releaseNote}</p>}
              </div>
              <h1 className="text-4xl font-bold md:text-5xl">{app.name}</h1>
              <p className="mt-3 max-w-3xl text-xl leading-relaxed text-soft">{app.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">{app.description}</p>
        </header>

        <AppDemoVideo app={app} locale={locale} />

        <div className="grid gap-6 md:grid-cols-2">
          <section aria-labelledby="app-problem-heading" className="card-glow rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 id="app-problem-heading" className="text-xl font-bold">{copy.problem}</h2>
            <p className="mt-3 leading-relaxed text-soft">{app.problem}</p>
          </section>
          <section aria-labelledby="app-response-heading" className="card-glow rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 id="app-response-heading" className="text-xl font-bold">{copy.response}</h2>
            <p className="mt-3 leading-relaxed text-soft">{app.solution}</p>
          </section>
        </div>

        <section aria-labelledby="app-role-heading" className="mt-6 rounded-3xl border border-border bg-gradient-to-br from-elevated to-card p-6 md:p-8">
          <h2 id="app-role-heading" className="text-xl font-bold">{copy.role}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-soft">{app.role}</p>
        </section>

        <AppScreenshotGallery app={app} locale={locale} />

        {app.storeLinks.length > 0 && (
          <section aria-labelledby="app-stores-heading" className="mt-12 border-t border-border pt-8">
            <h2 id="app-stores-heading" className="text-2xl font-bold">{copy.stores}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {app.storeLinks.map((store) => (
                <li key={store.platform}>
                  <a
                    href={store.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-border bg-card px-4 py-2 font-semibold text-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {storeLabel(store.platform)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-12 flex justify-center border-t border-border pt-8">
          <Button asChild variant="secondary" size="lg" className="rounded-full">
            <Link href={appsHref}>
              {copy.appsLink}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </footer>
      </div>
    </main>
  );
}
