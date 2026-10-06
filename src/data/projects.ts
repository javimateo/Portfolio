import type { Localized } from "@/i18n/config";

export type Project = {
  slug: string;
  title: string;
  eyebrow: Localized;
  description: Localized;
  bullets: Localized<string[]>;
  stack: string[];
  repoUrl?: string;
  // shown before the GitHub link; the first one is also where the preview links to
  links?: { label: Localized; href: string }[];
  media?: {
    // "browser" for web apps and APIs, "phone" for mobile apps
    frame: "browser" | "phone";
    // screenshots in public/projects; the first is the main one. A browser frame
    // crossfades to the second on hover; a phone frame with three shows a fanned trio
    images?: string[] | Localized<string[]>;
    // short muted clip that plays while the card is hovered (main screen only)
    video?: string;
    // renders a live widget instead of a screenshot
    live?: "terrace-weather";
  };
};

export const projects: Project[] = [
  {
    slug: "diaryo",
    title: "Diaryo",
    eyebrow: { es: "Proyecto personal · Windows y web", en: "Personal project · Windows & web" },
    description: {
      es: "Un diario infinito para tu PC: cada día es una doble página sin márgenes para escribir, dibujar, pegar post-its y unir ideas con flechas. Aparece sobre el escritorio con un atajo y también funciona en el navegador.",
      en: "An infinite diary for your PC: every day is a double page with no edges to write, draw, stick notes and connect ideas with arrows. It pops up over the desktop with a shortcut and also runs in the browser.",
    },
    bullets: {
      es: [
        "Motor de lienzo propio con Canvas 2D: lápiz, rotulador, texto, post-its, figuras y flechas que siguen unidas a lo que conectan",
        "App de escritorio con Tauri y Rust: diario flotante con Ctrl+Alt+D, icono en la bandeja, copias diarias y actualizaciones automáticas",
        "Nube opcional con cifrado de extremo a extremo: el servidor solo guarda datos ilegibles y se puede escribir sin conexión",
        "Español e inglés, tema claro y oscuro, y una versión web que también se usa con el dedo en el móvil",
      ],
      en: [
        "Custom Canvas 2D engine: pencil, highlighter, text, sticky notes, shapes and arrows that stay attached to what they connect",
        "Desktop app built with Tauri and Rust: a floating diary on Ctrl+Alt+D, tray icon, daily backups and automatic updates",
        "Optional end-to-end encrypted cloud: the server only stores unreadable data, and it keeps working offline",
        "English and Spanish, light and dark theme, and a web version that also works by touch on phones",
      ],
    },
    stack: ["TypeScript", "React", "Canvas 2D", "Tauri", "Rust", "Vite", "IndexedDB"],
    repoUrl: "https://github.com/javimateo/Diaryo",
    links: [
      { label: { es: "Web y descarga", en: "Website & download" }, href: "https://diaryo.javiermateo.dev/" },
      { label: { es: "Probar en el navegador", en: "Try it in the browser" }, href: "https://app.diaryo.javiermateo.dev/" },
    ],
    media: {
      frame: "browser",
      images: {
        es: ["/projects/diaryo/01-landing-es.webp", "/projects/diaryo/02-app.webp"],
        en: ["/projects/diaryo/01-landing-en.webp", "/projects/diaryo/02-app.webp"],
      },
    },
  },
  {
    slug: "beer-league",
    title: "Beer League",
    eyebrow: { es: "App social · Flutter", en: "Social app · Flutter" },
    description: {
      es: "App social en la que grupos de amigos compiten registrando sus consumiciones, con temporadas y torneos.",
      en: "A social app where groups of friends compete by logging their drinks, with seasons and tournaments.",
    },
    bullets: {
      es: [
        "Temporadas mensuales y torneos con multiplicadores de puntos",
        "Clasificación en directo de cada grupo de amigos",
        "Widget nativo de Android para consultar la clasificación",
      ],
      en: [
        "Monthly seasons and tournaments with point multipliers",
        "Live leaderboard for each group of friends",
        "Native Android widget to check the leaderboard",
      ],
    },
    stack: ["Flutter", "Dart", "Firebase", "Cloudinary", "Provider"],
    repoUrl: "https://github.com/javimateo/Beer-League",
    media: {
      frame: "phone",
      images: [
        "/projects/beer-league/01-home.png",
        "/projects/beer-league/02-group-ranking.png",
        "/projects/beer-league/08-confirmation.png",
      ],
    },
  },
  {
    slug: "terrace-weather-api",
    title: "Terrace Weather API",
    eyebrow: { es: "API pública · Java Spring Boot", en: "Public API · Java Spring Boot" },
    description: {
      es: "API REST gratuita y sin API key que convierte la previsión meteorológica en una decisión: si merece la pena abrir la terraza de un restaurante, hora a hora.",
      en: "A free REST API, no key required, that turns the weather forecast into a decision: whether a restaurant should open its terrace, hour by hour.",
    },
    bullets: {
      es: [
        "Veredicto OPEN / CAUTION / CLOSED y aforo recomendado para cada franja horaria",
        "Pondera lluvia, viento y sensación térmica con perfiles configurables según el clima y el equipamiento",
        "Revisa hasta 25 reservas de un día en una sola llamada y propone el mejor horario",
        "Documentación interactiva con Swagger y OpenAPI",
      ],
      en: [
        "OPEN / CAUTION / CLOSED verdict and recommended capacity for every time slot",
        "Weighs rain, wind and feels-like temperature, with profiles tuned to the local climate and equipment",
        "Checks up to 25 bookings for a day in a single call and suggests the best time",
        "Interactive documentation with Swagger and OpenAPI",
      ],
    },
    stack: ["Java", "Spring Boot", "Docker", "OpenAPI", "Open-Meteo"],
    repoUrl: "https://github.com/javimateo/terrace-weather-api",
    links: [
      { label: { es: "Ver en vivo", en: "Live demo" }, href: "https://terrace.javiermateo.dev/swagger-ui.html" },
    ],
    media: {
      frame: "browser",
      live: "terrace-weather",
    },
  },
];
