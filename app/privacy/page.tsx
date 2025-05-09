"use client";

import { useState } from "react";
import { useFingerprint } from "@/hooks/use-fingerprint";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Shield,
  Check,
  X,
  Fingerprint,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";

export default function PrivacyPage() {
  const { resetConsent, hasConsent, visitorId } = useFingerprint();
  const [showVisitorId, setShowVisitorId] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);

  // Fonction pour gérer le reset avec animation
  const handleReset = () => {
    setResetAnimation(true);
    setTimeout(() => {
      resetConsent();
    }, 1000);
  };

  // Masquer une partie du visitorId pour la démo
  const maskedVisitorId = visitorId
    ? `${visitorId.substring(0, 8)}...${visitorId.substring(
        visitorId.length - 8
      )}`
    : "Non disponible";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* En-tête avec navigation */}
        <div className="mb-8 flex items-center">
          <Link
            href="/"
            className="mr-4 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2" size={24} />
            Confidentialité
          </h1>
        </div>

        {/* Carte de statut */}
        <div
          className={`mb-8 rounded-3xl border ${
            hasConsent
              ? "border-green-600 bg-green-900/10"
              : "border-red-600 bg-red-900/10"
          } p-6 transition-all duration-300 ${
            resetAnimation ? "animate-pulse" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Statut du tracking</h2>
            <div
              className={`w-4 h-4 rounded-full ${
                hasConsent ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>

          <div className="flex items-center mb-4">
            <div
              className={`w-10 h-10 rounded-full ${
                hasConsent ? "bg-green-900/30" : "bg-red-900/30"
              } flex items-center justify-center mr-3`}
            >
              {hasConsent ? (
                <Check size={20} className="text-green-400" />
              ) : (
                <X size={20} className="text-red-400" />
              )}
            </div>
            <div>
              <p
                className={`font-medium ${
                  hasConsent ? "text-green-400" : "text-red-400"
                }`}
              >
                {hasConsent ? "Tracking activé" : "Tracking désactivé"}
              </p>
              <p className="text-sm text-gray-400">
                {hasConsent
                  ? "Vous avez accepté le tracking anonyme"
                  : "Vous avez refusé le tracking anonyme"}
              </p>
            </div>
          </div>

          {hasConsent && (
            <div className="mt-4 p-3 bg-[#111] rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Fingerprint size={16} className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    Votre identifiant unique
                  </span>
                </div>
                <button
                  onClick={() => setShowVisitorId(!showVisitorId)}
                  className="text-gray-400 hover:text-white"
                >
                  {showVisitorId ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <code className="block w-full text-xs bg-[#0a0a0a] p-2 rounded border border-[#222] overflow-x-auto">
                {showVisitorId ? visitorId : maskedVisitorId}
              </code>
            </div>
          )}

          <Button
            onClick={handleReset}
            className={`w-full mt-4 flex items-center justify-center ${
              hasConsent
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <RefreshCw size={16} className="mr-2" />
            {hasConsent
              ? "Révoquer mon consentement"
              : "Réinitialiser mes préférences"}
          </Button>
        </div>

        {/* Explication du fonctionnement */}
        <div className="space-y-6 mb-8">
          <section className="bg-[#111] p-6 rounded-3xl border border-[#222]">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Fingerprint className="mr-2" size={20} />
              Comment ça fonctionne
            </h2>
            <p className="text-gray-300 mb-4">
              FingerprintJS crée un identifiant unique basé sur les
              caractéristiques de votre navigateur et appareil, sans collecter
              d'informations personnelles.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1a1a1a] p-3 rounded-xl">
                <h3 className="font-medium text-sm mb-2">Ce qu'on utilise</h3>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Configuration navigateur</li>
                  <li>• Caractéristiques appareil</li>
                  <li>• Paramètres graphiques</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-xl">
                <h3 className="font-medium text-sm mb-2">
                  Ce qu'on n'utilise pas
                </h3>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Nom ou email</li>
                  <li>• Adresse IP</li>
                  <li>• Données personnelles</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-[#111] p-6 rounded-3xl border border-[#222]">
            <h2 className="text-xl font-semibold mb-4">Pourquoi c'est utile</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <Check size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    Expérience personnalisée
                  </p>
                  <p className="text-sm text-gray-400">
                    Nous adaptons le contenu à vos préférences
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <Check size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Navigation fluide</p>
                  <p className="text-sm text-gray-400">
                    Pas besoin de vous identifier à chaque visite
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <Check size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Contenu pertinent</p>
                  <p className="text-sm text-gray-400">
                    Nous vous montrons ce qui vous intéresse
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Code d'implémentation */}
        <div className="mb-8 bg-[#111] p-6 rounded-3xl border border-[#222]">
          <h2 className="text-xl font-semibold mb-4">Implémentation simple</h2>
          <p className="text-gray-300 mb-4">
            Voici comment nous utilisons le hook dans notre code :
          </p>
          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#222] overflow-x-auto">
            <pre className="text-xs text-gray-300">
              <code>{`// Dans n'importe quel composant React
import { useFingerprint } from '@/hooks/use-fingerprint'

function MyComponent() {
  const { visitorId, hasConsent } = useFingerprint()
  
  if (hasConsent && visitorId) {
    // Utiliser l'ID pour personnaliser l'expérience
  }
  
  return (
    // Votre composant
  )
}`}</code>
            </pre>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-16 bg-[#111] p-6 rounded-3xl border border-[#222]">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-300">
            Pour toute question concernant notre politique de confidentialité,
            veuillez nous contacter à l'adresse suivante :
            <a
              href="mailto:jason.h.suarez@gmail.com"
              className="text-purple-400 ml-1 hover:underline"
            >
              jason.h.suarez@gmail.com
            </a>
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
