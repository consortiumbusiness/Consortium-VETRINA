"use client";

const METRICS = [
  { value: "+218%", label: "Tasso di conversione" },
  { value: "0.9s", label: "Tempo di caricamento" },
  { value: "99.9%", label: "Uptime piattaforma" },
];

export function CaseHistory() {
  return (
    <section id="case-history" className="gutter-x relative py-28 sm:py-40">
      {/* header */}
      <div className="flex flex-col justify-between gap-8 border-t pt-6 lg:flex-row lg:items-end">
        <div>
          <span className="label label-accent" data-rv>
            [ 02 ] — Proof of Concept
          </span>
          <h2
            className="display mt-6 max-w-[16ch] text-[clamp(2rem,5.5vw,5rem)] text-paper"
            data-split
          >
            settanta.eu, il nostro caso di studio vivente
          </h2>
        </div>
        <a
          href="https://settanta.eu"
          target="_blank"
          rel="noopener noreferrer"
          data-roll
          className="btn shrink-0"
        >
          Visita settanta.eu
        </a>
      </div>

      {/* editorial panel */}
      <div data-frame className="relative mt-16 overflow-hidden">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--line-2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--line-2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--line-2)]" />
          <span className="label ml-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
            https://settanta.eu
          </span>
        </div>
        <div className="grid grid-cols-1 gap-8 p-8 sm:p-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <p
              className="display text-[clamp(1.5rem,4vw,3.4rem)] text-paper"
              data-split
            >
              Estetica premium. Architettura headless. Conversione misurabile.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3 md:col-span-4" data-rv>
            {["Headless CMS", "Checkout ottimizzato", "Analytics", "SEO"].map(
              (t) => (
                <span key={t} className="border-b pb-2 text-[13px] text-t2">
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* metrics */}
      <div className="mt-16 grid grid-cols-1 gap-px border md:grid-cols-3">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-bg p-8">
            <div
              className="display text-[clamp(2.4rem,6vw,4.5rem)] text-paper"
              data-count={m.value}
            >
              {m.value}
            </div>
            <div className="label mt-4">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
