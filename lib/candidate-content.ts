import type { WorkItem } from "@/lib/data/work";

export type CandidateLocale = "fr" | "en" | "es";

export const CANDIDATE_LOCALES: CandidateLocale[] = ["fr", "en", "es"];

export interface CandidateContent {
  profile: {
    headline: string;
    promise: string;
    details: string;
    avatarAlt: string;
  };
  home: {
    workTitle: string;
    workIntro: string;
    approachTitle: string;
    aboutLink: string;
    contactTitle: string;
    contactText: string;
    contactLink: string;
  };
  about: {
    title: string;
    intro: string;
    productTitle: string;
    productText: string;
    backgroundTitle: string;
    backgroundText: string;
    careerTitle: string;
    career: string[];
    languagesTitle: string;
    languages: string[];
    personalTitle: string;
    personalText: string;
    stackTitle: string;
    stack: string[];
    aiTitle: string;
    ai: string[];
  };
  work: WorkItem[];
}

export const CANDIDATE_CONTENT: Record<CandidateLocale, CandidateContent> = {
  fr: {
    profile: {
      headline: "Développeur full-stack · PHP / Symfony · React",
      promise: "Je prends en charge les produits que je construis, du besoin à la mise en production.",
      details: "Île-de-France · français et espagnol natifs · anglais C1",
      avatarAlt: "Portrait de Jason Suárez",
    },
    home: {
      workTitle: "Produits et responsabilités",
      workIntro:
        "Chez C'CIN, je suis référent de deux outils internes. En parallèle, je construis et publie mes propres apps. Elles répondent à des usages différents, mais je les aborde avec la même question : qu'est-ce que la personne essaie de faire ?",
      approachTitle: "Ce qui m'intéresse dans un produit",
      aboutLink: "Mon parcours et ce qui me guide",
      contactTitle: "Vous cherchez quelqu'un pour prendre un produit en main ?",
      contactText:
        "Je cherche une équipe où je peux comprendre un besoin, prendre en charge sa réponse et rester près du produit après sa mise en ligne.",
      contactLink: "Écrivez-moi",
    },
    about: {
      title: "À propos",
      intro:
        "J'aime comprendre le problème avant de commencer à construire. Une fois le produit en ligne, je veux rester responsable de la suite.",
      productTitle: "Du besoin au produit",
      productText:
        "Chez C'CIN, je suis référent de deux outils internes. J'ai repris le dashboard en cours de route, ajouté des modules, renforcé sa sécurité et suivi sa mise en production. Sur l'outil de gestion du parc, j'ai développé l'essentiel et j'en assure la maintenance. En parallèle, je construis et publie mes propres applications.",
      backgroundTitle: "Les langues que je parle",
      backgroundText:
        "Je suis né en République dominicaine et arrivé en France à dix ans. J'ai vécu à Barcelone, Murcie et Madrid. Le français et l'espagnol sont mes langues maternelles ; je travaille aussi en anglais (C1).",
      careerTitle: "Le chemin jusqu'au développement",
      career: [
        "En 2020, j'obtiens le CAPES d'espagnol. J'enseigne jusqu'en février 2025.",
        "En 2022, je commence à apprendre le développement web en parallèle de mon métier.",
        "De 2024 à 2025, je suis développeur front-end chez JustGains. Je suis le seul développeur front de l'équipe pendant un an.",
        "Depuis septembre 2025, je travaille en full-stack chez C'CIN et je continue à développer mes propres apps.",
      ],
      languagesTitle: "Langues",
      languages: [
        "Français, langue maternelle",
        "Espagnol, langue maternelle",
        "Anglais, niveau C1",
      ],
      personalTitle: "En dehors du travail",
      personalText:
        "Je retourne en République dominicaine dès que je peux, souvent pour faire du kitesurf. Je danse aussi la salsa, la bachata et la kizomba.",
      stackTitle: "Outils que j'utilise",
      stack: [
        "PHP 8.3",
        "Symfony 7",
        "React",
        "TypeScript",
        "React Native",
        "Expo",
        "Convex",
        "PostgreSQL",
        "MySQL",
        "Docker",
        "GitLab CI/CD",
      ],
      aiTitle: "Ma façon de travailler avec l'IA",
      ai: [
        "J'utilise Codex et Claude Code pour explorer une base de code, prototyper et tester.",
        "Je relis le code généré et j'assume les choix d'architecture.",
        "Je partage mes essais et retours sur les outils d'IA sur TikTok et YouTube (@swarecito).",
      ],
    },
    work: [
      {
        id: "ccin",
        title: "C'CIN, Chartres",
        role: "Développeur full-stack",
        period: "Depuis septembre 2025",
        context:
          "Deux outils internes utilisés par plusieurs équipes chez un opérateur télécom qui accompagne environ 2 000 entreprises.",
        highlights: [
          "J'ai repris le dashboard en cours de route. Il rassemble les informations clients, les e-mails, les tickets et les interventions de plusieurs outils métier. J'ai ajouté des modules, renforcé la sécurité et accompagné sa mise en production.",
          "J'ai développé l'essentiel de l'outil de gestion du parc, que je maintiens. Il suit les équipements de leur acquisition à leur mise au rebut.",
        ],
        stack: [
          "PHP 8.3",
          "Symfony 7",
          "Doctrine",
          "API REST",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Docker Compose",
          "GitLab CI/CD",
        ],
        links: [{ label: "C'CIN", href: "https://www.ccin.fr/" }],
      },
      {
        id: "independent-products",
        title: "Produits mobiles indépendants",
        role: "Entrepreneur et développeur d'applications mobiles",
        period: "Depuis août 2025",
        context:
          "Je construis et publie ces apps moi-même. Elles répondent à des besoins différents et utilisent la même stack mobile.",
        highlights: [
          "Presi est un fil vidéo vertical où l'IA aide à décoder les discours politiques et à se faire un avis éclairé. Lancement prévu début octobre 2026.",
          "Bandaa centralise les photos des invités, anime l'événement avec des missions personnalisées et rassemble les contributions dans un album commun. Publiée en septembre 2026.",
          "Be Viral AI aide les créateurs TikTok à comprendre les performances de leurs contenus et à écrire des scripts qui leur ressemblent. App Store, août 2025.",
        ],
        stack: ["React Native", "Expo", "TypeScript", "Convex"],
        links: [{ label: "Découvrir les applications", href: "/apps" }],
      },
      {
        id: "justgains",
        title: "JustGains, Paris",
        role: "Développeur front-end React / Next.js",
        period: "Août 2024 à août 2025",
        context: "Startup fitness de cinq personnes, au sein d'une équipe produit.",
        highlights: [
          "Seul développeur front-end de l'équipe pendant douze mois, j'ai conçu et livré le builder de programmes d'entraînement personnalisés, l'interface la plus complexe de l'application.",
          "J'ai aussi amélioré les performances du produit et transformé les maquettes Figma en composants React réutilisables.",
        ],
        stack: ["React", "TypeScript", "Next.js", "Figma"],
      },
      {
        id: "gites-mon-tresor",
        title: "Gîtes Mon Trésor, Guadeloupe",
        role: "Développeur web",
        period: "Janvier à avril 2023",
        context:
          "Refonte du site sous Next.js et TypeScript, avec une page d'accueil pensée pour convertir. Les visites ont triplé en trois mois.",
        highlights: [],
        stack: ["Next.js", "TypeScript"],
        links: [
          {
            label: "Voir le site",
            href: "https://gites-mon-tresor-guadeloupe.com/",
          },
        ],
      },
    ],
  },
  en: {
    profile: {
      headline: "Full-stack developer · PHP / Symfony · React",
      promise: "I own what I build, from the initial need through to production.",
      details: "Paris area · native French and Spanish · English C1",
      avatarAlt: "Portrait of Jason Suárez",
    },
    home: {
      workTitle: "Products and ownership",
      workIntro:
        "At C'CIN, I own two internal tools. Alongside that work, I build and ship my own apps. They solve different problems, but I start with the same question: what is someone trying to do?",
      approachTitle: "What I look for in a product",
      aboutLink: "My background and what drives me",
      contactTitle: "Looking for someone to own a product?",
      contactText:
        "I'm looking for a team where I can understand a need, own the response and stay close to the product after it ships.",
      contactLink: "Write to me",
    },
    about: {
      title: "About",
      intro:
        "I like understanding the problem before I start building. Once the product is live, I want to stay accountable for what comes next.",
      productTitle: "From need to product",
      productText:
        "At C'CIN, I own two internal tools. I took over the dashboard mid-project, added modules, strengthened its security and saw its rollout through. I built most of the asset inventory app and still maintain it. Alongside that work, I build and ship my own apps.",
      backgroundTitle: "The languages I speak",
      backgroundText:
        "I was born in the Dominican Republic and moved to France at ten. I've lived in Barcelona, Murcia and Madrid. French and Spanish are my native languages; I also work in English (C1).",
      careerTitle: "How I got into development",
      career: [
        "In 2020, I earned my Spanish teaching certification. I taught until February 2025.",
        "In 2022, I started learning web development alongside that work.",
        "From 2024 to 2025, I was a front-end developer at JustGains and the team's only front-end developer for a year.",
        "Since September 2025, I've worked full-stack at C'CIN and continued building my own mobile apps.",
      ],
      languagesTitle: "Languages",
      languages: [
        "French, native",
        "Spanish, native",
        "English, C1",
      ],
      personalTitle: "Outside work",
      personalText:
        "I go back to the Dominican Republic whenever I can, usually to kitesurf. I also dance salsa, bachata and kizomba.",
      stackTitle: "Tools I use",
      stack: [
        "PHP 8.3",
        "Symfony 7",
        "React",
        "TypeScript",
        "React Native",
        "Expo",
        "Convex",
        "PostgreSQL",
        "MySQL",
        "Docker",
        "GitLab CI/CD",
      ],
      aiTitle: "How I work with AI",
      ai: [
        "I use Codex and Claude Code to explore codebases, prototype and test.",
        "I review generated code and own the architecture decisions.",
        "I share what I learn about AI tools on TikTok and YouTube (@swarecito).",
      ],
    },
    work: [
      {
        id: "ccin",
        title: "C'CIN, Chartres",
        role: "Full-stack developer",
        period: "Since September 2025",
        context:
          "Two internal tools used by several teams at a telecom operator serving around 2,000 businesses.",
        highlights: [
          "I took over the dashboard mid-project. It brings together customer records, email, tickets and field interventions from several business tools. I added modules, strengthened security and saw its rollout through.",
          "I built most of the asset inventory app and still maintain it. It tracks equipment from acquisition until it is retired.",
        ],
        stack: [
          "PHP 8.3",
          "Symfony 7",
          "Doctrine",
          "REST APIs",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Docker Compose",
          "GitLab CI/CD",
        ],
        links: [{ label: "C'CIN", href: "https://www.ccin.fr/" }],
      },
      {
        id: "independent-products",
        title: "Independent mobile products",
        role: "Founder and mobile app developer",
        period: "Since August 2025",
        context:
          "I build and ship these apps myself. They address different needs and share one mobile stack.",
        highlights: [
          "Presi is a vertical video feed that uses AI to help people decode political speeches and form an informed view. Launch planned for early October 2026.",
          "Bandaa brings guests' photos together, adds personalized missions to an event and turns their contributions into a shared album. Published in September 2026.",
          "Be Viral AI helps TikTok creators understand how their content performs and write scripts that sound like them. App Store, August 2025.",
        ],
        stack: ["React Native", "Expo", "TypeScript", "Convex"],
        links: [{ label: "Explore the apps", href: "/en/apps" }],
      },
      {
        id: "justgains",
        title: "JustGains, Paris",
        role: "Front-end developer, React / Next.js",
        period: "August 2024 to August 2025",
        context: "Fitness startup · five-person product team.",
        highlights: [
          "As the team's only front-end developer for 12 months, I designed and shipped the personalized training-plan builder, the app's most complex interface.",
          "I also improved product performance and turned Figma designs into reusable React components.",
        ],
        stack: ["React", "TypeScript", "Next.js", "Figma"],
      },
      {
        id: "gites-mon-tresor",
        title: "Gîtes Mon Trésor, Guadeloupe",
        role: "Web developer",
        period: "January to April 2023",
        context:
          "Rebuilt the site in Next.js and TypeScript, including a conversion-focused home page. Visits tripled in three months.",
        highlights: [],
        stack: ["Next.js", "TypeScript"],
        links: [
          {
            label: "Visit the site",
            href: "https://gites-mon-tresor-guadeloupe.com/",
          },
        ],
      },
    ],
  },
  es: {
    profile: {
      headline: "Desarrollador full stack · PHP / Symfony · React",
      promise: "Me hago cargo de lo que construyo, desde la necesidad hasta que está en producción.",
      details: "Región de París · francés y español nativos · inglés C1",
      avatarAlt: "Retrato de Jason Suárez",
    },
    home: {
      workTitle: "Productos y responsabilidades",
      workIntro:
        "En C'CIN soy responsable de dos herramientas internas. Además, construyo y publico mis propias aplicaciones. Resuelven problemas distintos, pero siempre empiezo por la misma pregunta: ¿qué intenta hacer la persona que las usa?",
      approachTitle: "Lo que busco en un producto",
      aboutLink: "Mi recorrido y lo que me mueve",
      contactTitle: "¿Buscáis a alguien que se haga cargo de un producto?",
      contactText:
        "Busco un equipo donde pueda entender una necesidad, hacerme cargo de la solución y seguir cerca del producto después de lanzarlo.",
      contactLink: "Escríbeme",
    },
    about: {
      title: "Sobre mí",
      intro:
        "Me gusta entender el problema antes de empezar a construir. Cuando el producto ya está en marcha, quiero seguir haciéndome responsable de lo que viene después.",
      productTitle: "De la necesidad al producto",
      productText:
        "En C'CIN soy responsable de dos herramientas internas. Retomé el dashboard a mitad de camino, añadí módulos, reforcé su seguridad y acompañé su puesta en producción. Desarrollé la mayor parte de la herramienta de inventario y sigo manteniéndola. Además, construyo y publico mis propias aplicaciones.",
      backgroundTitle: "Los idiomas que hablo",
      backgroundText:
        "Nací en República Dominicana y llegué a Francia con diez años. He vivido en Barcelona, Murcia y Madrid. El francés y el español son mis lenguas maternas; también trabajo en inglés (C1).",
      careerTitle: "Cómo llegué al desarrollo",
      career: [
        "En 2020 obtuve el CAPES de español. Di clases hasta febrero de 2025.",
        "En 2022 empecé a aprender desarrollo web mientras trabajaba como profesor.",
        "De 2024 a 2025 trabajé como desarrollador front-end en JustGains. Fui el único desarrollador front-end del equipo durante un año.",
        "Desde septiembre de 2025 trabajo full stack en C'CIN y sigo desarrollando mis propias aplicaciones.",
      ],
      languagesTitle: "Idiomas",
      languages: [
        "Francés, nativo",
        "Español, nativo",
        "Inglés, nivel C1",
      ],
      personalTitle: "Fuera del trabajo",
      personalText:
        "Vuelvo a República Dominicana siempre que puedo, casi siempre para hacer kitesurf. También bailo salsa, bachata y kizomba.",
      stackTitle: "Herramientas que utilizo",
      stack: [
        "PHP 8.3",
        "Symfony 7",
        "React",
        "TypeScript",
        "React Native",
        "Expo",
        "Convex",
        "PostgreSQL",
        "MySQL",
        "Docker",
        "GitLab CI/CD",
      ],
      aiTitle: "Cómo trabajo con IA",
      ai: [
        "Utilizo Codex y Claude Code para explorar bases de código, crear prototipos y probar.",
        "Reviso el código generado y asumo las decisiones de arquitectura.",
        "Comparto lo que aprendo sobre herramientas de IA en TikTok y YouTube (@swarecito).",
      ],
    },
    work: [
      {
        id: "ccin",
        title: "C'CIN, Chartres",
        role: "Desarrollador full stack",
        period: "Desde septiembre de 2025",
        context:
          "Dos herramientas internas para varios equipos de un operador de telecomunicaciones que atiende a unas 2.000 empresas.",
        highlights: [
          "Retomé el dashboard a mitad del proyecto. Reúne datos de clientes, correos, incidencias e intervenciones de varias herramientas. Añadí módulos, reforcé la seguridad y acompañé su puesta en producción.",
          "Desarrollé la mayor parte de la herramienta de inventario y sigo manteniéndola. Permite seguir los equipos desde su adquisición hasta que se dan de baja.",
        ],
        stack: [
          "PHP 8.3",
          "Symfony 7",
          "Doctrine",
          "API REST",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Docker Compose",
          "GitLab CI/CD",
        ],
        links: [{ label: "C'CIN", href: "https://www.ccin.fr/" }],
      },
      {
        id: "independent-products",
        title: "Productos móviles independientes",
        role: "Fundador y desarrollador de aplicaciones móviles",
        period: "Desde agosto de 2025",
        context:
          "Construyo y publico estas apps yo mismo. Responden a necesidades distintas y comparten la misma tecnología móvil.",
        highlights: [
          "Presi es un feed vertical de vídeos donde la IA ayuda a descifrar los discursos políticos y formarse una opinión informada. Lanzamiento previsto para principios de octubre de 2026.",
          "Bandaa reúne las fotos de los invitados, anima el evento con misiones personalizadas y convierte sus aportaciones en un álbum compartido. Publicada en septiembre de 2026.",
          "Be Viral AI ayuda a creadores de TikTok a entender el rendimiento de sus contenidos y escribir guiones que suenen a ellos. App Store, agosto de 2025.",
        ],
        stack: ["React Native", "Expo", "TypeScript", "Convex"],
        links: [{ label: "Descubrir las aplicaciones", href: "/es/apps" }],
      },
      {
        id: "justgains",
        title: "JustGains, París",
        role: "Desarrollador front-end React / Next.js",
        period: "Agosto de 2024 a agosto de 2025",
        context: "Startup de fitness · equipo de producto de cinco personas.",
        highlights: [
          "Fui el único desarrollador front-end del equipo durante doce meses. Diseñé y entregué el creador de planes de entrenamiento personalizados, la interfaz más compleja de la aplicación.",
          "También mejoré el rendimiento del producto y convertí los diseños de Figma en componentes React reutilizables.",
        ],
        stack: ["React", "TypeScript", "Next.js", "Figma"],
      },
      {
        id: "gites-mon-tresor",
        title: "Gîtes Mon Trésor, Guadalupe",
        role: "Desarrollador web",
        period: "Enero a abril de 2023",
        context:
          "Renovación del sitio con Next.js y TypeScript, incluida una página de inicio centrada en la conversión. Las visitas se triplicaron en tres meses.",
        highlights: [],
        stack: ["Next.js", "TypeScript"],
        links: [
          {
            label: "Visitar el sitio",
            href: "https://gites-mon-tresor-guadeloupe.com/",
          },
        ],
      },
    ],
  },
};

export function getCandidateContent(locale: CandidateLocale): CandidateContent {
  return CANDIDATE_CONTENT[locale];
}

export function isCandidateLocale(locale: string): locale is CandidateLocale {
  return CANDIDATE_LOCALES.includes(locale as CandidateLocale);
}

export function getCandidateHomePath(locale: CandidateLocale): string {
  return locale === "fr" ? "/" : "/" + locale;
}

export function getCandidateAboutPath(locale: CandidateLocale): string {
  return locale === "fr" ? "/about" : "/" + locale + "/about";
}
