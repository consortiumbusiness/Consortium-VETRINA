"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Radial glow color, defaults to electric cyan. */
  glow?: string;
}

/**
 * Glass card with a radial spotlight that follows the cursor on hover.
 */
export function SpotlightCard({
  children,
  className,
  glow = "rgba(224,54,47,0.18)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-colors duration-300 hover:border-white/20",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
