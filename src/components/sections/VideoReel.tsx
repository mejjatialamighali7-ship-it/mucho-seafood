"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { videos, videoSrc, posterSrc, type VideoClip } from "@/data/videos";

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const m = window.matchMedia(REDUCED);
  m.addEventListener("change", onChange);
  return () => m.removeEventListener("change", onChange);
}

function canAutoplay() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !window.matchMedia(REDUCED).matches && !saveData;
}

/**
 * Bandeau de vidéos courtes, à faire défiler (glisser sur mobile, flèches sur PC).
 * Rien n'est téléchargé avant l'arrivée à l'écran : seules les images d'attente
 * se chargent (en différé), et chaque vidéo démarre quand elle est visible puis
 * s'arrête quand elle sort de l'écran. Pas de lecture automatique si le visiteur
 * a demandé moins d'animations ou le mode économie de données : un toucher suffit.
 */
export function VideoReel({ heading }: { heading: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null);
  const autoplay = useSyncExternalStore(subscribeMotion, canAutoplay, () => false);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const l = listRef.current;
    if (!l) return;
    setEdges({
      start: l.scrollLeft < 8,
      end: l.scrollLeft + l.clientWidth > l.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scroll = (dir: 1 | -1) => {
    const l = listRef.current;
    if (!l) return;
    const reduced = window.matchMedia(REDUCED).matches;
    l.scrollBy({
      left: dir * l.clientWidth * 0.8,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const arrow =
    "inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-abyss transition-colors hover:border-abyss hover:bg-abyss hover:text-ivory disabled:pointer-events-none disabled:opacity-30";

  return (
    <>
      <div className="flex items-end justify-between gap-8">
        {heading}
        <div className="hidden shrink-0 gap-3 sm:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={edges.start}
            aria-controls="video-reel"
            className={arrow}
          >
            <ChevronLeft size={22} aria-hidden="true" />
            <span className="sr-only">Vidéos précédentes</span>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={edges.end}
            aria-controls="video-reel"
            className={arrow}
          >
            <ChevronRight size={22} aria-hidden="true" />
            <span className="sr-only">Vidéos suivantes</span>
          </button>
        </div>
      </div>
      <ul
        id="video-reel"
        ref={listRef}
        onScroll={updateEdges}
        className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:gap-4 sm:px-8 lg:mt-14 lg:mr-[calc(50%-50vw)] [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((clip) => (
          <Clip key={clip.id} clip={clip} autoplay={autoplay} />
        ))}
      </ul>
    </>
  );
}

function Clip({ clip, autoplay }: { clip: VideoClip; autoplay: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !autoplay) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else if (!e.isIntersecting && !v.paused) v.pause();
      },
      { threshold: 0.6 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [autoplay]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <li className="relative aspect-[9/16] w-[68vw] max-w-[17rem] shrink-0 snap-start overflow-hidden bg-abyss sm:w-[15.5rem] lg:w-[17rem]">
      <figure className="h-full">
        <Image
          src={posterSrc(clip.id)}
          alt=""
          fill
          sizes="(min-width: 1024px) 272px, (min-width: 640px) 248px, 68vw"
          className="object-cover"
        />
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => {
            setPlaying(true);
            setStarted(true);
          }}
          onPause={() => setPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}
        >
          <source src={videoSrc(clip.id)} type="video/mp4" />
        </video>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-abyss/85 to-transparent"
        />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 font-serif text-xl leading-tight text-ivory">
          {clip.caption}
        </figcaption>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className="group absolute inset-0 flex items-start justify-end p-4"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-abyss/55 text-ivory backdrop-blur-sm transition-colors group-hover:bg-abyss/80">
            {playing ? (
              <Pause size={18} aria-hidden="true" />
            ) : (
              <Play size={18} aria-hidden="true" className="translate-x-px" />
            )}
          </span>
          <span className="sr-only">Lecture de la vidéo : {clip.caption}</span>
        </button>
      </figure>
    </li>
  );
}
