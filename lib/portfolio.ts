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

// Homepage grid is designed for exactly 4 cards, so this always returns at
// most 4 — even if more than 4 projects are marked showOnHomepage: true.
export function getHomepageProjects(): Project[] {
  return projects
    .filter((p) => p.showOnHomepage)
    .sort((a, b) => (a.homepageOrder ?? Infinity) - (b.homepageOrder ?? Infinity))
    .slice(0, 4);
}
