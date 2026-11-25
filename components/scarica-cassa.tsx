"use client";

import { useEffect, useState } from "react";
import { CASSA_SCARICA } from "@/lib/cassa";

type Versione = { versione?: string; byte?: number };

/** Il modulo dell'area riservata: la parola d'ordine la controlla il Worker, che poi dà il file. */
export function ScaricaCassa() {
  const [v, setV] = useState<Versione | null>(null);
  const [errore, setErrore] = useState(false);
  const [invio, setInvio] = useState(false);

  useEffect(() => {
    setErrore(new URLSearchParams(window.location.search).has("errore"));
    if (!CASSA_SCARICA) return;
    fetch(`${CASSA_SCARICA}/versione`).then((r) => r.json()).then(setV).catch(() => setV({}));
  }, []);

  const mb = v?.byte ? `${Math.round(v.byte / 1_000_000)} MB` : "";

  return (
    <form
      method="POST"
      action={`${CASSA_SCARICA}/scarica`}
      onSubmit={() => { setInvio(true); setTimeout(() => setInvio(false), 8000); }}
      className="w-full max-w-sm space-y-6"
    >
      <div className="flex items-center gap-3">
        <span className="h-7 w-7 rounded-[9px] bg-paper" />
        <span className="text-[15px] font-semibold tracking-tight">
          Consortium<span className="text-accent-soft">.</span>
        </span>
      </div>
      <div>
        <h1 className="display text-4xl tracking-tight">Cassa</h1>
        <p className="label mt-3">
          Windows{v?.versione ? ` · versione ${v.versione}` : ""}{mb ? ` · ${mb}` : ""}
        </p>
      </div>
      <input
        name="parola"
        type="password"
        required
        autoComplete="off"
        autoFocus
        aria-label="Parola d'ordine"
        placeholder="Parola d'ordine"
        className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-paper outline-none placeholder:text-white/35 focus:border-accent"
      />
      {errore && <p className="text-sm text-accent-soft">Parola d&apos;ordine sbagliata</p>}
      <button
        type="submit"
        disabled={!CASSA_SCARICA || invio}
        className="h-12 w-full rounded-xl bg-accent font-semibold text-paper transition-opacity disabled:opacity-50"
      >
        {invio ? "Download in corso…" : "Scarica"}
      </button>
    </form>
  );
}
