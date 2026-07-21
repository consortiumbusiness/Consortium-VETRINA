import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase per il lato server (route API).
 *
 * Usiamo la chiave **anon**: le richieste dal form arrivano come ruolo `anon`
 * e la policy RLS `consulenza_insert` permette a chiunque di INSERIRE una riga
 * in `richieste_consulenza`. La lettura resta vietata a tutti tranne l'admin.
 *
 * Per questo dopo l'insert NON si rilegge mai la riga (niente `.select()`):
 * un anonimo puo' scrivere ma non rileggere. È lo stesso schema dei `leads`
 * dei dealer, documentato in Risorse Condivise/Backend/LEGGIMI.md.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** `null` finché le variabili d'ambiente non sono configurate. */
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, { auth: { persistSession: false } })
    : null;
