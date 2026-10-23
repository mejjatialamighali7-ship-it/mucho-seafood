import { restaurant } from "@/config/restaurant";
import { publishedMenu } from "@/data/menu";

/**
 * Données structurées Schema.org « Restaurant ».
 * Seules les informations établies sont publiées : pas de note, pas d'avis,
 * pas de prix non confirmés ; horaires uniquement si hours.verified = true.
 */
export function restaurantJsonLd() {
  const r = restaurant;
  const url = r.siteUrl.replace(/\/$/, "");
  const a = r.address.value;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${url}/#restaurant`,
    name: r.brandName,
    alternateName: r.name,
    url,
    image: [`${url}/og-image.jpg`, `${url}/images/salle-vue-mer.webp`],
    logo: `${url}/images/logo-mucho.webp`,
    telephone: r.phone.value.e164,
    contactPoint: [
      { "@type": "ContactPoint", telephone: r.phone.value.e164, contactType: "reservations" },
      { "@type": "ContactPoint", telephone: r.mobile.value.e164, contactType: "customer service" },
    ],
    servesCuisine: ["Poissons", "Fruits de mer", "Cuisine marocaine"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.line1}, ${a.street}`,
      addressLocality: a.city,
      postalCode: a.postalCode,
      addressCountry: a.countryCode,
    },
    acceptsReservations: r.services.reservations,
    hasMenu: `${url}/carte`,
  };

  if (r.hours.verified) {
    data.openingHoursSpecification = r.hours.value.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: r.hoursSchemaDays,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  const sameAs = Object.values(r.social).filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;

  return data;
}

export function menuJsonLd() {
  const url = restaurant.siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${url}/carte#menu`,
    name: `Carte — ${restaurant.brandName}`,
    inLanguage: "fr",
    hasMenuSection: publishedMenu.map((c) => ({
      "@type": "MenuSection",
      name: c.title,
      hasMenuItem: c.dishes.map((d) => ({
        "@type": "MenuItem",
        name: d.name,
        ...(d.description ? { description: d.description } : {}),
        ...(d.price?.verified
          ? { offers: { "@type": "Offer", price: d.price.amount, priceCurrency: "MAD" } }
          : {}),
      })),
    })),
  };
}
