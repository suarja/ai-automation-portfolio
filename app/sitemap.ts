import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default async function sitemap() {
  const baseUrl = "https://media.jason-suarez.com";

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

  const staticPages = [
    {
      url: baseUrl,
      lastModified: getLastModified(path.join(pagesDir, "page.tsx")),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
  ];

  return [
    {
      url: baseUrl,
      lastModified: getLastModified(path.join(pagesDir, "page.tsx")),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...staticPages,
  ];
}
