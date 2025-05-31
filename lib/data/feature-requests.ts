import { Project } from "@/lib/types/project";
import { Resource } from "@/lib/types/resource";

// Feature request projects - these are preview items that trigger modals
export const FEATURE_REQUEST_PROJECTS: Array<
  Project & { featureRequest: true }
> = [
  {
    id: "leads-coach",
    title: "Automatisation de leads pour coach",
    result: "Augmentation de 40% du taux de conversion",
    tags: ["IA", "N8N", "API"],
    image: "/images/icons/star-badge.png",
    client: {
      type: "Coach en développement personnel",
      size: "Entrepreneur solo",
      objective: "Améliorer la qualification et le suivi des prospects",
    },
    challenge:
      "Difficulté à suivre et qualifier les leads entrants via différents canaux (site web, réseaux sociaux, webinaires). Temps considérable passé à envoyer des emails manuellement.",
    solution: {
      description:
        "Système centralisé de capture et qualification de leads avec suivi automatisé",
      tools: ["N8N", "OpenAI", "Make.com", "Google Sheets"],
      features: [
        "Centralisation des leads de toutes sources dans une base unique",
        "Qualification automatique par IA selon critères prédéfinis",
        "Séquences d'emails personnalisés selon le profil",
        "Tableau de bord de suivi des conversions",
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "/placeholder.svg?height=300&width=600",
        "/placeholder.svg?height=300&width=600",
      ],
      demoLink: "https://demo-leads-coach.vercel.app",
    },
    description:
      "J'ai développé pour ce coach un système complet qui capture les leads depuis son site web, ses réseaux sociaux et ses webinaires. Le système utilise l'IA pour qualifier automatiquement les leads, envoyer des séquences d'emails personnalisées, et programmer des suivis au moment optimal.",
    testimonial: {
      text: "Mon taux de conversion a augmenté de 40% depuis que j'utilise ce système. Je peux me concentrer sur mes clients plutôt que sur la prospection. L'IA qualifie mes leads avec une précision impressionnante !",
      author: "Marie L., Coach",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    results: [
      "Augmentation de 40% du taux de conversion",
      "Réduction de 70% du temps passé sur la gestion des leads",
      "Meilleure qualification des prospects",
      "Augmentation du chiffre d'affaires de 25%",
    ],
    insight: {
      title: "L'IA au service de la qualification de leads",
      text: "Ce projet démontre comment l'IA peut être utilisée pour qualifier automatiquement des leads et personnaliser le suivi. La combinaison de l'automatisation et de l'intelligence artificielle permet de créer des systèmes qui s'adaptent au comportement des utilisateurs.",
      resourceLink: {
        text: "Télécharger mon guide sur l'IA pour coaches",
        url: "/resources/guide-ia-coaches",
      },
    },
    metadata: {
      createdAt: "2025-01-15T00:00:00.000Z",
      updatedAt: "2025-01-20T00:00:00.000Z",
      featured: true,
      status: "published",
    },
    featureRequest: true,
  },
  {
    id: "facturation",
    title: "Système de facturation automatisé",
    result: "Réduction de 80% du temps de facturation",
    tags: ["N8N", "Airtable", "API"],
    image: "/images/icons/grow-coin.png",
    client: {
      type: "Consultant freelance",
      size: "Indépendant",
      objective: "Automatiser la facturation et le suivi des paiements",
    },
    challenge:
      "Processus de facturation manuel chronophage avec suivi des paiements difficile.",
    solution: {
      description: "Système de facturation automatisé avec suivi des paiements",
      tools: ["N8N", "Airtable", "Stripe", "PDF Generator"],
      features: [
        "Génération automatique des factures",
        "Envoi automatique aux clients",
        "Suivi des paiements en temps réel",
        "Relances automatiques",
      ],
      screenshots: ["/placeholder.svg?height=300&width=600"],
    },
    description:
      "Système complet de facturation automatisée pour freelances et consultants.",
    testimonial: {
      text: "Ce système m'a fait gagner un temps fou sur la facturation !",
      author: "Client Facturation",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    results: ["Réduction de 80% du temps de facturation"],
    insight: {
      title: "Automatisation de la facturation",
      text: "L'automatisation des processus administratifs est essentielle pour les freelances.",
    },
    metadata: {
      createdAt: "2025-01-10T00:00:00.000Z",
      updatedAt: "2025-01-20T00:00:00.000Z",
      featured: false,
      status: "published",
    },
    featureRequest: true,
  },
  {
    id: "assistant-redaction",
    title: "Assistant IA pour rédaction de contenu",
    result: "Production de contenu x3 plus rapide",
    tags: ["IA", "API", "Frontend"],
    image: "/images/icons/cloud-download.png",
    client: {
      type: "Agence de marketing",
      size: "Petite équipe, 5 personnes",
      objective: "Accélérer la production de contenu",
    },
    challenge:
      "Production de contenu lente et chronophage pour les réseaux sociaux.",
    solution: {
      description: "Assistant IA pour la rédaction automatisée de contenu",
      tools: ["OpenAI", "React", "Next.js", "API"],
      features: [
        "Génération de posts automatique",
        "Adaptation au ton de la marque",
        "Optimisation SEO",
        "Planning de publication",
      ],
      screenshots: ["/placeholder.svg?height=300&width=600"],
    },
    description:
      "Assistant IA qui accélère la production de contenu pour les réseaux sociaux.",
    testimonial: {
      text: "Notre productivité a été multipliée par 3 grâce à cet assistant !",
      author: "Agence Marketing",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    results: ["Production de contenu x3 plus rapide"],
    insight: {
      title: "IA et création de contenu",
      text: "L'IA peut considérablement accélérer la création de contenu.",
    },
    metadata: {
      createdAt: "2025-01-05T00:00:00.000Z",
      updatedAt: "2025-01-20T00:00:00.000Z",
      featured: false,
      status: "published",
    },
    featureRequest: true,
  },
];

// Feature request resources - these are preview items that trigger modals
export const FEATURE_REQUEST_RESOURCES: Array<
  Resource & { featureRequest: true }
> = [
  {
    id: "templates",
    title: "Mes Templates",
    description:
      "Récupère toutes mes templates et ressources pour automatiser ton business",
    longDescription:
      "Une collection complète de templates et de ressources pour automatiser ton business. Ces templates sont conçus pour t'aider à gagner du temps et à optimiser tes processus. Ils sont faciles à utiliser et à adapter à tes besoins spécifiques.",
    image: "/images/icons/folder.png",
    tags: ["N8N", "Airtable", "Notion"],
    price: "Gratuit",
    downloadLink: "/resources/templates",
    gallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    metadata: {
      createdAt: "2025-01-10T00:00:00.000Z",
      updatedAt: "2025-01-20T00:00:00.000Z",
      featured: true,
      status: "published",
      downloadCount: 0,
    },
    featureRequest: true,
  },
  {
    id: "ghost-writer",
    title: "TON GHOST WRITER LINKEDIN",
    description: "Automatise la rédaction de tes posts LinkedIn",
    longDescription:
      "Un outil puissant qui utilise l'IA pour automatiser la rédaction de tes posts LinkedIn. Il te permet de créer du contenu engageant et professionnel en quelques clics. Plus besoin de passer des heures à réfléchir à quoi écrire, laisse l'IA faire le travail pour toi.",
    image: "/images/icons/card.png",
    tags: ["IA", "LinkedIn"],
    price: "29€",
    downloadLink: "/resources/ghost-writer",
    gallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    metadata: {
      createdAt: "2025-01-12T00:00:00.000Z",
      updatedAt: "2025-01-20T00:00:00.000Z",
      featured: true,
      status: "published",
      downloadCount: 0,
    },
    featureRequest: true,
  },
  {
    id: "workflow-client",
    title: "Workflow Automatisé Client",
    description: "Automatise l'onboarding de tes clients",
    longDescription:
      "Un workflow complet pour automatiser l'onboarding de tes nouveaux clients. De la signature du contrat à la première réunion, tout est automatisé pour une expérience client optimale.",
    image: "/images/icons/grow-coin.png",
    tags: ["N8N", "Freelance"],
    price: "49€",
    downloadLink: "/resources/workflow-client",
    gallery: ["/placeholder.svg?height=200&width=300"],
    metadata: {
      createdAt: "2025-01-08T00:00:00.000Z",
      updatedAt: "2025-01-20T00:00:00.000Z",
      featured: false,
      status: "published",
      downloadCount: 0,
    },
    featureRequest: true,
  },
  {
    id: "dashboard",
    title: "Dashboard Freelance",
    description: "Template de dashboard pour suivre ton activité",
    longDescription:
      "Un dashboard complet dans Notion pour suivre ton activité de freelance. Suivi des projets, facturation, planning, tout y est pour une gestion optimale de ton business.",
    image: "/images/icons/folder.png",
    tags: ["Notion", "Freelance"],
    price: "39€",
    downloadLink: "/resources/dashboard",
    gallery: ["/placeholder.svg?height=200&width=300"],
    metadata: {
      createdAt: "2025-01-06T00:00:00.000Z",
      updatedAt: "2025-01-20T00:00:00.000Z",
      featured: false,
      status: "published",
      downloadCount: 0,
    },
    featureRequest: true,
  },
  {
    id: "api-connector",
    title: "Connecteur API Universel",
    description: "Connecte n'importe quelle API à tes outils",
    longDescription:
      "Un connecteur universel qui te permet de connecter n'importe quelle API à tes outils favoris. Plus besoin de développer des intégrations custom, ce connecteur s'occupe de tout.",
    image: "/images/icons/card.png",
    tags: ["N8N", "API"],
    price: "69€",
    downloadLink: "/resources/api-connector",
    gallery: ["/placeholder.svg?height=200&width=300"],
    metadata: {
      createdAt: "2025-01-04T00:00:00.000Z",
      updatedAt: "2025-01-20T00:00:00.000Z",
      featured: false,
      status: "published",
      downloadCount: 0,
    },
    featureRequest: true,
  },
];
