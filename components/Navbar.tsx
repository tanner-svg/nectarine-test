"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();

  // Close (without animation) when route changes — the curtain hides this
  useEffect(() => {
    setOpen(false);
    setIsClosing(false);
  }, [pathname]);

  // Animated close for the X button (when not navigating)
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
        <Link href="/">
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

      {/* Hamburger / X button — above the overlay (z-[110]) and above the curtain (z-[200]) */}
      <button
        onClick={() => open ? closeMenu() : setOpen(true)}
        className={`fixed top-[18px] lg:top-[30px] right-5 sm:right-10 lg:right-[75px] w-[44px] h-[44px] lg:w-[50px] lg:h-[50px] flex flex-col items-center justify-center gap-[6px] z-[210] transition-all duration-300 ${!open && !isClosing ? 'rounded-full bg-[#d7432a]' : ''}`}
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

      {/* Full-screen menu overlay — renders during open AND during close animation */}
      {(open || isClosing) && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Circle that expands in / contracts out */}
          <div
            className="absolute inset-0 bg-[#d7432a]"
            style={{
              clipPath: isClosing
                ? 'circle(200% at calc(100% - 100px) 55px)'
                : 'circle(200% at calc(100% - 100px) 55px)',
              animation: isClosing
                ? 'menu-circle-contract 0.38s cubic-bezier(0.55, 0, 0.55, 1) forwards'
                : 'menu-circle-expand 0.55s ease-out forwards',
            }}
          />

          {/* Menu content */}
          <div
            className="relative z-10 h-full flex flex-col px-5 sm:px-10 lg:px-[75px] pt-[20px] lg:pt-[30px]"
            style={{
              animation: isClosing
                ? 'menu-content-fade-out 0.2s ease-in forwards'
                : 'menu-fade-in 0.35s ease 0.3s both',
            }}
          >
            {/* Top bar — logo only */}
            <div className="h-[50px] flex items-center">
              <Image
                src="/.shipstudio/assets/nectarine-logo-5.svg"
                alt="Nectarine"
                width={299}
                height={51}
                className="h-[51px] w-auto"
              />
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-[15px]">
              <Link href="/work"
                className="font-bel font-semibold text-[52px] sm:text-[65px] lg:text-[85px] leading-none text-[#f9ce6a] hover:opacity-80 transition-opacity">
                Our Work
              </Link>
              <Link href="/workshops-audits"
                className="font-bel font-semibold text-[52px] sm:text-[65px] lg:text-[85px] leading-none text-[#380102] hover:opacity-80 transition-opacity">
                Workshops &amp; Audits
              </Link>
              <Link href="/what-we-do"
                className="font-bel font-semibold text-[52px] sm:text-[65px] lg:text-[85px] leading-none text-[#380102] hover:opacity-80 transition-opacity">
                Creative Services
              </Link>

              {/* Secondary links */}
              <div className="flex items-center gap-[25px] mt-[25px]">
                <Link href="/about"
                  className="font-bel text-[18px] text-[#f8e4cc] border border-[#f8e4cc] rounded-full px-[15px] py-[10px] hover:bg-[#f8e4cc]/10 transition-colors">
                  About us
                </Link>
                <Link href="/the-fuzz-tax"
                  className="font-bel text-[18px] text-[#f8e4cc] border border-[#f8e4cc] rounded-full px-[15px] py-[10px] hover:bg-[#f8e4cc]/10 transition-colors">
                  The Fuzz Tax
                </Link>
                <Link href="/contact"
                  className="font-bel text-[18px] text-[#d7432a] bg-[#f7dec1] rounded-full px-[15px] py-[10px] hover:opacity-90 transition-opacity">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
