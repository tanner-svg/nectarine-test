import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/portfolio";
import { getGalleryImages, type GalleryItem } from "@/lib/portfolio-gallery";
import PortfolioDetailClient from "./PortfolioDetailClient";

const JPG_PNG_EXT = /\.(png|jpe?g)$/i;
// Conservative cap well under LinkedIn/Facebook/Twitter's ~5MB og:image limit.
const MAX_SOCIAL_IMAGE_BYTES = 4 * 1024 * 1024;

interface SocialImage {
  url: string;
  width?: number;
  height?: number;
}

// Reads width/height straight out of the PNG header (IHDR chunk) so the page
// can publish explicit og:image:width/height tags — LinkedIn's crawler is
// more reliable about actually showing the image when it doesn't have to
// measure it itself. All of this site's fallback photos are PNGs; anything
// else (e.g. a future jpg) just publishes without explicit dimensions.
function readPngDimensions(absPath: string): { width: number; height: number } | undefined {
  try {
    const buf = fs.readFileSync(absPath);
    if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return undefined;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return undefined;
  }
}

// Only real JPG/PNG stills are eligible — LinkedIn's crawler doesn't render
// GIFs reliably as preview images, and AVIF support is spotty across social
// crawlers generally. Among eligible stills, prefer the largest file under
// the size cap: in practice that's a real photo rather than a small
// mockup/icon graphic, which is what tends to get picked by gallery order.
function pickStillGalleryImage(gallery: GalleryItem[]): SocialImage | undefined {
  const stills = gallery
    .filter((item) => item.type === "image" && JPG_PNG_EXT.test(item.url))
    .map((item) => ({
      url: item.url,
      bytes: fs.statSync(path.join(process.cwd(), "public", item.url)).size,
    }));
  if (stills.length === 0) return undefined;

  const withinLimit = stills.filter((item) => item.bytes <= MAX_SOCIAL_IMAGE_BYTES);
  const best =
    withinLimit.length > 0
      ? withinLimit.sort((a, b) => b.bytes - a.bytes)[0]
      : stills.sort((a, b) => a.bytes - b.bytes)[0]; // all oversized; smallest is least bad

  const dimensions = readPngDimensions(path.join(process.cwd(), "public", best.url));
  return { url: best.url, ...dimensions };
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

  // An explicit `socialImage` on the project always wins. Otherwise, prefer
  // a real JPG/PNG still from the gallery — this covers video covers (no
  // image at all) as well as GIF/AVIF covers, neither of which social
  // crawlers (LinkedIn especially) render reliably as previews. Only if a
  // project's gallery has no JPG/PNG at all do we fall back to whatever the
  // cover itself is, so there's still some preview image rather than none.
  const gallery = project.galleryFolder ? getGalleryImages(project.galleryFolder) : [];
  const galleryStill = pickStillGalleryImage(gallery);
  const coverIsJpgPng = project.coverMedia.type === "image" && JPG_PNG_EXT.test(project.coverMedia.url);
  const autoImage: SocialImage | undefined = coverIsJpgPng
    ? { url: project.coverMedia.url }
    : (galleryStill ?? (project.coverMedia.type === "image" ? { url: project.coverMedia.url } : undefined));

  const socialImage: SocialImage | undefined = project.socialImage
    ? { url: project.socialImage, ...readPngDimensions(path.join(process.cwd(), "public", project.socialImage)) }
    : autoImage;

  const title = project.headline || project.title;
  const ogImage = socialImage && {
    url: socialImage.url,
    ...(socialImage.width && socialImage.height ? { width: socialImage.width, height: socialImage.height } : {}),
  };

  return {
    title,
    openGraph: { title, images: ogImage ? [ogImage] : undefined },
    twitter: { card: "summary_large_image", title, images: ogImage ? [ogImage.url] : undefined },
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
