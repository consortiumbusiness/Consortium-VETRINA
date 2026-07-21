"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { GlowButton } from "@/components/ui/glow-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Servizi", href: "#servizi" },
  { label: "Case History", href: "#case-history" },
  { label: "Metodo", href: "#configuratore" },
  { label: "Contatti", href: "#configuratore" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6",
          scrolled
            ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/[0.03]">
            <span className="h-3.5 w-3.5 rounded-[5px] bg-white" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Consortium
            <span className="ml-1.5 hidden text-white/40 sm:inline">
              Business Suite
            </span>
          </span>
        </a>

        {/* Center links — magnetic hover */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.label} strength={0.5}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Magnetic strength={0.25}>
            <GlowButton onClick={() => scrollToId("configuratore")}>
              Inizia ora
              <ArrowUpRight className="h-4 w-4" />
            </GlowButton>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Apri menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute inset-x-4 top-[4.5rem] rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <GlowButton
                className="mt-2 w-full"
                onClick={() => {
                  setOpen(false);
                  scrollToId("configuratore");
                }}
              >
                Inizia ora
                <ArrowUpRight className="h-4 w-4" />
              </GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (
    window as unknown as {
      lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void };
    }
  ).lenis;
  if (lenis) lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
}
