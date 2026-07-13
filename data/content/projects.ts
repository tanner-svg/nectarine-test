import type { Project } from "@/types/portfolio";

const projects: Project[] = [
  {
    title: "Pinkston for Tennessee",
    slug: "pinkston-for-tn",
    order: 2,
    galleryFolder: "portfolio/pinkston-for-tn",
    coverMedia: {
      type: "image",
      url: "/.shipstudio/assets/portfolio/NECT_Site_LP-Gif.gif",
    },
    body: `Lauren Pinkston is running for Governor of Tennessee as an independent — a candidate who believes the state's people deserve better than a system that forces them into two extremes. We built her campaign identity from the ground up: a visual language that feels human, approachable, and unmistakably different from the stiff formality of political design.

The work spanned a full brand system, campaign website, and digital presence. Every design decision was rooted in the same conviction as the campaign itself: that politics can feel like it belongs to regular people.`,
    attributes: ["web design"],
    clientQuote: {
      text: "Nectarine didn't just design a website — they gave our campaign a soul. The response from voters has been unlike anything we expected.",
      author: "Lauren Pinkston",
      role: "Candidate, Governor of Tennessee",
      isFeatured: false,
    },
  },
  {
    title: "Frontier Operators",
    slug: "frontier-operators",
    order: 3,
    galleryFolder: "portfolio/frontier-operators",
    coverMedia: {
      type: "image",
      url: "/.shipstudio/assets/portfolio/FO-Image.jpg",
    },
    testimonialMedia: {
      type: "image",
      url: "/.shipstudio/assets/portfolio/FO-Image.jpg",
    },
    body: `Frontier Operators serves a community of military veterans transitioning into small business ownership — people who've spent careers executing under pressure and now need the language and tools to lead in a civilian market.

We led a full brand narrative engagement: starting with a strategy intensive to surface the stories that matter most, then crafting a voice and messaging framework their team could own. The result is a brand that speaks with earned authority rather than hollow confidence.`,
    attributes: ["strategy", "copywriting"],
    clientQuote: {
      text: "Nectarine really helped me articulate the vision and motivation for the why behind our brand. We had the instincts — they gave us the words.",
      author: "Patrick Lowndes",
      role: "Founder, Frontier Operators",
      isFeatured: true,
    },
  },
  {
    title: "David Bruce Winery",
    slug: "david-bruce-winery",
    order: 1,
    galleryFolder: "portfolio/david-bruce-winery",
    coverMedia: {
      type: "image",
      url: "/.shipstudio/assets/portfolio/David-Bruce-Cover.gif",
    },
    body: `David Bruce Winery has been producing small-lot Pinot Noir in the Santa Cruz Mountains since 1964. After six decades, the label carried enormous history — but its visual identity hadn't kept pace with the caliber of the wine.

We rebuilt the brand from its strongest asset: the story of a doctor who fell in love with a hillside and started making wine on weekends. The new identity leans into that founding romance — refined but not precious, storied but not stiff. We delivered a full brand refresh including logo system, label design, packaging guidelines, and a brand film that became the centerpiece of their 60th anniversary campaign.`,
    attributes: ["branding", "strategy"],
    clientQuote: {
      text: "Working with Nectarine completely transformed how we present ourselves to the world. Sixty years of history, finally looking the part.",
      author: "Eric Bruce",
      role: "CEO, David Bruce Winery",
      isFeatured: true,
    },
  },
  {
    title: "Faith Driven Talent",
    slug: "faith-driven-talent",
    order: 4,
    galleryFolder: "portfolio/faith-driven-talent",
    coverMedia: {
      type: "image",
      url: "/.shipstudio/assets/portfolio/faith-driven-cover.jpg",
    },
    body: `Faith Driven Talent connects entertainment industry professionals who want to build careers rooted in their values — a talent agency and community for a segment that has long had to choose between conviction and opportunity.

We partnered with the founding team across strategy, copywriting, and brand identity. Starting with a narrative workshop, we developed the positioning that became the foundation for their pitch materials, website, and outreach. Every touchpoint communicates the same thing: this is a serious industry player that happens to care about something larger than the deal.`,
    attributes: ["strategy", "copywriting", "branding"],
    clientQuote: {
      text: "The strategy sessions gave us language we didn't even know we were missing. Now everyone on our team speaks about what we do the same way.",
      author: "Tré Staton",
      role: "Co-Founder, Faith Driven Talent",
      isFeatured: false,
    },
  },
];

export default projects;
