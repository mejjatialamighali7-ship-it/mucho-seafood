import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { restaurant } from "@/config/restaurant";
import { legal } from "@/config/legal";
import { fullAddress } from "@/lib/links";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

const v = (x: string | null) => x ?? "À compléter";

export default function MentionsLegales() {
  return (
    <PageShell kicker="Informations" title="Mentions légales">
      <div className="mx-auto max-w-3xl px-5 py-20 text-[1.02rem] leading-relaxed text-ink/85 sm:px-8 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-abyss [&_p]:mt-4">
        <h2>Éditeur du site</h2>
        <p>
          {restaurant.brandName} — {v(legal.companyName)} ({v(legal.legalForm)})
          <br />
          {fullAddress}
          <br />
          Téléphone : {restaurant.phone.value.display}
          <br />
          RC : {v(legal.rc)} · ICE : {v(legal.ice)} · IF : {v(legal.ifNumber)}
          <br />
          Responsable de la publication : {v(legal.manager)}
        </p>
        <h2>Hébergement</h2>
        <p>{v(legal.host)}</p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le logo, les photographies et les textes de ce site sont la propriété de {restaurant.brandName}. Toute
          reproduction sans autorisation préalable est interdite.
        </p>
        <h2>Informations pratiques</h2>
        <p>
          Les informations de la carte, les horaires et les services sont donnés à titre indicatif et peuvent évoluer.
        </p>
        <h2>Liens externes</h2>
        <p>
          Le site renvoie vers des services tiers (Glovo pour les commandes en ligne, Google Maps pour l&apos;itinéraire,
          WhatsApp pour nous écrire), soumis à leurs propres conditions.
        </p>
        <p className="text-sm text-muted">Dernière mise à jour : {legal.lastUpdated}</p>
      </div>
    </PageShell>
  );
}
