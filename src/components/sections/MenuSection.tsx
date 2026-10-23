import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publishedMenu, officialMenuUrl } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DishList } from "@/components/ui/DishList";
import { Reveal } from "@/components/ui/Reveal";
import { MenuTabs } from "./MenuTabs";

/** Nombre de plats montrés par catégorie sur l'accueil ; la carte complète est sur /carte. */
const PREVIEW = 6;

export function MenuSection() {
  const anyPrice = publishedMenu.some((c) => c.dishes.some((d) => d.price?.verified));

  return (
    <section id="carte" aria-labelledby="carte-title" className="bg-ivory-deep/60 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading
            id="carte-title"
            kicker="La carte"
            title={
              <>
                Poissons, fruits de mer <em className="text-mucho">& cuisine de la mer.</em>
              </>
            }
            intro="Fritures, grillades, seafood boil, tajines de la mer, coquillages, pâtes et pizzas : un aperçu de la carte, à parcourir par envie."
          />
          <Reveal delay={200} className="flex shrink-0 flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-mucho">
            <Link href="/carte" className="link-underline inline-flex items-center gap-2">
              Carte complète
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/#emporter" className="link-underline inline-flex items-center gap-2">
              À emporter
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-16 lg:mt-20">
          <MenuTabs
            categories={publishedMenu}
            panels={publishedMenu.map((c) => (
              <div key={c.id}>
                <DishList dishes={c.dishes.slice(0, PREVIEW)} note={c.note} />
                {c.dishes.length > PREVIEW ? (
                  <Link href={`/carte#${c.id}`} className="link-underline mt-10 inline-flex items-center gap-2 text-sm font-medium text-mucho">
                    Voir les {c.dishes.length} propositions « {c.title} »
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            ))}
          />
        </Reveal>

        <p className="mt-16 max-w-2xl border-t border-ink/10 pt-6 text-sm leading-relaxed text-muted">
          {anyPrice
            ? "Prix en dirhams. "
            : "Les prix vous sont communiqués au restaurant et par téléphone. "}
          La carte peut évoluer et certains plats peuvent ne pas être disponibles.
          {officialMenuUrl ? (
            <>
              {" "}
              <a href={officialMenuUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-abyss">
                Télécharger la carte (PDF)
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    </section>
  );
}
