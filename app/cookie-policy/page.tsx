import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Cookie Policy — Consortium Business Suite",
  description:
    "Informativa sull'uso dei cookie e delle tecnologie simili su questo sito.",
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <LegalShell title="Cookie Policy" updated="1 luglio 2026">
      <LegalSection title="1. Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo che i siti visitati inviano al
          dispositivo dell&apos;utente, dove vengono memorizzati per essere
          ritrasmessi agli stessi siti alla visita successiva. Tecnologie simili
          (es. localStorage) svolgono funzioni analoghe.
        </p>
      </LegalSection>

      <LegalSection title="2. Cookie utilizzati da questo sito">
        <p>
          Allo stato attuale questo sito utilizza esclusivamente cookie e
          tecnologie <strong className="text-white/80">tecnici essenziali</strong>,
          necessari al corretto funzionamento e alla sicurezza delle pagine. Non
          vengono utilizzati cookie di profilazione né strumenti di analisi o
          tracciamento di terze parti che richiedano il consenso preventivo.
        </p>
        <p>
          I cookie tecnici non richiedono consenso ai sensi della normativa
          vigente e del provvedimento del Garante Privacy in materia.
        </p>
      </LegalSection>

      <LegalSection title="3. Cookie e servizi di terze parti">
        <p>
          Qualora in futuro venissero attivati servizi di statistica o
          marketing (es. strumenti di analytics), questa informativa verrà
          aggiornata e, ove necessario, verrà mostrato un banner per la
          raccolta del consenso prima dell&apos;installazione dei relativi
          cookie.
        </p>
      </LegalSection>

      <LegalSection title="4. Gestione dei cookie dal browser">
        <p>
          Puoi gestire o eliminare i cookie già presenti sul tuo dispositivo
          attraverso le impostazioni del browser. La disabilitazione dei cookie
          tecnici potrebbe compromettere alcune funzionalità del sito.
        </p>
      </LegalSection>

      <LegalSection title="5. Riferimenti">
        <p>
          Per il trattamento dei dati personali raccolti tramite il modulo di
          contatto, consulta la{" "}
          <Link
            href="/privacy"
            className="text-accent underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalShell>
  );
}
