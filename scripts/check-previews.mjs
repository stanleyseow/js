// Flags preview screenshots that are near-uniform (blank/black/white) via pixel stddev.
// Usage: node scripts/check-previews.mjs [threshold]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    const root = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
    return import(pathToFileURL(join(root, 'playwright', 'index.mjs')).href);
  }
}
const { chromium } = await loadPlaywright();

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewDir = join(root, 'previews');
const threshold = Number(process.argv[2]) || 10;

const files = readdirSync(previewDir).filter((f) => f.endsWith('.jpg'));

const browser = await chromium.launch();
const page = await browser.newPage();

const blank = [];
for (const f of files) {
  const dataUri = `data:image/jpeg;base64,${readFileSync(join(previewDir, f)).toString('base64')}`;
  const stddev = await page.evaluate(async (src) => {
    try {
      const img = new Image();
      img.src = src;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = 90;
      c.height = 68;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, 90, 68);
      const d = ctx.getImageData(0, 0, 90, 68).data;
      let sum = 0,
        sum2 = 0,
        n = 0;
      for (let i = 0; i < d.length; i += 4) {
        const y = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        sum += y;
        sum2 += y * y;
        n++;
      }
      const mean = sum / n;
      return Math.sqrt(Math.max(0, sum2 / n - mean * mean));
    } catch {
      return -1;
    }
  }, dataUri);
  const isBlank = stddev < threshold;
  if (isBlank) blank.push({ file: f, stddev: stddev.toFixed(1) });
}

await browser.close();

console.log(`Checked ${files.length} previews, ${blank.length} blank (stddev < ${threshold}):`);
for (const b of blank) console.log(`  ${b.stddev.padStart(6)}  ${b.file}`);
writeFileSync(join(previewDir, 'blank.json'), JSON.stringify(blank, null, 2));
