/**
 * LA CARTE — fichier de données unique
 * ------------------------------------
 * Source : carte officielle du restaurant (PDF transmis par le propriétaire le
 * 23/10/2026, copie dans assets-src/carte-mucho-officielle.pdf et
 * public/carte-mucho.pdf). Tous les prix ci-dessous en viennent.
 *
 * Ajouter un plat : copiez un objet dans la bonne catégorie.
 * Retirer un plat : supprimez l'objet, ou passez `available` à false.
 * Changer un prix : modifiez le nombre dans `dh(…)`.
 *
 * `group`    regroupe des plats sous un intertitre dans une même catégorie.
 * `variants` affiche plusieurs prix pour un même plat (ex. tailles du Seafood Boil).
 * `from(…)`  affiche « à partir de … Dh » (utile pour un plat signature à plusieurs tailles).
 */

export type Price = { amount: number; verified: boolean; from?: boolean; source?: string };

export type Dish = {
  id: string;
  name: string;
  description?: string;
  price?: Price;
  /** Plusieurs prix pour un même plat, chacun avec son libellé. */
  variants?: { label: string; price: Price }[];
  /** Chemin d'une photo dans /public, si une vraie photo du plat existe. */
  image?: string;
  imageAlt?: string;
  signature?: boolean;
  available?: boolean;
  /** Intertitre facultatif (ex. « Jus frais ») à l'intérieur d'une catégorie. */
  group?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  /** Mention affichée sous la catégorie (texte de la carte). */
  note?: string;
  dishes: Dish[];
};

const SOURCE = "Carte officielle";
const dh = (amount: number): Price => ({ amount, verified: true, source: SOURCE });
const from = (amount: number): Price => ({ amount, verified: true, from: true, source: SOURCE });

export const menu: MenuCategory[] = [
  {
    id: "signatures",
    title: "Nos signatures",
    kicker: "À partager",
    dishes: [
      {
        id: "seafood-boil",
        name: "Seafood Boil",
        description:
          "Notre plat phare. Gambas, palourdes, moules, poulpe, œuf dur, maïs, riz basmati et potatoes, relevés à la sauce Old Bay, que l'on ne trouve qu'aux États-Unis. Classique, crabe, langouste, crevettes royales ou homard.",
        price: from(235),
        image: "/images/fruits-de-mer-riz-vue-mer.webp",
        imageAlt: "Seafood Boil de Mucho : crevettes, crabe et moules sur riz, sauce Old Bay à part, servi face à la plage et à l'océan d'El Jadida",
        signature: true,
      },
      {
        id: "friture-mucho",
        name: "Friture Mucho",
        description: "Soles, merlans, calamars et crevettes, poisson blanc et croquettes de poisson.",
        price: dh(120),
        image: "/images/friture-mucho.webp",
        imageAlt: "Grand plat de friture : filets de poisson dorés, crevettes, anneaux de calamar, citron et sauce blanche",
        signature: true,
      },
      {
        id: "grillade-mixte",
        name: "Grillade mixte",
        description: "Sole, merlan, calamars et crevettes, légumes sautés.",
        price: dh(95),
        signature: true,
      },
      {
        id: "marmite-fruits-de-mer",
        name: "Marmite de fruits de mer",
        description: "Calamars, palourdes, moules, gambas, crevettes, poulpe, poisson blanc et crevette royale.",
        price: dh(135),
        signature: true,
      },
    ],
  },
  {
    id: "entrees",
    title: "Entrées",
    kicker: "Pour commencer",
    dishes: [
      { id: "salade-potager", name: "Salade du potager", description: "Légumes frais, potatoes, tomate cerise, maïs, œuf dur, mini mozza, thon et parmesan.", price: dh(54), group: "Froides" },
      { id: "fusilli-italienne", name: "Fusilli à l'italienne", description: "Fusilli, jambon, mozza, courgette sautée, tomate cerise, oignon, basilic et parmesan, huile d'olive balsamique.", price: dh(55), group: "Froides" },
      { id: "anchois-marines", name: "Anchois marinés", price: dh(70), group: "Froides" },
      { id: "salade-exotique", name: "Exotique", description: "Laitue, mangue, ananas, pomme, concombre, tomate cerise, carotte, chou blanc, surimi, raisins secs et noix.", price: dh(65), group: "Froides" },
      { id: "salade-poulpe", name: "Salade de poulpe", description: "Poulpe mariné à l'ail et à l'huile d'olive, pomme de terre, oignon rouge et herbes de Provence.", price: dh(75), group: "Froides" },
      { id: "salade-pecheur", name: "Salade pêcheur", description: "Poisson blanc, crevettes, moules, calamar, poulpe, tomate, poivron vert.", price: dh(75), group: "Froides" },
      { id: "crevettes-avocat", name: "Crevettes avocat", description: "Crevettes, avocat, tomate cerise, maïs.", price: dh(80), group: "Froides" },
      { id: "crabe-avocat", name: "Crabe avocat", price: dh(80), group: "Froides" },
      { id: "soupe-poisson", name: "Soupe de poisson", price: dh(45), group: "Chaudes" },
      { id: "soupe-crabe", name: "Soupe de chair de crabe", price: dh(65), group: "Chaudes" },
      { id: "gratin-fruits-de-mer", name: "Gratin de fruits de mer", price: dh(75), group: "Chaudes" },
      { id: "sardines-grillees", name: "Sardines grillées", price: dh(45), group: "Chaudes" },
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
        price: dh(85),
        image: "/images/ig-palourdes.webp",
        imageAlt: "Palourdes ouvertes dans leur jus à l'ail et au persil, quartier de citron",
      },
      { id: "huitres-3", name: "3 huîtres nature", price: dh(45) },
      { id: "huitres-6", name: "6 huîtres nature", price: dh(80) },
      { id: "huitres-gratinees", name: "6 huîtres gratinées", price: dh(120) },
      { id: "moules-marinieres", name: "Moules marinières", price: dh(70) },
      { id: "gambas-pilpil", name: "Gambas pil-pil", price: dh(90) },
      { id: "crevettes-pilpil", name: "Crevettes pil-pil", price: dh(75) },
      { id: "poulpe-pilpil", name: "Poulpe pil-pil", price: dh(75) },
      { id: "crevettes-royales", name: "Crevettes royales", description: "Quatre pièces.", price: dh(120) },
      { id: "marmite", name: "Marmite de fruits de mer", description: "Calamars, palourdes, moules, gambas, crevettes, poulpe, poisson blanc, crevette royale.", price: dh(135) },
    ],
  },
  {
    id: "seafood-boil",
    title: "Seafood Boil",
    kicker: "Le grand partage",
    note: "Notre plat phare. Gambas, palourdes, moules, poulpe, œuf dur, maïs, riz basmati, potatoes, sauce Old Bay (que l'on ne trouve qu'aux États-Unis). Pour 1 à 2 personnes ou 3 à 4 personnes.",
    dishes: [
      { id: "boil-classique", name: "Classique", variants: [{ label: "1 à 2 pers.", price: dh(235) }, { label: "3 à 4 pers.", price: dh(460) }] },
      { id: "boil-crabe", name: "Crabe", variants: [{ label: "1 à 2 pers.", price: dh(285) }, { label: "3 à 4 pers.", price: dh(560) }] },
      { id: "boil-langouste", name: "Langouste", variants: [{ label: "1 à 2 pers.", price: dh(375) }, { label: "3 à 4 pers.", price: dh(740) }] },
      { id: "boil-crevettes-royales", name: "Crevettes royales", variants: [{ label: "1 à 2 pers.", price: dh(375) }, { label: "3 à 4 pers.", price: dh(740) }] },
      { id: "boil-homard", name: "Homard", variants: [{ label: "1 à 2 pers.", price: dh(450) }, { label: "3 à 4 pers.", price: dh(890) }] },
    ],
  },
  {
    id: "poissons",
    title: "Poissons",
    kicker: "Fritures & grillades",
    note: "Garnitures selon l'humeur du chef.",
    dishes: [
      { id: "friture-anchois", name: "Friture d'anchois", price: dh(80), group: "Fritures & grillades" },
      { id: "friture-merlans", name: "Friture de merlans", price: dh(90), group: "Fritures & grillades" },
      { id: "friture-soles", name: "Friture de soles", price: dh(90), group: "Fritures & grillades" },
      { id: "friture-crevettes", name: "Friture de crevettes", price: dh(95), group: "Fritures & grillades" },
      { id: "friture-calamars", name: "Friture de calamars", price: dh(110), group: "Fritures & grillades" },
      { id: "friture-duo", name: "Friture duo crevettes calamars", price: dh(100), group: "Fritures & grillades" },
      { id: "friture-mucho-plats", name: "Friture Mucho", description: "Soles, merlans, calamars et crevettes, poisson blanc et croquettes de poisson.", price: dh(120), group: "Fritures & grillades" },
      { id: "friture-mixte", name: "Friture mixte", description: "Sole, merlan, crevettes, calamars.", price: dh(95), group: "Fritures & grillades" },
      { id: "grillade-mixte-plats", name: "Grillade mixte", description: "Sole, merlan, calamars et crevettes, légumes sautés.", price: dh(95), group: "Fritures & grillades" },
      { id: "paella", name: "Paëlla fruits de mer", description: "Pour une personne.", price: dh(95), group: "Spécialités" },
      { id: "filet-saint-pierre", name: "Filet de saint-pierre", price: dh(120), group: "Spécialités" },
      { id: "espadon-poele", name: "Espadon poêlé aux herbes", price: dh(120), group: "Spécialités" },
      { id: "steak-thon", name: "Steak de thon poêlé", price: dh(120), group: "Spécialités" },
      { id: "brochettes-espadon", name: "Brochettes d'espadon", price: dh(120), group: "Spécialités" },
      { id: "pave-saumon", name: "Pavé de saumon grillé", price: dh(135), group: "Spécialités" },
      { id: "trio-filets", name: "Trio de filets de poissons", price: dh(135), group: "Spécialités" },
      { id: "brochettes-lotte", name: "Brochettes de lotte", price: dh(135), group: "Spécialités" },
    ],
  },
  {
    id: "tajines",
    title: "Tajines",
    kicker: "De la mer au tajine",
    dishes: [
      { id: "tajine-merlan-gambas", name: "Tajine boulettes de merlan & gambas", price: dh(95) },
      { id: "tajine-merlan", name: "Tajine boulettes de merlan", price: dh(70) },
      { id: "boulettes-sardines", name: "Boulettes de sardines sauce tomate", price: dh(50) },
      { id: "tajine-moules", name: "Tajine de moules", description: "Sauce tomate ou provençale.", price: dh(75) },
      { id: "tajine-requin", name: "Tajine de requin", price: dh(65) },
      { id: "regamonte-espadon", name: "Regamonté d'espadon, moules et crevettes", price: dh(110) },
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
        price: dh(95),
        image: "/images/ig-linguine-fruits-de-mer.webp",
        imageAlt: "Linguine aux crevettes entières, palourdes, moules et tomates confites dans une assiette bleue",
      },
      { id: "fusilli-5-fromages", name: "Fusilli 5 fromages", price: dh(55) },
      { id: "bolognaise", name: "Bolognaise", price: dh(60) },
      { id: "spaghetti-vongole", name: "Spaghetti alle vongole", description: "Aux palourdes.", price: dh(80) },
      { id: "penne-saumon", name: "Penne saumon", price: dh(85) },
      { id: "spaghetti-gamberetti", name: "Spaghetti ai gamberetti", description: "Aux crevettes.", price: dh(85) },
      { id: "lasagnes-fruits-de-mer", name: "Lasagnes aux fruits de mer", price: dh(85) },
      { id: "lasagnes-bolognaise", name: "Lasagnes à la bolognaise", price: dh(70) },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    kicker: "Au four",
    dishes: [
      { id: "pizza-margarita", name: "Margarita", description: "Mozzarella, origan et parmesan.", price: dh(60) },
      { id: "pizza-viande-hachee", name: "Viande hachée", description: "Viande hachée, mozzarella, olives noires et origan.", price: dh(70) },
      { id: "pizza-thon", name: "Thon", description: "Thon, oignons et olives noires.", price: dh(70) },
      { id: "pizza-pepperoni", name: "Pepperoni", description: "Champignon, pepperoni.", price: dh(75) },
      { id: "pizza-fruits-de-mer", name: "Fruits de mer", description: "Calamar, crevette, moules, poulpe, champignon, origan et olives noires.", price: dh(85) },
    ],
  },
  {
    id: "viandes",
    title: "Viandes & burgers",
    kicker: "Côté terre",
    dishes: [
      { id: "emince-poulet", name: "Émincé de poulet sauce champignon", price: dh(65) },
      { id: "emince-boeuf", name: "Émincé de filet de bœuf, sauce champignon", price: dh(85) },
      { id: "filet-gourmet", name: "Filet gourmet de bœuf", price: dh(145) },
      { id: "burger-mucho", name: "Burger Mucho", description: "Viande hachée, jambon fumé, cheddar, oignons caramélisés et crispy, laitue, tomate. Frites ou potatoes inclus.", price: dh(75) },
      { id: "filet-o-fish", name: "Filet-o-fish", description: "Filet de poisson pané, cheddar, sauce tartare, oignons crispy, laitue et tomate. Frites ou potatoes inclus.", price: dh(75) },
      { id: "portion-frites", name: "Portion de frites", price: dh(15) },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    kicker: "Pour finir",
    dishes: [
      { id: "glace", name: "Boule de glace", description: "Parfum au choix : vanille, chocolat, nougat, mangue.", price: dh(14) },
      { id: "mousse-chocolat", name: "Mousse au chocolat", price: dh(40) },
      { id: "creme-caramel", name: "Crème caramel", price: dh(40) },
      { id: "tarte-pommes", name: "Tarte aux pommes", price: dh(40) },
      { id: "brownie", name: "Brownie", description: "Avec sa boule de glace.", price: dh(45) },
      { id: "tarte-citron", name: "Tarte au citron en verrine", price: dh(48) },
      { id: "poelon-cookies", name: "Poêlon de cookies", description: "Avec sa boule de glace vanille.", price: dh(55) },
      { id: "fondant-chocolat", name: "Fondant au chocolat", description: "Avec sa boule de glace vanille.", price: dh(55) },
    ],
  },
  {
    id: "boissons",
    title: "Boissons",
    kicker: "Jus, cocktails & boissons chaudes",
    dishes: [
      { id: "orange-nature", name: "Orange nature", price: dh(22), group: "Jus frais" },
      { id: "jus-citron", name: "Jus de citron", price: dh(22), group: "Jus frais" },
      { id: "orange-carotte", name: "Orange, carotte à la fleur d'oranger", price: dh(24), group: "Jus frais" },
      { id: "orange-mangue", name: "Orange mangue", price: dh(26), group: "Jus frais" },
      { id: "jus-ananas", name: "Jus d'ananas", price: dh(32), group: "Jus frais" },
      { id: "detox-foie", name: "La Détox du foie", description: "Betterave, carotte, botte de persil, orange, gingembre.", price: dh(34), group: "Jus frais" },
      { id: "panache-fruits", name: "Panaché de fruits", price: dh(36), group: "Jus frais" },
      { id: "mojito-classique", name: "Mojito classique", price: dh(30), group: "Cocktails" },
      { id: "mojito-litchi", name: "Mojito litchi", price: dh(36), group: "Cocktails" },
      { id: "mojito-fruit-rouge", name: "Mojito fruit rouge", price: dh(36), group: "Cocktails" },
      { id: "citronnade", name: "Notre citronnade", description: "Citron, purée de litchi, basilic.", price: dh(36), group: "Cocktails" },
      { id: "cocktail-mucho", name: "Cocktail Mucho", description: "Orange, litchi, rose et fleur d'oranger.", price: dh(38), group: "Cocktails" },
      { id: "smoothie-berry", name: "Smoothie Berry", description: "Fruits rouges, orange.", price: dh(34), group: "Cocktails" },
      { id: "smoothie-skinny", name: "Smoothie Skinny", description: "Pêche, mangue, orange.", price: dh(34), group: "Cocktails" },
      { id: "smoothie-hawaien", name: "Smoothie Hawaïen", description: "Mangue, ananas, litchi, orange.", price: dh(38), group: "Cocktails" },
      { id: "espresso", name: "Espresso", price: dh(18), group: "Boissons chaudes" },
      { id: "the-menthe", name: "Thé à la menthe", price: dh(18), group: "Boissons chaudes" },
      { id: "eau-50", name: "Eau minérale 50 cl", price: dh(10), group: "Eaux & sodas" },
      { id: "eau-150", name: "Eau minérale 1,5 l", price: dh(15), group: "Eaux & sodas" },
      { id: "oulmes-50", name: "Eau pétillante Oulmès 50 cl", price: dh(15), group: "Eaux & sodas" },
      { id: "oulmes-100", name: "Eau pétillante Oulmès 1 l", price: dh(20), group: "Eaux & sodas" },
      { id: "sodas", name: "Sodas 33 cl", price: dh(18), group: "Eaux & sodas" },
    ],
  },
];

export const isPublishable = (d: Dish) => d.available !== false;

export const publishedMenu: MenuCategory[] = menu
  .map((c) => ({ ...c, dishes: c.dishes.filter(isPublishable) }))
  .filter((c) => c.dishes.length > 0);

export const formatPrice = (p?: Price) =>
  p && p.verified ? `${p.from ? "à partir de " : ""}${p.amount.toLocaleString("fr-MA")} Dh` : null;

/** Carte officielle téléchargeable (PDF dans /public). Mettre null pour masquer le lien. */
export const officialMenuUrl: string | null = "/carte-mucho.pdf";
