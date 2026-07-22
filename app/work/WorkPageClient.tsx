"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import AutoplayVideo from "@/components/AutoplayVideo";
import type { Project } from "@/types/portfolio";

function ArrowOutward({ color = "#380102", size = 12 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WipeButton({ overlayColor, textOnHover, className, children }: {
  overlayColor: string; textOnHover: string; className?: string; children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      className={`relative overflow-hidden uppercase ${className ?? ""}`}
      style={{ letterSpacing: "0.1em" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="absolute inset-0 transition-[clip-path] duration-500 ease-in-out pointer-events-none"
        style={{ backgroundColor: overlayColor, clipPath: hovered ? "circle(150% at 0% 50%)" : "circle(0% at 0% 50%)" }}
      />
      <span className="relative z-10" style={{ color: hovered ? textOnHover : "inherit", transition: "color 0.5s ease-in-out" }}>
        {children}
      </span>
    </button>
  );
}

function PortfolioCard({ project }: { project: Project }) {
  // CSS % padding is always relative to width, so 6.667% here = 10% of this
  // card's own image height (aspect-ratio 3/2, so height = width * 2/3).
  return (
    <Link href={`/portfolio/${project.slug}`} className="flex flex-col gap-[15px] group pb-[6.667%]">
      <div
        className="w-full rounded-[8px] relative overflow-hidden flex items-start justify-end p-[20px]"
        style={{ aspectRatio: "3/2", backgroundColor: "#e8d4b8" }}
      >
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
        <div
          className="relative z-10 w-[34px] h-[34px] rounded-full border border-white flex items-center justify-center"
          style={{ mixBlendMode: "difference" }}
        >
          <ArrowOutward color="#ffffff" size={14} />
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h3 className="font-aleo font-bold text-[32px] leading-[1.1] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-[8px]">
          {project.attributes.map((attr) => (
            <span key={attr} className="font-bel text-[9px] uppercase tracking-[0.155em] text-[#380102] border border-[#380102] px-[12px] py-[8px] rounded-[15px]">
              {attr}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ContactSection() {
  return (
    <section className="bg-[#f8e4cc] px-[75px] py-[75px]">
      <div className="max-w-[1290px] mx-auto">
        <div className="bg-[#f9ce6a] rounded-[25px] p-[65px_75px] flex flex-col gap-[60px]">
          <div className="flex gap-[48px] items-start">
            <div className="flex-1 flex flex-col gap-[48px]">
              <div>
                <h2 className="font-aleo text-[36px] leading-[1.1] text-[#380102]">Contact us</h2>
                <p className="font-aleo text-[18px] text-[#380102] opacity-75 mt-[8px]">
                  Send us a message and we'll get back to you within 1-2 business days.
                </p>
              </div>
              <div className="flex-1 bg-[#f9ce6a] border-2 border-dashed border-[#d7432a]/40 rounded-[10px] min-h-[350px] flex items-center justify-center">
                <span className="font-bel text-sm text-[#380102]/40">[contact-illustration] 492x350</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[16px]">
                {[
                  { label: "Name", placeholder: "Jane Doe", type: "text" },
                  { label: "Email", placeholder: "jane@company.com", type: "email" },
                  { label: "Subject", placeholder: "General inquiry", type: "text" },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col gap-[8px]">
                    <label className="font-inter font-semibold text-[13px] text-[#380102]">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="border border-[#380102] rounded-[12px] px-[14px] h-[48px] font-inter text-[14px] text-[#380102] placeholder-[#380102]/45 bg-transparent outline-none focus:ring-2 focus:ring-[#380102]/20"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-inter font-semibold text-[13px] text-[#380102]">Message</label>
                  <textarea
                    placeholder="How can we help?"
                    rows={6}
                    className="border border-[#380102] rounded-[12px] p-[14px] font-inter text-[14px] text-[#380102] placeholder-[#380102]/45 bg-transparent outline-none focus:ring-2 focus:ring-[#380102]/20 resize-none"
                  />
                </div>
              </div>
              <WipeButton
                overlayColor="#d7432a"
                textOnHover="#f9ce6a"
                className="w-full bg-[#380102] rounded-[12px] py-[15px] font-bel text-[18px] text-[#f9ce6a]"
              >
                Submit
              </WipeButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Props {
  projects: Project[];
}

export default function WorkPageClient({ projects }: Props) {
  return (
    <div className="bg-[#fcf8f3]">

      {/* Hero */}
      <section className="px-[75px] pt-[150px] pb-[60px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-[25px]">
          <span
            className="font-bel text-[14px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[8px] w-fit uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            Our Work
          </span>
          <h1 className="font-aleo font-bold text-[48px] leading-[1.25] max-w-[860px] xl:font-semibold xl:max-w-[860px] xl:text-4xl">
            <span className="text-[#380102] xl:font-semibold">You know what you do and why it matters. </span>
            <span className="text-[#d7432a]">The hard part is finding the language and visuals that make everyone else see it too.</span>
          </h1>
        </div>
      </section>

      {/* 2-column portfolio grid */}
      <section className="px-[75px] pb-[75px]">
        <div className="max-w-[1290px] mx-auto grid grid-cols-2 gap-[25px]">
          {projects.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <ContactSection />

      <Footer variant="dark" />
    </div>
  );
}
