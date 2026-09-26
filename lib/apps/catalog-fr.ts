import type { AppCatalog } from "./types";

const catalogFr: AppCatalog = {
  presi: {
    tagline: "Comprendre les discours politiques, vidéo après vidéo.",
    description: "Presi rassemble des discours politiques dans un fil vidéo vertical et ajoute des repères assistés par l’IA pour aider chacun à se faire un avis éclairé.",
    problem: "Les extraits politiques circulent vite, mais retrouver le contexte d’une affirmation demande du temps.",
    solution: "Un fil vidéo associe les extraits à des cartes de contexte et d’analyse assistées par l’IA, pour prendre le temps d’examiner les propos.",
    role: "Je porte le produit et développe l’application, du cadrage des usages aux parcours mobiles.",
    releaseNote: "Lancement prévu début octobre 2026.",
    cardImage: {
      src: "/apps/presi/video-rail.webp",
      alt: "Presi associe une vidéo politique à sa transcription et à des cartes de contexte.",
      caption: "Une vidéo accompagnée de repères de contexte.",
      objectPosition: "top",
    },
    screenshots: [
      { src: "/apps/presi/video-rail.webp", alt: "Un écran Presi rassemble la vidéo, la transcription et plusieurs cartes d’analyse.", caption: "La vidéo, sa transcription et ses repères de contexte." },
      { src: "/apps/presi/feed-card.webp", alt: "Le fil Presi associe un extrait de discours à une carte de contexte.", caption: "Un extrait politique accompagné de repères pour l’examiner." },
    ],
  },
  bandaa: {
    tagline: "Des photos des invités à un album partagé.",
    description: "Bandaa rassemble les photos des invités, anime l’événement avec des missions personnalisées et réunit les contributions dans un album commun.",
    problem: "Les photos restent dispersées sur les téléphones, et tout le monde ne sait pas toujours comment participer.",
    solution: "Un espace commun rassemble les photos de chacun. Des missions personnalisées donnent aux invités une façon simple de prendre part à l’événement et de créer un album collectif.",
    role: "Je conçois et développe le produit, puis je le publie et le fais évoluer sur iOS et Android.",
    releaseNote: "Publiée en septembre 2026.",
    cardImage: {
      src: "/apps/bandaa/guest-feed.webp",
      alt: "Des invités utilisent Bandaa pour capturer un moment ensemble.",
      caption: "Les invités partagent leurs photos pendant l’événement.",
    },
    demoVideo: {
      src: "/apps/bandaa/demo-fr.mp4",
      poster: "/apps/bandaa/cover-fr.webp",
      alt: "Vidéo de présentation de Bandaa, des missions photo jusqu’au livre partagé.",
      title: "Les souvenirs se construisent à plusieurs.",
      caption: "La démo suit le fil du produit : lancer une mission, recueillir les photos des invités et retrouver leurs moments dans un livre commun.",
    },
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
    cardImage: {
      src: "/apps/be-viral-ai/cover.webp",
      alt: "Be Viral AI relie l’analyse des performances à des prochaines étapes pour le créateur.",
      caption: "L’analyse vidéo mène à des pistes d’action concrètes.",
      objectPosition: "top",
    },
    demoVideo: {
      src: "/apps/be-viral-ai/demo.mp4",
      poster: "/apps/be-viral-ai/cover.webp",
      alt: "Présentation de Be Viral AI : analyse des performances, coaching et outils de création.",
      title: "De l’analyse au prochain script.",
      caption: "La vidéo montre la boucle de travail : comprendre ce qui retient l’audience, puis transformer les observations en contenu à essayer.",
    },
    screenshots: [
      { src: "/apps/be-viral-ai/performance-coach.webp", alt: "L’écran Be Viral AI présente une analyse de vidéo TikTok et des conseils de coaching.", caption: "Le coach relie des observations de performance à des pistes concrètes." },
      { src: "/apps/be-viral-ai/script-editor.webp", alt: "L’éditeur Be Viral AI organise un script TikTok en accroche et en développement.", caption: "Un script est structuré en accroche et en développement." },
    ],
  },
};

export default catalogFr;
