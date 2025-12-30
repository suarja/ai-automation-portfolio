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
              Je suis développeur fullstack spécialisé en React, TypeScript et Symfony.
            </p>

            <p className="text-gray-300 mb-4">
              <strong>Mon parcours</strong> : Prof d'espagnol reconverti en développeur en 2022.
              Aujourd'hui, je construis des applications web pour des startups et je partage mon apprentissage en public.
            </p>

            <div className="mb-6">
              <p className="text-gray-300 mb-2"><strong>Actuellement</strong> :</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li>Dev Fullstack @ C'CIN Chartres</li>
                <li>Créateur de contenu tech (@swarecito)</li>
                <li>En construction : SWE Wannabe (plateforme d'apprentissage)</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold mt-6 mb-3">
              Ce que je fais
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>
                <strong>Développement web</strong> : Applications React/Next.js, APIs Symfony
              </li>
              <li>
                <strong>Création de contenu</strong> : TikTok/YouTube sur l'apprentissage du code
              </li>
              <li>
                <strong>Projets personnels</strong> : Outils et plateformes pour développeurs
              </li>
            </ul>

            <div className="flex justify-center">
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/about">En savoir plus →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="mt-16">
          <SectionHeader title="Blog" />

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

        {/* Mes Liens Section */}
        <section className="mt-16">
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

        {/* Call To Action */}
        <CallToAction />

        <SiteFooter />
      </div>
    </main>
  );
}
