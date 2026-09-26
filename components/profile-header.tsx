import Image from "next/image";
import SocialIcon from "./social-icon";
import ThemeToggle from "./theme-toggle";
import LanguageSwitcher from "./language-switcher";
import { getCandidateContent, type CandidateLocale } from "@/lib/candidate-content";

export default function ProfileHeader({
  locale = "fr",
  titleLevel = "h1",
}: {
  locale?: CandidateLocale;
  titleLevel?: "h1" | "h2";
}) {
  const copy = getCandidateContent(locale);
  const NameHeading = titleLevel;

  return (
    <header className="relative flex flex-col items-center pt-14 text-center sm:pt-12">
      <nav
        aria-label={locale === "fr" ? "Préférences d’affichage" : locale === "es" ? "Preferencias de visualización" : "Display preferences"}
        className="absolute right-0 top-0 flex items-center gap-2"
      >
        <LanguageSwitcher locale={locale} />
        <ThemeToggle locale={locale} />
      </nav>
      <div className="halo relative w-32 h-32 overflow-hidden rounded-full border-2 border-border shadow-card">
        <Image
          src="/images/profile.jpg"
          alt={copy.profile.avatarAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <NameHeading className="mt-4 text-3xl font-bold">Jason Suárez</NameHeading>

      <p className="mt-2 text-lg font-semibold text-foreground">
        {copy.profile.headline}
      </p>

      <p className="mt-2 max-w-md text-muted-foreground">
        {copy.profile.promise}
      </p>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {copy.profile.details}
      </p>

      <div className="flex gap-3 mt-4">
        <SocialIcon
          icon="tiktok"
          href="https://tiktok.com/@swarecito"
          label="TikTok"
        />
        <SocialIcon
          icon="youtube"
          href="https://youtube.com/@swarecito"
          label="YouTube"
        />
        <SocialIcon
          icon="linkedin"
          href="https://linkedin.com/in/jason-suarez"
          label="LinkedIn"
        />
        <SocialIcon
          icon="github"
          href="https://github.com/suarja"
          label="GitHub"
        />
      </div>
    </header>
  );
}
