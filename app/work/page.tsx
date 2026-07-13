"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

function ArrowOutward({ color = "#380102", size = 10 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface CaseStudy {
  id: string;
  client: string;
  title: string;
  description: string;
  tags: string[];
  images: number;
}

const caseStudies: CaseStudy[] = [
  {
    id: "pinkston",
    client: "Pinkston for TN",
    title: "Designing a Campaign That Put People Before Politics",
    description: "A campaign built on the belief that Tennessee's citizens deserve better than a political system that forces them to choose between two extremes. Lauren Pinkston is running for Governor as an independent, and we built everything: identity, digital strategy, copy, and event presence.",
    tags: ["Design", "Writing & Copy", "Digital & UI Design", "Videography & Media", "Events Design & Media", "Workshops & Audits"],
    images: 9,
  },
];

interface OverlayProps {
  study: CaseStudy;
  onClose: () => void;
}

function CaseStudyOverlay({ study, onClose }: OverlayProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-[50px] bg-black/40">
      <div className="relative bg-[#fcf8f3] rounded-[25px] p-[50px] max-w-[1215px] w-full flex gap-[50px] items-center max-h-[90vh] overflow-auto">
        <button onClick={onClose} className="absolute top-[50px] right-[50px]" aria-label="Close">
          <Image src="/.shipstudio/assets/cancel.svg" alt="Close" width={48} height={48} />
        </button>

        <div className="flex-1 flex flex-col gap-[25px]">
          <div>
            <p className="font-bel text-[18px] text-[#d7432a]">{study.client}</p>
            <h2 className="font-aleo font-semibold text-[48px] leading-[1.1] text-[#380102] max-w-[810px]">{study.title}</h2>
          </div>
          <p className="font-aleo text-[18px] text-[#380102] leading-[1.4]">{study.description}</p>
          <div className="flex flex-wrap gap-[10px]">
            {study.tags.map((tag, i) => (
              <span
                key={tag}
                className="font-bel text-[18px] px-[15px] py-[10px] rounded-full"
                style={i === 0
                  ? { backgroundColor: "#ffc1a7", color: "#380102" }
                  : { border: "1px solid #380102", color: "#380102" }
                }
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-[513px] h-[681px] bg-[#d9d9d9] rounded-[25px] flex items-center justify-center">
          <span className="text-[#380102]/40 font-bel text-sm">[case-study-image] 513x681</span>
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  return (
    <div className="bg-[#fcf8f3]">

      {/* Featured case study — sticky sidebar + scrolling images */}
      <section className="flex pt-[125px]" style={{ minHeight: "100vh" }}>
        {/* Sticky left sidebar */}
        <div className="sticky top-[125px] self-start px-[75px] py-[75px] w-[425px] flex-shrink-0 flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <p className="font-bel text-[18px] text-[#380102]">Pinkston for TN</p>
            <h1 className="font-aleo font-semibold text-[48px] leading-[1.1] text-[#380102]">
              Designing a Campaign That Put People Before Politics
            </h1>
            <button
              onClick={() => setActiveStudy(caseStudies[0])}
              className="flex items-center gap-[10px] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit font-bel text-[18px] text-[#380102] hover:bg-[#380102] hover:text-[#fcf8f3] transition-colors"
            >
              Read the full story <ArrowOutward color="currentColor" />
            </button>
          </div>
        </div>

        {/* Right: scrolling images */}
        <div className="flex-1 pr-[75px] py-[75px] flex flex-col gap-[20px]">
          {/* Placeholder images matching the Figma sizes */}
          <div className="w-full rounded-[5px] bg-[#d9d9d9] flex items-center justify-center" style={{ aspectRatio: "905/522" }}>
            <span className="font-bel text-sm text-[#380102]/40">[logo-anim-1] 905x522</span>
          </div>
          <div className="w-full rounded-[5px] bg-[#d9d9d9] flex items-center justify-center" style={{ aspectRatio: "905/624" }}>
            <span className="font-bel text-sm text-[#380102]/40">[IMG-3788] 905x624</span>
          </div>
          <div className="w-full rounded-[5px] bg-[#d9d9d9] flex items-center justify-center" style={{ aspectRatio: "905/679" }}>
            <span className="font-bel text-sm text-[#380102]/40">[scene-1] 905x679</span>
          </div>
          <div className="flex gap-[20px]">
            <div className="bg-[#d9d9d9] flex items-center justify-center" style={{ width: "387px", height: "450px", flexShrink: 0 }}>
              <span className="font-bel text-sm text-[#380102]/40">[IMG-1937] 387x450</span>
            </div>
            <div className="flex-1 bg-[#d9d9d9] flex items-center justify-center" style={{ height: "450px" }}>
              <span className="font-bel text-sm text-[#380102]/40">[DSC06185] 498x450</span>
            </div>
          </div>
          <div className="w-full bg-[#d9d9d9] flex items-center justify-center" style={{ aspectRatio: "905/419" }}>
            <span className="font-bel text-sm text-[#380102]/40">[SLIDER-1] 905x419</span>
          </div>
          <div className="flex gap-[20px]">
            <div className="bg-[#d9d9d9] rounded-[5px] flex items-center justify-center" style={{ width: "298px", height: "391px", flexShrink: 0 }}>
              <span className="font-bel text-sm text-[#380102]/40">[Tezza-1267] 298x391</span>
            </div>
            <div className="flex-1 bg-[#d9d9d9] rounded-[5px] flex items-center justify-center" style={{ height: "391px" }}>
              <span className="font-bel text-sm text-[#380102]/40">[Tezza-1494] 587x391</span>
            </div>
          </div>
          <div className="w-full rounded-[5px] bg-[#d9d9d9] flex items-center justify-center" style={{ aspectRatio: "905/509" }}>
            <span className="font-bel text-sm text-[#380102]/40">[portfolio-img] 905x509</span>
          </div>
          <div className="flex gap-[20px]">
            {["image-6", "image-7", "rectangle-322"].map((id) => (
              <div key={id} className="flex-1 bg-[#d9d9d9] rounded-[5px] flex items-center justify-center" style={{ height: "300px" }}>
                <span className="font-bel text-sm text-[#380102]/40">[{id}] 288x300</span>
              </div>
            ))}
          </div>
          <div className="flex gap-[34px]">
            {["Tezza-2073", "Tezza-5956"].map((id) => (
              <div key={id} className="flex-1 bg-[#d9d9d9] flex items-center justify-center" style={{ height: "446px" }}>
                <span className="font-bel text-sm text-[#380102]/40">[{id}] 436x446</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More work grid */}
      <section className="bg-[#f8e4cc] px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto grid grid-cols-3 gap-[15px]">
          {["David Bruce Winery", "Faith Driven Talent", "Frontier Operators"].map((name) => (
            <div key={name} className="flex flex-col gap-[20px]">
              <div className="w-full rounded-[15px] bg-[#e0ccb0] flex items-end justify-end p-[40px]" style={{ aspectRatio: "420/351" }}>
                <div className="w-[34px] h-[34px] rounded-full border border-[#380102]/30 flex items-center justify-center">
                  <ArrowOutward color="#380102" size={14} />
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <h3 className="font-aleo font-bold text-[36px] leading-[1.1] text-[#380102]">{name}</h3>
                <div className="flex flex-wrap gap-[10px]">
                  {["identity development", "Web design", "copywriting"].map((t) => (
                    <span key={t} className="font-bel text-[9px] text-[#380102] border border-black px-[12px] py-[8px] rounded-[15px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer variant="dark" />

      {activeStudy && <CaseStudyOverlay study={activeStudy} onClose={() => setActiveStudy(null)} />}
    </div>
  );
}
