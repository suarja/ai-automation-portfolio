import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import { getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Blog - Articles & Tutoriels',
  description:
    'Articles techniques, réflexions et tutoriels sur l\'automatisation, l\'IA et le développement web',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-400">
            Articles techniques, réflexions et tutoriels
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Aucun article publié pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6 hover:border-[#333] transition-all duration-300"
              >
                {post.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-yellow-500/20 border-yellow-500/50 text-yellow-500 rounded-full text-xs"
                    >
                      ⭐ Featured
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3">
                    {formatDate(post.publishedAt)} • {post.author}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-[#222] border border-[#333] rounded-full text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
