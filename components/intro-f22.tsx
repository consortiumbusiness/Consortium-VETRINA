"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Apertura della home: l'F-22 che fa touch and go sulla portaerei, a tutto
 * schermo e senza una scritta. Dopo il loader compare solo «Scroll»; la
 * rotella fa girare il video fotogramma per fotogramma; sull'ultimo (l'aereo
 * che riparte) ci si ferma, il fotogramma scurisce quasi a nero e compaiono
 * i testi dell'hero. Poi si continua a scorrere nel sito.
 *
 * I fotogrammi li prepara scripts/build-f22.mjs (d = desktop 16:9,
 * m = telefono, ritaglio quadrato). Le lunghezze sono in vh di scroll.
 */

const FRAMES = 301;
const SCRUB = 420; // il video: 420vh ≈ 13 px per fotogramma su uno schermo da 900
const BUIO = 70; // il fotogramma finale che scurisce
const FERMO = 50; // l'hero resta fermo prima di scorrere via
const TOT = SCRUB + BUIO + FERMO;
const FINE_VIDEO = SCRUB / TOT;
const FINE_BUIO = (SCRUB + BUIO) / TOT;
const SOGLIA_TESTO = (SCRUB + BUIO * 0.55) / TOT;
const VELO_MAX = 0.88;

/** Ordine di caricamento: prima una frame ogni 64, poi ogni 32… così tutta
 *  la timeline è coperta presto e lo scrub non resta mai fermo a lungo. */
function ordine(): number[] {
  const visti = new Set<number>([0, FRAMES - 1]);
  const out = [0, FRAMES - 1];
  for (const passo of [64, 32, 16, 8, 4, 2, 1])
    for (let i = 0; i < FRAMES; i += passo)
      if (!visti.has(i)) {
        visti.add(i);
        out.push(i);
      }
  return out;
}

declare global {
  interface Window {
    __introPronta?: Promise<void>;
  }
}

export function IntroF22({ children }: { children: ReactNode }) {
  const sezione = useRef<HTMLElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const velo = useRef<HTMLDivElement>(null);
  const sfuma = useRef<HTMLDivElement>(null);
  const invito = useRef<HTMLDivElement>(null);
  const testo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = sezione.current!;
    const canvas = tela.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    /* ---- fotogrammi --------------------------------------------------- */
    let set = "";
    let imgs: (HTMLImageElement | null)[] = [];
    let attuale = -1; // fotogramma che si vuole vedere
    let disegnato = -1; // fotogramma effettivamente sul canvas
    let generazione = 0;

    const scegliSet = () =>
      window.matchMedia("(max-aspect-ratio: 1/1)").matches ? "m" : "d";

    function carica(nuovo: string): Promise<void> {
      set = nuovo;
      const gen = ++generazione;
      imgs = new Array(FRAMES).fill(null);
      disegnato = -1;
      const coda = reduced ? [FRAMES - 1] : ordine();
      let fatti = 0;
      const chiave = coda.filter((i) => i % 8 === 0 || i === FRAMES - 1).length;
      return new Promise((risolvi) => {
        const lavoratore = async () => {
          while (coda.length && gen === generazione) {
            const i = coda.shift()!;
            const img = new Image();
            img.decoding = "async";
            img.src = `/f22/${nuovo}/${String(i).padStart(3, "0")}.webp`;
            try {
              await img.decode();
            } catch {
              continue;
            }
            if (gen !== generazione) return;
            imgs[i] = img;
            if (i % 8 === 0 || i === FRAMES - 1) fatti++;
            if (fatti >= chiave || reduced) risolvi();
            if (disegnato !== attuale) disegna();
          }
          risolvi();
        };
        for (let k = 0; k < 6; k++) lavoratore();
      });
    }

    function vicino(i: number): HTMLImageElement | null {
      for (let d = 0; d < FRAMES; d++) {
        if (imgs[i - d]) return imgs[i - d];
        if (imgs[i + d]) return imgs[i + d];
      }
      return null;
    }

    function dimensiona() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      disegnato = -1;
      disegna();
    }

    function disegna() {
      if (attuale < 0) return;
      const img = vicino(attuale);
      if (!img || canvas.width < 2) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      disegnato = imgs[attuale] ? attuale : -1;
    }

    /* ---- testi dell'hero ---------------------------------------------- */
    let testoSu = false;
    const righe = () => testo.current!.querySelectorAll<HTMLElement>(".split .in");
    const blocchi = () => testo.current!.querySelectorAll<HTMLElement>("[data-rv]");

    function mostraTesto(si: boolean) {
      if (si === testoSu) return;
      testoSu = si;
      document.documentElement.classList.toggle("intro-on", !si);
      const t = testo.current!;
      gsap.killTweensOf([t, ...righe(), ...blocchi()]);
      if (si) {
        gsap.set(t, { autoAlpha: 1 });
        gsap.to(righe(), { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.08 });
        blocchi().forEach((el, i) =>
          gsap.to(el, { opacity: 1, y: 0, duration: 1, delay: 0.3 + i * 0.06, ease: "expo.out" })
        );
      } else {
        gsap.to(t, {
          autoAlpha: 0,
          duration: 0.35,
          onComplete: () => {
            gsap.set(righe(), { yPercent: 115 });
            gsap.set(blocchi(), { opacity: 0, y: 22 });
          },
        });
      }
    }

    /* ---- lo scroll ---------------------------------------------------- */
    let invitoVisto = false;
    function applica(p: number) {
      const f = Math.min(FRAMES - 1, Math.round((p / FINE_VIDEO) * (FRAMES - 1)));
      if (f !== attuale) {
        attuale = f;
        disegna();
      }
      const b = gsap.utils.clamp(0, 1, (p - FINE_VIDEO) / (FINE_BUIO - FINE_VIDEO));
      const v = b * b * (3 - 2 * b); // smoothstep
      velo.current!.style.opacity = String(v * VELO_MAX);
      sfuma.current!.style.opacity = String(v);
      if (invitoVisto) invito.current!.style.opacity = p > 0.004 ? "0" : "1";
      mostraTesto(p >= SOGLIA_TESTO);
    }

    const pronta = carica(scegliSet());
    window.__introPronta = Promise.race([
      pronta,
      new Promise<void>((r) => setTimeout(r, 3500)),
    ]);

    dimensiona();
    document.documentElement.classList.add("intro-on");

    if (reduced) {
      attuale = FRAMES - 1;
      velo.current!.style.opacity = String(VELO_MAX);
      sfuma.current!.style.opacity = "1";
      testoSu = true;
      gsap.set(testo.current!, { autoAlpha: 1 });
      document.documentElement.classList.remove("intro-on");
      disegna();
    }

    const st = reduced
      ? null
      : ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => applica(self.progress),
          onRefresh: (self) => applica(self.progress),
        });
    if (!reduced) applica(0);

    // «Scroll» compare quando il sipario del loader si è alzato
    const dopoLoader = () => {
      invitoVisto = true;
      if ((st?.progress ?? 1) <= 0.004) invito.current!.style.opacity = "1";
    };
    window.addEventListener("consortium:loader-fatto", dopoLoader);

    const onResize = () => {
      const voluto = scegliSet();
      if (voluto !== set) carica(voluto);
      dimensiona();
    };
    window.addEventListener("resize", onResize);

    return () => {
      generazione++;
      st?.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("consortium:loader-fatto", dopoLoader);
      document.documentElement.classList.remove("intro-on");
      delete window.__introPronta;
    };
  }, []);

  return (
    <section
      id="top"
      ref={sezione}
      data-hero
      data-intro
      className="relative motion-reduce:!h-auto"
      style={{ height: `${100 + TOT}vh` }}
    >
      <div className="sticky top-0 h-lvh w-full overflow-hidden bg-bg motion-reduce:relative motion-reduce:h-svh">
        <canvas ref={tela} aria-hidden className="absolute inset-0 h-full w-full" />
        <div ref={velo} aria-hidden className="absolute inset-0 bg-bg opacity-0" />
        <div
          ref={sfuma}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-bg to-transparent opacity-0"
        />

        {/* l'unica scritta prima del video */}
        <div
          ref={invito}
          aria-hidden
          className="intro-invito pointer-events-none absolute inset-x-0 bottom-[max(2.5rem,6svh)] flex flex-col items-center gap-4 opacity-0"
        >
          <span className="label tracking-[0.4em] text-paper">Scroll</span>
          <span className="intro-linea" />
        </div>

        <div ref={testo} className="invisible absolute inset-x-0 top-0 h-svh">
          {children}
        </div>
      </div>
    </section>
  );
}
