// Extracts the "Student's Game" section from index.html into scripts/games.json
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

const start = html.indexOf("<H2>Student's Game</H2>");
const end = html.indexOf('<H2>p5.js</H2>');
if (start === -1 || end === -1) throw new Error('Student Game section markers not found');
const section = html.slice(start, end);

const lines = section.split(/\r?\n/);
const categories = [];
let current = null;

for (const line of lines) {
  const heading = line.match(/<h([234])>(.*?)<\/h\1>/i);
  if (heading) {
    const title = heading[2].trim();
    if (/^Student's Game$/i.test(title)) {
      current = { title: 'Overview', items: [] };
      categories.push(current);
      continue;
    }
    current = { title, items: [] };
    categories.push(current);
    continue;
  }

  const item = line.match(/<li>\s*<a\s+href="([^"]+)">\s*([^<]*?)\s*<\/a>\s*<\/li>/i);
  if (item && current) {
    let url = item[1].replace(/^https:\/\/https:\/\//, 'https://');
    const name = item[2].trim();
    current.items.push({ name, url });
  }
}

function slugFor(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const segs = u.pathname.split('/').filter(Boolean);
  let last = segs.length ? segs[segs.length - 1] : 'index';
  try {
    last = decodeURIComponent(last);
  } catch {
    /* keep raw */
  }
  const host = u.hostname.endsWith('.github.io')
    ? u.hostname.split('.')[0]
    : u.hostname.split('.')[0];
  const clean = (s) => s.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return `${clean(host)}-${clean(last)}`;
}

const games = [];
const slugs = new Set();
for (const cat of categories) {
  for (const item of cat.items) {
    let slug = slugFor(item.url);
    if (!slug) {
      console.warn('Bad URL:', item.url, '-', item.name);
      continue;
    }
    if (slugs.has(slug)) {
      let i = 2;
      while (slugs.has(`${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }
    slugs.add(slug);
    games.push({ name: item.name, url: item.url, category: cat.title, slug });
  }
}

if (games.length === 0) {
  console.error(
    'No <li><a> links found in the Student Game section — index.html already contains the generated card grid.\n' +
      'Edit scripts/games.json directly instead, then run build-student-section.mjs.'
  );
  process.exit(1);
}

const out = categories
  .map((c) => ({
    title: c.title,
    items: c.items
      .map((it) => games.find((g) => g.url === it.url && g.name === it.name))
      .filter(Boolean),
  }))
  .filter((c) => c.items.length > 0);

writeFileSync(join(root, 'scripts', 'games.json'), JSON.stringify(out, null, 2));
console.log(`Extracted ${games.length} games across ${out.length} categories`);
for (const c of out) console.log(`  ${c.title}: ${c.items.length}`);
