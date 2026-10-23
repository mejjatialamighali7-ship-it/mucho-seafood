/**
 * GALERIE — photos officielles fournies par le restaurant.
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
    src: "/images/friture-mucho.webp",
    alt: "Friture Mucho : filets de poisson dorés, crevettes, calamars, citron et sauce blanche",
    caption: "Friture Mucho",
    width: 765,
    height: 1020,
  },
  {
    src: "/images/linguine-fruits-de-mer.webp",
    alt: "Assiette de pâtes aux crevettes et tomates, la plage d'El Jadida et un palmier en arrière-plan",
    caption: "Pâtes aux fruits de mer, vue sur la plage",
    width: 765,
    height: 1020,
  },
  {
    src: "/images/detail-crevettes.webp",
    alt: "Gros plan sur des crevettes frites dorées",
    caption: "Crevettes, en détail",
    width: 295,
    height: 340,
  },
  {
    src: "/images/detail-fauteuil.webp",
    alt: "Dossier de fauteuil en bois tendu d'un tissu à motif de cubes bleu marine et blanc",
    caption: "Le damier des fauteuils",
    width: 340,
    height: 300,
  },
  {
    src: "/images/fruits-de-mer-riz-vue-mer.webp",
    alt: "Plateau de fruits de mer sur riz blanc avec crevettes, crabe et moules, sauce à part, la plage et l'océan derrière la vitre",
    caption: "Fruits de mer et riz, côté océan",
    width: 1360,
    height: 1020,
  },
];
