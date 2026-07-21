"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * CTA with an animated conic-gradient border that spins behind a glass core.
 */
export function GlowButton({ children, className, ...props }: GlowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full p-[1.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-200%] animate-border-spin bg-[conic-gradient(from_90deg_at_50%_50%,#0a0a0b_0%,#E0362F_25%,#FF6B66_50%,#0a0a0b_70%,#0a0a0b_100%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-ink-800 px-6 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-ink-700">
        {children}
      </span>
    </button>
  );
}
