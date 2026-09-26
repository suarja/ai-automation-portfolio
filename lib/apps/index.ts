import catalogEn from "./catalog-en";
import catalogEs from "./catalog-es";
import catalogFr from "./catalog-fr";
import type { AppCatalog, CandidateLocale, LocalizedAppContent, MobileApp } from "./types";

export type { AppSlug, CandidateLocale, LocalizedMobileApp, MobileApp } from "./types";
export { type AppScreenshot, type AppStatus, type AppStoreLink, type AppStorePlatform } from "./types";

export const MOBILE_APP_STACK = ["React Native", "Expo", "TypeScript", "Convex"] as const;

type AppMetadata = Omit<MobileApp, keyof LocalizedAppContent>;
const APP_METADATA: AppMetadata[] = [
  { slug: "presi", name: "Presi", icon: "/apps/presi/icon.webp", status: "upcoming", storeLinks: [] },
  {
    slug: "bandaa",
    name: "Bandaa",
    icon: "/apps/bandaa/icon.webp",
    status: "published",
    storeLinks: [
      { platform: "apple", href: "https://apps.apple.com/us/app/bandaa-event-photo-missions/id6798290227" },
      { platform: "googlePlay", href: "https://play.google.com/store/apps/details?id=com.swarecito.bandaa" },
    ],
  },
  {
    slug: "be-viral-ai",
    name: "Be Viral AI",
    icon: "/apps/be-viral-ai/icon.webp",
    status: "published",
    storeLinks: [{ platform: "apple", href: "https://apps.apple.com/fr/app/be-viral-ai-analyse-contenu/id6746679101" }],
  },
];

const CATALOGS: Record<CandidateLocale, AppCatalog> = { fr: catalogFr, en: catalogEn, es: catalogEs };

export function getMobileApps(locale: CandidateLocale): MobileApp[] {
  return APP_METADATA.map((app) => ({ ...app, ...CATALOGS[locale][app.slug] }));
}

export function getMobileApp(slug: string, locale: CandidateLocale): MobileApp | undefined {
  return getMobileApps(locale).find((app) => app.slug === slug);
}
