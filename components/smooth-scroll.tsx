"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth (inertial) scrolling, wired into GSAP's ticker and synced with
 * ScrollTrigger so pinned / scrubbed scroll animations stay in lockstep with
 * the inertial scroll. Falls back to native scrolling for reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // land at top on fresh load
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // drive lenis from gsap's ticker (single RAF loop) + keep ScrollTrigger updated
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // in-page anchor links routed through lenis (clears the fixed navbar)
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const anchor = el?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      // "#x" oppure "/pagina#x" quando la pagina è questa: si scorre con lenis
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      const href = url.hash;
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    // arrivando da un'altra pagina con "#x", si parte dalla sezione giusta
    const iniziale = location.hash ? document.querySelector(location.hash) : null;
    if (iniziale)
      requestAnimationFrame(() =>
        lenis.scrollTo(iniziale as HTMLElement, { offset: -80, immediate: true })
      );

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
