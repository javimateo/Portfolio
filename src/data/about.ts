export type ExperienceEntry = {
  role: string;
  org: string;
  period?: string;
  bullets: string[];
  stack: string[];
};

export type EducationEntry = {
  title: string;
  school: string;
  period: string;
  inProgress?: boolean;
};

// Draft written from the CV facts — tweak the wording to taste.
export const bio: string[] = [
  "Empecé por los sistemas y las redes, di el salto al desarrollo de aplicaciones multiplataforma y terminé el Máster en Full Stack Developer en UNIR.",
  "Me gusta construir de principio a fin: diseñar la API, modelar la base de datos y cuidar la interfaz. Ahora busco mi primer puesto como desarrollador full-stack en un equipo donde seguir creciendo.",
];

export const quickFacts: { label: string; value: string }[] = [
  { label: "Idiomas", value: "Español nativo · Inglés C1" },
  { label: "Formación", value: "Máster Full Stack · UNIR" },
  { label: "Experiencia internacional", value: "Erasmus en Italia" },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Prácticas",
    org: "Viewnext · España",
    bullets: [
      "Diseñé y desarrollé un portal de administración de accesos y tickets con ASP.NET Core y SQL Server, mejorando la gestión de incidencias internas.",
      "Administré servidores de Azure, con control de vulnerabilidades y versiones.",
    ],
    stack: ["ASP.NET Core", "SQL Server", "Azure"],
  },
  {
    role: "Prácticas · Programa Erasmus",
    org: "Invisible Farm S.R.L. · Italia",
    bullets: [
      "Administré la base de datos y la web de la sanidad pública de Lombardía con PHP.",
      "Realicé migraciones de webs con Drupal, asegurando la continuidad y optimización del servicio.",
    ],
    stack: ["PHP", "Drupal"],
  },
];

export const education: EducationEntry[] = [
  {
    title: "Máster en Full Stack Developer",
    school: "Universidad Internacional de La Rioja (UNIR)",
    period: "2025 – 2026",
  },
  {
    title: "Máster en Desarrollo con IA",
    school: "Big School",
    period: "2025 – 2026",
    inProgress: true,
  },
  {
    title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
    school: "Escuela Vedruna Sevilla",
    period: "2023 – 2025",
  },
  {
    title: "Técnico en Sistemas Microinformáticos y Redes",
    school: "IES Martínez Montañés",
    period: "2020 – 2023",
  },
];
