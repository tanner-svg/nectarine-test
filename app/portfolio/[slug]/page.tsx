import { notFound } from "next/navigation";
import { getAllProjects } from "@/lib/portfolio";
import { getGalleryImages } from "@/lib/portfolio-gallery";
import PortfolioDetailClient from "./PortfolioDetailClient";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) notFound();

  const gallery = project.galleryFolder ? getGalleryImages(project.galleryFolder) : [];
  const otherProjects = getAllProjects().filter((p) => p.slug !== slug).slice(0, 3);

  return <PortfolioDetailClient project={project} gallery={gallery} otherProjects={otherProjects} />;
}
