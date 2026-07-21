import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

/** Shared layout for the legal pages (privacy, cookie policy). */
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-ink-900 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Torna al sito
        </Link>

        <div className="mt-10 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/[0.03]">
            <span className="h-3.5 w-3.5 rounded-[5px] bg-white" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Consortium
          </span>
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-chrome">
          {title}
        </h1>
        <p className="mt-3 text-sm text-white/40">
          Ultimo aggiornamento: {updated}
        </p>

        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </main>
  );
}

/** A titled section within a legal page. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-white">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/60">
        {children}
      </div>
    </section>
  );
}

/** Highlights a value the site owner still has to fill in. */
export function Fill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-accent/10 px-1.5 py-0.5 font-medium text-accent">
      [{children}]
    </span>
  );
}
