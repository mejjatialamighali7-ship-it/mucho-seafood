import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { restaurant } from "@/config/restaurant";
import { legal } from "@/config/legal";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: `Conditions d'utilisation du site ${restaurant.brandName} : accès, informations de la carte, commandes à emporter, Glovo, propriété intellectuelle.`,
  alternates: { canonical: "/cgu" },
};

export default function Cgu() {
  return (
    <PageShell kicker="Informations" title="Conditions générales d'utilisation">
      <div className="mx-auto max-w-3xl px-5 py-20 text-[1.02rem] leading-relaxed text-ink/85 sm:px-8 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-abyss [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions encadrent l&apos;utilisation du site du restaurant {restaurant.brandName} à El
          Jadida. En naviguant sur le site, vous les acceptez. Elles complètent les{" "}
          <Link href="/mentions-legales" className="link-underline">mentions légales</Link> et la{" "}
          <Link href="/confidentialite" className="link-underline">politique de confidentialité</Link>.
        </p>

        <h2>2. Accès au site</h2>
        <p>
          Le site est gratuit et accessible à tous. Nous faisons le nécessaire pour qu&apos;il reste disponible, mais
          il peut être interrompu pour maintenance ou en cas de problème technique, sans que cela ouvre droit à une
          indemnité.
        </p>

        <h2>3. Informations de la carte</h2>
        <p>
          La carte, les prix, les photos, les horaires et les services sont présentés à titre informatif. Ils peuvent
          évoluer. Les prix sont indiqués en dirhams (Dh). En cas de différence,
          les informations données par le restaurant au moment de votre commande font foi. Les photos des plats sont
          des suggestions de présentation.
        </p>

        <h2>4. Commandes à emporter</h2>
        <p>
          Le site ne permet pas de commander ni de payer en ligne. Les commandes à emporter se passent par téléphone ou
          WhatsApp au {restaurant.phone.value.display}. Une commande n&apos;est ferme qu&apos;une fois confirmée par le
          restaurant, qui vous indique alors le montant et l&apos;heure de retrait. Le restaurant ne prend pas de
          réservation.
        </p>

        <h2>5. Commandes via {restaurant.delivery.provider}</h2>
        <p>
          Les commandes passées sur {restaurant.delivery.provider} sont régies par les conditions de{" "}
          {restaurant.delivery.provider}, qui gère la commande, le paiement et l&apos;acheminement.
        </p>

        <h2>6. Allergies</h2>
        <p>
          Nos plats peuvent contenir des allergènes, notamment poissons, crustacés, mollusques, gluten, lait et œufs.
          Signalez toute allergie au restaurant avant de commander.
        </p>

        <h2>7. Propriété intellectuelle</h2>
        <p>
          Le nom {restaurant.brandName}, le logo, les photographies et les textes du site appartiennent au restaurant.
          Toute reproduction, même partielle, nécessite son accord préalable.
        </p>

        <h2>8. Liens vers d&apos;autres sites</h2>
        <p>
          Le site renvoie vers Google Maps, WhatsApp, {restaurant.delivery.provider}, Instagram et Facebook. Ces
          services sont indépendants du restaurant et appliquent leurs propres conditions.
        </p>

        <h2>9. Responsabilité</h2>
        <p>
          Le restaurant ne peut être tenu responsable d&apos;un dommage lié à l&apos;utilisation du site, à une
          interruption de service ou au contenu des sites tiers vers lesquels il renvoie.
        </p>

        <h2>10. Droit applicable</h2>
        <p>
          Les présentes conditions sont soumises au droit marocain. En cas de désaccord, une solution amiable sera
          recherchée avant toute action devant les juridictions marocaines compétentes.
        </p>

        <p className="text-sm text-muted">Dernière mise à jour : {legal.lastUpdated}</p>
      </div>
    </PageShell>
  );
}
