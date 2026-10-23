import Image from "next/image";
import { Waves, UtensilsCrossed, CalendarCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WaveLine } from "@/components/ui/WaveLine";

const facts = [
  { icon: Waves, title: "Face à l'océan", text: "Une grande baie vitrée ouverte sur la plage." },
  { icon: UtensilsCrossed, title: "Sur place, à emporter, livré", text: "La cuisine de la mer, comme vous l'aimez." },
  { icon: CalendarCheck, title: "Sur réservation", text: "Pour une table entre amis ou en famille." },
];

export function Universe() {
  return (
    <section id="univers" aria-labelledby="univers-title" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Photo principale, débordante, avec un détail en incrustation */}
        <div className="relative self-center lg:col-span-7">
          <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:aspect-[4/3.4] xl:-ml-24">
            <Image
              src="/images/salle-vue-mer.webp"
              alt="La salle de Mucho : fauteuils en bois au dossier damier bleu et blanc, tables nappées, baie vitrée sur l'océan et les palmiers"
              fill
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="parallax-soft object-cover object-[30%_50%]"
            />
          </Reveal>
          <Reveal
            variant="image"
            delay={250}
            className="absolute -bottom-10 right-4 w-[38%] max-w-[15rem] overflow-hidden border-[6px] border-ivory shadow-[0_24px_60px_rgba(11,22,49,0.25)] sm:right-8 lg:-right-10"
          >
            <Image
              src="/images/detail-fauteuil.webp"
              alt="Détail du tissu à motif de cubes bleu marine et blanc des fauteuils"
              width={340}
              height={300}
              sizes="240px"
              className="h-auto w-full"
            />
          </Reveal>
        </div>

        <div className="flex flex-col justify-center pt-10 lg:col-span-5 lg:pt-0 lg:pl-14">
          <Reveal as="p" className="kicker text-copper-ink">
            Notre univers
          </Reveal>
          <Reveal as="h2" id="univers-title" delay={80} className="mt-6 text-[2.6rem] leading-[1.02] text-abyss sm:text-[3.6rem]">
            Le goût de la mer, <em className="text-mucho">le plaisir d&apos;être ensemble.</em>
          </Reveal>
          <Reveal delay={160}>
            <WaveLine className="mt-8 h-6 w-40 text-copper" />
          </Reveal>
          <Reveal as="p" delay={200} className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-muted">
            À l&apos;étage d&apos;une villa de la route de Casablanca, la salle de Mucho s&apos;ouvre en grand sur
            l&apos;océan. On y vient pour les fritures dorées, les grillades, les paellas, les tajines de la mer et les
            pâtes aux fruits de mer&nbsp;: une cuisine marine pensée pour être partagée.
          </Reveal>

          <ul className="mt-12 space-y-6 border-t border-ink/10 pt-10">
            {facts.map((f, i) => (
              <Reveal as="li" key={f.title} delay={260 + i * 90} className="flex gap-5">
                <f.icon size={22} strokeWidth={1.4} className="mt-0.5 shrink-0 text-mucho" aria-hidden="true" />
                <div>
                  <p className="font-serif text-xl text-abyss">{f.title}</p>
                  <p className="mt-1 text-sm text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
