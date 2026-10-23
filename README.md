# Mucho Seafood — site officiel

Site du restaurant **Mucho Seafood**, poissons et fruits de mer à El Jadida (Maroc).
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, icônes Lucide. Aucune autre dépendance d'exécution.

Concept : **« Mucho — The Art of Seafood »**, une mise en page éditoriale façon magazine gastronomique, construite autour des vraies photos du restaurant.

---

## 1. Installer et lancer

Prérequis : Node.js 20 ou plus récent.

```bash
npm install          # installe les dépendances
npm run dev          # développement : http://localhost:3000
npm run build        # version de production
npm start            # sert la version de production
```

Contrôles qualité :

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run build && npm start   # puis, dans un autre terminal :
BASE_URL=http://localhost:3000 npm run test:e2e   # tests fonctionnels (Playwright)
```

Les tests fonctionnels vérifient : pages et codes HTTP, liens et ancres, téléphone, itinéraire, Glovo, chargement des images, onglets de la carte au clavier, visionneuse photo, parcours de réservation, menu mobile, absence de débordement horizontal de 360 à 1440 px, données structurées sans note ni avis inventés. Si Playwright n'a pas de navigateur : `npx playwright install chromium`.

## 2. Où modifier quoi

| Je veux modifier… | Fichier |
| --- | --- |
| Adresse, téléphone, horaires, WhatsApp, réseaux sociaux, lien de livraison, créneaux de réservation | `src/config/restaurant.ts` |
| Plats, descriptions, prix, catégories, plats signatures | `src/data/menu.ts` |
| Photos de la galerie | `src/data/gallery.ts` |
| Avis clients (vide par défaut) | `src/data/reviews.ts` |
| Mentions légales (raison sociale, RC, ICE, hébergeur) | `src/config/legal.ts` |
| Couleurs, typographies, animations | `src/app/globals.css` |
| Titre et description Google, partage social | `src/app/layout.tsx`, `src/app/carte/page.tsx` |

### Le principe « vérifié / non vérifié »

Chaque information pratique porte un champ `verified`. Tant qu'il vaut `false` :

- les **horaires** s'affichent avec la mention « indicatifs, à confirmer par téléphone » et ne sont **pas** envoyés à Google ;
- les **prix** ne s'affichent pas du tout (voir ci-dessous).

Quand le restaurant a confirmé une information, passez simplement `verified: true`.

### Plats et prix

Dans `src/data/menu.ts`, chaque plat ressemble à ceci :

```ts
{ id: "friture-mucho", name: "Friture Mucho", description: "…", price: glovo(145), signature: true, listedOn: ["Glovo"] }
```

- **Ajouter un plat** : copiez une ligne dans la bonne catégorie et changez `id` (unique) et `name`.
- **Retirer un plat** : supprimez la ligne, ou ajoutez `available: false` pour le masquer temporairement.
- **Afficher un prix** : écrivez `price: dh(145)`. Les prix `dh(…)` viennent de la carte imprimée et s'affichent. Les prix `glovo(…)` (relevés sur Glovo, prix de livraison) ne s'affichent **jamais** : remplacez-les par `dh(…)` une fois le prix en salle confirmé.
- **Intertitres** : `group: "Jus frais"` range un plat sous un intertitre dans sa catégorie ; `note` sur une catégorie affiche une mention (ex. « selon arrivage »).
- **Plat signature** : `signature: true` le place dans la section « Plats signatures ». Le premier plat signature qui a une photo est mis en scène en grand.
- **Plat masqué** : « Tajine de poisson » n'apparaît que dans un annuaire ; il porte `confirmed: false`. Supprimez cette mention s'il est bien à la carte.
- **Carte officielle** (PDF, lien) : renseignez `officialMenuUrl` en bas du fichier ; un lien apparaît alors sous la carte.

## 3. Remplacer ou ajouter des photos

Les photos sources sont dans `assets-src/` (fichiers d'origine fournis par le restaurant). Le script `npm run images` les convertit en WebP optimisés dans `public/images/`, recrée le favicon (`src/app/icon.png`) et l'image de partage (`public/og-image.jpg`).

1. Déposez la nouvelle photo dans `assets-src/` (PNG ou JPG, le plus grand format possible : 2000 px de large ou plus est idéal).
2. Pour remplacer une photo existante, gardez le même nom de fichier. Pour en ajouter une, ajoutez-la dans la liste `jobs` de `scripts/optimize-images.mjs`.
3. Lancez `npm run images`.
4. Pour la galerie, ajoutez une entrée dans `src/data/gallery.ts` (chemin, texte alternatif, légende, dimensions).
5. Pour illustrer un plat, ajoutez `image` et `imageAlt` au plat dans `src/data/menu.ts`.

Photos actuellement utilisées : logo officiel, salle avec vue sur l'océan, Friture Mucho, pâtes aux fruits de mer vue plage, plateau de fruits de mer et riz, six photos Instagram du restaurant (captures recadrées, préfixe `ig-` : linguine, palourdes, poisson grillé, poisson-purée-légumes, deux fritures), plus deux recadrages « détail » (crevettes, tissu des fauteuils). Les photos de la carte imprimée sont gardées dans `assets-src/` pour référence. Les photos actuelles font 765 à 1360 px de large : des photos en plus haute définition rendront l'accueil encore plus net sur grand écran.

## 4. Réservation et WhatsApp

Le site ne simule aucune disponibilité. Le formulaire (nom, téléphone, date, heure, couverts, demande particulière) valide les champs puis transmet une **demande** ; le visiteur est prévenu qu'elle n'est confirmée qu'après réponse du restaurant.

Trois modes, choisis automatiquement :

1. **Webhook (recommandé une fois en ligne)** : définissez `RESERVATION_WEBHOOK_URL` dans les variables d'environnement de l'hébergeur. Le serveur (`src/app/api/reservation/route.ts`) valide et transmet la demande en JSON à cette adresse. Exemples : un scénario Make ou Zapier qui envoie un e-mail, un WhatsApp Business ou une ligne dans Google Sheets ; un Google Apps Script ; un webhook Slack. Le webhook reste côté serveur : il n'est jamais exposé au navigateur. Redéployez après l'avoir ajouté.
2. **WhatsApp (mode actuel)** : `whatsapp: "212661146309"` dans `src/config/restaurant.ts` (format international sans `+` ni espaces). Le bouton « Envoyer sur WhatsApp » ouvre la conversation avec le message prérempli. Ce numéro alimente aussi la **pastille WhatsApp flottante** visible sur toutes les pages (`src/components/layout/WhatsAppBubble.tsx`). Mettre `null` désactive les deux.
3. **SMS** : sans webhook ni WhatsApp, le bouton « Envoyer par SMS » ouvre l'application SMS avec le message prérempli vers le portable du restaurant. Les boutons « Appeler » et « Copier le message » restent proposés (utile sur ordinateur).

## 5. Déployer

Le plus simple : **Vercel** (gratuit pour ce type de site).

1. Poussez le projet sur GitHub.
2. Sur vercel.com, « Add New Project », importez le dépôt (Vercel détecte Next.js).
3. Variables d'environnement :
   - `NEXT_PUBLIC_SITE_URL` = l'adresse définitive du site, par exemple `https://www.mucho-eljadida.ma` (utilisée par le sitemap, les balises de partage et les données Google) ;
   - `RESERVATION_WEBHOOK_URL` (facultatif, voir plus haut).
4. Déployez, puis branchez votre nom de domaine dans Vercel.
5. Mettez à jour l'hébergeur dans `src/config/legal.ts`.

Autres hébergeurs compatibles Next.js : Netlify, Cloudflare, ou tout serveur Node (`npm run build && npm start`).

Après la mise en ligne : déclarez `https://votre-domaine/sitemap.xml` dans Google Search Console et ajoutez l'adresse du site à la fiche Google Business Profile.

## 6. Ce que le propriétaire doit encore valider

**Confirmé**

- Logo officiel et photos (fournis par le restaurant, dont six publications Instagram).
- Vue sur l'océan : visible sur les photos officielles.
- Carte imprimée (page Pizza / Desserts / Boissons) : plats et prix affichés.
- Téléphone fixe 05 23 80 08 33, Instagram @muchoseafoodrestaurant, Facebook /mucho : imprimés sur la carte.
- Portable et WhatsApp 06 61 14 63 09 : confirmé par le propriétaire.
- Boutique Mucho El Jadida sur Glovo.

**À confirmer**

- Adresse : 1er étage, villa 1, route de Casablanca, El Jadida 24000.
- Horaires : tous les jours, 12 h 30 – 23 h (affichés « à confirmer », non transmis à Google).
- Prix des entrées, poissons, fruits de mer, seafood boil, tajines, pâtes et viandes : ces pages de la carte n'étaient lisibles que de biais sur la photo. Les plats sont repris, les prix restent masqués. Une photo bien à plat de chaque page suffit pour les ajouter.
- Deux versions de la page desserts/boissons ont été fournies (l'une avec mousse et crème caramel à 40 Dh, tarte aux pommes ; l'autre à 35 Dh, cheesecakes, pizza vegan). Le site suit la version la plus nette ; à vérifier qu'il s'agit bien de la carte actuelle.
- Le compte Facebook est indiqué « /mucho » sur la carte : vérifier que facebook.com/mucho est bien la page du restaurant.
- Identification des plats en photo : Friture Mucho, Linguine aux fruits de mer, Palourdes marinières.
- Emplacement exact sur Google Maps : à remplacer par les coordonnées GPS dans `mapsQuery`.

**À obtenir**

- Adresse du site (nom de domaine) et hébergeur.
- Informations légales : raison sociale, forme juridique, RC, ICE, IF, responsable de publication, e-mail de contact.
- Photos en haute définition, notamment du Seafood Boil, de la Grillade Mucho et de la Marmite (présentées pour l'instant en version typographique).
- Avis clients authentiques à citer, avec leur source et leur date (la section est masquée tant qu'il n'y en a pas).

## 7. Structure

```
assets-src/             photos d'origine (non publiées telles quelles)
public/images/          photos optimisées WebP (générées)
scripts/                optimisation des images, tests fonctionnels
src/app/                pages : accueil, /carte, mentions légales, confidentialité, API réservation, sitemap, robots
src/components/layout/  en-tête, pied de page, barre d'actions mobile
src/components/sections/ sections de l'accueil
src/components/ui/      éléments réutilisables
src/config/             informations du restaurant et mentions légales
src/data/               carte, galerie, avis
src/lib/                liens (téléphone, itinéraire, SMS, WhatsApp), données structurées
```

## 8. Choix de conception

- **Couleurs** : le bleu officiel du logo (`#293D84`) est la couleur de marque. Le bleu « abysse » proposé (`#092B35`, tirant sur le vert) a été décalé vers un bleu nuit (`#0B1631`) dérivé du logo, pour que logo et fonds parlent la même langue. Ivoire, sable et cuivre sont conservés ; le cuivre reste réservé aux filets, numéros et détails.
- **Motif** : un damier de cubes en perspective, repris du tissu des fauteuils de la salle, très discret sur les fonds sombres. C'est un code propre à Mucho, réutilisable sur les menus et Instagram.
- **Typographies** : Cormorant Garamond (titres) et DM Sans (textes), chargées et hébergées par Next.js (aucun appel à Google Fonts côté visiteur).
- **Animations** : CSS et un seul observateur JavaScript ; toutes désactivées si le visiteur a demandé moins de mouvement.
- **Carte Google** : chargée seulement au clic, pour ne rien alourdir.
