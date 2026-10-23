import { MessageCircle, Phone } from "lucide-react";
import { telHref, takeawayWhatsappHref } from "@/lib/links";

/** Commander à emporter : appel ou WhatsApp (message prérempli). */
export function TakeawayButtons({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const primary = tone === "light" ? "btn btn-light" : "btn btn-brand";
  const secondary = tone === "light" ? "btn btn-ghost-light" : "btn btn-ghost-dark";
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      {takeawayWhatsappHref ? (
        <a href={takeawayWhatsappHref} target="_blank" rel="noopener noreferrer" className={primary}>
          <MessageCircle size={16} aria-hidden="true" />
          Commander sur WhatsApp
        </a>
      ) : null}
      <a href={telHref} className={secondary}>
        <Phone size={16} aria-hidden="true" />
        Commander par téléphone
      </a>
    </div>
  );
}
