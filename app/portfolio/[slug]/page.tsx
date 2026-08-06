import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/portfolio";
import { getGalleryImages } from "@/lib/portfolio-gallery";
import PortfolioDetailClient from "./PortfolioDetailClient";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) return {};

  // The cover video itself can't be used as a social preview image, so fall
  // back to the first real photo in the gallery for those projects.
  const socialImage =
    project.coverMedia.type === "image"
      ? project.coverMedia.url
      : (project.galleryFolder ? getGalleryImages(project.galleryFolder) : []).find((item) => item.type === "image")?.url;

  const title = project.headline || project.title;

  return {
    title,
    openGraph: { title, images: socialImage ? [{ url: socialImage }] : undefined },
    twitter: { card: "summary_large_image", title, images: socialImage ? [socialImage] : undefined },
  };
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
