import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  tags,
  featured,
  coverImage,
}: BlogCardProps) {
  // Use cover image or default blog image
  const image = coverImage || "/images/icons/folder.png";

  // Gradient for featured articles (purple theme like IA resources)
  const bgGradient = featured
    ? "from-purple-900 to-indigo-800"
    : "from-[#151515] to-[#111]";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br ${bgGradient}`}
    >
      <div className="p-6 pb-4">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 relative flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              width={96}
              height={96}
              className="object-contain drop-shadow-[0_5px_10px_rgba(255,255,255,0.15)] rounded-3xl"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-[#222] border border-[#333] rounded-full text-xs px-3"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        <Button
          asChild
          className="w-full rounded-full bg-[#222] hover:bg-[#333] shadow-md"
        >
          <Link href={`/blog/${slug}`}>Lire l'article</Link>
        </Button>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
    </div>
  );
}
