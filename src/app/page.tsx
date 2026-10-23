import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/sections/Hero";
import { Universe } from "@/components/sections/Universe";
import { Signatures } from "@/components/sections/Signatures";
import { MenuSection } from "@/components/sections/MenuSection";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Visit } from "@/components/sections/Visit";
import { Contact } from "@/components/sections/Contact";
import { restaurantJsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
      />
      <Header />
      <main id="contenu">
        <Hero />
        <Universe />
        <Signatures />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Visit />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
