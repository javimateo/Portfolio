export type Contribution = {
  repo: string;
  repoUrl: string;
  prTitle: string;
  prUrl: string;
  description: string;
  status: string;
};

export const contributions: Contribution[] = [
  {
    repo: "public-apis/public-apis",
    repoUrl: "https://github.com/public-apis/public-apis",
    prTitle: "Add Terrace Weather API",
    prUrl: "https://github.com/public-apis/public-apis/pull/7483",
    description:
      "Añadida mi Terrace Weather API al catálogo colaborativo de APIs públicas más popular de GitHub (53k+ forks, 483k+ estrellas).",
    status: "Pull request abierta",
  },
  {
    repo: "career-ops-hq/career-ops",
    repoUrl: "https://github.com/career-ops-hq/career-ops",
    prTitle: "docs(i18n): sync Spanish interview modes with current English source",
    prUrl: "https://github.com/career-ops-hq/career-ops/pull/4292",
    description:
      "Sincronicé la documentación en español de los modos de entrevista (planificación y debrief) con la fuente en inglés, al corregirse un desfase de seis commits.",
    status: "Revisada por el mantenedor",
  },
];
