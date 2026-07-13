import fs from "fs";
import path from "path";

const SUPPORTED = /\.(jpg|jpeg|png|gif|webp|avif|mp4|mov|webm)$/i;

export function getGalleryImages(galleryFolder: string): string[] {
  const folderPath = path.join(process.cwd(), ".shipstudio", "assets", galleryFolder);

  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath)
    .filter((f) => SUPPORTED.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((f) => `/.shipstudio/assets/${galleryFolder}/${f}`);
}
