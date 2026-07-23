"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import AutoplayVideo from "@/components/AutoplayVideo";
import ContactForm from "@/components/ContactForm";
import type { Project } from "@/types/portfolio";

function ArrowOutward({ color = "#380102", size = 12 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
    <section className="bg-[#f8e4cc] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]">
      <div className="max-w-[1290px] mx-auto">
        <div className="bg-[#f9ce6a] rounded-[25px] p-6 sm:p-10 lg:p-[65px_75px] flex flex-col gap-8 lg:gap-[60px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-[48px] lg:items-start">
            <div className="flex-1 flex flex-col gap-6 lg:gap-[32px]">
              <Image
                src="/.shipstudio/assets/Contact-Illustration.png"
                alt=""
                width={207}
                height={154}
                className="w-[160px] lg:w-[210px] h-auto"
              />
              <div>
                <h2 className="font-aleo text-[28px] lg:text-[36px] leading-[1.1] text-[#380102]">Contact us</h2>
                <p className="font-aleo text-[16px] lg:text-[18px] text-[#380102] opacity-75 mt-[8px]">
                  Send us a message and we'll get back to you within 1-2 business days.
                </p>
              </div>
            </div>
            <ContactForm />
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
