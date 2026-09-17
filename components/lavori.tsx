"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Anima solo quando il riquadro è a schermo, e mai con reduced-motion. */
function useInVista<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [attivo, setAttivo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setAttivo(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, attivo };
}

function useTick(attivo: boolean, ms: number, n: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!attivo) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [attivo, ms, n]);
  return i;
}

export function Lavori() {
  return (
    <section id="lavori" className="gutter-x relative py-28 sm:py-40">
      <div className="flex flex-col justify-between gap-8 border-t pt-6 lg:flex-row lg:items-end">
        <div>
          <span className="label label-accent" data-rv>
            [ 02 ] — Lavori
          </span>
          <h2
            className="display mt-6 max-w-[15ch] text-[clamp(2rem,5.5vw,5rem)] text-paper"
            data-split
          >
            Software in produzione, non presentazioni.
          </h2>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-t2" data-rv>
          Negozi online, gestionali e cataloghi che lavorano ogni giorno su
          ordini, magazzini e conti veri. Qui sotto, tre di questi.
        </p>
      </div>

      <LavoroSettanta />
      <LavoroFlow />
      <LavoroOrologi />
    </section>
  );
}

/* ------------------------------------------------------------------------ */

function Intestazione({
  n,
  settore,
  titolo,
  testo,
  voci,
  link,
}: {
  n: string;
  settore: string;
  titolo: string;
  testo: string;
  voci: string[];
  link?: { href: string; label: string };
}) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-1">
        <span className="font-mono text-sm text-t3">{n}</span>
      </div>
      <div className="md:col-span-5">
        <div className="label label-accent mb-4">{settore}</div>
        <h3
          className="display text-[clamp(1.9rem,4vw,3.6rem)] text-paper"
          data-split
        >
          {titolo}
        </h3>
      </div>
      <div className="md:col-span-4">
        <p className="max-w-md text-[15px] leading-relaxed text-t2" data-rv>
          {testo}
        </p>
        {link ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-roll
            className="btn mt-8"
          >
            {link.label}
          </a>
        ) : null}
      </div>
      <div className="md:col-span-2">
        <ul className="space-y-3" data-rv>
          {voci.map((v) => (
            <li key={v} className="border-b pb-2 text-[13px] text-t2">
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---- 01 · settanta.eu ---------------------------------------------------- */

function LavoroSettanta() {
  const schermo = useRef<HTMLDivElement>(null);
  const { ref, attivo } = useInVista<HTMLDivElement>();
  const telefono = useTick(attivo, 3200, 2);

  useEffect(() => {
    const el = schermo.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const tw = gsap.fromTo(
      el.querySelectorAll("[data-par]"),
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      }
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <article className="mt-24 border-t pt-12">
      <Intestazione
        n="01"
        settore="E-commerce · Moda sartoriale"
        titolo="settanta.eu"
        testo="Il negozio online di un marchio di abbigliamento sartoriale con boutique fisica. Catalogo, schede prodotto, lounge clienti su WhatsApp e un checkout collegato al gestionale, che evade e spedisce gli ordini da solo."
        voci={[
          "Shopify su misura",
          "Catalogo e varianti",
          "Lounge WhatsApp",
          "Spedizioni automatiche",
        ]}
        link={{ href: "https://settanta.eu", label: "Visita il sito" }}
      />

      <div
        ref={ref}
        className="relative mt-16 grid grid-cols-1 items-end gap-6 md:grid-cols-12"
      >
        {/* browser */}
        <div data-frame className="relative md:col-span-9">
          <BarraBrowser url="settanta.eu" />
          <div
            ref={schermo}
            className="relative aspect-[1440/850] overflow-hidden bg-white"
          >
            <div data-par className="absolute inset-[-5%_0]">
              <Image
                src="/lavori/settanta-desk.jpg"
                alt="settanta.eu, la home del negozio online"
                fill
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* telefono */}
        <div className="relative mx-auto w-[62%] max-w-[260px] md:col-span-3 md:mb-[-3rem] md:w-full">
          <Telefono>
            {["/lavori/settanta-mob.jpg", "/lavori/settanta-prod-mob.jpg"].map(
              (src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={
                    i === 0
                      ? "settanta.eu da telefono, la home"
                      : "settanta.eu da telefono, la scheda di un capo"
                  }
                  fill
                  sizes="260px"
                  className="object-cover object-top transition-opacity duration-1000"
                  style={{ opacity: telefono === i ? 1 : 0 }}
                />
              )
            )}
          </Telefono>
        </div>
      </div>

      {/* seconda schermata */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-12">
        <div className="md:col-span-4 md:col-start-2">
          <p className="label leading-relaxed" data-rv>
            Il catalogo si cura dal gestionale: foto, taglie e colori collegati
            arrivano sul sito senza toccare Shopify a mano.
          </p>
        </div>
        <div data-frame className="relative md:col-span-7">
          <BarraBrowser url="settanta.eu/collections/all" />
          <div className="relative aspect-[1440/850] overflow-hidden bg-white">
            <Image
              src="/lavori/settanta-coll.jpg"
              alt="settanta.eu, il catalogo dei prodotti"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function BarraBrowser({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b bg-bg-2 px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-[color:var(--line-2)]" />
      <span className="h-2 w-2 rounded-full bg-[color:var(--line-2)]" />
      <span className="h-2 w-2 rounded-full bg-[color:var(--line-2)]" />
      <span className="label ml-3 flex items-center gap-2 normal-case tracking-[0.06em]">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
        {url}
      </span>
    </div>
  );
}

function Telefono({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[34px] border border-[color:var(--line-2)] bg-[#050506] p-[7px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="relative aspect-[390/795] overflow-hidden rounded-[27px] bg-white">
        {children}
      </div>
    </div>
  );
}

/* ---- 02 · Flow ----------------------------------------------------------- */

const FLOW_NAV = [
  "Home",
  "Andamento",
  "Foglio giornata",
  "Movimenti",
  "Spedizioni",
  "Pacchi pronti",
  "Catalogo",
  "Scadenze",
  "Sospesi",
  "Progressivo",
  "Contabilità",
  "Backup",
];

const FASI = [
  { t: "Da confezionare", s: "si stampano le carte e si spara" },
  { t: "Pronti a partire", s: "aspettano il corriere" },
  { t: "In viaggio", s: "lo dice il tracking" },
  { t: "Registro", s: "consegnato e spuntato" },
];

/* Ordini dimostrativi: numeri e città inventati, nessun cliente vero. */
const ALTRI = [
  ["#10482", "Milano", "BRT"],
  ["#10479", "Bari", "GLS"],
  ["#10477", "Torino", "BRT"],
  ["#10471", "Roma", "SDA"],
  ["#10466", "Firenze", "GLS"],
  ["#10463", "Palermo", "BRT"],
  ["#10458", "Verona", "SDA"],
];
const GIA = [2, 3, 1, 1]; // quanti pacchi fermi per colonna, oltre a quello che si muove

function LavoroFlow() {
  const { ref, attivo } = useInVista<HTMLDivElement>();
  const passo = useTick(attivo, 2200, 4);
  const [conteggio, setConteggio] = useState([3, 3, 1, 1]);

  useEffect(() => {
    setConteggio(GIA.map((g, i) => g + (i === passo ? 1 : 0)));
  }, [passo]);

  let k = 0;
  return (
    <article className="mt-32 border-t pt-12">
      <Intestazione
        n="02"
        settore="Gestionale · E-commerce e negozio"
        titolo="Flow by Consortium"
        testo="Il sistema che manda avanti il negozio: di notte raccoglie vendite e incassi, al mattino il foglio della giornata è già compilato. Evade gli ordini, compra le etichette, segue ogni pacco fino alla consegna e tiene la contabilità in partita doppia."
        voci={[
          "Raccolta notturna",
          "Foglio giornata",
          "Etichette e tracking",
          "Carico da fattura",
          "Partita doppia",
          "Accessi per ruolo",
        ]}
      />

      <div
        ref={ref}
        data-frame
        className="relative mt-16 overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="flex min-h-[520px] bg-[#0d0d0f] text-[#f0efe8]">
          {/* barra laterale */}
          <aside className="hidden w-[210px] shrink-0 border-r border-white/[0.07] bg-[#131316] px-3 py-5 md:block">
            <div className="mb-6 flex items-center gap-2.5 px-2">
              <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[#4ade80] text-[14px] font-bold text-[#0d0d0f]">
                F
              </span>
              <span className="text-[13px] font-semibold">Flow</span>
              <span className="text-[10px] text-[#5a5955]">by Consortium</span>
            </div>
            {FLOW_NAV.map((v) => (
              <div
                key={v}
                className={`mb-0.5 flex items-center justify-between rounded-[8px] px-2.5 py-[7px] text-[12.5px] ${
                  v === "Spedizioni"
                    ? "bg-[#222228] text-[#f0efe8]"
                    : "text-[#9c9a92]"
                }`}
              >
                {v}
                {v === "Spedizioni" ? (
                  <span className="rounded-full bg-[#4ade80] px-1.5 text-[10px] font-semibold text-[#0d0d0f]">
                    {conteggio[0]}
                  </span>
                ) : null}
              </div>
            ))}
          </aside>

          {/* spedizioni */}
          <div className="min-w-0 flex-1 p-4 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.07] pb-5">
              <div>
                <div className="text-[20px] font-semibold tracking-tight">
                  Spedizioni
                </div>
                <div className="text-[12px] text-[#9c9a92]">
                  dall&apos;ordine al pacco consegnato
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/[0.12] px-3 py-1.5 font-mono text-[11px] text-[#9c9a92]">
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-[#4ade80] ${
                    attivo ? "animate-pulse" : ""
                  }`}
                />
                tracking in tempo reale
              </div>
            </div>

            <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-4">
              {FASI.map((f, col) => (
                <div
                  key={f.t}
                  className="rounded-[12px] border border-white/[0.07] bg-[#131316] p-3"
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-[12.5px] font-medium ${
                        col === 3 ? "text-[#9c9a92]" : ""
                      }`}
                    >
                      {f.t}
                    </span>
                    <span className="font-mono text-[11px] text-[#5a5955]">
                      {conteggio[col]}
                    </span>
                  </div>
                  <div className="mb-3 text-[10.5px] leading-snug text-[#5a5955]">
                    {f.s}
                  </div>
                  <div className="space-y-2">
                    {col === passo ? <Pacco vivo fase={col} /> : null}
                    {Array.from({ length: GIA[col] }).map(() => {
                      const o = ALTRI[k++ % ALTRI.length];
                      return (
                        <Pacco
                          key={o[0] + col}
                          numero={o[0]}
                          citta={o[1]}
                          corriere={o[2]}
                          fase={col}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.07] pt-4 font-mono text-[10.5px] text-[#5a5955]">
              <span>05:00 · raccolta ordini e incassi</span>
              <span>etichetta comprata al corriere più adatto</span>
              <span>consegna spuntata sul negozio online</span>
            </div>
          </div>
        </div>
        <div className="border-t bg-bg px-4 py-3">
          <span className="label">Interfaccia reale · dati dimostrativi</span>
        </div>
      </div>
    </article>
  );
}

function Pacco({
  vivo,
  numero = "#10486",
  citta = "Napoli",
  corriere = "BRT",
  fase,
}: {
  vivo?: boolean;
  numero?: string;
  citta?: string;
  corriere?: string;
  fase: number;
}) {
  const stato = ["da sparare", "sparato ✓", "in transito", "consegnato ✓"][fase];
  return (
    <div
      className={`rounded-[9px] border px-2.5 py-2 text-[11.5px] ${
        vivo
          ? "flow-arriva border-[#4ade80]/60 bg-[#4ade80]/[0.08]"
          : "border-white/[0.07] bg-[#1a1a1e]"
      }`}
      key={vivo ? `vivo-${fase}` : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono">{numero}</span>
        <span className="font-mono text-[10px] text-[#5a5955]">{corriere}</span>
      </div>
      <div className="mt-0.5 flex items-center justify-between text-[10.5px]">
        <span className="text-[#9c9a92]">{citta}</span>
        <span className={vivo ? "text-[#4ade80]" : "text-[#5a5955]"}>
          {stato}
        </span>
      </div>
      {vivo && fase === 2 ? (
        <div className="mt-1.5 h-[2px] overflow-hidden rounded bg-white/[0.07]">
          <div className="flow-traccia h-full bg-[#4ade80]" />
        </div>
      ) : null}
    </div>
  );
}

/* ---- 03 · Gestionale orologi ---------------------------------------------- */

const SOLDI = [
  ["Cassa 1", "3.420,00 €"],
  ["Cassa 2", "0,00 €"],
  ["Banca 1", "18.760,50 €"],
  ["Banca 2", "6.200,00 €"],
];

const OPERAZIONI = [
  ["Vendita · 16 set", "Submariner Date 126610LN", "12.900,00 €"],
  ["Permuta · 15 set", "Speedmaster Professional", "4.100,00 €"],
  ["Incasso · 15 set", "2ª rata di 5", "1.250,00 €"],
  ["Acquisto · 12 set", "Santos de Cartier Medium", "5.300,00 €"],
];

function LavoroOrologi() {
  const { ref, attivo } = useInVista<HTMLDivElement>();
  const riga = useTick(attivo, 1800, OPERAZIONI.length);

  return (
    <article className="mt-32 border-t pt-12">
      <Intestazione
        n="03"
        settore="Catalogo + gestionale · Orologi di lusso"
        titolo="Il gestionale del rivenditore"
        testo="Per un rivenditore di orologi di pregio: la vetrina pubblica dei pezzi e, dietro, il gestionale da telefono. Magazzino al costo, permute, conto vendita, vendite a rate, clienti e ricerche su commissione, fino alla ricevuta A4 generata al banco."
        voci={[
          "Catalogo pubblico",
          "Magazzino al costo",
          "Permute e conto vendita",
          "Rate e incassi",
          "Documenti A4",
          "Backup automatico",
        ]}
      />

      <div
        ref={ref}
        className="relative mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-12"
      >
        {/* telefono: schermata «Oggi» */}
        <div className="mx-auto w-full max-w-[340px] md:col-span-5 md:col-start-2">
          <div className="relative rounded-[40px] border border-[color:var(--line-2)] bg-[#050506] p-[8px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <div
              className="relative overflow-hidden rounded-[32px] bg-[#f4f2ed] px-5 pb-6 pt-7 text-[#14130f]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c887f]">
                  Oggi
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#2f4b3c]">
                  Gestionale
                </span>
              </div>
              <div className="mt-1.5 text-[26px] font-semibold leading-none tracking-[-0.03em]">
                Mercoledì 16 settembre
              </div>

              <div className="mt-4 grid grid-cols-3 rounded-[10px] border border-[rgba(20,19,15,0.14)] p-[3px] text-center text-[10.5px]">
                <span className="rounded-[7px] bg-[#14130f] py-1.5 text-[#f4f2ed]">
                  Questo mese
                </span>
                <span className="py-1.5 text-[#5a5750]">Mese scorso</span>
                <span className="py-1.5 text-[#5a5750]">Quest&apos;anno</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-[rgba(20,19,15,0.14)] bg-[rgba(20,19,15,0.14)]">
                <Cella k="Margine" v="9.840,00 €" nota="6 vendite · 18%" accent />
                <Cella k="Venduto" v="54.300,00 €" nota="costo 44.460,00 €" />
                <Cella k="Spese" v="1.980,00 €" />
                <Cella k="Risultato" v="7.860,00 €" />
              </div>

              <div className="mt-5 flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c887f]">
                  Soldi
                </span>
                <span className="font-mono text-[12px] tabular-nums">
                  28.380,50 €
                </span>
              </div>
              <div className="mt-2 border-t border-[rgba(20,19,15,0.14)]">
                {SOLDI.map(([n, v]) => (
                  <div
                    key={n}
                    className="flex justify-between border-b border-[rgba(20,19,15,0.14)] py-2 text-[12.5px]"
                  >
                    <span className={v.startsWith("0,") ? "text-[#8c887f]" : ""}>
                      {n}
                    </span>
                    <span
                      className={`font-mono tabular-nums ${
                        v.startsWith("0,") ? "text-[#b9b4aa]" : ""
                      }`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c887f]">
                Ultime operazioni
              </div>
              <div className="mt-2 border-t border-[rgba(20,19,15,0.14)]">
                {OPERAZIONI.map(([sopra, titolo, importo], i) => (
                  <div
                    key={titolo}
                    className="flex items-center justify-between border-b border-[rgba(20,19,15,0.14)] py-2 transition-colors duration-700"
                    style={{
                      background:
                        attivo && i === riga ? "rgba(47,75,60,0.09)" : "transparent",
                    }}
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#8c887f]">
                        {sopra}
                      </div>
                      <div className="truncate text-[12.5px]">{titolo}</div>
                    </div>
                    <span className="ml-3 shrink-0 font-mono text-[11.5px] tabular-nums">
                      {importo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* documento A4 */}
        <div className="md:col-span-5">
          <div
            className="relative mx-auto aspect-[210/297] w-full max-w-[400px] rotate-[1.5deg] bg-[#fbfaf7] p-[7%] text-[#14130f] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="flex items-start justify-between border-b border-[rgba(20,19,15,0.3)] pb-[5%]">
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#8c887f]">
                  Ricevuta di vendita
                </div>
                <div className="mt-1 text-[17px] font-semibold tracking-[-0.02em]">
                  N. 2026/041
                </div>
              </div>
              <div className="text-right font-mono text-[8px] leading-relaxed text-[#5a5750]">
                16/09/2026
                <br />
                Napoli
              </div>
            </div>

            <div className="mt-[6%] grid grid-cols-2 gap-4 text-[8.5px] leading-relaxed">
              <div>
                <div className="font-mono uppercase tracking-[0.16em] text-[#8c887f]">
                  Venditore
                </div>
                <div className="mt-1 h-1.5 w-4/5 bg-[#eae7e0]" />
                <div className="mt-1 h-1.5 w-3/5 bg-[#eae7e0]" />
              </div>
              <div>
                <div className="font-mono uppercase tracking-[0.16em] text-[#8c887f]">
                  Acquirente
                </div>
                <div className="mt-1 h-1.5 w-3/4 bg-[#eae7e0]" />
                <div className="mt-1 h-1.5 w-1/2 bg-[#eae7e0]" />
              </div>
            </div>

            <div className="mt-[7%] border-y border-[rgba(20,19,15,0.3)] py-[4%] text-[9px]">
              <div className="flex justify-between font-mono text-[7.5px] uppercase tracking-[0.16em] text-[#8c887f]">
                <span>Descrizione</span>
                <span>Importo</span>
              </div>
              <div className="mt-2 flex justify-between">
                <div>
                  <div className="font-medium">Submariner Date</div>
                  <div className="font-mono text-[7.5px] text-[#5a5750]">
                    Ref. 126610LN · anno 2022 · scatola e garanzia
                  </div>
                </div>
                <span className="font-mono">12.900,00 €</span>
              </div>
            </div>

            <div className="mt-[4%] space-y-1 text-[8.5px]">
              <div className="flex justify-between">
                <span className="text-[#5a5750]">Acconto ricevuto</span>
                <span className="font-mono">5.000,00 €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a5750]">Residuo in 5 rate mensili</span>
                <span className="font-mono">7.900,00 €</span>
              </div>
              <div className="flex justify-between border-t border-[rgba(20,19,15,0.3)] pt-1.5 text-[11px] font-semibold">
                <span>Totale</span>
                <span className="font-mono">12.900,00 €</span>
              </div>
            </div>

            <div className="mt-[7%] font-mono text-[7.5px] uppercase tracking-[0.16em] text-[#8c887f]">
              Piano delle rate
            </div>
            <div className="mt-1.5 border-t border-[rgba(20,19,15,0.14)] text-[8px]">
              {["16/10/2026", "16/11/2026", "16/12/2026", "16/01/2027", "16/02/2027"].map((d, i) => (
                <div
                  key={d}
                  className="flex justify-between border-b border-[rgba(20,19,15,0.14)] py-[3px]"
                >
                  <span className="text-[#5a5750]">
                    {i + 1}ª rata · {d}
                  </span>
                  <span className="font-mono">1.580,00 €</span>
                </div>
              ))}
            </div>

            <div className="absolute inset-x-[7%] bottom-[7%] grid grid-cols-2 gap-6 font-mono text-[7px] uppercase tracking-[0.16em] text-[#8c887f]">
              <div className="border-t border-[rgba(20,19,15,0.3)] pt-1">
                Firma venditore
              </div>
              <div className="border-t border-[rgba(20,19,15,0.3)] pt-1">
                Firma acquirente
              </div>
            </div>
          </div>
          <p className="label mx-auto mt-10 max-w-[400px] leading-relaxed" data-rv>
            Il documento esce dal telefono già impaginato in A4: vendita,
            permuta, conto vendita, estratto conto. Interfaccia reale, dati
            dimostrativi.
          </p>
        </div>
      </div>
    </article>
  );
}

function Cella({
  k,
  v,
  nota,
  accent,
}: {
  k: string;
  v: string;
  nota?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-[#f4f2ed] p-2.5">
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#8c887f]">
        {k}
      </div>
      <div
        className={`mt-1 font-mono text-[14px] tabular-nums ${
          accent ? "text-[#2f4b3c]" : ""
        }`}
        data-count={v}
      >
        {v}
      </div>
      {nota ? <div className="text-[9.5px] text-[#8c887f]">{nota}</div> : null}
    </div>
  );
}
