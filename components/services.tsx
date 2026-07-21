"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Mail,
  Server,
  Code2,
  ShoppingCart,
  Smartphone,
  LineChart,
  Calculator,
  Gauge,
  ArrowUpRight,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Services() {
  return (
    <section id="servizi" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <span className="eyebrow">— Cosa facciamo</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-chrome sm:text-5xl">
            Una suite completa per la tua transizione al 2.0
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/55">
            Tre aree integrate che lavorano insieme: dalle fondamenta digitali
            allo sviluppo su misura, fino al governo dei numeri.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(0,1fr)]">
          {/* Card 1 — Digital Foundations (tall, left) */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2"
          >
            <SpotlightCard
              glow="rgba(224,54,47,0.18)"
              className="flex h-full flex-col p-8"
            >
              <Badge color="cyan">01 — Foundations</Badge>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                Digital Foundations
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Le basi solide su cui costruire. Domini personalizzati, email
                aziendali professionali e Workspace collaborativi configurati a
                regola d&apos;arte.
              </p>
              <ul className="mt-8 space-y-3">
                <FeatureRow icon={Globe} label="Domini personalizzati" />
                <FeatureRow icon={Mail} label="Email aziendali pro" />
                <FeatureRow icon={Server} label="Workspace & cloud" />
              </ul>
              <LearnMore className="mt-auto pt-8" />
            </SpotlightCard>
          </motion.div>

          {/* Card 2 — Digital Development (wide, right-top) */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-1"
          >
            <SpotlightCard
              glow="rgba(255,107,102,0.18)"
              className="flex h-full flex-col p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge color="violet">02 — Development</Badge>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                    Digital Development
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
                    Siti vetrina, Company Profile digitali, e-commerce e
                    software/app custom ingegnerizzati ad hoc per i tuoi
                    obiettivi commerciali.
                  </p>
                </div>
                <ArrowUpRight className="hidden h-6 w-6 shrink-0 text-white/30 transition-colors group-hover:text-accent-soft sm:block" />
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Pill icon={Code2} label="Siti & Profile" />
                <Pill icon={ShoppingCart} label="E-commerce" />
                <Pill icon={Smartphone} label="App native" />
                <Pill icon={Server} label="Software custom" />
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 3 — Business & Finance (wide, right-bottom) */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-1"
          >
            <SpotlightCard
              glow="rgba(176,35,29,0.18)"
              className="flex h-full flex-col p-8"
            >
              <Badge color="blue">03 — Business & Finance</Badge>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                Business &amp; Finance
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/55">
                Non solo tecnologia. Formazione contabile, controllo di
                gestione, ottimizzazione dei processi e analisi dati per
                decidere sui numeri, non sulle sensazioni.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Pill icon={Calculator} label="Formazione contabile" />
                <Pill icon={Gauge} label="Controllo di gestione" />
                <Pill icon={LineChart} label="Analisi dati" />
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "cyan" | "violet" | "blue";
}) {
  const map = {
    cyan: "text-accent border-accent/30 bg-accent/5",
    violet: "text-accent-soft border-accent-soft/30 bg-accent-soft/5",
    blue: "text-accent-deep border-accent-deep/30 bg-accent-deep/5",
  } as const;
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest2 ${map[color]}`}
    >
      {children}
    </span>
  );
}

function FeatureRow({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <li className="flex items-center gap-3 text-sm text-white/75">
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
        <Icon className="h-4 w-4 text-white/70" />
      </span>
      {label}
    </li>
  );
}

function Pill({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-white/75 transition-colors hover:border-white/20 hover:bg-white/[0.04]">
      <Icon className="h-4 w-4 shrink-0 text-white/60" />
      <span className="truncate">{label}</span>
    </div>
  );
}

function LearnMore({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors group-hover:text-accent">
        Approfondisci
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </div>
  );
}
