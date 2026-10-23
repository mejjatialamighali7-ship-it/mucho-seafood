import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Gabarit des pages secondaires : en-tête plein, titre éditorial, contenu. */
export function PageShell({ kicker, title, intro, children }: { kicker: string; title: ReactNode; intro?: ReactNode; children: ReactNode }) {
  return (
    <>
      <Header variant="solid" />
      <main id="contenu">
        <section className="pattern-damier bg-abyss pt-40 pb-20 text-ivory sm:pt-48 sm:pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="kicker hero-rise text-copper-light">{kicker}</p>
            <h1 className="hero-rise mt-6 max-w-4xl text-5xl leading-[1] sm:text-7xl" style={{ ["--d" as string]: "120ms" }}>
              {title}
            </h1>
            {intro ? (
              <p className="hero-rise mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ivory/75" style={{ ["--d" as string]: "240ms" }}>
                {intro}
              </p>
            ) : null}
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </>
  );
}
