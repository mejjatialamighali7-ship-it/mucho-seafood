"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks, telHref, deliveryUrl, fullAddress, takeawayWhatsappHref } from "@/lib/links";
import { restaurant } from "@/config/restaurant";

/**
 * En-tête : transparent au-dessus de la photo d'accueil (variant "overlay"),
 * puis fond ivoire translucide dès que l'on fait défiler la page.
 */
export function Header({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const textTone = solid ? "text-ink" : "text-ivory";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? "bg-ivory/90 shadow-[0_1px_0_rgba(19,25,43,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {!solid && !open ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-abyss/55 to-transparent"
        />
      ) : null}
      <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
        <div className={`relative z-[60] origin-left transition-transform duration-500 ${solid ? "scale-90" : ""}`}>
          <Logo size={58} priority />
        </div>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className={`flex items-center gap-9 text-[0.8rem] font-medium tracking-[0.14em] uppercase ${textTone}`}>
            {navLinks.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {deliveryUrl ? (
            <a
              href={deliveryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-1.5 px-3 text-[0.75rem] font-medium tracking-[0.14em] uppercase md:inline-flex ${textTone} link-underline`}
            >
              Livraison
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">(Glovo, nouvel onglet)</span>
            </a>
          ) : null}
          <Link href="/#contact" className={`btn hidden sm:inline-flex ${solid ? "btn-brand" : "btn-light"}`}>
            Nous trouver
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className={`relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
              open ? "text-ivory" : textTone
            }`}
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <div
        id="menu-mobile"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="pattern-damier fixed inset-0 z-[55] overflow-y-auto bg-abyss text-ivory lg:hidden"
      >
        <div className="flex min-h-full flex-col px-6 pt-28 pb-10">
          <nav aria-label="Navigation mobile">
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="hero-rise" style={{ ["--d" as string]: `${60 + i * 50}ms` }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-serif text-[2.4rem] leading-tight"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            <Link href="/#contact" onClick={() => setOpen(false)} className="btn btn-light w-full">
              Nous trouver
            </Link>
            {takeawayWhatsappHref ? (
              <a href={takeawayWhatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light w-full">
                À emporter sur WhatsApp
              </a>
            ) : null}
            {deliveryUrl ? (
              <a href={deliveryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light w-full">
                Commander sur {restaurant.delivery.provider}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : null}
            <a href={telHref} className="btn btn-ghost-light w-full">
              <Phone size={16} aria-hidden="true" />
              {restaurant.phone.value.display}
            </a>
            <p className="pt-4 text-center text-sm text-ivory/60">{fullAddress}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
