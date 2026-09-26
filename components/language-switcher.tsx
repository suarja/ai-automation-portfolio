"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { CandidateLocale } from "@/lib/candidate-content";

const LANGUAGES: Array<{ code: CandidateLocale; name: string }> = [
  { code: "fr", name: "Français" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

function pathForLocale(pathname: string, locale: CandidateLocale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "en" || segments[0] === "es") segments.shift();
  const pagePath = segments.length > 0 ? "/" + segments.join("/") : "";
  return locale === "fr" ? pagePath || "/" : "/" + locale + pagePath;
}

export default function LanguageSwitcher({
  locale,
}: {
  locale: CandidateLocale;
}) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const label =
    locale === "fr"
      ? "Choisir la langue"
      : locale === "es"
        ? "Elegir idioma"
        : "Choose language";

  return (
    <div
      className="relative inline-flex"
      onBlur={(event) => {
        const nextTarget = event.relatedTarget as HTMLElement | null;
        if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="h-10 w-10 rounded-full border border-border bg-card text-sm font-semibold shadow-sm transition-colors hover:bg-secondary"
      >
        {locale.toUpperCase()}
      </button>
      {open && (
        <div
          role="menu"
          aria-label={label}
          className="absolute left-1/2 top-full z-30 mt-2 flex -translate-x-1/2 gap-1 rounded-full border border-border bg-card p-1.5 shadow-lg"
        >
          {LANGUAGES.map((language) => (
            <Link
              key={language.code}
              href={pathForLocale(pathname, language.code)}
              role="menuitem"
              aria-label={language.name}
              aria-current={locale === language.code ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={
                locale === language.code
                  ? "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground transition-colors"
                  : "flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
              }
            >
              {language.code.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
