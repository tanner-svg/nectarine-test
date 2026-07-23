"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import AutoplayVideo from "@/components/AutoplayVideo";
import type { Project } from "@/types/portfolio";
import type { GalleryItem } from "@/lib/portfolio-gallery";

const SERVICE_TAGS = [
  "Design",
  "Writing & Copy",
  "Digital & UI Design",
  "Videography & Media",
  "Events Design & Media",
  "Workshops & Audits",
];

function ArrowOutward({ color = "#380102", size = 10 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="19" strokeWidth="1.5" className="stroke-[#d7432a] fill-transparent transition-colors duration-300 group-hover:fill-[#d7432a]" />
      <path d="M14 14L26 26M26 14L14 26" strokeWidth="1.5" strokeLinecap="round" className="stroke-[#d7432a] transition-colors duration-300 group-hover:stroke-[#fcf8f3]" />
    </svg>
  );
}

// Cycles the number of images sharing a row to build a bento-style gallery
// (full-width, full-width, full-width, pair, full-width, pair, full-width, triple, pair...).
const ROW_PATTERN = [1, 1, 1, 2, 1, 2, 1, 3, 2];

function aspectForRow(row: GalleryItem[]) {
  if (row.length === 1 && row[0].type === "embed") return "aspect-video";
  if (row.length === 1) return "aspect-[3/2]";
  if (row.length === 2) return "aspect-[6/5]";
  return "aspect-square";
}

function GalleryGrid({
  items,
  rowPattern = ROW_PATTERN,
  columnWidths,
  itemFit,
}: {
  items: GalleryItem[];
  rowPattern?: number[];
  columnWidths?: { rowIndex: number; widths: number[] }[];
  itemFit?: { index: number; fit: "contain" }[];
}) {
  const rows: GalleryItem[][] = [];
  let i = 0;
  let patternIdx = 0;
  while (i < items.length) {
    const count = rowPattern[patternIdx % rowPattern.length];
    rows.push(items.slice(i, i + count));
    i += count;
    patternIdx++;
  }

  let flatIndex = 0;

  return (
    <div className="flex flex-col gap-[15px] lg:gap-[25px]">
      {rows.map((row, ri) => {
        const widths = columnWidths?.find((c) => c.rowIndex === ri)?.widths;
        return (
        <div
          key={ri}
          className="grid gap-[15px] lg:gap-[25px]"
          style={{ gridTemplateColumns: widths ? widths.map((w) => `${w}fr`).join(" ") : `repeat(${row.length}, 1fr)` }}
        >
          {row.map((item, ii) => {
            const fit = itemFit?.find((f) => f.index === flatIndex)?.fit ?? "cover";
            flatIndex++;
            return (
            <div key={ii} className={`relative w-full rounded-[8px] lg:rounded-[13px] overflow-hidden bg-[#e8d4b8] ${aspectForRow(row)}`}>
              {item.type === "video" ? (
                <AutoplayVideo src={item.url} className="absolute inset-0 w-full h-full object-cover" />
              ) : item.type === "embed" ? (
                <iframe
                  src={item.url}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                />
              ) : (
                <Image src={item.url} alt="" fill className={fit === "contain" ? "object-contain" : "object-cover"} />
              )}
            </div>
            );
          })}
        </div>
        );
      })}
    </div>
  );
}

// Fade in the translucent backdrop and grow the card in from 33% scale, both
// eased; mirrors the same animation in reverse on close before unmounting.
const MODAL_CLOSE_MS = 350;

function StoryModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const paragraphs = project.body.split("\n\n");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    document.body.classList.add("modal-open");
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r2);
    });
    return () => {
      cancelAnimationFrame(r1);
      document.body.classList.remove("modal-open");
    };
  }, []);

  const handleClose = () => {
    setShown(false);
    setTimeout(onClose, MODAL_CLOSE_MS);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-[60px]" onClick={handleClose}>
      <div
        className="absolute inset-0 bg-black/40"
        style={{ opacity: shown ? 1 : 0, transition: "opacity 0.35s ease" }}
      />
      <div
        className="relative bg-[#fcf8f3] rounded-[25px] w-full h-full max-w-[1600px] overflow-hidden"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "scale(1)" : "scale(0.33)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Offset below the persistent hamburger button — hidden while the modal is open, but kept as a safety margin. */}
        <button onClick={handleClose} className="group absolute z-10 top-[70px] right-4 lg:top-[40px] lg:right-[40px]" aria-label="Close">
          <CloseIcon />
        </button>
        {/* Scrolls internally when content is taller than the box; centers when it isn't. */}
        <div className="h-full overflow-y-auto">
          <div className="min-h-full flex flex-col items-center justify-center gap-[30px] text-center p-6 lg:p-[70px]">
            <div className="flex flex-col gap-[15px] max-w-[820px]">
              <p className="font-bel text-[14px] lg:text-[16px] text-[#d7432a] uppercase" style={{ letterSpacing: "0.1em" }}>
                {project.title}
              </p>
              <h2 className="font-aleo font-semibold text-[32px] lg:text-[48px] leading-[1.1] text-[#380102]">
                {project.headline ?? project.title}
              </h2>
            </div>
            <div className="flex flex-col gap-[16px] max-w-[820px]">
              {paragraphs.map((p, i) => (
                <p key={i} className="font-aleo text-[16px] lg:text-[18px] text-[#380102] leading-[1.5]">
                  {p}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-[10px]">
              {SERVICE_TAGS.map((tag) => {
                const active = project.serviceTags?.includes(tag);
                return (
                  <span
                    key={tag}
                    className="font-bel text-[13px] lg:text-[14px] uppercase px-[15px] py-[10px] rounded-full"
                    style={{
                      letterSpacing: "0.08em",
                      ...(active
                        ? { backgroundColor: "#ffc1a7", color: "#380102" }
                        : { border: "1px solid #380102", color: "#380102" }),
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  // Image is aspect-square, so width == height here — 10% is correct as-is.
  return (
    <Link href={`/portfolio/${project.slug}`} className="flex flex-col gap-[15px] group pb-[10%]">
      <div className="relative w-full aspect-square rounded-[8px] overflow-hidden bg-[#e8d4b8]">
        {project.coverMedia.type === "video" ? (
          <AutoplayVideo src={project.coverMedia.url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <Image src={project.coverMedia.url} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        )}
        <div
          className="absolute top-[15px] right-[15px] w-[34px] h-[34px] rounded-full border border-white flex items-center justify-center"
          style={{ mixBlendMode: "difference" }}
        >
          <ArrowOutward color="#ffffff" size={14} />
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <h3 className="font-aleo font-bold text-[22px] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-[8px]">
          {project.attributes.map((attr) => (
            <span key={attr} className="font-bel text-[9px] uppercase tracking-[0.155em] text-[#380102] border border-[#380102] px-[12px] py-[8px] rounded-full">
              {attr}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

interface Props {
  project: Project;
  gallery: GalleryItem[];
  otherProjects: Project[];
}

export default function PortfolioDetailClient({ project, gallery, otherProjects }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#fcf8f3]">
      {/* Hero + gallery */}
      <section className="pt-[100px] lg:pt-[150px] px-5 sm:px-10 lg:px-[75px] pb-10 lg:pb-[75px]">
        <div className="max-w-[1290px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-start">
          {/* Sticky sidebar — centers vertically in the viewport while scrolling the
              gallery (top-1/2 + -translate-y-1/2), releases once this section (and
              its parent) ends, right before Featured Projects begins. */}
          <div className="w-full lg:w-[320px] lg:flex-shrink-0 lg:sticky lg:top-1/2 lg:-translate-y-1/2 flex flex-col gap-5">
            <p className="font-bel text-[13px] text-[#380102] uppercase" style={{ letterSpacing: "0.12em" }}>
              {project.title}
            </p>
            <h1 className="font-aleo font-semibold text-[36px] lg:text-[44px] leading-[1.05] text-[#380102]">
              {project.headline ?? project.title}
            </h1>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="font-bel text-[13px] uppercase border border-[#380102] rounded-full px-[15px] py-[10px] w-fit text-[#380102] hover:bg-[#380102] hover:text-[#fcf8f3] transition-colors duration-300"
              style={{ letterSpacing: "0.1em" }}
            >
              Read the Full Story
            </button>
          </div>

          {/* Gallery */}
          <div className="flex-1 w-full">
            {gallery.length > 0 ? (
              <GalleryGrid
                items={gallery}
                rowPattern={project.galleryRowPattern}
                columnWidths={project.galleryColumnWidths}
                itemFit={project.galleryItemFit}
              />
            ) : (
              <div className="relative w-full aspect-[3/2] rounded-[13px] overflow-hidden bg-[#e8d4b8]">
                {project.coverMedia.type === "video" ? (
                  <AutoplayVideo src={project.coverMedia.url} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <Image src={project.coverMedia.url} alt={project.title} fill className="object-cover" />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {otherProjects.length > 0 && (
        <section className="bg-[#f7dec1] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]">
          <div className="max-w-[1290px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-[30px]">
              {otherProjects.map((p) => (
                <FeaturedCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer variant="dark" />

      {modalOpen && <StoryModal project={project} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
