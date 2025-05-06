import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <div className="mt-16 relative overflow-hidden rounded-3xl border border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10"></div>
      <div className="relative z-10 p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative mb-4 flex items-center justify-center">
            <Image
              src="/images/icons/flash-sale.png"
              alt="Calendrier"
              width={80}
              height={80}
              className="object-contain drop-shadow-[0_5px_10px_rgba(255,255,255,0.25)] rounded-3xl"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">Travaille avec moi</h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">
            Prêt à automatiser tes processus et gagner du temps ? Réserve un appel découverte pour discuter de ton
            projet.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-purple-900 hover:bg-gray-200 shadow-[0_5px_20px_rgba(255,255,255,0.3)]"
          >
            <Link href="https://calendly.com/username">Réserver un appel</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-20"></div>
    </div>
  )
}
