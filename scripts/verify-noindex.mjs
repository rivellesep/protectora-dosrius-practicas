// Checks criterion P2: every page carries noindex.
//   node scripts/verify-noindex.mjs            -> checks the HTML files in dist/ and the _headers rule
//   node scripts/verify-noindex.mjs <base-url> -> reads the live sitemap and checks every URL:
//                                                 meta robots in the HTML and the X-Robots-Tag header
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const META = /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/i;
const base = process.argv[2];
let fallos = 0;

const ok = (msg) => console.log(`  ok    ${msg}`);
const ko = (msg) => {
  fallos++;
  console.log(`  FALLO ${msg}`);
};

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith('.html')) out.push(path);
  }
  return out;
}

if (!base) {
  console.log('Comprobando dist/ ...');
  const headers = await readFile('dist/_headers', 'utf8');
  /\/\*\s*\n\s+X-Robots-Tag:\s*noindex/i.test(headers)
    ? ok('_headers aplica X-Robots-Tag: noindex a /*')
    : ko('_headers no tiene X-Robots-Tag: noindex para /*');
  for (const file of await htmlFiles('dist')) {
    META.test(await readFile(file, 'utf8')) ? ok(file) : ko(`${file} sin meta robots noindex`);
  }
} else {
  const root = base.replace(/\/$/, '');
  console.log(`Comprobando ${root} ...`);
  const index = await (await fetch(`${root}/sitemap-index.xml`)).text();
  const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const sm of sitemaps) {
    // The sitemap lists production URLs: rewrite them to the base being checked
    const xml = await (await fetch(sm.replace(/^https?:\/\/[^/]+/, root))).text();
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, root)));
  }
  urls.push(`${root}/esta-pagina-no-existe/`);
  for (const url of urls) {
    const res = await fetch(url);
    const header = res.headers.get('x-robots-tag') ?? '';
    const meta = META.test(await res.text());
    header.includes('noindex') && meta
      ? ok(`${res.status} ${url}`)
      : ko(`${res.status} ${url} (cabecera: ${header || 'falta'}, meta: ${meta ? 'sí' : 'falta'})`);
  }
}

console.log(fallos ? `\n${fallos} fallo(s).` : '\nTodo correcto: todas las páginas llevan noindex.');
process.exit(fallos ? 1 : 0);
