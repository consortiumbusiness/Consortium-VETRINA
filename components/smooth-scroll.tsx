"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Wraps the app in Lenis smooth (inertial) scrolling and routes in-page
 * anchor links through Lenis so the whole downward-scroll experience feels
 * consistent with the reveal animations. Falls back to native scrolling for
 * users who prefer reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      // easeOutCubic — quick to react, gentle to settle
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    // Expose so imperative scrolls (e.g. navbar CTA) can reuse the same easing.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smoothly handle in-page anchor links (#servizi, #configuratore, ...).
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const anchor = el?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // -80px to clear the fixed navbar.
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
