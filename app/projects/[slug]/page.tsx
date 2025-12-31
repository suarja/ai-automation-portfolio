"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { useFeatureRequest } from "@/contexts/feature-requests-context";
import { useProject } from "@/hooks/use-project";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    hostedVideo?: boolean;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { openFeatureRequestModal } = useFeatureRequest();
  const paramsSync = use(params);
  const { project, loading, error } = useProject(paramsSync.slug);

  const handleFeatureRequest = (title: string, description: string) => {
    openFeatureRequestModal(title, description);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-gray-400">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  // Error state or project not found
  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Projet non trouvé</h1>
          <p className="text-gray-400 mb-4">
            {error || "Ce projet n'existe pas ou n'est plus disponible."}
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

        {/* En-tête du projet */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] mb-8">
          <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 relative flex-shrink-0">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={96}
                height={96}
                className="object-contain drop-shadow-[0_5px_10px_rgba(255,255,255,0.15)] rounded-3xl"
              />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-[#222] border border-[#333] rounded-full text-xs px-3"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {project.title}
              </h1>
              <p className="text-xl text-green-400 font-medium">
                {project.result}
              </p>
            </div>
          </div>
        </div>

        {/* Vidéo de présentation */}
        {project.solution.videoUrl && (
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Présentation du projet</h2>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl mb-4 mx-auto">
              <iframe
                src={project.solution.videoUrl}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Présentation du projet"
              />
            </div>
            {project.solution.demoLink && (
              <div className="flex justify-center">
                <Button asChild variant="outline" className="rounded-full">
                  <Link
                    href={project.solution.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir la démo live
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description du projet */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h2 className="text-2xl font-bold mb-4">Description du projet</h2>
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Le défi */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h2 className="text-2xl font-bold mb-4">Le défi</h2>
              <p className="text-gray-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* La solution */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h2 className="text-2xl font-bold mb-4">La solution</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.solution.description}
              </p>

              <h3 className="text-lg font-semibold mb-3">
                Fonctionnalités clés :
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                {project.solution.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Outils utilisés :</h3>
              <div className="flex flex-wrap gap-2">
                {project.solution.tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="outline"
                    className="border-[#333] rounded-full"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Résultats */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h2 className="text-2xl font-bold mb-4">Résultats obtenus</h2>
              <ul className="space-y-3">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span className="text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insight */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h2 className="text-2xl font-bold mb-4">
                {project.insight.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {project.insight.text}
              </p>
              {project.insight.resourceLink && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    if (project.featureRequest) {
                      handleFeatureRequest(
                        project.insight.resourceLink!.text,
                        "Accès à la ressource complémentaire"
                      );
                    }
                  }}
                >
                  {project.featureRequest ? (
                    <span className="cursor-pointer">
                      {project.insight.resourceLink.text}
                    </span>
                  ) : (
                    <Link href={project.insight.resourceLink.url}>
                      {project.insight.resourceLink.text}
                    </Link>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Client info */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h3 className="text-xl font-bold mb-4">Informations client</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">
                    Type de client :
                  </span>
                  <p className="text-white">{project.client.type}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Taille :</span>
                  <p className="text-white">{project.client.size}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Objectif :</span>
                  <p className="text-white">{project.client.objective}</p>
                </div>
              </div>
            </div>

            {/* Screenshots */}
            {project.solution.screenshots &&
              project.solution.screenshots.length > 0 && (
                <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
                  <h3 className="text-xl font-bold mb-4">Aperçus</h3>
                  <div className="space-y-4">
                    {project.solution.screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="relative h-48 rounded-xl overflow-hidden border border-[#333]"
                      >
                        <Image
                          src={screenshot || "/placeholder.svg"}
                          alt={`Aperçu ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Témoignage */}
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
              <h3 className="text-xl font-bold mb-4">Témoignage client</h3>
              <blockquote className="text-gray-300 italic mb-4">
                "{project.testimonial.text}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center mr-3">
                  <Image
                    src={project.testimonial.avatar || "/placeholder.svg"}
                    alt={project.testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {project.testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Vous avez un projet similaire ?
          </h2>
          <p className="text-gray-400 mb-6">
            Discutons de votre projet et voyons comment je peux vous aider à
            l'automatiser.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="https://cal.com/jasonsuarez/booking" target="_blank" rel="noopener noreferrer">
              Réserver un appel découverte
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
