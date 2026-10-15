// Regenerates the "Student's Game" and "Intro To Coding Final Project" sections of
// index.html as 4-column card grids from scripts/games.json.
// Run: node scripts/extract-games.mjs && node scripts/build-student-section.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(root, 'index.html');
const html = readFileSync(htmlPath, 'utf8');
const categories = JSON.parse(readFileSync(join(root, 'scripts', 'games.json'), 'utf8'));

const START = '<!-- STUDENT-GAMES:START -->';
const END = '<!-- STUDENT-GAMES:END -->';
const INTRO_START = '<!-- INTRO-CODING:START -->';
const INTRO_END = '<!-- INTRO-CODING:END -->';
// Intro To Coding categories render in their own grid (the <h3> stays hand-written).
const isIntro = (title) => /^Intro To Coding/i.test(title);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function grid(cat) {
  const parts = ['        <div class="game-grid">'];
  for (const g of cat.items) {
    parts.push(
      `          <a class="game-card" href="${esc(g.url)}" target="_blank" rel="noopener">` +
        `<span class="game-thumb"><img src="previews/${esc(g.slug)}.jpg" alt="${esc(g.name)} preview" loading="lazy" onerror="this.classList.add('missing')"></span>` +
        `<span class="game-name">${esc(g.name)}</span></a>`
    );
  }
  parts.push('        </div>');
  return parts;
}

const parts = [];
const introParts = [];
for (const cat of categories) {
  if (isIntro(cat.title)) {
    introParts.push(...grid(cat), '');
    continue;
  }
  const level = /^Sep|^May|^Jan/i.test(cat.title) ? 'h3' : 'h4';
  parts.push(`        <${level}>${esc(cat.title)}</${level}>`);
  parts.push(...grid(cat), '');
}
const section = parts.join('\n').trimEnd();
const introSection = introParts.join('\n').trimEnd();

function spliceRegion(html, start, end, body) {
  const s = html.indexOf(start);
  const e = html.indexOf(end);
  if (s === -1 || e === -1 || e < s) throw new Error(`Markers not found: ${start} / ${end}`);
  return html.slice(0, s + start.length) + '\n' + body + '\n        ' + html.slice(e);
}

let out = spliceRegion(html, START, END, section);
if (out.includes(INTRO_START)) {
  out = spliceRegion(out, INTRO_START, INTRO_END, introSection);
}

writeFileSync(htmlPath, out);
const total = categories.reduce((n, c) => n + c.items.length, 0);
console.log(`Wrote ${total} cards across ${categories.length} categories into index.html`);
