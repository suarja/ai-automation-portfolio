"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFeatureRequest } from "@/contexts/feature-requests-context";
import { Button } from "./ui/button";

interface ProjectCardProps {
  title: string;
  result: string;
  tags: string[];
  image: string;
  link: string;
  featureRequest?: boolean;
}

export default function ProjectCard({
  title,
  result,
  tags,
  image,
  link,
  featureRequest,
}: ProjectCardProps) {
  const { openFeatureRequestModal } = useFeatureRequest();

  const handleFeatureRequest = () => {
    openFeatureRequestModal(title, result);
  };

  return (
    <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card">
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="col-span-2">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-3">{result}</p>
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
          {featureRequest ? (
            <Button
              onClick={handleFeatureRequest}
              className="inline-flex items-center hover:bg-transparent bg-transparent text-sm font-medium text-primary hover:text-primary/80 mt-2"
            >
              Lire le cas d'étude <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Link
              href={link}
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 mt-2"
            >
              Lire le cas d'étude <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 relative flex items-center justify-center">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={80}
              height={80}
              className="object-contain drop-shadow-[0_5px_10px_rgba(255,255,255,0.15)] rounded-3xl"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-0 dark:opacity-20"></div>
    </div>
  );
}
