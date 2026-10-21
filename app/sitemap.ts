import { MetadataRoute } from "next";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import { GUIDES_DATA } from "@/lib/guides-data";
import { RESOURCES_DATA } from "@/lib/resources-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { getBaseUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const currentDate = new Date();

  // 1. Static high-priority index routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/editor`, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: currentDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/feedback`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/terms-of-service`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/cookie-policy`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/editorial-policy`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.4 },
  ];

  // 2. Concrete individual tool routes
  const toolRoutes: MetadataRoute.Sitemap = TOOLS_REGISTRY.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Technical educational guides
  const guideRoutes: MetadataRoute.Sitemap = GUIDES_DATA.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(g.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // 4. Document specifications & references
  const resourceRoutes: MetadataRoute.Sitemap = RESOURCES_DATA.map((r) => ({
    url: `${baseUrl}/resources/${r.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Technical blog articles
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...toolRoutes, ...guideRoutes, ...resourceRoutes, ...blogRoutes];
}
