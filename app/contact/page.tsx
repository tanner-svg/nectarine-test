import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nectarine Studio — tell us about your brand and we'll get back to you within 1-2 business days.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#fcf8f3]">
      <section className="px-5 sm:px-10 lg:px-[75px] pt-[110px] lg:pt-[160px] pb-12 lg:pb-[100px]">
        <div className="max-w-[1290px] mx-auto flex flex-col items-center gap-8 lg:gap-[50px]">
          <h1 className="font-aleo font-semibold text-[26px] sm:text-[32px] lg:text-[40px] leading-[1.35] text-center max-w-[880px]">
            <span className="text-[#380102]">Tell us about what you&apos;re building or dreaming, or ask us any questions you have. </span>
            <span className="text-[#d7432a]">We&apos;re always happy to chat!</span>
          </h1>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[30px] items-stretch">
            {/* Booking card */}
            <div className="bg-[#f9ce6a] rounded-[25px] p-6 lg:p-[40px] flex flex-col gap-6 lg:gap-[30px]">
              <div className="relative w-full flex-1 min-h-[260px] lg:min-h-[320px] rounded-[15px] overflow-hidden">
                <Image
                  src="/.shipstudio/assets/contact-booking-graphic.png"
                  alt="A booking calendar and video call showing how easy it is to schedule a strategy call"
                  fill
                  className="object-contain"
                />
              </div>
              <ScheduleCallButton
                overlayColor="#fcf8f3"
                textOnHover="#380102"
                trackLabel="Book a Strategy Call (Contact Page)"
                className="flex items-center justify-center bg-[#380102] rounded-[15px] py-[18px] px-[20px] w-full font-bel text-[16px] text-[#fcf8f3]"
              >
                Book a Strategy Call
              </ScheduleCallButton>
            </div>

            {/* Form card */}
            <div className="bg-[#d7432a] rounded-[25px] p-6 lg:p-[40px] flex flex-col">
              <ContactForm />
            </div>
          </div>

          <p className="font-aleo text-[15px] lg:text-[16px] text-[#380102] opacity-75 text-center">
            Prefer email? Reach us directly at{" "}
            <TrackedLink
              href="mailto:hello@nectarine.ink"
              label="Email Us (Contact Page)"
              className="underline hover:text-[#d7432a] transition-colors duration-200"
            >
              hello@nectarine.ink
            </TrackedLink>
            .
          </p>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
