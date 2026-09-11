import Link from 'next/link';
import { ChevronLeft, Code, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AiPractices from '@/components/ai-practices';

export const metadata = {
  title: 'À propos - Jason Suarez | Développeur full-stack',
  description:
    'Développeur full-stack TypeScript (React, Next.js, React Native, Convex) et Symfony. Parcours, stack, projets et façon de travailler avec l\'IA.',
  openGraph: {
    title: 'À propos - Jason Suarez',
    description: 'Développeur full-stack TypeScript et Symfony',
    type: 'profile',
    url: 'https://media.jason-suarez.com/about',
  },
  twitter: {
    card: 'summary',
    title: 'À propos - Jason Suarez',
    description: 'Développeur full-stack TypeScript et Symfony',
  },
  alternates: {
    canonical: 'https://media.jason-suarez.com/about',
  },
};

const skills = {
  'Front-end': [
    'React / Next.js',
    'TypeScript',
    'React Native / Expo',
    'Tailwind CSS',
  ],
  'Back-end': [
    'Symfony (PHP 8) / Doctrine',
    'NestJS / Node.js',
    'Convex',
    'API REST / GraphQL',
  ],
  'Données et livraison': [
    'PostgreSQL / MySQL',
    'Docker / Docker Compose',
    'GitLab CI/CD, Linux/SSH',
  ],
  'Qualité et outils': [
    'PHPUnit, Jest, Vitest',
    'Git, pull requests, revues de code',
    'Cursor, Claude Code',
    'n8n (automatisation)',
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour à l'accueil
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos</h1>
          <p className="text-xl text-muted-foreground">
            Développeur full-stack TypeScript · React / Next.js · Symfony
          </p>
        </div>

        {/* Parcours */}
        <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Parcours</h2>
          <div className="space-y-3 text-soft">
            <p>
              Je suis né en République Dominicaine, arrivé en France à 10 ans.
            </p>

            <div className="space-y-2">
              <p><strong>2018</strong> : Master EMOS, Université de Strasbourg, puis personnel navigant (Ryanair, Iberia, Vueling)</p>
              <p><strong>2020 à 2024</strong> : CAPES d'espagnol, professeur certifié dans le secondaire</p>
              <p><strong>2022</strong> : reconversion dans le développement web, en parallèle du métier (freeCodeCamp, freelance Next.js en 2023)</p>
              <p><strong>2024 à 2025</strong> : développeur front-end React chez JustGains (startup fitness), seul dev front pendant un an</p>
              <p><strong>Avril 2025</strong> : lancement de TikTok et YouTube @swarecito</p>
              <p><strong>Septembre 2025</strong> : développeur full-stack Symfony / React chez C'CIN Chartres</p>
              <p><strong>Septembre 2026</strong> : publication de Bandaa sur l'App Store et le Play Store</p>
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
                className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-6"
              >
                <h3 className="text-lg font-bold mb-4">{category}</h3>
                <ul className="space-y-2 text-soft">
                  {items.map((skill) => (
                    <li key={skill}>• {skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* IA */}
        <div className="mb-8">
          <AiPractices />
        </div>

        {/* Langues */}
        <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Langues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-soft">
            <div>
              <p className="text-xl">🇪🇸 <strong>Espagnol</strong></p>
              <p className="text-sm text-muted-foreground">Natif</p>
            </div>
            <div>
              <p className="text-xl">🇫🇷 <strong>Français</strong></p>
              <p className="text-sm text-muted-foreground">Natif</p>
            </div>
            <div>
              <p className="text-xl">🇬🇧 <strong>Anglais</strong></p>
              <p className="text-sm text-muted-foreground">C1</p>
            </div>
          </div>
        </div>

        {/* Projets */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Projets</h2>

          {/* Bandaa */}
          <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Bandaa</h3>
                <p className="text-muted-foreground text-sm">En production depuis septembre 2026</p>
              </div>
            </div>

            <p className="text-soft mb-4">
              Application mobile de missions photo pour événements : l'organisateur assigne des missions aux
              invités, l'app compile un album partagé dans l'ordre de l'événement. FR / EN / ES, achat intégré.
            </p>

            <ul className="list-disc list-inside text-soft space-y-2 mb-4">
              <li>Expo / React Native, expo-router, TypeScript</li>
              <li>Back-end TypeScript sur Convex, stockage R2, paiements RevenueCat</li>
              <li>Tests Jest et convex-test, décisions d'architecture documentées en ADR</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://apps.apple.com/us/app/bandaa-event-photo-missions/id6798290227"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.swarecito.bandaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Play Store
              </a>
            </div>
          </div>

          {/* SWE Wannabe */}
          <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">SWE Wannabe</h3>
                <p className="text-muted-foreground text-sm">En construction</p>
              </div>
            </div>

            <p className="text-soft mb-4">
              Plateforme d'apprentissage CLI pour développeurs juniors.
            </p>

            <p className="text-soft mb-4">
              <strong>Objectif</strong> : Apprendre par la pratique avec des projets réels, pas des tutoriels.
            </p>

            <ul className="list-disc list-inside text-soft space-y-2">
              <li>Exercices basés sur des problèmes métier réels</li>
              <li>Tests automatisés pour valider les solutions</li>
              <li>Progression guidée du junior au niveau intermédiaire</li>
            </ul>
          </div>

          {/* @swarecito */}
          <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8">
            <h3 className="text-2xl font-bold mb-4">@swarecito (TikTok/YouTube)</h3>

            <p className="text-soft mb-4">
              Contenu sur l'apprentissage du développement et l'utilisation de l'IA.
            </p>

            <p className="text-soft mb-3"><strong>Sujets</strong> :</p>
            <ul className="list-disc list-inside text-soft space-y-2">
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
          <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8 mb-6">
            <h3 className="text-2xl font-bold mb-4">Développement Web</h3>

            <p className="text-soft mb-4">
              Je développe des applications web modernes et robustes.
            </p>

            <p className="text-soft mb-3">
              <strong>Technologies</strong> : React, Next.js, TypeScript, React Native / Expo, Symfony, Convex
            </p>

            <p className="text-soft mb-3"><strong>Je peux vous aider sur</strong> :</p>
            <ul className="list-disc list-inside text-soft space-y-2">
              <li>Applications web complètes (frontend + backend)</li>
              <li>APIs RESTful</li>
              <li>Intégrations IA/automatisation</li>
              <li>Maintenance et évolution de projets existants</li>
            </ul>
          </div>

          {/* Contenu & Mentorat */}
          <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8">
            <h3 className="text-2xl font-bold mb-4">Contenu & Mentorat</h3>

            <div className="space-y-3 text-soft">
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
        <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Disponibilité</h2>
          <div className="space-y-2 text-soft">
            <p><strong>Actuellement</strong> : En poste à temps plein</p>
            <p><strong>Freelance</strong> : Missions ponctuelles possibles</p>
            <p><strong>Projets collaboratifs</strong> : Ouvert aux discussions</p>
          </div>
        </div>

        {/* Contact */}
        <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>

          <div className="space-y-3 text-soft mb-6">
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
                Réserver un créneau
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
