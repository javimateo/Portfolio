import type { Locale } from "./config";

// Interface text. Content that belongs to a project, job or course lives with it in src/data.
const es = {
  meta: {
    title: "Javier Mateo — Desarrollador Full-Stack",
    description:
      "Portfolio de Javier Mateo, desarrollador full-stack con Angular, TypeScript, Node.js y Spring Boot.",
  },
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    projects: "Proyectos",
    skills: "Skills",
    contact: "Contacto",
    switchTo: "EN",
    switchLabel: "Read in English",
  },
  hero: {
    role: "Desarrollador Full-Stack",
    intro:
      "Desarrollo aplicaciones web de principio a fin con Angular, TypeScript, Node.js y Spring Boot. Máster en Full Stack Developer por UNIR y en busca de mi primer puesto como desarrollador.",
    projects: "Ver proyectos",
    contact: "Contacto",
    cv: "Descargar CV",
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Quién soy",
    experience: "Experiencia",
    education: "Formación",
    inProgress: "En curso",
  },
  github: {
    title: "Actividad en GitHub",
    total: (count: number, year: number) => `${count} contribuciones en ${year}`,
    less: "Menos",
    more: "Más",
    months: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  },
  projects: {
    eyebrow: "Algunos proyectos",
    title: "Cosas que he construido",
    privateRepo: "Repositorio privado",
    screenshotOf: (title: string) => `Captura de ${title}`,
    open: (title: string) => `Abrir ${title}`,
    video: "Vídeo",
  },
  openSource: {
    eyebrow: "Open source",
    title: "Contribuciones a otros proyectos",
  },
  terrace: {
    terrace: "Terraza",
    today: "Hoy",
    tomorrow: "Mañana",
    live: "En vivo",
    sample: "Ejemplo",
    services: { comida: "Comida", cena: "Cena" } as Record<string, string>,
    capacity: "aforo",
    verdict: { OPEN: "Abrir", CAUTION: "Precaución", CLOSED: "Cerrar" },
    noIssues: "Sin incidencias previstas",
    source: "Datos: Open-Meteo",
    dateLocale: "es-ES",
    reasons: {
      hot: (t: string) => `Sensación de ${t} °C (calor)`,
      cold: (t: string) => `Sensación de ${t} °C (frío)`,
      rainChance: (p: string) => `${p} % de probabilidad de lluvia`,
      rainAmount: (mm: string) => `${mm} mm de lluvia previstos`,
      gusts: (kmh: string) => `Rachas de ${kmh} km/h`,
    },
  },
  skills: {
    eyebrow: "Stack",
    title: "Con qué trabajo",
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Hablamos?",
    text: "Busco mi primer puesto como desarrollador full-stack. Si en tu equipo hay sitio para mí, escríbeme y lo hablamos.",
    cv: "Descarga mi CV",
  },
  footer: {
    builtWith: "Diseñado y construido con Next.js",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Javier Mateo — Full-Stack Developer",
    description:
      "Portfolio of Javier Mateo, a full-stack developer working with Angular, TypeScript, Node.js and Spring Boot.",
  },
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    switchTo: "ES",
    switchLabel: "Leer en español",
  },
  hero: {
    role: "Full-Stack Developer",
    intro:
      "I build web applications end to end with Angular, TypeScript, Node.js and Spring Boot. Master's in Full Stack Development from UNIR, now looking for my first developer role.",
    projects: "See projects",
    contact: "Contact",
    cv: "Download CV",
  },
  about: {
    eyebrow: "About me",
    title: "Who I am",
    experience: "Experience",
    education: "Education",
    inProgress: "In progress",
  },
  github: {
    title: "GitHub activity",
    total: (count: number, year: number) => `${count} contributions in ${year}`,
    less: "Less",
    more: "More",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  projects: {
    eyebrow: "Selected projects",
    title: "Things I've built",
    privateRepo: "Private repository",
    screenshotOf: (title: string) => `Screenshot of ${title}`,
    open: (title: string) => `Open ${title}`,
    video: "Video",
  },
  openSource: {
    eyebrow: "Open source",
    title: "Contributions to other projects",
  },
  terrace: {
    terrace: "Terrace",
    today: "Today",
    tomorrow: "Tomorrow",
    live: "Live",
    sample: "Sample",
    services: { comida: "Lunch", cena: "Dinner" },
    capacity: "capacity",
    verdict: { OPEN: "Open", CAUTION: "Caution", CLOSED: "Close" },
    noIssues: "No issues expected",
    source: "Data: Open-Meteo",
    dateLocale: "en-GB",
    reasons: {
      hot: (t: string) => `Feels like ${t} °C (too hot)`,
      cold: (t: string) => `Feels like ${t} °C (too cold)`,
      rainChance: (p: string) => `${p}% chance of rain`,
      rainAmount: (mm: string) => `${mm} mm of rain expected`,
      gusts: (kmh: string) => `Gusts of ${kmh} km/h`,
    },
  },
  skills: {
    eyebrow: "Stack",
    title: "What I work with",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    text: "I'm looking for my first full-stack developer role. If there's a place for me on your team, drop me a line.",
    cv: "Download my CV",
  },
  footer: {
    builtWith: "Designed and built with Next.js",
  },
};

export const dictionary: Record<Locale, Dictionary> = { es, en };
