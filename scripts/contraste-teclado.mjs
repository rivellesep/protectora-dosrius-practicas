// Criterion Q2 helpers:
//  1. contrast ratio of every text/background colour pair used by the site (WCAG 2.x formula)
//  2. keyboard check of the mobile menu at 375 px: Tab reaches the button, Enter opens it,
//     Escape closes it and returns focus to the button
//   node scripts/contraste-teclado.mjs [base-url]
import puppeteer from 'puppeteer-core';

const BASE = (process.argv[2] ?? 'https://protectora-dosrius-practicas.enric-albert-federg.workers.dev').replace(/\/$/, '');
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const lum = (hex) => {
  const [r, g, b] = hex.match(/\w\w/g).map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// Pairs taken from src/styles/global.css and the components
const pares = [
  ['Texto sobre fondo', '#2b211b', '#fffaf4'],
  ['Texto secundario sobre fondo', '#5e5148', '#fffaf4'],
  ['Texto secundario sobre fondo alternativo', '#5e5148', '#fbefe3'],
  ['Enlace sobre fondo', '#8a3510', '#fffaf4'],
  ['Enlace sobre fondo alternativo', '#8a3510', '#fbefe3'],
  ['Botón: blanco sobre naranja', '#ffffff', '#b4471a'],
  ['Botón al pasar el ratón', '#ffffff', '#8a3510'],
  ['Etiqueta Disponible', '#ffffff', '#2f5a2a'],
  ['Etiqueta Reservado', '#ffffff', '#8a5a00'],
  ['Etiqueta Adoptado', '#ffffff', '#4b4b4b'],
  ['Etiqueta Noticia', '#ffffff', '#1d4a66'],
  ['Aviso y pie: texto', '#fffaf4', '#2b211b'],
  ['Aviso y pie: enlaces', '#ffd8b5', '#2b211b'],
  ['Foco (contorno) sobre fondo', '#1d4a66', '#fffaf4'],
];

let fallos = 0;
console.log('Contraste (mínimo AA: 4,5:1 texto, 3:1 contorno de foco)');
for (const [nombre, fg, bg] of pares) {
  const r = ratio(fg, bg);
  const min = nombre.startsWith('Foco') ? 3 : 4.5;
  if (r < min) fallos++;
  console.log(`  ${r >= min ? 'ok   ' : 'FALLO'} ${r.toFixed(2).padStart(5)}:1  ${nombre} (${fg} / ${bg})`);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 800 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
  const focused = () => page.evaluate(() => document.activeElement?.className || document.activeElement?.tagName);
  let encontrado = false;
  for (let i = 0; i < 6 && !encontrado; i++) {
    await page.keyboard.press('Tab');
    encontrado = (await focused()).includes('menu-boton');
  }
  const abierto = encontrado && (await page.keyboard.press('Enter'), await page.evaluate(() => document.querySelector('.menu-boton').getAttribute('aria-expanded') === 'true' && !document.getElementById('menu-principal').hidden));
  await page.keyboard.press('Escape');
  const cerrado = await page.evaluate(() => document.querySelector('.menu-boton').getAttribute('aria-expanded') === 'false' && document.getElementById('menu-principal').hidden);
  const vuelveFoco = (await focused()).includes('menu-boton');
  console.log('\nMenú del móvil con teclado (375 px)');
  for (const [ok, txt] of [[encontrado, 'Tab llega al botón «Menú»'], [abierto, 'Enter lo abre (aria-expanded="true")'], [cerrado, 'Escape lo cierra'], [vuelveFoco, 'el foco vuelve al botón']]) {
    if (!ok) fallos++;
    console.log(`  ${ok ? 'ok   ' : 'FALLO'} ${txt}`);
  }
} finally {
  await browser.close();
}
console.log(fallos ? `\n${fallos} fallo(s).` : '\nTodo correcto.');
process.exit(fallos ? 1 : 0);
