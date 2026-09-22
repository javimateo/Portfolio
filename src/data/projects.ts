export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "segunda-mano",
    title: "Plataforma de segunda mano",
    eyebrow: "Proyecto Final del Máster · UNIR",
    description:
      "API REST estilo Vinted/Wallapop para la compraventa de artículos de segunda mano entre usuarios.",
    bullets: [
      "Publicación de artículos con fotos, mensajería interna entre comprador y vendedor",
      "Sistema de reportes y moderación de contenido",
      "Panel de administración con estadísticas de uso",
      "Documentada con Swagger",
    ],
    stack: ["Node.js", "Express", "MySQL", "JWT", "Multer", "Angular"],
    repoUrl: "https://github.com/javimateo/UNIR-Proyecto-Final-Backend",
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
  },
];
