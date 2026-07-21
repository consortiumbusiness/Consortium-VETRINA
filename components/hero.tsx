"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const orbX = useTransform(sx, (v) => v * 30);
  const orbY = useTransform(sy, (v) => v * 30);
  const orbX2 = useTransform(sx, (v) => v * -22);
  const orbY2 = useTransform(sy, (v) => v * -22);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28"
    >
      {/* Mouse-reactive light orbs */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute left-[12%] top-[24%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(224,54,47,0.22),transparent_60%)] blur-2xl"
      />
      <motion.div
        style={{ x: orbX2, y: orbY2 }}
        className="pointer-events-none absolute right-[10%] top-[34%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,107,102,0.20),transparent_60%)] blur-2xl"
      />

      {/* Animated perspective grid floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] overflow-hidden mask-fade-b">
        <motion.div
          animate={{ backgroundPositionY: ["0px", "60px"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-grid-perspective opacity-50"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        {/* Eyebrow pill */}
        <motion.div
          variants={item}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="eyebrow text-white/70">
            Consulenza & Sviluppo Digitale a 360°
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-chrome">Cuciamo l&apos;infrastruttura</span>
          <br />
          <span className="text-chrome">digitale del tuo business.</span>
          <br />
          <span className="text-accent-gradient">Su misura.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg"
        >
          Guidiamo professionisti, commercianti e PMI nella transizione al 2.0.
          Dalle fondamenta digitali allo sviluppo avanzato, fino al controllo di
          gestione: un&apos;unica suite per ingegnerizzare la tua crescita.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            variant="primary"
            asChild
            className="group w-full sm:w-auto"
          >
            <a href="#configuratore">
              Avvia l&apos;assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            asChild
            className="w-full sm:w-auto"
          >
            <a href="#case-history">
              <PlayCircle className="h-4 w-4" />
              Scopri settanta.eu
            </a>
          </Button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/35"
        >
          {[
            "Domini & Email",
            "Sviluppo Web",
            "E-commerce",
            "Software Custom",
            "Controllo di Gestione",
          ].map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium uppercase tracking-widest2"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
