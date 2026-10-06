import type { Localized } from "@/i18n/config";

export type Contribution = {
  repo: string;
  repoUrl: string;
  prTitle: string;
  prUrl: string;
  description: Localized;
  status: Localized;
};

export const contributions: Contribution[] = [
  {
    repo: "public-apis/public-apis",
    repoUrl: "https://github.com/public-apis/public-apis",
    prTitle: "Add Terrace Weather API",
    prUrl: "https://github.com/public-apis/public-apis/pull/7483",
    description: {
      es: "Añadí mi Terrace Weather API al catálogo colaborativo de APIs públicas más popular de GitHub (más de 480.000 estrellas).",
      en: "Added my Terrace Weather API to the most popular collaborative catalogue of public APIs on GitHub (over 480,000 stars).",
    },
    status: { es: "Mergeada", en: "Merged" },
  },
  {
    repo: "career-ops-hq/career-ops",
    repoUrl: "https://github.com/career-ops-hq/career-ops",
    prTitle: "docs(i18n): sync Spanish interview modes with current English source",
    prUrl: "https://github.com/career-ops-hq/career-ops/pull/4292",
    description: {
      es: "Sincronicé la documentación en español de los modos de entrevista (planificación y debrief) con la versión en inglés, que llevaba seis commits de ventaja.",
      en: "Brought the Spanish docs for the interview modes (planning and debrief) back in sync with the English source, which was six commits ahead.",
    },
    status: { es: "Mergeada", en: "Merged" },
  },
];
