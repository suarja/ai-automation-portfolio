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
  const isRealCover = Boolean(coverImage && !coverImage.startsWith("/images/icons/"));

  // Gradient for featured articles (purple theme like IA resources)
  const bgGradient = featured
    ? "from-primary/15 to-card border-primary/30"
    : "from-elevated to-card";

  return (
    <div
      className={`card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br ${bgGradient}`}
    >
      <div className="p-6 pb-4">
        {isRealCover ? (
          <div className="mb-5 -mx-6 -mt-6 overflow-hidden border-b border-border">
            <Image src={image} alt="" width={1200} height={630} className="w-full h-auto" />
          </div>
        ) : (
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
        )}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary border border-border rounded-full text-xs px-3"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button
          asChild
          className="w-full rounded-full bg-secondary hover:bg-muted shadow-md"
        >
          <Link href={`/blog/${slug}`}>Lire l'article</Link>
        </Button>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-0 dark:opacity-20"></div>
    </div>
  );
}
