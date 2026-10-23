/**
 * Mesure d'audience : Google Analytics 4.
 * Renseignez l'identifiant (format G-XXXXXXXXXX) dans la variable d'environnement
 * NEXT_PUBLIC_GA_ID (Render > Environment), puis redéployez.
 * Sans identifiant : aucun outil de mesure, aucun cookie, pas de bandeau.
 * Avec identifiant : le bandeau cookies s'affiche et Google Analytics ne se charge
 * qu'après un clic sur « Accepter ».
 */
const raw = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

export const gaId = /^G-[A-Z0-9]{4,}$/.test(raw) ? raw : null;

/** Durée de vie des cookies Google Analytics : 13 mois au maximum. */
export const gaCookieSeconds = 13 * 30 * 24 * 60 * 60;

/** Le choix du visiteur (accepter / refuser) est redemandé après 6 mois. */
export const consentMaxAgeMs = 182 * 24 * 60 * 60 * 1000;
