// Tests fonctionnels de bout en bout.
// Usage : npm run build && npm start (dans un autre terminal), puis
//         BASE_URL=http://localhost:3000 npm run test:e2e
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
let failures = 0;
const ok = (cond, label) => {
  console.log(`${cond ? "✓" : "✗"} ${label}`);
  if (!cond) failures++;
};

const pages = ["/", "/carte", "/mentions-legales", "/confidentialite", "/sitemap.xml", "/robots.txt"];
for (const p of pages) {
  const res = await fetch(BASE + p);
  ok(res.status === 200, `GET ${p} → ${res.status}`);
}
ok((await fetch(BASE + "/page-inexistante")).status === 404, "Page inconnue → 404");

// Liens internes et ancres
{
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  ok(!links.some((h) => h === "#" || h === ""), "Aucun lien vide ou « # »");
  const anchors = [...new Set(links.filter((h) => h.startsWith("/#") || h.startsWith("#")))];
  for (const a of anchors) {
    const id = a.split("#")[1];
    ok(await page.$(`#${id}`), `Ancre ${a} présente`);
  }
  ok(links.includes("tel:+212661146309"), "Lien téléphone cliquable");
  ok(links.some((h) => h.startsWith("https://www.google.com/maps/dir/")), "Lien d'itinéraire");
  ok(links.some((h) => h.startsWith("https://glovoapp.com/")), "Lien de livraison Glovo");
  const ld = await page.$eval('script[type="application/ld+json"]', (s) => JSON.parse(s.textContent));
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

  // Réservation : validation puis message prérempli
  await page.click('form button[type="submit"]');
  ok(await page.isVisible("#resa-name-error"), "Réservation : erreurs affichées si champs vides");
  await page.fill("#resa-name", "Test Mucho");
  await page.fill("#resa-phone", "06 12 34 56 78");
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  await page.fill("#resa-date", tomorrow);
  await page.selectOption("#resa-time", "20:00");
  await page.selectOption("#resa-guests", "4");
  await page.click('form button[type="submit"]');
  const send = await page.waitForSelector('a[href^="sms:"], a[href^="https://wa.me/"]', { timeout: 3000 }).catch(() => null);
  const href = send ? await send.getAttribute("href") : "";
  ok(href && decodeURIComponent(href).includes("Test Mucho") && decodeURIComponent(href).includes("4"), "Réservation : message prérempli (SMS/WhatsApp)");

  ok(errors.length === 0, `Aucune erreur console${errors.length ? " — " + errors.join(" | ") : ""}`);
  await page.close();
}

// Mobile : menu, débordement horizontal
for (const width of [360, 390, 768, 1024, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  for (const p of ["/", "/carte"]) {
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

// API de réservation
{
  const res = await fetch(BASE + "/api/reservation", { method: "POST", body: "{}", headers: { "Content-Type": "application/json" } });
  ok([503, 422].includes(res.status), `API réservation sans webhook ou invalide → ${res.status}`);
}

await browser.close();
console.log(failures ? `\n${failures} échec(s)` : "\nTous les tests sont passés.");
process.exit(failures ? 1 : 0);
