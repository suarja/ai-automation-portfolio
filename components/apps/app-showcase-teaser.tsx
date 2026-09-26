import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CandidateLocale } from "@/lib/apps";

const COPY: Record<CandidateLocale, { title: string; body: string; link: string }> = {
  fr: {
    title: "Applications mobiles",
    body: "Trois produits indépendants, des usages distincts et une même attention portée au parcours de bout en bout.",
    link: "Découvrir les applications",
  },
  en: {
    title: "Mobile apps",
    body: "Three independent products, different user needs and the same care for the full product journey.",
    link: "Explore the apps",
  },
  es: {
    title: "Aplicaciones móviles",
    body: "Tres productos independientes, necesidades distintas y la misma atención a todo el recorrido del producto.",
    link: "Descubrir las aplicaciones",
  },
};

export function AppShowcaseTeaser({ locale }: { locale: CandidateLocale }) {
  const copy = COPY[locale];
  const href = locale === "fr" ? "/apps" : `/${locale}/apps`;

  return (
    <Link
      href={href}
      aria-labelledby="app-showcase-teaser-heading"
      className="group card-glow block rounded-3xl border border-border bg-gradient-to-br from-elevated to-card p-6 text-center shadow-card transition duration-300 hover:-translate-y-px hover:border-primary/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:transform-none md:p-8 md:text-left"
    >
      <div className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:items-end sm:text-left">
        <div className="flex flex-col items-center sm:items-start">
          <h2 id="app-showcase-teaser-heading" className="text-2xl font-bold">{copy.title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-soft">{copy.body}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all group-hover:gap-4 group-hover:shadow-md">
          {copy.link}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
