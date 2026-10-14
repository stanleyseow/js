// Captures preview screenshots for every game in scripts/games.json into previews/.
// Usage: node scripts/capture-previews.mjs [--limit=N] [--concurrency=N] [--settle=MS] [--only=slug1,slug2]
import { readFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
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
mkdirSync(previewDir, { recursive: true });

const args = process.argv.slice(2);
const flag = (name) => (args.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1];
const limit = Number(flag('limit')) || Infinity;
const concurrency = Number(flag('concurrency')) || 4;
const settle = Number(flag('settle')) || 3000;
const only = flag('only') ? flag('only').split(',').map((s) => s.trim()) : null;

const categories = JSON.parse(readFileSync(join(root, 'scripts', 'games.json'), 'utf8'));
const games = categories.flatMap((c) => c.items);
const logFile = join(previewDir, 'failed.jsonl');

let pending = only
  ? games.filter((g) => only.includes(g.slug))
  : games.filter((g) => !existsSync(join(previewDir, `${g.slug}.jpg`)));
if (only) {
  const unknown = only.filter((s) => !games.some((g) => g.slug === s));
  if (unknown.length) throw new Error(`Unknown slugs: ${unknown.join(', ')}`);
}
pending = pending.slice(0, limit);

console.log(`${games.length} games total, ${pending.length} to capture (concurrency ${concurrency}, settle ${settle}ms)`);

const browser = await chromium.launch();

async function capture(game) {
  const context = await browser.newContext({
    viewport: { width: 900, height: 675 },
    ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  });
  const page = await context.newPage();
  try {
    const resp = await page.goto(game.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (!resp || resp.status() >= 400) {
      throw new Error(`HTTP ${resp ? resp.status() : 'no response'}`);
    }
    await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(settle);
    await page.screenshot({ path: join(previewDir, `${game.slug}.jpg`), type: 'jpeg', quality: 70 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err && err.message ? err.message : err).split('\n')[0] };
  } finally {
    await context.close();
  }
}

let done = 0;
let failed = 0;
let stopped = false;

async function worker(queue) {
  while (!stopped) {
    const game = queue.pop();
    if (!game) return;
    const res = await capture(game);
    done++;
    if (res.ok) {
      console.log(`[${done}/${pending.length}] OK  ${game.slug}`);
    } else {
      failed++;
      console.log(`[${done}/${pending.length}] FAIL ${game.slug} — ${res.error}`);
      appendFileSync(logFile, JSON.stringify({ name: game.name, slug: game.slug, url: game.url, error: res.error }) + '\n');
    }
  }
}

process.on('SIGINT', () => {
  stopped = true;
  console.log('\nInterrupted — partial captures kept.');
});

const queue = [...pending];
await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, () => worker(queue)));

await browser.close();
console.log(`\nDone: ${done - failed} captured, ${failed} failed.`);
if (failed) console.log(`Failures logged to ${logFile}`);
