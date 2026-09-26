import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppDetail } from "@/components/apps/app-detail";
import { getMobileApp, getMobileApps } from "@/lib/apps";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getMobileApps("fr").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getMobileApp(slug, "fr");
  if (!app) notFound();

  const title = `${app.name} | Applications mobiles de Jason Suárez`;
  const description = app.description;
  const canonical = `/apps/${app.slug}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { fr: canonical, en: `/en${canonical}`, es: `/es${canonical}` },
    },
    openGraph: {
      title,
      description,
      locale: "fr_FR",
      type: "website",
      images: [{ url: "/images/og-jason-suarez.png", width: 1200, height: 630, alt: "Jason Suárez, développeur full-stack" }],
    },
  };
}

export default async function AppPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getMobileApp(slug, "fr");
  if (!app) notFound();
  return <AppDetail app={app} locale="fr" />;
}
