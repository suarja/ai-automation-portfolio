"use client";

import { useFingerprint } from "@/hooks/use-fingerprint";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  const { resetConsent } = useFingerprint();

  return (
    <main className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Collecte de données</h2>
        <p className="mb-4">
          Nous utilisons FingerprintJS pour identifier de manière unique les
          visiteurs de notre site web. Cette technologie nous permet d'améliorer
          votre expérience et de fournir des fonctionnalités personnalisées.
        </p>
        <p className="mb-4">
          FingerprintJS crée une empreinte numérique unique basée sur les
          caractéristiques de votre navigateur et de votre appareil. Cette
          empreinte ne contient pas d'informations personnelles identifiables,
          mais nous permet de reconnaître votre appareil lors de visites
          ultérieures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Vos choix</h2>
        <p className="mb-4">
          Vous avez accepté ou refusé la collecte de votre empreinte numérique
          lors de votre première visite sur notre site. Vous pouvez modifier
          votre choix à tout moment en utilisant le bouton ci-dessous.
        </p>

        <div className="mt-6">
          <Button
            onClick={resetConsent}
            className="bg-[#333] hover:bg-[#444] text-white"
          >
            Réinitialiser mes préférences de confidentialité
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p>
          Pour toute question concernant notre politique de confidentialité,
          veuillez nous contacter à l'adresse suivante : privacy@example.com
        </p>
      </section>
    </main>
  );
}
