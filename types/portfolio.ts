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
  body: string;
  attributes: ProjectAttribute[];
  clientQuote: ClientQuote;
}
