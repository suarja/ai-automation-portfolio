import type { AppCatalog } from "./types";

const catalogFr: AppCatalog = {
  presi: {
    tagline: "Comprendre les discours politiques, vidéo après vidéo.",
    description: "Presi rassemble des discours politiques dans un fil vidéo vertical et ajoute des repères assistés par l’IA pour aider chacun à se faire un avis éclairé.",
    problem: "Les extraits politiques circulent vite, mais retrouver le contexte d’une affirmation demande du temps.",
    solution: "Un fil vidéo associe les extraits à des cartes de contexte et d’analyse assistées par l’IA, pour prendre le temps d’examiner les propos.",
    role: "Je porte le produit et développe l’application, du cadrage des usages aux parcours mobiles.",
    releaseNote: "Lancement prévu début octobre 2026.",
    screenshots: [
      { src: "/apps/presi/political-video.webp", alt: "Un extrait de discours politique dans le fil vidéo vertical de Presi.", caption: "Un extrait politique dans le fil vidéo de Presi." },
      { src: "/apps/presi/analysis-card.webp", alt: "Une carte Presi présente une citation politique et un repère de contexte.", caption: "Une carte d’analyse accompagne l’extrait d’un repère de contexte." },
    ],
  },
  bandaa: {
    tagline: "Des photos des invités à un album partagé.",
    description: "Bandaa rassemble les photos des invités, anime l’événement avec des missions personnalisées et réunit les contributions dans un album commun.",
    problem: "Les photos restent dispersées sur les téléphones, et tout le monde ne sait pas toujours comment participer.",
    solution: "Un espace commun rassemble les photos de chacun. Des missions personnalisées donnent aux invités une façon simple de prendre part à l’événement et de créer un album collectif.",
    role: "Je conçois et développe le produit, puis je le publie et le fais évoluer sur iOS et Android.",
    releaseNote: "Publiée en septembre 2026.",
    screenshots: [
      { src: "/apps/bandaa/guest-feed.webp", alt: "Le fil Bandaa affiche les photos ajoutées par les invités d’un événement.", caption: "Les photos des invités défilent dans un fil partagé." },
      { src: "/apps/bandaa/shared-album.webp", alt: "Un album Bandaa rassemble des photos prises par plusieurs invités.", caption: "Les contributions prennent place dans un album commun." },
    ],
  },
  "be-viral-ai": {
    tagline: "Comprendre ses vidéos TikTok et trouver la suite.",
    description: "Be Viral AI aide les créateurs TikTok à comprendre les performances de leurs contenus, repérer ce qui leur ressemble et écrire des scripts nourris par les données.",
    problem: "Les vues seules n’expliquent pas pourquoi une vidéo a fonctionné ni quoi essayer ensuite.",
    solution: "L’analyse des vidéos fait ressortir des pistes de performance et de style. Un éditeur de scripts aide ensuite à transformer ces idées en contenu qui garde la voix du créateur.",
    role: "Je conçois et développe l’application, du parcours d’analyse aux outils d’écriture.",
    releaseNote: "Publiée sur l’App Store en août 2025.",
    screenshots: [
      { src: "/apps/be-viral-ai/performance-coach.webp", alt: "L’écran Be Viral AI présente une analyse de vidéo TikTok et des conseils de coaching.", caption: "Le coach relie des observations de performance à des pistes concrètes." },
      { src: "/apps/be-viral-ai/script-editor.webp", alt: "L’éditeur Be Viral AI organise un script TikTok en accroche et en développement.", caption: "Un script est structuré en accroche et en développement." },
    ],
  },
};

export default catalogFr;
