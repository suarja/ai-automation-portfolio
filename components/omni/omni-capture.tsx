import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { OMNI_IMAGES } from "@/lib/omni";
import styles from "./omni.module.css";

export function OmniCapture({ image, children, priority = false }: {
  image: keyof typeof OMNI_IMAGES;
  children: ReactNode;
  priority?: boolean;
}) {
  const { src, alt } = OMNI_IMAGES[image];
  return (
    <figure className={styles.capture}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Agrandir la capture : ${alt}`}>
        <Image src={src} alt={alt} width={2880} height={1800} sizes="(max-width: 750px) calc(100vw - 40px), 1056px" priority={priority} />
      </a>
      <figcaption>
        {children}{" "}
        <a href={src} target="_blank" rel="noopener noreferrer" className={styles.enlarge}>
          Agrandir la capture <ArrowUpRight aria-hidden="true" size={14} />
        </a>
      </figcaption>
    </figure>
  );
}
