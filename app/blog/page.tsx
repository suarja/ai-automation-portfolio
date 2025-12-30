import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, BookOpen, Sparkles } from 'lucide-react';
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
          className="inline-flex  z-20 items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour à l'accueil
        </Link>

        {/* Hero Section with gradient */}
        <div className="mb-12 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl border border-primary/30">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Blog
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Articles techniques, réflexions et tutoriels sur l'automatisation et l'IA
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-12 text-center">
            <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Aucun article publié pour le moment.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Revenez bientôt pour découvrir mes premiers articles !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => {
              const isFirst = index === 0;
              const gradientClass = post.featured
                ? 'from-purple-900/30 to-indigo-900/30'
                : 'from-[#151515] to-[#111]';

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br ${gradientClass} p-6 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] ${
                    isFirst ? 'md:col-span-2' : ''
                  }`}
                >
                  {post.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-yellow-500 border-yellow-600 text-black rounded-full text-xs font-semibold shadow-lg">
                        ⭐ À la une
                      </Badge>
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Icon for visual interest */}
                    <div className="inline-flex p-2 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl border border-primary/30 mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>

                    <div className="mb-4">
                      <h2 className={`font-bold mb-2 group-hover:text-primary transition-colors ${
                        isFirst ? 'text-3xl' : 'text-2xl'
                      }`}>
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                        <span className="text-primary">●</span>
                        {formatDate(post.publishedAt)} • {post.author}
                      </p>
                      <p className={`text-gray-300 leading-relaxed ${
                        isFirst ? 'text-base' : 'text-sm line-clamp-2'
                      }`}>
                        {post.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-[#222] border border-[#333] rounded-full text-xs hover:border-primary/50 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-purple-600/5"></div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
