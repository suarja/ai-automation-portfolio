"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { useFeatureRequest } from "@/contexts/feature-requests-context";

interface LinkCardProps {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  buttonLink: string;
  gradient?: string;
  featureRequest?: boolean;
}

export default function LinkCard({
  title,
  description,
  icon,
  buttonText,
  buttonLink,
  gradient,
  featureRequest,
}: LinkCardProps) {
  const bgGradient = gradient || "from-[#1a1a1a] to-[#1a1a1a]";
  const { openFeatureRequestModal } = useFeatureRequest();

  const handleFeatureRequest = useCallback(() => {
    openFeatureRequestModal(title, description);
  }, [openFeatureRequestModal, title, description]);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br ${bgGradient}`}
    >
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 mb-4 relative flex items-center justify-center">
            <Image
              src={icon || "/placeholder.svg"}
              alt={title}
              width={80}
              height={80}
              className="object-contain drop-shadow-[0_5px_10px_rgba(255,255,255,0.15)] rounded-3xl"
            />
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
              variant="outline"
              className="rounded-full border-[#333] bg-[#111] hover:bg-[#222] shadow-md"
            >
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          )}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
    </div>
  );
}
