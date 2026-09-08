export type BlogCategory =
  | "Branding"
  | "Copywriting"
  | "Web Design"
  | "Strategy"
  | "Case Studies";

export interface BlogPost {
  slug: string;
  title: string;
  /** One or two sentences shown on cards and the featured section. */
  excerpt: string;
  category: BlogCategory;
  /** ISO date string, e.g. "2026-06-12". */
  date: string;
  author: string;
  /** Cover art shown in place of a photo — a brand-color block with a category icon. */
  coverColor: string;
  coverIcon: string;
  /** Paragraphs separated by a blank line, same convention as project.body. */
  body: string;
  /** Set true on exactly one post to pin it as the homepage-of-the-blog feature. */
  featured?: boolean;
}
