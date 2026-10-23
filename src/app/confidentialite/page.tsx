import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { restaurant } from "@/config/restaurant";
import { legal } from "@/config/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <PageShell kicker="Informations" title="Confidentialité">
      <div className="mx-auto max-w-3xl px-5 py-20 text-[1.02rem] leading-relaxed text-ink/85 sm:px-8 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-abyss [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        <p>
          {restaurant.brandName} attache de l&apos;importance à la protection de vos données personnelles,
          conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l&apos;égard du
          traitement des données à caractère personnel.
        </p>
        <h2>Données collectées</h2>
        <p>Le site ne collecte des données que lorsque vous remplissez le formulaire de réservation :</p>
        <ul>
          <li>nom, numéro de téléphone ;</li>
          <li>date, heure et nombre de personnes souhaités ;</li>
          <li>votre éventuelle demande particulière.</li>
        </ul>
        <h2>Utilisation</h2>
        <p>
          Ces informations servent uniquement à traiter votre demande de réservation et à vous recontacter pour la
          confirmer. Elles ne sont ni vendues ni utilisées à des fins publicitaires.
        </p>
        <h2>Transmission</h2>
        <p>
          Selon la configuration du site, votre demande est transmise au restaurant par message (WhatsApp ou SMS, depuis
          votre propre téléphone) ou par un service d&apos;automatisation sécurisé. Elle est conservée le temps
          nécessaire au traitement de la réservation.
        </p>
        <h2>Cookies et services tiers</h2>
        <p>
          Le site n&apos;utilise pas de cookies publicitaires ni de mesure d&apos;audience. Le plan Google Maps
          n&apos;est chargé que si vous cliquez sur « Afficher le plan » ; Google peut alors déposer ses propres cookies.
        </p>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en contactant le
          restaurant au {restaurant.phone.value.display}
          {legal.contactEmail ? ` ou à ${legal.contactEmail}` : ""}.
        </p>
        <p className="text-sm text-muted">Dernière mise à jour : {legal.lastUpdated}</p>
      </div>
    </PageShell>
  );
}
