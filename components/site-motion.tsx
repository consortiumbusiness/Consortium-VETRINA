"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Site-wide motion system (CTA-standard), framework-agnostic and run once after
 * mount against the already-rendered DOM:
 *  - brand loader (squircle mark + counter → curtain lift)
 *  - animated film-grain overlay
 *  - custom lerp cursor
 *  - text-roll on buttons / nav links
 *  - masked line reveals  [data-split]
 *  - generic fade-up reveals  [data-rv]
 *  - scroll-drawn frames + corner ticks  [data-frame]
 *  - decode/scramble stat counters  [data-count]
 * Everything degrades gracefully under prefers-reduced-motion / touch.
 */
export function SiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ---- split text into masked lines --------------------------------- */
      function splitLines(el: HTMLElement): HTMLElement[] {
        if (el.querySelector(".in"))
          return Array.from(el.querySelectorAll<HTMLElement>(".in"));
        const text = el.textContent?.replace(/\s+/g, " ").trim() ?? "";
        const words = text.split(" ");
        el.textContent = "";
        const spans = words.map((w, i) => {
          const s = document.createElement("span");
          s.className = "w";
          s.style.display = "inline-block";
          s.textContent = w;
          el.appendChild(s);
          if (i < words.length - 1)
            el.appendChild(document.createTextNode(" "));
          return s;
        });
        const lines: HTMLElement[][] = [];
        let cur: HTMLElement[] | null = null;
        let top: number | null = null;
        spans.forEach((s) => {
          const t = s.offsetTop;
          if (top === null || Math.abs(t - top) > 3) {
            cur = [];
            lines.push(cur);
            top = t;
          }
          cur!.push(s);
        });
        el.textContent = "";
        const inners: HTMLElement[] = [];
        lines.forEach((line) => {
          const ln = document.createElement("span");
          ln.className = "ln";
          const inn = document.createElement("span");
          inn.className = "in";
          line.forEach((s, j) => {
            inn.appendChild(
              document.createTextNode(
                s.textContent + (j < line.length - 1 ? " " : "")
              )
            );
          });
          ln.appendChild(inn);
          el.appendChild(ln);
          inners.push(inn);
        });
        return inners;
      }

      const heroInners: HTMLElement[] = [];
      document
        .querySelectorAll<HTMLElement>("[data-split]")
        .forEach((el) => {
          el.classList.add("split");
          const inners = splitLines(el);
          if (reduced) return;
          gsap.set(inners, { yPercent: 115 });
          if (el.closest("[data-hero]")) {
            heroInners.push(...inners);
            return; // hero handled by loader-complete
          }
          ScrollTrigger.create({
            trigger: el,
            start: "top 86%",
            once: true,
            onEnter: () =>
              gsap.to(inners, {
                yPercent: 0,
                duration: 1.05,
                ease: "expo.out",
                stagger: 0.08,
              }),
          });
        });

      /* ---- generic reveals ---------------------------------------------- */
      document.querySelectorAll<HTMLElement>("[data-rv]").forEach((el) => {
        if (reduced) return;
        gsap.set(el, { opacity: 0, y: 22 });
        if (el.closest("[data-hero]")) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }),
        });
      });

      /* ---- scroll-drawn frames ------------------------------------------ */
      document.querySelectorAll<HTMLElement>("[data-frame]").forEach((sec) => {
        const f = document.createElement("div");
        f.className = "frame";
        ["ht", "hb", "vl", "vr"].forEach((c) => {
          const i = document.createElement("i");
          i.className = c;
          f.appendChild(i);
        });
        ["tl", "tr", "bl", "br"].forEach((c) => {
          const b = document.createElement("b");
          b.className = c;
          f.appendChild(b);
        });
        sec.appendChild(f);
        if (reduced) return;
        const lines = f.querySelectorAll("i");
        const ticks = f.querySelectorAll("b");
        ScrollTrigger.create({
          trigger: sec,
          start: "top 84%",
          once: true,
          onEnter: () => {
            gsap.to(lines, {
              scaleX: 1,
              scaleY: 1,
              duration: 0.85,
              ease: "power3.inOut",
              stagger: 0.05,
            });
            gsap.to(ticks, {
              opacity: 1,
              duration: 0.4,
              delay: 0.45,
              stagger: 0.04,
            });
          },
        });
      });

      /* ---- decode/scramble counters ------------------------------------- */
      const GLYPHS = "0123456789ABCDEFGHJKLMNPRSTUVWXYZ/·+%";
      function scramble(el: HTMLElement, finalText: string, duration = 0.9) {
        const chars = finalText.split("");
        const start = performance.now();
        const total = duration * 1000;
        function frame(now: number) {
          const p = Math.min(1, (now - start) / total);
          const revealed = Math.floor(p * chars.length);
          el.textContent = chars
            .map((c, i) => {
              if (c === " ") return " ";
              if (i < revealed) return c;
              return GLYPHS[(Math.random() * GLYPHS.length) | 0];
            })
            .join("");
          if (p < 1) requestAnimationFrame(frame);
          else el.textContent = finalText;
        }
        requestAnimationFrame(frame);
      }
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const finalText = el.getAttribute("data-count") ?? el.textContent ?? "";
        el.textContent = finalText;
        if (reduced) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => scramble(el, finalText),
        });
      });

      /* ---- text-roll on buttons / nav ----------------------------------- */
      document
        .querySelectorAll<HTMLElement>("[data-roll]")
        .forEach((el) => {
          if (el.querySelector(".roll")) return;
          const text = el.textContent?.replace(/\s+/g, " ").trim();
          if (!text) return;
          const esc = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          el.innerHTML =
            '<span class="roll"><span>' +
            esc +
            '</span><span aria-hidden="true">' +
            esc +
            "</span></span>";
          el.classList.add("has-roll");
        });

      /* ---- animated film grain ------------------------------------------ */
      const grain = document.createElement("div");
      grain.className = "grain-overlay";
      grain.setAttribute("aria-hidden", "true");
      document.body.appendChild(grain);
      if (!reduced) {
        let last = 0;
        const gate = 1000 / 10;
        const tick = (t: number) => {
          if (t - last >= gate) {
            last = t;
            grain.style.backgroundPosition =
              ((Math.random() * 160) | 0) + "px " + ((Math.random() * 160) | 0) + "px";
          }
          raf = requestAnimationFrame(tick);
        };
        let raf = requestAnimationFrame(tick);
      }

      /* ---- custom cursor ------------------------------------------------- */
      const cursor = document.querySelector<HTMLElement>(".cursor");
      if (cursor && fine && !reduced) {
        document.body.classList.add("has-cursor");
        cursor.classList.remove("hide");
        let mx = innerWidth / 2,
          my = innerHeight / 2,
          cx = mx,
          cy = my;
        window.addEventListener("mousemove", (e) => {
          mx = e.clientX;
          my = e.clientY;
        });
        gsap.ticker.add(() => {
          cx += (mx - cx) * 0.2;
          cy += (my - cy) * 0.2;
          cursor.style.transform = "translate(" + cx + "px," + cy + "px)";
        });
        document
          .querySelectorAll("a, button, [data-cursor]")
          .forEach((el) => {
            el.addEventListener("mouseenter", () => cursor.classList.add("on"));
            el.addEventListener("mouseleave", () =>
              cursor.classList.remove("on")
            );
          });
      } else if (cursor) {
        cursor.style.display = "none";
      }

      /* ---- brand loader -------------------------------------------------- */
      const loader = document.getElementById("loader");
      const mark = loader?.querySelector<HTMLElement>(".loader-mark");
      const count = loader?.querySelector<HTMLElement>(".loader-count");

      function revealHero() {
        if (!heroInners.length) return;
        gsap.to(heroInners, {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
        });
        document
          .querySelectorAll<HTMLElement>("[data-hero] [data-rv]")
          .forEach((el, i) =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3 + i * 0.08,
              ease: "expo.out",
            })
          );
      }

      if (!loader) {
        revealHero();
      } else if (reduced) {
        loader.style.display = "none";
        revealHero();
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            loader.classList.add("done");
            loader.style.display = "none";
            ScrollTrigger.refresh();
            revealHero();
          },
        });
        const counter = { v: 0 };
        tl.to(mark!, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" })
          .to(
            counter,
            {
              v: 100,
              duration: 1.1,
              ease: "power2.inOut",
              onUpdate: () => {
                if (count)
                  count.textContent = String(Math.round(counter.v)).padStart(
                    3,
                    "0"
                  );
              },
            },
            0
          )
          .to(mark!, { scale: 0.82, duration: 0.4, ease: "power2.in" }, "-=0.15")
          .to(loader, {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
          });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
