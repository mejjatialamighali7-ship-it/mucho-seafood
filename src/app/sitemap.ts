import type { MetadataRoute } from "next";
import { restaurant } from "@/config/restaurant";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = restaurant.siteUrl.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/carte`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cgu`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
