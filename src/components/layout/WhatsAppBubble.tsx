import { restaurant } from "@/config/restaurant";
import { whatsappHref } from "@/lib/links";

/** Pastille WhatsApp flottante — masquée si aucun numéro n'est configuré. */
export function WhatsAppBubble() {
  const href = whatsappHref("Bonjour Mucho, ");
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Écrire à ${restaurant.brandName} sur WhatsApp (nouvel onglet)`}
      className="group fixed right-3 bottom-3 z-40 grid h-[3.4rem] w-[3.4rem] place-items-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6 sm:h-[3.75rem] sm:w-[3.75rem]"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path
          fill="#fff"
          d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.8.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3z"
        />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-full bg-abyss px-4 py-2 text-xs tracking-wide whitespace-nowrap text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
        Une question ? Écrivez-nous
      </span>
    </a>
  );
}
