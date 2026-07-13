import { getAllProjects } from "@/lib/portfolio";
import WorkPageClient from "./WorkPageClient";

export default function WorkPage() {
  const projects = getAllProjects();
  return <WorkPageClient projects={projects} />;
}
