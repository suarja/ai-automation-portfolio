/**
 * Static content for the "Ce que j'ai construit" and
 * "Ma façon de travailler avec l'IA" sections.
 *
 * Source of truth: CV v2 (docs/plans/2026-09-11-cv-v2-contexte-impact-ia.md
 * in the CV 26k folder). Keep the two in sync.
 */

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkItem {
  id: string;
  title: string;
  role: string;
  period: string;
  context: string;
  highlights: string[];
  stack: string[];
  links?: WorkLink[];
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: "bandaa",
    title: "Bandaa",
    role: "Créateur et développeur, mobile et back-end",
    period: "Juillet à septembre 2026, en production",
    context:
      "Application mobile de missions photo pour événements. L'organisateur assigne des missions aux invités, l'app compile un album partagé dans l'ordre de l'événement. Publiée sur l'App Store et le Play Store, FR / EN / ES, achat intégré.",
    highlights: [
      "De la première ligne à la publication sur les deux stores en sept semaines.",
      "Back-end TypeScript sur Convex, stockage R2, paiements RevenueCat, tests Jest et convex-test, décisions d'architecture documentées en ADR.",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Convex",
      "RevenueCat",
      "Jest",
    ],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/bandaa-event-photo-missions/id6798290227",
      },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.swarecito.bandaa",
      },
    ],
  },
  {
    id: "ccin",
    title: "C'CIN, Chartres",
    role: "Développeur full-stack Symfony / React",
    period: "Depuis septembre 2025",
    context:
      "Opérateur télécom local (fibre, téléphonie, datacenter souverain ISO 27001), 60 salariés, environ 2 000 entreprises clientes, équipe tech d'une dizaine de personnes.",
    highlights: [
      "Dashboard interne de remontée de fiches (modules client, ticket, e-mail) : finalisation, sécurisation et préparation de la mise en production.",
      "Architecture hexagonale Symfony, préparation des environnements staging et production avec Docker Compose, FrankenPHP et GitLab CI/CD.",
    ],
    stack: [
      "PHP 8",
      "Symfony",
      "Doctrine",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "GitLab CI",
      "PHPUnit",
    ],
  },
  {
    id: "justgains",
    title: "JustGains, Paris",
    role: "Développeur front-end React",
    period: "Août 2024 à août 2025",
    context:
      "Startup fitness de cinq personnes. Application web de création de programmes d'entraînement personnalisés.",
    highlights: [
      "Seul développeur front-end pendant douze mois, de la définition des composants à l'intégration produit.",
      "Conception et livraison du builder de programmes d'entraînement, l'interface la plus complexe de l'application.",
    ],
    stack: ["React", "TypeScript"],
  },
];

export const AI_PRACTICES: string[] = [
  "Cursor et Claude Code au quotidien pour explorer une base de code, prototyper, refactorer, documenter et écrire des tests.",
  "Relecture et tests avant d'intégrer du code généré. Les choix d'architecture restent les miens.",
  "L'IA pour comparer des approches et accélérer l'exécution. Pour trancher, je lis le code et je le fais tourner.",
  "Je partage cette pratique sur TikTok et YouTube (@swarecito) : apprendre à coder avec l'IA comme outil, pas comme remplacement.",
];
