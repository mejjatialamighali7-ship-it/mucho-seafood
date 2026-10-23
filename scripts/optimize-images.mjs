// Convertit les photos sources (assets-src/) en WebP optimisés (public/images/).
// Usage : npm run images — à relancer après remplacement d'une photo.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "assets-src";
const OUT = "public/images";

/** name: fichier source sans extension ; crops: recadrages « détail » optionnels */
const jobs = [
  { name: "fruits-de-mer-riz-vue-mer", width: 1360 },
  { name: "salle-vue-mer", width: 1360 },
  { name: "friture-mucho", width: 765 },
  { name: "linguine-fruits-de-mer", width: 765 },
];

// Photos Instagram du restaurant : captures d'écran recadrées
// (sans la barre d'état du téléphone ni l'interface « Send message »).
const instagram = [
  { name: "ig-poisson-grille", region: { left: 0, top: 640, width: 1206, height: 1260 } },
  { name: "ig-friture-assortiment", region: { left: 0, top: 190, width: 1206, height: 2136 } },
  { name: "ig-palourdes", region: { left: 0, top: 190, width: 1206, height: 2136 } },
  { name: "ig-linguine-fruits-de-mer", region: { left: 0, top: 190, width: 1206, height: 2136 } },
  { name: "ig-poisson-puree-legumes", region: { left: 0, top: 640, width: 1206, height: 1236 } },
  { name: "ig-friture-aneth", region: { left: 0, top: 190, width: 1206, height: 2136 } },
  // Capture envoyée par le restaurant le 23/10/2026 (barre d'état et bas d'écran retirés).
  { name: "plateau-poisson-grille", region: { left: 0, top: 200, width: 1206, height: 2120 } },
];

const details = [
  { from: "salle-vue-mer", out: "detail-fauteuil", region: { left: 600, top: 380, width: 340, height: 300 } },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  await sharp(`${SRC}/${job.name}.png`)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(`${OUT}/${job.name}.webp`);
}

for (const ig of instagram) {
  await sharp(`${SRC}/${ig.name}.png`)
    .extract(ig.region)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(`${OUT}/${ig.name}.webp`);
}

for (const d of details) {
  await sharp(`${SRC}/${d.from}.png`)
    .extract(d.region)
    .webp({ quality: 82, effort: 6 })
    .toFile(`${OUT}/${d.out}.webp`);
}

// Logo : ovale officiel détouré (coins blancs rendus transparents).
const logo = sharp(`${SRC}/logo-mucho.png`);
const { width, height } = await logo.metadata();
const mask = Buffer.from(
  `<svg width="${width}" height="${height}"><ellipse cx="${width / 2}" cy="${height / 2}" rx="${width / 2 - 1}" ry="${height / 2 - 12}" fill="#fff"/></svg>`
);
await logo
  .ensureAlpha()
  .composite([{ input: mask, blend: "dest-in" }])
  .webp({ quality: 90 })
  .toFile(`${OUT}/logo-mucho.webp`);
const masked = await sharp(`${SRC}/logo-mucho.png`)
  .ensureAlpha()
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();
await sharp(masked)
  .resize(192, 192)
  .png({ palette: true, compressionLevel: 9 })
  .toFile("src/app/icon.png");

// Photos envoyées par le restaurant le 23/10/2026 (JPG, orientation iPhone respectée).
const photos = [
  // Photo principale de l'accueil, sans le haut du plafond (jamais visible à l'écran).
  { name: "salle-baie-vitree", width: 1206, region: { left: 0, top: 460, width: 1206, height: 1674 } },
  { name: "salle-en-journee", width: 1440 },
  { name: "espadon", width: 1100 },
  { name: "huitres-oursins", width: 1000 },
  { name: "langoustines", width: 1000 },
  // Recadrée en carré pour retirer le sol et la chaussure visibles en bas de la photo.
  { name: "araignee-de-mer", width: 1000, region: { left: 0, top: 540, width: 3024, height: 3024 } },
  // Capture d'écran : on ne garde que le panneau bleu aux poissons dorés.
  { name: "mucho-poissons-dores", width: 960, region: { left: 0, top: 545, width: 960, height: 990 } },
];
for (const p of photos) {
  let img = sharp(`${SRC}/${p.name}.jpg`).rotate();
  if (p.region) img = img.extract(p.region);
  await img
    .resize({ width: p.width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(`${OUT}/${p.name}.webp`);
}

/** Détoure une image : `alphaOf(r, g, b)` renvoie l'opacité (0–255) de chaque pixel. */
async function cutOut(input, alphaOf, rgbOf = (r, g, b) => [r, g, b]) {
  const { data, info } = await input.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
    out.set([...rgbOf(r, g, b), alphaOf(r, g, b)], i * 4);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim();
}
const ramp = (v, from, to) => Math.max(0, Math.min(255, Math.round((255 * (v - from)) / (to - from))));

// Autocollant « Eat with your hands » : le fond bleu est rendu transparent.
const sticker = await cutOut(
  sharp(`${SRC}/eat-with-your-hands.jpg`).extract({ left: 0, top: 566, width: 960, height: 1130 }),
  (r, g, b) => ramp(Math.hypot(r - 37, g - 61, b - 133), 45, 75),
);
await sticker.webp({ quality: 85, alphaQuality: 90 }).toFile(`${OUT}/eat-with-your-hands.webp`);

// Emblème « gouvernail » de la carte imprimée, en blanc sur fond transparent.
const emblem = await cutOut(
  sharp(`${SRC}/emblem-gouvernail.jpg`),
  (r, g, b) => 255 - ramp(0.299 * r + 0.587 * g + 0.114 * b, 62, 82),
  () => [255, 255, 255],
);
await emblem.webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}/emblem-gouvernail.webp`);

// Image de partage (Open Graph) 1200×630 : la salle face à l'océan.
await sharp(`${SRC}/salle-baie-vitree.jpg`)
  .rotate()
  .extract({ left: 3, top: 800, width: 1200, height: 630 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("Images optimisées dans", OUT);

// Variantes plus légères pour les téléphones et tablettes : name-480.webp, name-828.webp.
// Le chargeur src/lib/image-loader.ts choisit la plus petite qui suffit à l'écran.
// Gardez cette liste identique à VARIANTS dans src/lib/image-loader.ts.
const VARIANTS = [480, 828];
const { readdir } = await import("node:fs/promises");
// Ne pas nommer une photo « nom-480 » ou « nom-828 » : elle serait prise pour une variante.
const variantName = new RegExp(`-(${VARIANTS.join("|")})\\.webp$`);
for (const file of await readdir(OUT)) {
  if (!file.endsWith(".webp") || variantName.test(file)) continue;
  for (const w of VARIANTS) {
    await sharp(`${OUT}/${file}`)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(`${OUT}/${file.replace(/\.webp$/, `-${w}.webp`)}`);
  }
}

// Icônes : écran d'accueil iPhone (fond plein, iOS n'accepte pas la transparence)
// et favicon.ico classique (16 et 32 px) pour les anciens navigateurs et Google.
const logoPng = await sharp(`${SRC}/logo-mucho.png`).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#f7f3ea" } })
  .composite([{ input: await sharp(logoPng).resize(150, 150).toBuffer(), gravity: "centre" }])
  .png({ compressionLevel: 9 })
  .toFile("src/app/apple-icon.png");
const icoSizes = [16, 32];
const pngs = await Promise.all(icoSizes.map((s) => sharp(logoPng).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(icoSizes[i], e);
  header.writeUInt8(icoSizes[i], e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(png.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += png.length;
});
const { writeFile } = await import("node:fs/promises");
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...pngs]));
