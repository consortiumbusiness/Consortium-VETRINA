import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, LegalSection, Fill } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — Consortium Business Suite",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="1 luglio 2026">
      <p className="text-sm leading-relaxed text-white/60">
        La presente informativa descrive le modalità di trattamento dei dati
        personali degli utenti che interagiscono con questo sito, ai sensi
        dell&apos;art. 13 del Regolamento UE 2016/679 (&quot;GDPR&quot;).
      </p>

      <LegalSection title="1. Titolare del trattamento">
        <p>
          Titolare del trattamento è <strong className="text-white/80">SETTANTA
          S.R.L.S.</strong>, con sede legale in Piazza della Concordia 7, 80040
          San Sebastiano al Vesuvio (NA), Italia, P.IVA 10368711213. Per
          qualsiasi richiesta è possibile
          scrivere a{" "}
          <a
            href="mailto:consortium@settanta.eu"
            className="text-accent underline-offset-2 hover:underline"
          >
            consortium@settanta.eu
          </a>{" "}
          (PEC: settanta@mypec.eu).
        </p>
      </LegalSection>

      <LegalSection title="2. Dati personali raccolti">
        <p>Trattiamo i seguenti dati:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white/80">Dati forniti volontariamente</strong>{" "}
            tramite il modulo di contatto/assessment: nome e cognome, azienda o
            attività, indirizzo email e, se fornito, numero di telefono.
          </li>
          <li>
            <strong className="text-white/80">Dati dell&apos;assessment</strong>:
            le risposte selezionate e il punteggio di digitalizzazione
            calcolato, utili a personalizzare la nostra risposta.
          </li>
          <li>
            <strong className="text-white/80">Dati di navigazione</strong>:
            informazioni tecniche trasmesse automaticamente dal browser (es.
            indirizzo IP), trattate per la sicurezza e il funzionamento del
            sito.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Finalità e base giuridica">
        <p>
          I dati del modulo sono trattati per dar seguito alla tua richiesta e
          per ricontattarti con una proposta personalizzata. La base giuridica è
          il <strong className="text-white/80">consenso</strong> da te espresso
          (art. 6.1.a GDPR), prestato spuntando l&apos;apposita casella prima
          dell&apos;invio. Il conferimento dei dati contrassegnati come
          obbligatori è necessario per gestire la richiesta; in loro assenza non
          sarà possibile ricontattarti.
        </p>
      </LegalSection>

      <LegalSection title="4. Modalità e periodo di conservazione">
        <p>
          I dati sono trattati con strumenti informatici e conservati per il
          tempo strettamente necessario a gestire la richiesta e i successivi
          contatti commerciali, e comunque non oltre 24 mesi dall&apos;ultimo
          contatto, salvo revoca anticipata del consenso.
        </p>
      </LegalSection>

      <LegalSection title="5. Destinatari dei dati">
        <p>
          I dati possono essere trattati, per nostro conto e come responsabili
          del trattamento, dai fornitori dei servizi tecnologici che utilizziamo:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white/80">Supabase Inc.</strong> — database
            e archiviazione delle richieste inviate tramite il modulo
            (infrastruttura ospitata nell&apos;Unione Europea).
          </li>
          <li>
            <strong className="text-white/80">Vercel Inc.</strong> — hosting e
            distribuzione del sito.
          </li>
        </ul>
        <p>
          Alcuni fornitori possono trattare dati al di fuori dell&apos;UE; in tal
          caso il trasferimento avviene sulla base di garanzie adeguate (es.
          Clausole Contrattuali Standard della Commissione Europea). I dati non
          sono diffusi né ceduti a terzi per finalità autonome.
        </p>
      </LegalSection>

      <LegalSection title="6. Diritti dell'interessato">
        <p>
          In qualità di interessato puoi esercitare in ogni momento i diritti
          previsti dagli artt. 15-22 GDPR: accesso, rettifica, cancellazione,
          limitazione, opposizione, portabilità e revoca del consenso (senza
          pregiudicare la liceità del trattamento precedente). Hai inoltre il
          diritto di proporre reclamo al Garante per la protezione dei dati
          personali (www.garanteprivacy.it).
        </p>
      </LegalSection>

      <LegalSection title="7. Come esercitare i diritti">
        <p>
          Per esercitare i tuoi diritti o per qualsiasi informazione sul
          trattamento, scrivi a{" "}
          <a
            href="mailto:consortium@settanta.eu"
            className="text-accent underline-offset-2 hover:underline"
          >
            consortium@settanta.eu
          </a>
          . Risponderemo nei termini previsti dalla normativa.
        </p>
      </LegalSection>

      <LegalSection title="8. Modifiche a questa informativa">
        <p>
          Ci riserviamo di aggiornare la presente informativa. La versione
          vigente è sempre pubblicata su questa pagina con la data di ultimo
          aggiornamento. Consulta anche la{" "}
          <Link
            href="/cookie-policy"
            className="text-accent underline-offset-2 hover:underline"
          >
            Cookie Policy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalShell>
  );
}
