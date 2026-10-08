export interface TeamMember {
  name: string;
  role: string;
  /** Path under public/, e.g. "/.shipstudio/assets/team/shay-germany.jpg". Leave unset to show the initials placeholder. */
  photo?: string;
  /** Up to 5 answers. Renders however many are filled in — leave empty for "coming soon." Write "Short Title: a longer explanation" to show the title in bold with the explanation after it. */
  favorites: string[];
}

const team: TeamMember[] = [
  {
    name: "Shay Germany",
    role: "CEO, Founder",
    photo: "/.shipstudio/assets/team/shay-germany.jpg",
    favorites: [
      "Warm Sunshine",
      "Yellow Butterflies",
      "Family",
      "Snack Breaks",
      "Laughing So Hard It Hurts (With Friends)",
    ],
  },
  {
    name: "Tanner Germany",
    role: "Art Director, Co-Owner",
    photo: "/.shipstudio/assets/team/tanner-germany.jpg",
    favorites: [
      "Coffee With Friends & Family",
      "Finding Rabbit Holes",
      "Beauty (Art In All Its Forms)",
      "Wholesome Moments",
      "The Sound of Fresh Bread Out of the Oven",
    ],
  },
  {
    name: "Tochukwu",
    role: "Project Manager",
    photo: "/.shipstudio/assets/team/tochukwu.jpg",
    favorites: [
      "Family and Loved Ones: the people who make life meaningful.",
      "Good Health: being able to wake up and enjoy another day.",
      "Learning and Growth: always having something new to discover.",
      "Creating Memories: the little moments with people you care about that you end up remembering for years.",
      "Peace of Mind: being able to slow down, appreciate what I have, and enjoy the moment.",
    ],
  },
  {
    name: "Sára",
    role: "Creative",
    photo: "/.shipstudio/assets/team/sara.jpg",
    favorites: [
      "Sunsets: I always think it can't be more beautiful, then the next day I change my mind :)",
      "Eating and Making Good Food: pretty cool that we get to enjoy the simple pleasures of life with people we love.",
      "Singing Around a Campfire: this one brings so much nostalgia and joy.",
      "Stargazing in a Field: where the deepest convos happen.",
      "Laughing Until My Stomach Hurts: people who bring this side out of me are the real ones :)",
    ],
  },
  {
    name: "Clarissa",
    role: "Administrative Assistant",
    favorites: [],
  },
  {
    name: "",
    role: "Growth & Relationships Lead",
    favorites: [],
  },
  {
    name: "Solomon",
    role: "Role Coming Soon",
    photo: "/.shipstudio/assets/team/solomon.jpg",
    favorites: [],
  },
  {
    name: "Burcu",
    role: "Role Coming Soon",
    photo: "/.shipstudio/assets/team/burcu.jpg",
    favorites: [
      "Slow mornings with the amazing smell of freshly brewed coffee :D",
      "The sea, sunshine, and the feeling of nature.",
      "Discovering new places, cultures, and perspectives.",
      "Art, architecture, and everything that makes me think differently.",
      "Gathering around a table, sharing good food, and having long conversations with people I love.",
    ],
  },
];

export default team;
