"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import type { Project } from "@/types/portfolio";

function ArrowOutward({ color = "#380102", size = 10 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CaseStudyOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-[50px] bg-black/40">
      <div className="relative bg-[#fcf8f3] rounded-[25px] p-[50px] max-w-[1215px] w-full flex gap-[50px] items-center max-h-[90vh] overflow-auto">
        <button onClick={onClose} className="absolute top-[50px] right-[50px]" aria-label="Close">
          <Image src="/.shipstudio/assets/cancel.svg" alt="Close" width={48} height={48} />
        </button>

        <div className="flex-1 flex flex-col gap-[25px]">
          <div>
            <p className="font-bel text-[18px] text-[#d7432a]">{project.title}</p>
            <h2 className="font-aleo font-semibold text-[48px] leading-[1.1] text-[#380102] max-w-[810px]">
              {project.body.split("\n")[0]}
            </h2>
          </div>
          <p className="font-aleo text-[18px] text-[#380102] leading-[1.4]">
            {project.body.split("\n\n")[1] ?? project.body}
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {project.attributes.map((attr, i) => (
              <span
                key={attr}
                className="font-bel text-[18px] px-[15px] py-[10px] rounded-full"
                style={i === 0
                  ? { backgroundColor: "#ffc1a7", color: "#380102" }
                  : { border: "1px solid #380102", color: "#380102" }
                }
              >
                {attr}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-[513px] h-[681px] rounded-[25px] overflow-hidden relative bg-[#d9d9d9]">
          {project.coverMedia.type === "video" ? (
            <video
              src={project.coverMedia.url}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image src={project.coverMedia.url} alt={project.title} fill className="object-cover" />
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const isVideo = /\.(mp4|mov|webm)$/i.test(src);
  return (
    <div className="w-full rounded-[5px] overflow-hidden relative" style={{ minHeight: "300px", aspectRatio: "16/10" }}>
      {isVideo ? (
        <video src={src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <Image src={src} alt={alt} fill className="object-cover" />
      )}
    </div>
  );
}

interface Props {
  featured: Project;
  galleryImages: string[];
  otherProjects: Project[];
}

export default function WorkPageClient({ featured, galleryImages, otherProjects }: Props) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <div className="bg-[#fcf8f3]">

      {/* Featured case study — sticky sidebar + scrolling gallery */}
      <section className="flex pt-[125px]" style={{ minHeight: "100vh" }}>
        {/* Sticky left sidebar */}
        <div className="sticky top-[125px] self-start px-[75px] py-[75px] w-[425px] flex-shrink-0 flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <p className="font-bel text-[18px] text-[#d7432a]">{featured.title}</p>
            <h1 className="font-aleo font-semibold text-[48px] leading-[1.1] text-[#380102]">
              {featured.body.split("\n")[0]}
            </h1>
            <button
              onClick={() => setOverlayOpen(true)}
              className="flex items-center gap-[10px] border-2 border-[#380102] rounded-full px-[15px] py-[10px] w-fit font-bel text-[18px] text-[#380102] hover:bg-[#380102] hover:text-[#fcf8f3] transition-colors duration-300"
            >
              Read the full story <ArrowOutward color="currentColor" size={12} />
            </button>
          </div>
        </div>

        {/* Right: gallery images */}
        <div className="flex-1 pr-[75px] py-[75px] flex flex-col gap-[20px]">
          {galleryImages.length > 0 ? (
            galleryImages.map((src, i) => (
              <GalleryImage key={src} src={src} alt={`${featured.title} ${i + 1}`} />
            ))
          ) : (
            <div className="w-full rounded-[15px] bg-[#e8d4b8] flex flex-col items-center justify-center gap-[12px]" style={{ minHeight: "400px" }}>
              <p className="font-bel text-[18px] text-[#380102]/50">No images yet</p>
              <p className="font-aleo text-[14px] text-[#380102]/40">
                Drop files into <code className="bg-[#380102]/10 px-[8px] py-[2px] rounded">.shipstudio/assets/{featured.galleryFolder}</code>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* More work grid */}
      <section className="bg-[#f8e4cc] px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto grid grid-cols-3 gap-[15px]">
          {otherProjects.map((project) => (
            <div key={project.slug} className="flex flex-col gap-[20px] group cursor-pointer">
              <div
                className="w-full rounded-[15px] relative overflow-hidden flex items-end justify-end p-[40px]"
                style={{ aspectRatio: "420/351", backgroundColor: "#e0ccb0" }}
              >
                {project.coverMedia.type === "video" ? (
                  <video
                    src={project.coverMedia.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image src={project.coverMedia.url} alt={project.title} fill className="object-cover" />
                )}
                <div
                  className="relative z-10 w-[34px] h-[34px] rounded-full border border-white flex items-center justify-center"
                  style={{ mixBlendMode: "difference" }}
                >
                  <ArrowOutward color="#ffffff" size={14} />
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <h3 className="font-aleo font-bold text-[36px] leading-[1.1] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-[10px]">
                  {project.attributes.map((attr) => (
                    <span key={attr} className="font-bel text-[9px] text-[#380102] border border-[#380102] px-[12px] py-[8px] rounded-[15px]">
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer variant="dark" />

      {overlayOpen && <CaseStudyOverlay project={featured} onClose={() => setOverlayOpen(false)} />}
    </div>
  );
}
