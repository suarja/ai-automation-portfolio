import Link from 'next/link';
import { ChevronLeft, Code, Cpu, Zap, Target, Users, Rocket } from 'lucide-react';
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
  'Automatisation & IA': [
    'n8n',
    'Make',
    'Zapier',
    'Claude AI',
    'GPT-4',
    'Agents IA',
    'Workflows intelligents',
  ],
  'Développement': [
    'TypeScript',
    'Next.js',
    'React',
    'Node.js',
    'Python',
    'API Development',
  ],
  'No-Code / Low-Code': [
    'Airtable',
    'Notion',
    'Webflow',
    'Bubble',
    'Glide',
  ],
  'Intégrations': [
    'Stripe',
    'SendGrid',
    'Calendly',
    'CRM Integration',
    'Webhooks',
    'REST APIs',
  ],
};

const services = [
  {
    icon: Zap,
    title: 'Automatisation Stratégique',
    description:
      'Je conçois des workflows intelligents qui éliminent les tâches répétitives et libèrent votre temps pour ce qui compte vraiment.',
  },
  {
    icon: Cpu,
    title: 'Intelligence Artificielle',
    description:
      'Intégration d\'agents IA personnalisés dans vos processus métier pour augmenter votre productivité et améliorer vos décisions.',
  },
  {
    icon: Code,
    title: 'Systèmes Backend Sur-Mesure',
    description:
      'Développement de solutions techniques adaptées à vos besoins spécifiques, qui évoluent avec votre business.',
  },
  {
    icon: Target,
    title: 'Optimisation de Processus',
    description:
      'Analyse et refonte de vos systèmes existants pour éliminer les frictions et maximiser l\'efficacité.',
  },
  {
    icon: Users,
    title: 'Accompagnement Personnalisé',
    description:
      'Formation et support pour que vous gardiez la maîtrise de vos outils sans vous noyer dans la technique.',
  },
  {
    icon: Rocket,
    title: 'Mise en Production Rapide',
    description:
      'Des solutions concrètes et opérationnelles, déployées rapidement pour un impact immédiat sur votre business.',
  },
];

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
            Automatisation • Intelligence Artificielle • Développement
          </p>
        </div>

        {/* Introduction */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Qui suis-je ?</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              🧠 <strong>J'aide les indépendants, artisans et petites équipes ambitieuses</strong> à
              reprendre le contrôle sur leur temps, leurs outils, et leur croissance.
            </p>
            <p>
              En combinant <strong>automatisation stratégique</strong>,{' '}
              <strong>intelligence artificielle intégrée</strong> et{' '}
              <strong>systèmes backend sur-mesure</strong>, je conçois des agents et des workflows
              qui travaillent pour vous — même quand vous dormez.
            </p>
            <p>
              🎯 Mon objectif : vous permettre de vous concentrer sur ce qui crée réellement de la
              valeur — pendant que je m'occupe du reste.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🚀 Ce que je vous apporte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-400 text-sm">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">💡 Compétences Techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-6"
              >
                <h3 className="text-lg font-bold mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-[#222] border border-[#333] rounded-full"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-gradient-to-br from-[#151515] to-[#111] p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à automatiser votre business ?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Discutons de votre projet et voyons ensemble comment je peux vous aider à gagner du
            temps et à augmenter votre productivité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="https://cal.com/jasonsuarez/booking">
                Réserver un appel découverte
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/">Voir mes projets</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
