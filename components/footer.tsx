import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const COLUMNS = [
  {
    title: "Suite",
    links: [
      { label: "Digital Foundations", href: "#servizi" },
      { label: "Digital Development", href: "#servizi" },
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
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/[0.03]">
              <span className="h-3.5 w-3.5 rounded-[5px] bg-white" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Consortium
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
            Business Suite. Cuciamo l&apos;infrastruttura digitale del tuo
            business, su misura.
          </p>
          <address className="mt-5 not-italic text-xs leading-relaxed text-white/35">
            SETTANTA S.R.L.S.
            <br />
            Piazza della Concordia 7, 80040 San Sebastiano al Vesuvio (NA)
            <br />
            P.IVA 10368711213
            <br />
            <a
              href="mailto:consortium@settanta.eu"
              className="transition-colors hover:text-white/70"
            >
              consortium@settanta.eu
            </a>
            {" · "}
            <a
              href="tel:+393518562718"
              className="transition-colors hover:text-white/70"
            >
              +39 351 8562718
            </a>
          </address>
        </div>

        {/* Link columns */}
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="eyebrow mb-4">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Legal column */}
        <div>
          <h4 className="eyebrow mb-4">Legale</h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/cookie-policy"
                className="inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} Consortium Business Suite — SETTANTA
          S.R.L.S. Tutti i diritti riservati.
        </p>
        <a
          href="https://settanta.eu"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-xs text-white/45 transition-colors hover:text-white"
        >
          Proof of Concept: settanta.eu
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
