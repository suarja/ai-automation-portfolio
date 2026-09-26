import Link from "next/link";
import ProfileHeader from "@/components/profile-header";
import { AppShowcaseTeaser } from "@/components/apps/app-showcase-teaser";
import {
  getCandidateContent,
  getCandidateHomePath,
  type CandidateLocale,
} from "@/lib/candidate-content";

export default function CandidateAbout({
  locale,
}: {
  locale: CandidateLocale;
}) {
  const copy = getCandidateContent(locale);

  return (
    <main lang={locale} className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <ProfileHeader locale={locale} titleLevel="h2" />

        <div className="mt-12">
          <Link
            href={getCandidateHomePath(locale)}
            className="mb-8 inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden="true" className="mr-2">←</span>
            {locale === "fr" ? "Accueil" : locale === "es" ? "Inicio" : "Home"}
          </Link>

          <header className="mb-10">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{copy.about.title}</h1>
            <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground">
              {copy.about.intro}
            </p>
          </header>

          <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="card-glow rounded-3xl border border-border bg-card p-8 shadow-card">
              <h2 className="mb-4 text-2xl font-bold">{copy.about.productTitle}</h2>
              <p className="leading-relaxed text-soft">{copy.about.productText}</p>
            </article>
            <article className="card-glow rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-card p-8 shadow-card">
              <h2 className="mb-4 text-2xl font-bold">{copy.about.backgroundTitle}</h2>
              <p className="leading-relaxed text-soft">{copy.about.backgroundText}</p>
              <h3 className="mb-2 mt-6 text-lg font-semibold">{copy.about.languagesTitle}</h3>
              <ul className="space-y-1 text-soft">
                {copy.about.languages.map((language) => <li key={language}>{language}</li>)}
              </ul>
            </article>
          </section>

          <section className="card-glow mb-8 rounded-3xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-4 text-2xl font-bold">{copy.about.careerTitle}</h2>
            <ul className="space-y-3 text-soft">
              {copy.about.career.map((step) => <li key={step}>{step}</li>)}
            </ul>
          </section>

          <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="card-glow rounded-3xl border border-border bg-card p-8 shadow-card">
              <h2 className="mb-4 text-2xl font-bold">{copy.about.personalTitle}</h2>
              <p className="leading-relaxed text-soft">{copy.about.personalText}</p>
            </article>
            <article className="card-glow rounded-3xl border border-border bg-card p-8 shadow-card">
              <h2 className="mb-4 text-2xl font-bold">{copy.about.stackTitle}</h2>
              <div className="flex flex-wrap gap-2">
                {copy.about.stack.map((skill) => (
                  <span key={skill} className="rounded-full border border-border bg-secondary/70 px-3 py-1.5 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </section>

          <div className="mb-8">
            <AppShowcaseTeaser locale={locale} />
          </div>

          <section className="card-glow rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-card p-8 shadow-card">
            <h2 className="mb-4 text-2xl font-bold">{copy.about.aiTitle}</h2>
            <ul className="space-y-3 text-soft">
              {copy.about.ai.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
