import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { restaurant } from "@/config/restaurant";
import { legal } from "@/config/legal";
import { gaId } from "@/config/analytics";
import { fullAddress } from "@/lib/links";

export const metadata: Metadata = {
  title: "Confidentialité et RGPD",
  description: `Données personnelles, cookies et droits des visiteurs du site ${restaurant.brandName} (RGPD et loi marocaine 09-08).`,
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  const editor = legal.companyName
    ? `${legal.companyName}${legal.legalForm ? ` ${legal.legalForm}` : ""} (${restaurant.brandName})`
    : restaurant.brandName;
  return (
    <PageShell kicker="Informations" title="Confidentialité & RGPD">
      <div className="mx-auto max-w-3xl px-5 py-20 text-[1.02rem] leading-relaxed text-ink/85 sm:px-8 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-abyss [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_table]:mt-4 [&_td]:border-t [&_td]:border-ink/10 [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_th]:pb-2 [&_th]:pr-4 [&_th]:text-left [&_th]:text-sm [&_th]:font-medium [&_th]:text-muted">
        <p>
          Cette page explique quelles données le site {restaurant.brandName} traite, pourquoi, et comment exercer vos
          droits. Elle applique la loi marocaine n° 09-08 relative à la protection des personnes physiques à
          l&apos;égard du traitement des données à caractère personnel et, pour les visiteurs de l&apos;Union
          européenne, le Règlement général sur la protection des données (RGPD, règlement UE 2016/679).
        </p>

        <h2>Responsable du traitement</h2>
        <p>
          {editor}, {fullAddress}. Téléphone et WhatsApp : {restaurant.phone.value.display}
          {legal.contactEmail ? (
            <>
              , e-mail :{" "}
              <a href={`mailto:${legal.contactEmail}`} className="link-underline text-abyss">
                {legal.contactEmail}
              </a>
            </>
          ) : null}
          .
        </p>

        <h2>Ce que le site collecte</h2>
        <ul>
          <li>
            <strong>Aucun formulaire, aucun compte, aucun paiement en ligne.</strong> Le site ne vous demande ni nom, ni
            e-mail, ni numéro.
          </li>
          <li>
            <strong>Commandes à emporter et questions.</strong> Si vous nous écrivez sur WhatsApp ou nous appelez, nous
            utilisons votre numéro et votre message uniquement pour vous répondre et préparer votre commande. Ils ne
            sont ni vendus, ni utilisés pour de la publicité. WhatsApp est un service de Meta, soumis à ses propres
            règles.
          </li>
          {gaId ? (
            <li>
              <strong>Mesure d&apos;audience, seulement si vous l&apos;acceptez.</strong> Google Analytics compte les
              visites et les pages vues, de façon statistique. Base légale : votre consentement, que vous pouvez retirer
              à tout moment.
            </li>
          ) : (
            <li>
              <strong>Aucune mesure d&apos;audience</strong> ni aucun outil publicitaire n&apos;est installé.
            </li>
          )}
          <li>
            <strong>Journaux techniques.</strong> Comme tout site, l&apos;hébergeur enregistre brièvement l&apos;adresse
            IP et la page demandée, pour la sécurité et le bon fonctionnement du service (intérêt légitime).
          </li>
        </ul>

        <h2 id="cookies">Cookies</h2>
        <table className="w-full text-[0.95rem]">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Rôle</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>mucho-consent</td>
              <td>Retient votre choix sur les cookies (stocké dans votre navigateur, jamais envoyé).</td>
              <td>6 mois</td>
            </tr>
            {gaId ? (
              <tr>
                <td>_ga, _ga_*</td>
                <td>Google Analytics : distinguer les visiteurs, de façon statistique. Déposés seulement après « Accepter ».</td>
                <td>13 mois au plus</td>
              </tr>
            ) : null}
            <tr>
              <td>Google Maps</td>
              <td>Le plan n&apos;est chargé que si vous cliquez sur « Afficher le plan ». Google peut alors déposer ses propres cookies.</td>
              <td>Fixée par Google</td>
            </tr>
          </tbody>
        </table>
        {gaId ? (
          <p>
            Vous pouvez modifier votre choix à tout moment avec le lien « Gérer les cookies » en bas de chaque page.
          </p>
        ) : null}

        <h2>Destinataires et hébergement</h2>
        <p>
          Les données ne sont accessibles qu&apos;au restaurant et à ses prestataires techniques : l&apos;hébergeur
          ({legal.host ?? "à compléter"})
          {gaId ? ", Google (mesure d'audience, si vous l'acceptez)" : ""}. Lorsque vous suivez un lien vers Glovo,
          Instagram, Facebook, WhatsApp ou Google Maps, ces services appliquent leur propre politique de confidentialité.
          Certains de ces prestataires peuvent traiter des données hors du Maroc et de l&apos;Union européenne ; ils
          s&apos;engagent alors à les protéger selon leurs garanties contractuelles.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Les échanges WhatsApp et téléphoniques sont conservés le temps de traiter votre demande. Les statistiques de
          visite et les cookies suivent les durées indiquées dans le tableau ci-dessus.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès à vos données, leur rectification, leur effacement, vous opposer à leur
          traitement ou en demander la limitation, et retirer votre consentement à tout moment. Contactez le restaurant
          au {restaurant.phone.value.display}
          {legal.contactEmail ? (
            <>
              {" "}ou à{" "}
              <a href={`mailto:${legal.contactEmail}`} className="link-underline text-abyss">
                {legal.contactEmail}
              </a>
            </>
          ) : null}
          . Si vous estimez que vos droits ne sont pas
          respectés, vous pouvez saisir la CNDP (Commission nationale de contrôle de la protection des données à
          caractère personnel, Maroc) ou, si vous résidez dans l&apos;Union européenne, l&apos;autorité de protection
          des données de votre pays (en France : la CNIL).
        </p>

        <h2>Sécurité</h2>
        <p>
          Le site est servi uniquement en HTTPS (connexion chiffrée), ne contient aucune clé secrète dans les pages et
          n&apos;a pas de base de données.
        </p>

        <p className="text-sm text-muted">
          Voir aussi les <Link href="/mentions-legales" className="link-underline">mentions légales</Link> et les{" "}
          <Link href="/cgu" className="link-underline">conditions générales d&apos;utilisation</Link>. Dernière mise à
          jour : {legal.lastUpdated}
        </p>
      </div>
    </PageShell>
  );
}
