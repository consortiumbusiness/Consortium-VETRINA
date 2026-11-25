// Indirizzo del Worker Cloudflare che dà l'installatore di Cassa (progetto Cassa: codice/cloud/scarica).
// Non è un segreto: senza la parola d'ordine il Worker non dà niente.
export const CASSA_SCARICA = process.env.NEXT_PUBLIC_CASSA_SCARICA ?? "https://cassa-scarica.scarica.workers.dev";
