"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Check, Copy, MessageCircle, MessageSquareText, Phone, Send } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { smsHref, telHref, whatsappHref } from "@/lib/links";

type Fields = { name: string; phone: string; date: string; time: string; guests: string; notes: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", phone: "", date: "", time: "", guests: "2", notes: "" };

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Indiquez votre nom.";
  const digits = f.phone.replace(/[^\d]/g, "");
  if (digits.length < 9 || digits.length > 15) e.phone = "Indiquez un numéro joignable, par exemple 06 12 34 56 78.";
  if (!f.date) e.date = "Choisissez une date.";
  else if (f.date < todayISO()) e.date = "Cette date est déjà passée.";
  if (!f.time) e.time = "Choisissez un horaire.";
  return e;
}

export function buildMessage(f: Fields) {
  const lines = [
    `Bonjour Mucho, je souhaite réserver une table.`,
    `Nom : ${f.name.trim()}`,
    `Téléphone : ${f.phone.trim()}`,
    `Date : ${f.date ? formatDate(f.date) : ""}`,
    `Heure : ${f.time.replace(":", " h ")}`,
    `Nombre de personnes : ${f.guests}`,
  ];
  if (f.notes.trim()) lines.push(`Demande particulière : ${f.notes.trim()}`);
  lines.push("Merci de me confirmer la disponibilité.");
  return lines.join("\n");
}

/**
 * Parcours de réservation réel, sans faux système de disponibilités :
 *  - webhook configuré → la demande est transmise au restaurant par le serveur ;
 *  - sinon → message prérempli envoyé par WhatsApp (si numéro vérifié) ou SMS,
 *    avec appel et copie du message en solution de secours.
 */
export function ReservationForm({ webhookEnabled }: { webhookEnabled: boolean }) {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "channels" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const message = useMemo(() => buildMessage(f), [f]);
  const wa = whatsappHref(message);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`resa-${first}`)?.focus();
      return;
    }
    if (!webhookEnabled) {
      setStatus("channels");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      setStatus(res.ok ? "sent" : "channels");
    } catch {
      setStatus("channels");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const field =
    "mt-2 block w-full rounded-none border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/35 focus:border-mucho focus:ring-0 focus:outline-none aria-[invalid=true]:border-red-700";
  const label = "text-[0.7rem] font-medium tracking-[0.2em] text-muted uppercase";
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`resa-${k}-error`} className="mt-2 text-sm text-red-800">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Fields) => ({
    id: `resa-${k}`,
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `resa-${k}-error` : undefined,
  });

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col justify-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-mucho text-ivory">
          <Check size={26} aria-hidden="true" />
        </span>
        <h3 className="mt-8 text-4xl text-abyss">Demande transmise.</h3>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Merci {f.name.trim()}. Votre demande pour {f.guests} personne(s) le {formatDate(f.date)} à{" "}
          {f.time.replace(":", " h ")} a bien été envoyée. <strong className="font-medium text-ink">Elle sera
          confirmée</strong> lorsque le restaurant vous aura recontacté au {f.phone}.
        </p>
        <button type="button" onClick={() => { setF(empty); setStatus("idle"); }} className="btn btn-ghost-dark mt-10 self-start">
          Nouvelle demande
        </button>
      </div>
    );
  }

  if (status === "channels") {
    return (
      <div className="flex min-h-[28rem] flex-col">
        <h3 className="text-4xl text-abyss">Votre demande est prête.</h3>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Envoyez-la au restaurant en un geste : le message est déjà rédigé. La réservation sera confirmée par
          Mucho en retour.
        </p>
        <pre className="mt-6 max-h-56 overflow-auto bg-ivory-deep/70 p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap text-ink">
          {message}
        </pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-brand">
              <MessageCircle size={16} aria-hidden="true" />
              Envoyer sur WhatsApp
            </a>
          ) : (
            <a href={smsHref(message)} className="btn btn-brand">
              <MessageSquareText size={16} aria-hidden="true" />
              Envoyer par SMS
            </a>
          )}
          <a href={telHref} className="btn btn-ghost-dark">
            <Phone size={16} aria-hidden="true" />
            Appeler
          </a>
          <button type="button" onClick={copy} className="btn btn-ghost-dark">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? "Message copié" : "Copier le message"}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {copied ? "Message copié dans le presse-papiers." : ""}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link-underline mt-8 self-start text-sm text-muted">
          Modifier ma demande
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="resa-note" className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="resa-name" className={label}>
          Nom
        </label>
        <input {...a11y("name")} type="text" autoComplete="name" value={f.name} onChange={set("name")} placeholder="Votre nom" className={field} />
        {err("name")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="resa-phone" className={label}>
          Téléphone
        </label>
        <input
          {...a11y("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={f.phone}
          onChange={set("phone")}
          placeholder="06 12 34 56 78"
          className={field}
        />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="resa-date" className={label}>
          Date souhaitée
        </label>
        <input {...a11y("date")} type="date" min={todayISO()} value={f.date} onChange={set("date")} className={field} />
        {err("date")}
      </div>
      <div>
        <label htmlFor="resa-time" className={label}>
          Heure souhaitée
        </label>
        <select {...a11y("time")} value={f.time} onChange={set("time")} className={field}>
          <option value="">Choisir</option>
          {restaurant.reservation.timeSlots.map((t) => (
            <option key={t} value={t}>
              {t.replace(":", " h ")}
            </option>
          ))}
        </select>
        {err("time")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="resa-guests" className={label}>
          Nombre de personnes
        </label>
        <select {...a11y("guests")} value={f.guests} onChange={set("guests")} className={field}>
          {Array.from({ length: restaurant.reservation.maxGuests }, (_, i) => String(i + 1)).map((n) => (
            <option key={n} value={n}>
              {n} {n === "1" ? "personne" : "personnes"}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="resa-notes" className={label}>
          Demande particulière <span className="tracking-normal normal-case">(facultatif)</span>
        </label>
        <textarea
          id="resa-notes"
          rows={3}
          maxLength={500}
          value={f.notes}
          onChange={set("notes")}
          placeholder="Anniversaire, chaise bébé, allergie…"
          className={`${field} resize-none`}
        />
      </div>
      <div className="flex flex-col gap-5 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-brand w-full sm:w-auto sm:self-start">
          <Send size={16} aria-hidden="true" />
          {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
        </button>
        <p id="resa-note" className="text-sm leading-relaxed text-muted">
          Ceci est une <strong className="font-medium text-ink">demande de réservation</strong> : elle n&apos;est
          confirmée qu&apos;après la réponse du restaurant.
        </p>
      </div>
    </form>
  );
}
