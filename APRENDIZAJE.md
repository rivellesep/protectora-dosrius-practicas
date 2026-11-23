# Lo que hemos aprendido

> **Proyecto de prácticas.** No es la web oficial de Amics dels Animals Dosrius.

Segunda web del programa, del 23/11/2026. Aquí no hubo guía paso a paso: elegimos nosotros el CMS, el hosting y el framework, y antes de empezar escribimos los criterios de aceptación. Este documento separa tres cosas:

- **Medido**: lo hemos cronometrado o calculado nosotros, con la cifra y cómo se obtuvo.
- **Observado**: lo hemos visto pasar, pero no es una cifra.
- **Estimado**: es una deducción nuestra, sin confirmar.

## Medido

| Qué | Cifra | Cómo |
| --- | --- | --- |
| Del guardado a la web publicada | 49 s, 69 s y 50 s | Tres cambios: un push, un cambio de estado en Pages CMS y el alta de un animal desde el móvil. Comprobamos la página cada 5 s hasta ver el cambio. |
| Partes de una construcción en Cloudflare | Preparar el entorno 38 s, clonar 2 s, instalar dependencias 37 s, construir unos 5 s | Registro de construcción del panel de Cloudflare. Casi todo el tiempo es preparar e instalar, no construir la web. |
| Construcción en local | De 1 a 3,5 s para 20–22 páginas | `astro build`. Con las fotos reales tarda más, porque genera sus versiones optimizadas. |
| Accesibilidad y rendimiento | 100 y 100 en las 5 plantillas, en móvil. LCP de 0,8 a 1,8 s | `npm run calidad` (Lighthouse 13), con las fotos reales. |
| Contraste | 14 pares de colores entre 5,44:1 y 15,14:1 | `scripts/contraste-teclado.mjs`, con la fórmula de WCAG. |
| Scroll horizontal | 0 px en 5 plantillas a 320, 375, 768 y 1440 px | `npm run calidad` (puppeteer). |
| Fotos de Commons | Entre 410 y 935 KB a 1600 px; en las tarjetas se sirven en WebP a 320, 480 y 640 px | Tamaño de la descarga y HTML generado. |
| Foto de móvil pasada por WhatsApp | 240 KB, 1536 × 2048 px, sin EXIF | `sharp` sobre el archivo que subió Pages CMS. |
| Una construcción con un dato inválido | Falla en unos 5 s de construcción; la web no cambia | Prueba E7: estado `perdido`. |
| Borrar una ficha y recuperarla | Desaparece en 67 s y vuelve 78 s después del `git revert` | Prueba E6. |

## Observado

**Sobre Pages CMS**

- **No acepta fotos de más de unos 3 MB (error 413).** Es justo el caso más normal: una foto hecha con el móvil. La versión alojada corre en Vercel, que corta las peticiones de más de 4,5 MB. Está reportado en su repositorio desde mayo de 2026 y sin arreglar. La documentación no lo menciona. Lo descubrimos con la primera prueba real.
- **Si entras con GitHub, el commit sale con tu correo.** Aunque la configuración diga `identity: app`, el commit que hicimos con la sesión de GitHub del administrador salió con su nombre y su correo personal, en un repositorio público. En cambio, los de la persona invitada por email salieron a nombre de `pages-cms[bot]`.
- **Después de guardar, se queda en la misma ficha.** La persona voluntaria quiso cambiar el estado de Tambor y cambió el de Blanquito, que era la ficha que tenía abierta. Por eso la guía dice que hay que volver a la lista.
- **Las descripciones de cada campo ayudan mucho.** Quien probó la guía comentó que la tarea era fácil porque cada campo explica qué poner. Merece la pena cuidar las descripciones de `.pages.yml` tanto como la guía.
- **Un lector de pantalla puede abrumar a quien no lo usa.** NVDA lee por defecto todo lo que pasa bajo el ratón. Para revisar una web con NVDA conviene desactivar el seguimiento del ratón (NVDA+M).
- **Las personas invitadas no ven la configuración.** En el móvil no aparecen «Configuration» ni «Collaborators».
- **Reescribe los archivos al guardar:** cambia el orden de los campos, pasa las listas a varias líneas y quita comillas. No afecta a la web.

**Sobre Cloudflare y GitHub**

- **La app de Cloudflare en GitHub solo veía `federg-conjunta`.** Hubo que darle acceso al repositorio nuevo desde los ajustes de GitHub antes de poder conectarlo.
- **Las aplicaciones conectadas a GitHub piden muchos permisos.** Al instalar Pages CMS lo limitamos a un solo repositorio.
- **El caché del HTML cambia según el hosting.** GitHub Pages sirve el HTML con `max-age=600` y Cloudflare con `max-age=0, must-revalidate`. Lo comprobamos con `curl`, y pesó en la elección.

**Sobre la forma de trabajar**

- **Escribir los criterios antes sirvió.** El fallo de las fotos no habría quedado tan claro sin un criterio que dijera «fotos sin prepararlas, también desde el móvil». Con él, el resultado es «cumple en parte», con el motivo y el apaño, en lugar de «más o menos funciona».
- **Wikimedia Commons limita las descargas seguidas** (error 429). De las 10 fotos elegidas bajamos 9. Rufo se quedó con una ilustración.
- **La herramienta de automatización del navegador no puede actuar en las páginas de autorización de GitHub.** Esos pasos los tiene que hacer una persona. Tiene sentido: dar permisos a una aplicación debe decidirlo alguien.

## Estimado

- **Crecimiento del repositorio:** unos 360 MB al año, si llegan 30 animales con 3 fotos de unos 4 MB cada una. Con el apaño de WhatsApp (unos 250 KB por foto) serían unos 25 MB al año. GitHub recomienda no pasar de 1 GB.
- **Construcciones que caben en el plan gratuito:** unas 2.100 al mes, con 3.000 minutos y unos 1,4 minutos por construcción. Para una protectora de pueblo sobra.
- **La opción de correo privado de GitHub:** debería evitar que los commits hechos con Pages CMS desde una cuenta de GitHub lleven el correo. No lo hemos comprobado.
- **El arreglo del límite de fotos:** si Pages CMS fusiona la PR #425, que reduce las fotos en el navegador, E4 se cumpliría sin tocar nada nuestro.

## Comparado con FEDERG

| | FEDERG | Protectora |
| --- | --- | --- |
| CMS | Sveltia CMS: borradores, vista previa y revisión antes de publicar | Pages CMS: se publica al guardar, sin borradores |
| Por qué | Noticias de salud: había que revisarlas antes de publicar | Estados de animales: tienen que cambiar enseguida |
| Quién edita | Personas con cuenta de GitHub | Cualquiera con un correo |
| Fotos | Sveltia las reduce en el navegador antes de subirlas | Hay que reducirlas antes (límite de unos 3 MB) |
| Hosting | Cloudflare Pages | Cloudflare Workers con assets estáticos, porque las construcciones se cuentan por minutos y no por número |

La misma carencia, publicar sin borradores, fue el motivo para descartar Pages CMS en FEDERG y es una ventaja en la protectora. Lo que aprendimos de la investigación «sin GitHub» sirvió para saber qué buscar, pero la decisión salió de los criterios de esta web.

## Qué haríamos distinto

1. **Probar el caso típico antes de elegir.** Antes de comparar CMS sobre el papel, haríamos un intento rápido con lo que hará de verdad el usuario: subir una foto desde el móvil. Nos habríamos ahorrado descubrir el límite después de decidir.
2. **Mirar quién firma los commits desde el primer guardado.** En un repositorio público, cualquier herramienta que haga commits puede exponer un correo.
3. **Poner el repositorio en una organización desde el principio,** como recomienda la prueba de permisos de FEDERG. Así los papeles de editor y revisor se podrían separar si un día hiciera falta revisar antes de publicar.
