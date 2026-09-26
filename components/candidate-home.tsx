import Link from "next/link";
import ProfileHeader from "@/components/profile-header";
import WorkCard from "@/components/work-card";
import { AppShowcaseTeaser } from "@/components/apps/app-showcase-teaser";
import { getCandidateContent, getCandidateAboutPath, type CandidateLocale } from "@/lib/candidate-content";

export default function CandidateHome({
  locale,
}: {
  locale: CandidateLocale;
}) {
  const copy = getCandidateContent(locale);
  const aboutPath = getCandidateAboutPath(locale);

  return (
    <main lang={locale} className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <ProfileHeader locale={locale} />

        <section className="mt-16">
          <h2 className="mb-3 text-2xl font-bold">{copy.home.workTitle}</h2>
          <p className="mb-8 max-w-3xl text-muted-foreground">
            {copy.home.workIntro}
          </p>
          <div className="grid grid-cols-1 gap-6">
            {copy.work.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <div className="mt-16">
          <AppShowcaseTeaser locale={locale} />
        </div>

        <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <article className="card-glow rounded-3xl border border-border bg-card p-8 shadow-card backdrop-blur-sm lg:col-span-3">
            <h2 className="mb-4 text-2xl font-bold">{copy.home.approachTitle}</h2>
            <p className="mb-5 text-soft">{copy.about.intro}</p>
            <p className="text-soft">{copy.about.backgroundText}</p>
            <Link
              href={aboutPath}
              className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              {copy.home.aboutLink} <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </article>

          <article className="card-glow rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-card p-8 shadow-card backdrop-blur-sm lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold">{copy.about.aiTitle}</h2>
            <ul className="space-y-3 text-soft">
              {copy.about.ai.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-16 rounded-3xl border border-border bg-card p-8 text-center shadow-card">
          <h2 className="mb-3 text-2xl font-bold">{copy.home.contactTitle}</h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            {copy.home.contactText}
          </p>
          <a
            href="mailto:jason.h.suarez@gmail.com"
            className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {copy.home.contactLink}
          </a>
        </section>
      </div>
    </main>
  );
}
