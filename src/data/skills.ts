export type SkillStar = {
  name: string;
  // file name (without extension) in public/icons/skills
  icon: string;
  // brand colour, lightened where the official one is too dark on black
  color: string;
  // how the full-colour grid shows the logo: the original multi-colour SVG,
  // the original on a light plate (for black logos), or — when omitted — the
  // single-colour icon tinted with `color`
  logo?: "color" | "badge";
  // position within the constellation box, 0–100 on both axes
  x: number;
  y: number;
};

export type SkillConstellation = {
  name: string;
  stars: SkillStar[];
  // pairs of star indexes to connect
  links: [number, number][];
};

const ACCENT = "#f4c430";

export const skillConstellations: SkillConstellation[] = [
  {
    name: "Frontend",
    stars: [
      { name: "JavaScript", icon: "javascript", logo: "color", color: "#F7DF1E", x: 14, y: 40 },
      { name: "TypeScript", icon: "typescript", logo: "color", color: "#3178C6", x: 40, y: 28 },
      { name: "Angular", icon: "angular", logo: "color", color: "#E23237", x: 72, y: 32 },
      { name: "HTML", icon: "html", logo: "color", color: "#E34F26", x: 38, y: 76 },
      { name: "CSS", icon: "css", logo: "color", color: "#2965F1", x: 68, y: 70 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 4],
      [1, 3],
      [3, 4],
    ],
  },
  {
    name: "Backend",
    stars: [
      { name: "Java", icon: "java", logo: "color", color: "#F89820", x: 14, y: 36 },
      { name: "Spring Boot", icon: "springboot", logo: "color", color: "#6DB33F", x: 34, y: 56 },
      { name: "Node.js", icon: "nodejs", logo: "color", color: "#68A063", x: 58, y: 30 },
      { name: "Express", icon: "express", logo: "badge", color: "#E5E5E5", x: 84, y: 42 },
      { name: "C#", icon: "csharp", logo: "color", color: "#A179DC", x: 60, y: 82 },
      { name: "ASP.NET Core", icon: "aspnetcore", color: "#8C6FF0", x: 82, y: 74 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
    ],
  },
  {
    name: "Bases de datos",
    stars: [
      { name: "MySQL", icon: "mysql", color: "#5A97C8", x: 18, y: 62 },
      { name: "PostgreSQL", icon: "postgresql", logo: "color", color: "#5B84E8", x: 40, y: 30 },
      { name: "SQL Server", icon: "sqlserver", logo: "color", color: "#E0453E", x: 64, y: 66 },
      { name: "Firebase", icon: "firebase", logo: "color", color: "#FFCA28", x: 84, y: 32 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  {
    name: "Cloud y DevOps",
    stars: [
      { name: "Git", icon: "git", logo: "color", color: "#F05032", x: 16, y: 62 },
      { name: "Docker", icon: "docker", logo: "color", color: "#2496ED", x: 36, y: 32 },
      { name: "Kubernetes", icon: "kubernetes", logo: "color", color: "#4C82EC", x: 56, y: 46 },
      { name: "Azure", icon: "azure", logo: "color", color: "#1E90FF", x: 84, y: 30 },
      { name: "Cloud", icon: "cloud", color: "#8EC5FF", x: 82, y: 78 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
    ],
  },
  {
    name: "Arquitectura y redes",
    stars: [
      { name: "Microservicios", icon: "microservices", color: ACCENT, x: 22, y: 38 },
      { name: "REST APIs", icon: "rest", color: ACCENT, x: 74, y: 34 },
      { name: "Infraestructura de redes", icon: "network", color: ACCENT, x: 48, y: 72 },
    ],
    links: [
      [0, 1],
      [0, 2],
      [1, 2],
    ],
  },
  {
    name: "Mobile y otros",
    stars: [
      { name: "Flutter", icon: "flutter", logo: "color", color: "#54C5F8", x: 18, y: 38 },
      { name: "Android", icon: "android", logo: "color", color: "#3DDC84", x: 42, y: 68 },
      { name: "Unity", icon: "unity", logo: "badge", color: "#E5E5E5", x: 68, y: 32 },
      { name: "Desarrollo con IA", icon: "ai", color: "#C084FC", x: 72, y: 76 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
];
