import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CandidateAbout from "@/components/candidate-about";
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
      ? "About Jason Suárez | Full-stack developer"
      : "Sobre Jason Suárez | Desarrollador full stack";
  const description =
    locale === "en"
      ? "A product-minded full-stack developer's background, work, languages and life beyond the screen."
      : "Recorrido, productos, idiomas y vida fuera de la pantalla de un desarrollador full stack.";

  return {
    title,
    description,
    alternates: {
      canonical: "/" + locale + "/about",
      languages: { fr: "/about", en: "/en/about", es: "/es/about" },
    },
    openGraph: {
      title,
      description,
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "profile",
    },
  };
}

export default async function LocalizedAbout({ params }: PageProps) {
  const { locale } = await params;
  if (!isCandidateLocale(locale) || locale === "fr") notFound();
  return <CandidateAbout locale={locale as CandidateLocale} />;
}
