"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import AutoplayVideo from "@/components/AutoplayVideo";
import { getFeaturedProjects } from "@/lib/portfolio";

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

const workshops = [
  "The Visual Identity Workshop",
  "The Brand Narrative Workshop",
  "The AI Brand Integration Workshop",
];

const audits = [
  "Visual Identity Audits",
  "Narrative Audit",
  "The Website Design Audit",
  "Videography Strategy Audit",
  "The Asset Audit",
];

export default function WorkshopsAuditsPage() {
  const featuredProjects = getFeaturedProjects();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  return (
    <div className="bg-[#380102]">

      {/* Hero */}
      <section className="pt-[150px] px-[75px] pb-0 flex flex-col gap-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex gap-[50px] justify-center">
          <h1 className="font-bel font-semibold text-[85px] leading-none text-[#fcf8f3] flex-shrink-0 w-[414px]">
            Workshops<br />&amp; Audits
          </h1>
          <p className="flex-1 font-aleo text-[16px] leading-[1.6] text-[#fcf8f3]">
            You know what you do and why it matters. The hard part is finding the language and visuals that make everyone else see it too. Our strategy sessions are built to close that gap — giving you the clarity, tools, and creative direction to show up consistently and confidently. Every session is tailored to where you are and where you're headed.
          </p>
        </div>
        <div className="max-w-[1290px] mx-auto w-full border-b-2 border-[#380102]" />
      </section>

      {/* Workshops card */}
      <section className="px-[75px] py-[15px]">
        <div className="max-w-[1290px] mx-auto">
          <div className="bg-[#d7432a] rounded-[25px] p-[75px] flex gap-[75px]">
            {/* Left */}
            <div className="w-[426px] flex-shrink-0 flex flex-col gap-[30px] justify-end">
              <div className="flex flex-col gap-[17px]">
                <Image src="/.shipstudio/assets/workshop-icon-2.svg" alt="Workshop" width={132} height={188} className="h-[188px] w-auto object-contain object-left" />
                <h2 className="font-aleo text-[48px] leading-none text-[#fcf8f3]">Workshops</h2>
                <p className="font-aleo text-[18px] leading-[1.4] text-[#fcf8f3]">
                  A 1-3 hour collaborative deep dive with your leadership or creative team. Within two weeks of the session, you'll receive a multi-page custom strategy guide with recommendations and resources you can act on immediately.
                </p>
                <WipeLink
                  href="/contact"
                  overlayColor="#f9ce6a"
                  textOnHover="#380102"
                  className="bg-[#380102] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[18px] text-[#fcf8f3]"
                >
                  Schedule a 30 Minute Intro Call
                </WipeLink>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1 flex flex-col gap-[0px]">
              <div className="flex-1 bg-[#d9d9d9] rounded-[10px] min-h-[345px] flex items-center justify-center mb-[50px]">
                <span className="font-bel text-sm text-[#380102]/40">[workshop-photo] 639x345</span>
              </div>
              <div className="flex flex-col">
                {workshops.map((w) => (
                  <div key={w}>
                    <div className="border-t-2 border-[#ffc1a7]" />
                    <div className="flex items-center justify-between py-[10px]">
                      <h3 className="font-aleo text-[36px] leading-[1.1] text-[#fcf8f3] flex-1">{w}</h3>
                      <ArrowOutward color="#ffc1a7" size={25} />
                    </div>
                  </div>
                ))}
                <div className="border-t-2 border-[#ffc1a7]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audits card */}
      <section className="px-[75px] py-[15px]">
        <div className="max-w-[1290px] mx-auto">
          <div className="bg-[#ffc1a7] rounded-[25px] p-[75px] flex gap-[75px] items-start">
            {/* Left */}
            <div className="w-[426px] flex-shrink-0 flex flex-col gap-[17px]">
              <Image src="/.shipstudio/assets/audit-icon-2.svg" alt="Audit" width={117} height={188} className="h-[188px] w-auto object-contain object-left" />
              <h2 className="font-aleo text-[48px] leading-none text-[#380102]">Audits</h2>
              <p className="font-aleo text-[18px] leading-[1.4] text-[#380102]">
                A focused 30-45 minute call where we run a SWOT analysis on your selected focus area. You'll receive a one-page PDF of performance notes and recommendations shortly after.
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

            {/* Right: audit list */}
            <div className="flex-1 flex flex-col">
              {audits.map((a) => (
                <div key={a}>
                  <div className="border-t-2 border-[#d7432a]" />
                  <div className="py-[10px]">
                    <h3 className="font-aleo text-[36px] leading-[1.1] text-[#380102]">{a}</h3>
                  </div>
                </div>
              ))}
              <div className="border-t-2 border-[#d7432a]" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial slider — dynamic from getFeaturedProjects() */}
      <section className="bg-[#f8e4cc] px-[75px] py-[75px] mt-[75px] flex flex-col gap-[50px] items-center">
        <div className="max-w-[1290px] mx-auto w-full">
          <div className="bg-[#f9ce6a] rounded-[25px] p-[45px_75px] flex flex-col gap-[50px]">
            <div className="relative">
              {featuredProjects.map((t, i) => (
                <div
                  key={t.slug}
                  className="flex gap-[60px] items-center w-full transition-opacity duration-700 ease-in-out"
                  style={{
                    opacity: i === currentSlide ? 1 : 0,
                    position: i === 0 ? 'relative' : 'absolute',
                    top: i === 0 ? undefined : 0,
                    left: i === 0 ? undefined : 0,
                    pointerEvents: i === currentSlide ? 'auto' : 'none',
                  }}
                >
                  {/* Quote */}
                  <div className="flex-1 flex flex-col gap-[20px]">
                    <svg width="44" height="39" viewBox="0 0 44 39" fill="none">
                      <path d="M0 39V23.4C0 17.4 1.4 12.4 4.2 8.4C7 4.2 11.2 1.4 16.8 0L19.6 5.4C16.4 6.2 13.8 7.8 11.8 10.2C9.8 12.4 8.8 15 8.8 18H16.8V39H0ZM27.2 39V23.4C27.2 17.4 28.6 12.4 31.4 8.4C34.2 4.2 38.4 1.4 44 0L46.8 5.4C43.6 6.2 41 7.8 39 10.2C37 12.4 36 15 36 18H44V39H27.2Z" fill="#d7432a"/>
                    </svg>
                    <blockquote className="font-aleo font-semibold text-[48px] leading-[1.1] text-[#380102]">
                      {t.clientQuote.text}
                    </blockquote>
                    <p className="font-bel text-[18px] text-[#380102]">{t.clientQuote.author}, {t.clientQuote.role}</p>
                    <WipeLink
                      href={`/portfolio/${t.slug}`}
                      overlayColor="#380102"
                      textOnHover="#fcf8f3"
                      className="flex items-center gap-[10px] bg-[#d7432a] rounded-full px-[15px] py-[10px] w-fit font-bel text-[18px] text-[#fcf8f3]"
                    >
                      Read the full story <ArrowOutward color="currentColor" size={12} />
                    </WipeLink>
                  </div>

                  {/* Cover media */}
                  <Link href={`/portfolio/${t.slug}`} className="flex-1 relative rounded-[8px] overflow-hidden group" style={{ height: "560px" }}>
                    {(() => {
                      const media = t.testimonialMedia ?? t.coverMedia;
                      return media.type === "video" ? (
                        <AutoplayVideo
                          src={media.url}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <Image src={media.url} alt={t.clientQuote.author} fill className="object-cover" />
                      );
                    })()}
                    <div className="absolute top-[40px] right-[40px] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" style={{ mixBlendMode: 'difference' }}>
                      <ArrowOutward color="#ffffff" size={25} />
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center gap-[10px] justify-center">
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full bg-[#380102] transition-all duration-300 ${i === currentSlide ? 'w-[45px] h-[15px] opacity-100' : 'w-[15px] h-[15px] opacity-40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer variant="light" />
    </div>
  );
}
