"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getAllProjects, getFeaturedProjects } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

function ArrowOutward({ color = "#380102", size = 10 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Tag({ children, outline = true, bg, textColor = "#380102", borderColor = "#000000" }: {
  children: React.ReactNode;
  outline?: boolean;
  bg?: string;
  textColor?: string;
  borderColor?: string;
}) {
  return (
    <span
      className="font-bel text-[9px] px-[12px] py-[8px] rounded-[15px] whitespace-nowrap"
      style={{ color: textColor, backgroundColor: bg, border: outline ? `1px solid ${borderColor}` : undefined }}
    >
      {children}
    </span>
  );
}

function PortfolioCard({ project, className }: {
  project: Project; className?: string;
}) {
  return (
    <Link href={`/portfolio/${project.slug}`} className={`flex flex-col gap-[20px] group ${className ?? ''}`}>
      <div
        className="w-full rounded-[15px] flex items-end justify-end p-[40px] relative overflow-hidden transition-opacity group-hover:opacity-90"
        style={{ backgroundColor: "#e8d4b8", height: "380px" }}
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
          <Image
            src={project.coverMedia.url}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
        <div className="relative z-10 w-[38px] h-[38px] rounded-full bg-[#fcf8f3]/80 border border-[#380102]/30 flex items-center justify-center">
          <ArrowOutward color="#380102" size={16} />
        </div>
      </div>
      <div className="flex flex-col gap-[15px]">
        <h3 className="font-aleo font-bold text-[36px] leading-[1.1] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">{project.title}</h3>
        <div className="flex flex-wrap gap-[10px]">
          {project.attributes.map((attr) => <Tag key={attr}>{attr}</Tag>)}
        </div>
      </div>
    </Link>
  );
}

// Circle-wipe animated Link button — all caps, 0.1em letter-spacing, hover fill from left
function WipeLink({ href, overlayColor, textOnHover, className, children, onClick }: {
  href: string; overlayColor: string; textOnHover: string;
  className?: string; children: React.ReactNode; onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className={`relative overflow-hidden uppercase ${className ?? ''}`}
      style={{ letterSpacing: '0.1em' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
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

// Circle-wipe animated button element
function WipeButton({ overlayColor, textOnHover, className, children, onClick }: {
  overlayColor: string; textOnHover: string;
  className?: string; children: React.ReactNode; onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      className={`relative overflow-hidden uppercase ${className ?? ''}`}
      style={{ letterSpacing: '0.1em' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
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
    </button>
  );
}

function PortfolioOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-[50px] bg-black/40">
      <div className="relative bg-[#fcf8f3] rounded-[25px] p-[50px] max-w-[1215px] w-full flex gap-[50px] items-center">
        <button onClick={onClose} className="absolute top-[50px] right-[50px]" aria-label="Close">
          <Image src="/.shipstudio/assets/cancel.svg" alt="Close" width={48} height={48} />
        </button>
        <div className="flex-1 flex flex-col gap-[25px]">
          <div>
            <p className="font-bel text-[18px] text-[#d7432a]">Pinkston for TN</p>
            <h2 className="font-aleo font-semibold text-[48px] leading-[1.1] text-[#380102] max-w-[810px]">
              Designing a Campaign That Put People Before Politics
            </h2>
          </div>
          <p className="font-aleo text-[18px] text-[#380102] leading-[1.4]">
            A campaign built on the belief that Tennessee's citizens deserve better than a political system that forces them to choose between two extremes, Lauren Pinkston is running for Governor as an independent...
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {["Design", "Writing & Copy", "Digital & UI Design", "Videography & Media", "Events Design & Media", "Workshops & Audits"].map((tag, i) => (
              <span key={tag} className="font-bel text-[18px] px-[15px] py-[10px] rounded-full"
                style={i === 0 ? { backgroundColor: "#ffc1a7", color: "#380102" } : { border: "1px solid #380102", color: "#380102" }}>
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


const accordionContent = (accentColor: string) => (
  <>
    <p className="font-aleo text-[16px] leading-[1.6]" style={{ color: accentColor === '#f8e4cc' ? '#f8e4cc' : '#f8e4cc' }}>
      A 1-3 hour collaborative deep dive with your leadership or creative team. Within two weeks of the session, you'll receive a multi-page custom strategy guide with recommendations and resources you can act on immediately.
    </p>
    <WipeLink
      href="/workshops-audits"
      overlayColor="#f9ce6a"
      textOnHover="#380102"
      className="bg-[#380102] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[18px] text-[#fcf8f3]"
    >
      Schedule a 30 Minute Intro Call
    </WipeLink>
    <div className="flex flex-wrap gap-[10px]">
      {["Brand Audits", "Website Audits", "Narrative Audits", "The Internal Playbook Workshop"].map((t) => (
        <span key={t} className="font-bel text-[9px] text-[#d7432a] bg-[#ffc1a7] px-[12px] py-[8px] rounded-[15px]">{t}</span>
      ))}
    </div>
  </>
);

export default function HomePage() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [auditsActive, setAuditsActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const parallaxRef = useRef<HTMLElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  // Typing animation state
  const typingWords = ["Sticky", "Fresh", "Grow"];
  const [typedText, setTypedText] = useState("");
  const [typingWordIdx, setTypingWordIdx] = useState(0);
  const [typingPhase, setTypingPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const currentWord = typingWords[typingWordIdx];
    let delay: number;

    if (typingPhase === 'typing') {
      if (typedText.length < currentWord.length) {
        delay = 100;
        const t = setTimeout(() => setTypedText(currentWord.slice(0, typedText.length + 1)), delay);
        return () => clearTimeout(t);
      } else {
        // Word fully typed — pause before deleting
        delay = 2500;
        const t = setTimeout(() => setTypingPhase('deleting'), delay);
        return () => clearTimeout(t);
      }
    }

    if (typingPhase === 'deleting') {
      if (typedText.length > 0) {
        delay = 70;
        const t = setTimeout(() => setTypedText(prev => prev.slice(0, -1)), delay);
        return () => clearTimeout(t);
      } else {
        // Deleted — move to next word
        setTypingWordIdx(prev => (prev + 1) % typingWords.length);
        setTypingPhase('typing');
      }
    }
  }, [typedText, typingPhase, typingWordIdx]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !parallaxImgRef.current) return;
      const rect = parallaxRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = 1 - rect.bottom / (rect.height + viewportH);
      parallaxImgRef.current.style.transform = `translateY(${(progress - 0.5) * 180}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allProjects = getAllProjects();
  const featuredProjects = getFeaturedProjects();

  // Testimonial auto-rotate every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  const services = [
    { icon: "/.shipstudio/assets/design-icon.svg", title: "Design", desc: "Logos, brand identity, and visual assets for every format and surface. From packaging and murals to signage, stickers, and banners — if it needs to look good, we're in." },
    { icon: "/.shipstudio/assets/copywriting-icon.svg", title: "Copywriting", desc: "Mission statements, messaging frameworks, social copy, scripts, and pitch materials. The words that make your brand stick — and actually sound like you." },
    { icon: "/.shipstudio/assets/websites-icon.svg", title: "Websites", desc: "Custom web design, UX/UI, and high-performance builds on Framer, WordPress, Webflow, and more. Sites that look beautiful and actually convert." },
    { icon: "/.shipstudio/assets/video-icon.svg", title: "Videography", desc: "Brand animations, testimonials, explainers, and more. From short-form content to full creative direction — we make brands move." },
    { icon: "/.shipstudio/assets/events-icon.svg", title: "Event Design & Media", desc: "The full visual scope of events: large-scale graphics, banners, apparel, merch, posters, and print materials that make your brand feel as good in person as it does online." },
    { icon: "/.shipstudio/assets/strategy-icon.svg", title: "Brand Strategy", desc: "Narrative workshops, positioning sessions, digital audits and AI integration. Clarity on your story, your strategy and how to carry your brand consistently." },
  ];

  return (
    <div style={{ backgroundColor: "#380102" }}>

      {/* Hero */}
      <section className="bg-[#fcf8f3] pt-[150px] px-[75px] pb-0 flex flex-col gap-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex items-center gap-[100px]">
          <h1 className="font-bel font-semibold text-[85px] leading-[1.03] text-[#380102] w-[580px] flex-shrink-0">
            Make Your Brand{" "}
            <span className="text-[#d7432a] inline-flex items-baseline">
              {typedText}
              <span
                className="inline-block w-[4px] ml-[2px] bg-[#d7432a] self-stretch"
                style={{ animation: 'cursor-blink 1s ease-in-out infinite' }}
              />
            </span>
          </h1>
          <div className="flex-1 flex flex-col gap-[24px]">
            <p className="font-aleo text-[16px] leading-[1.6] text-[#380102]">
              Having an unclear or fuzzy brand doesn't just look bad; it bleeds opportunities. Walk away with the strategy, story, and visual identity that makes your brand stick. Grow a brand foundation that cultivates loyal communities and compelling narratives.
            </p>
            <div className="flex gap-[15px]">
              <WipeLink
                href="/contact"
                overlayColor="#380102"
                textOnHover="#f9ce6a"
                className="flex-1 flex items-center justify-center gap-[10px] bg-[#f9ce6a] rounded-[15px] py-[20px] px-[10px] font-bel text-[18px] text-[#380102]"
              >
                Book a Strategy Call
              </WipeLink>
              <WipeLink
                href="/work"
                overlayColor="#380102"
                textOnHover="#fcf8f3"
                className="flex-1 flex items-center justify-center gap-[10px] border-2 border-[#380102] rounded-[15px] py-[20px] px-[10px] font-bel text-[18px] text-[#380102]"
              >
                Explore our Work
              </WipeLink>
            </div>
          </div>
        </div>
        <div className="max-w-[1290px] mx-auto w-full border-b-2 border-[#380102]" />
      </section>

      {/* Portfolio Grid — bento layout: row 1 narrow+wide, row 2 wide+narrow */}
      <section className="bg-[#fcf8f3] px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto grid grid-cols-3 gap-[15px]">
          {allProjects.map((project, i) => (
            <PortfolioCard
              key={project.slug}
              project={project}
              className={i === 1 || i === 2 ? "col-span-2" : ""}
            />
          ))}
        </div>
      </section>

      {/* The Fuzz Tax */}
      <section className="bg-[#f8e4cc] px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto">
          <div className="bg-[#f8e4cc] rounded-[25px] p-[75px] flex flex-col gap-[40px] xl:pl-0 xl:pr-0 xl:mt-0 xl:pt-0 xl:pb-0">
            <div className="flex gap-[35px] items-start">
              <div className="flex flex-col gap-[10px]">
                <span className="font-bel text-[18px] bg-[#d7432a] text-[#f8e4cc] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: '0.1em' }}>
                  The Real Cost of an Unclear Brand
                </span>
                <h2 className="font-bel font-semibold text-[76px] leading-none text-[#380102]">The Fuzz Tax</h2>
              </div>
              <p className="flex-1 font-aleo text-[16px] leading-[1.6] text-[#380102] pt-[10px]">
                A fuzzy or unclear brand doesn't just look bad. Every missed connection, lost pitch, and unconvinced stakeholder has a price tag. You know something isn't landing the way it should. Pitches that almost land. Content that fills feeds but doesn't convert. Teams that do great work but can't articulate why it matters.
              </p>
            </div>

            {/* Cards row 1 */}
            <div className="grid grid-cols-2 gap-[10px]">
              <div className="bg-[#98b2bb] rounded-[15px] p-[50px_60px] flex flex-col gap-[30px]">
                <div className="flex items-center gap-[30px]">
                  <span className="font-bel font-semibold text-[76px] leading-none text-[#d7432a]">1</span>
                  <h3 className="font-aleo text-[36px] leading-[1.1] text-[#fcf8f3] flex-1">A Tax on Your Brand</h3>
                </div>
                <ul className="font-aleo text-[18px] leading-[1.6] text-[#380102] list-disc pl-[20px] flex flex-col gap-[6px]">
                  <li>You're working harder than you should have to</li>
                  <li>Your materials look professional but don't feel like you</li>
                  <li>Every new piece of creative starts over because there's no foundation</li>
                </ul>
              </div>
              <div className="border-2 border-[#380102] rounded-[15px] p-[50px_60px] flex flex-col gap-[30px] transition-colors duration-300 hover:bg-[#d7432a] hover:border-[#d7432a] cursor-pointer">
                <div className="flex items-center gap-[30px]">
                  <span className="font-bel font-semibold text-[76px] leading-none text-[#d7432a]">2</span>
                  <h3 className="font-aleo text-[36px] leading-[1.1] text-[#380102] flex-1">A Tax on Your Audience</h3>
                </div>
                <ul className="font-aleo text-[18px] leading-[1.6] text-[#380102] list-disc pl-[20px] flex flex-col gap-[6px]">
                  <li>Your ICPs engage with your materials but don't self-identify as people who need you</li>
                  <li>Your content isn't building recognition — it's just filling a feed</li>
                  <li>People leave your website without a clear sense of what you do</li>
                </ul>
              </div>
            </div>

            {/* Cards row 2 */}
            <div className="grid grid-cols-2 gap-[10px]">
              <div className="border-2 border-[#380102] rounded-[15px] p-[50px_60px] flex flex-col gap-[30px] transition-colors duration-300 hover:bg-[#b79e31] hover:border-[#b79e31] cursor-pointer">
                <div className="flex items-center gap-[30px]">
                  <span className="font-bel font-semibold text-[76px] leading-none text-[#b79e31]">3</span>
                  <h3 className="font-aleo text-[36px] leading-[1.1] text-[#380102] flex-1">A Tax on Your Team</h3>
                </div>
                <ul className="font-aleo text-[18px] leading-[1.6] text-[#380102] list-disc pl-[20px] flex flex-col gap-[6px]">
                  <li>New hires can't articulate what the company stands for in their first 90 days</li>
                  <li>No two people on your team describe what you do the same way</li>
                  <li>Your team is doing great work but doesn't have the language to talk about it</li>
                </ul>
              </div>
              <div className="border-2 border-[#380102] rounded-[15px] p-[50px_60px] flex flex-col gap-[30px] transition-colors duration-300 hover:bg-[#f9ce6a] hover:border-[#f9ce6a] cursor-pointer">
                <div className="flex items-center gap-[30px]">
                  <span className="font-bel font-semibold text-[76px] leading-none text-[#f9ce6a]">4</span>
                  <h3 className="font-aleo text-[36px] leading-[1.1] text-[#380102] flex-1">A Tax on You…</h3>
                </div>
                <ul className="font-aleo text-[18px] leading-[1.6] text-[#380102] list-disc pl-[20px] flex flex-col gap-[6px]">
                  <li>Energy — You're still explaining what you do from scratch every time</li>
                  <li>Confidence — Missed opportunities chip away at team morale</li>
                  <li>Every new piece of creative starts over because there's no foundation to build from</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy & Consultations */}
      <section className="bg-[#380102] px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto flex gap-[40px] items-center w-full">
          {/* Left text */}
          <div className="flex-1 flex flex-col gap-[30px]">
            <span className="font-bel text-[18px] text-[#f8e4cc] border border-[#f8e4cc] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: '0.1em' }}>
              Strategy &amp; Consultations
            </span>
            <p className="font-aleo text-[36px] leading-[1.1] text-[#f8e4cc]">
              You know what you do and why it matters. The hard part is finding the language and visuals that make everyone else see it too.
            </p>
            <p className="font-aleo text-[16px] leading-[1.6] text-[#f8e4cc]">
              Our strategy sessions are built to close that gap — giving you the clarity, tools, and creative direction to show up consistently and confidently. Every session is tailored to where you are and where you're headed.
            </p>
            <WipeLink
              href="/workshops-audits"
              overlayColor="#f7dec1"
              textOnHover="#380102"
              className="flex items-center justify-center gap-[10px] border border-[#f7dec1] rounded-[15px] py-[20px] px-[10px] w-[300px] font-bel text-[18px] text-[#f7dec1]"
            >
              Learn More
            </WipeLink>
          </div>

          {/* Right — accordion cards: Workshops open by default, Audits opens on hover */}
          <div
            className="flex-1 flex flex-col gap-[10px]"
            onMouseLeave={() => setAuditsActive(false)}
          >
            {/* Workshops card — red, expanded by default, collapses when Audits is hovered */}
            <div
              className="bg-[#d7432a] rounded-[25px] p-[40px] flex gap-[25px]"
              onMouseEnter={() => setAuditsActive(false)}
            >
              <Image src="/.shipstudio/assets/workshop-icon.svg" alt="Workshop" width={94} height={134} className="flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-aleo text-[48px] leading-none text-[#f8e4cc]">Workshops</h3>
                  <ArrowOutward color="#f8e4cc" size={25} />
                </div>
                <div style={{
                  maxHeight: auditsActive ? '0px' : '400px',
                  overflow: 'hidden',
                  paddingTop: auditsActive ? '0px' : '17px',
                  transition: 'max-height 0.5s ease-in-out, padding-top 0.5s ease-in-out',
                }}>
                  <div className="flex flex-col gap-[17px]">
                    <p className="font-aleo text-[16px] leading-[1.6] text-[#f8e4cc]">
                      A 1-3 hour collaborative deep dive with your leadership or creative team. Within two weeks of the session, you'll receive a multi-page custom strategy guide with recommendations and resources you can act on immediately.
                    </p>
                    <WipeLink
                      href="/workshops-audits"
                      overlayColor="#f9ce6a"
                      textOnHover="#380102"
                      className="bg-[#380102] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[18px] text-[#fcf8f3]"
                    >
                      Schedule a 30 Minute Intro Call
                    </WipeLink>
                    <div className="flex flex-wrap gap-[10px]">
                      {["Brand Audits", "Website Audits", "Narrative Audits", "The Internal Playbook Workshop"].map((t) => (
                        <span key={t} className="font-bel text-[9px] text-[#d7432a] bg-[#ffc1a7] px-[12px] py-[8px] rounded-[15px]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audits card — pink, collapsed by default, expands on hover */}
            <div
              className="bg-[#ffc1a7] rounded-[25px] p-[40px] flex gap-[25px] cursor-pointer"
              onMouseEnter={() => setAuditsActive(true)}
              onMouseLeave={() => setAuditsActive(false)}
            >
              <Image src="/.shipstudio/assets/audit-icon.svg" alt="Audit" width={94} height={151} className="flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-aleo text-[48px] leading-none text-[#380102]">Audits</h3>
                  <ArrowOutward color="#380102" size={25} />
                </div>
                <div style={{
                  maxHeight: auditsActive ? '400px' : '0px',
                  overflow: 'hidden',
                  paddingTop: auditsActive ? '17px' : '0px',
                  transition: 'max-height 0.5s ease-in-out, padding-top 0.5s ease-in-out',
                }}>
                  <div className="flex flex-col gap-[17px]">
                    <p className="font-aleo text-[16px] leading-[1.6] text-[#380102]">
                      A 1-3 hour collaborative deep dive with your leadership or creative team. Within two weeks of the session, you'll receive a multi-page custom strategy guide with recommendations and resources you can act on immediately.
                    </p>
                    <WipeLink
                      href="/workshops-audits"
                      overlayColor="#380102"
                      textOnHover="#fcf8f3"
                      className="bg-[#d7432a] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[18px] text-[#fcf8f3]"
                    >
                      Schedule a 30 Minute Intro Call
                    </WipeLink>
                    <div className="flex flex-wrap gap-[10px]">
                      {["Brand Audits", "Website Audits", "Narrative Audits", "The Internal Playbook Workshop"].map((t) => (
                        <span key={t} className="font-bel text-[9px] text-[#ffc1a7] bg-[#d7432a] px-[12px] py-[8px] rounded-[15px]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Services */}
      <section className="bg-[#d7432a] px-[75px] py-[100px] flex flex-col gap-[30px] items-center">
        <span className="font-bel text-[18px] text-[#f8e4cc] border border-[#f8e4cc] rounded-full px-[15px] py-[10px] uppercase" style={{ letterSpacing: '0.1em' }}>
          p.s. we also have Creative Services
        </span>
        <div className="max-w-[1290px] mx-auto flex gap-[50px] items-center w-full">
          <div className="flex-1 flex flex-col gap-[10px]">
            <div>
              <h3 className="font-aleo text-[48px] leading-none text-[#f8e4cc]">Growth Plans</h3>
              <p className="font-bel text-[18px] text-[#380102]">Great Brands Need Consistent Creative.</p>
            </div>
            <p className="font-aleo text-[16px] leading-[1.6] text-[#f8e4cc]">
              Looking for a dedicated creative partner? Someone who knows your voice, your goals, and your audience well enough to deliver consistent, professional visuals and content? Our monthly plans give you dedicated creative without the overhead.
            </p>
            <WipeLink
              href="/growth-plans"
              overlayColor="#fcf8f3"
              textOnHover="#380102"
              className="bg-[#380102] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[15px] text-white w-[426px]"
            >
              Learn More about Growth Plans
            </WipeLink>
          </div>
          <div className="w-[1px] h-[264px] border border-black" />
          <div className="flex-1 flex flex-col gap-[10px]">
            <div>
              <h3 className="font-aleo text-[48px] leading-none text-[#f8e4cc]">Projects &amp; Express Delivery</h3>
              <p className="font-bel text-[18px] text-[#380102]">Projects À La Carte</p>
            </div>
            <p className="font-aleo text-[16px] leading-[1.6] text-[#f8e4cc]">
              Not every season calls for a full partnership. For well-scoped projects and one-time needs, we offer hourly options that give you professional creativity without the commitment.
            </p>
            <WipeLink
              href="/projects"
              overlayColor="#fcf8f3"
              textOnHover="#380102"
              className="bg-[#380102] rounded-[15px] py-[20px] px-[10px] text-center font-bel text-[15px] text-white w-[426px]"
            >
              Explore Project Options
            </WipeLink>
          </div>
        </div>
      </section>

      {/* Parallax section — image moves slower than scroll */}
      <section ref={parallaxRef} className="bg-[#f9ce6a] h-[600px] overflow-hidden relative">
        <div ref={parallaxImgRef} className="absolute inset-0 will-change-transform" style={{ transform: 'translateY(0px)' }}>
          <Image
            src="/.shipstudio/assets/parallax-bg.svg"
            alt=""
            fill
            className="object-cover scale-[1.35]"
          />
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-[#fcf8f3] px-[75px] py-[75px] flex flex-col gap-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex flex-col gap-[75px]">
          <div className="max-w-[860px] flex flex-col gap-[30px]">
            <span className="font-bel text-[18px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: '0.1em' }}>
              What We Do
            </span>
            <p className="font-aleo text-[36px] leading-[1.1] text-[#380102]">
              Every service we offer is rooted in the same belief: beautiful, intentional work creates good in the world. Whether we're building a brand from the ground up or crafting one asset that needs to be exactly right.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-[30px]">
            {services.map((s) => (
              <div key={s.title} className="flex flex-col gap-[10px]">
                <Image src={s.icon} alt={s.title} width={120} height={100} className="h-[100px] w-auto object-contain object-left" />
                <h3 className="font-aleo text-[36px] leading-[1.1] text-[#380102]">{s.title}</h3>
                <p className="font-aleo text-[16px] leading-[1.6] text-[#380102]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Slider — auto-rotates every 6s, crossfade transition */}
      <section className="bg-[#f7dec1] px-[75px] py-[75px] flex flex-col gap-[50px] items-center">
        {/* Slide container — slide 0 stays relative to anchor height; others are absolute overlays */}
        <div className="max-w-[1290px] mx-auto w-full relative">
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
                <Link
                  href={`/portfolio/${t.slug}`}
                  className="flex items-center gap-[10px] bg-[#d7432a] rounded-full px-[15px] py-[10px] w-fit font-bel text-[18px] text-[#fcf8f3] uppercase hover:opacity-90 transition-opacity"
                  style={{ letterSpacing: '0.1em' }}
                >
                  Read the full story <ArrowOutward color="#fcf8f3" size={12} />
                </Link>
              </div>

              {/* Cover media with arrow hover animation */}
              <Link href={`/portfolio/${t.slug}`} className="flex-1 relative rounded-[15px] overflow-hidden group" style={{ height: "560px" }}>
                {(() => {
                  const media = t.testimonialMedia ?? t.coverMedia;
                  return media.type === "video" ? (
                    <video
                      src={media.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <Image src={media.url} alt={t.clientQuote.author} fill className="object-cover" />
                  );
                })()}
                <div className="absolute top-[40px] right-[40px] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowOutward color="#380102" size={25} />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel dots — clickable */}
        <div className="flex items-center gap-[10px]">
          {featuredProjects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full bg-[#380102] transition-all duration-300 ${i === currentSlide ? 'w-[45px] h-[15px] opacity-100' : 'w-[15px] h-[15px] opacity-40'}`}
            />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#f8e4cc] px-[75px] py-[75px]">
        <div className="max-w-[1290px] mx-auto w-full">
          <div className="bg-[#f9ce6a] rounded-[25px] p-[65px_75px] flex flex-col gap-[60px]">
            <div className="flex gap-[48px] items-start">
              <div className="flex-1 flex flex-col gap-[48px]">
                <div>
                  <h2 className="font-aleo text-[36px] leading-[1.1] text-[#380102]">Contact us</h2>
                  <p className="font-aleo text-[18px] text-[#380102] opacity-75 mt-[8px]">
                    Send us a message and we'll get back to you within 1-2 business days.
                  </p>
                </div>
                <div className="flex-1 bg-[#f9ce6a] border-2 border-dashed border-[#d7432a]/40 rounded-[20px] min-h-[350px] flex items-center justify-center">
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
                  overlayColor="#380102"
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

      <Footer variant="dark" />

      {overlayOpen && <PortfolioOverlay onClose={() => setOverlayOpen(false)} />}
    </div>
  );
}
