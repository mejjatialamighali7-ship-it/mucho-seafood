import Image from "next/image";
import Link from "next/link";

/** Ovale officiel Mucho (fichier source : assets-src/logo-mucho.png). */
export function Logo({ size = 56, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Mucho Seafood — accueil" className="inline-flex shrink-0 rounded-full">
      <Image
        src="/images/logo-mucho.webp"
        alt="Mucho Seafood Restaurant"
        width={size}
        height={size}
        priority={priority}
        className="h-auto drop-shadow-[0_6px_18px_rgba(11,22,49,0.25)]"
        style={{ width: size }}
      />
    </Link>
  );
}
