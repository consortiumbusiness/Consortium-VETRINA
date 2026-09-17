"use client";

const PRODOTTI = [
  {
    nome: "Flow",
    per: "E-commerce e negozi",
    testo:
      "Vendite, incassi, spedizioni, magazzino e contabilità in un solo posto, collegato al negozio online.",
    stato: "In produzione",
    vivo: true,
  },
  {
    nome: "Cataloghi rivenditori",
    per: "Orologeria e lusso",
    testo:
      "Una piattaforma, più negozi: ogni rivenditore ha la sua vetrina, il suo pannello e il suo gestionale accendibile.",
    stato: "In produzione",
    vivo: true,
  },
  {
    nome: "App per rivenditori di orologi",
    per: "iPhone · Web",
    testo:
      "Magazzino, movimenti, conti e un marketplace riservato fra rivenditori, nativa su iPhone e sincronizzata sul web.",
    stato: "In arrivo su App Store",
    vivo: false,
  },
];

export function Prodotti() {
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

      <div className="mt-20 grid grid-cols-1 gap-px border bg-[color:var(--line)] md:grid-cols-3">
        {PRODOTTI.map((p, i) => (
          <article
            key={p.nome}
            className="group relative flex min-h-[300px] flex-col justify-between bg-bg p-8 sm:p-12"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-sm text-t3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="label flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    p.vivo ? "bg-accent-soft" : "border border-[color:var(--line-2)]"
                  }`}
                />
                {p.stato}
              </span>
            </div>
            <div className="mt-16">
              <div className="label label-accent mb-3">{p.per}</div>
              <h3 className="display text-[clamp(1.8rem,3.2vw,2.8rem)] text-paper">
                {p.nome}
                <span className="block text-[0.42em] font-medium tracking-[-0.01em] text-t3">
                  by Consortium
                </span>
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-t2 transition-colors duration-500 group-hover:text-paper">
                {p.testo}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
