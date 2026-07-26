/**
 * Optimalizace fotek pro web.
 *
 * Vezme fotky ze zdrojové složky (archiv originálů), zmenší je na max 1600 px
 * delší strany a uloží jako JPEG (kvalita 80) do public/images/products.
 *
 * Originály zůstávají nedotčené — do gitu jde jen optimalizovaný výstup.
 *
 * Použití:
 *   node scripts/optimize-images.mjs              # vše ze zdrojové složky
 *   node scripts/optimize-images.mjs --limit 50   # jen prvních 50 (doporučeno na start)
 */

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'E:/X/AI_projekty/Radek Beneš web';
const OUT = './public/images/products';
const MAX_SIZE = 1600;
const QUALITY = 80;

const limitArg = process.argv.indexOf('--limit');
const LIMIT = limitArg !== -1 ? Number(process.argv[limitArg + 1]) : Infinity;

await mkdir(OUT, { recursive: true });

/** Projde složku i všechny podsložky a vrátí cesty k JPG/PNG (HEIC ignoruje). */
async function collect(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collect(full)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      found.push(full);
    }
  }
  return found;
}

/** Název souboru → bezpečný web-friendly tvar. */
function slugify(file) {
  return (
    path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.jpg'
  );
}

const found = (await collect(SRC)).sort();

if (found.length === 0) {
  console.error(`Ve složce ${SRC} (ani v podsložkách) nejsou žádné JPG/PNG fotky.`);
  process.exit(1);
}

// Stejný název ve dvou složkách by se ve výstupu přepsal — bereme jen první výskyt.
const seen = new Set();
const files = [];
let duplicates = 0;
for (const file of found) {
  const name = slugify(file);
  if (seen.has(name)) {
    duplicates++;
    continue;
  }
  seen.add(name);
  files.push({ file, name });
}

const todo = files.slice(0, LIMIT);
console.log(`Nalezeno ${found.length} fotek (${files.length} unikátních), zpracuji ${todo.length}.`);
if (duplicates) console.log(`Přeskočeno ${duplicates} duplicit (stejný název ve více složkách).`);
console.log('');

let done = 0;
let totalBytes = 0;
const failed = [];

for (const { file, name } of todo) {
  const dest = path.join(OUT, name);

  try {
    await sharp(file)
      .rotate() // respektuje EXIF orientaci
      .resize(MAX_SIZE, MAX_SIZE, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(dest);

    const { size } = await stat(dest);
    totalBytes += size;
    done++;
    console.log(`${String(done).padStart(3)}/${todo.length}  ${name}  (${Math.round(size / 1024)} kB)`);
  } catch (err) {
    failed.push({ file, message: err.message });
    console.warn(`  ✗ přeskočeno: ${path.basename(file)} — ${err.message}`);
  }
}

console.log(`\nHotovo: ${done} fotek, celkem ${(totalBytes / 1024 / 1024).toFixed(1)} MB.`);
if (failed.length) {
  console.log(`Nezpracováno: ${failed.length} (viz varování výše).`);
}
console.log(`Výstup: ${path.resolve(OUT)}`);
