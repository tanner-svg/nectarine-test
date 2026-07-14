"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainLinks = [
  { href: '/work', label: 'Our Work' },
  { href: '/workshops-audits', label: 'Workshops & Audits' },
  { href: '/what-we-do', label: 'Creative Services' },
];

const secondaryLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/the-fuzz-tax', label: 'The Fuzz Tax' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setIsClosing(false);
    setLogoVisible(false);
  }, [pathname]);

  // Double-rAF ensures the opacity:0 frame is painted before the transition fires
  useEffect(() => {
    if (open && !isClosing) {
      setLogoVisible(false);
      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => setLogoVisible(true));
        return () => cancelAnimationFrame(r2);
      });
      return () => cancelAnimationFrame(r1);
    } else {
      setLogoVisible(false);
    }
  }, [open, isClosing]);

  const closeMenu = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 380);
  }, []);

  return (
    <>
      {/* Default navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 sm:px-10 lg:px-[75px] h-[80px] lg:h-[110px]">
        <Link href="/" className="navbar-logo">
          <Image
            src="/.shipstudio/assets/nectarine-logo-4.svg"
            alt="Nectarine"
            width={286}
            height={50}
            className="h-[38px] lg:h-[50px] w-auto"
          />
        </Link>
        <div className="w-[44px] h-[44px] lg:w-[50px] lg:h-[50px]" />
      </nav>

      {/* Hamburger / X button — always above curtain (z-[210]) */}
      <button
        onClick={() => open ? closeMenu() : setOpen(true)}
        className={`fixed top-[18px] lg:top-[30px] right-5 sm:right-10 lg:right-[75px] w-[44px] h-[44px] lg:w-[50px] lg:h-[50px] flex flex-col items-center justify-center gap-[6px] z-[210] transition-all duration-300 hover:scale-[1.05] ${!open && !isClosing ? 'rounded-full bg-[#d7432a]' : ''}`}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span
          className="block w-[32px] h-[2px] bg-[#fcf8f3] origin-center"
          style={{
            transition: 'transform 0.35s ease-in-out',
            transform: open && !isClosing ? 'translateY(4px) rotate(45deg)' : 'none',
          }}
        />
        <span
          className="block w-[32px] h-[2px] bg-[#fcf8f3] origin-center"
          style={{
            transition: 'transform 0.35s ease-in-out',
            transform: open && !isClosing ? 'translateY(-4px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Full-screen menu overlay */}
      {(open || isClosing) && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Circle expand / contract */}
          <div
            className="absolute inset-0 bg-[#d7432a]"
            style={{
              clipPath: 'circle(200% at calc(100% - 100px) 55px)',
              animation: isClosing
                ? 'menu-circle-contract 0.38s cubic-bezier(0.55, 0, 0.55, 1) forwards'
                : 'menu-circle-expand 0.55s ease-out forwards',
            }}
          />

          {/* Logo — own layer, React-driven opacity transition (no position change) */}
          <div
            className="absolute top-[20px] lg:top-[30px] left-5 sm:left-10 lg:left-[75px] z-20"
            style={{
              opacity: logoVisible ? 1 : 0,
              transition: isClosing ? 'opacity 0.2s ease-in' : 'opacity 0.55s ease-out',
            }}
          >
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/.shipstudio/assets/nectarine-logo-5.svg"
                alt="Nectarine"
                width={299}
                height={51}
                className="h-[44px] lg:h-[51px] w-auto"
              />
            </Link>
          </div>

          {/* Nav links — translateY + opacity animation */}
          <div
            className="relative z-10 h-full flex flex-col items-center justify-center gap-[15px] px-5 sm:px-10 lg:px-[75px]"
            style={{
              animation: isClosing
                ? 'menu-content-fade-out 0.2s ease-in forwards'
                : 'menu-fade-in 0.35s ease 0.3s both',
            }}
          >
            {mainLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-bel font-semibold text-[52px] sm:text-[65px] lg:text-[85px] leading-none hover:opacity-80 transition-opacity ${pathname === href ? 'text-[#f9ce6a]' : 'text-[#380102]'}`}
              >
                {label}
              </Link>
            ))}

            {/* Secondary links — eyebrow chip style with hover scale */}
            <div
              className="flex items-center gap-[12px] mt-[25px] flex-wrap justify-center"
              onMouseLeave={() => setHoveredChip(null)}
            >
              {secondaryLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onMouseEnter={() => setHoveredChip(href)}
                  className="font-bel text-[13px] sm:text-[14px] text-[#fcf8f3] border border-[#fcf8f3]/60 rounded-full px-[15px] py-[9px] uppercase transition-all duration-200"
                  style={{
                    letterSpacing: '0.1em',
                    transform: hoveredChip === href ? 'scale(1.05)' : 'scale(1)',
                    opacity: hoveredChip && hoveredChip !== href ? 0.5 : 1,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
