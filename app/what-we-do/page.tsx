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

function WipeLink({ href, overlayColor, textOnHover, className, children }: {
  href: string; overlayColor: string; textOnHover: string;
  className?: string; children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className={`relative overflow-hidden uppercase ${className ?? ''}`}
      style={{ letterSpacing: '0.1em' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="absolute inset-0 transition-[clip-path] duration-500 ease-in-out pointer-events-none"
        style={{ backgroundColor: overlayColor, clipPath: hovered ? 'circle(150% at 0% 50%)' : 'circle(0% at 0% 50%)' }}
      />
      <span
        className="relative z-10"
        style={{ color: hovered ? textOnHover : 'inherit', transition: 'color 0.5s ease-in-out' }}
      >
        {children}
      </span>
    </Link>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-bel text-[9px] text-[#380102] border border-[#380102] px-[12px] py-[8px] rounded-[15px] whitespace-nowrap">
      {children}
    </span>
  );
}

function PortfolioCard({ name, tags }: { name: string; tags: string[] }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="w-full rounded-[15px] bg-[#e8d4b8] flex items-end justify-end p-[40px]" style={{ aspectRatio: "493/351" }}>
        <div className="w-[34px] h-[34px] rounded-full border border-[#380102]/30 flex items-center justify-center">
          <ArrowOutward color="#380102" size={14} />
        </div>
      </div>
      <div className="flex flex-col gap-[15px]">
        <h3 className="font-aleo font-bold text-[36px] leading-[1.1] text-[#380102]">{name}</h3>
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </div>
  );
}

const designServices = [
  { title: "Brand Identity", desc: "Logo design, brand guides, and visual identity refreshes." },
  { title: "Print Design", desc: "Banners, signage, stickers, flyers, murals, packaging, vehicle wraps, posters, and menus." },
  { title: "Publication Design", desc: "Book design, book covers, and album covers." },
  { title: "Digital Design", desc: "Email, web, social media, and digital ad designs." },
  { title: "Event Design", desc: "Specialized design for events and physical spaces." },
];

const portfolioItems = [
  { name: "David Bruce Winery", tags: ["identity development", "Web design", "copywriting"] },
  { name: "Pinkston For TN", tags: ["identity development", "Web design", "copywriting"] },
  { name: "Faith Driven Talent", tags: ["identity development", "Web design", "copywriting"] },
];

export default function WhatWeDoPage() {
  return (
    <div className="bg-[#fcf8f3]">

      {/* Hero */}
      <section className="pt-[150px] px-[75px] pb-0 flex flex-col gap-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex items-center gap-[25px]">
          <div className="flex flex-col gap-[25px] flex-1">
            <h1 className="font-bel font-semibold text-[85px] leading-none text-[#380102]">What We Do</h1>
            <div className="flex flex-wrap gap-[10px]">
              {["Design", "Writing & Copy", "Digital & UI Design", "Videography & Media", "Events Design & Media", "Workshops & Audits"].map((tag, i) => (
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
        <div className="max-w-[1290px] mx-auto w-full border-b-2 border-[#ffc1a7]" />
      </section>

      {/* Design section */}
      <section className="px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex gap-[75px] items-start">
          {/* Left: icon + title + CTA */}
          <div className="w-[426px] flex-shrink-0 flex flex-col justify-between h-[507px]">
            <div className="flex flex-col gap-[17px]">
              <Image src="/.shipstudio/assets/design-icon-2.svg" alt="Design" width={186} height={188} className="h-[188px] w-auto object-contain object-left" />
              <h2 className="font-aleo text-[48px] leading-none text-[#380102]">Design</h2>
              <p className="font-aleo text-[18px] leading-[1.4] text-[#380102]">
                Logos, brand identity, and visual assets for every format and surface. From packaging and murals to signage, stickers, and banners.
              </p>
              <WipeLink
                href="/contact"
                overlayColor="#380102"
                textOnHover="#fcf8f3"
                className="bg-[#d7432a] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[18px] text-[#fcf8f3]"
              >
                Schedule an Audit
              </WipeLink>
            </div>
          </div>

          {/* Right: service list */}
          <div className="flex-1 flex flex-col">
            {designServices.map((s, i) => (
              <div key={s.title}>
                <div className="border-t-2 border-[#d7432a]" />
                <div className="py-[10px] flex flex-col gap-[10px]">
                  <h3 className="font-aleo text-[36px] leading-[1.1] text-[#380102]">{s.title}</h3>
                  <p className="font-bel text-[18px] text-[#380102]">{s.desc}</p>
                </div>
                {i === designServices.length - 1 && <div className="border-t-2 border-[#d7432a]" />}
              </div>
            ))}
            <div className="border-t-2 border-[#ffc1a7] mt-[10px]" />
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="px-[75px] pb-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex flex-col gap-[25px]">
          <div className="border-t-2 border-[#ffc1a7]" />
          <div className="pt-[30px] flex flex-col gap-[25px]">
            <span className="font-bel text-[18px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: '0.1em' }}>
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

      {/* Portfolio preview */}
      <section className="bg-[#f8e4cc] px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto grid grid-cols-3 gap-[15px]">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.name} name={item.name} tags={item.tags} />
          ))}
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
