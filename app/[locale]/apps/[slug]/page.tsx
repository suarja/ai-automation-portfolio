import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppDetail } from "@/components/apps/app-detail";
import { getMobileApp, getMobileApps, type CandidateLocale } from "@/lib/apps";
import { isCandidateLocale } from "@/lib/candidate-content";

type PageProps = { params: Promise<{ locale: string; slug: string }> };
const LOCALES = ["en", "es"] as const;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getMobileApps(locale).map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isCandidateLocale(locale) || locale === "fr") notFound();
  const app = getMobileApp(slug, locale);
  if (!app) notFound();

  const title = locale === "en"
    ? `${app.name} | Mobile apps by Jason Suárez`
    : `${app.name} | Aplicaciones móviles de Jason Suárez`;
  const description = app.description;
  const canonical = `/${locale}/apps/${app.slug}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { fr: `/apps/${app.slug}`, en: `/en/apps/${app.slug}`, es: `/es/apps/${app.slug}` },
    },
    openGraph: { title, description, locale: locale === "en" ? "en_US" : "es_ES", type: "website" },
  };
}

export default async function LocalizedAppPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isCandidateLocale(locale) || locale === "fr") notFound();
  const app = getMobileApp(slug, locale);
  if (!app) notFound();
  return <AppDetail app={app} locale={locale as CandidateLocale} />;
}
