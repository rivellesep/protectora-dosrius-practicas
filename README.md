# Web de prácticas: Amics dels Animals Dosrius

> **Proyecto de prácticas.** No es la web oficial de [Amics dels Animals Dosrius](https://www.teaming.net/amicsdelsanimalsdosrius) ni se ha hecho con su participación. No hemos contactado con la entidad. Los animales, las fotos y los datos de contacto son de ejemplo, y todas las páginas llevan `noindex`.

Segunda web del programa de prácticas: una web pequeña para una protectora de pueblo llevada por voluntarios, con un CMS que pueden usar sin cuenta de GitHub.

- **Web**: https://protectora-dosrius-practicas.enric-albert-federg.workers.dev
- **Criterios de aceptación**: [CRITERIOS.md](CRITERIOS.md). También están en Notion, como subpágina del ejercicio, y se medirán contra la web al terminar.
- **Por qué este CMS, este hosting y este framework**: [COMPARATIVA.md](COMPARATIVA.md)

## Cómo funciona

| Pieza | Qué es | Dónde se configura |
| --- | --- | --- |
| Framework | [Astro](https://astro.build), web estática | `astro.config.mjs`, `src/` |
| Contenido | Archivos Markdown y JSON en el repositorio | `src/content/`, `src/data/ajustes.json` |
| Esquema del contenido | Validación con zod: un dato mal puesto rompe la construcción | `src/content.config.ts` |
| CMS | [Pages CMS](https://pagescms.org), con invitaciones por email | `.pages.yml` |
| Hosting | Cloudflare Workers, solo con assets estáticos, sin código de Worker | `wrangler.jsonc`, `public/_headers` |

Cada vez que alguien guarda en Pages CMS se crea un commit en `main`. Cloudflare Workers Builds, conectado al repositorio, construye la web con `npm run build` y la publica con `npx wrangler deploy`. Si la construcción falla, la web publicada no cambia.

`.pages.yml` y `src/content.config.ts` describen los mismos campos. Si cambias uno, cambia también el otro.

## Trabajar en local

Hace falta Node 22 o superior.

```sh
npm install
npm run dev       # servidor de desarrollo de Astro
npm run build     # construye la web en dist/
npm run preview   # sirve dist/ con wrangler, con las mismas cabeceras que en producción
npm run verify    # comprueba que todas las páginas de dist/ llevan noindex
npm run verify -- https://protectora-dosrius-practicas.enric-albert-federg.workers.dev
                  # lo mismo, contra la web publicada (meta robots y cabecera X-Robots-Tag)
```

## Estructura

```
src/
  content/animales/   una ficha por animal (Markdown)
  content/noticias/   noticias y eventos (Markdown)
  content/paginas/    páginas fijas: el nombre del archivo es la URL
  data/ajustes.json   textos de la portada, enlace de donaciones y correo
  assets/             fotos: Astro las optimiza al construir
  pages/              plantillas de las páginas
scripts/
  placeholders.mjs    genera las ilustraciones provisionales
  verify-noindex.mjs  comprobación del criterio P2
```

## Fuentes y licencias

- **Datos reales de la entidad** (nombre, pueblo, que la llevan voluntarios sin ánimo de lucro, su forma de entender a los animales como amigos y el enlace de donaciones): su página pública de Teaming, https://www.teaming.net/amicsdelsanimalsdosrius, consultada el 23/11/2026. El resto del contenido es inventado.
- **Imágenes**: de momento son ilustraciones provisionales generadas con `scripts/placeholders.mjs`. Cuando las cambiemos por fotos con licencia libre, la autoría y la licencia de cada una quedarán anotadas aquí.
- **Tipografía**: Nunito, licencia SIL Open Font License, vía [Fontsource](https://fontsource.org/fonts/nunito).
