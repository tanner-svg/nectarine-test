import type { Metadata } from "next";
import { getWorkPageProjects } from "@/lib/portfolio";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Browse real brand, web, and campaign work for independent-minded clients in Nectarine Studio's portfolio.",
};

export default function WorkPage() {
  const projects = getWorkPageProjects();
  return <WorkPageClient projects={projects} />;
}
