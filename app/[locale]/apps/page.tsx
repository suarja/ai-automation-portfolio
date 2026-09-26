import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppsOverview } from "@/components/apps/app-grid";
import { isCandidateLocale, type CandidateLocale } from "@/lib/candidate-content";

type PageProps = { params: Promise<{ locale: string }> };

const COPY = {
  en: {
    title: "Mobile apps | Jason Suárez",
    description: "Presi, Bandaa and Be Viral AI: three mobile apps designed and built by Jason Suárez.",
  },
  es: {
    title: "Aplicaciones móviles | Jason Suárez",
    description: "Presi, Bandaa y Be Viral AI: tres aplicaciones móviles diseñadas y desarrolladas por Jason Suárez.",
  },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isCandidateLocale(locale) || locale === "fr") notFound();
  const copy = COPY[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}/apps`,
      languages: { fr: "/apps", en: "/en/apps", es: "/es/apps" },
    },
    openGraph: { title: copy.title, description: copy.description, locale: locale === "en" ? "en_US" : "es_ES", type: "website" },
  };
}

export default async function LocalizedAppsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isCandidateLocale(locale) || locale === "fr") notFound();
  return <AppsOverview locale={locale as CandidateLocale} />;
}
