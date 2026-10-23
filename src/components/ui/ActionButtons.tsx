import { MessageCircle, Navigation, Phone } from "lucide-react";
import { telHref, directionsUrl, whatsappHref } from "@/lib/links";

/**
 * L'unique bloc d'action du site, identique partout : Itinéraire, WhatsApp, Appeler.
 * `tone="light"` sur fond sombre, `tone="dark"` sur fond clair.
 */
export function ActionButtons({
  tone = "dark",
  stacked = false,
  className = "",
}: {
  tone?: "dark" | "light";
  stacked?: boolean;
  className?: string;
}) {
  const primary = tone === "light" ? "btn btn-light" : "btn btn-brand";
  const secondary = tone === "light" ? "btn btn-ghost-light" : "btn btn-ghost-dark";
  const wa = whatsappHref("Bonjour Mucho, ");
  const layout = stacked ? "flex flex-col gap-3 [&>a]:w-full" : "flex flex-col gap-3 sm:flex-row sm:flex-wrap";

  return (
    <div className={`${layout} ${className}`}>
      <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={primary}>
        <Navigation size={16} aria-hidden="true" />
        Itinéraire
        <span className="sr-only">(Google Maps, nouvel onglet)</span>
      </a>
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={secondary}>
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp
          <span className="sr-only">(nouvel onglet)</span>
        </a>
      ) : null}
      <a href={telHref} className={secondary}>
        <Phone size={16} aria-hidden="true" />
        Appeler
      </a>
    </div>
  );
}
