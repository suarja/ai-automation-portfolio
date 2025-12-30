import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
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
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6 flex flex-col h-full hover:border-[#333] transition-all duration-300">
      {featured && (
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 border-yellow-500/50 text-yellow-500 rounded-full text-xs"
          >
            ⭐ Featured
          </Badge>
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{author}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-[#222] border border-[#333] rounded-full text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Button asChild variant="outline" className="w-full rounded-full">
        <Link href={`/blog/${slug}`}>Lire l'article</Link>
      </Button>
    </div>
  );
}
