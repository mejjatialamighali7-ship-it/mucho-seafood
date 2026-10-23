import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ManageCookiesButton } from "@/components/layout/CookieConsent";
import { gaId } from "@/config/analytics";
import { restaurant } from "@/config/restaurant";
import { navLinks, telHref, fullAddress, deliveryUrl, directionsUrl, hoursLabel } from "@/lib/links";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
};

export function Footer() {
  const socials = Object.entries(restaurant.social).filter(([, url]) => Boolean(url)) as [string, string][];
  const year = new Date().getFullYear();

  return (
    <footer className="pattern-damier relative bg-abyss pb-28 text-ivory md:pb-0">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-12 sm:px-8 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size={84} />
            <p className="mt-8 font-serif text-3xl leading-tight text-ivory">
              {restaurant.tagline}
              <span className="block text-ivory/60 italic">L&apos;océan inspire. Mucho rassemble.</span>
            </p>
          </div>

          <nav aria-label="Pied de page" className="lg:col-span-2">
            <h2 className="kicker text-copper-light">Explorer</h2>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ivory/80">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/carte" className="link-underline hover:text-ivory">
                  Carte complète
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="kicker text-copper-light">Nous trouver</h2>
            <address className="mt-6 space-y-3 text-[0.95rem] leading-relaxed text-ivory/80 not-italic">
              <p>{fullAddress}</p>
              <p>
                <a href={telHref} className="link-underline hover:text-ivory">
                  {restaurant.phone.value.display}
                </a>
{" "}
                <span className="text-ivory/50">(appel et WhatsApp)</span>
              </p>
              <p>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 hover:text-ivory">
                  Itinéraire <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="kicker text-copper-light">Horaires</h2>
            <ul className="mt-6 space-y-2 text-[0.95rem] text-ivory/80">
              {restaurant.hours.value.map((h) => (
                <li key={h.days}>
                  {h.days} · {hoursLabel(h)}
                </li>
              ))}
            </ul>
            {!restaurant.hours.verified ? (
              <p className="mt-2 text-xs text-ivory/50">Horaires indicatifs, à confirmer par téléphone.</p>
            ) : null}
            {deliveryUrl ? (
              <a
                href={deliveryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-8 inline-flex items-center gap-1 text-[0.95rem] text-ivory/80 hover:text-ivory"
              >
                Aussi sur {restaurant.delivery.provider}
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            ) : null}
            {socials.length > 0 ? (
              <ul className="mt-8 flex gap-5 text-sm text-ivory/80">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {socialLabels[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-xs tracking-wide text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {restaurant.brandName} — El Jadida, Maroc
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            <li>
              <Link href="/mentions-legales" className="link-underline hover:text-ivory">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="link-underline hover:text-ivory">
                CGU
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="link-underline hover:text-ivory">
                Confidentialité &amp; RGPD
              </Link>
            </li>
            {gaId ? (
              <li>
                <ManageCookiesButton className="link-underline cursor-pointer tracking-wide hover:text-ivory" />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
