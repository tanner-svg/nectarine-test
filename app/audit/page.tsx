import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Audit",
};

export default function AuditPage() {
  return (
    <div className="pt-[80px] lg:pt-[110px]">
      <iframe
        src="https://brand-audit.pages.dev/"
        title="Brand Audit"
        className="w-full h-[calc(100vh-80px)] lg:h-[calc(100vh-110px)] border-0"
        loading="lazy"
      />
    </div>
  );
}
