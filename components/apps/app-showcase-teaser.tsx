import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <section aria-labelledby="app-showcase-teaser-heading" className="card-glow rounded-3xl border border-border bg-gradient-to-br from-elevated to-card p-6 shadow-card md:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h2 id="app-showcase-teaser-heading" className="text-2xl font-bold">{copy.title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-soft">{copy.body}</p>
        </div>
        <Link href={href} className="inline-flex shrink-0 items-center gap-2 rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          {copy.link}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
