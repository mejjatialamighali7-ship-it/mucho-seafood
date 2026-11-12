import type { MetadataRoute } from "next";
import { restaurant } from "@/config/restaurant";

// Fichier généré une fois au build (site statique).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = restaurant.siteUrl.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
