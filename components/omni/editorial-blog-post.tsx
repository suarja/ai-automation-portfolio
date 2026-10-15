import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import type { BlogPostMetadata } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import styles from "./omni.module.css";

export function EditorialBlogPost({ metadata, slug, children }: {
  metadata: BlogPostMetadata;
  slug: string;
  children: ReactNode;
}) {
  const canonical = `${SITE_URL}/blog/${slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: metadata.title, description: metadata.description,
      datePublished: metadata.publishedAt, dateModified: metadata.updatedAt || metadata.publishedAt,
      author: { "@type": "Person", name: metadata.author, url: SITE_URL },
      publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
      image: metadata.coverImage ? [`${SITE_URL}${metadata.coverImage}`] : [],
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical }, inLanguage: "fr-FR",
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: metadata.title, item: canonical },
      ],
    },
  ];
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className={styles.editorial}>
        <SiteHeader locale="fr" languageFallbackToHome />
        <article>
          <header className={styles.articleHeader}>
            <nav aria-label="Navigation de l’article">
              {metadata.projectHref && <Link href={metadata.projectHref} className="inline-flex items-center gap-2"><ArrowLeft aria-hidden="true" size={16} />Voir le projet Omni</Link>}
              <Link href="/blog">Tous les articles</Link>
            </nav>
            <h1>{metadata.title}</h1>
            <p className={styles.intro}>{metadata.description}</p>
            <div className={styles.meta}><span>{metadata.author}</span><span>Conception d’interface</span><span>Retour d’expérience</span></div>
          </header>
          <div className={styles.body}>{children}</div>
        </article>
        {metadata.projectHref && (
          <div className={styles.articleFoot}>
            <Button asChild variant="outline" className="rounded-full"><Link href={metadata.projectHref}>Voir la présentation d’Omni <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        )}
        <footer className={styles.footer}><Link href="/">Jason Suárez</Link><span>Retour d’expérience · 2026</span></footer>
      </div>
    </main>
  );
}
