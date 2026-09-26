import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getMobileApp, type AppSlug, type CandidateLocale } from "@/lib/apps";

const COPY: Record<CandidateLocale, string> = {
  fr: "Voir le produit",
  en: "Explore the product",
  es: "Ver el producto",
};

export function MobileAppMention({
  app: mention,
  locale,
}: {
  app: { slug: AppSlug; summary: string };
  locale: CandidateLocale;
}) {
  const app = getMobileApp(mention.slug, locale);
  if (!app) return null;

  const href = locale === "fr" ? `/apps/${app.slug}` : `/${locale}/apps/${app.slug}`;

  return (
    <Link
      href={href}
      className="group flex h-full items-start gap-3 rounded-2xl border border-border bg-background/50 p-4 transition-colors hover:border-primary/20 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Image
        src={app.icon}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-xl border border-border object-cover"
      />
      <span className="min-w-0">
        <span className="flex items-center gap-1 font-semibold leading-5 group-hover:text-primary">
          {app.name}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </span>
        <span className="mt-1 block text-sm leading-5 text-muted-foreground">{mention.summary}</span>
        <span className="sr-only">{COPY[locale]}</span>
      </span>
    </Link>
  );
}
