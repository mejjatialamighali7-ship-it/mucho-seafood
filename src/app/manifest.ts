import type { MetadataRoute } from "next";
import { restaurant } from "@/config/restaurant";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${restaurant.brandName} — El Jadida`,
    short_name: "Mucho",
    description: "Restaurant de poissons et fruits de mer face à l'océan, à El Jadida.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f3ea",
    theme_color: "#0b1631",
    lang: "fr",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
