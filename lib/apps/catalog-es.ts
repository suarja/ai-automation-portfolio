import type { AppCatalog } from "./types";

const catalogEs: AppCatalog = {
  presi: {
    tagline: "Entender los discursos políticos, vídeo a vídeo.",
    description: "Presi reúne discursos políticos en un feed vertical de vídeos y añade contexto con ayuda de la IA para formar una opinión informada.",
    problem: "Los fragmentos políticos circulan rápido, pero encontrar el contexto de una afirmación lleva tiempo.",
    solution: "Un feed de vídeos combina los fragmentos con tarjetas de contexto y análisis asistidos por IA para examinar lo que se ha dicho.",
    role: "Llevo el producto y desarrollo la aplicación, desde definir sus usos hasta los recorridos móviles.",
    releaseNote: "Lanzamiento previsto para principios de octubre de 2026.",
    screenshots: [
      { src: "/apps/presi/political-video.webp", alt: "Un fragmento de un discurso político en el feed vertical de vídeos de Presi.", caption: "Un fragmento político en el feed de vídeos de Presi." },
      { src: "/apps/presi/analysis-card.webp", alt: "Una tarjeta de Presi muestra una cita política y una nota de contexto.", caption: "Una tarjeta de análisis añade contexto al fragmento." },
    ],
  },
  bandaa: {
    tagline: "Reúne las fotos de los invitados en un álbum compartido.",
    description: "Bandaa reúne las fotos de los invitados, anima el evento con misiones personalizadas y junta las aportaciones en un álbum común.",
    problem: "Las fotos se quedan dispersas en los móviles y no siempre está claro cómo participar.",
    solution: "Un espacio común reúne las fotos de todos. Las misiones personalizadas ofrecen a los invitados una forma sencilla de participar y crear un álbum colectivo.",
    role: "Diseño y desarrollo el producto, y después lo publico y mantengo en iOS y Android.",
    releaseNote: "Publicada en septiembre de 2026.",
    screenshots: [
      { src: "/apps/bandaa/guest-feed.webp", alt: "El feed de Bandaa muestra las fotos que añaden los invitados a un evento.", caption: "Las fotos de los invitados aparecen en un feed compartido." },
      { src: "/apps/bandaa/shared-album.webp", alt: "Un álbum de Bandaa reúne fotos de varios invitados.", caption: "Las aportaciones de los invitados se reúnen en un álbum." },
    ],
  },
  "be-viral-ai": {
    tagline: "Entender el rendimiento en TikTok y encontrar la próxima idea.",
    description: "Be Viral AI ayuda a los creadores de TikTok a entender el rendimiento de su contenido, reconocer patrones de su estilo y redactar guiones basados en datos.",
    problem: "Las visualizaciones por sí solas no explican por qué funcionó un vídeo ni qué probar después.",
    solution: "El análisis de vídeo destaca patrones de rendimiento y estilo. Un editor de guiones ayuda a convertir esas ideas en contenido que conserva la voz del creador.",
    role: "Diseño y desarrollo la aplicación, desde el análisis de vídeo hasta las herramientas de escritura.",
    releaseNote: "Disponible en la App Store desde agosto de 2025.",
    screenshots: [
      { src: "/apps/be-viral-ai/performance-coach.webp", alt: "Be Viral AI muestra un análisis de un vídeo de TikTok con consejos para creadores.", caption: "El coach convierte observaciones de rendimiento en próximos pasos concretos." },
      { src: "/apps/be-viral-ai/script-editor.webp", alt: "El editor de Be Viral AI organiza un guion de TikTok en gancho y desarrollo.", caption: "Un guion se organiza en gancho y desarrollo." },
    ],
  },
};

export default catalogEs;
