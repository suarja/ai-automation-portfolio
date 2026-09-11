import { Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-[0_5px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Quote className="h-8 w-8 text-primary/50" />
        </div>
        <div>
          <p className="text-soft italic mb-6">{quote}</p>
          <div className="flex items-center">
            <div className="w-12 h-12 relative rounded-full overflow-hidden mr-4 border border-border">
              <Image
                src={avatar || "/placeholder.svg"}
                alt={author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold">{author}</p>
              <p className="text-muted-foreground text-sm">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
