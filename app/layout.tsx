import type { Metadata } from "next";
import { Belanosima, Aleo, Inter } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import PageTransition from "@/components/PageTransition";
import MainContent from "@/components/MainContent";
import { TransitionProvider } from "@/components/TransitionContext";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import CookieBanner from "@/components/CookieBanner";
import GoogleTags from "@/components/GoogleTags";

const belanosima = Belanosima({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-belanosima",
  display: "swap",
});

const aleo = Aleo({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-aleo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nectarine.ink"),
  // Every other page's title gets " | Nectarine Studio" added to the end
  // (e.g. "About" becomes "About | Nectarine Studio"). The homepage, which
  // doesn't set its own title, just shows "Nectarine Studio".
  title: {
    default: "Nectarine Studio",
    template: "%s | Nectarine Studio",
  },
  // Tells Google the one "official" address for each page, so it never
  // treats variations (like a trailing slash or tracking tags) as duplicates.
  alternates: {
    canonical: "./",
  },
  description: "We are a creative studio developing timeless, world-class brands for holistic, impact-driven companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${belanosima.variable} ${aleo.variable} ${inter.variable}`}>
        <GoogleTags />
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        <TransitionProvider>
          <PageTransition />
          <MainContent>{children}</MainContent>
        </TransitionProvider>
        <AgentationProvider />
        <CookieBanner />
      </body>
    </html>
  );
}
