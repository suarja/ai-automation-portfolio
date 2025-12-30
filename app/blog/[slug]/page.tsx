import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
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

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour au blog
        </Link>

        <article className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 md:p-12">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {metadata.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#222] border border-[#333] rounded-full text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {metadata.title}
            </h1>

            <div className="flex items-center text-gray-400 text-sm gap-4">
              <span>{metadata.author}</span>
              <span>•</span>
              <time dateTime={metadata.publishedAt}>
                {formatDate(metadata.publishedAt)}
              </time>
              {metadata.updatedAt && (
                <>
                  <span>•</span>
                  <span>
                    Mis à jour le {formatDate(metadata.updatedAt)}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Cover Image */}
          {metadata.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden border border-[#333]">
              <img
                src={metadata.coverImage}
                alt={metadata.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* MDX Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <Post />
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-primary hover:underline inline-flex items-center"
          >
            ← Voir tous les articles
          </Link>
        </div>
      </div>
    </main>
  );
}
