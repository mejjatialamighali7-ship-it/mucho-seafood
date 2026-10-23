/**
 * AVIS CLIENTS — volontairement vide.
 * N'ajoutez que des avis authentiques, attribuables et sourcés
 * (plateforme + date). La section « Avis » ne s'affiche que si cette liste
 * contient au moins un élément.
 */
export type Review = {
  quote: string;
  author: string;
  platform: string;
  url: string;
  date: string; // AAAA-MM
};

export const reviews: Review[] = [];
