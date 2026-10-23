import { NextResponse } from "next/server";

/**
 * Réception des demandes de réservation.
 * Transmet la demande au webhook défini dans RESERVATION_WEBHOOK_URL
 * (Make, Zapier, n8n, Google Apps Script, Slack...). Sans webhook, répond 503 :
 * le formulaire bascule alors sur WhatsApp / SMS / téléphone.
 */
export async function POST(req: Request) {
  const webhook = process.env.RESERVATION_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const data = {
    name: str(body.name, 120),
    phone: str(body.phone, 30),
    date: str(body.date, 10),
    time: str(body.time, 5),
    guests: str(body.guests, 3),
    notes: str(body.notes, 500),
  };

  const valid =
    data.name.length >= 2 &&
    data.phone.replace(/\D/g, "").length >= 9 &&
    /^\d{4}-\d{2}-\d{2}$/.test(data.date) &&
    /^\d{2}:\d{2}$/.test(data.time) &&
    /^\d{1,3}$/.test(data.guests);
  if (!valid) {
    return NextResponse.json({ ok: false, reason: "invalid_fields" }, { status: 422 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "reservation_request", receivedAt: new Date().toISOString(), ...data }),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "upstream_error" }, { status: 502 });
  }
}
