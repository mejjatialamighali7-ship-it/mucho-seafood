"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { MenuCategory } from "@/data/menu";
import type { ReactNode } from "react";

/**
 * Onglets accessibles (WAI-ARIA Tabs) : flèches gauche/droite, Début/Fin.
 * Les panneaux sont rendus côté serveur et simplement affichés/masqués,
 * ce qui garde toute la carte lisible par les moteurs de recherche.
 */
export function MenuTabs({ categories, panels }: { categories: MenuCategory[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    tabs.current[i]?.focus();
    tabs.current[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = categories.length - 1;
    if (e.key === "ArrowRight") select(active === last ? 0 : active + 1);
    else if (e.key === "ArrowLeft") select(active === 0 ? last : active - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(last);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div className="-mx-5 border-b border-ink/10 sm:mx-0">
        <div
          role="tablist"
          aria-label="Catégories de la carte"
          onKeyDown={onKeyDown}
          className="no-scrollbar flex gap-1 overflow-x-auto px-5 sm:px-0"
        >
          {categories.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`tab-${c.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${c.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative shrink-0 px-4 pt-3 pb-4 text-[0.78rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                  selected ? "text-abyss" : "text-muted hover:text-abyss"
                }`}
              >
                {c.title}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 -bottom-px h-[2px] origin-left bg-mucho transition-transform duration-500 ${
                    selected ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {categories.map((c, i) => (
        <div
          key={c.id}
          id={`panel-${c.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${c.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="pt-12 outline-none focus-visible:outline-none sm:pt-16 [&:not([hidden])]:animate-[rise_0.8s_var(--ease-out-soft)_both]"
        >
          <p className="kicker text-copper-ink">{c.kicker}</p>
          <div className="mt-8">{panels[i]}</div>
        </div>
      ))}
    </div>
  );
}
