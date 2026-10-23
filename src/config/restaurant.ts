/**
 * CONFIGURATION CENTRALE DU RESTAURANT
 * ------------------------------------
 * Toutes les informations pratiques du site sont ici : coordonnées, horaires,
 * réseaux sociaux, réservation, livraison. Modifiez ce fichier, le site suit.
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

  phone: {
    value: { display: "+212 661 146 309", e164: "+212661146309" },
    verified: false,
    source: "Brief propriétaire + Restaurant Guru",
  },

  /**
   * Numéro WhatsApp — configuré séparément du téléphone, volontairement vide.
   * Renseignez-le uniquement après avoir vérifié qu'il reçoit bien WhatsApp
   * (format international sans espaces ni « + », ex. "212661146309").
   */
  whatsapp: null as string | null,

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
    reservations: true,
  },

  /** Réseaux sociaux officiels — ajoutez uniquement des comptes vérifiés. */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
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

  reservation: {
    /**
     * Si RESERVATION_WEBHOOK_URL est défini côté serveur, le formulaire envoie
     * la demande à ce webhook. Sinon, il prépare un message WhatsApp (si un
     * numéro est configuré) ou un SMS vers le téléphone du restaurant.
     */
    maxGuests: 20,
    /** Créneaux proposés dans le formulaire (doivent rester dans les horaires). */
    timeSlots: [
      "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
      "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
      "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
      "21:30", "22:00",
    ],
  },

  /** Faits confirmés par les photos officielles fournies par le restaurant. */
  confirmedFacts: {
    seaView: true,
  },
} as const;

export type Restaurant = typeof restaurant;
