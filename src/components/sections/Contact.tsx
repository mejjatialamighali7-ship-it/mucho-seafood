import { ArrowUpRight, Navigation, Phone, Clock, MapPin, Bike, MessageCircle } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { telHref, mobileHref, directionsUrl, deliveryUrl, fullAddress, hoursLabel, whatsappHref } from "@/lib/links";
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
                  <p className="mt-1 text-sm text-muted">
                    Portable et WhatsApp :{" "}
                    <a href={mobileHref} className="link-underline text-abyss">
                      {restaurant.mobile.value.display}
                    </a>
                  </p>
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

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-brand">
                <Navigation size={16} aria-hidden="true" />
                Nous trouver
              </a>
              <a href={telHref} className="btn btn-ghost-dark">
                <Phone size={16} aria-hidden="true" />
                Appeler
              </a>
              {whatsappHref("Bonjour Mucho, ") ? (
                <a href={whatsappHref("Bonjour Mucho, ")!} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp
                </a>
              ) : null}
            </div>

            {deliveryUrl ? (
              <a
                href={deliveryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 flex items-center justify-between gap-6 bg-abyss p-7 text-ivory transition-colors hover:bg-ocean"
              >
                <span className="flex items-center gap-5">
                  <Bike size={26} strokeWidth={1.4} aria-hidden="true" className="text-copper-light" />
                  <span>
                    <span className="block font-serif text-2xl">Mucho à la maison</span>
                    <span className="mt-1 block text-sm text-ivory/70">
                      Commander en livraison sur {restaurant.delivery.provider}
                    </span>
                  </span>
                </span>
                <ArrowUpRight size={22} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
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
