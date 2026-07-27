"use client";

export function Hero() {
  return (
    <section
      id="top"
      data-hero
      className="gutter-x relative flex min-h-screen flex-col justify-between overflow-hidden pb-10 pt-32"
    >
      {/* abstract brand media: drifting squircle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10vw] top-1/2 -z-10 h-[70vh] w-[70vh] -translate-y-1/2"
      >
        <div className="spin-slow h-full w-full rounded-[26%] border border-[color:var(--line)] opacity-70" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[6vw] top-1/2 -z-10 h-[42vh] w-[42vh] -translate-y-1/2 rounded-[26%] bg-[radial-gradient(circle,rgba(124,42,59,0.18),transparent_70%)] blur-2xl"
      />

      {/* top label row */}
      <div className="flex items-start justify-between border-t pt-4">
        <span className="label" data-rv>
          00 — Consortium Business Suite
        </span>
        <span className="label hidden text-right sm:block" data-rv>
          Consulenza &amp; Sviluppo Digitale
          <br />a 360°
        </span>
      </div>

      {/* headline */}
      <div className="max-w-[20ch] py-8 text-[clamp(1.7rem,5vw,5.5rem)]">
        <h1 className="display text-paper" data-split>
          Cuciamo l&apos;infrastruttura digitale del tuo business.
        </h1>
        <h1 className="display mt-2 text-accent-soft" data-split>
          Su misura.
        </h1>
      </div>

      {/* bottom: intro + CTAs + meta */}
      <div>
        <div className="flex flex-col gap-8 border-t pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-pretty text-[15px] leading-relaxed text-t2" data-rv>
            Guidiamo professionisti, commercianti e PMI nella transizione al 2.0.
            Dalle fondamenta digitali allo sviluppo avanzato, fino al controllo di
            gestione: un&apos;unica suite per ingegnerizzare la tua crescita.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row" data-rv>
            <a href="#configuratore" data-roll className="btn btn-solid">
              Avvia l&apos;assessment
            </a>
            <a href="#case-history" data-roll className="btn">
              Scopri settanta.eu
            </a>
          </div>
        </div>

        {/* meta grid */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-6 md:grid-cols-4">
          <Meta k="Domini" v="Professionisti · Commercianti · PMI" />
          <Meta k="Discipline" v="Foundations · Development · Business & Finance" />
          <Meta k="Proof of Concept" v="settanta.eu — e-commerce reale" />
          <Meta k="Ente" v="SETTANTA S.R.L.S. · NA" />
        </div>
      </div>
    </section>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div data-rv>
      <div className="label label-accent mb-2">{k}</div>
      <div className="text-[13px] leading-snug text-t2">{v}</div>
    </div>
  );
}
