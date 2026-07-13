import Link from "next/link";
import { getFeaturedProjects } from "@/lib/portfolio";

export default function FeaturedTestimonials() {
  const featured = getFeaturedProjects();

  return (
    <div className="grid grid-cols-1 gap-[2px] lg:grid-cols-2">
      {featured.map((project, i) => (
        <div
          key={project.slug}
          className="flex flex-col justify-between gap-[40px] px-[60px] py-[70px]"
          style={{
            backgroundColor: i === 0 ? "#f8e4cc" : "#ffc1a7",
          }}
        >
          {/* Quote */}
          <blockquote className="font-aleo italic text-[26px] leading-[1.55] text-[#380102]">
            &ldquo;{project.clientQuote.text}&rdquo;
          </blockquote>

          {/* Attribution + CTA */}
          <div className="flex items-end justify-between gap-[20px]">
            <div className="flex flex-col gap-[4px]">
              <span className="font-bel font-semibold text-[16px] text-[#380102]">
                {project.clientQuote.author}
              </span>
              <span className="font-aleo text-[14px] text-[#380102]/60">
                {project.clientQuote.role}
              </span>
            </div>

            <Link
              href={`/work/${project.slug}`}
              className="flex-shrink-0 font-bel text-[13px] uppercase tracking-[0.1em] text-[#380102] border-b border-[#380102]/40 pb-[2px] hover:border-[#380102] transition-colors duration-200"
            >
              Read the story →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
