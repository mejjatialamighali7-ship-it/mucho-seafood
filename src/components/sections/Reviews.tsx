import { reviews } from "@/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Ne s'affiche que si des avis authentiques ont été ajoutés dans src/data/reviews.ts. */
export function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <section aria-labelledby="avis-title" className="bg-ivory-deep/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="avis-title" kicker="Ils sont venus" title="Vos mots." />
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.url + r.author}>
              <figure>
                <blockquote className="font-serif text-2xl leading-snug text-abyss">« {r.quote} »</blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  {r.author} ·{" "}
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {r.platform}
                  </a>
                  , {r.date}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
