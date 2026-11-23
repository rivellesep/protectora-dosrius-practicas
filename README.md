# Web de prácticas: Amics dels Animals Dosrius

> **Proyecto de prácticas.** No es la web oficial de [Amics dels Animals Dosrius](https://www.teaming.net/amicsdelsanimalsdosrius) ni se ha hecho con su participación. No hemos contactado con la entidad. Los animales, las fotos y los datos de contacto son de ejemplo, y todas las páginas llevan `noindex`.

Segunda web del programa de prácticas: una web pequeña para una protectora de pueblo llevada por voluntarios, con un CMS que pueden usar sin cuenta de GitHub.

- **Web**: https://protectora-dosrius-practicas.enric-albert-federg.workers.dev
- **Criterios de aceptación**: [CRITERIOS.md](CRITERIOS.md). También están en Notion, como subpágina del ejercicio, y se medirán contra la web al terminar.
- **Por qué este CMS, este hosting y este framework**: [COMPARATIVA.md](COMPARATIVA.md)
- **Resultado contra los criterios**: [RESULTADOS.md](RESULTADOS.md), en curso
- **Guía para editar la web** (para voluntarios): [GUIA-EDITOR.md](GUIA-EDITOR.md)
- **Lo que hemos aprendido**: [APRENDIZAJE.md](APRENDIZAJE.md)

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
- **Fotos**: de Wikimedia Commons, todas con licencia libre y sin personas. Las descargamos a 1600 px de ancho el 23/11/2026, sin otros cambios. Los animales de la web son inventados: las fotos no muestran a animales reales de la protectora.

  | Dónde | Archivo original | Autoría | Licencia |
  | --- | --- | --- | --- |
  | Luna | [Young mixed-breed dog (aka).jpg](https://commons.wikimedia.org/wiki/File:Young_mixed-breed_dog_(aka).jpg) | André Karwath aka Aka | CC BY-SA 2.5 |
  | Bruno | [43 Old dog - senior labrador dog with collar resting on sidewalk.jpg](https://commons.wikimedia.org/wiki/File:43_Old_dog_-_senior_labrador_dog_with_collar_resting_on_sidewalk.jpg) | Marek Ślusarczyk (Tupungato) | CC BY 3.0 |
  | Mixa | [20200816 Kot domowy, na polu w Rżuchowie, świętokrzyskie 0803 3618.jpg](https://commons.wikimedia.org/wiki/File:20200816_Kot_domowy,_na_polu_w_R%C5%BCuchowie,_%C5%9Bwi%C4%99tokrzyskie_0803_3618.jpg) | Jakub Hałun | CC BY-SA 4.0 |
  | Pelut | [Brown tabby cat 2018 G1.jpg](https://commons.wikimedia.org/wiki/File:Brown_tabby_cat_2018_G1.jpg) | George Chernilevsky | Dominio público |
  | Nina | [Brown-white mixed-breed puppy 2.JPG](https://commons.wikimedia.org/wiki/File:Brown-white_mixed-breed_puppy_2.JPG) | BrokenSphere | CC BY-SA 3.0 |
  | Tambor | [Schwarz-braunes Hauskaninchen Pforzheim.JPG](https://commons.wikimedia.org/wiki/File:Schwarz-braunes_Hauskaninchen_Pforzheim.JPG) | 4028mdk09 | CC BY-SA 3.0 |
  | Canela | [Feral cat sleeping near the Old City of Baku.jpg](https://commons.wikimedia.org/wiki/File:Feral_cat_sleeping_near_the_Old_City_of_Baku.jpg) | əkrəm. | CC0 |
  | Noticia «Buscamos casas de acogida» | [A dog wrapped up into a blanket.jpg](https://commons.wikimedia.org/wiki/File:A_dog_wrapped_up_into_a_blanket.jpg) | Free-Photos | CC0 |
  | Noticia «Jornada de adopción» | [20160327 pies nierasowy 3691.jpg](https://commons.wikimedia.org/wiki/File:20160327_pies_nierasowy_3691.jpg) | Jakub Hałun | CC BY-SA 4.0 |

  Rufo todavía usa una ilustración provisional generada con `scripts/placeholders.mjs`: Wikimedia limitó las descargas (error 429) antes de bajar su foto.
- **Tipografía**: Nunito, licencia SIL Open Font License, vía [Fontsource](https://fontsource.org/fonts/nunito).
