// Tests fonctionnels de bout en bout.
// Usage : npm run build && npm start (dans un autre terminal), puis
//         BASE_URL=http://localhost:3000 npm run test:e2e
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
let failures = 0;
const ok = (cond, label) => {
  console.log(`${cond ? "✓" : "✗"} ${label}`);
  if (!cond) failures++;
};

const pages = [
  "/", "/carte", "/mentions-legales", "/confidentialite", "/cgu", "/sitemap.xml", "/robots.txt", "/carte-mucho.pdf",
  "/favicon.ico", "/icon.png", "/apple-icon.png", "/manifest.webmanifest", "/og-image.jpg",
];
for (const p of pages) {
  const res = await fetch(BASE + p);
  ok(res.status === 200, `GET ${p} → ${res.status}`);
}
ok((await fetch(BASE + "/page-inexistante")).status === 404, "Page inconnue → 404");
{
  const r = await fetch(BASE + "/rgpd", { redirect: "manual" });
  ok(r.status === 308 && r.headers.get("location") === "/confidentialite", "/rgpd → /confidentialite");
  const sitemap = await (await fetch(BASE + "/sitemap.xml")).text();
  ok(["/carte", "/cgu", "/confidentialite", "/mentions-legales"].every((u) => sitemap.includes(u)), "Sitemap : toutes les pages");
  const h = (await fetch(BASE + "/")).headers;
  ok(h.get("strict-transport-security")?.includes("max-age=63072000"), "HTTPS forcé (HSTS)");
  ok(h.get("content-security-policy")?.includes("frame-ancestors 'none'"), "Politique de sécurité du contenu (CSP)");
  ok(h.get("x-content-type-options") === "nosniff" && h.get("x-frame-options") === "DENY", "En-têtes anti-sniffing et anti-iframe");
  ok(!h.get("x-powered-by"), "Technologie du serveur masquée");
  for (const p of ["/", "/carte", "/cgu", "/confidentialite", "/mentions-legales"]) {
    const html = await (await fetch(BASE + p)).text();
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    const desc = /<meta name="description" content="[^"]{50,}"/.test(html);
    ok(title.length > 10 && desc, `${p} : balise title et description (${title})`);
    ok(/property="og:image"/.test(html), `${p} : image de partage réseaux sociaux`);
  }
}

// Vidéos : fichiers servis par morceaux (indispensable pour Safari / iPhone)
const videoIds = [...readFileSync(new URL("../src/data/videos.ts", import.meta.url), "utf8").matchAll(/id: "([a-z-]+)"/g)].map((m) => m[1]);
{
  let allOk = videoIds.length > 0;
  for (const id of videoIds) {
    const [v, poster] = await Promise.all([fetch(`${BASE}/videos/${id}.mp4`, { headers: { Range: "bytes=0-1023" } }), fetch(`${BASE}/videos/${id}.webp`)]);
    if (v.status !== 206 || v.headers.get("content-type") !== "video/mp4" || poster.status !== 200) allOk = false;
  }
  ok(allOk, `Vidéos et images d'attente disponibles (${videoIds.length})`);
}

// Liens internes et ancres
{
  const page = await browser.newPage();
  const mp4Requests = [];
  page.on("request", (r) => r.url().endsWith(".mp4") && mp4Requests.push(r.url()));
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  ok(mp4Requests.length === 0, "Aucune vidéo téléchargée à l'ouverture de la page");
  const videoAttrs = await page.$$eval("#videos video", (vs) => vs.map((v) => v.muted && v.playsInline && v.preload === "none"));
  ok(videoAttrs.length === videoIds.length && videoAttrs.every(Boolean), "Vidéos muettes, lues dans la page, chargées à la demande");
  const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  ok(!links.some((h) => h === "#" || h === ""), "Aucun lien vide ou « # »");
  const anchors = [...new Set(links.filter((h) => h.startsWith("/#") || h.startsWith("#")))];
  for (const a of anchors) {
    const id = a.split("#")[1];
    ok(await page.$(`#${id}`), `Ancre ${a} présente`);
  }
  ok(links.includes("tel:+212661146309"), "Lien téléphone cliquable");
  ok(!links.includes("tel:+212523800833"), "Ancien fixe absent");
  ok(links.includes("tel:+212661146309"), "Lien portable cliquable");
  ok(links.some((h) => h.startsWith("https://wa.me/212661146309")), "Pastille WhatsApp");
  ok(links.includes("https://www.instagram.com/muchoseafoodrestaurant/"), "Lien Instagram officiel");
  ok(await page.$$eval("#carte [role=tab]", (t) => t.some((x) => x.textContent.includes("Pizzas"))), "Carte : catégorie Pizzas");
  ok(links.some((h) => h.startsWith("https://www.google.com/maps/dir/")), "Lien d'itinéraire");
  ok(links.some((h) => h.startsWith("https://glovoapp.com/")), "Lien Glovo");
  ok(links.includes("mailto:muchosfr@gmail.com"), "Lien e-mail muchosfr@gmail.com");
  const ld = await page.$eval('script[type="application/ld+json"]', (s) => JSON.parse(s.textContent));
  ok(ld.email === "muchosfr@gmail.com", "JSON-LD : e-mail du restaurant");
  ok(ld["@type"] === "Restaurant" && !ld.aggregateRating && !ld.review, "JSON-LD Restaurant sans note ni avis inventés");
  ok((await page.$$("h1")).length === 1, "Un seul H1");

  // Toutes les images se chargent
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await page.waitForTimeout(1500);
  const broken = await page.$$eval("img", (imgs) => imgs.filter((i) => !i.closest("[hidden]") && !i.closest("dialog")).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  ok(broken.length === 0, `Images chargées${broken.length ? " — cassées : " + broken.join(", ") : ""}`);
  const noAlt = await page.$$eval("img:not([alt])", (i) => i.length);
  ok(noAlt === 0, "Toutes les images ont un attribut alt");

  // Onglets de la carte au clavier
  await page.focus('[role="tab"][aria-selected="true"]');
  await page.keyboard.press("ArrowRight");
  ok((await page.getAttribute('[role="tab"][aria-selected="true"]', "id")) === "tab-entrees", "Onglets de la carte : flèche droite");

  // Visionneuse
  await page.click("#galerie li button");
  ok(await page.isVisible("dialog[open]"), "Visionneuse : ouverture");
  await page.keyboard.press("ArrowRight");
  ok((await page.textContent("dialog[open] [aria-live]")).includes("2 /"), "Visionneuse : photo suivante au clavier");
  await page.keyboard.press("Escape");
  ok(!(await page.$("dialog[open]")), "Visionneuse : fermeture avec Échap");

  ok(!(await page.$('a[href="/#reserver"], #reserver, form')), "Aucun formulaire ni bouton de réservation");
  ok(await page.$("#emporter"), "Bloc « À emporter » présent");
  ok(links.some((h) => h.startsWith("https://wa.me/212661146309?text=") && decodeURIComponent(h).includes("emporter")), "À emporter : WhatsApp prérempli");
  ok(await page.$$eval("#carte [role=tab]", (t) => t.some((x) => x.textContent.includes("Seafood Boil"))), "Carte : Seafood Boil");

  // Un seul bloc d'action : les seuls boutons-liens sont Itinéraire, WhatsApp, Appeler
  const ctas = await page.$$eval("main a.btn, header a.btn", (as) => [...new Set(as.map((a) => a.textContent.replace(/\(.*\)/, "").trim()))]);
  ok(ctas.every((t) => ["Itinéraire", "WhatsApp", "Appeler", "Découvrir la carte"].includes(t)), `Boutons d'action limités (${ctas.join(", ")})`);
  ok((await page.$$eval("#hero-title ~ div a.btn", (as) => as.map((a) => a.textContent.trim()))).join() === "Découvrir la carte", "Accueil : un seul bouton « Découvrir la carte »");
  const text = (await page.textContent("body")).toLowerCase();
  ok(!text.includes("livraison") && !text.includes("05 23 80 08 33"), "Ni « livraison » ni ancien numéro dans la page");
  ok(await page.$('footer a[href="/cgu"]') && await page.$('footer a[href="/confidentialite"]'), "Pied de page : CGU et Confidentialité & RGPD");

  // Bandeau cookies : seulement si un outil de mesure est configuré
  const banner = await page.$('[aria-labelledby="cookies-title"]');
  if (banner) {
    ok(!(await page.$('script[src*="googletagmanager"]')), "Analytics non chargé avant le choix");
    await page.click('[aria-labelledby="cookies-title"] >> text=Refuser');
    ok(!(await page.$('[aria-labelledby="cookies-title"]')), "Bandeau cookies : Refuser le ferme");
    await page.reload({ waitUntil: "networkidle" });
    ok(!(await page.$('[aria-labelledby="cookies-title"]')) && !(await page.$('script[src*="googletagmanager"]')), "Refus mémorisé, aucun analytics");
    await page.click("footer >> text=Gérer les cookies");
    await page.click('[aria-labelledby="cookies-title"] >> text=Accepter');
    ok(await page.$('script[src*="googletagmanager"]'), "Accepter charge Google Analytics");
  } else {
    ok(!(await page.$('script[src*="googletagmanager"]')), "Aucun outil de mesure configuré : pas de bandeau ni de cookie");
  }

  // Plan Google Maps autorisé par la CSP
  const csp = [];
  page.on("console", (m) => /Content Security Policy/i.test(m.text()) && csp.push(m.text()));
  await page.click("#contact button:has-text('Afficher le plan')");
  await page.waitForTimeout(1500);
  ok(await page.$("#contact iframe") && csp.length === 0, `Plan Google Maps chargé sans blocage CSP${csp.length ? " — " + csp[0] : ""}`);

  ok(errors.filter((e) => !/maps|google|ERR_|Failed to load resource/i.test(e)).length === 0, `Aucune erreur console${errors.length ? " — " + errors.join(" | ") : ""}`);
  await page.close();
}

// Téléphone : photos légères (variantes 480/828 px)
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const hero = await page.$eval("img[fetchpriority=high]", (i) => i.currentSrc);
  ok(/-828\.webp$/.test(hero), `Téléphone : photo d'accueil allégée (${hero.split("/").pop()})`);
  await page.close();
}

// Pages légales
for (const p of ["/cgu", "/confidentialite", "/mentions-legales"]) {
  const page = await browser.newPage();
  await page.goto(BASE + p, { waitUntil: "networkidle" });
  ok((await page.$$("h1")).length === 1 && (await page.$$("main h2")).length >= 3, `${p} : contenu présent`);
  await page.close();
}

// Mobile : menu, débordement horizontal
for (const width of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  for (const p of ["/", "/carte", "/cgu", "/confidentialite"]) {
    await page.goto(BASE + p, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(overflow <= 0, `${width}px ${p} : pas de débordement horizontal`);
  }
  if (width < 1024) {
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.click('button[aria-controls="menu-mobile"]');
    ok(await page.isVisible("#menu-mobile"), `${width}px : menu mobile ouvert`);
    await page.keyboard.press("Escape");
    ok(!(await page.isVisible("#menu-mobile")), `${width}px : menu mobile fermé avec Échap`);
  }
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} échec(s)` : "\nTous les tests sont passés.");
process.exit(failures ? 1 : 0);
