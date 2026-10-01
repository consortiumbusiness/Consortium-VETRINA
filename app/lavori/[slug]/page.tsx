import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VisualeProgetto } from "@/components/lavori";
import { PROGETTI, progetto, type Fase } from "@/lib/progetti";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROGETTI.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = progetto((await params).slug);
  if (!p) return {};
  return {
    title: `${p.nome} — Lavori · Consortium Business Suite`,
    description: p.sommario,
    openGraph: { title: `${p.nome} · Consortium Business Suite`, description: p.sommario },
  };
}

const ETICHETTA: Record<Fase["stato"], string> = {
  fatto: "Fatto",
  "in-corso": "In corso",
  prossimo: "Prossimo",
};

export default async function PaginaProgetto({ params }: Props) {
  const p = progetto((await params).slug);
  if (!p) notFound();
  const i = PROGETTI.indexOf(p);
  const dopo = PROGETTI[(i + 1) % PROGETTI.length];
  const fatte = p.fasi.filter((f) => f.stato === "fatto").length;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* apertura */}
      <section data-hero className="gutter-x relative pb-10 pt-32">
        <div className="flex items-start justify-between border-t pt-4">
          <a href="/lavori" className="label transition-colors hover:text-paper" data-rv>
            ← Tutti i lavori
          </a>
          <span className="label" data-rv>
            Lavoro {p.n} / {String(PROGETTI.length).padStart(2, "0")}
          </span>
        </div>

        <div className="label label-accent mt-16" data-rv>
          {p.settore}
        </div>
        <h1
          className="display mt-6 max-w-[16ch] text-[clamp(2.6rem,9vw,9rem)] text-paper"
          data-split
        >
          {p.nome}
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t pt-8 lg:grid-cols-12">
          <p
            className="max-w-xl text-pretty text-[17px] leading-relaxed text-t2 lg:col-span-6"
            data-rv
          >
            {p.sommario}
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:col-span-5 lg:col-start-8">
            <Meta k="Luogo" v={p.luogo} />
            <Meta k="Stato" v={p.stato} />
            <Meta k="Avanzamento" v={`${fatte} fasi su ${p.fasi.length}`} />
            <div data-rv>
              <div className="label label-accent mb-2">Online</div>
              {p.link ? (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] leading-snug text-paper underline decoration-[color:var(--line-2)] underline-offset-4 transition-colors hover:decoration-paper"
                >
                  {p.link.href.replace("https://", "")} ↗
                </a>
              ) : (
                <div className="text-[13px] leading-snug text-t2">
                  Area riservata del cliente
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* il lavoro, dal vivo */}
      <section className="gutter-x relative pb-10">
        <VisualeProgetto tipo={p.visual} />
      </section>

      {/* la richiesta */}
      <section className="gutter-x relative py-28 sm:py-36">
        <div className="grid grid-cols-1 gap-8 border-t pt-6 lg:grid-cols-12">
          <span className="label label-accent lg:col-span-3" data-rv>
            [ 01 ] — La richiesta
          </span>
          <p
            className="text-balance text-[clamp(1.4rem,2.6vw,2.4rem)] font-normal leading-[1.2] tracking-[-0.02em] text-paper lg:col-span-9"
            data-split
          >
            {p.richiesta}
          </p>
        </div>
      </section>

      {/* cosa abbiamo fatto */}
      <section className="gutter-x relative pb-28 sm:pb-36">
        <div className="flex flex-col justify-between gap-8 border-t pt-6 lg:flex-row">
          <span className="label label-accent shrink-0" data-rv>
            [ 02 ] — Cosa abbiamo costruito
          </span>
          <h2
            className="display max-w-[14ch] text-[clamp(2rem,5vw,4.5rem)] text-paper"
            data-split
          >
            Un pezzo alla volta, tutto collegato.
          </h2>
        </div>
        <div className="mt-16">
          {p.capitoli.map((c, k) => (
            <article
              key={c.titolo}
              className="group grid grid-cols-1 gap-4 border-t py-9 md:grid-cols-12 md:gap-6"
            >
              <span className="font-mono text-sm text-t3 md:col-span-1">
                {String(k + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(1.25rem,2vw,1.7rem)] font-semibold leading-tight tracking-[-0.02em] text-paper md:col-span-4">
                {c.titolo}
              </h3>
              <p className="max-w-xl text-[15px] leading-relaxed text-t2 transition-colors duration-500 group-hover:text-paper md:col-span-5">
                {c.testo}
              </p>
              <div className="md:col-span-2 md:text-right">
                <Badge stato={c.stato ?? "fatto"} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* le fasi */}
      <section className="gutter-x relative pb-28 sm:pb-36">
        <div className="grid grid-cols-1 gap-8 border-t pt-6 lg:grid-cols-12">
          <span className="label label-accent lg:col-span-3" data-rv>
            [ 03 ] — Le fasi
          </span>
          <ol className="lg:col-span-9">
            {p.fasi.map((f, k) => (
              <li
                key={f.titolo}
                className="relative grid grid-cols-[22px_1fr] gap-x-5 gap-y-1.5 pb-8 sm:gap-5 sm:grid-cols-[22px_160px_1fr_auto] sm:items-baseline"
              >
                {k < p.fasi.length - 1 ? (
                  <span
                    aria-hidden
                    className={`absolute left-[5px] top-4 h-full w-px ${
                      f.stato === "fatto" ? "bg-paper/40" : "bg-[color:var(--line)]"
                    }`}
                  />
                ) : null}
                <span
                  aria-hidden
                  className={`relative mt-1.5 h-[11px] w-[11px] rounded-full ${
                    f.stato === "fatto"
                      ? "bg-paper"
                      : f.stato === "in-corso"
                        ? "cantiere-ora bg-accent-soft"
                        : "border border-[color:var(--line-2)] bg-bg"
                  }`}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-t3 sm:col-auto">
                  {f.quando}
                </span>
                <span
                  className={`col-start-2 text-[17px] tracking-[-0.01em] sm:col-start-auto ${
                    f.stato === "prossimo" ? "text-t3" : "text-paper"
                  }`}
                >
                  {f.titolo}
                </span>
                <span className="col-start-2 sm:col-start-auto">
                  <Badge stato={f.stato} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* dentro il progetto */}
      <section className="gutter-x relative pb-28 sm:pb-36">
        <div className="grid grid-cols-1 gap-8 border-t pt-6 lg:grid-cols-12">
          <span className="label label-accent lg:col-span-3" data-rv>
            [ 04 ] — Dentro il progetto
          </span>
          <ul className="flex flex-wrap gap-2 lg:col-span-9" data-rv>
            {p.voci.map((v) => (
              <li
                key={v}
                className="border border-[color:var(--line-2)] px-4 py-2.5 text-[14px] text-t2"
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* prossimo lavoro */}
      <section className="gutter-x relative">
        <a href={`/lavori/${dopo.slug}`} className="group block border-y py-16 sm:py-24">
          <span className="label">Prossimo lavoro · {dopo.settore}</span>
          <div className="mt-6 flex items-end justify-between gap-8">
            <span className="display text-[clamp(2.4rem,8vw,7.5rem)] text-t3 transition-colors duration-500 group-hover:text-paper">
              {dopo.nome}
            </span>
            <span className="display hidden text-[clamp(2rem,5vw,4.5rem)] text-accent-soft transition-transform duration-500 group-hover:translate-x-2 sm:block">
              →
            </span>
          </div>
        </a>
      </section>

      <Footer />
    </main>
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

function Badge({ stato }: { stato: Fase["stato"] }) {
  return (
    <span
      className={`label inline-flex items-center gap-2 ${
        stato === "fatto" ? "" : stato === "in-corso" ? "text-accent2" : "text-t4"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          stato === "fatto"
            ? "bg-paper/70"
            : stato === "in-corso"
              ? "cantiere-ora bg-accent-soft"
              : "border border-[color:var(--line-2)]"
        }`}
      />
      {ETICHETTA[stato]}
    </span>
  );
}
