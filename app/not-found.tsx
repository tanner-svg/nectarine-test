import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WipeLink from "@/components/WipeLink";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist — let's get you back to Nectarine Studio.",
};

export default function NotFound() {
  return (
    <div className="bg-[#fcf8f3]">
      <section className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-10 lg:px-[75px] pt-[110px] pb-[75px] gap-8 lg:gap-[40px] text-center">
        <span
          className="font-bel text-[13px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase"
          style={{ letterSpacing: "0.1em" }}
        >
          404 — Page Not Found
        </span>

        <h1 className="font-bel font-semibold text-[44px] sm:text-[60px] lg:text-[85px] leading-[1.03] text-[#380102] max-w-[900px]">
          This branch <span className="text-[#d7432a]">doesn&apos;t exist.</span>
        </h1>

        <p className="font-aleo text-[18px] lg:text-[20px] leading-[1.5] text-[#380102] max-w-[560px]">
          The page you&apos;re looking for must have wandered off, or the link&apos;s gone stale. Let&apos;s get you back to something real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 lg:gap-[20px] w-full sm:w-auto items-center justify-center pt-[10px]">
          <WipeLink
            href="/"
            overlayColor="#380102"
            textOnHover="#f9ce6a"
            trackLabel="Back to Home (404)"
            className="flex items-center justify-center bg-[#f9ce6a] rounded-[15px] py-[18px] px-[35px] w-full sm:w-auto font-bel text-[16px] text-[#380102]"
          >
            Back to Home
          </WipeLink>
          <WipeLink
            href="/work"
            overlayColor="#380102"
            textOnHover="#fcf8f3"
            trackLabel="See Our Work (404)"
            className="flex items-center justify-center border-2 border-[#380102] rounded-[15px] py-[18px] px-[35px] w-full sm:w-auto font-bel text-[16px] text-[#380102]"
          >
            See Our Work
          </WipeLink>
        </div>

        <a
          href="/contact"
          className="font-aleo text-[16px] text-[#380102] underline underline-offset-4 hover:text-[#d7432a] transition-colors duration-200"
        >
          Or get in touch
        </a>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
