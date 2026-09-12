import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WipeLink from "@/components/WipeLink";
import ScheduleCallButton from "@/components/ScheduleCallButton";

export const metadata: Metadata = {
  title: "Audit Complete",
  description: "Thank you for completing Nectarine Studio's brand alignment audit — we'll be in touch shortly with your results.",
};

export default function AuditCompletePage() {
  return (
    <div className="bg-[#fcf8f3]">
      <section className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-10 lg:px-[75px] pt-[110px] pb-[75px] gap-10 lg:gap-[60px]">
        {/* Thank-you message */}
        <div className="max-w-[820px] w-full flex flex-col items-center gap-5 lg:gap-[20px] text-center">
          <span
            className="font-bel text-[13px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            Audit Complete
          </span>
          <h1 className="font-bel font-semibold text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.15] text-[#380102]">
            Thank you for completing the brand alignment audit.
          </h1>
          <p className="font-aleo text-[18px] lg:text-[20px] leading-[1.5] text-[#380102]">
            Our team will be in touch shortly with your results!
          </p>
        </div>

        {/* CTA card */}
        <div className="bg-[#380102] rounded-[25px] px-6 py-10 sm:px-10 lg:px-[75px] lg:py-[65px] max-w-[1120px] w-full flex flex-col items-center gap-6 lg:gap-[25px] text-center">
          <span className="font-bel text-[13px] text-[#fcf8f3] uppercase" style={{ letterSpacing: "0.15em" }}>
            Interested in more?
          </span>
          <h2 className="font-bel font-semibold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.25] text-[#fcf8f3] max-w-[780px]">
            We&apos;d love to discuss your findings with you and help bring your next step to life!
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-[20px] w-full sm:w-auto items-center justify-center pt-[10px]">
            <ScheduleCallButton
              overlayColor="#380102"
              textOnHover="#fcf8f3"
              trackLabel="Schedule a Free Call (Audit Complete)"
              className="flex items-center justify-center bg-[#d7432a] rounded-[15px] py-[18px] px-[35px] w-full sm:w-auto font-bel text-[16px] text-[#fcf8f3]"
            >
              Schedule a Free Call
            </ScheduleCallButton>
            <WipeLink
              href="/what-we-do"
              overlayColor="#fcf8f3"
              textOnHover="#380102"
              className="flex items-center justify-center border border-[#fcf8f3] rounded-[15px] py-[18px] px-[35px] w-full sm:w-auto font-bel text-[16px] text-[#fcf8f3]"
            >
              Learn What We Do
            </WipeLink>
          </div>
          <a
            href="/audit"
            className="font-aleo text-[16px] text-[#fcf8f3] underline underline-offset-4 hover:text-[#ffc1a7] transition-colors duration-200"
          >
            Run Another Audit
          </a>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
