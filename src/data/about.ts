import type { Localized } from "@/i18n/config";

export type ExperienceEntry = {
  role: Localized;
  org: Localized;
  period?: string;
  bullets: Localized<string[]>;
  stack: string[];
};

export type EducationEntry = {
  title: Localized;
  school: Localized;
  period: string;
  inProgress?: boolean;
};

export const bio: Localized<string[]> = {
  es: [
    "Empecé por los sistemas y las redes, di el salto al desarrollo de aplicaciones multiplataforma y terminé con el Máster en Full Stack Developer de UNIR.",
    "Me gusta construir de principio a fin: diseñar la API, modelar la base de datos y cuidar la interfaz. Busco mi primer puesto como desarrollador full-stack en un equipo donde seguir aprendiendo y aportar desde el primer día.",
  ],
  en: [
    "I started out with systems and networks, moved on to multiplatform application development and went on to complete a Master's in Full Stack Development at UNIR.",
    "I enjoy building things end to end: designing the API, modelling the database and polishing the interface. I'm looking for my first full-stack role, on a team where I can keep learning and contribute from day one.",
  ],
};

export const quickFacts: { label: Localized; value: Localized }[] = [
  {
    label: { es: "Idiomas", en: "Languages" },
    value: { es: "Español nativo · Inglés C1", en: "Spanish (native) · English (C1)" },
  },
  {
    label: { es: "Formación", en: "Education" },
    value: { es: "Máster Full Stack · UNIR", en: "Master's in Full Stack · UNIR" },
  },
  {
    label: { es: "Experiencia internacional", en: "International experience" },
    value: { es: "Prácticas Erasmus en Italia", en: "Erasmus internship in Italy" },
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: { es: "Prácticas", en: "Intern" },
    org: { es: "Viewnext · España", en: "Viewnext · Spain" },
    bullets: {
      es: [
        "Diseñé y desarrollé un portal de gestión de accesos y tickets con ASP.NET Core y SQL Server, que mejoró la gestión de incidencias internas.",
        "Administré servidores en Azure, con seguimiento de vulnerabilidades y versiones.",
      ],
      en: [
        "Designed and built an access and ticket management portal with ASP.NET Core and SQL Server, improving how internal incidents were handled.",
        "Administered Azure servers, keeping track of vulnerabilities and versions.",
      ],
    },
    stack: ["ASP.NET Core", "SQL Server", "Azure"],
  },
  {
    role: { es: "Prácticas · Programa Erasmus", en: "Intern · Erasmus programme" },
    org: { es: "Invisible Farm S.R.L. · Italia", en: "Invisible Farm S.R.L. · Italy" },
    bullets: {
      es: [
        "Administré la base de datos y la web de la sanidad pública de Lombardía con PHP.",
        "Migré sitios web con Drupal, asegurando la continuidad y el rendimiento del servicio.",
      ],
      en: [
        "Administered the database and website of Lombardy's public health service with PHP.",
        "Migrated websites with Drupal, keeping the service running and well optimised.",
      ],
    },
    stack: ["PHP", "Drupal"],
  },
];

export const education: EducationEntry[] = [
  {
    title: { es: "Máster en Full Stack Developer", en: "Master's in Full Stack Development" },
    school: {
      es: "Universidad Internacional de La Rioja (UNIR)",
      en: "International University of La Rioja (UNIR)",
    },
    period: "2025 – 2026",
  },
  {
    title: { es: "Máster en Desarrollo con IA", en: "Master's in AI-Assisted Development" },
    school: { es: "Big School", en: "Big School" },
    period: "2025 – 2026",
    inProgress: true,
  },
  {
    title: {
      es: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
      en: "Higher National Diploma in Multiplatform Application Development",
    },
    school: { es: "Escuela Vedruna Sevilla", en: "Escuela Vedruna Sevilla" },
    period: "2023 – 2025",
  },
  {
    title: {
      es: "Técnico en Sistemas Microinformáticos y Redes",
      en: "Vocational Diploma in Microcomputer Systems and Networks",
    },
    school: { es: "IES Martínez Montañés", en: "IES Martínez Montañés" },
    period: "2020 – 2023",
  },
];
