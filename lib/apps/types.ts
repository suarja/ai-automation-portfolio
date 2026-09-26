export type CandidateLocale = "fr" | "en" | "es";
export type AppStatus = "upcoming" | "published";
export type AppSlug = "presi" | "bandaa" | "be-viral-ai";
export type AppStorePlatform = "apple" | "googlePlay";

export interface AppScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface AppStoreLink {
  platform: AppStorePlatform;
  href: string;
}

export interface LocalizedAppContent {
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  releaseNote?: string;
  screenshots: [AppScreenshot, AppScreenshot];
}

export interface MobileApp extends LocalizedAppContent {
  slug: AppSlug;
  name: string;
  icon: string;
  status: AppStatus;
  storeLinks: AppStoreLink[];
}

export type LocalizedMobileApp = MobileApp;
export type AppCatalog = Record<AppSlug, LocalizedAppContent>;
