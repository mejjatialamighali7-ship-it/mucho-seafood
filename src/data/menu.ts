/**
 * LA CARTE — fichier de données unique
 * ------------------------------------
 * Ajouter un plat : copiez un objet `dish` dans la bonne catégorie.
 * Retirer un plat : supprimez l'objet, ou passez `available` à false.
 * Changer un prix : modifiez `price.amount` puis passez `price.verified` à true.
 *
 * RÈGLE PRIX : un prix ne s'affiche que si `price.verified` vaut true.
 * Les montants ci-dessous viennent de la boutique Glovo (relevé du 23/10/2026).
 * Ce sont des prix de livraison, qui peuvent différer des prix en salle :
 * ils restent donc masqués tant que le restaurant ne les a pas confirmés.
 *
 * RÈGLE PLATS : `listedOn` indique où le plat a été trouvé. Un plat marqué
 * `confirmed: false` (vu seulement dans un annuaire ancien, absent de la carte
 * Glovo) reste masqué tant que le restaurant ne l'a pas confirmé.
 */

export type Price = { amount: number; verified: boolean; source?: string };

export type Dish = {
  id: string;
  name: string;
  description?: string;
  price?: Price;
  /** Chemin d'une photo dans /public, si une vraie photo du plat existe. */
  image?: string;
  imageAlt?: string;
  signature?: boolean;
  available?: boolean;
  /** Sources où le plat apparaît (Glovo, Restaurant Guru...). */
  listedOn: string[];
  /** Plat confirmé par le restaurant (force l'affichage). */
  confirmed?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  dishes: Dish[];
};

const glovo = (amount: number): Price => ({ amount, verified: false, source: "Glovo" });

export const menu: MenuCategory[] = [
  {
    id: "signatures",
    title: "Nos signatures",
    kicker: "À partager",
    dishes: [
      {
        id: "friture-mucho",
        name: "Friture Mucho",
        description: "Sole, merlan, calamars, crevettes, poisson blanc et croquettes de poisson, frits et servis ensemble.",
        price: glovo(145),
        image: "/images/friture-mucho.webp",
        imageAlt: "Grand plat de friture : filets de poisson dorés, crevettes, anneaux de calamar, citron et sauce blanche",
        signature: true,
        listedOn: ["Glovo", "Restaurant Guru"],
      },
      {
        id: "grillade-mucho",
        name: "Grillade Mucho",
        description: "La même sélection de la mer que la Friture Mucho, cette fois passée au grill.",
        price: glovo(145),
        signature: true,
        listedOn: ["Glovo", "Restaurant Guru"],
      },
      {
        id: "paella-fruits-de-mer",
        name: "Paella aux fruits de mer",
        description: "Riz et fruits de mer, portion pour une personne.",
        price: glovo(110),
        signature: true,
        listedOn: ["Glovo", "Restaurant Guru"],
      },
      {
        id: "marmite-fruits-de-mer",
        name: "Marmite de fruits de mer",
        description: "Un assortiment de fruits de mer servi en marmite.",
        price: glovo(145),
        signature: true,
        listedOn: ["Glovo", "Restaurant Guru"],
      },
    ],
  },
  {
    id: "entrees",
    title: "Entrées",
    kicker: "Pour commencer",
    dishes: [
      { id: "salade-pecheur", name: "Salade du pêcheur", description: "Poisson blanc, crevettes, moules, calamars et poulpe, tomate et poivron vert.", price: glovo(85), listedOn: ["Glovo", "Restaurant Guru"] },
      { id: "soupe-poisson", name: "Soupe de poisson", price: glovo(55), listedOn: ["Glovo", "Restaurant Guru"] },
      { id: "gratin-fruits-de-mer", name: "Gratin de fruits de mer", price: glovo(80), listedOn: ["Glovo"] },
      { id: "salade-exotique", name: "Salade exotique", description: "Laitue, mangue, ananas, pomme, concombre, tomate cerise, surimi, raisins secs et noix.", price: glovo(70), listedOn: ["Glovo"] },
      { id: "fusilli-italienne", name: "Fusilli à l'italienne", description: "Jambon, mozzarella, courgette sautée, tomate cerise, basilic et parmesan, vinaigrette balsamique.", price: glovo(65), listedOn: ["Glovo"] },
    ],
  },
  {
    id: "fruits-de-mer",
    title: "Fruits de mer",
    kicker: "Coquillages & crustacés",
    dishes: [
      { id: "crevettes-royales", name: "Crevettes royales", description: "Quatre crevettes royales.", price: glovo(120), listedOn: ["Glovo"] },
      { id: "huitres", name: "Huîtres nature", description: "Les six.", price: glovo(90), listedOn: ["Glovo"] },
      { id: "crevettes-pilpil", name: "Crevettes pil-pil", price: glovo(85), listedOn: ["Glovo", "Restaurant Guru"] },
      { id: "poulpe-pilpil", name: "Poulpe pil-pil", listedOn: ["Restaurant Guru"], confirmed: false },
      { id: "palourdes-marinieres", name: "Palourdes marinières", price: glovo(85), listedOn: ["Glovo", "Restaurant Guru"] },
      { id: "moules-marinieres", name: "Moules marinières", price: glovo(75), listedOn: ["Glovo", "Restaurant Guru"] },
    ],
  },
  {
    id: "fritures",
    title: "Fritures & grillades",
    kicker: "Poissons",
    dishes: [
      { id: "friture-duo", name: "Duo crevettes & calamars", description: "Friture de crevettes et de calamars.", price: glovo(110), listedOn: ["Glovo"] },
      { id: "friture-crevettes", name: "Friture de crevettes", price: glovo(100), listedOn: ["Glovo"] },
      { id: "friture-merlan", name: "Friture de merlan", price: glovo(95), listedOn: ["Glovo"] },
      { id: "friture-soles", name: "Friture de soles", price: glovo(95), listedOn: ["Glovo"] },
    ],
  },
  {
    id: "tajines",
    title: "Tajines",
    kicker: "De la mer au tajine",
    dishes: [
      { id: "tajine-moules", name: "Tajine de moules", description: "Moules à la sauce tomate provençale.", price: glovo(85), listedOn: ["Glovo", "Restaurant Guru"] },
      { id: "tajine-merlan", name: "Tajine de boulettes de merlan", price: glovo(85), listedOn: ["Glovo"] },
      { id: "boulettes-sardines", name: "Boulettes de sardines", description: "En sauce tomate.", price: glovo(55), listedOn: ["Glovo"] },
      { id: "tajine-poisson", name: "Tajine de poisson", listedOn: ["Restaurant Guru"], confirmed: false },
    ],
  },
  {
    id: "pates",
    title: "Pâtes",
    kicker: "Inspiration italienne",
    dishes: [
      {
        id: "linguine-fruits-de-mer",
        name: "Linguine aux fruits de mer",
        price: glovo(110),
        image: "/images/linguine-fruits-de-mer.webp",
        imageAlt: "Assiette de pâtes aux crevettes et tomates confites, la plage et l'océan en arrière-plan",
        listedOn: ["Glovo", "Restaurant Guru"],
      },
      { id: "penne-saumon", name: "Penne au saumon", price: glovo(95), listedOn: ["Glovo"] },
      { id: "spaghetti-vongole", name: "Spaghetti alle vongole", description: "Aux palourdes.", price: glovo(90), listedOn: ["Glovo"] },
      { id: "spaghetti-gamberetti", name: "Spaghetti ai gamberetti", description: "Aux crevettes.", price: glovo(90), listedOn: ["Glovo"] },
      { id: "lasagnes-fruits-de-mer", name: "Lasagnes aux fruits de mer", price: glovo(90), listedOn: ["Glovo"] },
      { id: "lasagnes-bolognaise", name: "Lasagnes bolognaise", price: glovo(75), listedOn: ["Glovo"] },
    ],
  },
  {
    id: "aussi",
    title: "Et aussi",
    kicker: "Côté terre",
    dishes: [
      { id: "burger-mucho", name: "Burger Mucho", description: "Bœuf haché, jambon fumé, cheddar, oignons caramélisés et croustillants, laitue, tomate, frites.", price: glovo(75), listedOn: ["Glovo"] },
    ],
  },
  {
    id: "desserts-boissons",
    title: "Desserts & boissons",
    kicker: "Pour finir",
    dishes: [
      { id: "poelon-cookies", name: "Poêlon de cookies", description: "Servi avec une boule de glace vanille.", price: glovo(65), listedOn: ["Glovo"] },
      { id: "brownie", name: "Brownie", description: "Et sa boule de glace.", price: glovo(55), listedOn: ["Glovo"] },
      { id: "jus-frais", name: "Jus pressés à la minute", description: "Orange, citron, orange-mangue, ananas.", listedOn: ["Glovo"] },
    ],
  },
];

/** Un plat est publiable s'il est confirmé ou répertorié sur au moins une carte en ligne. */
export const isPublishable = (d: Dish) =>
  d.available !== false && (d.confirmed === true || (d.confirmed !== false && d.listedOn.length > 0));

export const publishedMenu: MenuCategory[] = menu
  .map((c) => ({ ...c, dishes: c.dishes.filter(isPublishable) }))
  .filter((c) => c.dishes.length > 0);

export const formatPrice = (p?: Price) =>
  p && p.verified ? `${p.amount.toLocaleString("fr-MA")} MAD` : null;

/** Lien vers une carte officielle complète (PDF, page...). Laisser null si aucune. */
export const officialMenuUrl: string | null = null;
