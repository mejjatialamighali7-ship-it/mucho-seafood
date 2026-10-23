import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell kicker="Erreur 404" title="Cette page a pris le large.">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-20 sm:flex-row sm:px-8">
        <Link href="/" className="btn btn-brand">
          Retour à l&apos;accueil
        </Link>
        <Link href="/carte" className="link-underline self-center text-sm font-medium text-mucho sm:ml-4">
          Voir la carte
        </Link>
      </div>
    </PageShell>
  );
}
