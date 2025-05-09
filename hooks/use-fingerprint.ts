"use client";

import { useState, useEffect } from "react";

// Définir les types pour FingerprintJS
type FingerprintResult = {
  visitorId: string;
};

type FingerprintAgent = {
  get: () => Promise<FingerprintResult>;
};

// Clés de stockage
const CONSENT_KEY = "fingerprint_consent";

export function useFingerprint() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeFingerprint = async () => {
      try {
        // Vérifier si l'utilisateur a donné son consentement
        const consent = localStorage.getItem(CONSENT_KEY);

        if (consent !== "true") {
          setLoading(false);
          return;
        }

        // Charger FingerprintJS uniquement si le consentement est donné
        const FingerprintJS = await import("@fingerprintjs/fingerprintjs");
        const fpPromise = FingerprintJS.load();

        // Obtenir l'agent et l'identifiant du visiteur
        const fp: FingerprintAgent = await fpPromise;
        const result = await fp.get();
        console.log(result);

        // Stocker l'identifiant du visiteur
        setVisitorId(result.visitorId);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to initialize fingerprint")
        );
        setLoading(false);
      }
    };

    initializeFingerprint();
  }, []);

  // Fonction pour réinitialiser le consentement
  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem("fingerprint_consent_expiry");
    setVisitorId(null);

    // Forcer le rechargement de la page pour afficher à nouveau la bannière
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return { visitorId, loading, error, resetConsent };
}
