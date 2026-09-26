import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MobileAppMention } from "@/components/apps/mobile-app-mention";
import type { WorkItem } from "@/lib/data/work";
import type { CandidateLocale } from "@/lib/apps";

interface WorkCardProps {
  item: WorkItem;
  locale: CandidateLocale;
}

export default function WorkCard({ item, locale }: WorkCardProps) {
  return (
    <article className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.period}</p>
        </div>
        <p className="text-primary font-medium mb-3">{item.role}</p>

        <p className="text-muted-foreground text-sm mb-4">{item.context}</p>

        {item.highlights.length > 0 && (
          <ul className="list-disc list-inside text-soft space-y-1.5 mb-4">
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        {item.appMentions && item.appMentions.length > 0 && (
          <ul className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label={item.title}>
            {item.appMentions.map((app) => (
              <li key={app.slug}>
                <MobileAppMention app={app} locale={locale} />
              </li>
            ))}
          </ul>
        )}

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
            {item.links.map((link) => {
              const isInternal = link.href.startsWith("/");
              const linkClassName = isInternal
                ? "mx-auto inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:mx-0"
                : "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80";
              const content = (
                <>
                  {link.label}
                  {isInternal
                    ? <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    : <ExternalLink aria-hidden="true" className="ml-1 h-3.5 w-3.5" />}
                </>
              );

              return isInternal ? (
                <Link key={link.href} href={link.href} className={linkClassName}>
                  {content}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  {content}
                </a>
              );
            })}
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-0 dark:opacity-20"></div>
    </article>
  );
}
