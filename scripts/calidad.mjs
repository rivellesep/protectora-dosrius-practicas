/**
 * Automatic quality checks against the acceptance criteria:
 *   Q1  Lighthouse accessibility >= 95 on every template (Lighthouse runs axe-core)
 *   Q4  Lighthouse mobile performance >= 90 on home, listing and one animal page
 *   Q5  no horizontal scroll from 320 px; screenshots at 375, 768 and 1440 px
 *
 *   node scripts/calidad.mjs [base-url]   (default: the live site)
 *
 * Reports go to calidad/: Lighthouse HTML/JSON per page, screenshots, and resumen.json.
 * Uses the installed Chrome, or the browser in CHROME_PATH.
 */
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer-core';

const BASE = (process.argv[2] ?? 'https://protectora-dosrius-practicas.enric-albert-federg.workers.dev').replace(/\/$/, '');
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
if (existsSync(CHROME)) process.env.CHROME_PATH = CHROME;

// One URL per template (criterion Q1 lists them)
const PLANTILLAS = {
  inicio: '/',
  listado: '/animales/',
  ficha: '/animales/luna/',
  noticia: '/noticias/jornada-de-adopcion-diciembre/',
  pagina: '/como-adoptar/',
};
const RENDIMIENTO = ['inicio', 'listado', 'ficha'];
const ANCHOS = [320, 375, 768, 1440];
const OUT = 'calidad';

await mkdir(`${OUT}/capturas`, { recursive: true });
const resumen = { fecha: new Date().toISOString(), base: BASE, lighthouse: [], responsive: [] };
let fallos = 0;

// Lighthouse, mobile preset (Lighthouse's default)
const chrome = await launch({ chromeFlags: ['--headless=new'] });
try {
  for (const [nombre, path] of Object.entries(PLANTILLAS)) {
    const { lhr, report } = await lighthouse(`${BASE}${path}`, {
      port: chrome.port,
      output: ['html', 'json'],
      logLevel: 'error',
      onlyCategories: ['accessibility', 'performance', 'best-practices'],
    });
    await writeFile(`${OUT}/lighthouse-${nombre}.html`, report[0]);
    await writeFile(`${OUT}/lighthouse-${nombre}.json`, report[1]);
    const a11y = Math.round(lhr.categories.accessibility.score * 100);
    const perf = Math.round(lhr.categories.performance.score * 100);
    const failing = Object.values(lhr.audits)
      .filter((a) => a.score === 0 && lhr.categories.accessibility.auditRefs.some((r) => r.id === a.id))
      .map((a) => a.id);
    const okA11y = a11y >= 95 && failing.length === 0;
    const okPerf = !RENDIMIENTO.includes(nombre) || perf >= 90;
    if (!okA11y || !okPerf) fallos++;
    resumen.lighthouse.push({ nombre, path, accesibilidad: a11y, rendimiento: perf, auditoriasA11yFallidas: failing, LCP: lhr.audits['largest-contentful-paint'].displayValue });
    console.log(`${okA11y && okPerf ? 'ok   ' : 'FALLO'} ${nombre.padEnd(8)} a11y ${a11y}  perf ${perf}  ${failing.join(', ')}`);
  }
} finally {
  await chrome.kill();
}

// Responsive: horizontal overflow and screenshots
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true });
try {
  const page = await browser.newPage();
  for (const ancho of ANCHOS) {
    await page.setViewport({ width: ancho, height: 900, deviceScaleFactor: 1 });
    for (const [nombre, path] of Object.entries(PLANTILLAS)) {
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle0' });
      const desborde = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (desborde > 0) fallos++;
      resumen.responsive.push({ ancho, nombre, desbordePx: desborde });
      if (ancho !== 320) await page.screenshot({ path: `${OUT}/capturas/${ancho}-${nombre}.png`, fullPage: true });
      console.log(`${desborde > 0 ? 'FALLO' : 'ok   '} ${String(ancho).padStart(4)} px ${nombre}${desborde > 0 ? ` desborda ${desborde}px` : ''}`);
    }
  }
} finally {
  await browser.close();
}

await writeFile(`${OUT}/resumen.json`, JSON.stringify(resumen, null, 2));
console.log(fallos ? `\n${fallos} fallo(s). Detalle en ${OUT}/.` : `\nTodo correcto. Informes en ${OUT}/.`);
process.exit(fallos ? 1 : 0);
