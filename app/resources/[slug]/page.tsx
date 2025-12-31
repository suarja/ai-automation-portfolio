"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { useFeatureRequest } from "@/contexts/feature-requests-context";
import { useResource } from "@/hooks/use-resource";

interface ResourcePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const { openFeatureRequestModal } = useFeatureRequest();
  const paramsSync = use(params);
  const { resource, loading, error } = useResource(paramsSync.slug);

  const handleFeatureRequest = (title: string, description: string) => {
    openFeatureRequestModal(title, description);
  };

  const handleDownload = () => {
    if (resource?.featureRequest) {
      handleFeatureRequest(resource.title, resource.description);
    } else if (resource?.downloadLink) {
      window.open(resource.downloadLink, "_blank");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-gray-400">Chargement de la ressource...</p>
        </div>
      </div>
    );
  }

  // Error state or resource not found
  if (error || !resource) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Ressource non trouvée</h1>
          <p className="text-gray-400 mb-4">
            {error || "Cette ressource n'existe pas ou n'est plus disponible."}
          </p>
          <Link href="/" className="text-primary hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* En-tête de la ressource */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    width={96}
                    height={96}
                    className="object-contain drop-shadow-[0_5px_10px_rgba(255,255,255,0.15)] rounded-2xl"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#222] border border-[#333] rounded-full text-xs px-3"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {resource.title}
                  </h1>
                  <p className="text-xl text-gray-300 mb-6">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-green-400">
                      {resource.price}
                    </span>
                    <Button
                      onClick={handleDownload}
                      size="lg"
                      className="rounded-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {resource.featureRequest ? "Découvrir" : "Télécharger"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description détaillée */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h2 className="text-2xl font-bold mb-4">Description détaillée</h2>
              <p className="text-gray-300 leading-relaxed">
                {resource.longDescription || resource.description}
              </p>
            </div>

            {/* Galerie */}
            {resource.gallery && resource.gallery.length > 0 && (
              <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
                <h2 className="text-2xl font-bold mb-4">Aperçus</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resource.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-48 rounded-xl overflow-hidden border border-[#333]"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Aperçu ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Informations */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h3 className="text-xl font-bold mb-4">Informations</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Prix :</span>
                  <p className="text-white text-lg font-semibold">
                    {resource.price}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Catégories :</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {resource.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-[#333]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {!resource.featureRequest && (
                  <div>
                    <span className="text-gray-400 text-sm">
                      Téléchargements :
                    </span>
                    <p className="text-white">
                      {resource.metadata.downloadCount || 0}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action principale */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6">
              <h3 className="text-xl font-bold mb-4">
                {resource.featureRequest
                  ? "Bientôt disponible"
                  : "Téléchargement"}
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                {resource.featureRequest
                  ? "Cette ressource est en cours de développement. Soyez notifié dès sa sortie !"
                  : "Accédez immédiatement à cette ressource après téléchargement."}
              </p>
              <Button
                onClick={handleDownload}
                className="w-full rounded-full"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                {resource.featureRequest
                  ? "Me tenir informé"
                  : "Télécharger maintenant"}
              </Button>
            </div>

            {/* Support */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h3 className="text-xl font-bold mb-4">Besoin d'aide ?</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Une question sur cette ressource ? Je suis là pour vous aider !
              </p>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link href="https://cal.com/jasonsuarez/booking" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Prendre RDV
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Ressources similaires */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Découvrir d'autres ressources
          </h2>
          <p className="text-gray-400 mb-6">
            Explorez ma collection complète d'outils et de templates pour
            automatiser votre business.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">Voir toutes les ressources</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
