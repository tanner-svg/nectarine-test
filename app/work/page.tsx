import { getWorkPageProjects } from "@/lib/portfolio";
import WorkPageClient from "./WorkPageClient";

export default function WorkPage() {
  const projects = getWorkPageProjects();
  return <WorkPageClient projects={projects} />;
}
