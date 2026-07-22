import Image from "next/image";
import Link from "next/link";
import AutoplayVideo from "@/components/AutoplayVideo";
import { getAllProjects, getProjectsByAttribute } from "@/lib/portfolio";
import type { ProjectAttribute } from "@/types/portfolio";

interface Props {
  filterAttribute?: ProjectAttribute;
}

export default function ProjectGrid({ filterAttribute }: Props) {
  const projects = filterAttribute
    ? getProjectsByAttribute(filterAttribute)
    : getAllProjects();

  return (
    <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group flex flex-col gap-[18px] pb-[32px]"
        >
          {/* Cover media */}
          <div className="relative w-full h-[320px] rounded-[8px] overflow-hidden bg-[#e8d4b8] flex-shrink-0">
            {project.coverMedia.type === "video" ? (
              <AutoplayVideo
                src={project.coverMedia.url}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <Image
                src={project.coverMedia.url}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}

            {/* Video badge */}
            {project.coverMedia.type === "video" && (
              <span className="absolute bottom-[14px] left-[14px] font-bel text-[9px] uppercase tracking-[0.1em] bg-[#380102] text-[#fcf8f3] px-[10px] py-[6px] rounded-full">
                Video
              </span>
            )}
          </div>

          {/* Title + attribute badges */}
          <div className="flex flex-col gap-[12px]">
            <h3 className="font-aleo font-bold text-[28px] leading-[1.1] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-[8px]">
              {project.attributes.map((attr) => (
                <span
                  key={attr}
                  className="font-bel text-[9px] uppercase tracking-[0.155em] px-[12px] py-[7px] rounded-full border border-[#380102]/30 text-[#380102]"
                >
                  {attr}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
