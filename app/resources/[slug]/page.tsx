import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Download, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllResourceSlugs, hasResourceMdxContent } from '@/lib/resourceMarkdown';
import { ResourceService } from '@/lib/services/resourceService';
import { notFound } from 'next/navigation';

interface ResourcePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for internal MDX resources
export async function generateStaticParams() {
  const slugs = getAllResourceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: ResourcePageProps) {
  const { slug } = await params;

  try {
    // Try to load MDX metadata first
    if (hasResourceMdxContent(slug)) {
      const mdxModule = await import(`@/content/resources/${slug}.mdx`);
      const metadata = mdxModule.metadata;

      return {
        title: `${metadata.title} | Jason Suarez`,
        description: metadata.description,
        keywords: metadata.tags.join(', '),
        openGraph: {
          title: metadata.title,
          description: metadata.description,
          type: 'article',
          images: metadata.coverImage ? [
            {
              url: metadata.coverImage,
              width: 1200,
              height: 630,
              alt: metadata.title,
            }
          ] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title: metadata.title,
          description: metadata.description,
          creator: '@swarecito',
          images: metadata.coverImage ? [metadata.coverImage] : [],
        },
      };
    }

    // Fallback to JSON resource
    const resource = await ResourceService.getResource(slug);
    return {
      title: `${resource.title} | Jason Suarez`,
      description: resource.description,
    };
  } catch (error) {
    return {
      title: 'Ressource non trouvée | Jason Suarez',
      description: 'Cette ressource n\'existe pas.',
    };
  }
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;

  // Check if this is an internal MDX resource
  const hasMdxContent = hasResourceMdxContent(slug);

  if (hasMdxContent) {
    // INTERNAL RESOURCE: Load and render MDX
    let ResourceContent;
    let metadata;

    try {
      const mdxModule = await import(`@/content/resources/${slug}.mdx`);
      ResourceContent = mdxModule.default;
      metadata = mdxModule.metadata;
    } catch (error) {
      console.error(`Resource MDX not found: ${slug}`, error);
      notFound();
    }

    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Background gradients */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour aux ressources
          </Link>

          <article className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 md:p-12">
            {/* Header */}
            <header className="mb-10">
              {/* Icon decoration */}
              <div className="inline-flex p-3 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl border border-primary/30 mb-6">
                <Download className="w-6 h-6 text-primary" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {metadata.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary/10 border border-primary/30 text-primary rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {metadata.title}
              </h1>

              {/* Price */}
              <div className="text-2xl font-bold text-green-400 mb-4">
                {metadata.price}
              </div>
            </header>

            {/* Cover Image */}
            {metadata.coverImage && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
                <img
                  src={metadata.coverImage}
                  alt={metadata.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Decorative line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10"></div>

            {/* MDX Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <ResourceContent />
            </div>

            {/* Gallery (if exists) */}
            {metadata.gallery && metadata.gallery.length > 0 && (
              <div className="mt-10">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-10"></div>
                <h2 className="text-2xl font-bold mb-4">Aperçus</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {metadata.gallery.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative h-48 rounded-xl overflow-hidden border border-[#333]"
                    >
                      <img
                        src={image}
                        alt={`Aperçu ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom decorative line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-10 mb-6"></div>

            {/* Download CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20">
              <p className="text-sm text-gray-300 mb-3">
                💡 <strong>Cette ressource vous est utile ?</strong> Partagez-la avec vos collègues !
              </p>
              <Link
                href="https://cal.com/jasonsuarez/booking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
              >
                Besoin d'aide personnalisée ? Réserver un appel →
              </Link>
            </div>

            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
          </article>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Voir toutes les ressources
            </Link>
          </div>
        </div>
      </main>
    );
  } else {
    // EXTERNAL RESOURCE: Fetch from JSON and show metadata page
    let resource;
    try {
      resource = await ResourceService.getResource(slug);
    } catch (error) {
      notFound();
    }

    // Check if external URL
    const isExternal = resource.downloadLink.startsWith('http');

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
                      {isExternal && (
                        <Button
                          asChild
                          size="lg"
                          className="rounded-full"
                        >
                          <a href={resource.downloadLink} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                          </a>
                        </Button>
                      )}
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
                  <div>
                    <span className="text-gray-400 text-sm">
                      Téléchargements :
                    </span>
                    <p className="text-white">
                      {resource.metadata.downloadCount || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action principale */}
              {isExternal && (
                <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6">
                  <h3 className="text-xl font-bold mb-4">Téléchargement</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Accédez immédiatement à cette ressource après téléchargement.
                  </p>
                  <Button
                    asChild
                    className="w-full rounded-full"
                    size="lg"
                  >
                    <a href={resource.downloadLink} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger maintenant
                    </a>
                  </Button>
                </div>
              )}

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
}
