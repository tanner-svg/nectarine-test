"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getAllProjects } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";
import services from "@/data/content/services";

function ArrowOutward({ color = "#380102", size = 10 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WipeLink({ href, overlayColor, textOnHover, className, children }: {
  href: string; overlayColor: string; textOnHover: string;
  className?: string; children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
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
    </Link>
  );
}

function PortfolioCard({ project, highlightAttr }: { project: Project; highlightAttr: string | null }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="flex flex-col gap-[20px] group">
      <div
        className="w-full rounded-[15px] relative overflow-hidden flex items-end justify-end p-[40px]"
        style={{ aspectRatio: "493/351", backgroundColor: "#e8d4b8" }}
      >
        {project.coverMedia.type === "video" ? (
          <video
            src={project.coverMedia.url}
            autoPlay loop muted playsInline
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
      <div className="flex flex-col gap-[15px]">
        <h3 className="font-aleo font-bold text-[36px] leading-[1.1] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-[10px]">
          {project.attributes.map((attr) => (
            <span
              key={attr}
              className="font-bel text-[9px] px-[12px] py-[8px] rounded-[15px] transition-colors duration-300"
              style={
                highlightAttr && attr === highlightAttr
                  ? { backgroundColor: "#ffc1a7", color: "#380102", border: "1px solid transparent" }
                  : { border: "1px solid #380102", color: "#380102" }
              }
            >
              {attr}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

const CYCLE_MS = 4000;
const TRANSITION_MS = 320;
type SlideState = "visible" | "exiting" | "entering";

export default function WhatWeDoPage() {
  const allProjects = getAllProjects();

  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedIdx, setDisplayedIdx] = useState(0);
  const [slideState, setSlideState] = useState<SlideState>("visible");
  const activeIdxRef = useRef(0);
  const slidingRef = useRef(false);
  const autoKeyRef = useRef(0);

  const advanceTo = (idx: number) => {
    if (slidingRef.current || idx === activeIdxRef.current) return;
    slidingRef.current = true;
    setActiveIdx(idx);
    setSlideState("exiting");
    setTimeout(() => {
      activeIdxRef.current = idx;
      setDisplayedIdx(idx);
      setSlideState("entering");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setSlideState("visible");
          slidingRef.current = false;
        })
      );
    }, TRANSITION_MS);
  };

  useEffect(() => {
    const key = autoKeyRef.current;
    const timer = setInterval(() => {
      if (autoKeyRef.current !== key) return;
      advanceTo((activeIdxRef.current + 1) % services.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (idx: number) => {
    autoKeyRef.current += 1;
    advanceTo(idx);
  };

  const service = services[displayedIdx];
  const activeAttribute = service.attribute;

  // Sort: matching projects first, then the rest — always take exactly 3
  const displayedProjects = activeAttribute
    ? [
        ...allProjects.filter((p) => p.attributes.includes(activeAttribute)),
        ...allProjects.filter((p) => !p.attributes.includes(activeAttribute)),
      ].slice(0, 3)
    : allProjects.slice(0, 3);

  const sectionStyle: React.CSSProperties = {
    opacity: slideState === "visible" ? 1 : 0,
    transform:
      slideState === "exiting"
        ? "translateX(-32px)"
        : slideState === "entering"
        ? "translateX(32px)"
        : "translateX(0)",
    transition:
      slideState !== "entering"
        ? `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`
        : "none",
  };

  const portfolioFadeStyle: React.CSSProperties = {
    opacity: slideState === "visible" ? 1 : 0,
    transition: `opacity ${TRANSITION_MS}ms ease`,
  };

  return (
    <div className="bg-[#fcf8f3]">

      {/* Hero + category filters */}
      <section className="pt-[150px] px-[75px] pb-0 flex flex-col gap-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex items-center gap-[25px]">
          <div className="flex flex-col gap-[25px] flex-1">
            <h1 className="font-bel font-semibold text-[85px] leading-none text-[#380102]">What We Do</h1>
            <div className="flex flex-wrap gap-[10px]">
              {services.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => handleCategoryClick(i)}
                  className="font-bel text-[18px] px-[15px] py-[10px] rounded-full cursor-pointer transition-colors duration-300"
                  style={
                    i === activeIdx
                      ? { backgroundColor: "#ffc1a7", color: "#380102", border: "1px solid transparent" }
                      : { border: "1px solid #380102", color: "#380102", background: "transparent" }
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* PS card */}
          <div className="w-[465px] bg-[#ffc1a7] rounded-[15px] p-[40px] flex flex-col gap-[15px]">
            <p className="font-bel text-[18px] text-black leading-[1.4]">
              *P.S.<br />
              Don't see what you're looking for? Ask us anyway. Design spans more than any list can capture — odds are we can help, and if we can't, we'll point you to someone who can
            </p>
            <WipeLink
              href="mailto:hello@nectarine.ink"
              overlayColor="#380102"
              textOnHover="#fcf8f3"
              className="bg-[#d7432a] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[18px] text-[#fcf8f3]"
            >
              Hello@nectarine.ink
            </WipeLink>
          </div>
        </div>
      </section>

      {/* Service detail — animates when category changes */}
      <section className="px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex gap-[75px] items-start" style={sectionStyle}>
          {/* Left: icon + title + description + CTA */}
          <div className="w-[426px] flex-shrink-0 flex flex-col gap-[17px]">
            <Image
              src={service.icon}
              alt={service.title}
              width={186}
              height={188}
              className="h-[188px] w-auto object-contain object-left"
            />
            <h2 className="font-aleo text-[48px] leading-none text-[#380102]">{service.title}</h2>
            <p className="font-aleo text-[18px] leading-[1.4] text-[#380102]">{service.description}</p>
            <WipeLink
              href={service.ctaHref}
              overlayColor="#380102"
              textOnHover="#fcf8f3"
              className="bg-[#d7432a] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[18px] text-[#fcf8f3]"
            >
              {service.ctaText}
            </WipeLink>
          </div>

          {/* Right: service items list */}
          <div className="flex-1 flex flex-col">
            {service.items.map((item, i) => (
              <div key={item.title}>
                <div className="border-t-2 border-[#d7432a]" />
                <div className="py-[10px] flex flex-col gap-[10px]">
                  <h3 className="font-aleo text-[36px] leading-[1.1] text-[#380102]">{item.title}</h3>
                  <p className="font-bel text-[18px] text-[#380102]">{item.desc}</p>
                </div>
                {i === service.items.length - 1 && <div className="border-t-2 border-[#d7432a]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="px-[75px] pb-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex flex-col gap-[25px]">
          <div className="border-t-2 border-[#ffc1a7]" />
          <div className="pt-[30px] flex flex-col gap-[25px]">
            <span className="font-bel text-[18px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: "0.1em" }}>
              Featured Services
            </span>
            <div className="flex gap-[25px]">
              <div className="flex-1 border border-[#380102] rounded-[15px] p-[40px] flex flex-col gap-[15px]">
                <h3 className="font-aleo text-[36px] leading-[1.2] text-[#380102]">AI Brand Kit Files<br />&amp; Training</h3>
                <p className="font-aleo text-[18px] leading-[1.4] text-black">
                  We build Claude and Google-ready brand kit files and train your team to use them, so every deck, design, and AI-assisted asset stays on-brand without starting from scratch
                </p>
              </div>
              <div className="flex-1 border border-[#380102] rounded-[15px] p-[40px] flex flex-col gap-[15px]">
                <h3 className="font-aleo text-[36px] leading-[1.2] text-[#380102]">Print &amp; Production<br />Finishing</h3>
                <p className="font-aleo text-[18px] leading-[1.4] text-black">
                  The last mile between a great design and a print-ready file. We handle the technical preparation that AI tools like Claude and Gemini can't, ensuring your files are production-ready, press-perfect, and vendor-approved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio — 3 projects filtered by active service category */}
      <section className="bg-[#f8e4cc] px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-[40px]">
          <div className="flex items-center justify-between">
            <span className="font-bel text-[18px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] uppercase" style={{ letterSpacing: "0.1em" }}>
              Featured Work
            </span>
            <span className="font-bel text-[18px] text-[#380102]/50" style={portfolioFadeStyle}>
              {service.label}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-[15px]" style={portfolioFadeStyle}>
            {displayedProjects.map((project) => (
              <PortfolioCard key={project.slug} project={project} highlightAttr={activeAttribute} />
            ))}
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
