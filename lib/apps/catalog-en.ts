import type { AppCatalog } from "./types";

const catalogEn: AppCatalog = {
  presi: {
    tagline: "Understand political speeches, one video at a time.",
    description: "Presi brings political speeches into a vertical video feed, with AI-supported context to help people form an informed view.",
    problem: "Political clips move quickly, while finding the context behind a claim takes time.",
    solution: "A video feed pairs clips with AI-supported context and analysis cards, giving viewers room to examine what was said.",
    role: "I lead the product and build the app, from shaping its use cases to its mobile journeys.",
    releaseNote: "Planned for early October 2026.",
    cardImage: {
      src: "/apps/presi/video-rail.webp",
      alt: "Presi pairs a political video with its transcript and context cards.",
      caption: "A video with references to its context.",
      objectPosition: "top",
    },
    screenshots: [
      { src: "/apps/presi/video-rail.webp", alt: "A Presi screen brings together a video, its transcript and analysis cards.", caption: "The video, its transcript and context cards." },
      { src: "/apps/presi/feed-card.webp", alt: "The Presi feed pairs a speech excerpt with a context card.", caption: "A political excerpt with context to help examine it." },
    ],
  },
  bandaa: {
    tagline: "Bring guests’ photos together in one shared album.",
    description: "Bandaa gathers guests’ photos, keeps events moving with personalized missions, and brings everyone’s contributions into a shared album.",
    problem: "Photos end up scattered across guests’ phones, and it is not always clear how to join in.",
    solution: "One shared space collects everyone’s photos. Personalized missions give guests an easy way to take part and build a collective album.",
    role: "I shape and build the product, then publish and evolve it on iOS and Android.",
    releaseNote: "Published in September 2026.",
    cardImage: {
      src: "/apps/bandaa/guest-feed.webp",
      alt: "Guests use Bandaa to capture a moment together.",
      caption: "Guests share their photos during the event.",
    },
    demoVideo: {
      src: "/apps/bandaa/demo-en.mp4",
      poster: "/apps/bandaa/cover-en.webp",
      alt: "Bandaa product video, from photo missions to the shared book.",
      title: "The best memories are made together.",
      caption: "The demo follows the product journey: start a mission, collect guests’ photos and bring their moments together in one book.",
    },
    screenshots: [
      { src: "/apps/bandaa/guest-feed.webp", alt: "Bandaa’s feed shows photos added by event guests.", caption: "Guests’ photos appear in a shared feed." },
      { src: "/apps/bandaa/shared-album.webp", alt: "A Bandaa album brings together photos from several guests.", caption: "Guest contributions come together in one album." },
    ],
  },
  "be-viral-ai": {
    tagline: "Understand TikTok performance and find your next idea.",
    description: "Be Viral AI helps TikTok creators understand how their content performs, spot patterns in their voice, and draft data-informed scripts.",
    problem: "Views alone do not explain why a video worked or what to try next.",
    solution: "Video analysis surfaces performance and style patterns. A script editor helps turn those ideas into content that still sounds like its creator.",
    role: "I design and build the app, from video analysis journeys to writing tools.",
    releaseNote: "Available on the App Store since August 2025.",
    cardImage: {
      src: "/apps/be-viral-ai/cover.webp",
      alt: "Be Viral AI connects performance analysis with concrete next steps for a creator.",
      caption: "Video analysis leads to practical next steps.",
      objectPosition: "top",
    },
    demoVideo: {
      src: "/apps/be-viral-ai/demo.mp4",
      poster: "/apps/be-viral-ai/cover.webp",
      alt: "Be Viral AI overview: performance analysis, coaching and creation tools.",
      title: "From analysis to the next script.",
      caption: "The video follows the working loop: understand what holds an audience’s attention, then turn those observations into content to try.",
    },
    screenshots: [
      { src: "/apps/be-viral-ai/performance-coach.webp", alt: "Be Viral AI shows a TikTok video analysis with creator coaching.", caption: "The coach connects performance observations to practical next steps." },
      { src: "/apps/be-viral-ai/script-editor.webp", alt: "Be Viral AI’s editor organizes a TikTok script into a hook and body.", caption: "A script is laid out as a hook followed by its main points." },
    ],
  },
};

export default catalogEn;
