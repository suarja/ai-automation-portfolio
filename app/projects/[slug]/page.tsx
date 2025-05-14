"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { useFeatureRequest } from "@/contexts/feature-requests-context";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    hostedVideo?: boolean;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projects = {
    "rdv-artisan": {
      title: "Système de prise de RDV pour artisan",
      result: "Gain de 5h/semaine sur la gestion des rendez-vous",
      tags: ["N8N", "Airtable", "Frontend"],
      image: "/images/icons/safebox.png",
      client: {
        type: "Artisan menuisier",
        size: "Indépendant, 2 employés",
        objective: "Réduire le temps passé à gérer les rendez-vous clients",
      },
      challenge:
        "Gestion manuelle des rendez-vous client qui prenait 5h par semaine, avec de nombreux oublis et annulations de dernière minute.",
      solution: {
        description:
          "Système automatisé de prise de rendez-vous avec synchronisation calendrier et notifications",
        tools: ["N8N", "Airtable", "React", "Twilio"],
        features: [
          "Formulaire de prise de RDV intégré au site web",
          "Synchronisation automatique avec Google Calendar",
          "SMS de confirmation et de rappel 24h avant le RDV",
          "Interface admin pour visualiser et gérer les RDV",
        ],
        videoUrl:
          "https://imagekit.io/player/embed/montresor/automation/carrestyle_form_yt_480.mov/ik-video.mp4?updatedAt=1747221487733&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fmontresor%2Fautomation%2Fcarrestyle_form_yt_480.mov%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1747221487733&updatedAt=1747221487733", // Remplacer par une vraie URL
        screenshots: [
          "https://ik.imagekit.io/montresor/automation/carrestyle_form.png?updatedAt=1747223019235",
          "https://ik.imagekit.io/montresor/automation/carrestyle_form_workflow.png?updatedAt=1747223019318",
        ],
        demoLink: "https://demo-rdv-artisan.vercel.app",
      },
      description:
        "Ce projet a permis à un artisan menuisier de libérer un temps précieux en automatisant complètement sa prise de rendez-vous. Le système synchronise automatiquement son calendrier, envoie des confirmations et rappels aux clients, et lui permet de visualiser sa semaine en un coup d'œil.",
      testimonial: {
        text: "Grâce à ce système, je peux me concentrer sur mon métier plutôt que sur l'administratif. Un vrai gain de temps et d'efficacité ! Les rappels automatiques ont réduit de 90% les rendez-vous manqués.",
        author: "Jean D., Menuisier",
        avatar: "/placeholder.svg?height=80&width=80",
      },
      results: [
        "Gain de 5h par semaine sur la gestion administrative",
        "Réduction de 90% des rendez-vous manqués",
        "Satisfaction client améliorée grâce aux rappels automatiques",
        "Meilleure organisation des journées de travail",
      ],
      insight: {
        title: "Ce que ce projet démontre",
        text: "Ce projet illustre comment l'automatisation peut transformer radicalement la gestion administrative d'un artisan. En combinant un formulaire simple avec des automatisations puissantes, nous avons pu créer un système qui fonctionne 24/7 sans intervention humaine.",
        resourceLink: {
          text: "Découvrir mon guide sur l'automatisation pour artisans",
          url: "/resources/guide-automatisation-artisans",
        },
      },
    },
    "leads-coach": {
      title: "Automatisation de leads pour coach",
      result: "Augmentation de 40% du taux de conversion",
      tags: ["IA", "N8N", "API"],
      image: "/images/icons/star-badge.png",
      client: {
        type: "Coach en développement personnel",
        size: "Entrepreneur solo",
        objective: "Améliorer la qualification et le suivi des prospects",
      },
      challenge:
        "Difficulté à suivre et qualifier les leads entrants via différents canaux (site web, réseaux sociaux, webinaires). Temps considérable passé à envoyer des emails manuellement.",
      solution: {
        description:
          "Système centralisé de capture et qualification de leads avec suivi automatisé",
        tools: ["N8N", "OpenAI", "Make.com", "Google Sheets"],
        features: [
          "Centralisation des leads de toutes sources dans une base unique",
          "Qualification automatique par IA selon critères prédéfinis",
          "Séquences d'emails personnalisés selon le profil",
          "Tableau de bord de suivi des conversions",
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Remplacer par une vraie URL
        screenshots: [
          "/placeholder.svg?height=300&width=600",
          "/placeholder.svg?height=300&width=600",
        ],
        demoLink: "https://demo-leads-coach.vercel.app",
      },
      description:
        "J'ai développé pour ce coach un système complet qui capture les leads depuis son site web, ses réseaux sociaux et ses webinaires. Le système utilise l'IA pour qualifier automatiquement les leads, envoyer des séquences d'emails personnalisées, et programmer des suivis au moment optimal.",
      testimonial: {
        text: "Mon taux de conversion a augmenté de 40% depuis que j'utilise ce système. Je peux me concentrer sur mes clients plutôt que sur la prospection. L'IA qualifie mes leads avec une précision impressionnante !",
        author: "Marie L., Coach",
        avatar: "/placeholder.svg?height=80&width=80",
      },
      results: [
        "Augmentation de 40% du taux de conversion",
        "Réduction de 70% du temps passé sur la gestion des leads",
        "Meilleure qualification des prospects",
        "Augmentation du chiffre d'affaires de 25%",
      ],
      insight: {
        title: "L'IA au service de la qualification de leads",
        text: "Ce projet démontre comment l'IA peut être utilisée pour qualifier automatiquement des leads et personnaliser le suivi. La combinaison de l'automatisation et de l'intelligence artificielle permet de créer des systèmes qui s'adaptent au comportement des utilisateurs.",
        resourceLink: {
          text: "Télécharger mon guide sur l'IA pour coaches",
          url: "/resources/guide-ia-coaches",
        },
      },
    },
    // Ajoutez d'autres projets ici
  };
  const { openFeatureRequestModal } = useFeatureRequest();
  const paramsSync = use(params);
  const project = projects[paramsSync.slug as keyof typeof projects];

  const handleFeatureRequest = (title: string, description: string) => {
    openFeatureRequestModal(title, description);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Projet non trouvé</h1>
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
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Présentation du projet</h2>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl mb-4 mx-auto">
            <iframe
              src="https://imagekit.io/player/embed/montresor/automation/carrestyle_form_yt_480.mov/ik-video.mp4?updatedAt=1747221487733&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fmontresor%2Fautomation%2Fcarrestyle_form_yt_480.mov%2Fik-video.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1747221487733&updatedAt=1747221487733"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Présentation du projet"
            ></iframe>
          </div>
          <div className="flex justify-end">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <Link
                href={project.solution.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <span>Voir la démo</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Client et Défi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
            <h2 className="text-xl font-bold mb-4">Le client</h2>
            <div className="space-y-2 mb-6">
              <p className="text-gray-300">
                <span className="text-gray-500">Type:</span>{" "}
                {project.client.type}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">Taille:</span>{" "}
                {project.client.size}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">Objectif:</span>{" "}
                {project.client.objective}
              </p>
            </div>

            <h2 className="text-xl font-bold mb-4">Le défi</h2>
            <p className="text-gray-300">{project.challenge}</p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
            <h2 className="text-xl font-bold mb-4">La solution</h2>
            <p className="text-gray-300 mb-4">{project.solution.description}</p>

            <h3 className="text-lg font-semibold mb-2">Fonctionnalités clés</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mb-6">
              {project.solution.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-2">
              Technologies utilisées
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.solution.tools.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-[#333] rounded-full"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Aperçu du projet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.solution.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative h-64 rounded-xl overflow-hidden border border-[#333]"
              >
                <Image
                  src={screenshot || "/placeholder.svg"}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Résultats */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Résultats obtenus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                {project.results.map((result, index) => (
                  <li key={index} className="text-lg">
                    {result}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-[#333] shadow-[0_5px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 relative flex-shrink-0 rounded-full overflow-hidden">
                    <Image
                      src={project.testimonial.avatar || "/placeholder.svg"}
                      alt={project.testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <blockquote className="text-gray-100 italic mb-4">
                      "{project.testimonial.text}"
                    </blockquote>
                    <p className="text-right text-gray-300 font-medium">
                      — {project.testimonial.author}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="relative overflow-hidden rounded-3xl border border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-purple-900 to-indigo-900 p-6 mb-12">
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-4">{project.insight.title}</h2>
            <p className="text-gray-100 mb-6">{project.insight.text}</p>
            <div className="flex justify-center">
              <Button
                // asChild
                onClick={() =>
                  handleFeatureRequest(
                    project.insight.resourceLink.text,
                    project.insight.text
                  )
                }
                variant="secondary"
                className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                {/* <Link href={project.insight.resourceLink.url}> */}
                {project.insight.resourceLink.text}
                {/* </Link> */}
              </Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Vous avez un projet similaire ?
          </h2>
          <Link
            href="https://cal.com/jasonsuarez/booking"
            className="inline-flex h-12 items-center justify-center rounded-full bg-purple-700 px-8 text-lg font-medium text-white shadow-[0_5px_20px_rgba(138,43,226,0.3)] hover:bg-purple-600 transition-colors"
          >
            Réserver un appel découverte
          </Link>
        </div>
      </div>
    </main>
  );
}
