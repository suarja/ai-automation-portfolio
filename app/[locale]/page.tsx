import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CandidateHome from "@/components/candidate-home";
import { isCandidateLocale, type CandidateLocale } from "@/lib/candidate-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isCandidateLocale(locale) || locale === "fr") return {};

  const title =
    locale === "en"
      ? "Jason Suárez | Full-stack developer"
      : "Jason Suárez | Desarrollador full stack";
  const description =
    locale === "en"
      ? "Full-stack developer building and owning web and mobile products from user need through production."
      : "Desarrollador full stack que crea y lidera productos web y móviles desde la necesidad hasta producción.";

  return {
    title,
    description,
    alternates: {
      canonical: "/" + locale,
      languages: { fr: "/", en: "/en", es: "/es" },
    },
    openGraph: {
      title,
      description,
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "profile",
    },
  };
}

export default async function LocalizedHome({ params }: PageProps) {
  const { locale } = await params;
  if (!isCandidateLocale(locale) || locale === "fr") notFound();
  return <CandidateHome locale={locale as CandidateLocale} />;
}
