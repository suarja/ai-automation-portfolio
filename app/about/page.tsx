import Link from 'next/link';
import { ChevronLeft, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'À propos - Jason Suarez | Développeur Fullstack',
  description:
    'Développeur fullstack spécialisé en React, TypeScript et Symfony. Découvrez mon parcours de prof d\'espagnol à développeur.',
  openGraph: {
    title: 'À propos - Jason Suarez',
    description: 'Développeur fullstack - React, TypeScript, Symfony',
    type: 'profile',
    url: 'https://media.jason-suarez.com/about',
  },
  twitter: {
    card: 'summary',
    title: 'À propos - Jason Suarez',
    description: 'Développeur fullstack - React, TypeScript, Symfony',
  },
  alternates: {
    canonical: 'https://media.jason-suarez.com/about',
  },
};

const skills = {
  'Frontend': [
    'React / Next.js',
    'TypeScript / JavaScript',
    'React Native',
    'Tailwind CSS',
  ],
  'Backend': [
    'Symfony (PHP)',
    'Node.js / Express',
    'RESTful APIs',
  ],
  'Base de données': [
    'PostgreSQL',
    'MySQL',
    'Redis',
  ],
  'Outils': [
    'Git / GitHub',
    'Docker',
    'n8n (automatisation)',
    'IA (Claude, GPT-4)',
  ],
};

export default function AboutPage() {
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

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos</h1>
          <p className="text-xl text-gray-400">
            Développeur Fullstack
          </p>
        </div>

        {/* Parcours */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Parcours</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              Je suis né en République Dominicaine, arrivé en France à 10 ans.
            </p>

            <div className="space-y-2">
              <p><strong>2020</strong> : CAPES d'espagnol, prof puis steward chez Ryanair et Iberia</p>
              <p><strong>2022</strong> : Reconversion dans le développement web</p>
              <p><strong>2024</strong> : Dev Frontend @ Just Gains (startup fitness US)</p>
              <p><strong>2024-2025</strong> : Spécialisation blockchain et sécurité smart contracts (6 mois)</p>
              <p><strong>Avril 2025</strong> : Lancement TikTok @swarecito (~2000 followers)</p>
              <p><strong>Septembre 2025</strong> : Dev Fullstack @ C'CIN Chartres (Symfony/React)</p>
            </div>
          </div>
        </div>

        {/* Stack Technique */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Stack Technique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6"
              >
                <h3 className="text-lg font-bold mb-4">{category}</h3>
                <ul className="space-y-2 text-gray-300">
                  {items.map((skill) => (
                    <li key={skill}>• {skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Langues */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Langues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
            <div>
              <p className="text-xl">🇪🇸 <strong>Espagnol</strong></p>
              <p className="text-sm text-gray-400">Natif</p>
            </div>
            <div>
              <p className="text-xl">🇫🇷 <strong>Français</strong></p>
              <p className="text-sm text-gray-400">Natif</p>
            </div>
            <div>
              <p className="text-xl">🇬🇧 <strong>Anglais</strong></p>
              <p className="text-sm text-gray-400">Professionnel</p>
            </div>
          </div>
        </div>

        {/* Projets */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Projets</h2>

          {/* SWE Wannabe */}
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">SWE Wannabe</h3>
                <p className="text-gray-400 text-sm">En construction</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4">
              Plateforme d'apprentissage CLI pour développeurs juniors.
            </p>

            <p className="text-gray-300 mb-4">
              <strong>Objectif</strong> : Apprendre par la pratique avec des projets réels, pas des tutoriels.
            </p>

            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Exercices basés sur des problèmes métier réels</li>
              <li>Tests automatisés pour valider les solutions</li>
              <li>Progression guidée du junior au niveau intermédiaire</li>
            </ul>
          </div>

          {/* @swarecito */}
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8">
            <h3 className="text-2xl font-bold mb-4">@swarecito (TikTok/YouTube)</h3>

            <p className="text-gray-300 mb-4">
              Contenu sur l'apprentissage du développement et l'utilisation de l'IA.
            </p>

            <p className="text-gray-300 mb-3"><strong>Sujets</strong> :</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Apprendre à coder en 2025</li>
              <li>IA comme outil, pas comme remplacement</li>
              <li>Reconversion dans la tech</li>
              <li>Progression junior → senior</li>
            </ul>
          </div>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Services</h2>

          {/* Développement Web */}
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 mb-6">
            <h3 className="text-2xl font-bold mb-4">Développement Web</h3>

            <p className="text-gray-300 mb-4">
              Je développe des applications web modernes et robustes.
            </p>

            <p className="text-gray-300 mb-3">
              <strong>Technologies</strong> : React, TypeScript, Next.js, Symfony, React Native
            </p>

            <p className="text-gray-300 mb-3"><strong>Je peux vous aider sur</strong> :</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Applications web complètes (frontend + backend)</li>
              <li>APIs RESTful</li>
              <li>Intégrations IA/automatisation</li>
              <li>Maintenance et évolution de projets existants</li>
            </ul>
          </div>

          {/* Contenu & Mentorat */}
          <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8">
            <h3 className="text-2xl font-bold mb-4">Contenu & Mentorat</h3>

            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Contenu</strong> : Création de vidéos/articles techniques
              </p>
              <p>
                <strong>Mentorat</strong> : Accompagnement juniors et reconversions (ponctuellement)
              </p>
            </div>
          </div>
        </div>

        {/* Disponibilité */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Disponibilité</h2>
          <div className="space-y-2 text-gray-300">
            <p><strong>Actuellement</strong> : En poste à temps plein</p>
            <p><strong>Freelance</strong> : Missions ponctuelles possibles</p>
            <p><strong>Projets collaboratifs</strong> : Ouvert aux discussions</p>
          </div>
        </div>

        {/* Contact */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>

          <div className="space-y-3 text-gray-300 mb-6">
            <p>
              <strong>TikTok</strong> :{' '}
              <a href="https://tiktok.com/@swarecito" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                @swarecito
              </a>
            </p>
            <p>
              <strong>GitHub</strong> :{' '}
              <a href="https://github.com/suarja" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                github.com/suarja
              </a>
            </p>
            <p>
              <strong>LinkedIn</strong> :{' '}
              <a href="https://linkedin.com/in/jason-suarez" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Jason Suarez
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="https://cal.com/jasonsuarez/booking" target="_blank" rel="noopener noreferrer">
                Discutons de votre projet
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
