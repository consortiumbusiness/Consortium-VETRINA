import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Trasforma il video dell'F-22 (touch and go sulla portaerei) nella sequenza
 * di fotogrammi che l'apertura della home scorre con la rotella.
 * Si lancia dalla root del progetto:
 *   node scripts/build-f22.mjs [percorso/video.mp4]
 *
 * Perché fotogrammi e non <video>: spostare currentTime a ogni tacca di
 * rotella su un mp4 normale scatta (soprattutto su Safari), un canvas che
 * disegna un'immagine già in memoria no. Stesso metodo di Cannes Watch:
 * TUTTI i fotogrammi, mappa lineare, ≤30 px di scroll per fotogramma.
 *
 * Esce:
 *   public/f22/d/000.webp…  desktop, 1920 px, fotogramma intero 16:9
 *   public/f22/m/000.webp…  telefono, ritaglio centrale 1080×1080
 *   (301 fotogrammi, il conto lo legge components/intro-f22.tsx: FRAMES)
 */

const SRC =
  process.argv[2] ??
  "../Risorse Condivise/Brand/Video/f22-cockpit.mp4";
const OUT = "public/f22";

const tmp = mkdtempSync(join(tmpdir(), "f22-"));
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", SRC, join(tmp, "%03d.png")]);
const files = readdirSync(tmp).filter((f) => f.endsWith(".png")).sort();

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, "d"), { recursive: true });
mkdirSync(join(OUT, "m"), { recursive: true });

let pesoD = 0;
let pesoM = 0;
for (const [i, f] of files.entries()) {
  const nome = String(i).padStart(3, "0") + ".webp";
  const png = join(tmp, f);
  const { width, height } = await sharp(png).metadata();

  await sharp(png)
    .resize(1920)
    .webp({ quality: 62, effort: 5 })
    .toFile(join(OUT, "d", nome));

  const lato = Math.min(width, height);
  await sharp(png)
    .extract({ left: Math.round((width - lato) / 2), top: 0, width: lato, height: lato })
    .resize(1080)
    .webp({ quality: 58, effort: 5 })
    .toFile(join(OUT, "m", nome));

  pesoD += statSync(join(OUT, "d", nome)).size;
  pesoM += statSync(join(OUT, "m", nome)).size;
}
rmSync(tmp, { recursive: true, force: true });

const mb = (b) => (b / 1048576).toFixed(1) + " MB";
console.log(`${files.length} fotogrammi · desktop ${mb(pesoD)} · telefono ${mb(pesoM)}`);
