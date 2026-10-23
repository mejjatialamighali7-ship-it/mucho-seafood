"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { gaId, gaCookieSeconds, consentMaxAgeMs } from "@/config/analytics";

type Choice = "granted" | "denied";
const KEY = "mucho-consent";
export const OPEN_EVENT = "mucho:cookies";

function readChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as { v: Choice; t: number } | null;
    if (!saved || Date.now() - saved.t > consentMaxAgeMs) return null;
    return saved.v;
  } catch {
    return null;
  }
}

function saveChoice(v: Choice) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() }));
  } catch {
    /* navigation privée : le bandeau sera simplement redemandé */
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadAnalytics(id: string) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { cookie_expires: gaCookieSeconds, allow_google_signals: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

/**
 * Bandeau cookies (RGPD / loi 09-08). N'apparaît que si un outil de mesure est
 * configuré : rien n'est déposé avant le choix du visiteur, et « Refuser » est
 * aussi simple qu'« Accepter ». Le lien « Gérer les cookies » du pied de page le rouvre.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!gaId) return;
    const choice = readChoice();
    if (choice === "granted") loadAnalytics(gaId);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture du choix enregistré au montage
    else if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = useCallback((v: Choice) => {
    const before = readChoice();
    saveChoice(v);
    setOpen(false);
    if (v === "granted" && gaId) loadAnalytics(gaId);
    if (v === "denied" && before === "granted") {
      clearAnalyticsCookies();
      location.reload();
    }
  }, []);

  if (!gaId || !open) return null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-title"
      aria-describedby="cookies-text"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-ivory/15 bg-abyss p-5 text-ivory shadow-[0_18px_50px_rgba(11,22,49,0.45)] sm:bottom-6 sm:p-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <h2 id="cookies-title" className="font-serif text-2xl">
        Cookies de mesure d&apos;audience
      </h2>
      <p id="cookies-text" className="mt-2 text-sm leading-relaxed text-ivory/80">
        Avec votre accord, nous utilisons Google Analytics pour savoir combien de personnes visitent le site et quelles
        pages les intéressent. Aucune publicité. Vous pouvez changer d&apos;avis à tout moment.{" "}
        <Link href="/confidentialite#cookies" className="link-underline text-ivory">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => decide("denied")} className="btn btn-light w-full">
          Refuser
        </button>
        <button type="button" onClick={() => decide("granted")} className="btn btn-light w-full">
          Accepter
        </button>
      </div>
    </section>
  );
}

/** Bouton du pied de page pour rouvrir le bandeau. */
export function ManageCookiesButton({ className }: { className?: string }) {
  if (!gaId) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Gérer les cookies
    </button>
  );
}
