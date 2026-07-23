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
  /** Row layout for the gallery bento grid, e.g. [1,1,3,1,1] = single, single, three-across, single, single. Repeats if there are more images than the pattern covers. Falls back to the site-wide default pattern. */
  galleryRowPattern?: number[];
  /** Externally-hosted videos (e.g. Vimeo/YouTube) spliced into the gallery grid at a specific position, since they aren't local files the folder scan can discover. `insertAt` is the 0-based index in the scanned gallery to insert before. */
  galleryEmbeds?: { insertAt: number; url: string }[];
  /** Overrides the equal-width columns for a specific gallery row (0-based row index, after row-pattern grouping), e.g. [1.4, 0.7, 1] for a 3-across row. */
  galleryColumnWidths?: { rowIndex: number; widths: number[] }[];
  /** Shows a specific gallery item's full image (letterboxed) instead of cropping it to fill its box. `index` is the 0-based position in the final gallery array (after embeds are spliced in). */
  galleryItemFit?: { index: number; fit: "contain" }[];
  /** Short punchy phrase shown on the project detail page and its "read the full story" modal. Falls back to `title`. */
  headline?: string;
  /** Which of the six service categories to highlight in the "read the full story" modal. */
  serviceTags?: string[];
  /** Set to true to include this project in the homepage's 4-card portfolio grid. */
  showOnHomepage?: boolean;
  /** Controls left-to-right, top-to-bottom order within the homepage grid (lower = earlier). Only matters when `showOnHomepage` is true. */
  homepageOrder?: number;
  /** Set to false to hide this project from the /work page grid. Defaults to true (shown). Doesn't affect the homepage, testimonials, or the project's own detail page — those are controlled separately. */
  showOnWorkPage?: boolean;
  body: string;
  attributes: ProjectAttribute[];
  clientQuote: ClientQuote;
}
