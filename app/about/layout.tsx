import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the people behind Nectarine Studio, and the mission, vision, and values that shape how we work.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
