"use client";
import { trackEvent } from "@/lib/analytics";

/**
 * A plain <a> tag that reports a "button_click" GA event before
 * navigating. Use this (instead of a bare <a>) for any contact/CTA link
 * that lives inside an otherwise server-rendered page, so the page itself
 * doesn't need to become a client component just to attach one onClick.
 */
export default function TrackedLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent("button_click", { button_label: label, destination: href })}
    >
      {children}
    </a>
  );
}
