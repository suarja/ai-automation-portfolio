"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeatureRequest } from "@/contexts/feature-requests-context";

interface ResourceCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  buttonText: string;
  buttonLink: string;
  gradient?: string;
  featureRequest?: boolean;
}

export default function ResourceCard({
  title,
  description,
  image,
  tags,
  buttonText,
  buttonLink,
  gradient,
  featureRequest,
}: ResourceCardProps) {
  const bgGradient = gradient || "from-[#151515] to-[#111]";
  const { openFeatureRequestModal } = useFeatureRequest();

  const handleFeatureRequest = () => {
    openFeatureRequestModal(title, description);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br ${bgGradient}`}
    >
      <div className="p-6 pb-4">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 relative flex items-center justify-center">
            <Image
              src={image || "/placeholder.svg"}
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
        {featureRequest ? (
          <Button
            onClick={handleFeatureRequest}
            variant="outline"
            className="rounded-full border-[#333] bg-[#111] hover:bg-[#222] shadow-md"
          >
            {buttonText}
          </Button>
        ) : (
          <Button
            asChild
            className="w-full rounded-full bg-[#222] hover:bg-[#333] shadow-md"
          >
            <Link target="_blank" href={buttonLink}>
              {buttonText}
            </Link>
          </Button>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
    </div>
  );
}
