import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { WorkItem } from "@/lib/data/work";

interface WorkCardProps {
  item: WorkItem;
}

export default function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.period}</p>
        </div>
        <p className="text-primary font-medium mb-3">{item.role}</p>

        <p className="text-muted-foreground text-sm mb-4">{item.context}</p>

        <ul className="list-disc list-inside text-soft space-y-1.5 mb-4">
          {item.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-1">
          {item.stack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-secondary border border-border rounded-full text-xs px-3"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {item.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
              >
                {link.label} <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-0 dark:opacity-20"></div>
    </article>
  );
}
