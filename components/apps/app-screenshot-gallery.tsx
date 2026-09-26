import Image from "next/image";
import type { CandidateLocale, MobileApp } from "@/lib/apps";

const SCREENSHOT_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/apps/presi/political-video.png": { width: 720, height: 1566 },
  "/apps/presi/analysis-card.png": { width: 720, height: 1566 },
  "/apps/bandaa/guest-feed.png": { width: 1206, height: 2622 },
  "/apps/bandaa/shared-album.png": { width: 1206, height: 2622 },
  "/apps/be-viral-ai/performance-coach.png": { width: 1179, height: 2556 },
  "/apps/be-viral-ai/script-editor.png": { width: 1179, height: 2556 },
};

const GALLERY_TITLES: Record<CandidateLocale, string> = {
  fr: "Quelques écrans de l’application",
  en: "A closer look at the app",
  es: "Algunas pantallas de la aplicación",
};

export function AppScreenshotGallery({ app, locale }: { app: MobileApp; locale: CandidateLocale }) {
  return (
    <section aria-labelledby="app-gallery-heading" className="mt-12">
      <h2 id="app-gallery-heading" className="mb-6 text-2xl font-bold">{GALLERY_TITLES[locale]}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {app.screenshots.map((screenshot) => {
          const dimensions = SCREENSHOT_DIMENSIONS[screenshot.src];
          return (
            <figure key={screenshot.src} className="card-glow flex flex-col items-center rounded-3xl border border-border bg-card p-5 shadow-card">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={dimensions.width}
                height={dimensions.height}
                sizes="(max-width: 384px) 84vw, 320px"
                className="h-auto w-full max-w-80 rounded-3xl border border-border bg-background object-contain shadow-card"
              />
              <figcaption className="mt-4 max-w-md text-center leading-relaxed text-muted-foreground">
                {screenshot.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
