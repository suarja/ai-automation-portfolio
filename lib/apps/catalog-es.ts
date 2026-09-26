import type { AppCatalog } from "./types";

const catalogEs: AppCatalog = {
  presi: {
    tagline: "Entender los discursos políticos, vídeo a vídeo.",
    description: "Presi reúne discursos políticos en un feed vertical de vídeos y añade contexto con ayuda de la IA para formar una opinión informada.",
    problem: "Los fragmentos políticos circulan rápido, pero encontrar el contexto de una afirmación lleva tiempo.",
    solution: "Un feed de vídeos combina los fragmentos con tarjetas de contexto y análisis asistidos por IA para examinar lo que se ha dicho.",
    role: "Llevo el producto y desarrollo la aplicación, desde definir sus usos hasta los recorridos móviles.",
    releaseNote: "Lanzamiento previsto para principios de octubre de 2026.",
    cardImage: {
      src: "/apps/presi/video-rail.webp",
      alt: "Presi une un vídeo político con su transcripción y tarjetas de contexto.",
      caption: "Un vídeo acompañado de referencias de contexto.",
      objectPosition: "top",
    },
    screenshots: [
      { src: "/apps/presi/video-rail.webp", alt: "Una pantalla de Presi reúne un vídeo, su transcripción y varias tarjetas de análisis.", caption: "El vídeo, su transcripción y las tarjetas de contexto." },
      { src: "/apps/presi/feed-card.webp", alt: "El feed de Presi combina un fragmento de discurso con una tarjeta de contexto.", caption: "Un fragmento político acompañado de contexto para examinarlo." },
    ],
  },
  bandaa: {
    tagline: "Reúne las fotos de los invitados en un álbum compartido.",
    description: "Bandaa reúne las fotos de los invitados, anima el evento con misiones personalizadas y junta las aportaciones en un álbum común.",
    problem: "Las fotos se quedan dispersas en los móviles y no siempre está claro cómo participar.",
    solution: "Un espacio común reúne las fotos de todos. Las misiones personalizadas ofrecen a los invitados una forma sencilla de participar y crear un álbum colectivo.",
    role: "Diseño y desarrollo el producto, y después lo publico y mantengo en iOS y Android.",
    releaseNote: "Publicada en septiembre de 2026.",
    cardImage: {
      src: "/apps/bandaa/guest-feed.webp",
      alt: "Los invitados usan Bandaa para capturar un momento juntos.",
      caption: "Los invitados comparten sus fotos durante el evento.",
    },
    demoVideo: {
      src: "/apps/bandaa/demo-es.mp4",
      poster: "/apps/bandaa/cover-es.webp",
      alt: "Vídeo de presentación de Bandaa: misiones de fotos y momentos compartidos.",
      title: "Los recuerdos se crean en compañía.",
      caption: "El vídeo muestra cómo una misión anima a participar y ayuda a reunir las fotos de todos en un álbum común.",
    },
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
    cardImage: {
      src: "/apps/be-viral-ai/cover.webp",
      alt: "Be Viral AI conecta el análisis de rendimiento con próximos pasos concretos para el creador.",
      caption: "El análisis de vídeo lleva a ideas de acción concretas.",
      objectPosition: "top",
    },
    demoVideo: {
      src: "/apps/be-viral-ai/demo.mp4",
      poster: "/apps/be-viral-ai/cover.webp",
      alt: "Presentación de Be Viral AI: análisis de rendimiento, coaching y herramientas de creación.",
      title: "Del análisis al siguiente guion.",
      caption: "El vídeo muestra el ciclo de trabajo: entender qué retiene a la audiencia y convertir esas observaciones en contenido para probar.",
    },
    screenshots: [
      { src: "/apps/be-viral-ai/performance-coach.webp", alt: "Be Viral AI muestra un análisis de un vídeo de TikTok con consejos para creadores.", caption: "El coach convierte observaciones de rendimiento en próximos pasos concretos." },
      { src: "/apps/be-viral-ai/script-editor.webp", alt: "El editor de Be Viral AI organiza un guion de TikTok en gancho y desarrollo.", caption: "Un guion se organiza en gancho y desarrollo." },
    ],
  },
};

export default catalogEs;
