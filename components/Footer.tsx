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
    <footer style={{ backgroundColor: bg }} className="px-[75px] py-[75px] flex flex-col gap-[75px]">
      <div className="flex items-center gap-[40px] max-w-[1290px] mx-auto w-full">
        {/* Left: About blurb */}
        <div className="flex flex-col gap-[20px] w-[582px]">
          <span
            style={{ color: textColor, borderColor }}
            className="font-bel text-[18px] border rounded-full px-[15px] py-[10px] w-fit"
          >
            We are nectarine
          </span>
          <p style={{ color: textColor }} className="font-aleo text-[36px] leading-[1.1]">
            We are a creative studio developing timeless, world-class brands for holistic, impact-driven companies.
          </p>
          <Link href="/about" className="flex items-center gap-[10px] w-fit">
            <span className="font-bel text-[18px]" style={{ color: accentColor }}>More About Nectarine</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H1M9 1V9" stroke="#d7432a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Right: Social + email */}
        <div className="flex-1 flex items-center justify-center gap-[49px]">
          <div className="flex flex-col gap-[5px]">
            <Link href="https://instagram.com" target="_blank" className="flex items-center gap-[10px]">
              <span className="font-bel text-[18px]" style={{ color: accentColor }}>Instagram</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H1M9 1V9" stroke="#d7432a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="flex items-center gap-[10px]">
              <span className="font-bel text-[18px]" style={{ color: accentColor }}>Linkedin</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H1M9 1V9" stroke="#d7432a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <Link
            href="mailto:hello@nectarine.ink"
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
          <span className="font-bel text-[18px]" style={{ color: accentColor }}>hello@nectarine.ink</span>
          <span className="font-bel text-[18px]" style={{ color: accentColor }}>© 2026 nectarine studio llc.</span>
        </div>
      </div>
    </footer>
  );
}
