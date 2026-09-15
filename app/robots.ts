import type { MetadataRoute } from "next";

const SITE_URL = "https://www.nectarine.ink";

// Required for `output: "export"` — this route has no per-request data, so
// it's rendered once at build time into a static robots.txt file.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/homepage-test",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
