/**
 * Fixed, full-page ambient layer: deep-black base, faint vector grid,
 * and soft radial accent glows that give the page a 3D sense of depth.
 * Purely decorative — pointer-events disabled.
 */
export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900">
      {/* faint vector micro-grid */}
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />

      {/* cyan glow, top-left */}
      <div className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(224,54,47,0.16),transparent_60%)] blur-3xl animate-glow-pulse" />

      {/* violet glow, top-right */}
      <div className="absolute -right-32 top-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,102,0.14),transparent_60%)] blur-3xl animate-glow-pulse [animation-delay:1.5s]" />

      {/* electric-blue glow, center-bottom */}
      <div className="absolute bottom-[-12rem] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,35,29,0.12),transparent_65%)] blur-3xl animate-glow-pulse [animation-delay:3s]" />

      {/* vignette to keep edges deep black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#0a0a0b_100%)]" />
    </div>
  );
}
