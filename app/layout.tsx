import type { Metadata } from "next";
import { Belanosima, Aleo, Inter } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import PageTransition from "@/components/PageTransition";
import MainContent from "@/components/MainContent";
import { TransitionProvider } from "@/components/TransitionContext";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

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
  title: "Nectarine Studio",
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
        <SmoothScroll />
        <Navbar />
        <TransitionProvider>
          <PageTransition />
          <MainContent>{children}</MainContent>
        </TransitionProvider>
        <AgentationProvider />
      </body>
    </html>
  );
}
