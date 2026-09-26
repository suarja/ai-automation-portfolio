import Link from 'next/link';
import { ChevronLeft, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AiPractices from '@/components/ai-practices';
import ProfileHeader from '@/components/profile-header';
import { getCandidateContent } from '@/lib/candidate-content';
import { AppShowcaseTeaser } from '@/components/apps/app-showcase-teaser';

export const metadata = {
  title: 'À propos de Jason Suárez | Développeur full-stack',
  description:
    'Développeur full-stack orienté produit : deux outils métier chez C\'CIN, des applications mobiles indépendantes, et un parcours entre la République dominicaine, la France et l\'Espagne.',
  openGraph: {
    title: 'À propos de Jason Suárez',
    description: 'Parcours, produits, langues et vie en dehors du travail.',
    type: 'profile',
    url: 'https://www.jason-suarez.com/about',
  },
  twitter: {
    card: 'summary',
    title: 'À propos de Jason Suárez',
    description: 'Parcours, produits, langues et vie en dehors du travail.',
  },
  alternates: {
    canonical: 'https://www.jason-suarez.com/about',
    languages: {
      fr: 'https://www.jason-suarez.com/about',
      en: 'https://www.jason-suarez.com/en/about',
      es: 'https://www.jason-suarez.com/es/about',
    },
  },
};

const skills = {
  'Front-end': [
    'React',
    'TypeScript',
    'Next.js',
    'React Native / Expo',
  ],
  'Back-end': [
    'Symfony 7 / PHP 8.3',
    'Doctrine',
    'Convex',
    'API REST',
    'Architecture hexagonale',
  ],
  'Données et livraison': [
    'PostgreSQL / MySQL',
    'Docker Compose / FrankenPHP',
    'GitLab CI/CD, Linux / SSH',
  ],
  'Qualité et outils': [
    'PHPUnit, Jest, Vitest',
    'Git, pull requests, revues de code',
    'Codex, Claude Code',
  ],
};

export default function AboutPage() {
  const copy = getCandidateContent('fr');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <ProfileHeader locale="fr" titleLevel="h2" />
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 mt-12"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour à l'accueil
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos</h1>
          <p className="text-xl text-muted-foreground">
            {copy.profile.promise}
          </p>
        </div>

        {/* Parcours */}
        <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-elevated to-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Parcours</h2>
          <div className="space-y-3 text-soft">
            <p>{copy.about.intro}</p>
            <p>{copy.about.backgroundText}</p>

            <div className="space-y-2">
              {copy.about.career.map((step) => <p key={step}>{step}</p>)}
            </div>
          </div>
        </div>

        {/* Produits internes */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">{copy.about.productTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="card-glow rounded-3xl border border-border bg-card p-8 shadow-card">
              <h3 className="mb-3 text-xl font-bold">Dashboard de remontée de fiches</h3>
              <p className="text-soft">
                Repris en cours de route, le dashboard agrège les informations clients, les e-mails, les tickets et
                les interventions provenant de plusieurs outils métier. J'y ai ajouté des modules, renforcé la
                sécurité et mené l'évolution jusqu'à la mise en production.
              </p>
            </article>
            <article className="card-glow rounded-3xl border border-border bg-card p-8 shadow-card">
              <h3 className="mb-3 text-xl font-bold">Gestion du parc</h3>
              <p className="text-soft">
                J'ai développé l'essentiel de cet outil d'inventaire et j'en assure la maintenance. Il suit chaque
                équipement au fil de son cycle de vie, de son acquisition à sa mise au rebut.
              </p>
            </article>
          </div>
        </section>

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

        <section className="card-glow mb-8 rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-card p-8 shadow-card">
          <h2 className="mb-3 text-2xl font-bold">{copy.about.personalTitle}</h2>
          <p className="max-w-3xl leading-relaxed text-soft">{copy.about.personalText}</p>
        </section>

        {/* Projets */}
        <div className="mb-12">
          <AppShowcaseTeaser locale="fr" />

          <h2 className="mb-6 mt-10 text-3xl font-bold">Autres projets</h2>

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
