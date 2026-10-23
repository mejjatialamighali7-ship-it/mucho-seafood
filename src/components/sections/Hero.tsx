import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { restaurant } from "@/config/restaurant";

/**
 * Accueil éditorial : sur mobile, la photo occupe le haut de l'écran et le titre
 * vient se poser sur son fondu ; sur grand écran, composition en deux colonnes
 * (texte sur fond abysse, photo pleine hauteur) pour garder l'assiette nette.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="pattern-damier relative isolate overflow-hidden bg-abyss text-ivory lg:grid lg:min-h-[100svh] lg:grid-cols-12"
    >
      <div className="relative h-[58svh] min-h-[22rem] overflow-hidden lg:order-2 lg:col-span-7 lg:h-auto">
        <Image
          src="/images/fruits-de-mer-riz-vue-mer.webp"
          alt="Plateau de fruits de mer sur riz — crevettes, crabe, moules — servi face à la plage et à l'océan d'El Jadida"
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 58vw, 100vw"
          quality={82}
          className="hero-image object-cover object-[62%_70%] lg:object-[55%_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/10 to-abyss/45 lg:bg-gradient-to-r lg:from-abyss lg:via-transparent lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-abyss/60 to-transparent" />
        <p className="absolute right-5 bottom-6 hidden text-[0.65rem] tracking-[0.3em] text-ivory/80 uppercase sm:block lg:right-8 lg:bottom-8">
          Vue sur l&apos;océan · Route de Casablanca
        </p>
      </div>

      <div className="relative z-10 -mt-28 flex flex-col justify-end px-5 pb-14 sm:px-8 sm:pb-20 lg:order-1 lg:col-span-5 lg:mt-0 lg:pt-36 lg:pr-0 lg:pb-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <h1 id="hero-title" className="[text-shadow:0_2px_32px_rgba(11,22,49,0.5)]">
          <span className="kicker hero-rise text-sand" style={{ ["--d" as string]: "150ms" }}>
            {restaurant.brandName} · El Jadida
          </span>
          <span
            className="hero-rise mt-6 block text-[3.3rem] leading-[0.95] font-medium sm:text-[5rem] lg:mt-8 lg:whitespace-nowrap lg:text-[6.4rem] xl:text-[7.2rem]"
            style={{ ["--d" as string]: "300ms" }}
          >
            L&apos;océan inspire.
          </span>
          <span
            className="hero-rise block text-[3.3rem] leading-[0.95] font-normal text-sand italic sm:text-[5rem] lg:whitespace-nowrap lg:text-[6.4rem] xl:text-[7.2rem]"
            style={{ ["--d" as string]: "450ms" }}
          >
            Mucho rassemble.
          </span>
        </h1>

        <p
          className="hero-rise mt-8 max-w-sm text-[1.05rem] leading-relaxed text-ivory/80 lg:mt-10"
          style={{ ["--d" as string]: "650ms" }}
        >
          {restaurant.baseline}
        </p>
        <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "800ms" }}>
          <Link href="/#carte" className="btn btn-light">
            Découvrir la carte
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/#reserver" className="btn btn-ghost-light">
            Réserver une table
          </Link>
        </div>

        <a
          href="#univers"
          className="mt-16 hidden items-center gap-4 text-[0.65rem] tracking-[0.3em] text-ivory/60 uppercase hover:text-ivory lg:inline-flex"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-ivory/20">
            <span className="scroll-cue-line absolute inset-0 bg-ivory" />
          </span>
          Défiler
        </a>
      </div>
    </section>
  );
}
