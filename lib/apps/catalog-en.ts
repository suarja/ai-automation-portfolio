import type { AppCatalog } from "./types";

const catalogEn: AppCatalog = {
  presi: {
    tagline: "Understand political speeches, one video at a time.",
    description: "Presi brings political speeches into a vertical video feed, with AI-supported context to help people form an informed view.",
    problem: "Political clips move quickly, while finding the context behind a claim takes time.",
    solution: "A video feed pairs clips with AI-supported context and analysis cards, giving viewers room to examine what was said.",
    role: "I lead the product and build the app, from shaping its use cases to its mobile journeys.",
    releaseNote: "Planned for early October 2026.",
    screenshots: [
      { src: "/apps/presi/political-video.png", alt: "A political speech clip in Presi’s vertical video feed.", caption: "A political clip in Presi’s video feed." },
      { src: "/apps/presi/analysis-card.png", alt: "A Presi card shows a political quote with a contextual note.", caption: "An analysis card adds context to a speech clip." },
    ],
  },
  bandaa: {
    tagline: "Bring guests’ photos together in one shared album.",
    description: "Bandaa gathers guests’ photos, keeps events moving with personalized missions, and brings everyone’s contributions into a shared album.",
    problem: "Photos end up scattered across guests’ phones, and it is not always clear how to join in.",
    solution: "One shared space collects everyone’s photos. Personalized missions give guests an easy way to take part and build a collective album.",
    role: "I shape and build the product, then publish and evolve it on iOS and Android.",
    releaseNote: "Published in September 2026.",
    screenshots: [
      { src: "/apps/bandaa/guest-feed.png", alt: "Bandaa’s feed shows photos added by event guests.", caption: "Guests’ photos appear in a shared feed." },
      { src: "/apps/bandaa/shared-album.png", alt: "A Bandaa album brings together photos from several guests.", caption: "Guest contributions come together in one album." },
    ],
  },
  "be-viral-ai": {
    tagline: "Understand TikTok performance and find your next idea.",
    description: "Be Viral AI helps TikTok creators understand how their content performs, spot patterns in their voice, and draft data-informed scripts.",
    problem: "Views alone do not explain why a video worked or what to try next.",
    solution: "Video analysis surfaces performance and style patterns. A script editor helps turn those ideas into content that still sounds like its creator.",
    role: "I design and build the app, from video analysis journeys to writing tools.",
    releaseNote: "Available on the App Store since August 2025.",
    screenshots: [
      { src: "/apps/be-viral-ai/performance-coach.png", alt: "Be Viral AI shows a TikTok video analysis with creator coaching.", caption: "The coach connects performance observations to practical next steps." },
      { src: "/apps/be-viral-ai/script-editor.png", alt: "Be Viral AI’s editor organizes a TikTok script into a hook and body.", caption: "A script is laid out as a hook followed by its main points." },
    ],
  },
};

export default catalogEn;
