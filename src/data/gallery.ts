/**
 * GALERIE — photos officielles fournies par le restaurant.
 * Sources : photos fournies par le restaurant (dont six publications Instagram
 * @muchoseafoodrestaurant, recadrées).
 * Pour ajouter une photo : déposez la source dans assets-src/, ajoutez-la
 * dans scripts/optimize-images.mjs, lancez `npm run images`, puis ajoutez
 * une entrée ici. Les six premières photos occupent la mosaïque éditoriale
 * (dans cet ordre : grande horizontale, verticale, verticale, détail, détail,
 * grande horizontale) ; les suivantes s'ajoutent en grille en dessous.
 */
export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/salle-vue-mer.webp",
    alt: "La salle de Mucho : tables nappées de blanc, fauteuils en bois au dossier damier bleu et blanc, grande baie vitrée ouverte sur l'océan et les palmiers",
    caption: "La salle, face à l'océan",
    width: 1360,
    height: 765,
  },
  {
    src: "/images/ig-linguine-fruits-de-mer.webp",
    alt: "Linguine aux crevettes entières, palourdes, moules et tomates confites dans une assiette bleue",
    caption: "Linguine aux fruits de mer",
    width: 1000,
    height: 1771,
  },
  {
    src: "/images/ig-palourdes.webp",
    alt: "Palourdes ouvertes dans leur jus à l'ail et au persil, quartier de citron",
    caption: "Palourdes marinières",
    width: 1000,
    height: 1771,
  },
  {
    src: "/images/detail-fauteuil.webp",
    alt: "Dossier de fauteuil en bois tendu d'un tissu à motif de cubes bleu marine et blanc",
    caption: "Le damier des fauteuils",
    width: 340,
    height: 300,
  },
  {
    src: "/images/ig-poisson-grille.webp",
    alt: "Poisson entier grillé aux herbes, légumes sautés et purée dans une cassolette en terre",
    caption: "Poisson grillé, légumes et purée",
    width: 1000,
    height: 1045,
  },
  {
    src: "/images/fruits-de-mer-riz-vue-mer.webp",
    alt: "Seafood Boil de Mucho : crevettes, crabe et moules sur riz, sauce Old Bay à part, la plage et l'océan derrière la vitre",
    caption: "Seafood Boil, notre plat phare",
    width: 1360,
    height: 1020,
  },
  {
    src: "/images/ig-friture-assortiment.webp",
    alt: "Grande assiette de friture : poisson entier, filets, calamars, crevettes, croquette et sauce blanche, salade en arrière-plan",
    caption: "Friture de la mer",
    width: 1000,
    height: 1771,
  },
  {
    src: "/images/friture-mucho.webp",
    alt: "Friture Mucho : filets de poisson dorés, crevettes, calamars, citron et sauce blanche",
    caption: "Friture Mucho",
    width: 765,
    height: 1020,
  },
  {
    src: "/images/ig-friture-aneth.webp",
    alt: "Friture de poissons et crevettes garnie d'aneth, citron vert et sauce blanche",
    caption: "Friture à l'aneth",
    width: 1000,
    height: 1771,
  },
  {
    src: "/images/ig-poisson-puree-legumes.webp",
    alt: "Filet de poisson grillé, purée onctueuse et légumes croquants dans une assiette bleue",
    caption: "Poisson, purée et légumes",
    width: 1000,
    height: 1025,
  },
  {
    src: "/images/linguine-fruits-de-mer.webp",
    alt: "Assiette de pâtes aux crevettes et tomates, la plage d'El Jadida et un palmier en arrière-plan",
    caption: "Pâtes aux fruits de mer, vue sur la plage",
    width: 765,
    height: 1020,
  },
  {
    src: "/images/plateau-poisson-grille.webp",
    alt: "Grand plateau de poisson entier grillé aux herbes, garni de crevettes, moules et tomates cerises, avec légumes sautés, citron et deux poêlons de purée",
    caption: "Poisson grillé et fruits de mer",
    width: 1000,
    height: 1758,
  },
];
