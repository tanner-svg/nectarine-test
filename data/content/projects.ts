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
    headline: "Designing a Campaign That Put People Before Politics",
    serviceTags: ["Design"],
    body: `A campaign built on the belief that Tennessee's citizens deserve better than a political system that forces them to choose between two extremes, Lauren Pinkston is running for Governor as an independent voice for the working Tennessean. Her platform prioritizes practical solutions over party loyalty and neighbors over division, putting the people who make Tennessee work at the heart of every policy conversation. Bringing that vision to life required a creative foundation as people-centered as the campaign itself, from the brand identity and messaging that gave the movement its voice, to the web presence, event design, merchandise, and film work that carried it into communities across the state.`,
    attributes: ["Identity development","web design","Workshops & Audits","Writing & Copy",],
    clientQuote: {
      text: "Nectarine didn't just design a website — they gave our campaign a soul. The response from voters has been unlike anything we expected.",
      author: "Lauren Pinkston",
      role: "Candidate, Governor of Tennessee",
      isFeatured: true,
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
    headline: "Kickstarting Economic Growth in Frontier Markets",
    serviceTags: ["Writing & Copy", "Workshops & Audits"],
    body: `After conducting an in-depth market study, Patrick Lowndes identified a critical talent gap across businesses in North Africa, the Middle East, and Asia. Despite having economic potential, these companies often lacked experienced operators who knew how to scale organizations effectively from within. Driven by his passion for developing both emerging businesses and young professionals, Lowndes launched Frontier Operators, a venture dedicated to deploying highly trained, strategic operators to support and scale high-potential markets.`,
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
    headline: "Modernizing Six Decades of Winemaking Without Losing the Story",
    serviceTags: ["Design", "Videography & Media"],
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
    headline: "Building a Brand for an Industry That Rarely Gets to Choose Both",
    serviceTags: ["Writing & Copy", "Design"],
    body: `Faith Driven Talent connects entertainment industry professionals who want to build careers rooted in their values — a talent agency and community for a segment that has long had to choose between conviction and opportunity.

We partnered with the founding team across strategy, copywriting, and brand identity. Starting with a narrative workshop, we developed the positioning that became the foundation for their pitch materials, website, and outreach. Every touchpoint communicates the same thing: this is a serious industry player that happens to care about something larger than the deal.`,
    attributes: ["strategy", "copywriting", "branding"],
    clientQuote: {
      text: "",
      author: "",
      role: "Co-Founder, Faith Driven Talent",
      isFeatured: false,
    },
  },
    {
    title: "He Who Speaks Out of Turn",
    slug: "michael-cook",
    order: 5,
    galleryFolder: "portfolio/michael-cook",
    coverMedia: {
      type: "image",
      url: "/.shipstudio/assets/portfolio/michael-cook/MC_Paperback_Mock_D.png",
    },
    headline: "Mapping the Universe of He Who Speaks Out of Turn",
    serviceTags: ["Cover Design", "Print Design", "Illustration"],
    body: `A debut novel spanning time, mythology, and the weight of words spoken and unspoken, He Who Speaks Out of Turn follows a group of unlikely companions racing through time to find a wizard from the far past and prevent a future void of life. Michael Cook built a world rich enough to get lost in, with characters whose journeys demanded to be mapped and a story whose tension deserved a cover worthy of carrying it. The art direction, illustration, and cartography that brought it to life were the result of going deep into that world, learning its geography, its people, and the stakes of every path taken.`,
    attributes: ["art direction", "illustration", "branding"],
    clientQuote: {
      text: "",
      author: "",
      role: "Co-Founder, Faith Driven Talent",
      isFeatured: false,
    },
  },
];

export default projects;
