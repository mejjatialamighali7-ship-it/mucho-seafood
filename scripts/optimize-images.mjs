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

const details = [
  { from: "friture-mucho", out: "detail-crevettes", region: { left: 470, top: 360, width: 295, height: 340 } },
  { from: "salle-vue-mer", out: "detail-fauteuil", region: { left: 600, top: 380, width: 340, height: 300 } },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  await sharp(`${SRC}/${job.name}.png`)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(`${OUT}/${job.name}.webp`);
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

// Image de partage (Open Graph) 1200×630 à partir de la photo principale.
await sharp(`${SRC}/fruits-de-mer-riz-vue-mer.png`)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("Images optimisées dans", OUT);
