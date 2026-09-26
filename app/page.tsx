import ProfileHeader from "@/components/profile-header";
import LinkCard from "@/components/link-card";
import ResourceCard from "@/components/resource-card";
import ProjectCard from "@/components/project-card";
import BlogCard from "@/components/blog-card";
import CallToAction from "@/components/call-to-action";
import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import SiteFooter from "@/components/site-footer";
import WorkCard from "@/components/work-card";
import AiPractices from "@/components/ai-practices";
import { WORK_ITEMS } from "@/lib/data/work";
import { getCandidateContent } from "@/lib/candidate-content";
import { ProjectService } from "@/lib/services/projectService";
import { ResourceService } from "@/lib/services/resourceService";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

// Server component: the JSON and MDX are read at build time, no client fetch,
// no skeletons, the first paint is the final page.
export default async function Home() {
  const copy = getCandidateContent("fr");
  const [allProjects, allResources, posts] = await Promise.all([
    ProjectService.listProjects(),
    ResourceService.listResources(),
    getBlogPosts(),
  ]);
  const projects = allProjects
    .filter((p) => p.metadata?.status === "published")
    .sort((a, b) => Number(b.metadata.featured) - Number(a.metadata.featured));
  const resources = allResources.filter((r) => r.metadata?.status === "published");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jason Suárez",
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.jpg`,
    jobTitle: "Développeur full-stack",
    knowsLanguage: ["French", "Spanish", "English"],
    worksFor: { "@type": "Organization", name: "C'CIN" },
    sameAs: [
      "https://www.linkedin.com/in/jason-suarez/",
      "https://github.com/suarja",
      "https://www.tiktok.com/@swarecito",
      "https://youtube.com/@swarecito",
    ],
    knowsAbout: ["TypeScript", "React", "Next.js", "React Native", "Convex", "Symfony", "PHP", "PostgreSQL", "Docker"],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Header Section */}
        <ProfileHeader />

        {/* Produits et responsabilités */}
        <section className="mt-16">
          <SectionHeader title={copy.home.workTitle} />
          <p className="mb-8 max-w-3xl text-muted-foreground">{copy.home.workIntro}</p>

          <div className="grid grid-cols-1 gap-6">
            {WORK_ITEMS.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* À propos Section */}
        <section className="mt-16 fade-up fade-up-2">
          <SectionHeader title="À propos" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 card-glow bg-card p-8 rounded-3xl border border-border backdrop-blur-sm shadow-card">
              <p className="text-soft mb-4">{copy.about.intro}</p>
              <p className="text-soft mb-6">{copy.about.backgroundText}</p>

              <div className="flex justify-center">
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/about">{copy.home.aboutLink} →</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <AiPractices />
            </div>
          </div>
        </section>

        {/* Automatisations Section */}
        <section className="mt-16 fade-up fade-up-3">
          <SectionHeader title="Automatisations pour indépendants" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    result={project.result}
                    tags={project.tags}
                    image={project.image}
                    link={`/projects/${project.id}`}
                    featureRequest={false}
                  />
                ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="mt-16 fade-up fade-up-4">
          <SectionHeader title="Blog" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
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

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucun article publié pour le moment. Revenez bientôt !
              </p>
            </div>
          )}
        </section>

        {/* Templates & Ressources Section */}
        <section className="mt-16 fade-up fade-up-4">
          <SectionHeader title="Mes Ressources" />


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    image={resource.image}
                    tags={resource.tags}
                    buttonText={
                      "Télécharger"
                    }
                    buttonLink={
                      resource.downloadLink
                    }
                    gradient={
                      resource.tags.includes("IA")
                        ? "from-primary/15 to-card border-primary/30"
                        : undefined
                    }
                    featureRequest={false}
                  />
                ))}
          </div>
        </section>

        {/* Mes Liens Section */}
        <section className="mt-16 fade-up fade-up-4">
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
              title="TikTok @swarecito"
              description="Suis mon parcours et mes conseils tech"
              icon="/images/icons/star-badge.png"
              buttonText="Suivre"
              buttonLink="https://www.tiktok.com/@swarecito"
              gradient="from-primary/15 to-card border-primary/30"
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
