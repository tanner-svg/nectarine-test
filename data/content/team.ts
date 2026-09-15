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
    favorites: [],
  },
  {
    name: "Sára",
    role: "Creative",
    photo: "/.shipstudio/assets/team/sara.jpg",
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
  {
    name: "Solomon",
    role: "Role Coming Soon",
    photo: "/.shipstudio/assets/team/solomon.jpg",
    favorites: [],
  },
  {
    name: "Hanna",
    role: "Role Coming Soon",
    photo: "/.shipstudio/assets/team/hanna.jpg",
    favorites: [],
  },
  {
    name: "Burcu",
    role: "Role Coming Soon",
    photo: "/.shipstudio/assets/team/burcu.jpg",
    favorites: [],
  },
];

export default team;
