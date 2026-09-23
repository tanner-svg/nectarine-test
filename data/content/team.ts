export interface TeamMember {
  name: string;
  role: string;
  /** Path under public/, e.g. "/.shipstudio/assets/team/shay-germany.jpg". Leave unset to show the initials placeholder. */
  photo?: string;
  /** Up to 5 answers. Renders however many are filled in — leave empty for "coming soon." */
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
      "Family and loved ones: the people who make life meaningful.",
      "Good health: being able to wake up and enjoy another day.",
      "Learning and growth: always having something new to discover.",
      "Creating memories: the little moments with people you care about that you end up remembering for years.",
      "Peace of mind: being able to slow down, appreciate what I have, and enjoy the moment.",
    ],
  },
  {
    name: "Sára Kopasz",
    role: "Creative",
    photo: "/.shipstudio/assets/team/sara.jpg",
    favorites: [
      "Sunsets: I always think it can't be more beautiful, than the next day I change my mind :)",
      "Eating/making good food: pretty cool that we get to enjoy the simple pleasures of life with people we love.",
      "Singing around a campfire: this one brings so much nostalgia and joy.",
      "Stargazing on a field: where the deepest convos happen.",
      "Laughing until my stomach hurts: People who bring this side out of me are the real ones :)",
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
    role: "Brand Partner Lead",
    photo: "/.shipstudio/assets/team/solomon.jpg",
    favorites: [],
  },
  {
    name: "Hanna",
    role: "Bookkeeper",
    photo: "/.shipstudio/assets/team/hanna.jpg",
    favorites: [],
  },
  {
    name: "Burcu Türeyen",
    role: "Creative",
    photo: "/.shipstudio/assets/team/burcu.jpg",
    favorites: [
      "Slow mornings with the amazing smell of freshly brewed coffee. :D",
      "The sea, sunshine, and the feeling of nature.",
      "Discovering new places, cultures, and perspectives.",
      "Art, architecture, and everything that makes me think differently.",
      "Gathering around a table, sharing good food, and having long conversations with people I love. 🥰",
    ],
  },
];

export default team;
