"use client";
import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/**
 * A link with the site's signature circular wipe-fill hover effect. Several
 * pages define their own copy of this inline; this shared version exists so
 * server-component pages (which can't hold hover state themselves) can still
 * use the same effect by rendering this as a client child.
 *
 * Pass `trackLabel` (not a function — server components can't pass functions
 * to client children) to have it report its own "button_click" GA event.
 *
 * Omit `href` to render a <button> instead of a link — used by things like
 * ScheduleCallButton, which open an in-page modal rather than navigating.
 */
export default function WipeLink({
  href,
  overlayColor,
  textOnHover,
  className,
  children,
  trackLabel,
  onClick,
  target,
}: {
  href?: string;
  overlayColor: string;
  textOnHover: string;
  className?: string;
  children: React.ReactNode;
  trackLabel?: string;
  onClick?: () => void;
  target?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const content = (
    <>
      <span
        className="absolute inset-0 transition-[clip-path] duration-500 ease-in-out pointer-events-none"
        style={{ backgroundColor: overlayColor, clipPath: hovered ? "circle(150% at 0% 50%)" : "circle(0% at 0% 50%)" }}
      />
      <span className="relative z-10" style={{ color: hovered ? textOnHover : "inherit", transition: "color 0.5s ease-in-out" }}>
        {children}
      </span>
    </>
  );
  const sharedProps = {
    className: `relative overflow-hidden uppercase ${className ?? ""}`,
    style: { letterSpacing: "0.1em" } as const,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  const handleClick = () => {
    if (trackLabel) trackEvent("button_click", { button_label: trackLabel, destination: href ?? "booking_modal" });
    onClick?.();
  };

  if (!href) {
    return (
      <button type="button" onClick={handleClick} {...sharedProps}>
        {content}
      </button>
    );
  }
  return (
    <Link href={href} target={target} onClick={handleClick} {...sharedProps}>
      {content}
    </Link>
  );
}
