import Image from "next/image";
import { Phone } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { telHref, mobileHref, hoursLabel } from "@/lib/links";
import { Reveal } from "@/components/ui/Reveal";
import { ReservationForm } from "./ReservationForm";

export function Reservation() {
  const webhookEnabled = Boolean(process.env.RESERVATION_WEBHOOK_URL);

  return (
    <section id="reserver" aria-labelledby="reserver-title" className="relative isolate overflow-hidden bg-abyss py-24 sm:py-32 lg:py-36">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/salle-vue-mer.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_50%] opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/90 to-abyss/60" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="text-ivory lg:col-span-5 lg:pt-6">
          <Reveal as="p" className="kicker text-copper-light">
            Réservation
          </Reveal>
          <Reveal as="h2" id="reserver-title" delay={80} className="mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl">
            Réservez <em className="text-sand">votre table.</em>
          </Reveal>
          <Reveal as="p" delay={160} className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ivory/75">
            Indiquez la date, l&apos;heure et le nombre de convives : votre demande part directement au restaurant,
            qui vous recontacte pour la confirmer.
          </Reveal>
          <Reveal delay={240} className="mt-12 space-y-6 border-t border-ivory/15 pt-10">
            <div>
              <p className="text-[0.7rem] tracking-[0.2em] text-ivory/60 uppercase">Par téléphone</p>
              <a href={telHref} className="mt-2 inline-flex items-center gap-3 font-serif text-3xl text-ivory hover:text-sand">
                <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
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

        <Reveal delay={120} className="bg-ivory p-7 shadow-[0_40px_100px_rgba(0,0,0,0.35)] sm:p-12 lg:col-span-6 lg:col-start-7">
          <ReservationForm webhookEnabled={webhookEnabled} />
        </Reveal>
      </div>
    </section>
  );
}
