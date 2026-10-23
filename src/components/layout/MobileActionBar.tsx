"use client";

import { useEffect, useState } from "react";
import { Phone, Navigation } from "lucide-react";
import { telHref, directionsUrl } from "@/lib/links";

/**
 * Barre d'actions mobile (Itinéraire, Appeler ; la pastille WhatsApp est juste à côté) :
 * apparaît après la photo d'accueil,
 * se retire près du pied de page pour ne jamais masquer de contenu utile.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y > document.documentElement.scrollHeight - 160;
      setVisible(y > window.innerHeight * 0.6 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.68rem] font-medium tracking-[0.12em] uppercase";

  return (
    <nav
      aria-label="Actions rapides"
      className={`fixed bottom-3 left-3 right-[4.6rem] z-40 rounded-full bg-abyss/95 text-ivory shadow-[0_12px_40px_rgba(11,22,49,0.35)] backdrop-blur transition-[transform,opacity] duration-500 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
    >
      <ul className="flex divide-x divide-ivory/15">
        <li className="flex flex-1">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={`${item} rounded-l-full bg-mucho`} tabIndex={visible ? 0 : -1}>
            <Navigation size={18} aria-hidden="true" />
            Itinéraire
          </a>
        </li>
        <li className="flex flex-1">
          <a href={telHref} className={item} tabIndex={visible ? 0 : -1}>
            <Phone size={18} aria-hidden="true" />
            Appeler
          </a>
        </li>
      </ul>
    </nav>
  );
}
