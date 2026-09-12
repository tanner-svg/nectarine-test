import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nectarine Studio — tell us about your brand and we'll get back to you within 1-2 business days.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#fcf8f3]">
      {/* Hero */}
      <section className="px-5 sm:px-10 lg:px-[75px] pt-[90px] lg:pt-[150px] pb-10 lg:pb-[60px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-5 lg:gap-[25px]">
          <span
            className="font-bel text-[clamp(0.6875rem,0.58rem+0.46vw,0.875rem)] text-[#380102] border border-[#380102] rounded-full px-[12px] py-[6px] lg:px-[15px] lg:py-[8px] w-fit uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            Contact
          </span>
          <h1 className="font-aleo font-bold text-[clamp(1.75rem,1.54rem+0.9vw,2.25rem)] leading-[1.25] max-w-[860px] xl:font-semibold xl:max-w-[860px]">
            <span className="text-[#380102] xl:font-semibold">Tell us where your brand is stuck. </span>
            <span className="text-[#d7432a]">We'll tell you what it'll take to get it moving.</span>
          </h1>
          <p className="font-aleo text-[16px] lg:text-[18px] text-[#380102] opacity-75 max-w-[600px]">
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:hello@nectarine.ink"
              className="underline hover:text-[#d7432a] transition-colors duration-200"
            >
              hello@nectarine.ink
            </a>
            .
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section
        className="px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]"
        style={{ backgroundImage: "linear-gradient(to bottom, #F7DEC1 50%, #380102 50%)", backgroundColor: "#F8E4CC" }}
      >
        <div className="max-w-[1290px] mx-auto w-full">
          <div className="bg-[#f9ce6a] rounded-[25px] p-6 sm:p-10 lg:p-[65px_75px] flex flex-col gap-8 lg:gap-[60px]">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-[48px] lg:items-start">
              <div className="flex-1 flex flex-col gap-6 lg:gap-[32px]">
                <Image
                  src="/.shipstudio/assets/Contact-Illustration.png"
                  alt=""
                  width={207}
                  height={154}
                  className="w-[160px] lg:w-[210px] h-auto"
                />
                <div>
                  <h2 className="font-aleo text-[28px] lg:text-[36px] leading-[1.1] text-[#380102]">Send us a message</h2>
                  <p className="font-aleo text-[16px] lg:text-[18px] text-[#380102] opacity-75 mt-[8px]">
                    Fill this out and we'll get back to you within 1-2 business days.
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
