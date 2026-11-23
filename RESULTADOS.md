# Resultado contra los criterios de aceptación

> **Proyecto de prácticas.** No es la web oficial de Amics dels Animals Dosrius.

Medición de la web contra [CRITERIOS.md](CRITERIOS.md). Documento en curso: se completa a medida que hacemos las pruebas. Cada criterio se marca como **cumple**, **cumple en parte**, **no cumple** o **pendiente**, junto con la prueba que lo demuestra.

Última actualización: 23/11/2026.

## Resumen

| Bloque | Cumple | En parte | No cumple | Pendiente |
| --- | --- | --- | --- | --- |
| Contenido (C1–C4) | 4 | 0 | 0 | 0 |
| Proyecto de prácticas (P1–P4) | 4 | 0 | 0 | 0 |
| Edición (E1–E7) | 2 | 2 | 0 | 3 |
| Calidad (Q1–Q5) | 3 | 0 | 0 | 2 |
| Hosting y coste (H1–H2) | 1 | 1 | 0 | 0 |
| Entregables (D1–D5) | 2 | 0 | 0 | 3 |

## Contenido

| # | Resultado | Prueba |
| --- | --- | --- |
| C1 | **Cumple** | El menú tiene Animales, Cómo adoptar, Colaborar, Noticias, Quiénes somos y Contacto. Además están la portada y la ficha de cada animal. Todo el contenido está en castellano. |
| C2 | **Cumple** | El esquema de `src/content.config.ts` obliga a rellenar todos los campos y pide al menos una foto con su descripción. Revisadas las fichas de Luna, Pelut y Tambor. |
| C3 | **Cumple** | Probado en Chrome: el filtro «Gato» muestra «Mostrando 2 de 6 animales» y guarda `?especie=gato` en la URL. Al pasar a Pelut a «Adoptado» desde el CMS, dejó de salir entre los disponibles y apareció en «Ya tienen casa». |
| C4 | **Cumple** | 8 animales (6 buscan casa y 2 adoptados) y 4 noticias o eventos. |

## Proyecto de prácticas

| # | Resultado | Prueba |
| --- | --- | --- |
| P1 | **Cumple** | El aviso sale arriba en todas las páginas y se repite en el pie, con un enlace a la página pública de la entidad en Teaming. |
| P2 | **Cumple** | `npm run verify -- <url>` recorre las 20 URL del sitemap y una URL inexistente: todas llevan `meta robots` con `noindex` y la cabecera `X-Robots-Tag: noindex, nofollow`. |
| P3 | **Cumple** | Animales inventados. No hay nombres ni teléfonos de voluntarios, y el correo es `hola@ejemplo.org`. Las 9 fotos son de Wikimedia Commons, con licencia libre y la autoría anotada en el README. Rufo usa una ilustración propia. |
| P4 | **Cumple** | No hemos contactado con la entidad. Los datos reales salen de su página pública de Teaming, que está citada en el README. |

## Edición

| # | Resultado | Prueba |
| --- | --- | --- |
| E1 | **Pendiente** | Invitación de Pages CMS enviada a un correo sin cuenta de GitHub. Falta entrar con ella. La pantalla de acceso ya ofrece «Continue with email». |
| E2 | **Cumple en parte** | Probado con la cuenta de administrador: cambiar el estado de un animal. Faltan, con la cuenta de voluntario, dar de alta un animal con fotos, publicar una noticia y editar una página fija. |
| E3 | **Cumple** | Medido: un push tardó 49 s en publicarse (09:31:13 → 09:32:02) y un cambio de estado desde Pages CMS, unos 69 s (09:44:32 → 09:45:41). Faltan más mediciones para llegar a las tres del criterio, pero las dos están muy por debajo de 5 minutos. La construcción se reparte así: preparar el entorno 38 s, clonar 2 s, instalar dependencias 37 s y construir unos 5 s. |
| E4 | **Pendiente** | Las fotos de Commons, de unos 700 KB, se sirven en WebP a 320, 480 y 640 px en las tarjetas. Falta subir una foto de móvil sin tocar desde el CMS. |
| E5 | **Pendiente** | Pages CMS documenta que las personas invitadas no pueden editar `.pages.yml` ni las invitaciones. Falta comprobarlo con la cuenta de voluntario. |
| E6 | **Cumple en parte** | Cada guardado es un commit en Git, sin límite de tiempo. Probado al deshacer la prueba de E7 con `git revert`. Falta recuperar una ficha borrada, como pide el criterio. |
| E7 | **Cumple** | Subimos a propósito un estado inválido (`perdido`). La construcción falló con `InvalidContentEntryDataError ... estado: Invalid option: expected one of "disponible"\|"reservado"\|"adoptado"` y la web siguió mostrando a Tambor como «Disponible». Después lo revertimos. ![Construcción fallida](capturas/e7-construccion-fallida.jpg) |

## Calidad

| # | Resultado | Prueba |
| --- | --- | --- |
| Q1 | **Cumple** | `npm run calidad`: Lighthouse móvil da 100 en Accesibilidad en las 5 plantillas, sin auditorías fallidas. Lighthouse usa axe-core. Informes en `calidad/`. |
| Q2 | **Pendiente** | Falta el recorrido a mano con teclado y la comprobación de contraste plantilla por plantilla. Los colores se eligieron calculando el contraste AA. |
| Q3 | **Pendiente** | Falta la prueba con NVDA. |
| Q4 | **Cumple** | Lighthouse móvil, con las fotos reales: 100 en Rendimiento en el inicio, el listado y la ficha. LCP entre 0,8 s y 1,8 s. |
| Q5 | **Cumple** | Sin scroll horizontal en las 5 plantillas a 320, 375, 768 y 1440 px. Capturas en `calidad/capturas/`. |

## Hosting y coste

| # | Resultado | Prueba |
| --- | --- | --- |
| H1 | **Cumple en parte** | Coste: 0 €. Los límites están en [COMPARATIVA.md](COMPARATIVA.md). Medido: cada construcción gasta unos 1,4 minutos del cupo de 3.000 al mes, así que caben unas 2.100 construcciones al mes. Falta revisar si Cloudflare pidió un método de pago. |
| H2 | **Cumple** | HTTPS en `*.workers.dev`. Repositorio público sin secretos. Los commits usan la dirección `noreply` de GitHub. |

## Entregables

| # | Resultado | Prueba |
| --- | --- | --- |
| D1 | **Cumple** | [COMPARATIVA.md](COMPARATIVA.md), apartado de CMS. |
| D2 | **Cumple** | [COMPARATIVA.md](COMPARATIVA.md), apartado de hosting. |
| D3 | **Pendiente** | Guía para el editor. |
| D4 | **Pendiente** | Prueba con una persona ajena al proyecto. |
| D5 | **Pendiente** | Documento de aprendizaje. |

## Cosas que hemos aprendido por el camino

- **Pages CMS firma con tu cuenta si entras con GitHub.** Aunque `.pages.yml` diga `commit.identity: app`, el commit que hicimos con la sesión de GitHub del administrador salió con su nombre y su correo personal. Como el repositorio es público, el correo quedó visible. Lo corregimos reescribiendo ese commit. Para que no vuelva a pasar, hay que activar en GitHub la opción de mantener el correo privado (pendiente de comprobar que funciona con Pages CMS). Las personas invitadas por email no tienen este problema: según la documentación, sus commits salen con la identidad de la aplicación.
- **Pages CMS reescribe los archivos al guardar.** Cambia el orden de los campos, pasa las listas al formato de varias líneas y quita las comillas que no hacen falta. No afecta a la web, pero el primer commit de cada ficha cambia más líneas de las que se han editado.
- **Astro acepta rutas de imagen absolutas desde la raíz** (`/src/assets/animales/luna.jpg`). Pages CMS no documenta si admite rutas relativas, pero con ese formato encajan los dos.
