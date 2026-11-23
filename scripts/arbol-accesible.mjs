// Criterion Q3 without a screen reader: reads Chrome's accessibility tree, which is what a
// screen reader announces, and checks the path "find an available animal -> open its card
// -> reach how to adopt".
//   node scripts/arbol-accesible.mjs [base-url]
import puppeteer from 'puppeteer-core';

const BASE = (process.argv[2] ?? 'https://protectora-dosrius-practicas.enric-albert-federg.workers.dev').replace(/\/$/, '');
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const flat = (node, out = []) => {
  if (!node) return out;
  out.push(node);
  for (const c of node.children ?? []) flat(c, out);
  return out;
};

let fallos = 0;
const check = (ok, txt) => {
  if (!ok) fallos++;
  console.log(`  ${ok ? 'ok   ' : 'FALLO'} ${txt}`);
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  for (const path of ['/', '/animales/', '/animales/luna/', '/como-adoptar/']) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle0' });
    const nodes = flat(await page.accessibility.snapshot({ interestingOnly: true }));
    const roles = (r) => nodes.filter((n) => n.role === r);
    const headings = roles('heading').map((h) => `h${h.level} ${h.name}`);
    console.log(`\n${path}`);
    console.log(`  títulos: ${headings.join(' | ')}`);
    check(roles('heading').filter((h) => h.level === 1).length === 1, 'un solo título de nivel 1');
    const levels = roles('heading').map((h) => h.level);
    check(levels.every((l, i) => i === 0 || l <= levels[i - 1] + 1), 'los niveles de título no se saltan ninguno');
    check(roles('main').length === 1 && roles('navigation').length >= 1 && roles('banner').length === 1 && roles('contentinfo').length === 1, 'zonas: cabecera, navegación, contenido principal y pie');
    check(roles('link').every((l) => l.name && l.name.trim().length > 1), `todos los enlaces tienen nombre (${roles('link').length})`);
    check(roles('image').every((i) => i.name && i.name.trim().length > 3), `todas las imágenes tienen descripción (${roles('image').length})`);
    if (path === '/animales/') {
      const radios = roles('radio');
      check(radios.length >= 7 && radios.every((r) => r.name), `filtros: ${radios.length} opciones con nombre`);
      // Groups and live regions are pruned from the "interesting" tree, so read the full one
      const full = flat(await page.accessibility.snapshot({ interestingOnly: false }));
      check(full.some((n) => n.role === 'group' && n.name === 'Especie') && full.some((n) => n.role === 'group' && n.name === 'Estado'), 'los grupos de filtros se anuncian como «Especie» y «Estado»');
      const recuento = await page.$eval('[role=status]', (e) => e.textContent.trim());
      check(full.some((n) => n.role === 'status') && /animales/.test(recuento), `el recuento se anuncia solo (role="status"): «${recuento}»`);
      check(roles('link').some((l) => l.name === 'Luna'), 'cada animal disponible es un enlace con su nombre');
    }
    if (path === '/animales/luna/') {
      check(roles('link').some((l) => l.name === 'Cómo adoptar'), 'la ficha tiene un enlace «Cómo adoptar»');
      check(nodes.some((n) => n.role === 'term' || n.role === 'DescriptionListTerm' || n.name === 'Especie'), 'los datos del animal se leen como pares nombre–valor');
    }
  }
} finally {
  await browser.close();
}
console.log(fallos ? `\n${fallos} fallo(s).` : '\nTodo correcto.');
process.exit(fallos ? 1 : 0);
