import fs from "fs";
import path from "path";

// Only files ending in _<number>.<ext> are picked up — that trailing number
// is what controls display order (e.g. project-name_1.png, project-name_2.png).
const NUMBERED = /_(\d+)\.(jpg|jpeg|png|gif|webp|avif|mp4|mov|webm)$/i;
const VIDEO_EXT = /\.(mp4|mov|webm)$/i;

export interface GalleryItem {
  url: string;
  type: "image" | "video" | "embed";
}

export function getGalleryImages(galleryFolder: string): GalleryItem[] {
  const folderPath = path.join(process.cwd(), ".shipstudio", "assets", galleryFolder);

  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath)
    .filter((f) => NUMBERED.test(f))
    .sort((a, b) => Number(a.match(NUMBERED)![1]) - Number(b.match(NUMBERED)![1]))
    .map((f) => ({
      url: `/.shipstudio/assets/${galleryFolder}/${f}`,
      type: VIDEO_EXT.test(f) ? "video" : "image",
    }));
}
