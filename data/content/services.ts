import type { ProjectAttribute } from "@/types/portfolio";

export interface ServiceItem {
  title: string;
  desc: string;
}

export interface Service {
  label: string;
  attribute: ProjectAttribute | null;
  icon: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  items: ServiceItem[];
}

const services: Service[] = [
  {
    label: "Design",
    attribute: "branding" as ProjectAttribute,
    icon: "/.shipstudio/assets/design-icon-2.svg",
    title: "Design",
    description:
      "Logos, brand identity, and visual assets for every format and surface. From packaging and murals to signage, stickers, and banners.",
    ctaText: "Schedule an Audit",
    ctaHref: "https://calendar.app.google/7PP2JtLPDtK5qhiw5",
    items: [
      { title: "Brand Identity", desc: "Logo design, brand guides, and visual identity refreshes." },
      { title: "Print Design", desc: "Banners, signage, stickers, flyers, murals, packaging, vehicle wraps, posters, and menus." },
      { title: "Publication Design", desc: "Book design, book covers, and album covers." },
      { title: "Digital Design", desc: "Email, web, social media, and digital ad designs." },
      { title: "Event Design", desc: "Specialized design for events and physical spaces." },
    ],
  },
  {
    label: "Writing & Copy",
    attribute: "copywriting" as ProjectAttribute,
    icon: "/.shipstudio/assets/copywriting-icon.svg",
    title: "Writing & Copy",
    description:
      "Words that sound like you — not a template. From brand voice to website copy, we write everything a brand needs to speak clearly and stick.",
    ctaText: "Start a Copy Project",
    ctaHref: "/contact",
    items: [
      { title: "Brand Messaging", desc: "Mission statements, positioning language, and taglines that actually mean something." },
      { title: "Website Copy", desc: "Homepage to contact page — every word written with purpose and a clear call to action." },
      { title: "Campaign Copy", desc: "Social posts, email sequences, ad copy, and launch language." },
      { title: "Long-Form Content", desc: "Articles, case studies, white papers, and editorial features." },
      { title: "Scripts & Speeches", desc: "Keynote scripts, video voiceover, and presentation narratives." },
    ],
  },
  {
    label: "Digital & UI Design",
    attribute: "web design" as ProjectAttribute,
    icon: "/.shipstudio/assets/websites-icon.svg",
    title: "Digital & UI Design",
    description:
      "Beautiful, high-performing digital experiences — from full website builds to UI systems that scale across every screen and surface.",
    ctaText: "Start a Web Project",
    ctaHref: "/contact",
    items: [
      { title: "Website Design & Build", desc: "Custom web design built on Framer, Webflow, WordPress, or code." },
      { title: "UX & User Flows", desc: "Wireframes, prototypes, and user journey mapping." },
      { title: "UI Systems", desc: "Design systems, component libraries, and brand-consistent interfaces." },
      { title: "Landing Pages", desc: "Conversion-focused pages for campaigns, launches, and lead gen." },
      { title: "Email Design", desc: "Newsletter templates, drip sequences, and branded email systems." },
    ],
  },
  {
    label: "Videography & Media",
    attribute: null,
    icon: "/.shipstudio/assets/video-icon.svg",
    title: "Videography & Media",
    description:
      "Brand films, testimonials, social content, and everything in between. We handle creative direction, production, and post so your brand moves as well as it looks.",
    ctaText: "Explore Video Services",
    ctaHref: "/contact",
    items: [
      { title: "Brand Films", desc: "60-second to 5-minute narratives that define what your brand is and why it matters." },
      { title: "Testimonial Videos", desc: "Client stories captured and edited to convert." },
      { title: "Social Content", desc: "Reels, shorts, and platform-native video built for engagement." },
      { title: "Animation & Motion", desc: "Logo animations, explainer content, and branded motion graphics." },
      { title: "Event Coverage", desc: "Same-day edits, highlight reels, and full event documentation." },
    ],
  },
  {
    label: "Events Design & Media",
    attribute: null,
    icon: "/.shipstudio/assets/events-icon.svg",
    title: "Events Design & Media",
    description:
      "The full visual scope of events — from the first look to the last banner. We design, produce, and document everything that makes a brand show up in person.",
    ctaText: "Plan an Event",
    ctaHref: "/contact",
    items: [
      { title: "Event Branding", desc: "Stage design, signage, step-and-repeats, and environmental graphics." },
      { title: "Print Production", desc: "Programs, invitations, menus, name tags, and all print collateral." },
      { title: "Merch & Apparel", desc: "Branded swag, custom apparel, and event merchandise." },
      { title: "On-Site Photography", desc: "Professional event photography from arrival to close." },
      { title: "Recap & Documentation", desc: "Post-event content packages for social, press, and archives." },
    ],
  },
  {
    label: "Workshops & Audits",
    attribute: "strategy" as ProjectAttribute,
    icon: "/.shipstudio/assets/workshop-icon-2.svg",
    title: "Workshops & Audits",
    description:
      "Strategy sessions that close the gap between where your brand is and where it needs to be. Every session is tailored, every output is actionable.",
    ctaText: "Book a Session",
    ctaHref: "/workshops-audits",
    items: [
      { title: "Brand Narrative Workshop", desc: "A collaborative session to find, articulate, and align your brand story." },
      { title: "Visual Identity Workshop", desc: "A structured review and reset of your visual direction." },
      { title: "AI Brand Integration", desc: "Train your team to use AI tools without losing brand consistency." },
      { title: "Website Audit", desc: "A focused review of your site's messaging, UX, and conversion performance." },
      { title: "Brand Audit", desc: "A top-to-bottom assessment of your brand's visual and verbal consistency." },
    ],
  },
];

export default services;
