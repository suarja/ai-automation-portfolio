import type React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Zap,
  Users,
  Sparkles,
  Shield,
  Calendar,
  Layers,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SiteFooter from "@/components/site-footer";
import TestimonialCard from "@/components/testimonial-card";
import WebsiteFaqAccordion from "@/components/website-faq-accordion";
import WebsiteProcessSteps from "@/components/website-process-steps";
import WebsiteShowcase from "@/components/website-showcase";
import { CONSTANTS } from "@/lib/constants/constants";

export default function SitesWebIAPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] mb-12">
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-8 md:mb-0 md:pr-8">
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1 border-purple-500/50 bg-purple-500/10 text-purple-300 rounded-full"
              >
                Formation + Accompagnement
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Crée ton site web{" "}
                <span className="text-gradient bg-gradient-to-r from-purple-400 to-indigo-400">
                  professionnel
                </span>{" "}
                avec l'IA — sans coder
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                De l'idée au site en ligne en 14 jours, avec un accompagnement
                personnalisé et des outils d'IA qui font le travail pour toi.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-[0_5px_20px_rgba(138,43,226,0.3)] text-lg px-8"
              >
                <Link
                  href="https://cal.com/jasonsuarez/session-decouverte-site-ia"
                  className="flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Réserve ta session découverte
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <div className="relative rounded-2xl overflow-hidden border border-[#333] shadow-xl">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Présentation de la formation sites web IA"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase de sites */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Des sites qui impressionnent
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Voici le type de sites que tu pourras créer avec notre
              accompagnement — professionnels, rapides et optimisés
            </p>
          </div>

          <WebsiteShowcase />
        </section>

        {/* Comment ça marche */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça fonctionne</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Un processus en 4 étapes pour passer de l'idée à un site web
              professionnel, même sans compétences techniques
            </p>
          </div>

          <WebsiteProcessSteps />
        </section>

        {/* Pourquoi choisir notre approche */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <h2 className="text-3xl font-bold mb-8 text-center">
              Pourquoi notre approche est différente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                    <Zap className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      L'IA fait le travail
                    </h3>
                    <p className="text-gray-300">
                      Génération de code, design, textes et images — l'IA
                      s'occupe des aspects techniques pendant que tu te
                      concentres sur ta vision.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                    <Users className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Accompagnement 1:1
                    </h3>
                    <p className="text-gray-300">
                      Tu n'es jamais seul. Coaching personnalisé, sessions de
                      travail en direct et feedback continu tout au long du
                      processus.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mb-4">
                    <Sparkles className="text-green-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Résultats garantis
                    </h3>
                    <p className="text-gray-300">
                      Un site professionnel en 14 jours ou moins, avec un design
                      sur-mesure qui correspond exactement à tes besoins.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-amber-900/30 flex items-center justify-center mb-4">
                    <Shield className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Autonomie totale</h3>
                    <p className="text-gray-300">
                      Tu apprends à gérer ton site toi-même. Fini la dépendance
                      aux développeurs pour chaque modification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-pink-900/30 flex items-center justify-center mb-4">
                    <Layers className="text-pink-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Technologies modernes
                    </h3>
                    <p className="text-gray-300">
                      Sites rapides, SEO-friendly et responsive avec les
                      dernières technologies (Next.js, Tailwind, Vercel).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-indigo-900/30 flex items-center justify-center mb-4">
                    <Palette className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Design sur-mesure
                    </h3>
                    <p className="text-gray-300">
                      Pas de templates génériques. Chaque site est unique et
                      reflète parfaitement ton identité et tes objectifs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ce que tu vas apprendre */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Ce que tu vas apprendre
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 text-purple-400">
                    1
                  </span>
                  Maîtriser les prompts IA pour le design
                </h3>
                <p className="text-gray-300">
                  Apprends à formuler des instructions précises pour que l'IA
                  génère exactement le design que tu imagines, sans passer par
                  Photoshop ou Figma.
                </p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 text-purple-400">
                    2
                  </span>
                  Structurer un site web professionnel
                </h3>
                <p className="text-gray-300">
                  Découvre les principes d'architecture d'un site qui convertit,
                  avec les bonnes sections au bon endroit pour maximiser
                  l'impact.
                </p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 text-purple-400">
                    3
                  </span>
                  Générer du code avec l'IA
                </h3>
                <p className="text-gray-300">
                  Utilise l'IA pour créer des composants, des pages entières et
                  même des fonctionnalités complexes sans écrire une seule ligne
                  de code.
                </p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 text-purple-400">
                    4
                  </span>
                  Optimiser pour le SEO et la performance
                </h3>
                <p className="text-gray-300">
                  Maîtrise les techniques pour que ton site soit rapide, bien
                  référencé et offre une expérience utilisateur optimale sur
                  tous les appareils.
                </p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 text-purple-400">
                    5
                  </span>
                  Créer du contenu qui convertit
                </h3>
                <p className="text-gray-300">
                  Utilise l'IA pour générer des textes persuasifs, des images
                  sur-mesure et des appels à l'action qui transforment les
                  visiteurs en clients.
                </p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 text-purple-400">
                    6
                  </span>
                  Gérer et faire évoluer ton site
                </h3>
                <p className="text-gray-300">
                  Deviens autonome pour mettre à jour ton site, ajouter de
                  nouvelles fonctionnalités et l'adapter à l'évolution de ton
                  activité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Ils ont créé leur site avec notre méthode
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="J'avais reçu des devis à 5000€ pour mon site. Avec cette formation, j'ai créé un site encore plus beau pour une fraction du prix, et je peux le modifier moi-même !"
              author="Sophie M."
              role="Coach en développement personnel"
              avatar="/placeholder.svg?height=80&width=80"
            />

            <TestimonialCard
              quote="Même sans connaissances techniques, j'ai réussi à créer un site e-commerce complet en 10 jours. L'accompagnement personnalisé a fait toute la différence."
              author="Thomas L."
              role="Artisan créateur"
              avatar="/placeholder.svg?height=80&width=80"
            />

            <TestimonialCard
              quote="L'utilisation de l'IA pour générer le design et le code a été une révélation. J'ai économisé des centaines d'heures et obtenu un résultat professionnel."
              author="Julie D."
              role="Consultante indépendante"
              avatar="/placeholder.svg?height=80&width=80"
            />

            <TestimonialCard
              quote="Le suivi personnalisé m'a permis d'avancer sereinement. Chaque fois que j'étais bloqué, j'avais une réponse claire et efficace dans l'heure."
              author="Marc B."
              role="Photographe"
              avatar="/placeholder.svg?height=80&width=80"
            />
          </div>
        </section>

        {/* Formules et prix */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Choisis la formule qui te convient
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative pt-8 overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8">
              <div className="absolute md:top-20 top-6 right-6">
                <Badge className="bg-purple-600  text-white px-3 py-1 rounded-full">
                  Populaire
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Formation + Accompagnement
              </h3>
              <p className="text-gray-400 mb-6">
                Crée ton site avec notre aide pas à pas
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">997€</span>
                <span className="text-gray-400 ml-2">paiement unique</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Formation complète en vidéo (accès à vie)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>4 sessions de coaching personnalisé (2h)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Accès au groupe privé de support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Templates et prompts IA exclusifs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Hébergement offert pour 1 an</span>
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                <a
                  href={CONSTANTS.STRIPE_WEBSITE_FORMATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Réserver ma place
                </a>
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8">
              <h3 className="text-2xl font-bold mb-2">Site clé en main</h3>
              <p className="text-gray-400 mb-6">On s'occupe de tout pour toi</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">1997€</span>
                <span className="text-gray-400 ml-2">prix de base</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Création complète de ton site sur mesure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Design unique adapté à ton identité</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Intégration de toutes les fonctionnalités</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Optimisation SEO complète</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Formation à la gestion du site (2h)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                  <span>Hébergement et maintenance 1 an inclus</span>
                </li>
                <li className="flex items-start text-sm text-gray-400 mt-2">
                  <span>
                    * Des suppléments peuvent s'appliquer selon la complexité du
                    projet
                  </span>
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-[#222] hover:bg-[#333] text-white"
              >
                <a
                  href={CONSTANTS.STRIPE_WEBSITE_CLE_MAIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Commander mon site
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Questions fréquentes
          </h2>
          <WebsiteFaqAccordion />
        </section>

        {/* CTA Final */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-purple-900 to-indigo-900 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à créer ton site web professionnel ?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Rejoins les entrepreneurs qui ont transformé leur présence en
              ligne grâce à notre méthode unique.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-purple-900 hover:bg-gray-200 shadow-[0_5px_20px_rgba(255,255,255,0.3)] text-lg px-8"
            >
              <Link
                href="https://cal.com/jasonsuarez/session-decouverte-site-ia"
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Réserve ta session découverte
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-gray-300 mt-4 text-sm">
              Places limitées - Satisfaction garantie ou remboursé
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}

// Composant d'icône de vérification
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
