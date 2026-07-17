export type ProjectAttribute =
  | 'web design'
  | 'copywriting'
  | 'strategy'
  | 'branding';

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
  body: string;
  attributes: ProjectAttribute[];
  clientQuote: ClientQuote;
}
