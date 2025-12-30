import fs from "fs";
import path from "path";
import { getAllSlugs } from "@/lib/blog";

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

  return [...staticPages, ...blogPages];
}
