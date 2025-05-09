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
const CONSENT_EXPIRY_KEY = "fingerprint_consent_expiry";

export function useFingerprint() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur a donné son consentement
    const checkConsent = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      const expiryDate = localStorage.getItem(CONSENT_EXPIRY_KEY);

      // Vérifier si le consentement a expiré
      const isExpired = expiryDate && new Date() > new Date(expiryDate);

      if (consent === "true" && !isExpired) {
        setHasConsent(true);
        return true;
      } else if (consent === "false") {
        setHasConsent(false);
        return false;
      } else {
        setHasConsent(null);
        return false;
      }
    };

    const initializeFingerprint = async () => {
      try {
        // Vérifier le consentement
        const consentGiven = checkConsent();

        if (!consentGiven) {
          setLoading(false);
          return;
        }

        // Charger FingerprintJS uniquement si le consentement est donné
        const FingerprintJS = await import("@fingerprintjs/fingerprintjs");
        const fpPromise = FingerprintJS.load();

        // Obtenir l'agent et l'identifiant du visiteur
        const fp: FingerprintAgent = await fpPromise;
        const result = await fp.get();

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

    // Ajouter un écouteur d'événements pour détecter les changements de stockage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY || e.key === CONSENT_EXPIRY_KEY) {
        checkConsent();
        initializeFingerprint();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fonction pour réinitialiser le consentement
  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_EXPIRY_KEY);
    setVisitorId(null);
    setHasConsent(null);

    // Forcer le rechargement de la page pour afficher à nouveau la bannière
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return { visitorId, loading, error, hasConsent, resetConsent };
}
