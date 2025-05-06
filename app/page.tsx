import ProfileHeader from "@/components/profile-header"
import LinkCard from "@/components/link-card"
import ResourceCard from "@/components/resource-card"
import ProjectCard from "@/components/project-card"
import CallToAction from "@/components/call-to-action"
import SectionHeader from "@/components/section-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header Section */}
        <ProfileHeader />

        {/* Mes Liens Section */}
        <section className="mt-12">
          <SectionHeader title="Mes Liens" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LinkCard
              title="Appel Découverte"
              description="Découvre comment on peut travailler ensemble"
              icon="/images/icons/safebox.png"
              buttonText="Appel 1-1"
              buttonLink="https://cal.com/jasonsuarez/booking"
            />

            <LinkCard
              title="Ma Communauté"
              description="Rejoins ma commu sur l'automatisation & l'IA"
              icon="/images/icons/star-badge.png"
              buttonText="Rejoindre"
              buttonLink="#"
              gradient="from-purple-900 to-indigo-800"
            />

            <LinkCard
              title="Ma chaîne YouTube"
              description="Toutes mes vidéos pour apprendre l'automatisation"
              icon="/images/icons/flash-sale.png"
              buttonText="Regarder"
              buttonLink="https://youtube.com/@swarecito"
            />
          </div>
        </section>

        {/* Templates & Ressources Section */}
        <section className="mt-16">
          <SectionHeader title="Mes Ressources" />

          <Tabs defaultValue="tous" className="mb-6">
            <TabsList className="bg-[#151515] rounded-full p-1 border border-[#222] w-auto inline-flex">
              <TabsTrigger
                value="tous"
                className="rounded-full px-4 py-1.5 text-sm"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger
                value="ia"
                className="rounded-full px-4 py-1.5 text-sm"
              >
                IA
              </TabsTrigger>
              <TabsTrigger
                value="n8n"
                className="rounded-full px-4 py-1.5 text-sm"
              >
                N8N
              </TabsTrigger>
              <TabsTrigger
                value="freelance"
                className="rounded-full px-4 py-1.5 text-sm"
              >
                Freelance
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard
              title="Mes Templates"
              description="Récupère toutes mes templates et ressources pour automatiser ton business"
              image="/images/icons/folder.png"
              tags={["N8N", "Airtable", "Notion"]}
              buttonText="Je les veux !"
              buttonLink="/resources/templates"
            />

            <ResourceCard
              title="TON GHOST WRITER LINKEDIN"
              description="Automatise la rédaction de tes posts LinkedIn"
              image="/images/icons/card.png"
              tags={["IA", "LinkedIn"]}
              buttonText="Télécharger"
              buttonLink="/resources/ghost-writer"
              gradient="from-purple-900 to-indigo-800"
            />

            <ResourceCard
              title="Ton Assistant Personnel IA"
              description="Ton assistant IA pour tes tâches de liste"
              image="/images/icons/cloud-download.png"
              tags={["IA", "Productivité"]}
              buttonText="Télécharger"
              buttonLink="/resources/assistant-ia"
              gradient="from-purple-900 to-indigo-800"
            />

            <ResourceCard
              title="Workflow Automatisé Client"
              description="Automatise l'onboarding de tes clients"
              image="/images/icons/grow-coin.png"
              tags={["N8N", "Freelance"]}
              buttonText="Voir la fiche"
              buttonLink="/resources/workflow-client"
            />

            <ResourceCard
              title="Dashboard Freelance"
              description="Template de dashboard pour suivre ton activité"
              image="/images/icons/folder.png"
              tags={["Notion", "Freelance"]}
              buttonText="Télécharger"
              buttonLink="/resources/dashboard"
            />

            <ResourceCard
              title="Connecteur API Universel"
              description="Connecte n'importe quelle API à tes outils"
              image="/images/icons/card.png"
              tags={["N8N", "API"]}
              buttonText="Voir la fiche"
              buttonLink="/resources/api-connector"
            />
          </div>
        </section>

        {/* Call To Action */}
        <CallToAction />

        {/* Projets / Use Cases Section */}
        <section className="mt-16">
          <SectionHeader title="Projets / Use Cases" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Système de prise de RDV pour artisan"
              result="Gain de 5h/semaine sur la gestion des rendez-vous"
              tags={["N8N", "Airtable", "Frontend"]}
              image="/images/icons/safebox.png"
              link="/projects/rdv-artisan"
            />

            <ProjectCard
              title="Automatisation de leads pour coach"
              result="Augmentation de 40% du taux de conversion"
              tags={["IA", "N8N", "API"]}
              image="/images/icons/star-badge.png"
              link="/projects/leads-coach"
            />

            <ProjectCard
              title="Système de facturation automatisé"
              result="Réduction de 80% du temps de facturation"
              tags={["N8N", "Airtable", "API"]}
              image="/images/icons/grow-coin.png"
              link="/projects/facturation"
            />

            <ProjectCard
              title="Assistant IA pour rédaction de contenu"
              result="Production de contenu x3 plus rapide"
              tags={["IA", "API", "Frontend"]}
              image="/images/icons/cloud-download.png"
              link="/projects/assistant-redaction"
            />
          </div>
        </section>

        {/* À propos Section */}
        <section className="mt-16">
          <SectionHeader title="À propos" />

          <div className="bg-[#111] p-8 rounded-3xl border border-[#222] backdrop-blur-sm shadow-xl">
            <p className="text-gray-300 mb-4">
              Développeur indépendant spécialisé dans l'automatisation, les
              backends modulaires, et l'orchestration de workflows. Mon objectif
              est de créer des systèmes intelligents, simples et sur-mesure qui
              vous font gagner du temps et de l'argent.
            </p>
            <p className="text-gray-300 mb-4">
              Je travaille principalement avec des artisans, indépendants et
              petites structures pour résoudre des problèmes concrets : prise de
              rendez-vous, gestion de leads, automatisation de tâches
              répétitives.
            </p>
            <h3 className="text-xl font-bold mt-6 mb-3">Ce que je propose :</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Automatisation de processus métier</li>
              <li>Intégration d'IA dans vos workflows</li>
              <li>Développement modulaire et évolutif</li>
              <li>Consulting en optimisation de processus</li>
              <li>Formation et accompagnement</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 py-6 text-center text-gray-500 border-t border-gray-800">
          <p>© 2025 – Tous droits réservés</p>
        </footer>
      </div>
    </main>
  );
}
