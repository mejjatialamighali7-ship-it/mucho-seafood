import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { publishedMenu, officialMenuUrl } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DishList } from "@/components/ui/DishList";
import { Reveal } from "@/components/ui/Reveal";
import { MenuTabs } from "./MenuTabs";
import { deliveryUrl } from "@/lib/links";
import { restaurant } from "@/config/restaurant";

export function MenuSection() {
  const anyPrice = publishedMenu.some((c) => c.dishes.some((d) => d.price?.verified));

  return (
    <section id="carte" aria-labelledby="carte-title" className="bg-ivory-deep/60 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="carte-title"
            kicker="La carte"
            title={
              <>
                Poissons, fruits de mer <em className="text-mucho">& cuisine marine.</em>
              </>
            }
            intro="Fritures, grillades, paellas, tajines de la mer, coquillages et pâtes : une sélection de la carte, à parcourir par envie."
          />
          <Reveal delay={200} className="flex flex-col gap-3 sm:flex-row">
            <Link href="/carte" className="btn btn-brand">
              Carte complète
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            {deliveryUrl ? (
              <a href={deliveryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
                Commander sur {restaurant.delivery.provider}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : null}
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-16 lg:mt-20">
          <MenuTabs
            categories={publishedMenu}
            panels={publishedMenu.map((c) => (
              <DishList key={c.id} dishes={c.dishes} />
            ))}
          />
        </Reveal>

        <p className="mt-16 max-w-2xl border-t border-ink/10 pt-6 text-sm leading-relaxed text-muted">
          {anyPrice
            ? "Prix en dirhams (MAD). "
            : "Les prix vous sont communiqués au restaurant et par téléphone. "}
          La carte peut évoluer et certains plats peuvent ne pas être disponibles.
          {officialMenuUrl ? (
            <>
              {" "}
              <a href={officialMenuUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-abyss">
                Consulter la carte officielle
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    </section>
  );
}
