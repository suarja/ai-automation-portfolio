import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import SiteFooter from "@/components/site-footer";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Confidentialité | Jason Suárez",
  description:
    "Ce site ne dépose aucun cookie de suivi et n'utilise aucun traceur. Ce qui est stocké, par qui il est hébergé, et comment me contacter.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 flex items-center">
          <Link
            href="/"
            className="mr-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Retour à l'accueil"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2" size={24} />
            Confidentialité
          </h1>
        </div>

        <div className="space-y-6 text-soft">
          <section className="bg-card p-6 rounded-3xl border border-border">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Aucun suivi</h2>
            <p>
              Ce site ne dépose aucun cookie de suivi, n'utilise ni traceur publicitaire, ni
              empreinte de navigateur, ni outil d'analyse d'audience tiers. Il n'y a pas de
              formulaire qui collecte vos données.
            </p>
          </section>

          <section className="bg-card p-6 rounded-3xl border border-border">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Ce qui est stocké dans votre navigateur</h2>
            <p>
              Une seule préférence, en stockage local : le thème choisi (clair ou sombre). Elle
              ne quitte jamais votre navigateur et disparaît si vous effacez les données du site.
            </p>
          </section>

          <section className="bg-card p-6 rounded-3xl border border-border">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Hébergement</h2>
            <p>
              Le site est hébergé par Vercel. Comme tout serveur web, Vercel conserve des
              journaux techniques (adresse IP, page demandée, horodatage) pendant une durée
              limitée, pour le fonctionnement et la sécurité du service.
            </p>
          </section>

          <section className="bg-card p-6 rounded-3xl border border-border">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Liens externes</h2>
            <p>
              Les liens vers LinkedIn, GitHub, TikTok, YouTube, l'App Store, le Play Store et
              cal.com mènent vers des services qui appliquent leur propre politique de
              confidentialité.
            </p>
          </section>

          <section className="bg-card p-6 rounded-3xl border border-border">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Contact</h2>
            <p>
              Pour toute question :{" "}
              <a href="mailto:jason.h.suarez@gmail.com" className="text-primary hover:underline">
                jason.h.suarez@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
