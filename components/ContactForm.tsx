"use client";
import { useRef, useState } from "react";

const WEB3FORMS_ACCESS_KEY = "5af858dd-01bf-4fa3-b7ab-a58d96368c63";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [hovered, setHovered] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          subject: subjectRef.current?.value || "General inquiry",
          message: messageRef.current?.value,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        [nameRef, emailRef, subjectRef].forEach((r) => {
          if (r.current) r.current.value = "";
        });
        if (messageRef.current) messageRef.current.value = "";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const buttonLabel =
    status === "sending" ? "Sending..." : status === "success" ? "Sent!" : "Submit";

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[8px]">
          <label className="font-inter font-semibold text-[13px] text-[#380102]">Name</label>
          <input
            ref={nameRef}
            type="text"
            required
            placeholder="Jane Doe"
            className="border border-[#380102] rounded-[12px] px-[14px] h-[48px] font-inter text-[14px] text-[#380102] placeholder-[#380102]/45 bg-transparent outline-none focus:ring-2 focus:ring-[#380102]/20"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="font-inter font-semibold text-[13px] text-[#380102]">Email</label>
          <input
            ref={emailRef}
            type="email"
            required
            placeholder="jane@company.com"
            className="border border-[#380102] rounded-[12px] px-[14px] h-[48px] font-inter text-[14px] text-[#380102] placeholder-[#380102]/45 bg-transparent outline-none focus:ring-2 focus:ring-[#380102]/20"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="font-inter font-semibold text-[13px] text-[#380102]">Subject</label>
          <input
            ref={subjectRef}
            type="text"
            placeholder="General inquiry"
            className="border border-[#380102] rounded-[12px] px-[14px] h-[48px] font-inter text-[14px] text-[#380102] placeholder-[#380102]/45 bg-transparent outline-none focus:ring-2 focus:ring-[#380102]/20"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="font-inter font-semibold text-[13px] text-[#380102]">Message</label>
          <textarea
            ref={messageRef}
            required
            placeholder="How can we help?"
            rows={6}
            className="border border-[#380102] rounded-[12px] p-[14px] font-inter text-[14px] text-[#380102] placeholder-[#380102]/45 bg-transparent outline-none focus:ring-2 focus:ring-[#380102]/20 resize-none"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden uppercase w-full bg-[#380102] rounded-[12px] py-[15px] font-bel text-[18px] text-[#f9ce6a] disabled:opacity-60 disabled:cursor-not-allowed transition-opacity hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-[#380102]"
        style={{ letterSpacing: "0.1em" }}
      >
        <span
          className="absolute inset-0 transition-[clip-path] duration-500 ease-in-out pointer-events-none"
          style={{ backgroundColor: "#f9ce6a", clipPath: hovered ? "circle(150% at 0% 50%)" : "circle(0% at 0% 50%)" }}
        />
        <span className="relative z-10" style={{ color: hovered ? "#380102" : "#f9ce6a", transition: "color 0.5s ease-in-out" }}>
          {buttonLabel}
        </span>
      </button>
      {status === "success" && (
        <p className="font-inter text-[14px] text-[#380102] text-center">
          Thanks — we&apos;ll get back to you within 1-2 business days.
        </p>
      )}
      {status === "error" && (
        <p className="font-inter text-[14px] text-red-700 text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
