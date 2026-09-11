import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <div className="mt-16 relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <div className="absolute inset-0 dot-grid opacity-20"></div>
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
          <h2 className="text-2xl font-bold mb-2">Discutons</h2>
          <p className="text-white/85 mb-6 max-w-lg mx-auto">
            Un projet, une question, une opportunité ? Réserve un créneau ou
            écris-moi sur LinkedIn.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-indigo-950 hover:bg-white/90 shadow-lg"
          >
            <Link href="https://cal.com/jasonsuarez/booking" target="_blank" rel="noopener noreferrer">
              Réserver un créneau
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-0 dark:opacity-20"></div>
    </div>
  );
}
