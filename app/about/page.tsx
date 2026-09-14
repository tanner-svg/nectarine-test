"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import WipeLink from "@/components/WipeLink";
import team, { type TeamMember } from "@/data/content/team";
import values from "@/data/content/values";
import { trackEvent } from "@/lib/analytics";

const HERO_SENTENCE =
  "We are a creative studio developing timeless, world-class brands for holistic, impact-driven companies.";

const NEKTAR_PARAGRAPHS = [
  "Nektar — the drink of eternal life, immortality, overcoming death.",
  "Nectar is often mentioned alongside ambrosia, the food of the Greek and Roman gods. To the ancients, the two together gave the gods their immortality — nectar meaning \"overcoming death,\" and ambrosia, \"immortality.\" Nektar is believed to come from the Greek nek- (\"death\") and -tar (\"he overcomes, or crosses over\").",
];

const MISSION = {
  short: "To elevate the creative expression of people who change the world.",
  long: [
    "We believe the most powerful force for change in the world is people working together toward something that matters. We see that most clearly in the business teams and organizations that are just as serious about their impact as they are about their growth… teams that do right by their people, invest in their communities, and care about what they're putting into the world while they're building something great.",
    "Those are the teams we want to come alongside.",
    "And we believe that when those teams communicate beautifully — when their story is told with clarity, intention, and craft — it doesn't just help them reach their goals. It creates something new in the world. Beauty has a unique power to move people, to build belief, and to open doors that logic alone can't. When we help mission-driven leaders steward that well, the work doesn't just look good. It does good.",
  ],
};

const VISION = {
  short:
    "That by empowering the creative expression of our clients and team, they'll grow wildly, access dream opportunities, and use their passions to transform their communities and workplaces in love.",
  long: [
    "We want to see our clients and our team genuinely thrive, not just professionally, but in the fullest sense of the word. When a brand finally has the clarity, story, and visual identity to match the quality of the work behind it, something unlocks. Doors open. The right opportunities show up. People step into their work with more confidence and conviction.",
    "We want to be the launchpad for that… the creative foundation that helped a company cross into their million or billion dollar years, that helped a young creative discover what they were capable of, that gave a founder the language to finally walk into the room and own it. Not because we handed them something, but because we saw what was already there — their strengths, their passions, their gifts — and helped them articulate it in a way the rest of the world can understand.",
    "We believe there are gifts in the people we work with that are waiting to be called out. And we believe that when people are empowered to carry those gifts with confidence, the impact doesn't stop with them. It spills into their teams, their communities, the lives of the people around them. We want to see our clients succeed wildly, and we want that success to be a blessing to the world they touch.",
  ],
};

const AVATAR_COLORS = ["#f9ce6a", "#ffc1a7", "#f7dec1", "#f8e4cc"];

function ChevronIcon({ direction = "right", color = "#380102" }: { direction?: "left" | "right"; color?: string }) {
  const d = direction === "right" ? "M5 2L11 8L5 14" : "M11 2L5 8L11 14";
  return (
    <svg width="10" height="16" viewBox="0 0 16 16" fill="none">
      <path d={d} stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoModal({ title, body, onClose }: { title: string; body: string[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-[50px] bg-black/40">
      <div className="relative bg-[#fcf8f3] rounded-[25px] p-6 lg:p-[50px] max-w-[820px] w-full flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 lg:top-[25px] lg:right-[25px] z-10" aria-label="Close">
          <Image src="/.shipstudio/assets/cancel.svg" alt="Close" width={36} height={36} />
        </button>
        <h2 className="font-aleo font-semibold text-[26px] lg:text-[34px] leading-[1.15] text-[#380102] pr-[40px]">{title}</h2>
        <div className="flex flex-col gap-4">
          {body.map((para, i) => (
            <p key={i} className="font-aleo text-[16px] lg:text-[18px] leading-[1.6] text-[#380102]">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function AvatarPlaceholder({ name, index }: { name: string; index: number }) {
  const initials = name
    ? name
        .split(" ")
        .filter((w) => /^[A-Za-z]/.test(w))
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";
  return (
    <div
      className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
    >
      <span className="font-bel font-semibold text-[32px] lg:text-[38px] text-[#380102]">{initials}</span>
    </div>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 lg:gap-[18px] border border-[#380102]/20 rounded-[15px] p-6 lg:p-[30px]">
      {member.photo ? (
        <div className="relative w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] rounded-full overflow-hidden flex-shrink-0">
          <Image src={member.photo} alt={member.name || member.role} fill className="object-cover" />
        </div>
      ) : (
        <AvatarPlaceholder name={member.name} index={index} />
      )}
      <div className="flex flex-col gap-[4px]">
        {member.name && (
          <h3 className="font-aleo font-semibold text-[20px] lg:text-[22px] leading-[1.2] text-[#380102]">{member.name}</h3>
        )}
        <p className="font-bel text-[11px] text-[#d7432a] uppercase" style={{ letterSpacing: "0.08em" }}>
          {member.role}
        </p>
      </div>
      <div className="w-full border-t border-[#380102]/15" />
      <div className="flex flex-col gap-[8px] w-full">
        <span className="font-bel text-[10px] text-[#380102]/55 uppercase" style={{ letterSpacing: "0.1em" }}>
          5 Favorite Things About Life
        </span>
        {member.favorites.length > 0 ? (
          <ul className="flex flex-col gap-[6px] text-left">
            {member.favorites.map((fav) => (
              <li key={fav} className="font-aleo text-[14px] leading-[1.4] text-[#380102] flex items-start gap-[8px]">
                <span className="text-[#d7432a] leading-[1.4]">•</span>
                <span>{fav}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-aleo text-[14px] italic text-[#380102]/50">Favorites coming soon.</p>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const sentenceRef = useRef<HTMLParagraphElement>(null);
  const timelessRef = useRef<HTMLParagraphElement>(null);
  const nektarRef = useRef<HTMLDivElement>(null);

  // The hero is "pinned" (position: sticky) for an extra-tall wrapper, so the
  // sentence-to-"timeless"-to-Nektar transition plays out while the section
  // stays put in the viewport, only releasing to normal scroll once it's done.
  useEffect(() => {
    const handleScroll = () => {
      if (!heroWrapperRef.current) return;
      const rect = heroWrapperRef.current.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));

      const crossfade = Math.min(1, progress / 0.45);
      if (sentenceRef.current) sentenceRef.current.style.opacity = String(1 - crossfade);
      if (timelessRef.current) timelessRef.current.style.opacity = String(crossfade);

      const reveal = Math.min(1, Math.max(0, (progress - 0.35) / 0.65));
      if (nektarRef.current) {
        nektarRef.current.style.opacity = String(reveal);
        nektarRef.current.style.transform = `translateY(${(1 - reveal) * 24}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [missionOpen, setMissionOpen] = useState(false);
  const [visionOpen, setVisionOpen] = useState(false);

  const [valueIndex, setValueIndex] = useState(0);
  const [valueQuoteOpen, setValueQuoteOpen] = useState(false);
  const activeValue = values[valueIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setValueIndex((i) => (i + 1) % values.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#fcf8f3]">
      {/* Hero: pinned in the viewport while the sentence dissolves to "timeless"
          and the Nektar meaning fades in — see the scroll effect above. */}
      <section ref={heroWrapperRef} className="relative" style={{ height: "230vh" }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden px-5 sm:px-10 lg:px-[75px]">
          <div className="max-w-[1290px] mx-auto w-full flex flex-col gap-8 lg:gap-[40px]">
            <span className="font-bel text-[13px] lg:text-[14px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: "0.1em" }}>
              We Are Nectarine
            </span>

            <div className="relative">
              <p ref={sentenceRef} className="font-aleo font-semibold text-[32px] sm:text-[40px] lg:text-[56px] leading-[1.15] max-w-[1080px] text-[#380102]" style={{ transition: "opacity 0.4s ease" }}>
                {HERO_SENTENCE}
              </p>
              <p
                ref={timelessRef}
                className="absolute inset-0 font-aleo font-semibold text-[32px] sm:text-[40px] lg:text-[56px] leading-[1.15] text-[#d7432a]"
                style={{ opacity: 0, transition: "opacity 0.4s ease" }}
              >
                timeless,
              </p>
            </div>

            <div
              ref={nektarRef}
              className="border-l-2 border-[#d7432a] pl-5 lg:pl-[30px] max-w-[760px] flex flex-col gap-3 lg:gap-[14px]"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
            >
              {NEKTAR_PARAGRAPHS.map((p, i) => (
                <p key={i} className={i === 0 ? "font-aleo font-semibold text-[22px] lg:text-[28px] leading-[1.3] text-[#380102]" : "font-aleo text-[15px] lg:text-[17px] leading-[1.6] text-[#380102] opacity-75"}>
                  {p}
                </p>
              ))}
              <span className="font-aleo text-[14px] text-[#380102]/50">— Merriam-Webster</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-10 lg:gap-[50px]">
          <div className="flex flex-col gap-4 lg:gap-[20px] max-w-[700px]">
            <span className="font-bel text-[13px] lg:text-[14px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: "0.1em" }}>
              The People @ Nectarine
            </span>
            <h2 className="font-aleo font-semibold text-[32px] lg:text-[44px] leading-[1.1] text-[#380102]">
              It&apos;s nice to know who you&apos;re working with.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[25px]">
            {team.map((member, i) => (
              <TeamCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-[#380102] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-12 lg:gap-[75px]">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-[40px]">
            <div className="lg:w-1/4">
              <span className="font-bel text-[14px] text-[#f8e4cc] border border-[#f8e4cc] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: "0.1em" }}>
                Our Mission
              </span>
            </div>
            <div className="lg:w-3/4 flex flex-col gap-5 lg:gap-[25px]">
              <p className="font-aleo text-[24px] lg:text-[32px] leading-[1.25] text-[#fcf8f3]">{MISSION.short}</p>
              <WipeLink
                overlayColor="#f9ce6a"
                textOnHover="#380102"
                trackLabel="Read the Full Mission"
                onClick={() => {
                  trackEvent("button_click", { button_label: "Read the Full Mission", destination: "modal" });
                  setMissionOpen(true);
                }}
                className="flex items-center justify-center gap-[10px] border border-[#f8e4cc] rounded-[15px] py-[16px] px-[30px] w-fit font-bel text-[16px] text-[#fcf8f3]"
              >
                What Do We Mean?
              </WipeLink>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-[40px]">
            <div className="lg:w-1/4">
              <span className="font-bel text-[14px] text-[#f8e4cc] border border-[#f8e4cc] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: "0.1em" }}>
                Our Vision
              </span>
            </div>
            <div className="lg:w-3/4 flex flex-col gap-5 lg:gap-[25px]">
              <p className="font-aleo text-[24px] lg:text-[32px] leading-[1.25] text-[#fcf8f3]">{VISION.short}</p>
              <WipeLink
                overlayColor="#f9ce6a"
                textOnHover="#380102"
                trackLabel="Read the Full Vision"
                onClick={() => {
                  trackEvent("button_click", { button_label: "Read the Full Vision", destination: "modal" });
                  setVisionOpen(true);
                }}
                className="flex items-center justify-center gap-[10px] border border-[#f8e4cc] rounded-[15px] py-[16px] px-[30px] w-fit font-bel text-[16px] text-[#fcf8f3]"
              >
                What Do We Mean?
              </WipeLink>
            </div>
          </div>
        </div>
      </section>

      {/* How We Think — values carousel */}
      <section className="bg-[#f8e4cc] px-5 sm:px-10 lg:px-[75px] py-10 lg:py-[75px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-10 lg:gap-[50px]">
          <div className="flex flex-col gap-4 lg:gap-[20px] max-w-[700px]">
            <span className="font-bel text-[13px] lg:text-[14px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[10px] w-fit uppercase" style={{ letterSpacing: "0.1em" }}>
              How We Think
            </span>
            <h2 className="font-aleo font-semibold text-[32px] lg:text-[44px] leading-[1.1] text-[#380102]">
              The values our team operates by.
            </h2>
            <p className="font-aleo text-[16px] lg:text-[18px] leading-[1.6] text-[#380102] opacity-75">
              It&apos;s nice to know the people — and the principles — behind the work.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:gap-[30px]">
            <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-[50px] lg:items-center">
              {/* Image */}
              <div className="w-full lg:w-[420px] flex-shrink-0">
                {activeValue.image ? (
                  <div className="relative w-full aspect-[4/5] rounded-[15px] overflow-hidden">
                    <Image src={activeValue.image} alt={activeValue.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="w-full aspect-[4/5] rounded-[15px] flex items-center justify-center"
                    style={{ backgroundColor: AVATAR_COLORS[valueIndex % AVATAR_COLORS.length] }}
                  >
                    <span className="font-bel text-[15px] text-[#380102]/50 uppercase" style={{ letterSpacing: "0.1em" }}>
                      0{valueIndex + 1}
                    </span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col gap-5 lg:gap-[25px]">
                <span className="font-bel text-[13px] text-[#d7432a] uppercase" style={{ letterSpacing: "0.15em" }}>
                  Value 0{valueIndex + 1} / 0{values.length}
                </span>
                <h3 className="font-aleo font-semibold text-[28px] lg:text-[36px] leading-[1.15] text-[#380102]">
                  {activeValue.title}
                </h3>
                <p className="font-aleo text-[16px] lg:text-[18px] leading-[1.6] text-[#380102]">{activeValue.description}</p>
                {activeValue.quote && (
                  <button
                    type="button"
                    onClick={() => setValueQuoteOpen(true)}
                    className="font-bel text-[14px] text-[#380102] underline underline-offset-4 w-fit hover:text-[#d7432a] transition-colors duration-200"
                  >
                    Read the quote
                  </button>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between lg:justify-start lg:gap-[30px]">
              <div className="flex items-center gap-[10px]">
                {values.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setValueIndex(i)}
                    aria-label={`Show value ${i + 1}`}
                    className={`rounded-full bg-[#380102] transition-all duration-300 ${i === valueIndex ? "w-[45px] h-[15px] opacity-100" : "w-[15px] h-[15px] opacity-40"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-[10px]">
                <button
                  type="button"
                  onClick={() => setValueIndex((i) => (i - 1 + values.length) % values.length)}
                  aria-label="Previous value"
                  className="w-[44px] h-[44px] rounded-full border border-[#380102] flex items-center justify-center hover:bg-[#380102]/10 transition-colors duration-200"
                >
                  <ChevronIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => setValueIndex((i) => (i + 1) % values.length)}
                  aria-label="Next value"
                  className="w-[44px] h-[44px] rounded-full border border-[#380102] flex items-center justify-center hover:bg-[#380102]/10 transition-colors duration-200"
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="dark" />

      {missionOpen && <InfoModal title="Our Mission — What Do We Mean?" body={MISSION.long} onClose={() => setMissionOpen(false)} />}
      {visionOpen && <InfoModal title="Our Vision — What Do We Mean?" body={VISION.long} onClose={() => setVisionOpen(false)} />}
      {valueQuoteOpen && activeValue.quote && (
        <InfoModal
          title={activeValue.title}
          body={[activeValue.quote.text, `— ${activeValue.quote.source}`]}
          onClose={() => setValueQuoteOpen(false)}
        />
      )}
    </div>
  );
}
