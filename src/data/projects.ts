import type { Locale } from "@/i18n/config";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  year: number;
  status: "active" | "wip" | "archived";
}

// Nothing public yet. Until a project is ready to show, both lists stay empty
// and the projects page renders its empty state instead of cards.
const enProjects: Project[] = [];

const viProjects: Project[] = [];

export function getProjects(locale: Locale): Project[] {
  return locale === "vi" ? viProjects : enProjects;
}
