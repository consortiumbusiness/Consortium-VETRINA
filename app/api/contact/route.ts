import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * Endpoint dei lead dell'assessment.
 *
 * Flusso: form client -> questa route (validazione + honeypot + rate limit +
 * consenso GDPR) -> INSERT in `richieste_consulenza` sul Supabase condiviso.
 *
 * Non si rilegge la riga dopo l'insert (niente `.select()`): la policy RLS
 * lascia scrivere a chiunque ma leggere solo all'admin. Vedi
 * Risorse Condivise/Backend/LEGGIMI.md ("Trappola: il form richiedi").
 *
 * Se Supabase non è ancora configurato (env mancanti), il lead viene loggato
 * lato server — così nulla va perso durante il setup — e la richiesta riesce.
 */

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  consent?: boolean;
  score?: number;
  answers?: { stage?: string; profile?: string; goals?: string[] };
  /** Honeypot — deve restare vuoto per gli umani. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limit naïf per-istanza. Prima linea di difesa; si azzera a freddo.
// Per limiti più forti usare uno store condiviso (es. Upstash).
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida." },
      { status: 400 }
    );
  }

  // Honeypot: accetta e scarta in silenzio i bot che riempiono il campo nascosto.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const company = body.company?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() ?? "";

  if (!name || !company || !email) {
    return NextResponse.json(
      { ok: false, error: "Compila i campi obbligatori." },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Inserisci un'email valida." },
      { status: 422 }
    );
  }
  if (body.consent !== true) {
    return NextResponse.json(
      { ok: false, error: "Devi accettare l'informativa privacy." },
      { status: 422 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Troppe richieste. Riprova tra un minuto." },
      { status: 429 }
    );
  }

  // Riga pronta per `public.richieste_consulenza` (colonne in italiano).
  const richiesta = {
    nome: name,
    azienda: company,
    email,
    telefono: phone,
    punteggio: typeof body.score === "number" ? Math.round(body.score) : null,
    situazione: body.answers?.stage ?? "",
    profilo: body.answers?.profile ?? "",
    obiettivi: body.answers?.goals ?? [],
    fonte: "assessment-form",
  };

  if (!supabase) {
    // Supabase non ancora collegato — non perdere il lead.
    console.warn(
      "[contact] Supabase non configurato (env mancanti). Lead:",
      richiesta
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  // INSERT e basta: nessun .select() (un anonimo non può rileggere la riga).
  const { error } = await supabase
    .from("richieste_consulenza")
    .insert(richiesta);

  if (error) {
    console.error("[contact] insert Supabase fallito:", error.message);
    return NextResponse.json(
      { ok: false, error: "Errore nell'invio. Riprova tra poco." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
