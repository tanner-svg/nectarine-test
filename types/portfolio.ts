export type ProjectAttribute =
  | 'web design'
  | 'copywriting'
  | 'strategy'
  | 'branding'
  | 'Identity development'
  | 'Workshops & Audits'
  | 'Writing & Copy'
  | 'art direction'
  | 'illustration';

export interface CoverMedia {
  type: 'image' | 'video';
  url: string;
}

export interface ClientQuote {
  text: string;
  author: string;
  role: string;
  isFeatured: boolean;
}

export interface Project {
  title: string;
  slug: string;
  order?: number;
  coverMedia: CoverMedia;
  testimonialMedia?: CoverMedia;
  galleryFolder?: string;
  /** Short punchy phrase shown on the project detail page and its "read the full story" modal. Falls back to `title`. */
  headline?: string;
  /** Which of the six service categories to highlight in the "read the full story" modal. */
  serviceTags?: string[];
  /** Set to true to include this project in the homepage's 4-card portfolio grid. */
  showOnHomepage?: boolean;
  /** Controls left-to-right, top-to-bottom order within the homepage grid (lower = earlier). Only matters when `showOnHomepage` is true. */
  homepageOrder?: number;
  body: string;
  attributes: ProjectAttribute[];
  clientQuote: ClientQuote;
}
