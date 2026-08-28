"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { lenisRef } from "@/lib/lenis";

// Drives real window scroll via requestAnimationFrame, so existing
// scroll listeners (getBoundingClientRect, window.scrollY, etc.) keep working.
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
