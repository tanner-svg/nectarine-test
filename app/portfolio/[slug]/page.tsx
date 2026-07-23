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
  if (project.galleryEmbeds) {
    for (const embed of [...project.galleryEmbeds].sort((a, b) => b.insertAt - a.insertAt)) {
      gallery.splice(embed.insertAt, 0, { url: embed.url, type: "embed" });
    }
  }
  const otherProjects = getAllProjects().filter((p) => p.slug !== slug).slice(0, 3);

  return <PortfolioDetailClient project={project} gallery={gallery} otherProjects={otherProjects} />;
}
