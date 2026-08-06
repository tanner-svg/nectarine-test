import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/portfolio";
import { getGalleryImages, type GalleryItem } from "@/lib/portfolio-gallery";
import PortfolioDetailClient from "./PortfolioDetailClient";

const STATIC_IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

// Among static candidates, prefer the largest file — in practice that's a
// real photo rather than a small mockup/icon graphic, which is what tends to
// get skipped over when picking "the first static image" by gallery order.
function pickStillGalleryImage(gallery: GalleryItem[]): string | undefined {
  const images = gallery.filter((item) => item.type === "image");
  const stills = images.filter((item) => STATIC_IMAGE_EXT.test(item.url));
  const candidates = stills.length > 0 ? stills : images;
  if (candidates.length === 0) return undefined;

  return candidates
    .map((item) => ({
      url: item.url,
      bytes: fs.statSync(path.join(process.cwd(), "public", item.url)).size,
    }))
    .sort((a, b) => b.bytes - a.bytes)[0].url;
}

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
  // back to a photo from the gallery for those projects. LinkedIn's crawler
  // in particular doesn't render animated GIFs reliably as preview images,
  // so prefer a still (jpg/png/webp) over a GIF when the gallery has both.
  const socialImage =
    project.coverMedia.type === "image"
      ? project.coverMedia.url
      : pickStillGalleryImage(project.galleryFolder ? getGalleryImages(project.galleryFolder) : []);

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
