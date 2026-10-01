/* I lavori di Consortium: una scheda per progetto, letta dalla home (sezione
   Lavori), dall'indice /lavori e dalle pagine /lavori/[slug].
   Regole: niente nomi di persone, niente prezzi del cliente, niente numeri
   senza fonte, e nei testi pubblici mai il nome della piattaforma e-commerce. */

export type Fase = {
  quando: string;
  titolo: string;
  stato: "fatto" | "in-corso" | "prossimo";
};

export type Capitolo = { titolo: string; testo: string; stato?: "in-corso" | "prossimo" };

export type Progetto = {
  slug: string;
  n: string;
  nome: string;
  settore: string;
  luogo: string;
  stato: string;
  sommario: string;
  richiesta: string;
  capitoli: Capitolo[];
  fasi: Fase[];
  voci: string[];
  link?: { href: string; label: string };
  visual: "settanta" | "flow" | "orologi" | "nobi";
};

export const PROGETTI: Progetto[] = [
  {
    slug: "settanta-eu",
    n: "01",
    nome: "settanta.eu",
    settore: "E-commerce · Moda sartoriale",
    luogo: "Napoli",
    stato: "Online",
    sommario:
      "Il negozio online di un marchio di abbigliamento sartoriale con boutique fisica. Catalogo, schede prodotto, lounge clienti su WhatsApp e un checkout collegato al gestionale, che evade e spedisce gli ordini da solo.",
    richiesta:
      "Un marchio che produce i suoi capi e li vende in boutique voleva un negozio online all'altezza del negozio vero: fotografie coerenti, varianti di colore che si parlano, codici articolo puliti e ordini che partono senza che nessuno li ricopi a mano.",
    capitoli: [
      {
        titolo: "Il negozio online",
        testo:
          "Catalogo, collezioni e schede prodotto su misura. Ogni colore di un capo è un prodotto a sé, collegato agli altri da una fila di pastiglie: chi guarda il blu vede subito che esiste anche in sabbia.",
      },
      {
        titolo: "La Lounge su WhatsApp",
        testo:
          "Chi lascia il numero entra nella Lounge e riceve uno sconto di benvenuto: un canale diretto con il cliente, senza passare dalla pubblicità.",
      },
      {
        titolo: "Codici e barcode, una regola sola",
        testo:
          "Tutti i 4.527 codici articolo riscritti con un unico criterio, ARTICOLO-COLORE-TAGLIA, e barcode completati su ogni variante. Con l'archivio per tornare indietro.",
      },
      {
        titolo: "Fotografia in serie",
        testo:
          "Un flusso di post-produzione che lavora uno shooting intero con un comando: ritaglio a proporzioni fisse, bianco pareggiato, nomi file coerenti. Le foto restano vere: niente scontorni.",
      },
      {
        titolo: "Catalogo in figura intera con l'AI",
        testo:
          "Ogni colore di ogni capo indossato da un modello generato, sempre lo stesso, con regole di vestibilità per categoria. Le foto vere restano per i dettagli.",
        stato: "in-corso",
      },
      {
        titolo: "Etichette di composizione con QR",
        testo:
          "Stampate in casa su raso, in italiano e inglese, con il QR che porta alla scheda del capo. I dati arrivano dal catalogo, non da un foglio a parte.",
        stato: "in-corso",
      },
    ],
    fasi: [
      { quando: "Base", titolo: "Negozio online e Lounge", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Evasione e spedizioni automatiche", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Fotografia in serie", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Codici articolo e barcode", stato: "fatto" },
      { quando: "Ottobre 2026", titolo: "Catalogo in figura intera (AI)", stato: "in-corso" },
      { quando: "Ottobre 2026", titolo: "Etichette di composizione", stato: "in-corso" },
      { quando: "Prossimo", titolo: "App per i clienti, con tessera fedeltà", stato: "prossimo" },
    ],
    voci: [
      "E-commerce su misura",
      "Catalogo e varianti",
      "Lounge WhatsApp",
      "Spedizioni automatiche",
      "Fotografia prodotto",
      "Immagini AI",
    ],
    link: { href: "https://settanta.eu", label: "Visita il sito" },
    visual: "settanta",
  },
  {
    slug: "flow",
    n: "02",
    nome: "Flow by Consortium",
    settore: "Gestionale · E-commerce e negozio",
    luogo: "Napoli",
    stato: "In produzione, ogni giorno",
    sommario:
      "Il sistema che manda avanti il negozio: di notte raccoglie vendite e incassi, al mattino il foglio della giornata è già compilato. Evade gli ordini, compra le etichette, segue ogni pacco fino alla consegna e tiene la contabilità in partita doppia.",
    richiesta:
      "Un negozio con boutique e vendita online lavorava su tre programmi che non si parlavano: l'e-commerce, i corrieri e un vecchio software di contabilità dove ogni giornata si ricopiava a mano. Serviva un solo posto dove i numeri tornano.",
    capitoli: [
      {
        titolo: "La raccolta notturna",
        testo:
          "Alle 5 del mattino Flow legge vendite, incassi, rimborsi e buoni regalo della giornata. Quando si apre l'ufficio il foglio della giornata è già compilato e quadrato.",
      },
      {
        titolo: "Spedizioni, dall'ordine alla consegna",
        testo:
          "Sceglie il servizio del corriere, compra l'etichetta, la stampa, scrive il tracking sull'ordine e lo segue fino al «consegnato». Una guardia impedisce di comprare due volte la stessa etichetta.",
      },
      {
        titolo: "Pacchi pronti: la pistola e la TV",
        testo:
          "In magazzino si confeziona, in ufficio si spara il codice di ogni pacco davanti al corriere. Lo schermo da 65 pollici diventa verde o rosso, e nessun pacco esce senza essere contato.",
      },
      {
        titolo: "Gli «hurrà» in tempo reale",
        testo:
          "Ogni ordine online, vendita in negozio, pagamento arrivato e pacco consegnato compare sulla TV dell'ufficio con un'animazione e un suono. L'azienda vede il suo lavoro mentre succede.",
      },
      {
        titolo: "Carico da fattura",
        testo:
          "La fattura del fornitore diventa carico di magazzino con quadratura: pezzi e importi devono tornare, poi le quantità si aggiornano sul negozio online.",
      },
      {
        titolo: "Contabilità in partita doppia",
        testo:
          "Lo storico migrato dal vecchio programma, gli estratti conto e le fatture importati con il riscontro dei doppioni, il piano dei conti, le stampe in PDF ed Excel. La giornata diventa una scrittura da sola.",
      },
      {
        titolo: "Accessi per ruolo",
        testo:
          "Amministratori, commesse, magazzino: ognuno vede solo le schermate che gli servono. La regola vive nel database, non nel menù.",
      },
      {
        titolo: "L'assistente WhatsApp",
        testo:
          "Il messaggio «il tuo pacco è partito» al cliente, scritto da Flow nel momento in cui l'etichetta esiste. Con orari e tetti giornalieri per non disturbare.",
        stato: "in-corso",
      },
      {
        titolo: "La stazione in ufficio, sempre accesa",
        testo:
          "Una postazione 24/7 che stampa da sola e fa da mani al sistema. I dati restano nel cloud: se salta la corrente si perdono solo le stampe, mai un ordine.",
        stato: "prossimo",
      },
    ],
    fasi: [
      { quando: "Agosto 2026", titolo: "Raccolta notturna e foglio giornata", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Contabilità migrata in produzione", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Pacchi pronti, pistola e TV", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Carico da fattura", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Stampe della contabilità", stato: "fatto" },
      { quando: "Ottobre 2026", titolo: "Assistente WhatsApp", stato: "in-corso" },
      { quando: "Prossimo", titolo: "Stazione 24/7 in ufficio", stato: "prossimo" },
    ],
    voci: [
      "Raccolta notturna",
      "Foglio giornata",
      "Etichette e tracking",
      "Carico da fattura",
      "Partita doppia",
      "Accessi per ruolo",
    ],
    visual: "flow",
  },
  {
    slug: "gestionale-orologi",
    n: "03",
    nome: "Il gestionale del rivenditore",
    settore: "Catalogo + gestionale · Orologi di pregio",
    luogo: "Napoli e provincia",
    stato: "Online · app iPhone in arrivo",
    sommario:
      "Per i rivenditori di orologi di pregio: la vetrina pubblica dei pezzi e, dietro, il gestionale da telefono. Magazzino al costo, permute, conto vendita, vendite a rate, clienti e ricerche su commissione, fino alla ricevuta A4 generata al banco.",
    richiesta:
      "Chi compra e vende orologi lavora al telefono, su WhatsApp, con permute e rate. I gestionali da negozio non conoscono nessuna di queste cose. Serviva una vetrina per mostrare i pezzi e un gestionale che parli la lingua del mestiere.",
    capitoli: [
      {
        titolo: "La vetrina dei pezzi",
        testo:
          "Un catalogo pubblico con le schede dei pezzi e il contatto diretto su WhatsApp o modulo. Niente carrello: un orologio di pregio si vende parlando.",
      },
      {
        titolo: "Una piattaforma, più negozi",
        testo:
          "Ogni rivenditore ha la sua vetrina, il suo pannello e i suoi dati, su un'unica piattaforma. Un controllo doppio nel database impedisce che un pezzo finisca nel catalogo di un altro.",
      },
      {
        titolo: "Il gestionale",
        testo:
          "Magazzino al costo, permute, conto vendita, vendite a rate con il piano degli incassi, clienti e ricerche su commissione. La schermata «Oggi» dice margine, venduto, spese e soldi in cassa e in banca.",
      },
      {
        titolo: "Documenti al banco",
        testo:
          "Ricevuta di vendita, permuta, conto vendita, estratto conto: escono dal telefono già impaginati in A4, con il piano delle rate.",
      },
      {
        titolo: "Backup automatico",
        testo: "Una copia dei dati ogni giorno, senza che nessuno debba ricordarsene.",
      },
      {
        titolo: "L'app per iPhone",
        testo:
          "Lo stesso gestionale nativo su iPhone, sincronizzato col web, con un marketplace riservato fra rivenditori: i pezzi si scambiano fra colleghi prima di andare in vetrina.",
        stato: "in-corso",
      },
    ],
    fasi: [
      { quando: "Luglio 2026", titolo: "Primo sito vetrina", stato: "fatto" },
      { quando: "Agosto 2026", titolo: "Catalogo e pannello online", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Piattaforma condivisa fra negozi", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Gestionale e documenti", stato: "fatto" },
      { quando: "In corso", titolo: "App iPhone verso l'App Store", stato: "in-corso" },
    ],
    voci: [
      "Catalogo pubblico",
      "Magazzino al costo",
      "Permute e conto vendita",
      "Rate e incassi",
      "Documenti A4",
      "Backup automatico",
    ],
    visual: "orologi",
  },
  {
    slug: "nobi-suites",
    n: "04",
    nome: "NOBI Suites",
    settore: "Hospitality · Suite per chi viaggia per lavoro",
    luogo: "Aversa (CE)",
    stato: "Online · prenotazione diretta in costruzione",
    sommario:
      "Sei suite per chi viaggia per lavoro, dentro un centro direzionale a cinque minuti dalla stazione. Abbiamo costruito tutto da zero: l'identità, il marchio, il sito bilingue, il video e la presentazione. Adesso stiamo cablando il motore delle prenotazioni.",
    richiesta:
      "Una struttura ricettiva che ancora non esisteva, e che voleva nascere completa: marca, sito, prenotazione diretta, gestione, adempimenti e collegamento ai portali. Il tutto per un ospite preciso, chi è in trasferta e domani ha una giornata che conta.",
    capitoli: [
      {
        titolo: "L'identità «Night»",
        testo:
          "La O di NOBI è una luna calante con un punto di luce. Tre direzioni presentate, una scelta. Una palette notturna, un solo carattere in tre pesi, un tono fatto di poche parole, in italiano e in inglese.",
      },
      {
        titolo: "Il sito",
        testo:
          "Scuro per scelta della marca. Le date di arrivo e partenza già nella prima schermata, le due famiglie di suite, i servizi inclusi (autista per tutto il soggiorno, colazione, concierge, fattura unica per le aziende), le distanze che contano.",
      },
      {
        titolo: "Il video",
        testo:
          "Un'intro di trenta secondi generata e montata in casa, in due tagli: orizzontale per il computer e verticale 9:16 per il telefono, chiuso prima del logo perché non faccia doppione con la barra.",
      },
      {
        titolo: "La presentazione",
        testo:
          "Trenta slide per la proprietà: il luogo, il nome, il marchio, le direzioni scartate e perché, le regole d'uso. Online accanto al sito, fuori dai motori di ricerca.",
      },
      {
        titolo: "Dominio, email, messa online",
        testo:
          "Dominio e caselle aziendali configurati, sito pubblicato e servito dal dominio vero, con il «www» che porta all'indirizzo principale.",
      },
      {
        titolo: "Prenotazione diretta",
        testo:
          "Disponibilità e tariffe lette dal channel manager, pagamento online, conferma vera. Chi prenota dal sito non paga commissioni ai portali, e la camera non si vende due volte.",
        stato: "in-corso",
      },
      {
        titolo: "Gestione e adempimenti",
        testo:
          "Back-office delle prenotazioni, schedine degli alloggiati, statistiche regionali, tassa di soggiorno e fatture: tutto dallo stesso posto.",
        stato: "prossimo",
      },
      {
        titolo: "Portali e lancio",
        testo:
          "Collegamento ai grandi portali di prenotazione con calendario unico, e il collaudo finale (sicurezza, velocità, privacy) prima di aprire le vendite.",
        stato: "prossimo",
      },
    ],
    fasi: [
      { quando: "Agosto 2026", titolo: "Studio e scelta del channel manager", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Identità di marca e dominio", stato: "fatto" },
      { quando: "Settembre 2026", titolo: "Sito, video e presentazione online", stato: "fatto" },
      { quando: "Ottobre 2026", titolo: "Prenotazione diretta e pagamenti", stato: "in-corso" },
      { quando: "Novembre 2026", titolo: "Gestione e adempimenti", stato: "prossimo" },
      { quando: "Dicembre 2026", titolo: "Portali e apertura", stato: "prossimo" },
    ],
    voci: [
      "Identità di marca",
      "Sito bilingue",
      "Video",
      "Presentazione",
      "Prenotazione diretta",
      "Channel manager",
    ],
    link: { href: "https://nobisuites.com", label: "Visita il sito" },
    visual: "nobi",
  },
];

export function progetto(slug: string) {
  return PROGETTI.find((p) => p.slug === slug);
}

/* ---- In cantiere -------------------------------------------------------- */

export const FASI_CANTIERE = ["Studio", "Progetto", "Sviluppo", "Online"] as const;

export type Cantiere = {
  area: string;
  titolo: string;
  testo: string;
  fase: number; // indice in FASI_CANTIERE
  nota: string;
  slug?: string;
};

export const CANTIERE: Cantiere[] = [
  {
    area: "Hospitality",
    titolo: "Prenotazione diretta per NOBI Suites",
    testo:
      "Disponibilità dal channel manager, pagamento online e conferma vera, dentro il sito della struttura.",
    fase: 2,
    nota: "sito online, motore in costruzione",
    slug: "nobi-suites",
  },
  {
    area: "App iPhone",
    titolo: "L'app dei rivenditori di orologi",
    testo:
      "Magazzino, conti e un marketplace riservato fra colleghi, nativa su iPhone e sincronizzata col web.",
    fase: 2,
    nota: "verso l'App Store",
    slug: "gestionale-orologi",
  },
  {
    area: "AI · Fotografia",
    titolo: "Un catalogo intero in figura intera",
    testo:
      "Ogni colore di ogni capo indossato dallo stesso modello generato, con le regole di vestibilità per categoria.",
    fase: 3,
    nota: "prime categorie già sul sito",
    slug: "settanta-eu",
  },
  {
    area: "Automazione",
    titolo: "L'assistente WhatsApp di un e-commerce",
    testo:
      "Il cliente sa che il pacco è partito nel momento in cui esiste l'etichetta, senza che nessuno scriva.",
    fase: 2,
    nota: "scritto, in collaudo",
    slug: "flow",
  },
  {
    area: "Produzione",
    titolo: "Etichette di composizione con QR",
    testo:
      "Stampate in casa su raso, bilingui, con i dati presi dal catalogo e il QR alla scheda del capo.",
    fase: 1,
    nota: "proposta grafica, prova di stampa",
    slug: "settanta-eu",
  },
  {
    area: "App iPhone",
    titolo: "L'app fedeltà di un marchio di moda",
    testo:
      "Vetrina, tessera con punti e buoni, archivio riservato ai soci e una modalità negozio che si accende quando il cliente entra.",
    fase: 1,
    nota: "schermate approvate",
  },
  {
    area: "App iPhone e Mac",
    titolo: "Scrivente, la calcolatrice col nastro",
    testo:
      "Il metodo delle calcolatrici scriventi da ufficio, con lo scontrino che scorre e si strappa, portato su telefono e computer.",
    fase: 2,
    nota: "prototipo provato, ora nativa",
  },
];
