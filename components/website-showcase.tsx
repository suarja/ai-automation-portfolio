"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WebsiteExample {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export default function WebsiteShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const websites: WebsiteExample[] = [
    {
      title: "Carré Style",
      description:
        "Site vitrine pour un artisan spécialisé en carrelage et béton imprimé.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99e%CC%81cran%202025-05-20%20a%CC%80%2007.29.34-s3qpDidIcsFSouHmoMdnXENXCaecvS.png",
      link: "https://www.carrestyle.fr/",
      tags: ["Artisan", "Site Vitrine", "Devis en ligne"],
    },
    {
      title: "Institut Chloé",
      description:
        "Site pour un institut de beauté avec présentation des services et réservation.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99e%CC%81cran%202025-05-20%20a%CC%80%2007.29.38-ctnygZsjUKyRafFHttO1pt3zyb35yD.png",
      link: "https://lemondedechloe.vercel.app/",
      tags: ["Beauté", "Réservation", "Services"],
    },
    {
      title: "Black Magic",
      description:
        "Site pour un salon de coiffure avec design élégant et système de rendez-vous.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99e%CC%81cran%202025-05-20%20a%CC%80%2007.29.47-5MTZbrJU9cHxBmv87rvlmCZb55syrC.png",
      link: "https://blackmagic-two.vercel.app/",
      tags: ["Coiffure", "Rendez-vous", "Portfolio"],
    },
    {
      title: "Portfolio Créatif",
      description:
        "Site portfolio pour artiste ou créatif avec galerie de projets et contact.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
      tags: ["Portfolio", "Créatif", "Galerie"],
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === websites.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? websites.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 relative">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#333] shadow-lg">
            <Image
              src={websites[activeIndex].image || "/placeholder.svg"}
              alt={websites[activeIndex].title}
              fill
              className="object-cover"
              unoptimized={websites[activeIndex].image.startsWith(
                "https://blob.v0.dev"
              )}
            />
          </div>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {websites.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  activeIndex === index ? "bg-white" : "bg-white/30"
                } transition-colors`}
                aria-label={`Aller au site ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-2">
            {websites[activeIndex].title}
          </h3>
          <p className="text-gray-300 mb-4">
            {websites[activeIndex].description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {websites[activeIndex].tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#222] border border-[#333] rounded-full text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-400 mb-6">
            Ce type de site peut être créé en moins de 14 jours avec notre
            méthode, même sans compétences techniques préalables.
          </p>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-[#333] bg-[#111] hover:bg-[#222]"
          >
            <a
              href={websites[activeIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Voir le site exemple
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
