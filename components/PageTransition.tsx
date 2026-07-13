"use client";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTransitionCtx } from "./TransitionContext";

export default function PageTransition() {
  const { startExit, startEnter } = useTransitionCtx();
  const router = useRouter();
  const pathname = usePathname();
  const transitioning = useRef(false);

  // Intercept internal link clicks
  useEffect(() => {
    const onLinkClick = (e: MouseEvent) => {
      if (transitioning.current) return;

      const anchor = (e.target as HTMLElement).closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) return;

      const dest = new URL(href, window.location.origin);
      if (dest.pathname === pathname) return;

      e.preventDefault();
      e.stopPropagation();

      transitioning.current = true;
      startExit(() => router.push(href));
    };

    document.addEventListener("click", onLinkClick, true);
    return () => document.removeEventListener("click", onLinkClick, true);
  }, [pathname, router, startExit]);

  // When the new page is ready, begin the entrance
  useEffect(() => {
    if (!transitioning.current) return;
    transitioning.current = false;
    startEnter();
  }, [pathname, startEnter]);

  return null;
}
