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
    favorites: [],
  },
  {
    name: "Sara",
    role: "Creative",
    favorites: [],
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
];

export default team;
