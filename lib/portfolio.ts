import projects from "@/data/content/projects";
import type { Project, ProjectAttribute } from "@/types/portfolio";

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

export function getProjectsByAttribute(attribute: ProjectAttribute): Project[] {
  return projects.filter((p) => p.attributes.includes(attribute));
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.clientQuote.isFeatured);
}
