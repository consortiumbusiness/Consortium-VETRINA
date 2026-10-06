"use client";

/** I testi dell'apertura: compaiono sull'ultimo fotogramma dell'F-22 (intro-f22.tsx). */
export function Hero() {
  return (
    <div className="gutter-x flex h-full flex-col justify-between pb-[max(1.5rem,4svh)] pt-24 md:pt-32">
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
            <a href="#lavori" data-roll className="btn">
              Guarda i lavori
            </a>
          </div>
        </div>

        {/* meta grid */}
        <div className="mt-10 hidden grid-cols-2 gap-x-6 gap-y-6 border-t pt-6 md:grid md:grid-cols-4 [@media(max-height:780px)]:hidden">
          <Meta k="Domini" v="Professionisti · Commercianti · PMI" />
          <Meta k="Discipline" v="Foundations · Development · Business & Finance" />
          <Meta k="Lavori" v="E-commerce · Gestionali · Hospitality · App" />
          <Meta k="Ente" v="SETTANTA S.R.L.S. · NA" />
        </div>
      </div>
    </div>
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
