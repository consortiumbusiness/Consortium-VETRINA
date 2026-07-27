"use client";

const SERVICES = [
  {
    n: "01",
    label: "Foundations",
    title: "Fondamenta digitali",
    body: "Le basi solide su cui costruire. Domini personalizzati, email aziendali professionali e Workspace collaborativi configurati a regola d'arte.",
    tags: ["Domini personalizzati", "Email aziendali pro", "Workspace & cloud"],
  },
  {
    n: "02",
    label: "Development",
    title: "Sviluppo su misura",
    body: "Siti vetrina, Company Profile digitali, e-commerce e software/app custom ingegnerizzati ad hoc per i tuoi obiettivi commerciali.",
    tags: ["Siti & Profile", "E-commerce", "App native", "Software custom"],
  },
  {
    n: "03",
    label: "Business & Finance",
    title: "Governo dei numeri",
    body: "Non solo tecnologia. Formazione contabile, controllo di gestione, ottimizzazione dei processi e analisi dati per decidere sui numeri, non sulle sensazioni.",
    tags: ["Formazione contabile", "Controllo di gestione", "Analisi dati"],
  },
];

export function Services() {
  return (
    <section id="servizi" className="gutter-x relative py-28 sm:py-40">
      {/* section header */}
      <div className="flex flex-col justify-between gap-8 border-t pt-6 lg:flex-row">
        <span className="label label-accent shrink-0" data-rv>
          [ 01 ] — Cosa facciamo
        </span>
        <h2
          className="display max-w-[14ch] text-[clamp(2rem,5.5vw,5rem)] text-paper"
          data-split
        >
          Una suite completa per la tua transizione al 2.0
        </h2>
      </div>

      {/* rows */}
      <div className="mt-20">
        {SERVICES.map((s) => (
          <article
            key={s.n}
            data-frame
            className="group relative grid grid-cols-1 gap-8 py-12 md:grid-cols-12 md:gap-6"
          >
            <div className="md:col-span-1">
              <span className="font-mono text-sm text-t3">{s.n}</span>
            </div>
            <div className="md:col-span-4">
              <div className="label label-accent mb-4">{s.label}</div>
              <h3
                className="display text-[clamp(1.7rem,3.5vw,3rem)] text-paper"
                data-split
              >
                {s.title}
              </h3>
            </div>
            <div className="md:col-span-5">
              <p className="max-w-md text-[15px] leading-relaxed text-t2" data-rv>
                {s.body}
              </p>
            </div>
            <div className="md:col-span-2">
              <ul className="space-y-3" data-rv>
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="border-b pb-2 text-[13px] text-t2 transition-colors group-hover:text-paper"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
