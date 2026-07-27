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
    <main className="relative min-h-screen bg-bg px-6 py-16 text-paper">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="label inline-flex items-center gap-1.5 transition-colors hover:text-paper"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Torna al sito
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="h-7 w-7 rounded-[9px] bg-paper" />
          <span className="text-[15px] font-semibold tracking-tight text-paper">
            Consortium<span className="text-accent-soft">.</span>
          </span>
        </div>

        <h1 className="display mt-8 text-4xl tracking-tight text-paper">
          {title}
        </h1>
        <p className="label mt-4">Ultimo aggiornamento: {updated}</p>

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
      <h2 className="text-lg font-semibold tracking-tight text-paper">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-t2">
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
