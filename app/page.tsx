"use client";
import ProfileHeader from "@/components/profile-header";
import LinkCard from "@/components/link-card";
import ResourceCard from "@/components/resource-card";
import ProjectCard from "@/components/project-card";
import BlogCard from "@/components/blog-card";
import CallToAction from "@/components/call-to-action";
import SectionHeader from "@/components/section-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SiteFooter from "@/components/site-footer";
import { CONSTANTS } from "@/lib/constants/constants";
import { useProjects } from "@/hooks/use-projects";
import { useResources } from "@/hooks/use-resources";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import Link from "next/link";

export default function Home() {
  const { projects, loading: projectsLoading } = useProjects();
  const { resources, loading: resourcesLoading } = useResources();
  const { posts, loading: postsLoading } = useBlogPosts();

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
              featureRequest
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
            {resourcesLoading
              ? // Loading state - show skeletons
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-[#151515] rounded-3xl h-80 border border-[#222]"></div>
                  </div>
                ))
              : // Dynamic resources from API + feature requests
                resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    image={resource.image}
                    tags={resource.tags}
                    buttonText={
                      resource.featureRequest ? "Je les veux !" : "Télécharger"
                    }
                    buttonLink={
                      resource.featureRequest
                        ? `/resources/${resource.id}`
                        : resource.downloadLink
                    }
                    gradient={
                      resource.tags.includes("IA")
                        ? "from-purple-900 to-indigo-800"
                        : undefined
                    }
                    featureRequest={resource.featureRequest}
                  />
                ))}
          </div>
        </section>

        {/* Call To Action */}
        <CallToAction />

        {/* Blog Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader title="Blog" />
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/blog">Voir tous les articles →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsLoading
              ? // Loading state - show skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-[#151515] rounded-3xl h-80 border border-[#222]"></div>
                  </div>
                ))
              : // Dynamic blog posts from API
                posts.slice(0, 3).map((post) => (
                  <BlogCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    publishedAt={post.publishedAt}
                    author={post.author}
                    tags={post.tags}
                    featured={post.featured}
                    coverImage={post.coverImage}
                  />
                ))}
          </div>

          {posts.length === 0 && !postsLoading && (
            <div className="text-center py-12">
              <p className="text-gray-400">
                Aucun article publié pour le moment. Revenez bientôt !
              </p>
            </div>
          )}
        </section>

        {/* Projets / Use Cases Section */}
        <section className="mt-16">
          <SectionHeader title="Projets / Use Cases" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsLoading
              ? // Loading state - show skeletons
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-[#151515] rounded-3xl h-48 border border-[#222]"></div>
                  </div>
                ))
              : // Dynamic projects from API + feature requests
                projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    result={project.result}
                    tags={project.tags}
                    image={project.image}
                    link={`/projects/${project.id}`}
                    featureRequest={project.featureRequest}
                  />
                ))}
          </div>
        </section>

        {/* À propos Section */}
        <section className="mt-16">
          <SectionHeader title="À propos" />

          <div className="bg-[#111] p-8 rounded-3xl border border-[#222] backdrop-blur-sm shadow-xl">
            <p className="text-gray-300 mb-4">
              🧠{" "}
              <strong>
                J'aide les indépendants, artisans et petites équipes ambitieuses
                à reprendre le contrôle sur leur temps, leurs outils, et leur
                croissance.
              </strong>
            </p>
            <p className="text-gray-300 mb-4">
              En combinant <strong>automatisation stratégique</strong>,{" "}
              <strong>intelligence artificielle intégrée</strong> et{" "}
              <strong>systèmes backend sur-mesure</strong>, je conçois des
              agents et des workflows qui travaillent pour vous — même quand
              vous dormez.
            </p>
            <p className="text-gray-300 mb-4">
              🎯 Mon objectif : vous permettre de vous concentrer sur ce qui
              crée réellement de la valeur — pendant que je m'occupe du reste.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">
              🚀 Ce que je vous apporte :
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>Workflows IA & automation</strong> sur-mesure, conçus
                autour de vos vrais besoins métier
              </li>
              <li>
                <strong>Intégration fluide d'agents IA</strong> dans vos outils
                existants (formulaires, CRM, e-mail…)
              </li>
              <li>
                <strong>Backends modulaires</strong> qui grandissent avec vous
                (Airtable, Notion, n8n…)
              </li>
              <li>
                <strong>Optimisation & refonte</strong> de vos systèmes pour
                éliminer les frictions invisibles
              </li>
              <li>
                <strong>Accompagnement sur-mesure</strong> pour garder la main
                sans vous noyer dans la technique
              </li>
            </ul>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
