import type { CandidateLocale, MobileApp } from "@/lib/apps";

const VIDEO_EYEBROW: Record<CandidateLocale, string> = {
  fr: "APERÇU VIDÉO",
  en: "PRODUCT PREVIEW",
  es: "VISTA PREVIA",
};

export function AppDemoVideo({ app, locale }: { app: MobileApp; locale: CandidateLocale }) {
  const video = app.demoVideo;
  if (!video) return null;

  return (
    <section
      aria-labelledby="app-demo-heading"
      className="mt-8 grid gap-7 rounded-[2rem] border border-border bg-gradient-to-br from-elevated to-card p-5 shadow-card sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] md:items-center md:gap-10 md:p-8"
    >
      <div className="max-w-xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary">{VIDEO_EYEBROW[locale]}</p>
        <h2 id="app-demo-heading" className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          {video.title}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{video.caption}</p>
      </div>
      <video
        aria-label={video.alt}
        controls
        playsInline
        preload="none"
        poster={video.poster}
        className="mx-auto aspect-[9/16] w-full max-w-[20rem] rounded-[1.5rem] border border-border/70 bg-black object-cover shadow-card"
      >
        <source src={video.src} type="video/mp4" />
      </video>
    </section>
  );
}
