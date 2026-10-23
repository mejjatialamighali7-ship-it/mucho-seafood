"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { gallery } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Emplacements de la mosaïque éditoriale (mobile : 2 colonnes ; desktop : 12). */
const slots = [
  "col-span-2 aspect-[4/3] lg:aspect-auto lg:col-[1/9] lg:row-[1/2]",
  "aspect-[3/4] lg:aspect-auto lg:col-[9/13] lg:row-[1/2]",
  "aspect-[3/4] lg:aspect-auto lg:col-[10/13] lg:row-[2/4]",
  "aspect-square lg:aspect-auto lg:col-[1/4] lg:row-[2/3]",
  "aspect-square lg:aspect-auto lg:col-[1/4] lg:row-[3/4]",
  "col-span-2 aspect-[4/3] lg:aspect-auto lg:col-[4/10] lg:row-[2/4]",
];

const sizesFor = (i: number) =>
  i === 0 || i === 5 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 50vw";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number, el: HTMLElement) => {
    triggerRef.current = el;
    setIndex(i);
  };
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) {
      d.close();
      triggerRef.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? gallery[index] : null;

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="galerie-title"
          kicker="Galerie"
          title={
            <>
              Une table <em className="text-mucho">face à l&apos;océan.</em>
            </>
          }
          intro="La salle, la lumière de la côte et quelques assiettes, photographiées au restaurant."
        />

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[34rem_15rem_15rem]">
          {gallery.map((g, i) => (
            <Reveal
              as="li"
              variant="image"
              key={g.src}
              delay={(i % 3) * 120}
              className={`relative overflow-hidden ${slots[i] ?? "aspect-[4/3] lg:col-span-4 lg:row-auto lg:aspect-[4/3]"}`}
            >
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group absolute inset-0 block h-full w-full cursor-zoom-in"
                aria-label={`Agrandir la photo : ${g.caption}`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes={sizesFor(i)}
                  className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-abyss/75 to-transparent p-4 pt-16 text-left text-ivory opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                  <span className="font-serif text-lg leading-tight sm:text-xl">{g.caption}</span>
                  <Expand size={16} aria-hidden="true" className="hidden shrink-0 sm:block" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label="Visionneuse de photos"
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-abyss p-0 text-ivory backdrop:bg-abyss/80"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="text-xs tracking-[0.25em] text-ivory/70 uppercase" aria-live="polite">
                {index! + 1} / {gallery.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 hover:bg-ivory/10"
              >
                <X size={20} aria-hidden="true" />
                <span className="sr-only">Fermer la visionneuse</span>
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 sm:px-20">
              <div className="relative h-full max-h-[78dvh] w-full">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="hero-rise object-contain"
                />
              </div>
              <figcaption className="py-5 text-center font-serif text-xl">{current.caption}</figcaption>
            </figure>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute top-1/2 left-2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-abyss/60 hover:bg-ivory/10 sm:left-5"
            >
              <ChevronLeft size={24} aria-hidden="true" />
              <span className="sr-only">Photo précédente</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute top-1/2 right-2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-abyss/60 hover:bg-ivory/10 sm:right-5"
            >
              <ChevronRight size={24} aria-hidden="true" />
              <span className="sr-only">Photo suivante</span>
            </button>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
