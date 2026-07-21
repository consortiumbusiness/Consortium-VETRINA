import sharp from "sharp";
import { writeFile } from "node:fs/promises";

/**
 * Rigenera favicon e immagini social dagli asset di brand Consortium.
 * Richiede `sharp` (npm i -D sharp) e si lancia dalla root del progetto:
 *   node scripts/gen-assets.mjs
 *
 * Sorgenti (copiate da Risorse Condivise/Brand):
 *   - brand/CONSORTIUM Logo Negativo.png  → logotipo bianco su trasparente
 *   - app/icon.png                        → icona quadrata (squircle Consortium)
 */

const INK = "#0a0a0b"; // fondo scuro Consortium
const ACCENT = "#E0362F"; // rosso Consortium
const ACCENT_SOFT = "#FF6B66"; // variante chiara

/* ---------- 1. Logotipo bianco (già negativo su trasparente) ---------- */
const wordmarkWhite = await sharp("brand/CONSORTIUM Logo Negativo.png")
  .png()
  .trim()
  .toBuffer();
console.log(
  "wordmark:",
  (await sharp(wordmarkWhite).metadata()).width + "px wide"
);

/* ---------- 2. Favicon: l'icona squircle Consortium (512 + 180) ---------- */
const icon512 = await sharp("app/icon.png").resize(512, 512).png().toBuffer();
await writeFile("app/icon.png", icon512);
await writeFile(
  "app/apple-icon.png",
  await sharp(icon512).resize(180, 180).png().toBuffer()
);
console.log("favicon: app/icon.png (512), app/apple-icon.png (180)");

/* ---------- 3. Immagine OG / social (1200x630) ---------- */
const OGW = 1200,
  OGH = 630;
const ogBgSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${OGW}" height="${OGH}">
     <defs>
       <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
         <path d="M44 0H0V44" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
       </pattern>
       <radialGradient id="accent" cx="18%" cy="12%" r="55%">
         <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.30"/>
         <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
       </radialGradient>
       <radialGradient id="accentSoft" cx="84%" cy="90%" r="60%">
         <stop offset="0%" stop-color="${ACCENT_SOFT}" stop-opacity="0.26"/>
         <stop offset="100%" stop-color="${ACCENT_SOFT}" stop-opacity="0"/>
       </radialGradient>
     </defs>
     <rect width="100%" height="100%" fill="${INK}"/>
     <rect width="100%" height="100%" fill="url(#grid)"/>
     <rect width="100%" height="100%" fill="url(#accent)"/>
     <rect width="100%" height="100%" fill="url(#accentSoft)"/>
   </svg>`
);
const ogBg = await sharp(ogBgSvg).png().toBuffer();
const wm = await sharp(wordmarkWhite).resize({ width: 660 }).toBuffer();
const og = await sharp(ogBg)
  .composite([{ input: wm, gravity: "center" }])
  .png()
  .toBuffer();

await writeFile("app/opengraph-image.png", og);
await writeFile("app/twitter-image.png", og);
console.log("OG: app/opengraph-image.png + app/twitter-image.png (1200x630)");
