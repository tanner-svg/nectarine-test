import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  variant?: "dark" | "light";
}

export default function Footer({ variant = "dark" }: FooterProps) {
  const isDark = variant === "dark";
  const bg = isDark ? "#380102" : "#f7dec1";
  const textColor = isDark ? "#fcf8f3" : "#380102";
  const accentColor = "#d7432a";
  const borderColor = isDark ? "#fcf8f3" : "#380102";
  const emailBg = isDark ? "#d7432a" : "#d7432a";
  const emailTextColor = isDark ? "#fcf8f3" : "#f7dec1";
  const logoFooterSrc = isDark
    ? "/.shipstudio/assets/nectarine-logo-footer-4.svg"
    : "/.shipstudio/assets/nectarine-logo-footer-5.svg";

  return (
    <footer style={{ backgroundColor: bg }} className="px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px] flex flex-col gap-10 lg:gap-[75px]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[40px] max-w-[1290px] mx-auto w-full">
        {/* Left: About blurb */}
        <div className="flex flex-col gap-[20px] w-full lg:w-[582px]">
          <span
            style={{ color: textColor, borderColor, letterSpacing: '0.1em' }}
            className="font-bel text-[14px] lg:text-[18px] border rounded-full px-[15px] py-[10px] w-fit uppercase"
          >
            We are nectarine
          </span>
          <p style={{ color: textColor }} className="font-aleo text-[26px] sm:text-[30px] lg:text-[36px] leading-[1.1]">
            We are a creative studio developing timeless, world-class brands for holistic, impact-driven companies.
          </p>
          <Link href="/about" className="flex items-center gap-[10px] w-fit">
            <span className="font-bel text-[16px] lg:text-[18px]" style={{ color: accentColor }}>More About Nectarine</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H1M9 1V9" stroke="#d7432a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Right: email */}
        <div className="flex-1 flex items-center justify-start lg:justify-end">
          <Link
            href="mailto:hello@nectarine.ink"
            target="_blank"
            style={{ backgroundColor: emailBg }}
            className="flex items-center gap-[10px] rounded-full px-[15px] py-[10px]"
          >
            <span className="font-bel text-[18px]" style={{ color: emailTextColor }}>hello@nectarine.ink</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H1M9 1V9" stroke={emailTextColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Logo wordmark */}
      <div className="max-w-[1285px] mx-auto w-full flex flex-col gap-[25px]">
        <Image
          src={logoFooterSrc}
          alt="Nectarine"
          width={1285}
          height={218}
          className="w-full h-auto"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[20px]">
            <Link href="https://www.linkedin.com/company/nectarineink" target="_blank" className="font-bel text-[18px]" style={{ color: accentColor }}>
              LinkedIn
            </Link>
            <Link
              href="https://www.linkedin.com/jobs/nectarine-jobs-worldwide?f_C=104156262&trk=top-card_top-card-primary-button-top-card-primary-cta&position=1&pageNum=0"
              target="_blank"
              className="font-bel text-[18px]"
              style={{ color: accentColor }}
            >
              Careers
            </Link>
          </div>
          <span className="font-bel text-[18px]" style={{ color: accentColor }}>© 2026 nectarine studio llc.</span>
        </div>
      </div>
    </footer>
  );
}
