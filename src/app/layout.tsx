import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { restaurant } from "@/config/restaurant";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { CookieConsent } from "@/components/layout/CookieConsent";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const title = "Mucho Seafood — Restaurant de poissons et fruits de mer à El Jadida";
const description =
  "Mucho Seafood, restaurant de poissons et fruits de mer face à l'océan, route de Casablanca à El Jadida : fritures, grillades, seafood boil, tajines de la mer. Sur place, à emporter ou sur Glovo.";

export const metadata: Metadata = {
  metadataBase: new URL(restaurant.siteUrl),
  title: { default: title, template: "%s · Mucho Seafood El Jadida" },
  description,
  applicationName: restaurant.brandName,
  keywords: [
    "restaurant fruits de mer El Jadida",
    "restaurant poisson El Jadida",
    "Mucho Seafood El Jadida",
    "restaurant route de Casablanca El Jadida",
    "restaurant de poissons Maroc",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: restaurant.brandName,
    title,
    description,
    url: "/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Plateau de fruits de mer face à l'océan, chez Mucho à El Jadida" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1631",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les animations de révélation uniquement si JavaScript est disponible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only z-[100] bg-abyss px-5 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        {children}
        <WhatsAppBubble />
        <RevealObserver />
        <CookieConsent />
      </body>
    </html>
  );
}
