import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/portfolio";

const SITE_URL = "https://www.nectarine.ink";

// Required for `output: "export"` — this route has no per-request data, so
// it's rendered once at build time into a static sitemap.xml file.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/what-we-do`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/workshops-audits`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/audit`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/audit-complete`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioPages: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...portfolioPages];
}
