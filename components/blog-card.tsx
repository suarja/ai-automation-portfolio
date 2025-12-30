import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
}

export default function BlogCard({
  slug,
  title,
  description,
  publishedAt,
  author,
  tags,
  featured,
}: BlogCardProps) {
  // Gradient colors for blog (purple/blue theme)
  const bgGradient = featured
    ? "from-purple-900/30 to-indigo-900/30"
    : "from-[#151515] to-[#111]";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br ${bgGradient} hover:border-[#333] transition-all duration-300`}
    >
      <div className="p-6 pb-4">
        {/* Icon/Image section */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 relative flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-3xl border border-primary/30">
            <BookOpen className="w-12 h-12 text-primary" />
            {featured && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1.5">
                <span className="text-xs">⭐</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-[#222] border border-[#333] rounded-full text-xs px-3"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>

        {/* Meta info */}
        <p className="text-xs text-gray-400 mb-3">
          {formatDate(publishedAt)} • {author}
        </p>

        {/* Description */}
        <p className="text-gray-400 mb-6 line-clamp-3 text-sm">{description}</p>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full rounded-full bg-[#222] hover:bg-[#333] shadow-md"
        >
          <Link href={`/blog/${slug}`}>Lire l'article</Link>
        </Button>
      </div>

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
    </div>
  );
}
