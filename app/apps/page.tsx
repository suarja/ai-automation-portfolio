import type { Metadata } from "next";
import { AppsOverview } from "@/components/apps/app-grid";

const title = "Applications mobiles | Jason Suárez";
const description = "Presi, Bandaa et Be Viral AI : trois applications mobiles conçues et développées par Jason Suárez.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/apps",
    languages: { fr: "/apps", en: "/en/apps", es: "/es/apps" },
  },
  openGraph: { title, description, locale: "fr_FR", type: "website" },
};

export default function AppsPage() {
  return <AppsOverview locale="fr" />;
}
