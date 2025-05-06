import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ResourcePageProps {
  params: {
    slug: string
  }
}

export default function ResourcePage({ params }: ResourcePageProps) {
  // Dans une application réelle, vous récupéreriez ces données depuis une API ou un CMS
  const resources = {
    templates: {
      title: "Mes Templates",
      description: "Récupère toutes mes templates et ressources pour automatiser ton business",
      longDescription:
        "Une collection complète de templates et de ressources pour automatiser ton business. Ces templates sont conçus pour t'aider à gagner du temps et à optimiser tes processus. Ils sont faciles à utiliser et à adapter à tes besoins spécifiques.",
      image: "/images/icons/folder.png",
      tags: ["N8N", "Airtable", "Notion"],
      price: "Gratuit",
      downloadLink: "https://gumroad.com/username/templates",
      gallery: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
    "ghost-writer": {
      title: "TON GHOST WRITER LINKEDIN",
      description: "Automatise la rédaction de tes posts LinkedIn",
      longDescription:
        "Un outil puissant qui utilise l'IA pour automatiser la rédaction de tes posts LinkedIn. Il te permet de créer du contenu engageant et professionnel en quelques clics. Plus besoin de passer des heures à réfléchir à quoi écrire, laisse l'IA faire le travail pour toi.",
      image: "/images/icons/card.png",
      tags: ["IA", "LinkedIn"],
      price: "29€",
      downloadLink: "https://gumroad.com/username/ghost-writer",
      gallery: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    },
    "assistant-ia": {
      title: "Ton Assistant Personnel IA",
      description: "Ton assistant IA pour tes tâches de liste",
      longDescription:
        "Un assistant IA personnel qui t'aide à gérer tes tâches quotidiennes. Il te permet de créer des listes de tâches, de les organiser et de les prioriser. Il peut également te rappeler les échéances importantes et te suggérer des actions à entreprendre.",
      image: "/images/icons/cloud-download.png",
      tags: ["IA", "Productivité"],
      price: "19€",
      downloadLink: "https://gumroad.com/username/assistant-ia",
      gallery: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    },
    // Ajoutez d'autres ressources ici
  }

  const resource = resources[params.slug as keyof typeof resources]

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Ressource non trouvée</h1>
          <Link href="/" className="text-primary hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] mb-8">
          <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-40 h-40 relative flex-shrink-0">
              <div className="w-40 h-40 rounded-full bg-[#1a1a1a] border border-[#333] shadow-md flex items-center justify-center overflow-hidden">
                <Image
                  src={resource.image || "/placeholder.svg"}
                  alt={resource.title}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{resource.title}</h1>
              <p className="text-xl text-gray-400 mb-2">{resource.description}</p>
              <div className="flex items-center mt-4">
                <span className="text-gray-400 mr-2">Prix:</span>
                <span className="text-xl font-bold">{resource.price}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6 h-full">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-300 mb-6">{resource.longDescription}</p>

              <h2 className="text-2xl font-bold mb-4">Ce que tu obtiens</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Accès immédiat après l'achat</li>
                <li>Documentation complète</li>
                <li>Mises à jour gratuites</li>
                <li>Support technique</li>
              </ul>

              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-purple-700 hover:bg-purple-600 shadow-[0_5px_20px_rgba(138,43,226,0.3)]"
              >
                <Link href={resource.downloadLink} target="_blank" rel="noopener noreferrer">
                  {resource.price === "Gratuit" ? "Télécharger maintenant" : "Acheter maintenant"}
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6">
            <h2 className="text-2xl font-bold mb-4">Aperçu</h2>
            <div className="grid grid-cols-1 gap-4">
              {resource.gallery.map((image, index) => (
                <div key={index} className="relative h-48 rounded-xl overflow-hidden border border-[#333]">
                  <Image src={image || "/placeholder.svg"} alt={`Aperçu ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
