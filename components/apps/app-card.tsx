import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CandidateLocale, MobileApp } from "@/lib/apps";

const CARD_COPY: Record<CandidateLocale, { upcoming: string; published: string; action: string }> = {
  fr: { upcoming: "À venir", published: "Disponible", action: "Voir le produit" },
  en: { upcoming: "Coming soon", published: "Available", action: "Explore the product" },
  es: { upcoming: "Próximamente", published: "Disponible", action: "Ver el producto" },
};

export function AppCard({ app, locale, index }: { app: MobileApp; locale: CandidateLocale; index: number }) {
  const href = locale === "fr" ? `/apps/${app.slug}` : `/${locale}/apps/${app.slug}`;
  const status = app.status === "upcoming" ? "upcoming" : "published";
  const copy = CARD_COPY[locale];

  return (
    <Link
      href={href}
      aria-label={`${app.name} — ${app.tagline} — ${copy.action}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-card transition duration-300 hover:-translate-y-px hover:border-primary/20 hover:shadow-[0_14px_34px_-24px_hsl(var(--glow)/0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-elevated to-secondary/70">
        <Image
          src={app.cardImage.src}
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover opacity-25 blur-2xl"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background/55" />
        <span className="absolute left-5 top-5 z-20 rounded-full border border-border/70 bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          {status === "upcoming" ? copy.upcoming : copy.published}
        </span>
        <span aria-hidden="true" className="absolute right-5 top-5 z-20 font-mono text-xs tracking-[0.18em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Image
          src={app.cardImage.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
          style={{ objectPosition: app.cardImage.objectPosition }}
          className="z-10 object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
          priority={index === 0}
        />
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>

      <div className="flex flex-1 flex-col items-center p-6 text-center sm:p-7 md:items-start md:text-left">
        {app.releaseNote && (
          <p className="text-xs font-medium leading-5 text-muted-foreground">{app.releaseNote}</p>
        )}
        <div className="mt-3 flex items-center justify-center gap-3 md:justify-start">
          <Image
            src={app.icon}
            alt=""
            width={44}
            height={44}
            sizes="44px"
            className="h-11 w-11 rounded-2xl border border-border object-cover shadow-sm"
          />
          <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {app.name}
          </h3>
        </div>
        <p className="mt-3 flex-1 text-base leading-7 text-soft">{app.tagline}</p>
        <span className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all group-hover:gap-4 group-hover:shadow-md motion-reduce:transition-none">
          {copy.action}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
