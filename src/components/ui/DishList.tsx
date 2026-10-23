import Image from "next/image";
import { formatPrice, type Dish } from "@/data/menu";

/** Liste de plats façon carte imprimée : nom, filet pointillé, prix si confirmé. */
export function DishList({ dishes, note, headingLevel = 3 }: { dishes: Dish[]; note?: string; headingLevel?: 3 | 4 }) {
  const H = headingLevel === 3 ? "h3" : "h4";
  const featured = dishes.filter((d) => d.image && !d.signature);
  const lines = dishes.filter((d) => !featured.includes(d));
  const groups: [string, Dish[]][] = [];
  for (const d of lines) {
    const g = d.group ?? "";
    const found = groups.find(([name]) => name === g);
    if (found) found[1].push(d);
    else groups.push([g, [d]]);
  }

  return (
    <div className={featured.length ? "grid gap-12 lg:grid-cols-12 lg:gap-16" : ""}>
      {featured.length ? (
        <div className="space-y-10 lg:col-span-5">
          {featured.map((d) => (
            <figure key={d.id}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={d.image!}
                  alt={d.imageAlt ?? d.name}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-5">
                <H className="font-serif text-3xl text-abyss">{d.name}</H>
                {d.description ? <p className="mt-2 text-sm text-muted">{d.description}</p> : null}
                {formatPrice(d.price) ? <p className="mt-2 font-serif text-xl text-copper-ink">{formatPrice(d.price)}</p> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
      <div className={featured.length ? "content-start lg:col-span-7" : ""}>
        {groups.map(([group, items]) => (
          <div key={group || "_"} className="mb-12 last:mb-0">
            {group ? (
              <p className="mb-7 border-b border-ink/10 pb-3 text-[0.7rem] font-medium tracking-[0.22em] text-copper-ink uppercase">
                {group}
              </p>
            ) : null}
            <ul
              className={`grid gap-x-16 gap-y-9 ${
                featured.length ? "" : "md:grid-cols-2"
              }`}
            >
              {items.map((d) => {
                const price = d.variants ? null : formatPrice(d.price);
                return (
                  <li key={d.id} className="group">
                    <div className="flex items-baseline gap-4">
                      <H className="font-serif text-[1.65rem] leading-tight text-abyss transition-colors group-hover:text-mucho">
                        {d.name}
                      </H>
                      {price ? (
                        <>
                          <span aria-hidden="true" className="flex-1 translate-y-[-0.3rem] border-b border-dotted border-ink/25" />
                          <span className="font-serif text-xl whitespace-nowrap text-copper-ink">{price}</span>
                        </>
                      ) : null}
                    </div>
                    {d.variants ? (
                      <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                        {d.variants.map((v) => (
                          <li key={v.label} className="text-sm text-muted">
                            {v.label} <span className="ml-1 font-serif text-xl text-copper-ink">{formatPrice(v.price)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {d.description ? <p className="mt-1.5 max-w-md text-[0.93rem] leading-relaxed text-muted">{d.description}</p> : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {note ? <p className="mt-10 max-w-xl font-serif text-lg text-muted italic">{note}</p> : null}
      </div>
    </div>
  );
}
