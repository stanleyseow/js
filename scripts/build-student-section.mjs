// Regenerates the "Student's Game" section of index.html as a 4-column card grid
// from scripts/games.json. Run: node scripts/extract-games.mjs && node scripts/build-student-section.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(root, 'index.html');
const html = readFileSync(htmlPath, 'utf8');
const categories = JSON.parse(readFileSync(join(root, 'scripts', 'games.json'), 'utf8'));

const START = '<!-- STUDENT-GAMES:START -->';
const END = '<!-- STUDENT-GAMES:END -->';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const parts = [];
for (const cat of categories) {
  const level = /^Sep|^May|^Jan/i.test(cat.title) ? 'h3' : 'h4';
  parts.push(`        <${level}>${esc(cat.title)}</${level}>`);
  parts.push('        <div class="game-grid">');
  for (const g of cat.items) {
    parts.push(
      `          <a class="game-card" href="${esc(g.url)}" target="_blank" rel="noopener">` +
        `<span class="game-thumb"><img src="previews/${esc(g.slug)}.jpg" alt="${esc(g.name)} preview" loading="lazy" onerror="this.classList.add('missing')"></span>` +
        `<span class="game-name">${esc(g.name)}</span></a>`
    );
  }
  parts.push('        </div>');
  parts.push('');
}
const section = parts.join('\n').trimEnd();

let out;
const startIdx = html.indexOf(START);
const endIdx = html.indexOf(END);
if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
  out = html.slice(0, startIdx + START.length) + '\n' + section + '\n        ' + html.slice(endIdx);
} else {
  const s = html.indexOf("<H2>Student's Game</H2>");
  const e = html.indexOf('<H2>p5.js</H2>');
  if (s === -1 || e === -1) throw new Error('Section markers not found in index.html');
  out =
    html.slice(0, s) +
    `<H2>Student's Game</H2>\n\n        ${START}\n` +
    section +
    `\n        ${END}\n\n        ` +
    html.slice(e);
}

writeFileSync(htmlPath, out);
const total = categories.reduce((n, c) => n + c.items.length, 0);
console.log(`Wrote ${total} cards across ${categories.length} categories into index.html`);
