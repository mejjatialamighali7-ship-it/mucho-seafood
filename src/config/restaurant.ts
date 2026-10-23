/**
 * CONFIGURATION CENTRALE DU RESTAURANT
 * ------------------------------------
 * Toutes les informations pratiques du site sont ici : coordonnées, horaires,
 * réseaux sociaux, Glovo. Modifiez ce fichier, le site suit.
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
  baseline: "Poissons, fruits de mer et cuisine de la mer à partager au cœur d'El Jadida.",

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
    // Confirmée par le propriétaire le 23/10/2026.
    verified: true,
    source: "Propriétaire",
  },

  /**
   * Requête utilisée pour Google Maps (itinéraire et carte).
   * Remplacez-la par les coordonnées exactes dès qu'elles sont connues,
   * par ex. "33.2541,-8.5047", ou par l'identifiant de la fiche Google.
   */
  mapsQuery: "Mucho Seafood, Route de Casablanca, El Jadida, Maroc",

  /**
   * Seul numéro du restaurant (appels, WhatsApp, SMS) — confirmé par le propriétaire.
   * Le fixe imprimé sur la carte (05 23 80 08 33) n'est pas le bon : ne pas le remettre.
   */
  phone: {
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

  /** Adresse e-mail du restaurant, donnée par le propriétaire le 23/10/2026. */
  email: "muchosfr@gmail.com" as string | null,

  /**
   * Horaires. Format 24 h. Confirmés par le propriétaire le 23/10/2026 :
   * avec `verified: true`, ils sont affichés sans réserve et envoyés à Google.
   */
  hours: {
    value: [
      { days: "Tous les jours", opens: "12:30", closes: "23:00" },
    ] as { days: string; opens: string; closes: string }[],
    verified: true,
    source: "Propriétaire",
  },
  /** Jours concernés au format Schema.org (utilisé seulement si hours.verified). */
  hoursSchemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

  services: {
    dineIn: true,
    takeaway: true,
    delivery: false, // pas de livraison par le restaurant : sur place, à emporter, Glovo
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
