"use client";

import { useState } from "react";

type Stato = "produzione" | "arrivo" | "disponibile";

const STATI: Record<Stato, string> = {
  produzione: "In produzione",
  arrivo: "In arrivo su App Store",
  disponibile: "Disponibile",
};

const FAMIGLIE = [
  "Tutti",
  "Commercio",
  "Ospitalità e servizi",
  "AI e automazione",
  "Gestione e conti",
] as const;

type Famiglia = (typeof FAMIGLIE)[number];

const PRODOTTI: {
  nome: string;
  per: string;
  testo: string;
  stato: Stato;
  famiglia: Exclude<Famiglia, "Tutti">;
}[] = [
  {
    nome: "Flow",
    per: "E-commerce e negozi",
    testo:
      "Vendite, incassi, spedizioni, magazzino e contabilità in un solo posto, collegato al negozio online.",
    stato: "produzione",
    famiglia: "Commercio",
  },
  {
    nome: "Cataloghi rivenditori",
    per: "Orologeria e lusso",
    testo:
      "Una piattaforma, più negozi: ogni rivenditore ha la sua vetrina, il suo pannello e il suo gestionale accendibile.",
    stato: "produzione",
    famiglia: "Commercio",
  },
  {
    nome: "App per rivenditori di orologi",
    per: "iPhone · Web",
    testo:
      "Magazzino, movimenti, conti e un marketplace riservato fra rivenditori, nativa su iPhone e sincronizzata sul web.",
    stato: "arrivo",
    famiglia: "Commercio",
  },
  {
    nome: "Prenota",
    per: "Hotel, suite, B&B",
    testo:
      "La prenotazione diretta sul tuo sito: disponibilità e tariffe dal channel manager, pagamento online, conferma immediata. Nessuna commissione sulle prenotazioni dirette, un solo calendario con i portali.",
    stato: "disponibile",
    famiglia: "Ospitalità e servizi",
  },
  {
    nome: "Agenda",
    per: "Barbieri, saloni, studi",
    testo:
      "Appuntamenti online per operatore e servizio, caparra con carta, promemoria su WhatsApp che chiudono i buchi in agenda e la scheda di ogni cliente con il suo storico.",
    stato: "disponibile",
    famiglia: "Ospitalità e servizi",
  },
  {
    nome: "Tavola",
    per: "Ristoranti e bar",
    testo:
      "Menu digitale col QR, ordini dal tavolo che arrivano in cucina, prenotazioni dei tavoli e una chiusura di serata che ha già fatto i conti.",
    stato: "disponibile",
    famiglia: "Ospitalità e servizi",
  },
  {
    nome: "Lounge",
    per: "Negozi e marchi",
    testo:
      "L'app fedeltà con la tessera nel telefono: punti, buoni, promozioni riservate, notifiche e un archivio solo per i soci. Il cliente torna perché ha un motivo per farlo.",
    stato: "disponibile",
    famiglia: "Commercio",
  },
  {
    nome: "Assistente",
    per: "Ogni attività",
    testo:
      "Un agente AI su WhatsApp ed email che risponde ai clienti, dice dov'è il pacco, prende le prenotazioni e passa la parola a una persona quando serve.",
    stato: "disponibile",
    famiglia: "AI e automazione",
  },
  {
    nome: "Studio",
    per: "E-commerce di moda",
    testo:
      "Foto prodotto generate con l'AI a partire dai tuoi capi: figura intera sul modello, varianti di colore coerenti in tutto il catalogo, senza un set fotografico a ogni stagione.",
    stato: "produzione",
    famiglia: "AI e automazione",
  },
  {
    nome: "Pannello",
    per: "Titolari e direzione",
    testo:
      "Il controllo di gestione in una schermata: margini, cassa, magazzino, marketing e scadenze aggiornati ogni mattina, con l'avviso quando un numero esce dai binari.",
    stato: "disponibile",
    famiglia: "Gestione e conti",
  },
  {
    nome: "Documenti",
    per: "Professionisti e PMI",
    testo:
      "Fatture, preventivi, DDT e prima nota in partita doppia: ogni documento scrive da solo la sua registrazione, dal computer o dal telefono.",
    stato: "produzione",
    famiglia: "Gestione e conti",
  },
  {
    nome: "Etichette",
    per: "Chi produce",
    testo:
      "Etichette di composizione e cura stampate in casa, bilingui, con il QR che porta alla scheda del capo. Il primo passo verso il passaporto digitale dei prodotti.",
    stato: "disponibile",
    famiglia: "Commercio",
  },
];

export function Prodotti() {
  const [famiglia, setFamiglia] = useState<Famiglia>("Tutti");
  const visibili = PRODOTTI.filter(
    (p) => famiglia === "Tutti" || p.famiglia === famiglia
  );

  return (
    <section id="prodotti" className="gutter-x relative py-28 sm:py-40">
      <div className="flex flex-col justify-between gap-8 border-t pt-6 lg:flex-row">
        <span className="label label-accent shrink-0" data-rv>
          [ 03 ] — Prodotti
        </span>
        <h2
          className="display max-w-[16ch] text-[clamp(2rem,5.5vw,5rem)] text-paper"
          data-split
        >
          Quello che costruiamo per uno, diventa un prodotto per tutti.
        </h2>
      </div>

      <div className="mt-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <p className="max-w-md text-[15px] leading-relaxed text-t2" data-rv>
          Dodici prodotti nati dai lavori veri. Si parte da una base già
          collaudata e la si cuce sull&apos;attività: tempi più corti, costi più
          bassi, nessun compromesso sul su misura.
        </p>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Famiglie di prodotti">
          {FAMIGLIE.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={famiglia === f}
              onClick={() => setFamiglia(f)}
              className={`label border px-3.5 py-2 transition-colors duration-300 ${
                famiglia === f
                  ? "border-paper bg-paper text-bg"
                  : "border-[color:var(--line-2)] hover:text-paper"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-px border bg-[color:var(--line)] md:grid-cols-2 lg:grid-cols-3">
        {visibili.map((p) => (
          <article
            key={p.nome}
            className="group relative flex min-h-[300px] flex-col justify-between bg-bg p-8 sm:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-sm text-t3">
                {String(PRODOTTI.indexOf(p) + 1).padStart(2, "0")}
              </span>
              <span className="label flex items-center gap-2 text-right">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    p.stato === "produzione"
                      ? "bg-accent-soft"
                      : p.stato === "disponibile"
                        ? "bg-paper/60"
                        : "border border-[color:var(--line-2)]"
                  }`}
                />
                {STATI[p.stato]}
              </span>
            </div>
            <div className="mt-14">
              <div className="label label-accent mb-3">{p.per}</div>
              <h3 className="display text-[clamp(1.7rem,2.8vw,2.5rem)] text-paper">
                {p.nome}
                <span className="block text-[0.42em] font-medium tracking-[-0.01em] text-t3">
                  by Consortium
                </span>
              </h3>
              <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-t2 transition-colors duration-500 group-hover:text-paper">
                {p.testo}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
        <p className="text-[14px] text-t2">
          Non vedi il tuo settore? Il su misura è il nostro mestiere.
        </p>
        <a href="#configuratore" data-roll className="btn btn-accent">
          Parliamo del tuo progetto
        </a>
      </div>
    </section>
  );
}
