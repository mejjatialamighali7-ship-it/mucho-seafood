/**
 * CONFIGURATION CENTRALE DU RESTAURANT
 * ------------------------------------
 * Toutes les informations pratiques du site sont ici : coordonnées, horaires,
 * réseaux sociaux, livraison. Modifiez ce fichier, le site suit.
 *
 * Convention : chaque information porte un champ `verified`.
 *   - verified: true  → information validée par le restaurant, affichée normalement
 *                        et reprise dans les données structurées Google.
 *   - verified: false → information issue d'annuaires en ligne, à faire confirmer.
 *                        Elle peut s'afficher avec une mention « à confirmer »,
 *                        mais n'est jamais envoyée à Google comme une donnée sûre.
 *
 * Laissez une valeur à `null` plutôt que d'inventer : le composant concerné
 * se masque automatiquement.
 */

export type Verified<T> = { value: T; verified: boolean; source?: string };

export const restaurant = {
  name: "Mucho",
  brandName: "Mucho Seafood",
  tagline: "The Art of Seafood",
  baseline: "Poissons, fruits de mer et cuisine marine à partager au cœur d'El Jadida.",

  /** Domaine public — défini par la variable d'environnement NEXT_PUBLIC_SITE_URL. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  address: {
    value: {
      line1: "1er étage, villa 1",
      street: "Route de Casablanca",
      postalCode: "24000",
      city: "El Jadida",
      country: "Maroc",
      countryCode: "MA",
    },
    // Adresse fournie dans le brief et répertoriée sur Restaurant Guru — à confirmer.
    verified: false,
    source: "Brief propriétaire + Restaurant Guru",
  },

  /**
   * Requête utilisée pour Google Maps (itinéraire et carte).
   * Remplacez-la par les coordonnées exactes dès qu'elles sont connues,
   * par ex. "33.2541,-8.5047", ou par l'identifiant de la fiche Google.
   */
  mapsQuery: "Mucho Seafood, Route de Casablanca, El Jadida, Maroc",

  /** Téléphone principal (fixe) — imprimé sur la carte officielle du restaurant. */
  phone: {
    value: { display: "05 23 80 08 33", e164: "+212523800833" },
    verified: true,
    source: "Carte imprimée du restaurant",
  },

  /** Portable — transmis par le propriétaire ; reçoit WhatsApp et SMS. */
  mobile: {
    value: { display: "06 61 14 63 09", e164: "+212661146309" },
    verified: true,
    source: "Propriétaire",
  },

  /**
   * Numéro WhatsApp (format international sans espaces ni « + »).
   * Confirmé par le propriétaire le 23/10/2026. Active la pastille flottante
   * et les boutons WhatsApp. Mettre null pour désactiver.
   */
  whatsapp: "212661146309" as string | null,

  email: null as string | null,

  /**
   * Horaires. Format 24 h. Les horaires actuels proviennent d'annuaires en ligne.
   * Passez `verified` à true après confirmation : ils seront alors envoyés à Google.
   */
  hours: {
    value: [
      { days: "Tous les jours", opens: "12:30", closes: "23:00" },
    ] as { days: string; opens: string; closes: string }[],
    verified: false,
    source: "Restaurant Guru",
  },
  /** Jours concernés au format Schema.org (utilisé seulement si hours.verified). */
  hoursSchemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

  services: {
    dineIn: true,
    takeaway: true,
    delivery: true,
    reservations: false, // le restaurant ne prend pas de réservation
  },

  /** Réseaux sociaux officiels — ajoutez uniquement des comptes vérifiés. */
  /** Réseaux sociaux officiels — ceux-ci figurent sur la carte imprimée du restaurant. */
  social: {
    instagram: "https://www.instagram.com/muchoseafoodrestaurant/" as string | null,
    facebook: "https://www.facebook.com/mucho" as string | null,
    tiktok: null as string | null,
  },

  delivery: {
    enabled: true,
    provider: "Glovo",
    url: "https://glovoapp.com/fr/ma/el-jadida/stores/mucho-eljadida",
    // La page Glovo existe ; elle indiquait l'établissement « fermé actuellement »
    // lors de la vérification du 23/10/2026. À confirmer auprès du restaurant.
    verified: false,
  },

  /** Faits confirmés par les photos officielles fournies par le restaurant. */
  confirmedFacts: {
    seaView: true,
  },
} as const;

export type Restaurant = typeof restaurant;
