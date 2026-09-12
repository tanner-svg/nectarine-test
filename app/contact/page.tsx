import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nectarine Studio — tell us about your brand and we'll get back to you within 1-2 business days.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#fcf8f3]">
      <section className="px-5 sm:px-10 lg:px-[75px] pt-[90px] lg:pt-[150px] pb-10 lg:pb-[100px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-10 lg:flex-row lg:gap-[80px] lg:items-start">
          {/* Left column: headline + paragraph */}
          <div className="flex-1 flex flex-col gap-5 lg:gap-[25px]">
            <span
              className="font-bel text-[clamp(0.6875rem,0.58rem+0.46vw,0.875rem)] text-[#380102] border border-[#380102] rounded-full px-[12px] py-[6px] lg:px-[15px] lg:py-[8px] w-fit uppercase"
              style={{ letterSpacing: "0.1em" }}
            >
              Contact
            </span>
            <h1 className="font-aleo font-bold text-[clamp(1.75rem,1.54rem+0.9vw,2.25rem)] leading-[1.25] max-w-[520px] xl:font-semibold xl:max-w-[520px]">
              <span className="text-[#380102] xl:font-semibold">Tell us where your brand is stuck. </span>
              <span className="text-[#d7432a]">We'll tell you what it'll take to get it moving.</span>
            </h1>
            <p className="font-aleo text-[16px] lg:text-[18px] text-[#380102] opacity-75 max-w-[480px]">
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

          {/* Right column: contact form */}
          <div className="flex-1 flex flex-col">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
