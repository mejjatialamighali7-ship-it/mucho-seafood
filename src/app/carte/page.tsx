import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { PageShell } from "@/components/layout/PageShell";
import { DishList } from "@/components/ui/DishList";
import { publishedMenu, officialMenuUrl } from "@/data/menu";
import { menuJsonLd } from "@/lib/schema";
import { deliveryUrl } from "@/lib/links";
import { restaurant } from "@/config/restaurant";

const title = "La carte — poissons, fruits de mer, paellas et tajines";
const description =
  "La carte de Mucho Seafood à El Jadida : Friture Mucho, Seafood Boil, marmite de fruits de mer, poissons grillés, crevettes pil-pil, tajines de la mer, pâtes, pizzas, desserts et jus frais.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/carte" },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "Mucho Seafood",
    url: "/carte",
    title: `${title} · Mucho Seafood El Jadida`,
    description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "La salle de Mucho face à la plage et à l'océan, El Jadida" }],
  },
};

export default function CartePage() {
  const anyPrice = publishedMenu.some((c) => c.dishes.some((d) => d.price?.verified));
  return (
    <PageShell
      kicker="Mucho Seafood Restaurant El Jadida"
      title={
        <>
          La carte <em className="text-sand">de la mer.</em>
        </>
      }
      intro="Fritures, grillades, paellas, tajines, coquillages et pâtes aux fruits de mer, à partager face à l'océan."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd()) }} />

      <nav aria-label="Catégories" className="sticky top-[4.5rem] z-30 border-b border-ink/10 bg-ivory/90 backdrop-blur-md lg:top-20">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 sm:px-8">
          {publishedMenu.map((c) => (
            <li key={c.id} className="shrink-0">
              <a href={`#${c.id}`} className="block px-3 py-4 text-[0.75rem] font-medium tracking-[0.14em] text-muted uppercase hover:text-abyss">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        {publishedMenu.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-40 border-b border-ink/10 py-16 first:pt-0 last:border-0">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="kicker text-copper-ink">{c.kicker}</p>
                <h2 id={`${c.id}-title`} className="mt-4 text-4xl text-abyss sm:text-5xl">
                  {c.title}
                </h2>
              </div>
              <div className="lg:col-span-9">
                <DishList dishes={c.dishes} note={c.note} />
              </div>
            </div>
          </section>
        ))}

        <div className="mt-16 flex flex-col gap-8 border-t border-ink/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            {anyPrice
              ? "Prix en dirhams. "
              : "Les prix vous sont communiqués au restaurant et par téléphone. "}
            La carte peut évoluer et certains plats peuvent ne pas être disponibles. Allergies ou régime particulier :
            parlez-en à l&apos;équipe.
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
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
            <ActionButtons />
            {deliveryUrl ? (
              <a href={deliveryUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 self-start text-sm text-muted hover:text-abyss sm:self-center">
                Aussi sur {restaurant.delivery.provider}
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
