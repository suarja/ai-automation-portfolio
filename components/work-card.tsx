import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { WorkItem } from "@/lib/data/work";

interface WorkCardProps {
  item: WorkItem;
}

export default function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111]">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.period}</p>
        </div>
        <p className="text-purple-300 font-medium mb-3">{item.role}</p>

        <p className="text-gray-400 text-sm mb-4">{item.context}</p>

        <ul className="list-disc list-inside text-gray-300 space-y-1.5 mb-4">
          {item.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-1">
          {item.stack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-[#222] border border-[#333] rounded-full text-xs px-3"
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
                className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300"
              >
                {link.label} <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
    </article>
  );
}
