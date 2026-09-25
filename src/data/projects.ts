export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  media?: {
    // "browser" for web apps and APIs, "phone" for mobile apps
    frame: "browser" | "phone";
    // screenshots in public/projects; the first is the main one. A phone frame
    // with three shows them as a fanned trio
    images?: string[];
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
    eyebrow: "Proyecto personal · App de escritorio",
    description:
      "Un diario infinito para PC: cada página es un lienzo sin límites para dibujar, escribir, rodear y conectar ideas. En desarrollo.",
    bullets: [
      "Motor de lienzo propio en TypeScript + Canvas 2D, sin dependencias de pago ni marca de agua",
      "Trazos a mano alzada con perfect-freehand, selección por lazo, figuras y notas adhesivas",
      "Autoguardado local en IndexedDB, con copias exportables a un formato abierto",
      "App de escritorio con Tauri: diario flotante que aparece sobre el escritorio con un atajo de teclado",
    ],
    stack: ["TypeScript", "React", "Canvas 2D", "Tauri", "Rust", "Vite"],
    repoUrl: "https://github.com/javimateo/Diaryo",
  },
  {
    slug: "beer-league",
    title: "Beer League",
    eyebrow: "App social · Flutter",
    description:
      "App social donde grupos de amigos compiten contando sus consumiciones, con temporadas y torneos.",
    bullets: [
      "Temporadas mensuales y torneos con multiplicadores de puntos",
      "Clasificación en vivo por grupo de amigos",
      "Widget nativo de Android para ver la clasificación",
    ],
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
    eyebrow: "API pública · Java Spring Boot",
    description:
      "API REST gratuita y sin API key que convierte la previsión meteorológica en una decisión: si merece la pena abrir la terraza de un restaurante, hora a hora.",
    bullets: [
      "Veredicto OPEN / CAUTION / CLOSED y capacidad recomendada por franja horaria",
      "Pondera lluvia, viento y sensación térmica con perfiles configurables por clima y equipamiento",
      "Revisa hasta 25 reservas de un día en una sola llamada y propone el mejor horario",
      "Documentación interactiva con Swagger y OpenAPI",
    ],
    stack: ["Java", "Spring Boot", "Docker", "OpenAPI", "Open-Meteo"],
    repoUrl: "https://github.com/javimateo/terrace-weather-api",
    liveUrl: "https://terrace.javiermateo.dev/swagger-ui.html",
    media: {
      frame: "browser",
      live: "terrace-weather",
    },
  },
];
