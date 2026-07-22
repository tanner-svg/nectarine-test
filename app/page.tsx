"use client";
import { useState, useEffect, useRef, useCallback, type RefObject, type MutableRefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import AutoplayVideo from "@/components/AutoplayVideo";
import { getHomepageProjects, getFeaturedProjects } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

// Groups a sentence's word spans by rendered line, then drives a per-line
// reveal (color, opacity, whatever `apply` sets) as the paragraph scrolls
// up through the viewport. Lines are re-measured on resize since text wraps
// differently at each breakpoint.
function useLineReveal(
  containerRef: RefObject<HTMLElement | null>,
  wordRefs: MutableRefObject<(HTMLSpanElement | null)[]>,
  apply: (el: HTMLSpanElement, revealed: boolean) => void
) {
  const lineOfWord = useRef<number[]>([]);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const measure = () => {
      const els = wordRefs.current;
      const tops: number[] = [];
      const lineMap: number[] = [];
      els.forEach((el) => {
        if (!el) { lineMap.push(0); return; }
        const top = el.offsetTop;
        let lineIdx = tops.findIndex(t => Math.abs(t - top) < 4);
        if (lineIdx === -1) { tops.push(top); lineIdx = tops.length - 1; }
        lineMap.push(lineIdx);
      });
      lineOfWord.current = lineMap;
      setLineCount(Math.max(tops.length, 1));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [wordRefs]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const start = viewportH * 0.85;
      const end = viewportH * 0.4;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const line = lineOfWord.current[i] ?? 0;
        const threshold = (line + 1) / lineCount;
        apply(el, progress >= threshold);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef, wordRefs, apply, lineCount]);
}

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
      className="font-bel text-[9px] uppercase tracking-[0.155em] px-[12px] py-[8px] rounded-[15px] whitespace-nowrap"
      style={{ color: textColor, backgroundColor: bg, border: outline ? `1px solid ${borderColor}` : undefined }}
    >
      {children}
    </span>
  );
}

function PortfolioCard({ project, className }: {
  project: Project; className?: string;
}) {
  // Image heights are fixed px per breakpoint (200/260/380), so padding is
  // fixed px too — 10% of each — rather than a %, which would be relative to width.
  return (
    <Link href={`/portfolio/${project.slug}`} className={`flex flex-col gap-[20px] group pb-[20px] sm:pb-[26px] lg:pb-[38px] ${className ?? ''}`}>
      <div
        className="w-full rounded-[8px] flex items-end justify-end p-4 lg:p-[40px] relative overflow-hidden transition-opacity group-hover:opacity-90 h-[200px] sm:h-[260px] lg:h-[380px]"
        style={{ backgroundColor: "#e8d4b8" }}
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
        <div className="relative z-10 w-[38px] h-[38px] rounded-full border border-white flex items-center justify-center" style={{ mixBlendMode: 'difference' }}>
          <ArrowOutward color="#ffffff" size={16} />
        </div>
      </div>
      <div className="flex flex-col gap-[15px]">
        <h3 className="font-aleo font-bold text-[24px] sm:text-[28px] lg:text-[36px] leading-[1.1] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">{project.title}</h3>
        <div className="flex flex-wrap gap-[10px]">
          {project.attributes.map((attr) => <Tag key={attr}>{attr}</Tag>)}
        </div>
      </div>
    </Link>
  );
}

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-[50px] bg-black/40">
      <div className="relative bg-[#fcf8f3] rounded-[25px] p-6 lg:p-[50px] max-w-[1215px] w-full flex flex-col lg:flex-row gap-8 lg:gap-[50px] items-start lg:items-center overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 lg:top-[50px] lg:right-[50px]" aria-label="Close">
          <Image src="/.shipstudio/assets/cancel.svg" alt="Close" width={48} height={48} />
        </button>
        <div className="flex-1 flex flex-col gap-[25px]">
          <div>
            <p className="font-bel text-[18px] text-[#d7432a]">Pinkston for TN</p>
            <h2 className="font-aleo font-semibold text-[32px] lg:text-[48px] leading-[1.1] text-[#380102] max-w-[810px]">
              Designing a Campaign That Put People Before Politics
            </h2>
          </div>
          <p className="font-aleo text-[16px] lg:text-[18px] text-[#380102] leading-[1.4]">
            A campaign built on the belief that Tennessee's citizens deserve better than a political system that forces them to choose between two extremes, Lauren Pinkston is running for Governor as an independent...
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {["Design", "Writing & Copy", "Digital & UI Design", "Videography & Media", "Events Design & Media", "Workshops & Audits"].map((tag, i) => (
              <span key={tag} className="font-bel text-[14px] lg:text-[18px] px-[15px] py-[10px] rounded-full"
                style={i === 0 ? { backgroundColor: "#ffc1a7", color: "#380102" } : { border: "1px solid #380102", color: "#380102" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[513px] h-[300px] lg:h-[681px] bg-[#d9d9d9] rounded-[13px] flex items-center justify-center flex-shrink-0">
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
  const [hoveredCard, setHoveredCard] = useState<'workshops' | 'audits' | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fuzzIndex, setFuzzIndex] = useState(0);
  const [fuzzHorizontal, setFuzzHorizontal] = useState(false);
  const parallaxRef = useRef<HTMLElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);
  const fuzzSectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLParagraphElement>(null);
  const revealWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const whatWeDoRevealRef = useRef<HTMLParagraphElement>(null);
  const whatWeDoWordRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
        setTypingWordIdx(prev => (prev + 1) % typingWords.length);
        setTypingPhase('typing');
      }
    }
  }, [typedText, typingPhase, typingWordIdx]);

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

  // Strategy section: each line goes cream -> coral as it scrolls into view.
  const applyColorReveal = useCallback((el: HTMLSpanElement, revealed: boolean) => {
    el.style.color = revealed ? '#d7432a' : '#f8e4cc';
  }, []);
  useLineReveal(revealRef, revealWordRefs, applyColorReveal);

  // What We Do section: each line goes 75% -> 100% opacity as it scrolls into view.
  const applyOpacityReveal = useCallback((el: HTMLSpanElement, revealed: boolean) => {
    el.style.opacity = revealed ? '1' : '0.5';
  }, []);
  useLineReveal(whatWeDoRevealRef, whatWeDoWordRefs, applyOpacityReveal);

  // Fuzz Tax cards step backward through the deck (reverse order) as the section
  // scrolls through the viewport, instead of auto-advancing on a timer. Dragging
  // still works and temporarily overrides the card shown until the next scroll.
  useEffect(() => {
    const handleScroll = () => {
      if (!fuzzSectionRef.current) return;
      const rect = fuzzSectionRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - rect.bottom / (rect.height + viewportH)));
      const step = Math.min(3, Math.floor(progress * 4));
      setFuzzIndex((4 - step) % 4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setFuzzHorizontal(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const homepageProjects = getHomepageProjects();
  const featuredProjects = getFeaturedProjects();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  const fuzzCards = [
    { src: "/.shipstudio/assets/fuzz-card-1.png", alt: "A Tax on Your Opportunities" },
    { src: "/.shipstudio/assets/fuzz-card-2.png", alt: "A Tax on Your Audience" },
    { src: "/.shipstudio/assets/fuzz-card-3.png", alt: "A Tax on Your Team" },
    { src: "/.shipstudio/assets/fuzz-card-4.png", alt: "A Tax on You…" },
  ];

  const services = [
    { icon: "/.shipstudio/assets/design-icon.svg", title: "Design", desc: "Logos, brand identity, and visual assets for every format and surface. From packaging and murals to signage, stickers, and banners — if it needs to look good, we're in." },
    { icon: "/.shipstudio/assets/copywriting-icon.svg", title: "Copywriting", desc: "Mission statements, messaging frameworks, social copy, scripts, and pitch materials. The words that make your brand stick — and actually sound like you." },
    { icon: "/.shipstudio/assets/websites-icon.svg", title: "Websites", desc: "Custom web design, UX/UI, and high-performance builds on Framer, WordPress, Webflow, and more. Sites that look beautiful and actually convert." },
    { icon: "/.shipstudio/assets/video-icon.svg", title: "Videography", desc: "Brand animations, testimonials, explainers, and more. From short-form content to full creative direction — we make brands move." },
    { icon: "/.shipstudio/assets/events-icon.svg", title: "Event Design & Media", desc: "The full visual scope of events: large-scale graphics, banners, apparel, merch, posters, and print materials that make your brand feel as good in person as it does online." },
    { icon: "/.shipstudio/assets/strategy-icon.svg", title: "Brand Strategy", desc: "Narrative workshops, positioning sessions, digital audits and AI integration. Clarity on your story, your strategy and how to carry your brand consistently." },
  ];

  return (
    <div style={{ background: "linear-gradient(to bottom, #fcf8f3 50%, #380102 50%)" }}>

      {/* Hero */}
      <section className="bg-[#fcf8f3] pt-[90px] lg:pt-[150px] px-5 sm:px-10 lg:px-[75px] pb-0 flex flex-col gap-8 lg:gap-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[75px]">
          <h1 className="font-bel font-semibold text-[52px] sm:text-[64px] lg:text-[85px] leading-[1.03] text-[#380102] w-full lg:w-[580px] lg:flex-shrink-0">
            Make Your Brand{" "}
            <span className="text-[#d7432a] inline-flex items-baseline">
              {typedText}
              <span
                className="inline-block w-[4px] ml-[2px] bg-[#d7432a] self-stretch"
                style={{ animation: 'cursor-blink 1s ease-in-out infinite' }}
              />
            </span>
          </h1>
          <div className="flex-1 flex flex-col gap-5 lg:gap-[24px]">
            <p className="font-aleo text-[16px] leading-[1.6] text-[#380102]">
              Having an unclear or fuzzy brand doesn't just look bad; it bleeds opportunities. Walk away with the strategy, story, and visual identity that makes your brand stick. Grow a brand foundation that cultivates loyal communities and compelling narratives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-[15px]">
              <WipeLink
                href="/contact"
                overlayColor="#380102"
                textOnHover="#f9ce6a"
                className="flex-1 flex items-center justify-center gap-[10px] bg-[#f9ce6a] rounded-[15px] py-[16px] lg:py-[20px] px-[10px] font-bel text-[16px] lg:text-[18px] text-[#380102]"
              >
                Book a Strategy Call
              </WipeLink>
              <WipeLink
                href="/work"
                overlayColor="#380102"
                textOnHover="#fcf8f3"
                className="flex-1 flex items-center justify-center gap-[10px] border-2 border-[#380102] rounded-[15px] py-[16px] lg:py-[20px] px-[10px] font-bel text-[16px] lg:text-[18px] text-[#380102]"
              >
                Explore our Work
              </WipeLink>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-[#fcf8f3] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]">
        <div className="max-w-[1290px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {homepageProjects.map((project, i) => (
            <PortfolioCard
              key={project.slug}
              project={project}
              className={i === 1 || i === 2 ? "lg:col-span-2" : ""}
            />
          ))}
        </div>
      </section>

      {/* The Fuzz Tax */}
      <section ref={fuzzSectionRef} className="bg-[#f8e4cc] py-5 md:py-0 overflow-hidden">
        <div className="max-w-[1290px] mx-auto flex flex-col md:flex-row md:items-stretch md:justify-between gap-8 lg:gap-[40px] md:px-8 lg:max-w-screen lg:pl-20 lg:pr-20">

          {/* Left: text */}
          <div className="px-5 sm:px-10 md:px-0 flex flex-col gap-5 lg:gap-[28px] md:w-[42%] md:flex-shrink-0 md:py-[60px] lg:w-[500px] lg:py-[100px] lg:pr-0 lg:pl-0">
            <span className="font-bel text-[13px] bg-[#d7432a] text-[#fcf8f3] rounded-full px-[14px] py-[9px] w-fit uppercase" style={{ letterSpacing: '0.12em' }}>
              The Fuzz Tax
            </span>
            <h2 className="font-bel font-semibold text-[52px] sm:text-[60px] lg:text-[80px] leading-[0.95] text-[#380102]">
              The Real Cost of an Unclear Brand
            </h2>
            <p className="font-aleo text-[16px] leading-[1.65] text-[#380102]">
              A fuzzy or unclear brand doesn't just look bad. Every missed connection, lost pitch, and unconvinced stakeholder has a price tag.
            </p>
            <p className="font-aleo text-[16px] leading-[1.65] text-[#380102]">
              You know something isn't landing the way it should. Pitches that almost close. Team members who struggle to explain what you do. Opportunities that go to someone who just told their story better. We call it the "Fuzz Tax", and it's more fixable than you'd think.
            </p>
          </div>

          {/* Right: rolodex/waterfall — cards loop top to bottom, tilting -3deg in, flat at rest, +3deg out */}
          <div
            className="relative w-full aspect-[1130/770] md:aspect-auto md:h-auto md:self-stretch md:flex-1 lg:flex-none lg:w-[560px] lg:flex-shrink-0 overflow-hidden"
            style={{
              ...(fuzzHorizontal ? { aspectRatio: '6 / 5' } : undefined),
              cursor: 'pointer',
            }}
            onClick={() => setFuzzIndex(p => (p + 1) % 4)}
          >
            {fuzzCards.map((card, i) => {
              const offset = (fuzzIndex - i + 4) % 4;
              // 0=active(center) 1=prev(just exited, peeking behind) 2=hidden(parked, invisible) 3=next(about to enter, peeking ahead)
              // d is the offset along the animation axis (vertical by default, horizontal below 768px)
              const cfgMap: Record<number, { d: number; rot: number; op: number; z: number }> = {
                0: { d: -50,  rot: -1, op: 1, z: 4 },
                3: { d: 20,   rot: -9, op: 1, z: 3 },
                1: { d: -120, rot: 5,  op: 1, z: 3 },
                2: { d: 20,   rot: -9, op: 0, z: 1 },
              };
              const cfg = cfgMap[offset];
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '90%',
                    aspectRatio: '1130 / 770',
                    transform: fuzzHorizontal
                      ? `translate(${cfg.d}%, -50%) rotate(${cfg.rot}deg)`
                      : `translate(-50%, ${cfg.d}%) rotate(${cfg.rot}deg)`,
                    zIndex: cfg.z,
                    opacity: cfg.op,
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                    userSelect: 'none',
                  }}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    style={{ width: '100%', height: '100%', borderRadius: '11px', display: 'block', objectFit: 'cover' }}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Strategy & Consultations */}
      <section className="bg-[#380102] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-10 lg:flex-row lg:gap-[60px] lg:items-center w-full">
          {/* Left text */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-[30px]">
            <span className="font-bel text-[14px] lg:text-[18px] text-[#f8e4cc] border border-[#f8e4cc] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: '0.1em' }}>
              Strategy &amp; Consultations
            </span>
            <p ref={revealRef} className="font-aleo text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.1]">
              <span className="text-[#f8e4cc]">You know what you do and why it matters. </span>
              {"The hard part is finding the language and visuals that make everyone else see it too.".split(" ").map((word, i) => (
                <span
                  key={i}
                  ref={(el) => { revealWordRefs.current[i] = el; }}
                  className="text-[#f8e4cc]"
                  style={{ transition: 'color 0.4s ease' }}
                >
                  {word}{" "}
                </span>
              ))}
            </p>
            <p className="font-aleo text-[16px] leading-[1.6] text-[#f8e4cc]">
              Our strategy sessions are built to close that gap — giving you the clarity, tools, and creative direction to show up consistently and confidently. Every session is tailored to where you are and where you're headed. Some clients walk away ready to run with it on their own. Others use their session as the launchpad for a longer creative partnership. Either way, you leave with actionable insights to propel your brand forward.
            </p>
            <WipeLink
              href="/workshops-audits"
              overlayColor="#380102"
              textOnHover="#f9ce6a"
              className="flex items-center justify-center bg-[#f9ce6a] rounded-[15px] py-[16px] lg:py-[20px] px-[10px] w-full lg:w-[200px] font-bel text-[16px] lg:text-[18px] text-[#380102] transition-all duration-300 hover:ring-2 hover:ring-[#f9ce6a] hover:ring-offset-2 hover:ring-offset-[#380102]"
            >
              Learn More
            </WipeLink>
          </div>

          {/* Right — two always-open cards */}
          <div
            className="flex-1 flex flex-col gap-[10px]"
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Workshops card */}
            <div
              className="bg-[#d7432a] rounded-[25px] p-6 lg:p-[40px] flex flex-col gap-[20px] cursor-pointer transition-all duration-300"
              style={{
                opacity: hoveredCard === 'audits' ? 0.5 : 1,
                transform: hoveredCard === 'workshops' ? 'scale(1.02)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredCard('workshops')}
            >
              <div className="flex items-start gap-4 lg:gap-[20px]">
                <Image src="/.shipstudio/assets/workshop-icon.svg" alt="Workshop" width={94} height={134} className="flex-shrink-0 w-[50px] lg:w-[70px] h-auto" />
                <div className="flex-1 flex items-center justify-between gap-4">
                  <h3 className="font-aleo text-[32px] lg:text-[48px] leading-none text-[#f8e4cc]">Workshops</h3>
                  <div
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ transform: hoveredCard === 'workshops' ? 'translate(4px, -4px)' : 'translate(0,0)' }}
                  >
                    <ArrowOutward color="#f8e4cc" size={25} />
                  </div>
                </div>
              </div>
              <p className="font-aleo text-[16px] leading-[1.6] text-[#f8e4cc]">
                A 1-3 hour collaborative deep dive with your leadership or creative team. Within two weeks of the session, you'll receive a multi-page custom strategy guide with recommendations and resources you can immediately implement across your organization.
              </p>
              <WipeLink
                href="/workshops-audits"
                overlayColor="#f9ce6a"
                textOnHover="#380102"
                className="bg-[#380102] rounded-[15px] py-[16px] lg:py-[20px] px-[10px] text-center font-bel text-[14px] lg:text-[16px] text-[#fcf8f3]"
              >
                Schedule a 30 Minute Intro Call
              </WipeLink>
              <div className="flex flex-wrap gap-[10px]">
                {["The Visual Identity Workshop", "The Brand Narrative Workshop", "The Internal Playbook Workshop"].map((t) => (
                  <span key={t} className="font-bel text-[9px] text-[#d7432a] bg-[#ffc1a7] px-[12px] py-[8px] rounded-[15px]">{t}</span>
                ))}
              </div>
            </div>

            {/* Audits card */}
            <div
              className="bg-[#ffc1a7] rounded-[25px] p-6 lg:p-[40px] flex flex-col gap-[20px] cursor-pointer transition-all duration-300"
              style={{
                opacity: hoveredCard === 'workshops' ? 0.5 : 1,
                transform: hoveredCard === 'audits' ? 'scale(1.02)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredCard('audits')}
            >
              <div className="flex items-start gap-4 lg:gap-[20px]">
                <Image src="/.shipstudio/assets/audit-icon.svg" alt="Audit" width={94} height={151} className="flex-shrink-0 w-[50px] lg:w-[70px] h-auto" />
                <div className="flex-1 flex items-center justify-between gap-4">
                  <h3 className="font-aleo text-[32px] lg:text-[48px] leading-none text-[#380102]">Audits</h3>
                  <div
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ transform: hoveredCard === 'audits' ? 'translate(4px, -4px)' : 'translate(0,0)' }}
                  >
                    <ArrowOutward color="#380102" size={25} />
                  </div>
                </div>
              </div>
              <p className="font-aleo text-[16px] leading-[1.6] text-[#380102]">
                A focused call (30-45 minutes) where we run a SWOT analysis on your selected focus area. You'll receive a one-page PDF of performance notes and recommendations shortly after.
              </p>
              <WipeLink
                href="/workshops-audits"
                overlayColor="#380102"
                textOnHover="#fcf8f3"
                className="bg-[#d7432a] rounded-[15px] py-[16px] lg:py-[20px] px-[10px] text-center font-bel text-[14px] lg:text-[16px] text-[#fcf8f3]"
              >
                Schedule an Audit
              </WipeLink>
              <div className="flex flex-wrap gap-[10px]">
                {["Brand Audits", "Website Audits", "Narrative Audits", "Specific Media Audits", "Videography Audits"].map((t) => (
                  <span key={t} className="font-bel text-[9px] text-[#380102] bg-[#f8e4cc] px-[12px] py-[8px] rounded-[15px]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Services */}
      <section className="bg-[#d7432a] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[100px] flex flex-col gap-8 lg:gap-[30px] items-center">
        <span className="font-bel text-[14px] lg:text-[18px] text-[#f8e4cc] border border-[#f8e4cc] rounded-full px-[15px] py-[10px] uppercase" style={{ letterSpacing: '0.1em' }}>
          p.s. we also have Creative Services
        </span>
        <div className="max-w-[1290px] mx-auto flex flex-col gap-8 lg:flex-row lg:gap-[50px] lg:items-center w-full">
          <div className="flex-1 flex flex-col gap-[10px]">
            <div>
              <h3 className="font-aleo text-[36px] lg:text-[48px] leading-none text-[#f8e4cc]">Growth Plans</h3>
              <p className="font-bel text-[16px] lg:text-[18px] text-[#380102]">Great Brands Need Consistent Creative.</p>
            </div>
            <p className="font-aleo text-[16px] leading-[1.6] text-[#f8e4cc]">
              Looking for a dedicated creative partner? Someone who knows your voice, your goals, and your audience well enough to deliver consistent, professional visuals and content? Our monthly plans give you dedicated creative without the overhead.
            </p>
            <WipeLink
              href="/growth-plans"
              overlayColor="#fcf8f3"
              textOnHover="#380102"
              className="bg-[#380102] rounded-[15px] py-[16px] lg:py-[20px] px-[10px] text-center font-bel text-[14px] lg:text-[15px] text-white w-full lg:w-[426px]"
            >
              Learn More about Growth Plans
            </WipeLink>
          </div>
          <div className="hidden lg:block w-[1px] h-[264px] border border-black" />
          <div className="flex-1 flex flex-col gap-[10px]">
            <div>
              <h3 className="font-aleo text-[36px] lg:text-[48px] leading-none text-[#f8e4cc]">Projects &amp; Express Delivery</h3>
              <p className="font-bel text-[16px] lg:text-[18px] text-[#380102]">Projects À La Carte</p>
            </div>
            <p className="font-aleo text-[16px] leading-[1.6] text-[#f8e4cc]">
              Not every season calls for a full partnership. For well-scoped projects and one-time needs, we offer hourly options that give you professional creativity without the commitment.
            </p>
            <WipeLink
              href="/projects"
              overlayColor="#fcf8f3"
              textOnHover="#380102"
              className="bg-[#380102] rounded-[15px] py-[16px] lg:py-[20px] px-[10px] text-center font-bel text-[14px] lg:text-[15px] text-white w-full lg:w-[426px]"
            >
              Explore Project Options
            </WipeLink>
          </div>
        </div>
      </section>

      {/* Parallax section */}
      <section ref={parallaxRef} className="bg-[#f9ce6a] h-[250px] sm:h-[380px] lg:h-[600px] overflow-hidden relative">
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
      <section className="bg-[#fcf8f3] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px] flex flex-col gap-10 lg:gap-[75px]">
        <div className="max-w-[1290px] mx-auto w-full flex flex-col gap-10 lg:gap-[75px]">
          <div className="max-w-[860px] flex flex-col gap-5 lg:gap-[30px]">
            <span className="font-bel text-[14px] lg:text-[18px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: '0.1em' }}>
              What We Do
            </span>
            <p ref={whatWeDoRevealRef} className="font-aleo text-[26px] sm:text-[30px] lg:text-[36px] leading-[1.1] text-[#380102]">
              {"Every service we offer is rooted in the same belief: beautiful, intentional work creates good in the world. Whether we're building a brand from the ground up or crafting one asset that needs to be exactly right.".split(" ").map((word, i) => (
                <span
                  key={i}
                  ref={(el) => { whatWeDoWordRefs.current[i] = el; }}
                  style={{ opacity: 0.5, transition: 'opacity 0.4s ease' }}
                >
                  {word}{" "}
                </span>
              ))}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[30px]">
            {services.map((s) => (
              <div key={s.title} className="flex flex-col gap-[10px]">
                <Image src={s.icon} alt={s.title} width={120} height={100} className="h-[80px] lg:h-[100px] w-auto object-contain object-left" />
                <h3 className="font-aleo text-[28px] lg:text-[36px] leading-[1.1] text-[#380102]">{s.title}</h3>
                <p className="font-aleo text-[16px] leading-[1.6] text-[#380102]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Slider */}
      <section className="bg-[#f7dec1] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px] flex flex-col gap-8 lg:gap-[50px] items-center">
        <div className="max-w-[1290px] mx-auto w-full relative">
          {featuredProjects.map((t, i) => (
            <div
              key={t.slug}
              className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-[60px] lg:items-center w-full transition-opacity duration-700 ease-in-out"
              style={{
                opacity: i === currentSlide ? 1 : 0,
                position: i === 0 ? 'relative' : 'absolute',
                top: i === 0 ? undefined : 0,
                left: i === 0 ? undefined : 0,
                pointerEvents: i === currentSlide ? 'auto' : 'none',
              }}
            >
              {/* Quote */}
              <div className="flex-1 flex flex-col gap-4 lg:gap-[20px]">
                <svg width="44" height="39" viewBox="0 0 44 39" fill="none">
                  <path d="M0 39V23.4C0 17.4 1.4 12.4 4.2 8.4C7 4.2 11.2 1.4 16.8 0L19.6 5.4C16.4 6.2 13.8 7.8 11.8 10.2C9.8 12.4 8.8 15 8.8 18H16.8V39H0ZM27.2 39V23.4C27.2 17.4 28.6 12.4 31.4 8.4C34.2 4.2 38.4 1.4 44 0L46.8 5.4C43.6 6.2 41 7.8 39 10.2C37 12.4 36 15 36 18H44V39H27.2Z" fill="#d7432a"/>
                </svg>
                <blockquote className="font-aleo font-semibold text-[28px] sm:text-[36px] lg:text-[48px] leading-[1.1] text-[#380102]">
                  {t.clientQuote.text}
                </blockquote>
                <p className="font-bel text-[16px] lg:text-[18px] text-[#380102]">{t.clientQuote.author}, {t.clientQuote.role}</p>
                <Link
                  href={`/portfolio/${t.slug}`}
                  className="flex items-center gap-[10px] bg-[#d7432a] rounded-full px-[15px] py-[10px] w-fit font-bel text-[16px] lg:text-[18px] text-[#fcf8f3] uppercase hover:opacity-90 transition-opacity"
                  style={{ letterSpacing: '0.1em' }}
                >
                  Read the full story <ArrowOutward color="#fcf8f3" size={12} />
                </Link>
              </div>

              {/* Cover media */}
              <Link href={`/portfolio/${t.slug}`} className="w-full h-[280px] sm:h-[380px] lg:flex-1 lg:h-[560px] relative rounded-[8px] overflow-hidden group">
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
                <div className="absolute top-[20px] right-[20px] lg:top-[40px] lg:right-[40px] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" style={{ mixBlendMode: 'difference' }}>
                  <ArrowOutward color="#ffffff" size={25} />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel dots */}
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
      <section className="px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]" style={{ backgroundImage: 'url(/.shipstudio/assets/contact-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1290px] mx-auto w-full">
          <div className="bg-[#f9ce6a] rounded-[25px] p-6 sm:p-10 lg:p-[65px_75px] flex flex-col gap-8 lg:gap-[60px]">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-[48px] lg:items-start">
              <div className="flex-1 flex flex-col gap-6 lg:gap-[48px]">
                <div>
                  <h2 className="font-aleo text-[28px] lg:text-[36px] leading-[1.1] text-[#380102]">Contact us</h2>
                  <p className="font-aleo text-[16px] lg:text-[18px] text-[#380102] opacity-75 mt-[8px]">
                    Send us a message and we'll get back to you within 1-2 business days.
                  </p>
                </div>
                <div className="hidden lg:flex flex-1 bg-[#f9ce6a] border-2 border-dashed border-[#d7432a]/40 rounded-[10px] min-h-[350px] items-center justify-center">
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
