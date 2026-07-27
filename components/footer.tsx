import Link from "next/link";

const COLUMNS = [
  {
    title: "Suite",
    links: [
      { label: "Fondamenta digitali", href: "#servizi" },
      { label: "Sviluppo su misura", href: "#servizi" },
      { label: "Business & Finance", href: "#servizi" },
    ],
  },
  {
    title: "Azienda",
    links: [
      { label: "Case History", href: "#case-history" },
      { label: "Il metodo", href: "#configuratore" },
      { label: "Contatti", href: "#configuratore" },
    ],
  },
  {
    title: "Legale",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="gutter-x relative overflow-hidden pb-14 pt-28">
      {/* closing statement */}
      <div className="border-t pt-10">
        <span className="label label-accent" data-rv>
          [ 04 ] — Start a conversation
        </span>
        <h2
          className="display mt-8 max-w-[14ch] text-[clamp(2.4rem,8vw,8rem)] text-paper"
          data-split
        >
          Ingegnerizziamo la tua crescita.
        </h2>
        <div className="mt-10">
          <a href="#configuratore" data-roll className="btn btn-solid">
            Avvia l&apos;assessment
          </a>
        </div>
      </div>

      {/* meta */}
      <div className="mt-28 grid grid-cols-1 gap-12 border-t pt-12 md:grid-cols-4">
        {/* brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-[9px] bg-paper" />
            <span className="text-[15px] font-semibold tracking-tight text-paper">
              Consortium<span className="text-accent-soft">.</span>
            </span>
          </div>
          <address className="mt-6 not-italic text-[13px] leading-relaxed text-t3">
            SETTANTA S.R.L.S.
            <br />
            Piazza della Concordia 7
            <br />
            80040 San Sebastiano al Vesuvio (NA)
            <br />
            P.IVA 10368711213
            <br />
            <a
              href="mailto:consortium@settanta.eu"
              className="transition-colors hover:text-paper"
            >
              consortium@settanta.eu
            </a>
            <br />
            <a
              href="tel:+393518562718"
              className="transition-colors hover:text-paper"
            >
              +39 351 8562718
            </a>
          </address>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="label label-accent mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) =>
                l.href.startsWith("/") ? (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-t2 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ) : (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] text-t2 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t pt-8 sm:flex-row sm:items-center">
        <p className="label normal-case tracking-normal">
          © {new Date().getFullYear()} Consortium Business Suite — SETTANTA S.R.L.S.
        </p>
        <a
          href="https://settanta.eu"
          target="_blank"
          rel="noopener noreferrer"
          data-roll
          className="label hover:text-paper"
        >
          Proof of Concept: settanta.eu →
        </a>
      </div>
    </footer>
  );
}
