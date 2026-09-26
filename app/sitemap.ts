import fs from "fs";
import path from "path";
import { getAllSlugs } from "@/lib/blog";
import { getMobileApps, type CandidateLocale } from "@/lib/apps";

const APP_LOCALES: CandidateLocale[] = ["fr", "en", "es"];

function getLocalizedAppPath(locale: CandidateLocale, slug?: string) {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  return `${prefix}/apps${slug ? `/${slug}` : ""}`;
}

export default async function sitemap() {
  const baseUrl = "https://www.jason-suarez.com";

  // Fonction pour obtenir la date de dernière modification d'un fichier
  const getLastModified = (filePath: string): Date => {
    try {
      const stats = fs.statSync(filePath);
      return stats.mtime;
    } catch (error) {
      return new Date();
    }
  };

  // Chemin de base pour les fichiers de pages
  const pagesDir = path.join(process.cwd(), "app");

  // Pages statiques
  const staticPages = [
    {
      url: baseUrl,
      lastModified: getLastModified(path.join(pagesDir, "page.tsx")),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: getLastModified(path.join(pagesDir, "about", "page.tsx")),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: getLastModified(path.join(pagesDir, "blog", "page.tsx")),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Articles de blog dynamiques
  const blogSlugs = getAllSlugs();
  const blogPages = blogSlugs.map((slug) => {
    const blogPostPath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: getLastModified(blogPostPath),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  const appPages = APP_LOCALES.flatMap((locale) => {
    const overviewAlternates = Object.fromEntries(
      APP_LOCALES.map((language) => [language, `${baseUrl}${getLocalizedAppPath(language)}`]),
    );
    const overviewPage = {
      url: `${baseUrl}${getLocalizedAppPath(locale)}`,
      lastModified: getLastModified(
        path.join(pagesDir, ...(locale === "fr" ? ["apps", "page.tsx"] : ["[locale]", "apps", "page.tsx"])),
      ),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: overviewAlternates },
    };

    const detailPages = getMobileApps(locale).map(({ slug }) => {
      return {
        url: `${baseUrl}${getLocalizedAppPath(locale, slug)}`,
        lastModified: getLastModified(
          path.join(pagesDir, ...(locale === "fr" ? ["apps", "[slug]", "page.tsx"] : ["[locale]", "apps", "[slug]", "page.tsx"])),
        ),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            APP_LOCALES.map((language) => [language, `${baseUrl}${getLocalizedAppPath(language, slug)}`]),
          ),
        },
      };
    });

    return [overviewPage, ...detailPages];
  });

  return [...staticPages, ...blogPages, ...appPages];
}
