import type { MetadataRoute } from "next";
import { landingPages } from "../lib/landing-data";
import { pageUrl } from "../lib/seo";

// Merge with an existing production sitemap instead of replacing it blindly.
export default function sitemap(): MetadataRoute.Sitemap {
  const corePaths = ["/", "/charters", "/about", "/faq", "/contact"];
  const routes = [...corePaths, ...Object.values(landingPages).map(page => page.path)];
  return routes.map(path => ({
    url: pageUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7
  }));
}
