import type { MetadataRoute } from "next";
import { site, serviceAreas } from "@/lib/site";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/midlife-health-check-sydney`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/editorial-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/which-appointment`, changeFrequency: "yearly", priority: 0.5 },
    // /fees is deliberately omitted - it is noindex and reached via site nav only.
    { url: `${base}/articles`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceAreas.map((s) => ({
    url: `${base}${s.href}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: a.dateModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...articlePages];
}
