import { ArrowUpRight, Phone, Clock, MapPin, ShoppingBag } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { telHref, deliveryUrl, fullAddress, hoursLabel } from "@/lib/links";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MapEmbed } from "./MapEmbed";

export function Contact() {
  const a = restaurant.address.value;
  const row = "flex gap-5 border-b border-ink/10 py-6";
  const icon = "mt-1 shrink-0 text-mucho";

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="contact-title"
          kicker="Nous trouver"
          title={
            <>
              Route de Casablanca, <em className="text-mucho">El Jadida.</em>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <address className="not-italic">
              <div className={`${row} border-t`}>
                <MapPin size={20} strokeWidth={1.5} className={icon} aria-hidden="true" />
                <div>
                  <p className="text-[0.7rem] tracking-[0.2em] text-muted uppercase">Adresse</p>
                  <p className="mt-2 font-serif text-2xl leading-snug text-abyss">
                    {a.line1}
                    <br />
                    {a.street}
                    <br />
                    {a.postalCode} {a.city}, {a.country}
                  </p>
                </div>
              </div>
              <div className={row}>
                <Phone size={20} strokeWidth={1.5} className={icon} aria-hidden="true" />
                <div>
                  <p className="text-[0.7rem] tracking-[0.2em] text-muted uppercase">Téléphone</p>
                  <a href={telHref} className="link-underline mt-2 inline-block font-serif text-2xl text-abyss">
                    {restaurant.phone.value.display}
                  </a>
                  <p className="mt-1 text-sm text-muted">Appel et WhatsApp</p>
                </div>
              </div>
              <div className={row}>
                <Clock size={20} strokeWidth={1.5} className={icon} aria-hidden="true" />
                <div>
                  <p className="text-[0.7rem] tracking-[0.2em] text-muted uppercase">Horaires</p>
                  {restaurant.hours.value.map((h) => (
                    <p key={h.days} className="mt-2 font-serif text-2xl text-abyss">
                      {h.days} · {hoursLabel(h)}
                    </p>
                  ))}
                  {!restaurant.hours.verified ? (
                    <p className="mt-1 text-sm text-muted">Horaires indicatifs, à confirmer par téléphone.</p>
                  ) : null}
                </div>
              </div>
            </address>

            <ActionButtons className="mt-10" />

            {deliveryUrl ? (
              <p className="mt-8 flex items-center gap-2 text-sm text-muted">
                <ShoppingBag size={16} strokeWidth={1.5} aria-hidden="true" className="text-mucho" />
                Aussi sur{" "}
                <a href={deliveryUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-abyss">
                  {restaurant.delivery.provider}
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">(nouvel onglet)</span>
                </a>
              </p>
            ) : null}
          </Reveal>

          <Reveal variant="image" delay={150} className="relative min-h-[24rem] overflow-hidden lg:col-span-7 lg:min-h-0">
            <MapEmbed />
            <p className="sr-only">{fullAddress}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
