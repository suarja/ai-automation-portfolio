"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "fingerprint_consent";
const CONSENT_EXPIRY_KEY = "fingerprint_consent_expiry";
const CONSENT_DURATION_MS = 6 * 30 * 24 * 60 * 60 * 1000; // 6 mois

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si le consentement existe et n'est pas expiré
    const consent = localStorage.getItem(CONSENT_KEY);
    const expiryDate = localStorage.getItem(CONSENT_EXPIRY_KEY);

    const isExpired = expiryDate && new Date() > new Date(expiryDate);

    if (consent === null || isExpired) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    // Stocker le consentement
    localStorage.setItem(CONSENT_KEY, accepted ? "true" : "false");

    // Définir la date d'expiration (6 mois)
    const expiryDate = new Date(Date.now() + CONSENT_DURATION_MS);
    localStorage.setItem(CONSENT_EXPIRY_KEY, expiryDate.toISOString());

    // Masquer la bannière
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#111] border-t border-[#222] shadow-lg">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-300 text-sm">
            <p>
              Nous utilisons des technologies de suivi pour améliorer votre
              expérience. Acceptez-vous que nous collections votre empreinte
              numérique via FingerprintJS ?
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-[#333] hover:bg-[#222] text-gray-300"
              onClick={() => handleConsent(false)}
            >
              Refuser
            </Button>
            <Button
              size="sm"
              className="bg-[#333] hover:bg-[#444] text-white"
              onClick={() => handleConsent(true)}
            >
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
