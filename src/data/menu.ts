/**
 * LA CARTE — fichier de données unique
 * ------------------------------------
 * Ajouter un plat : copiez un objet dans la bonne catégorie.
 * Retirer un plat : supprimez l'objet, ou passez `available` à false.
 * Changer un prix : modifiez `price` (ex. `dh(60)`).
 *
 * SOURCES DES PRIX
 *   dh(…)    → prix de la carte imprimée du restaurant (page « Pizza / Desserts /
 *              Boissons », photo fournie le 23/10/2026) : affichés.
 *   glovo(…) → prix relevés sur Glovo (prix de livraison) : JAMAIS affichés.
 *              Remplacez-les par dh(…) une fois le prix en salle confirmé.
 *
 * Les autres pages de la carte imprimée (entrées, poissons, fruits de mer,
 * seafood boil, tajines, pâtes, viandes) n'étaient lisibles que de biais sur
 * la photo : les plats sont repris, leurs prix restent à confirmer.
 *
 * `group` regroupe des plats sous un intertitre dans une même catégorie.
 * `confirmed: false` masque un plat dont l'existence n'est pas confirmée.
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
  /** Intertitre facultatif (ex. « Jus frais ») à l'intérieur d'une catégorie. */
  group?: string;
  /** Sources où le plat apparaît (carte imprimée, Glovo, Restaurant Guru...). */
  listedOn: string[];
  /** false = plat non confirmé, masqué. */
  confirmed?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  /** Mention affichée sous la catégorie (texte de la carte imprimée). */
  note?: string;
  dishes: Dish[];
};

const CARTE = "Carte imprimée";
const dh = (amount: number): Price => ({ amount, verified: true, source: CARTE });
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
        listedOn: [CARTE, "Glovo"],
      },
      {
        id: "seafood-boil",
        name: "Seafood Boil",
        description: "Gambas, palourdes, moules, poulpe, œuf, maïs, riz basmati, pommes de terre et sauce Old Bay. Classique, au crabe, à la langouste, aux crevettes royales ou au homard.",
        signature: true,
        listedOn: [CARTE],
      },
      {
        id: "grillade-mucho",
        name: "Grillade Mucho",
        description: "La sélection de la mer de la Friture Mucho, cette fois passée au grill.",
        price: glovo(145),
        signature: true,
        listedOn: ["Glovo"],
      },
      {
        id: "marmite-fruits-de-mer",
        name: "Marmite de fruits de mer",
        description: "Un assortiment de fruits de mer servi en marmite.",
        price: glovo(145),
        signature: true,
        listedOn: [CARTE, "Glovo"],
      },
    ],
  },
  {
    id: "entrees",
    title: "Entrées",
    kicker: "Pour commencer",
    dishes: [
      { id: "salade-potager", name: "Salade du potager", group: "Froides", listedOn: [CARTE] },
      { id: "fusilli-italienne", name: "Fusilli à l'italienne", description: "Jambon, mozzarella, courgette sautée, tomate cerise, basilic et parmesan, vinaigrette balsamique.", price: glovo(65), group: "Froides", listedOn: [CARTE, "Glovo"] },
      { id: "anchois-marines", name: "Anchois marinés", group: "Froides", listedOn: [CARTE] },
      { id: "salade-exotique", name: "Salade exotique", description: "Laitue, mangue, ananas, pomme, concombre, tomate cerise, surimi, raisins secs et noix.", price: glovo(70), group: "Froides", listedOn: [CARTE, "Glovo"] },
      { id: "salade-poulpe", name: "Salade de poulpe", group: "Froides", listedOn: [CARTE] },
      { id: "salade-pecheur", name: "Salade du pêcheur", description: "Poisson blanc, crevettes, moules, calamars et poulpe, tomate et poivron vert.", price: glovo(85), group: "Froides", listedOn: [CARTE, "Glovo"] },
      { id: "crevettes-avocat", name: "Crevettes avocat", group: "Froides", listedOn: [CARTE] },
      { id: "crabe-avocat", name: "Crabe avocat", group: "Froides", listedOn: [CARTE] },
      { id: "soupe-poisson", name: "Soupe de poisson", price: glovo(55), group: "Chaudes", listedOn: [CARTE, "Glovo"] },
      { id: "gratin-fruits-de-mer", name: "Gratin de fruits de mer", price: glovo(80), group: "Chaudes", listedOn: ["Glovo"] },
      { id: "sardines-grillees", name: "Sardines grillées", group: "Chaudes", listedOn: [CARTE] },
    ],
  },
  {
    id: "fruits-de-mer",
    title: "Fruits de mer",
    kicker: "Coquillages & crustacés",
    dishes: [
      {
        id: "palourdes-marinieres",
        name: "Palourdes marinières",
        price: glovo(85),
        image: "/images/ig-palourdes.webp",
        imageAlt: "Palourdes ouvertes dans leur jus à l'ail et au persil, quartier de citron",
        listedOn: [CARTE, "Glovo"],
      },
      { id: "huitres-3", name: "Huîtres nature", description: "Les trois.", listedOn: [CARTE] },
      { id: "huitres-6", name: "Huîtres nature", description: "Les six.", price: glovo(90), listedOn: [CARTE, "Glovo"] },
      { id: "huitres-gratinees", name: "Huîtres gratinées", description: "Les six.", listedOn: [CARTE] },
      { id: "moules-marinieres", name: "Moules marinières", price: glovo(75), listedOn: [CARTE, "Glovo"] },
      { id: "gambas-pilpil", name: "Gambas pil-pil", listedOn: [CARTE] },
      { id: "crevettes-pilpil", name: "Crevettes pil-pil", price: glovo(85), listedOn: [CARTE, "Glovo"] },
      { id: "poulpe-pilpil", name: "Poulpe pil-pil", listedOn: [CARTE] },
      { id: "crevettes-royales", name: "Crevettes royales épicées", price: glovo(120), listedOn: [CARTE, "Glovo"] },
    ],
  },
  {
    id: "seafood-boil",
    title: "Seafood Boil",
    kicker: "Le grand partage",
    note: "Gambas, palourdes, moules, poulpe, œuf, maïs, riz basmati, pommes de terre, sauce Old Bay. En demi-portion ou en portion entière.",
    dishes: [
      { id: "boil-classique", name: "Classique", listedOn: [CARTE] },
      { id: "boil-crabe", name: "Crabe", listedOn: [CARTE] },
      { id: "boil-langouste", name: "Langouste", listedOn: [CARTE] },
      { id: "boil-crevettes-royales", name: "Crevettes royales", listedOn: [CARTE] },
      { id: "boil-homard", name: "Homard", listedOn: [CARTE] },
    ],
  },
  {
    id: "poissons",
    title: "Poissons",
    kicker: "Fritures & grillades",
    note: "Poissons et fruits de mer selon arrivage. Garnitures selon l'humeur du chef.",
    dishes: [
      { id: "friture-anchois", name: "Friture d'anchois", group: "Fritures", listedOn: [CARTE] },
      { id: "friture-merlan", name: "Friture de merlan", price: glovo(95), group: "Fritures", listedOn: [CARTE, "Glovo"] },
      { id: "friture-soles", name: "Friture de soles", price: glovo(95), group: "Fritures", listedOn: [CARTE, "Glovo"] },
      { id: "friture-crevettes", name: "Friture de crevettes", price: glovo(100), group: "Fritures", listedOn: [CARTE, "Glovo"] },
      { id: "friture-calamars", name: "Friture de calamars", group: "Fritures", listedOn: [CARTE] },
      { id: "friture-duo", name: "Duo crevettes & calamars", price: glovo(110), group: "Fritures", listedOn: [CARTE, "Glovo"] },
      { id: "friture-mixte", name: "Friture mixte", group: "Fritures", listedOn: [CARTE] },
      { id: "paella-fruits-de-mer", name: "Paella aux fruits de mer", description: "Riz et fruits de mer, portion pour une personne.", price: glovo(110), group: "Spécialités", listedOn: ["Glovo", "Restaurant Guru"] },
      { id: "filet-saint-pierre", name: "Filet de saint-pierre", group: "Spécialités", listedOn: [CARTE] },
      { id: "espadon-poele", name: "Espadon poêlé aux herbes", group: "Spécialités", listedOn: [CARTE] },
      { id: "steak-thon", name: "Steak de thon poêlé", group: "Spécialités", listedOn: [CARTE] },
      { id: "brochettes-espadon", name: "Brochettes d'espadon", group: "Spécialités", listedOn: [CARTE] },
      { id: "pave-saumon", name: "Pavé de saumon grillé", group: "Spécialités", listedOn: [CARTE] },
      { id: "trio-filets", name: "Trio de filets de poissons", group: "Spécialités", listedOn: [CARTE] },
      { id: "brochettes-lotte", name: "Brochettes de lotte", group: "Spécialités", listedOn: [CARTE] },
    ],
  },
  {
    id: "tajines",
    title: "Tajines",
    kicker: "De la mer au tajine",
    dishes: [
      { id: "tajine-merlan", name: "Tajine de boulettes de merlan", price: glovo(85), listedOn: [CARTE, "Glovo"] },
      { id: "boulettes-sardines", name: "Boulettes de sardines", description: "En sauce tomate.", price: glovo(55), listedOn: [CARTE, "Glovo"] },
      { id: "tajine-moules", name: "Tajine de moules", description: "Sauce tomate provençale.", price: glovo(85), listedOn: [CARTE, "Glovo"] },
      { id: "tajine-requin", name: "Tajine de requin", listedOn: [CARTE] },
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
        description: "Crevettes, palourdes, moules et tomates confites.",
        price: glovo(110),
        image: "/images/ig-linguine-fruits-de-mer.webp",
        imageAlt: "Linguine aux crevettes entières, palourdes, moules et tomates confites dans une assiette bleue",
        listedOn: [CARTE, "Glovo"],
      },
      { id: "spaghetti-vongole", name: "Spaghetti alle vongole", description: "Aux palourdes.", price: glovo(90), listedOn: [CARTE, "Glovo"] },
      { id: "spaghetti-gamberetti", name: "Spaghetti ai gamberetti", description: "Aux crevettes.", price: glovo(90), listedOn: [CARTE, "Glovo"] },
      { id: "penne-saumon", name: "Penne au saumon", price: glovo(95), listedOn: [CARTE, "Glovo"] },
      { id: "lasagnes-fruits-de-mer", name: "Lasagnes aux fruits de mer", price: glovo(90), listedOn: [CARTE, "Glovo"] },
      { id: "lasagnes-bolognaise", name: "Lasagnes à la bolognaise", price: glovo(75), listedOn: [CARTE, "Glovo"] },
      { id: "bolognaise", name: "Bolognaise", price: glovo(65), listedOn: [CARTE, "Glovo"] },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    kicker: "Au four",
    dishes: [
      { id: "pizza-margarita", name: "Margarita", description: "Mozzarella, origan, olives noires et parmesan.", price: dh(60), listedOn: [CARTE] },
      { id: "pizza-vegan", name: "Vegan", description: "Courgette, aubergine, tomate cerise, champignon, poivron, basilic et parmesan.", price: dh(65), listedOn: [CARTE] },
      { id: "pizza-viande-hachee", name: "Viande hachée", description: "Viande hachée, mozzarella, olives noires et origan.", price: dh(70), listedOn: [CARTE] },
      { id: "pizza-thon", name: "Thon", description: "Thon, oignons et olives noires.", price: dh(70), listedOn: [CARTE] },
      { id: "pizza-pepperoni", name: "Pepperoni", description: "Champignon, pepperoni.", price: dh(75), listedOn: [CARTE] },
      { id: "pizza-fruits-de-mer", name: "Fruits de mer", description: "Calamar, crevette, moules, poulpe, champignon, origan et olives noires.", price: dh(85), listedOn: [CARTE] },
    ],
  },
  {
    id: "viandes",
    title: "Viandes & burgers",
    kicker: "Côté terre",
    dishes: [
      { id: "emince-poulet", name: "Émincé de poulet sauce champignons", listedOn: [CARTE] },
      { id: "emince-boeuf", name: "Émincé de filet de bœuf sauce champignons", listedOn: [CARTE] },
      { id: "burger-mucho", name: "Burger Mucho", description: "Bœuf haché, jambon fumé, cheddar, oignons caramélisés et croustillants, laitue, tomate, frites.", price: glovo(75), listedOn: [CARTE, "Glovo"] },
      { id: "filet-o-fish", name: "Filet-o-fish", listedOn: [CARTE] },
      { id: "portion-frites", name: "Portion de frites", price: dh(15), listedOn: [CARTE] },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    kicker: "Pour finir",
    dishes: [
      { id: "glace", name: "Boule de glace", description: "Parfum au choix : vanille, chocolat, nougat, mangue.", price: dh(14), listedOn: [CARTE] },
      { id: "mousse-chocolat", name: "Mousse au chocolat", price: dh(35), listedOn: [CARTE] },
      { id: "creme-caramel", name: "Crème caramel", price: dh(35), listedOn: [CARTE] },
      { id: "brownie", name: "Brownie", description: "Avec sa boule de glace.", price: dh(40), listedOn: [CARTE, "Glovo"] },
      { id: "tarte-citron", name: "Tarte au citron en verrine", price: dh(48), listedOn: [CARTE] },
      { id: "cheesecakes", name: "Cheesecakes", price: dh(48), listedOn: [CARTE] },
      { id: "poelon-cookies", name: "Poêlon de cookies", description: "Avec sa boule de glace vanille.", price: dh(55), listedOn: [CARTE, "Glovo"] },
      { id: "fondant-chocolat", name: "Fondant au chocolat", description: "Avec sa boule de glace vanille.", price: dh(55), listedOn: [CARTE] },
    ],
  },
  {
    id: "boissons",
    title: "Boissons",
    kicker: "Jus, cocktails & boissons chaudes",
    dishes: [
      { id: "orange-nature", name: "Orange nature", price: dh(22), group: "Jus frais", listedOn: [CARTE] },
      { id: "jus-citron", name: "Jus de citron", price: dh(22), group: "Jus frais", listedOn: [CARTE] },
      { id: "orange-carotte", name: "Orange, carotte à la fleur d'oranger", price: dh(24), group: "Jus frais", listedOn: [CARTE] },
      { id: "orange-mangue", name: "Orange mangue", price: dh(26), group: "Jus frais", listedOn: [CARTE] },
      { id: "jus-ananas", name: "Jus d'ananas", price: dh(32), group: "Jus frais", listedOn: [CARTE] },
      { id: "detox-foie", name: "La Détox du foie", description: "Betterave, carotte, persil, orange, gingembre.", price: dh(34), group: "Jus frais", listedOn: [CARTE] },
      { id: "panache-fruits", name: "Panaché de fruits", price: dh(36), group: "Jus frais", listedOn: [CARTE] },
      { id: "mojito-classique", name: "Mojito classique", price: dh(30), group: "Cocktails", listedOn: [CARTE] },
      { id: "mojito-passion", name: "Mojito fruit de la passion", price: dh(36), group: "Cocktails", listedOn: [CARTE] },
      { id: "mojito-fruit-rouge", name: "Mojito fruit rouge", price: dh(36), group: "Cocktails", listedOn: [CARTE] },
      { id: "citronnade", name: "Notre citronnade", description: "Citron, purée de fruit de la passion, basilic.", price: dh(36), group: "Cocktails", listedOn: [CARTE] },
      { id: "cocktail-mucho", name: "Cocktail Mucho", description: "Orange, litchi, rose et fleur d'oranger.", price: dh(38), group: "Cocktails", listedOn: [CARTE] },
      { id: "smoothie-berry", name: "Smoothie Berry", description: "Fruits rouges, orange.", price: dh(34), group: "Cocktails", listedOn: [CARTE] },
      { id: "smoothie-skinny", name: "Smoothie Skinny", description: "Pêche, mangue, orange.", price: dh(34), group: "Cocktails", listedOn: [CARTE] },
      { id: "smoothie-hawaien", name: "Smoothie Hawaïen", description: "Mangue, ananas, fruit de la passion, orange.", price: dh(38), group: "Cocktails", listedOn: [CARTE] },
      { id: "espresso", name: "Espresso", price: dh(18), group: "Boissons chaudes", listedOn: [CARTE] },
      { id: "the-menthe", name: "Thé à la menthe Tchaba", price: dh(18), group: "Boissons chaudes", listedOn: [CARTE] },
      { id: "nespresso", name: "Nespresso", price: dh(20), group: "Boissons chaudes", listedOn: [CARTE] },
      { id: "nespresso-deca", name: "Nespresso décaféiné", price: dh(20), group: "Boissons chaudes", listedOn: [CARTE] },
      { id: "thes-tchaba", name: "Sélection de thés Tchaba", description: "Le temps d'une tasse de thé : demandez le coffret Tchaba.", price: dh(30), group: "Boissons chaudes", listedOn: [CARTE] },
      { id: "eau-50", name: "Eau minérale 50 cl", price: dh(10), group: "Eaux & sodas", listedOn: [CARTE] },
      { id: "eau-150", name: "Eau minérale 1,5 l", price: dh(15), group: "Eaux & sodas", listedOn: [CARTE] },
      { id: "oulmes-50", name: "Eau pétillante Oulmès 50 cl", price: dh(15), group: "Eaux & sodas", listedOn: [CARTE] },
      { id: "oulmes-100", name: "Eau pétillante Oulmès 1 l", price: dh(20), group: "Eaux & sodas", listedOn: [CARTE] },
      { id: "sodas", name: "Sodas 33 cl", price: dh(18), group: "Eaux & sodas", listedOn: [CARTE] },
    ],
  },
];

/** Un plat est publiable s'il n'est pas explicitement non confirmé ni indisponible. */
export const isPublishable = (d: Dish) => d.available !== false && d.confirmed !== false && d.listedOn.length > 0;

export const publishedMenu: MenuCategory[] = menu
  .map((c) => ({ ...c, dishes: c.dishes.filter(isPublishable) }))
  .filter((c) => c.dishes.length > 0);

export const formatPrice = (p?: Price) =>
  p && p.verified ? `${p.amount.toLocaleString("fr-MA")} Dh` : null;

/** Lien vers une carte officielle complète (PDF, page...). Laisser null si aucune. */
export const officialMenuUrl: string | null = null;
