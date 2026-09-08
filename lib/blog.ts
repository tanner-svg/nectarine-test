import posts from "@/data/content/blog";
import type { BlogPost, BlogCategory } from "@/types/blog";

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

// Falls back to the most recent post if nothing is explicitly marked featured,
// so the page never has an empty hero section.
export function getFeaturedPost(): BlogPost {
  const marked = posts.find((p) => p.featured);
  return marked ?? getAllPosts()[0];
}

export function getNonFeaturedPosts(): BlogPost[] {
  const featured = getFeaturedPost();
  return getAllPosts().filter((p) => p.slug !== featured.slug);
}

export function getCategories(): BlogCategory[] {
  return Array.from(new Set(posts.map((p) => p.category)));
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return getAllPosts().filter((p) => p.slug !== slug).slice(0, limit);
}

export function estimateReadTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
