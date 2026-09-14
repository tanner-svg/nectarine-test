export interface CompanyValue {
  title: string;
  description: string;
  quote?: { text: string; source: string };
  /** Path under public/, e.g. "/.shipstudio/assets/values/caring.jpg". Leave unset to show a color placeholder. */
  image?: string;
}

const values: CompanyValue[] = [
  {
    title: "Caring Means Helping Others Grow",
    description:
      "We don't care to just deliver work. We aim to invest in the people behind every project — checking in on well-being, sharing the \"why\" behind decisions, and creating space for every teammate and client to grow.",
    quote: {
      text: "To care for another, in the most significant sense, is to help him grow and actualize himself. Caring, as helping another grow, is a process, a way of relating to someone that involves development in the same way that friendship can only emerge through mutual trust and a deepening of the relationship.",
      source: "Milton Mayeroff, On Caring",
    },
  },
  {
    title: "Beauty Will Save the World",
    description:
      "Beauty has an innate power to communicate to the whole world — across cultures, languages, regions, barriers. We aim to steward beauty well, going beyond aesthetics to bring transformation, resilience, connection, and peace.",
    quote: {
      text: "Beauty would save the world.",
      source: "Fyodor Dostoyevsky",
    },
  },
  {
    title: "Variety Adds Flavor",
    description:
      "We don't want differences in perspective to divide us, but to add depth that makes our team stronger. We view misalignment not as failure, but as the friction that sparks creativity — so when tensions arise, we find resolutions and keep our shared journey life-giving.",
    quote: {
      text: "We're all different, but in the end, we're all fruit.",
      source: "Gus Portokalos, My Big Fat Greek Wedding",
    },
  },
  {
    title: "Build Real Friendships",
    description:
      "We want to build friendships and relationships that last. We keep at the forefront of our minds that people matter most — our team, the people we serve, and our communities — and we use our time generously to strengthen those bonds.",
  },
  {
    title: "Invested in Eternity",
    description:
      "The root of Nectarine is \"Nektar,\" Greek for \"overcoming death\" and \"the drink of eternal life.\" Because people carry eternal value, we believe the work we do should be worthy of the ones we serve — sparking joy, hope, and connection that outlasts the project itself.",
    quote: {
      text: "\"Nektar\" — overcoming death, the drink of eternal life.",
      source: "The name behind Nectarine",
    },
  },
];

export default values;
