/**
 * VIDÉOS — filmées au restaurant et envoyées par le propriétaire le 23/10/2026.
 * Fichiers compressés dans public/videos/ (540 × 960, H.264 sans son, ≈ 1 Mo),
 * avec une image d'attente .webp du même nom. Sources brutes : assets-src/videos/
 * (non versionnées, trop lourdes). Pour en ajouter une, voir le README.
 */
export type VideoClip = {
  id: string;
  caption: string;
};

export const videos: VideoClip[] = [
  { id: "vitrine", caption: "La vitrine : langouste, araignée et huîtres" },
  { id: "poissons-sur-glace", caption: "Poissons sur glace" },
  { id: "poissons-frais", caption: "Poissons entiers" },
  { id: "langoustines", caption: "Langoustines" },
  { id: "araignees-de-mer", caption: "Araignées de mer" },
  { id: "moules-palourdes", caption: "Moules et coquillages" },
  { id: "cassolettes", caption: "Cassolettes de fruits de mer" },
  { id: "plateau-fruits-de-mer", caption: "Plateau de fruits de mer" },
  { id: "salle-ocean", caption: "La salle, face à l'océan" },
];

export const videoSrc = (id: string) => `/videos/${id}.mp4`;
export const posterSrc = (id: string) => `/videos/${id}.webp`;
