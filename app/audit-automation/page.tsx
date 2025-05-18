import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle,
  Clock,
  Zap,
  Award,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SiteFooter from "@/components/site-footer";
import AuditSteps from "@/components/audit-steps";
import FaqAccordion from "@/components/faq-accordion";
import TestimonialCard from "@/components/testimonial-card";

export default function AuditAutomationPage() {
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
                Offre limitée
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Automatise ta première tâche freelance en 7 jours —{" "}
                <span className="text-green-400">Gratuitement</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Réserve ton audit de 30 min, et repars directement avec ton
                workflow IA prêt à l'emploi.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-[0_5px_20px_rgba(138,43,226,0.3)] text-lg px-8"
              >
                <Link
                  href="https://calendly.com/username/audit-automation"
                  className="flex items-center"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Réserve ton audit gratuit
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
                    title="Présentation de l'audit d'automatisation"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Un processus simple en 3 étapes pour automatiser ta première tâche
              et gagner du temps immédiatement
            </p>
          </div>

          <AuditSteps />
        </section>

        {/* Pourquoi ça marche */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <h2 className="text-3xl font-bold mb-8 text-center">
              Pourquoi ça marche
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Zéro bla-bla</h3>
                    <p className="text-gray-300">
                      Du concret, rien que du concret. Pas de théorie
                      interminable, mais des solutions pratiques et immédiates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="text-green-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Gain de temps</h3>
                    <p className="text-gray-300">
                      3h à 10h gagnées dès la première semaine. Des résultats
                      mesurables et immédiats.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Simplicité</h3>
                    <p className="text-gray-300">
                      Pas de prérequis technique, accompagnement pas à pas.
                      Accessible à tous les freelances.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333]">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-amber-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                    <Award className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Expérience terrain
                    </h3>
                    <p className="text-gray-300">
                      J'ai automatisé ma vie freelance, je connais tes défis et
                      les solutions qui fonctionnent vraiment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Ce qu'en disent les freelances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="J'ai gagné 5h par semaine sur la gestion de mes factures. L'audit a identifié exactement ce dont j'avais besoin."
              author="Marie L."
              role="Designer freelance"
              avatar="/placeholder.svg?height=80&width=80"
            />

            <TestimonialCard
              quote="En 30 minutes d'audit, Jason a trouvé comment automatiser mon processus d'onboarding client. Impressionnant !"
              author="Thomas D."
              role="Développeur web"
              avatar="/placeholder.svg?height=80&width=80"
            />

            <TestimonialCard
              quote="Le workflow qu'il m'a créé pour gérer mes leads fonctionne parfaitement depuis 3 mois. Un vrai gain de temps."
              author="Sophie M."
              role="Coach business"
              avatar="/placeholder.svg?height=80&width=80"
            />

            <TestimonialCard
              quote="Je n'y connaissais rien en automatisation, mais l'accompagnement était si clair que j'ai pu tout gérer seul après."
              author="Paul R."
              role="Rédacteur web"
              avatar="/placeholder.svg?height=80&width=80"
            />
          </div>
        </section>

        {/* À propos */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48 overflow-hidden rounded-full border-2 border-purple-500/30 shadow-[0_0_30px_rgba(138,43,226,0.2)]">
                  <Image
                    src="/images/profile.png"
                    alt="Jason"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-4">À propos de Jason</h2>
                <p className="text-gray-300 mb-4">
                  Je suis Jason, développeur freelance et passionné
                  d'automatisation IA. J'ai testé chaque workflow sur moi-même,
                  documenté mes résultats (3h gagnées/semaine) et aidé d'autres
                  indépendants à démarrer.
                </p>
                <p className="text-gray-300 mb-4">
                  Mon approche est simple : identifier rapidement les tâches
                  chronophages et les automatiser avec les bons outils. Pas de
                  solutions complexes, juste des résultats concrets.
                </p>
                <p className="text-gray-300">
                  Après avoir accompagné plus de 50 freelances dans leur
                  parcours d'automatisation, j'ai développé une méthode qui
                  fonctionne, même pour les moins technophiles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Questions fréquentes
          </h2>
          <FaqAccordion />
        </section>

        {/* CTA Final */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-purple-900 to-indigo-900 p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10"></div>
            <h2 className="text-3xl font-bold mb-4">
              Prêt à libérer 3h+ par semaine dès maintenant ?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Rejoins les freelances qui ont transformé leur quotidien grâce à
              l'automatisation sur mesure.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-purple-900 hover:bg-gray-200 shadow-[0_5px_20px_rgba(255,255,255,0.3)] text-lg px-8"
            >
              <Link
                href="https://calendly.com/username/audit-automation"
                className="flex items-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Réserve ton audit gratuit
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-gray-300 mt-4 text-sm">
              Places limitées - Aucun engagement
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
