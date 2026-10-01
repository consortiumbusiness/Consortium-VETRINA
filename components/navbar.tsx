"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Servizi", href: "/#servizi" },
  { label: "Lavori", href: "/lavori" },
  { label: "Cantiere", href: "/lavori#cantiere" },
  { label: "Prodotti", href: "/#prodotti" },
  { label: "Metodo", href: "/#configuratore" },
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b bg-bg/70 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <nav className="gutter-x flex items-center justify-between py-5">
        {/* Logo — squircle + wordmark */}
        <a href="/#top" className="group flex items-center gap-3" data-cursor>
          <span className="h-7 w-7 rounded-[9px] bg-paper transition-transform duration-500 group-hover:rotate-[10deg]" />
          <span className="text-[15px] font-semibold tracking-tight text-paper">
            Consortium
            <span className="text-accent-soft">.</span>
          </span>
        </a>

        {/* Center links */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-roll
              className="label hover:text-paper transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/#configuratore"
          data-roll
          className="btn btn-accent hidden md:inline-flex"
        >
          Inizia ora
        </a>

        {/* Mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="label text-paper md:hidden"
        >
          {open ? "Chiudi" : "Menu"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="gutter-x border-t bg-bg pb-8 pt-4 md:hidden">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="label text-lg text-paper"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#configuratore"
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-2 justify-center"
            >
              Inizia ora
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
