import { restaurant } from "@/config/restaurant";

const a = restaurant.address.value;

export const fullAddress = `${a.line1}, ${a.street}, ${a.city} ${a.postalCode}, ${a.country}`;

export const telHref = `tel:${restaurant.phone.value.e164}`;
export const mobileHref = `tel:${restaurant.mobile.value.e164}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  restaurant.mapsQuery,
)}`;

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  restaurant.mapsQuery,
)}`;

/** Carte intégrée sans clé API, chargée uniquement à la demande du visiteur. */
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  restaurant.mapsQuery,
)}&z=16&output=embed`;

export const deliveryUrl = restaurant.delivery.enabled ? restaurant.delivery.url : null;

export const whatsappHref = (message: string) =>
  restaurant.whatsapp ? `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}` : null;

/** Format compatible iOS et Android (vers le portable : un fixe ne reçoit pas de SMS). */
export const smsHref = (message: string) =>
  `sms:${restaurant.mobile.value.e164}?&body=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "La carte", href: "/#carte" },
  { label: "Notre univers", href: "/#univers" },
  { label: "Galerie", href: "/#galerie" },
  { label: "Contact", href: "/#contact" },
] as const;

export const hoursLabel = (h: { opens: string; closes: string }) =>
  `${h.opens.replace(":", " h ")} – ${h.closes.replace(":", " h ")}`.replace(/ h 00/g, " h");
