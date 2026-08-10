import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Audit",
};

export default function AuditPage() {
  return (
    <div className="pt-[80px] lg:pt-[110px]">
      <div className="w-full h-[calc(100vh-80px)] lg:h-[calc(100vh-110px)] overflow-hidden">
        {/* Iframe is laid out at 1/1.2 of the container, then scaled up 1.2x
            from its top-left corner so the embedded content renders 20%
            bigger while still exactly filling the visible area. */}
        <iframe
          src="https://brand-audit.tanner-a09.workers.dev/"
          title="Brand Audit"
          className="border-0 origin-top-left"
          style={{ width: "calc(100% / 1.2)", height: "calc(100% / 1.2)", transform: "scale(1.2)" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
