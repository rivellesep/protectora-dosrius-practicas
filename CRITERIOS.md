# Criterios de aceptación: web de prácticas de Amics dels Animals Dosrius

> **Proyecto de prácticas.** No es la web oficial de Amics dels Animals Dosrius ni se ha hecho con su participación. Los animales y las fotos son de ejemplo.

Escritos el 23/11/2026, antes de elegir el CMS y el hosting y antes de escribir código. Al terminar, cada criterio se marca como **cumple**, **cumple en parte** o **no cumple**, con la prueba que lo demuestra.

## El caso

Una protectora de pueblo, llevada solo por voluntarios. Quien va a editar la web es alguna de esas personas voluntarias: sin perfil técnico, con poco tiempo, a menudo desde el móvil. Lo que más cambia son las fichas de los animales: llega uno nuevo, se reserva o se adopta. Que un animal adoptado siga apareciendo como disponible genera llamadas y falsas esperanzas, así que los cambios de estado tienen que verse rápido.

## Contenido

| # | Criterio | Cómo lo comprobamos |
| --- | --- | --- |
| C1 | La web, en castellano, tiene: inicio, animales en adopción (listado y ficha), cómo adoptar, cómo colaborar (acogida, voluntariado y donaciones), noticias y eventos, quiénes somos y contacto. | Recorrer el menú y el mapa del sitio. |
| C2 | Cada ficha de animal tiene: nombre, especie, sexo, edad aproximada, tamaño, estado (disponible, reservado o adoptado), descripción del carácter, con qué convive bien y al menos una foto con texto alternativo. | Revisar el esquema de contenido y tres fichas. |
| C3 | El listado se puede filtrar por especie y por estado. Los animales adoptados no salen entre los disponibles: van a una sección aparte, "Ya tienen casa". | Probar los filtros. Cambiar un animal a adoptado y ver dónde aparece. |
| C4 | Hay al menos 6 animales de ejemplo y 3 noticias o eventos. | Contarlos. |

## Proyecto de prácticas

| # | Criterio | Cómo lo comprobamos |
| --- | --- | --- |
| P1 | Todas las páginas muestran un aviso visible de proyecto de prácticas que enlaza a la entidad real. | Revisar cada plantilla. |
| P2 | Todas las páginas llevan `noindex`: etiqueta `meta robots` y, si el hosting lo permite, también la cabecera `X-Robots-Tag`. | Script que recorre todas las URL del sitemap y comprueba las dos cosas. |
| P3 | No hay datos personales reales: animales inventados, ni nombres ni teléfonos de voluntarios, y fotos con licencia libre cuya autoría queda anotada. | Revisar el contenido y la lista de fotos con su licencia. |
| P4 | No se contacta con la organización. Lo real (nombre, pueblo, forma de funcionar, enlace de donaciones) sale de fuentes públicas, que quedan citadas. | Lista de fuentes en el README. |

## Edición

| # | Criterio | Cómo lo comprobamos |
| --- | --- | --- |
| E1 | Una persona voluntaria entra en el editor **sin crearse una cuenta de GitHub** ni de ningún otro servicio técnico: le basta su email. | Invitar a una cuenta de correo nueva y entrar con ella. |
| E2 | Desde el editor, sin tocar código, se puede dar de alta un animal con fotos, cambiar su estado, publicar una noticia o un evento y cambiar los textos de las páginas fijas. | Hacer las cuatro tareas con la cuenta de voluntario. |
| E3 | Un cambio de estado (por ejemplo, a adoptado) se ve en la web pública en **menos de 5 minutos**. | Cronometrarlo tres veces. |
| E4 | Las fotos se suben sin prepararlas, también desde el móvil, y la web las sirve optimizadas (formato moderno y tamaño según la pantalla). El texto alternativo es obligatorio en el editor. | Subir una foto de móvil sin tocar. Revisar el HTML resultante y el peso de la imagen. |
| E5 | Quien edita contenido no puede cambiar la configuración del editor, el código ni los permisos. | Intentarlo con la cuenta de voluntario. |
| E6 | Si alguien borra o estropea una ficha, se puede recuperar la versión anterior **aunque el error se descubra un mes después**. | Borrar una ficha y recuperarla. Documentar dónde queda el historial y cuánto dura. |
| E7 | Un cambio que rompe la construcción de la web no tumba la web publicada: se queda la versión anterior. | Provocar un error a propósito y comprobar que la web sigue igual. |

## Calidad

| # | Criterio | Cómo lo comprobamos |
| --- | --- | --- |
| Q1 | Accesibilidad automática: 0 errores de axe y Lighthouse Accesibilidad ≥ 95 en todas las plantillas (inicio, listado, ficha, noticia y página fija). | Informes guardados en el repositorio. |
| Q2 | Accesibilidad a mano: toda la web se usa solo con teclado, con el foco siempre visible y un enlace para saltar al contenido. El contraste es AA (4,5:1 en texto normal). El idioma de cada página está declarado. | Recorrido con teclado y comprobación de contraste, anotados por plantilla. |
| Q3 | Con un lector de pantalla (NVDA) se puede encontrar un animal disponible, abrir su ficha y llegar a cómo adoptarlo. | Prueba con NVDA, anotada. |
| Q4 | Rendimiento: Lighthouse móvil ≥ 90 en el inicio, el listado y una ficha. | Informes guardados en el repositorio. |
| Q5 | Sin scroll horizontal desde 320 px de ancho. Revisada a 375, 768 y 1440 px. | Capturas a esas tres anchuras. |

## Hosting y coste

| # | Criterio | Cómo lo comprobamos |
| --- | --- | --- |
| H1 | Coste: 0 €. Los límites del plan gratuito que nos afectan (construcciones al mes, ancho de banda, almacenamiento de fotos, personas en el editor) están anotados con su cifra y su fuente. | Tabla de límites en la comparativa. |
| H2 | Publicada con HTTPS en una URL pública. El repositorio es público y no contiene secretos: las claves viven en los secretos de cada servicio. | Abrir la URL. Buscar claves en el repositorio y en su historial. |

## Entregables

| # | Criterio | Cómo lo comprobamos |
| --- | --- | --- |
| D1 | Comparativa de CMS, con al menos una opción basada en Git y otra que no lo sea: autenticación, roles y permisos, imágenes, vista previa, historial, coste y límites. Incluye la opción descartada y el motivo, y cada dato va marcado como probado, documentado o estimado. | Documento en el repositorio. |
| D2 | Comparativa de hosting, con la opción descartada y el motivo. | Documento en el repositorio. |
| D3 | Una guía para el editor, para personas sin perfil técnico. | Documento en el repositorio. |
| D4 | Una persona ajena al proyecto completa sin ayuda, usando solo la guía, una tarea real: dar de alta un animal con foto y marcar otro como adoptado. Queda anotado qué le costó y qué cambiamos de la guía después. | Notas de la prueba y cambios de la guía en el historial. |
| D5 | Un documento de aprendizaje que separa lo medido, lo observado y lo estimado. | Documento en el repositorio. |
