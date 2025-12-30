import Link from 'next/link';
import { ChevronLeft, Clock, User, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getAllSlugs } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const mdxModule = await import(`@/content/blog/${slug}.mdx`);
    const metadata = mdxModule.metadata;

    return {
      title: `${metadata.title} | Jason Suarez`,
      description: metadata.description,
      authors: [{ name: metadata.author }],
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        type: 'article',
        publishedTime: metadata.publishedAt,
        modifiedTime: metadata.updatedAt || metadata.publishedAt,
        authors: [metadata.author],
        tags: metadata.tags,
        images: metadata.coverImage ? [
          {
            url: metadata.coverImage,
            width: 1200,
            height: 630,
            alt: metadata.title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.description,
        creator: '@swarecito',
        images: metadata.coverImage ? [metadata.coverImage] : [],
      },
      alternates: {
        canonical: `https://media.jason-suarez.com/blog/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Article non trouvé | Jason Suarez',
      description: 'Cet article n\'existe pas.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Dynamically import the MDX file
  let Post;
  let metadata;

  try {
    const mdxModule = await import(`@/content/blog/${slug}.mdx`);
    Post = mdxModule.default;
    metadata = mdxModule.metadata;
  } catch (error) {
    console.error(`Blog post not found: ${slug}`, error);
    notFound();
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    description: metadata.description,
    image: metadata.coverImage || '',
    datePublished: metadata.publishedAt,
    dateModified: metadata.updatedAt || metadata.publishedAt,
    author: {
      '@type': 'Person',
      name: metadata.author,
      url: 'https://media.jason-suarez.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Jason Suarez',
      url: 'https://media.jason-suarez.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://media.jason-suarez.com/blog/${slug}`,
    },
    keywords: metadata.tags.join(', '),
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour au blog
        </Link>

        <article className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 md:p-12">
          {/* Header */}
          <header className="mb-10">
            {/* Icon decoration */}
            <div className="inline-flex p-3 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl border border-primary/30 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {metadata.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-primary/10 border border-primary/30 text-primary rounded-full text-xs font-semibold"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {metadata.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>{metadata.author}</span>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <time dateTime={metadata.publishedAt}>
                  {formatDate(metadata.publishedAt)}
                </time>
              </div>
              {metadata.updatedAt && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className="text-xs text-gray-500">
                    Mis à jour le {formatDate(metadata.updatedAt)}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Cover Image */}
          {metadata.coverImage && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
              <img
                src={metadata.coverImage}
                alt={metadata.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Decorative line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10"></div>

          {/* MDX Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <Post />
          </div>

          {/* Bottom decorative line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-10 mb-6"></div>

          {/* Footer CTA */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20">
            <p className="text-sm text-gray-300 mb-3">
              💡 <strong>Cet article vous a plu ?</strong> Découvrez comment je peux vous aider à automatiser votre business.
            </p>
            <Link
              href="https://cal.com/jasonsuarez/booking"
              className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
            >
              Réserver un appel découverte →
            </Link>
          </div>

          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
        </article>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Voir tous les articles
          </Link>
        </div>
      </div>
    </main>
  );
}
