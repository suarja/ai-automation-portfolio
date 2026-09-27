import Link from "next/link";
import LanguageSwitcher from "@/components/language-switcher";
import ThemeToggle from "@/components/theme-toggle";
import type { CandidateLocale } from "@/lib/candidate-content";

const COPY: Record<CandidateLocale, { home: string; controls: string }> = {
  fr: { home: "Accueil de Jason Suárez", controls: "Préférences d’affichage" },
  en: { home: "Jason Suárez homepage", controls: "Display preferences" },
  es: { home: "Inicio de Jason Suárez", controls: "Preferencias de visualización" },
};

export function SiteHeader({
  locale,
  languageFallbackToHome = false,
  compact = false,
}: {
  locale: CandidateLocale;
  languageFallbackToHome?: boolean;
  compact?: boolean;
}) {
  const homeHref = locale === "fr" ? "/" : `/${locale}`;
  const copy = COPY[locale];

  return (
    <header className={compact ? "mb-0 flex items-center justify-between gap-4 border-b border-border pb-5" : "mb-10 flex items-center justify-between gap-4 border-b border-border pb-5"}>
      <Link
        href={homeHref}
        aria-label={copy.home}
        className="text-base font-semibold tracking-tight transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        Jason Suárez
      </Link>
      <nav aria-label={copy.controls} className="flex shrink-0 items-center gap-2">
        <LanguageSwitcher locale={locale} fallbackToLocaleHome={languageFallbackToHome} />
        <ThemeToggle locale={locale} />
      </nav>
    </header>
  );
}
