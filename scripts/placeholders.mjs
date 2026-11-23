// Generates provisional illustrations (paw print + label) until real free-licence photos
// are added. Usage: node scripts/placeholders.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const paw = (fill) => `
  <g fill="${fill}" opacity="0.9">
    <ellipse cx="800" cy="700" rx="230" ry="190"/>
    <ellipse cx="560" cy="430" rx="85" ry="115" transform="rotate(-20 560 430)"/>
    <ellipse cx="710" cy="330" rx="85" ry="120"/>
    <ellipse cx="890" cy="330" rx="85" ry="120"/>
    <ellipse cx="1040" cy="430" rx="85" ry="115" transform="rotate(20 1040 430)"/>
  </g>`;

const svg = ({ bg, fg, label }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
  <rect width="1600" height="1200" fill="${bg}"/>
  ${paw(fg)}
  <text x="800" y="1060" text-anchor="middle" font-family="Arial, sans-serif" font-size="64"
        font-weight="700" fill="${fg}">${label}</text>
</svg>`;

const images = [
  ['src/assets/animales/luna.jpg', '#f6d2b8', '#8a3b12', 'Foto provisional · Luna'],
  ['src/assets/animales/bruno.jpg', '#d9e6d2', '#2f5a2a', 'Foto provisional · Bruno'],
  ['src/assets/animales/mixa.jpg', '#e6dcf2', '#4b2d73', 'Foto provisional · Mixa'],
  ['src/assets/animales/pelut.jpg', '#f2e6c9', '#6b4e0e', 'Foto provisional · Pelut'],
  ['src/assets/animales/nina.jpg', '#cfe3ef', '#1d4a66', 'Foto provisional · Nina'],
  ['src/assets/animales/tambor.jpg', '#f2d4dc', '#7a1f3d', 'Foto provisional · Tambor'],
  ['src/assets/animales/rufo.jpg', '#e0e0e0', '#3d3d3d', 'Foto provisional · Rufo'],
  ['src/assets/animales/canela.jpg', '#f5dcc4', '#7a4210', 'Foto provisional · Canela'],
  ['src/assets/noticias/jornada-adopcion.jpg', '#d9e6d2', '#2f5a2a', 'Imagen provisional · Jornada'],
  ['src/assets/noticias/acogida-invierno.jpg', '#cfe3ef', '#1d4a66', 'Imagen provisional · Acogida'],
];

for (const [out, bg, fg, label] of images) {
  // Never overwrite a real photo that has replaced a placeholder
  if (existsSync(out)) {
    console.log('skip (exists)', out);
    continue;
  }
  await mkdir(out.split('/').slice(0, -1).join('/'), { recursive: true });
  await sharp(Buffer.from(svg({ bg, fg, label }))).jpeg({ quality: 82 }).toFile(out);
  console.log('wrote', out);
}
