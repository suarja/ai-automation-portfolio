import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  result: string
  tags: string[]
  image: string
  link: string
}

export default function ProjectCard({ title, result, tags, image, link }: ProjectCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111]">
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="col-span-2">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-green-400 font-medium mb-3">{result}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-[#222] border border-[#333] rounded-full text-xs px-3">
                {tag}
              </Badge>
            ))}
          </div>
          <Link
            href={link}
            className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 mt-2"
          >
            Lire le cas d'étude <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 relative flex items-center justify-center">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={80}
              height={80}
              className="object-contain drop-shadow-[0_5px_10px_rgba(255,255,255,0.15)] rounded-3xl"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
    </div>
  )
}
