import type { Metadata } from "next";
import { getFeaturedPost, getNonFeaturedPosts, getCategories } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on branding, copywriting, web design, and strategy from Nectarine Studio — plus behind-the-scenes looks at our client work.",
};

export default function BlogPage() {
  const featuredPost = getFeaturedPost();
  const posts = getNonFeaturedPosts();
  const categories = getCategories();

  return <BlogPageClient featuredPost={featuredPost} posts={posts} categories={categories} />;
}
