import type { Metadata } from "next";
import { ScaricaCassa } from "@/components/scarica-cassa";

// Pagina riservata: non è collegata da nessuna parte e non va nei motori di ricerca.
export const metadata: Metadata = {
  title: "Area riservata — Consortium Business Suite",
  robots: { index: false, follow: false, nocache: true },
};

export default function ScaricaPage() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-bg px-6 py-16 text-paper">
      <ScaricaCassa />
    </main>
  );
}
