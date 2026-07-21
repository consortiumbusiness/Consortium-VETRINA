# Consortium Business Suite — Sito Vetrina

Landing page di **Consortium Business Suite** (marchio di *SETTANTA S.R.L.S.*):
consulenza aziendale e sviluppo digitale a 360° — Digital Foundations, Digital
Development, Business & Finance.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animazioni
- [Lenis](https://lenis.studiofreight.com/) — smooth scroll
- [lucide-react](https://lucide.dev/) — icone

## Sviluppo locale

```bash
cp .env.example .env.local   # poi compila le variabili Supabase
npm install                  # installa le dipendenze
npm run dev                  # avvia il dev server su http://localhost:3000
```

## Lead → Supabase

Il form dell'assessment (`app/api/contact/route.ts`) inserisce le richieste
nella tabella **`richieste_consulenza`** del **Supabase condiviso Consortium**
(lo schema sta in `../Risorse Condivise/Backend/01_schema.sql`). Servono due
variabili in `.env.local` (vedi `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Chiave **anon** e RLS: chiunque può inserire, solo l'admin legge. Dopo l'insert
non si rilegge mai la riga. Se le env mancano, il lead viene solo loggato lato
server (nulla si perde durante il setup).

> ⚠️ Non installare / lavorare dentro una cartella sincronizzata da Google
> Drive: la sincronizzazione dei file di `node_modules` blocca l'installazione.
> Tenere il progetto su disco locale.

## Script

| Comando         | Descrizione                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Server di sviluppo con hot-reload    |
| `npm run build` | Build di produzione                  |
| `npm run start` | Avvia la build di produzione         |
| `npm run lint`  | Lint del codice                      |

## Struttura

```
app/            # App Router: layout, pagina, stili globali
components/      # Sezioni (hero, servizi, case history, form, ...)
components/ui/   # Componenti UI riutilizzabili
lib/             # Utility
```
