"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ConsentModalProps {
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function ConsentModal({
  onAccept,
  onDecline,
  onClose,
  isOpen,
}: ConsentModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Bloquer le scroll du body quand la modal est ouverte
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md p-6 mx-4 bg-[#111] border border-[#222] rounded-xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">
          Pourquoi nous utilisons FingerprintJS
        </h2>

        <div className="space-y-4 text-gray-300 text-sm">
          <p>
            <strong className="text-white">
              Nous respectons votre vie privée.
            </strong>{" "}
            FingerprintJS nous permet de vous offrir une expérience
            personnalisée tout en préservant votre anonymat.
          </p>

          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">
              Ce que vous y gagnez :
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Une expérience adaptée à vos préférences</li>
              <li>Pas de formulaires répétitifs à remplir</li>
              <li>Navigation plus fluide entre les visites</li>
              <li>Contenu plus pertinent selon vos intérêts</li>
            </ul>
          </div>

          <p>
            <strong className="text-white">Comment ça fonctionne :</strong>{" "}
            FingerprintJS crée un identifiant unique basé sur les
            caractéristiques de votre navigateur. Nous n'enregistrons aucune
            donnée personnelle identifiable.
          </p>

          <p>
            Vous pouvez en apprendre davantage sur notre utilisation de
            FingerprintJS et notre politique de confidentialité sur notre{" "}
            <Link href="/privacy" className="text-purple-400 hover:underline">
              page de confidentialité
            </Link>
            .
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1 bg-transparent border-[#333] hover:bg-[#222] text-gray-300"
            onClick={onDecline}
          >
            Refuser quand même
          </Button>
          <Button
            className="flex-1 bg-purple-700 hover:bg-purple-600 text-white"
            onClick={onAccept}
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
