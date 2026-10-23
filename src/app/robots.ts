import type { MetadataRoute } from "next";
import { restaurant } from "@/config/restaurant";

export default function robots(): MetadataRoute.Robots {
  const base = restaurant.siteUrl.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
