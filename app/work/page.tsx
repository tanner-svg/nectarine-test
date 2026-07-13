import { getAllProjects } from "@/lib/portfolio";
import { getGalleryImages } from "@/lib/portfolio-gallery";
import WorkPageClient from "./WorkPageClient";

export default function WorkPage() {
  const [featured, ...rest] = getAllProjects();

  const galleryImages = featured?.galleryFolder
    ? getGalleryImages(featured.galleryFolder)
    : [];

  return (
    <WorkPageClient
      featured={featured}
      galleryImages={galleryImages}
      otherProjects={rest}
    />
  );
}
