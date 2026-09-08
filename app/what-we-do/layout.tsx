import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Branding, copywriting, web design, video, events, and brand strategy — explore the full range of creative services from Nectarine Studio.",
};

export default function WhatWeDoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
