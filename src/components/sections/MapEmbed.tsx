"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { mapsEmbedUrl } from "@/lib/links";

/** La carte Google n'est chargée qu'au clic : aucun poids au chargement initial. */
export function MapEmbed() {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        title="Plan d'accès à Mucho, route de Casablanca, El Jadida"
        src={mapsEmbedUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShow(true)}
      className="pattern-damier group flex h-full w-full flex-col items-center justify-center gap-5 bg-ocean text-ivory"
    >
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-ivory/30 transition-transform duration-500 group-hover:scale-110">
        <MapPin size={26} strokeWidth={1.4} aria-hidden="true" />
      </span>
      <span className="font-serif text-2xl">Afficher le plan</span>
      <span className="max-w-xs px-6 text-center text-xs leading-relaxed text-ivory/60">
        La carte est fournie par Google Maps et ne se charge qu&apos;à votre demande.
      </span>
    </button>
  );
}
