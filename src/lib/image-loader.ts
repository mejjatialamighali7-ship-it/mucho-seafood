"use client";

/**
 * Chargeur d'images sans serveur : les photos de public/images existent déjà en
 * plusieurs largeurs (voir scripts/optimize-images.mjs). On renvoie la plus petite
 * qui couvre la largeur demandée par le navigateur, sinon l'original.
 */
const VARIANTS = [480, 828];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/") || !src.endsWith(".webp")) return src;
  const w = VARIANTS.find((v) => v >= width);
  return w ? src.replace(/\.webp$/, `-${w}.webp`) : src;
}
