"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Zap, ShieldCheck } from "lucide-react";

const METRICS = [
  { value: "+218%", label: "Tasso di conversione", icon: TrendingUp },
  { value: "0.9s", label: "Tempo di caricamento", icon: Zap },
  { value: "99.9%", label: "Uptime piattaforma", icon: ShieldCheck },
];

export function CaseHistory() {
  return (
    <section id="case-history" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <span className="eyebrow">— Proof of Concept</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-chrome sm:text-5xl">
              settanta.eu, il nostro caso di studio vivente
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/55">
              L&apos;e-commerce che abbiamo ingegnerizzato, sviluppato e scalato
              internamente. La prova concreta che il nostro metodo unisce
              estetica premium e conversione commerciale.
            </p>
          </div>
          <a
            href="https://settanta.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm text-white/80 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white"
          >
            Visita settanta.eu
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Cinema screen mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200 }}
          className="relative"
        >
          {/* glow behind the screen */}
          <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(224,54,47,0.18),transparent_60%)] blur-2xl" />

          <div className="glass overflow-hidden rounded-3xl p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <div className="mx-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1 text-[11px] tracking-wide text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                https://settanta.eu
              </div>
            </div>

            {/* Screen content */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700 via-ink-800 to-black">
              {/* subtle grid + glow inside the screen */}
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,107,102,0.25),transparent_60%)] blur-2xl" />
              <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(224,54,47,0.22),transparent_60%)] blur-2xl" />

              {/* fake storefront UI */}
              <div className="relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
                <span className="eyebrow text-white/50">Fashion E-commerce</span>
                <p className="max-w-md text-2xl font-semibold tracking-tight text-chrome sm:text-3xl">
                  Estetica premium. Architettura headless. Conversione misurabile.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["Headless CMS", "Checkout ottimizzato", "Analytics", "SEO"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* scanning light line */}
              <motion.div
                aria-hidden
                animate={{ y: ["-10%", "110%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent"
              />
            </div>
          </div>

          {/* Metrics row */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="glass flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <m.icon className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-white">
                    {m.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest2 text-white/45">
                    {m.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
