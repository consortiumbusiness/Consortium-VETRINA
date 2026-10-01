import { CANTIERE, FASI_CANTIERE } from "@/lib/progetti";

/* Il lavoro in corso: una scheda per cantiere, con la fase segnata su quattro. */
export function Cantiere({ titolo = true }: { titolo?: boolean }) {
  return (
    <div id="cantiere" className={titolo ? "mt-32 border-t pt-12" : ""}>
      {titolo ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-1">
            <span className="font-mono text-sm text-t3">—</span>
          </div>
          <div className="md:col-span-6">
            <div className="label label-accent mb-4">In cantiere · ottobre 2026</div>
            <h3
              className="display text-[clamp(1.9rem,4vw,3.6rem)] text-paper"
              data-split
            >
              Quello che stiamo costruendo adesso.
            </h3>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="max-w-md text-[15px] leading-relaxed text-t2" data-rv>
              Non aspettiamo la fine per mostrare il lavoro. Questi sono i
              cantieri aperti, ognuno con la fase in cui si trova oggi.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-16 grid grid-cols-1 gap-px border bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-4">
        {CANTIERE.map((c) => {
          const corpo = (
            <>
              <div className="flex items-start justify-between gap-4">
                <span className="label label-accent">{c.area}</span>
                {c.slug ? (
                  <span className="label transition-colors group-hover:text-paper">
                    Apri →
                  </span>
                ) : null}
              </div>
              <h4 className="mt-8 text-[19px] font-semibold leading-tight tracking-[-0.02em] text-paper">
                {c.titolo}
              </h4>
              <p className="mt-3 text-[13.5px] leading-relaxed text-t2">{c.testo}</p>

              <div className="mt-auto pt-10">
                <div className="grid grid-cols-4 gap-1">
                  {FASI_CANTIERE.map((f, i) => (
                    <span
                      key={f}
                      className={`h-[3px] ${
                        i < c.fase
                          ? "bg-paper/70"
                          : i === c.fase
                            ? "cantiere-ora bg-accent-soft"
                            : "bg-[color:var(--line)]"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper">
                    {FASI_CANTIERE[c.fase]}
                  </span>
                  <span className="text-right text-[12px] text-t3">{c.nota}</span>
                </div>
              </div>
            </>
          );
          const cls =
            "group relative flex min-h-[320px] flex-col bg-bg p-7 transition-colors duration-500";
          return c.slug ? (
            <a key={c.titolo} href={`/lavori/${c.slug}`} className={`${cls} hover:bg-bg-2`}>
              {corpo}
            </a>
          ) : (
            <div key={c.titolo} className={cls}>
              {corpo}
            </div>
          );
        })}
        {/* caselle vuote fino a riempire la riga, se no si vede il fondo della griglia */}
        {Array.from({ length: (4 - (CANTIERE.length % 4)) % 4 }).map((_, i) => (
          <div key={i} aria-hidden className="hidden bg-bg sm:block" />
        ))}
      </div>
    </div>
  );
}
