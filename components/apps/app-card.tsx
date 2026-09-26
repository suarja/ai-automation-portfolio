import Image from "next/image";
import Link from "next/link";
import type { CandidateLocale, MobileApp } from "@/lib/apps";

const STATUS_LABELS: Record<CandidateLocale, { upcoming: string; published: string }> = {
  fr: { upcoming: "À venir", published: "Disponible" },
  en: { upcoming: "Coming soon", published: "Available" },
  es: { upcoming: "Próximamente", published: "Disponible" },
};

export function AppCard({ app, locale }: { app: MobileApp; locale: CandidateLocale }) {
  const href = locale === "fr" ? `/apps/${app.slug}` : `/${locale}/apps/${app.slug}`;
  const status = app.status === "upcoming" ? "upcoming" : "published";

  return (
    <article className="card-glow h-full rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-start gap-4">
        <Image
          src={app.icon}
          alt=""
          width={64}
          height={64}
          sizes="64px"
          className="h-16 w-16 shrink-0 rounded-2xl border border-border object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold">{app.name}</h3>
            <span
              className={
                status === "upcoming"
                  ? "rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground"
                  : "rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
              }
            >
              {STATUS_LABELS[locale][status]}
            </span>
          </div>
          <p className="mt-2 leading-relaxed text-soft">{app.tagline}</p>
        </div>
      </div>

      <Link
        href={href}
        className="mt-6 inline-flex rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {locale === "fr" ? "Découvrir l’application" : locale === "en" ? "Explore the app" : "Conocer la aplicación"}
      </Link>
    </article>
  );
}
