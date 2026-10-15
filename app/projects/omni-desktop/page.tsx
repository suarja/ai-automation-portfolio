import type { Metadata } from "next";
import { OmniProject } from "@/components/omni/omni-project";
import { OMNI_DESCRIPTION, OMNI_IMAGES, OMNI_PROJECT_PATH } from "@/lib/omni";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Omni Desktop | ${SITE_NAME}`,
  description: OMNI_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${OMNI_PROJECT_PATH}` },
  openGraph: {
    type: "website", title: "Omni Desktop", description: OMNI_DESCRIPTION,
    url: `${SITE_URL}${OMNI_PROJECT_PATH}`, locale: "fr_FR",
    images: [{ url: OMNI_IMAGES.project.src, width: 2880, height: 1800, alt: OMNI_IMAGES.project.alt }],
  },
  twitter: { card: "summary_large_image", title: "Omni Desktop", description: OMNI_DESCRIPTION, images: [OMNI_IMAGES.project.src] },
};

export default function OmniProjectPage() {
  return <OmniProject />;
}
