import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Cantiere } from "@/components/cantiere";
import { PROGETTI } from "@/lib/progetti";

export const metadata: Metadata = {
  title: "Lavori — Consortium Business Suite",
  description:
    "E-commerce, gestionali, cataloghi e strutture ricettive costruiti da Consortium Business Suite, e i cantieri aperti oggi.",
};

export default function Lavori() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <section data-hero className="gutter-x relative pb-16 pt-32">
        <div className="flex items-start justify-between border-t pt-4">
          <a href="/" className="label transition-colors hover:text-paper" data-rv>
            ← Consortium Business Suite
          </a>
          <span className="label" data-rv>
            {String(PROGETTI.length).padStart(2, "0")} lavori · cantiere aperto
          </span>
        </div>
        <h1
          className="display mt-16 max-w-[13ch] text-[clamp(2.6rem,9vw,9rem)] text-paper"
          data-split
        >
          Lavori e cantiere.
        </h1>
        <p className="mt-10 max-w-lg text-[17px] leading-relaxed text-t2" data-rv>
          Ogni progetto è firmato Consortium e lavora ogni giorno con dati veri.
          Qui c&apos;è tutto: cosa ci hanno chiesto, cosa abbiamo costruito, a
          che punto siamo.
        </p>
      </section>

      <section className="gutter-x relative pb-28">
        <div className="border-b">
          {PROGETTI.map((p) => (
            <a
              key={p.slug}
              href={`/lavori/${p.slug}`}
              className="group grid grid-cols-1 gap-4 border-t py-10 transition-colors duration-500 hover:bg-bg-2 md:grid-cols-12 md:items-end md:gap-6 md:px-4"
            >
              <span className="font-mono text-sm text-t3 md:col-span-1">{p.n}</span>
              <span className="display text-[clamp(2rem,5.5vw,4.8rem)] text-t2 transition-colors duration-500 group-hover:text-paper md:col-span-6">
                {p.nome}
              </span>
              <span className="md:col-span-4">
                <span className="label label-accent block">{p.settore}</span>
                <span className="mt-2 block text-[14px] text-t2">{p.stato}</span>
              </span>
              <span className="display hidden text-right text-[2.5rem] text-accent-soft transition-transform duration-500 group-hover:translate-x-1 md:col-span-1 md:block">
                →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="gutter-x relative pb-28 sm:pb-36">
        <Cantiere />
      </section>

      <Footer />
    </main>
  );
}
