import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menu, formatPrice } from "@/data/menu";
import { Reveal } from "@/components/ui/Reveal";
import { WaveLine } from "@/components/ui/WaveLine";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Plats signatures : ceux marqués `signature: true` dans src/data/menu.ts.
 * Le premier plat avec photo est mis en scène en grand ; les autres prennent
 * la forme de « cartes de menu » typographiques en attendant leur photo.
 */
export function Signatures() {
  const signatures = menu.flatMap((c) => c.dishes).filter((d) => d.signature && d.available !== false);
  const hero = signatures.find((d) => d.image) ?? null;
  const others = signatures.filter((d) => d !== hero);

  return (
    <section
      id="signatures"
      aria-labelledby="signatures-title"
      className="pattern-damier relative bg-abyss py-24 text-ivory sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal as="p" className="kicker text-copper-light">
              Plats signatures
            </Reveal>
            <Reveal as="h2" id="signatures-title" delay={80} className="mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl">
              Ce que l&apos;on vient <em className="text-sand">partager</em> chez Mucho.
            </Reveal>
          </div>
          <Reveal delay={160}>
            <WaveLine className="h-6 w-44 text-copper-light" />
          </Reveal>
        </div>

        {hero ? (
          <article className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden lg:col-span-6">
              <Image
                src={hero.image!}
                alt={hero.imageAlt ?? hero.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="parallax-soft object-cover"
              />
            </Reveal>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal as="p" className="font-serif text-7xl leading-none text-copper-light/80 italic">
                {pad(1)}
              </Reveal>
              <Reveal as="h3" delay={80} className="mt-6 text-5xl leading-none sm:text-6xl">
                {hero.name}
              </Reveal>
              <Reveal as="p" delay={160} className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-ivory/75">
                {hero.description}
              </Reveal>
              {formatPrice(hero.price) ? (
                <p className="mt-6 font-serif text-2xl text-sand">{formatPrice(hero.price)}</p>
              ) : null}
              <Reveal delay={240}>
                <Link href="/#carte" className="btn btn-ghost-light mt-10">
                  Voir la carte
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </article>
        ) : null}

        {others.length > 0 ? (
          <ul className={`mt-20 grid gap-px overflow-hidden border border-ivory/15 bg-ivory/15 sm:grid-cols-2 lg:mt-28 ${others.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}>
            {others.map((d, i) => (
              <Reveal
                as="li"
                key={d.id}
                delay={i * 120}
                className="group relative flex min-h-[17rem] flex-col sm:min-h-[22rem] justify-between bg-abyss p-8 transition-colors duration-500 hover:bg-ocean sm:p-10"
              >
                <span className="font-serif text-4xl text-copper-light/80 italic">{pad(i + (hero ? 2 : 1))}</span>
                <div>
                  <h3 className="text-[2.4rem] leading-[1.02] text-ivory">{d.name}</h3>
                  {d.description ? (
                    <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ivory/70">{d.description}</p>
                  ) : null}
                  {formatPrice(d.price) ? (
                    <p className="mt-4 font-serif text-xl text-sand">{formatPrice(d.price)}</p>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="mt-8 block h-px w-12 bg-copper-light transition-[width] duration-700 group-hover:w-24"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
