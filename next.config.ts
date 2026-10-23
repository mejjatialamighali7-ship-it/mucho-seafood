import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Les photos sont déjà optimisées en WebP par `npm run images` (1,3 Mo au total).
    // On les sert telles quelles : sur un petit serveur (Render Starter), la
    // conversion à la volée en AVIF était trop lente et les photos ne s'affichaient pas.
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
