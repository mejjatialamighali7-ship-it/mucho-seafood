import Image from "next/image";
import { MessageCircle, Navigation, Phone } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { telHref, mobileHref, hoursLabel, directionsUrl, whatsappHref } from "@/lib/links";
import { Reveal } from "@/components/ui/Reveal";
import { TakeawayButtons } from "@/components/ui/TakeawayButtons";

/** Mucho ne prend pas de réservation : cette section invite à venir directement. */
export function Visit() {
  const wa = whatsappHref("Bonjour Mucho, ");

  return (
    <section id="venir" aria-labelledby="venir-title" className="relative isolate overflow-hidden bg-abyss py-24 sm:py-32 lg:py-36">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/salle-vue-mer.webp" alt="" fill sizes="100vw" className="object-cover object-[70%_50%] opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/90 to-abyss/60" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="text-ivory lg:col-span-7">
          <Reveal as="p" className="kicker text-copper-light">
            Venir chez Mucho
          </Reveal>
          <Reveal as="h2" id="venir-title" delay={80} className="mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl">
            Sur place <em className="text-sand">ou à emporter.</em>
          </Reveal>
          <Reveal as="p" delay={160} className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ivory/75">
            Mucho ne prend pas de réservation : passez directement, à l&apos;étage de la villa, route de Casablanca,
            face à l&apos;océan. Une question ? Appelez-nous ou écrivez-nous sur WhatsApp.
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <Navigation size={16} aria-hidden="true" />
              Itinéraire
            </a>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </a>
            ) : null}
            <a href={telHref} className="btn btn-ghost-light">
              <Phone size={16} aria-hidden="true" />
              Appeler
            </a>
          </Reveal>

          <Reveal id="emporter" delay={300} className="mt-14 max-w-xl scroll-mt-28 border border-ivory/20 bg-abyss/60 p-7 backdrop-blur-sm sm:p-9">
            <p className="kicker text-copper-light">À emporter</p>
            <h3 className="mt-4 text-3xl text-ivory sm:text-4xl">Commandez, puis passez récupérer.</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ivory/75">
              Appelez-nous ou envoyez votre commande sur WhatsApp, en précisant l&apos;heure à laquelle vous passerez.
            </p>
            <TakeawayButtons tone="light" className="mt-7" />
          </Reveal>
        </div>

        <Reveal delay={120} className="space-y-8 border-t border-ivory/15 pt-10 text-ivory lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-2 lg:pl-10">
          <div>
            <p className="text-[0.7rem] tracking-[0.2em] text-ivory/60 uppercase">Téléphone</p>
            <a href={telHref} className="mt-2 inline-block font-serif text-3xl hover:text-sand">
              {restaurant.phone.value.display}
            </a>
            <p className="mt-2 text-sm text-ivory/70">
              Portable et WhatsApp :{" "}
              <a href={mobileHref} className="link-underline text-ivory">
                {restaurant.mobile.value.display}
              </a>
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] tracking-[0.2em] text-ivory/60 uppercase">Horaires</p>
            {restaurant.hours.value.map((h) => (
              <p key={h.days} className="mt-2 text-ivory/85">
                {h.days} · {hoursLabel(h)}
              </p>
            ))}
            {!restaurant.hours.verified ? (
              <p className="mt-1 text-xs text-ivory/50">Horaires indicatifs, à confirmer par téléphone.</p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
