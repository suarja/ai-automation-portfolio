"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeatureRequest } from "@/contexts/feature-requests-context";
import { useRouter } from "next/navigation";
import { sendFeatureRequestV1 } from "@/lib/feature-request";
import { useFingerprint } from "@/hooks/use-fingerprint";

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
  const bgGradient = gradient || "from-elevated to-card";
  const { openFeatureRequestModal } = useFeatureRequest();
  const { hasConsent, visitorId } = useFingerprint();

  const router = useRouter();

  const handleFeatureRequest = () => {
    openFeatureRequestModal(title, description);
  };

  const handleClick = async () => {
    if (featureRequest) {
      handleFeatureRequest();
      return;
    }

    // Check if internal or external link
    const isExternal = buttonLink.startsWith('http://') || buttonLink.startsWith('https://');

    if (isExternal) {
      // External resource: Send tracking and open in new tab
      await sendFeatureRequestV1({
        title,
        description,
        hasConsent,
        fingerprint: visitorId,
      });
      window.open(buttonLink, '_blank');
    } else {
      // Internal resource: Navigate to detail page
      router.push(buttonLink);
    }
  };

  return (
    <div
      className={`card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br ${bgGradient}`}
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
              className="bg-secondary border border-border rounded-full text-xs px-3"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button
          onClick={handleClick}
          variant={featureRequest ? "outline" : "default"}
          className={featureRequest
            ? "rounded-full border-border bg-card hover:bg-secondary shadow-md"
            : "w-full rounded-full bg-secondary hover:bg-muted shadow-md"
          }
        >
          {buttonText}
        </Button>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-0 dark:opacity-20"></div>
    </div>
  );
}
