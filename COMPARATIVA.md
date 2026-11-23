# Comparativa de CMS, hosting y framework

> **Proyecto de prácticas.** No es la web oficial de Amics dels Animals Dosrius ni se ha hecho con su participación.

Comparativa del 23/11/2026 para la web de prácticas de una protectora de pueblo. La decisión se toma contra nuestros [criterios de aceptación](CRITERIOS.md), no contra los de FEDERG. Toda la información sale de la documentación oficial consultada ese día; los precios y los planes gratuitos cambian a menudo.

Cada dato lleva una marca:

- **Probado**: lo hemos hecho o medido nosotros.
- **Documentado**: lo dice la documentación oficial, pero no lo hemos probado.
- **Estimado**: es una deducción nuestra, sin confirmar.

## Resumen

- **CMS: Pages CMS** (basado en Git). Es el único de los comparados que cumple a la vez E1 (entrar solo con el email), E5 (quien edita no toca la configuración) y E6 (recuperar algo un mes después) sin pagar.
- **CMS descartado: Sanity** (sin Git). Es mejor en imágenes y vista previa, pero en el plan gratuito falla tres criterios: obliga a crear una cuenta, todo el que edita es administrador y el historial dura 3 días.
- **Hosting: Cloudflare Workers con assets estáticos.** Cumple P2 con la cabecera `X-Robots-Tag`, sirve el HTML sin caché y cuenta las construcciones por minutos, no por número. Eso importa porque con Pages CMS cada guardado es una construcción.
- **Hosting descartado:** Netlify pausa la web cuando se acaban los créditos (unas 20 publicaciones al mes). GitHub Pages guarda el HTML 10 minutos en caché y no deja poner cabeceras. Vercel Hobby no conecta con organizaciones de GitHub.
- **Framework: Astro.** Optimiza las imágenes al construir, y eso compensa que Pages CMS no las toque. Además, valida el contenido: un dato mal puesto rompe la construcción antes de llegar a la web.

## Qué necesita esta protectora

Sale de los criterios. Lo que más pesa en la elección:

1. Las personas voluntarias no tienen perfil técnico y no van a crearse una cuenta de GitHub (E1).
2. Marcar un animal como adoptado tiene que verse rápido (E3). Aquí la rapidez importa más que una revisión antes de publicar.
3. Muchas fotos, hechas con el móvil y subidas sin preparar (E4).
4. Quien edita no puede romper la configuración (E5), y un error tiene que poder deshacerse aunque se descubra tarde (E6).
5. Coste cero y pocas piezas que mantener, porque nadie de la protectora se dedica a la web.

En FEDERG la prioridad era la contraria: revisar antes de publicar, porque eran noticias de salud. Por eso allí descartamos Pages CMS por no tener borradores ([INVESTIGACION-SIN-GITHUB.md](https://github.com/rivellesep/federg-conjunta/blob/main/INVESTIGACION-SIN-GITHUB.md)). Aquí esa misma carencia pesa poco: publicar al momento es justo lo que se necesita para los cambios de estado.

## CMS

### Las dos opciones principales

| Criterio | Pages CMS (basado en Git) | Sanity, plan gratuito (sin Git) |
| --- | --- | --- |
| **Autenticación** | Invitación por email. La persona entra sin cuenta de GitHub (**documentado** [1]), con un código de un solo uso (**documentado** en las notas de la versión 2.1.7 [2]). | Hay que crearse una cuenta de Sanity con Google, GitHub o email y contraseña (**documentado** [7]). **No cumple E1.** |
| **Roles y permisos** | Dos niveles. Las personas invitadas editan contenido e imágenes, pero no la configuración `.pages.yml` ni las invitaciones, que quedan para quien tiene acceso al repositorio en GitHub (**documentado** [1]). Cumple E5. | Solo Administrador y Lector en el plan gratuito. Para editar hay que ser administrador, con acceso completo a los ajustes del proyecto. El papel de Editor es de pago (**documentado** [8]). **No cumple E5.** |
| **Imágenes** | Se guardan en el repositorio, en la carpeta que configuremos. Pages CMS no las reduce ni las convierte (**documentado** [3]). Astro las optimiza al construir la web (**estimado**, por probar con este CMS). El texto alternativo va en un campo aparte marcado como obligatorio (**documentado** [4]). | Servicio de imágenes propio: recorte, punto de interés y conversión a WebP o AVIF desde la URL (**documentado** [9]). 100 GB gratis (**documentado** [10]). Es la parte en la que Sanity gana. |
| **Vista previa** | No tiene. Solo se puede montar con una acción propia que lance un workflow de GitHub (**documentado** [5]). Lo guardado se publica directamente. | Borradores, vista previa en vivo y edición visual incluidos (**documentado** [10]). En una web estática hay que montar una construcción aparte para ver los borradores (**estimado**). |
| **Historial** | Git: cada guardado es un commit, sin límite de tiempo. Recuperar una versión anterior lo hace alguien con acceso a GitHub, porque Pages CMS no documenta un botón para deshacer (**estimado**). Cumple E6. | 3 días en el plan gratuito. Un documento borrado solo se recupera dentro de ese plazo (**documentado** [11]). **No cumple E6.** |
| **Quién hizo cada cambio** | Por defecto, el commit sale a nombre de la aplicación, sin el email de la persona. Se puede incluir su nombre y email (**documentado** [6]), pero el repositorio es público, así que lo dejaremos desactivado. | Lo registra Sanity en su historial, que dura lo mismo: 3 días. |
| **Publicación** | Cada guardado es un commit en `main` y el hosting reconstruye la web (**estimado**). Cumple E3 si la construcción tarda poco. | Un webhook avisa al hosting para que reconstruya. Hay 2 webhooks en el plan gratuito (**documentado** [10]). |
| **Coste y límites** | Gratis en su versión alojada. No documenta límites de personas ni de repositorios (**documentado** [12]). Código abierto (MIT), con opción de alojarlo nosotros, pero eso pide PostgreSQL (**documentado** [13]). | Gratis: 20 personas, 10.000 documentos, 250.000 llamadas a la API al mes y 100 GB de tráfico. Al llegar al límite se bloquea, sin cobrar de más (**documentado** [10] [14]). |
| **Riesgos** | Un servicio de terceros con permiso de escritura en el repositorio, mediante su GitHub App. Las fotos originales se quedan para siempre en el historial de Git, así que el repositorio crece (ver [Límites que nos afectan](#límites-que-nos-afectan)). Es un proyecto activo: versión 2.1.8 de junio de 2026 y unas 4.200 estrellas (**documentado** [2]). | El contenido sale de Git y vive en Sanity: las copias hay que exportarlas aparte. Habría que escribir la carga de contenido contra su API (**estimado**). |

### Otras opciones que miramos

Datos de la investigación "sin GitHub" del 5/11 (**documentado** aquel día):

- **Sveltia CMS con GitHub**, el de FEDERG: cada voluntario necesita una cuenta de GitHub. **No cumple E1.**
- **Sveltia CMS con acceso por email** (Cloudflare Access y un Worker propio, la opción A de aquella investigación): cumple E1, pero son unas 380 líneas de código propio que mantener, y Zero Trust pide un método de pago al activarlo (**probado** el 5/11). Demasiado para una protectora.
- **Keystatic Cloud**: gratis hasta 3 personas, pero obliga a pasar Astro a modo servidor.
- **TinaCloud**: gratis para 2 personas.
- **Decap Turbo**: 1 plaza gratis.

### Decisión: Pages CMS

| Criterio | Pages CMS | Sanity gratis |
| --- | --- | --- |
| E1: entrar solo con el email | Sí | No |
| E3: el cambio se ve en menos de 5 minutos | Sí, si la construcción es rápida (**estimado**) | Sí, con webhook (**estimado**) |
| E4: fotos sin preparar, servidas optimizadas | Sí, gracias a Astro (**estimado**) | Sí, y mejor |
| E5: quien edita no toca la configuración | Sí | No |
| E6: recuperar algo un mes después | Sí, con Git | No (3 días) |
| E7: un error no tumba la web | Depende del hosting | Depende del hosting |

Lo que aceptamos al elegir Pages CMS:

- **No hay vista previa ni borradores.** Para no publicar un animal a medio rellenar, cada ficha tendrá un campo "Ocultar en la web".
- **Pages CMS no reduce las fotos.** Astro las optimiza al construir, pero los originales se quedan en el repositorio.
- **Dependemos de un servicio gratuito de terceros.** Si cerrara, el contenido sigue intacto en Git y se puede montar otro CMS encima. Es la ventaja de que el contenido sean archivos.

## Hosting

Con Pages CMS, **cada guardado es una construcción y un despliegue**. Subir un animal nuevo con su foto pueden ser dos commits (**estimado**). Por eso el límite que más nos importa es cuántas construcciones permite cada plan gratuito.

| Criterio | Cloudflare Workers (assets estáticos) | Cloudflare Pages | GitHub Pages | Netlify Free | Vercel Hobby |
| --- | --- | --- | --- | --- | --- |
| **Construcciones** | 3.000 minutos al mes, una cada vez, 20 minutos como máximo (**documentado** [15]) | 500 al mes (**documentado** [16]) | Sin límite por hora si se publica con GitHub Actions, que es gratis en repositorios públicos (**documentado** [17]) | 300 créditos al mes, y cada publicación cuesta 15: unas 20 publicaciones al mes (**documentado** [18]) | 100 despliegues al día (**documentado** [19]) |
| **Tráfico** | Peticiones a los archivos estáticos gratis e ilimitadas (**documentado** [20]) | No figura en la página de límites | 100 GB al mes, límite orientativo (**documentado** [17]) | 20 créditos por GB, del mismo saldo (**documentado** [18]) | 100 GB al mes (**documentado** [19]) |
| **Cabecera `X-Robots-Tag` (P2)** | Sí, con `_headers` (**documentado** [21]) | Sí, con `_headers` (**probado** en FEDERG) | No documenta cabeceras propias (**estimado**: solo `meta robots`) | Sí, con `_headers` (**documentado** [22]) | Sí, con `vercel.json` (**documentado** [23]) |
| **Caché del HTML (E3)** | `max-age=0, must-revalidate` (**documentado** [21]) | `max-age=0, must-revalidate` (**probado**) | `max-age=600`: quien ya la visitó puede ver la versión anterior durante 10 minutos (**probado**) | No lo miramos | No lo miramos |
| **Si falla la construcción (E7)** | Sin documentar: lo probaremos | Sin documentar | Sin documentar | Despliegues atómicos (**documentado** [24]) | Sin documentar |
| **Repositorio en una organización** | Sí (**documentado** [25]) | Sí | Sí | Sí | **No** en Hobby (**documentado** [19]) |
| **Qué pasa al llegar al límite** | Sin documentar para las construcciones | Sin documentar | Respuestas 429 (**documentado** [17]) | **La web se pausa** y se muestra "Site not available" (**documentado** [18]) | La función se bloquea 30 días (**documentado** [19]) |

### Decisión: Cloudflare Workers con assets estáticos

- **Cumple P2 por completo**: `meta robots` en cada página y además la cabecera `X-Robots-Tag`.
- **Cumple E3 sin sorpresas**: el HTML no se guarda en caché, así que un animal marcado como adoptado deja de salir disponible en cuanto termina el despliegue.
- **Las construcciones se cuentan por minutos.** Si la web tarda en torno a un minuto en construirse (**estimado**, lo mediremos), caben unas 3.000 al mes, frente a las 500 de Cloudflare Pages.
- **Es la vía que Cloudflare recomienda ahora**: su guía presenta el paso de Pages a Workers como el camino a seguir [26]. Una web Astro estática no necesita código de Worker, basta con indicar la carpeta `dist` (**documentado** [27]).

Descartados:

- **Cloudflare Pages**: es la que conocemos de FEDERG, y la descartamos por el límite de 500 construcciones, justo con un CMS que construye en cada guardado. No es una herencia: si Pages CMS hiciera pocos commits, Pages valdría igual.
- **GitHub Pages**: tendría la ventaja de juntar repositorio, construcción y web en un solo sitio. La descartamos por la caché de 10 minutos, que choca con E3, y porque no deja poner `X-Robots-Tag`.
- **Netlify Free**: con unos 20 despliegues al mes, una tarde de voluntarios subiendo animales gastaría el mes entero. Al acabarse los créditos, la web se pausa.
- **Vercel Hobby**: no conecta con repositorios de una organización de GitHub, que es donde debería estar el repositorio si la web fuera de verdad (ver [PERMISOS.md de FEDERG](https://github.com/rivellesep/federg-conjunta/blob/main/PERMISOS.md)).

## Framework

**Astro**, por tres razones:

- **Optimiza las imágenes al construir** (formatos modernos y varios tamaños). Eso compensa que Pages CMS suba las fotos tal cual (**documentado** en Astro; **estimado** con este CMS).
- **Valida el contenido con un esquema.** Si alguien deja un estado que no existe o una ficha sin foto, la construcción falla. Con un hosting que mantiene la versión anterior, el error no llega a la web (E7, por probar).
- **Ya lo conocemos.** El riesgo y el tiempo están en el CMS y el hosting nuevos, no en el framework.

Descartados:

- **Hugo**: rapidísimo y con procesado de imágenes propio, pero su lenguaje de plantillas es nuevo para nosotros y no valida los datos del contenido. Un valor mal puesto desde el CMS pasaría sin avisar (**estimado**).
- **Eleventy**: sencillo, pero necesita complementos para las imágenes y para validar el contenido (**estimado**).

## Límites que nos afectan

| Límite | Cifra | Por qué nos afecta | Qué hacemos |
| --- | --- | --- | --- |
| Construcciones en Cloudflare Workers | 3.000 minutos al mes [15] | Cada guardado en Pages CMS construye la web | Medir cuánto tarda una construcción y anotar cuántas caben al mes |
| Tamaño del repositorio en GitHub | Recomendado por debajo de 1 GB [17] | Las fotos de móvil (de 3 a 5 MB) se quedan en el historial de Git aunque luego se reduzcan | Unos 30 animales al año con 3 fotos son unos 360 MB al año (**estimado**). Lo vigilaremos. La solución de fondo sería guardar las fotos fuera del repositorio, que Pages CMS anuncia como "próximamente" [12]. |
| Archivos por versión del Worker | 20.000, de 25 MiB como máximo cada uno [28] | Astro genera varias versiones de cada foto | Muy lejos para una web de este tamaño (**estimado**) |
| Personas en Pages CMS | No documentado [12] | Si un día limitaran el plan gratuito | El contenido sigue en Git: se podría cambiar de CMS sin perderlo |

## Fuentes

Consultadas el 23/11/2026.

1. Pages CMS, colaboradores: https://pagescms.org/docs/configuration/collaborators/
2. Pages CMS, versiones: https://github.com/pages-cms/pages-cms/releases
3. Pages CMS, medios: https://pagescms.org/docs/configuration/media/
4. Pages CMS, campos: https://pagescms.org/docs/configuration/content/fields/
5. Pages CMS, acciones: https://pagescms.org/docs/configuration/actions/
6. Pages CMS, ajustes: https://pagescms.org/docs/configuration/settings/
7. Sanity, cuentas: https://www.sanity.io/docs/platform-management/manage-your-account
8. Sanity, roles: https://www.sanity.io/docs/user-guides/roles
9. Sanity, URL de imágenes: https://www.sanity.io/docs/apis-and-sdks/image-urls
10. Sanity, precios: https://www.sanity.io/pricing
11. Sanity, historial: https://www.sanity.io/docs/user-guides/history-experience
12. Pages CMS, portada y preguntas frecuentes: https://pagescms.org/
13. Pages CMS, alojarlo nosotros: https://pagescms.org/docs/guides/installing/self-host/
14. Sanity, planes y pagos: https://www.sanity.io/docs/platform-management/plans-and-payments
15. Cloudflare Workers Builds, límites: https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/
16. Cloudflare Pages, límites: https://developers.cloudflare.com/pages/platform/limits/
17. GitHub Pages, límites: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
18. Netlify, cómo funcionan los créditos: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
19. Vercel, límites: https://vercel.com/docs/limits y https://vercel.com/pricing
20. Cloudflare Workers, facturación de assets estáticos: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
21. Cloudflare Workers, cabeceras: https://developers.cloudflare.com/workers/static-assets/headers/
22. Netlify, cabeceras: https://docs.netlify.com/manage/routing/headers/
23. Vercel, cabeceras: https://vercel.com/docs/headers
24. Netlify, despliegues: https://docs.netlify.com/deploy/deploy-overview/
25. Cloudflare Workers Builds con GitHub: https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/
26. Cloudflare, migrar de Pages a Workers: https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
27. Cloudflare, guía de Astro: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
28. Cloudflare Workers, límites: https://developers.cloudflare.com/workers/platform/limits/
