# Protocolo de la prueba con una persona ajena al proyecto (D4)

> **Proyecto de prácticas.** No es la web oficial de Amics dels Animals Dosrius.

**Estado:** hecha por un miembro del equipo, que la encontró fácil porque cada campo explica qué poner. Pendiente de repetirla con una persona ajena, siguiendo este protocolo.

## Objetivo

Comprobar que una persona que no conoce el proyecto puede hacer una tarea de edición real **solo con [GUIA-EDITOR.md](GUIA-EDITOR.md)**, sin ayuda. Y corregir la guía con lo que le cueste.

## Quién

- Alguien sin relación con el proyecto ni con la web: un familiar, un amigo o un compañero de otro grupo.
- Que no tenga cuenta de GitHub. Así se prueba también la entrada solo con el correo (E1).
- Mejor si es alguien poco habituado a la informática: se parece más a una persona voluntaria real.

## Preparación (quien administra la web)

1. En Pages CMS → **Collaborators** → **Invite**, escribir el correo de la persona.
2. Comprobar que la ficha de prueba que va a marcar como adoptada existe y está «Disponible». Por ejemplo, Tambor.
3. Tener a mano una foto de un animal sin personas. Si la persona usa una foto suya del móvil, mejor: así se prueba el límite de tamaño.

## Instrucciones que se le dan (por escrito, sin explicar nada más)

> Te ha llegado una invitación para editar la web de una protectora. Usando solo esta guía (enlace a GUIA-EDITOR.md), haz estas dos cosas:
> 1. Da de alta un animal nuevo con una foto.
> 2. Marca a Tambor como adoptado.
> Si te atascas, sigue intentándolo con la guía. Avísame cuando termines o si te rindes.

## Qué observa quien hace la prueba (sin intervenir)

| Momento | Qué apuntar |
| --- | --- |
| Entrada | ¿Encuentra «Continue with email»? ¿Le llega el código? ¿Tiempo hasta ver la lista de animales? |
| Alta del animal | ¿Encuentra «Add an entry»? ¿Qué campos le hacen dudar? ¿Le sale el error 413 con la foto? ¿Sabe resolverlo con la guía? ¿Qué escribe como descripción de la foto? |
| Cambio de estado | ¿Vuelve a la lista o se queda en la ficha anterior? ¿Cambia el animal correcto? |
| Final | Tiempo total. ¿Pidió ayuda? ¿En qué punto? ¿Qué parte de la guía leyó y cuál se saltó? |

## Cómo se da por superada

- Las dos tareas están hechas, se ven en la web y no ha recibido ayuda.
- La foto tiene una descripción que explica lo que se ve.
- El animal que se marca como adoptado es el correcto.

## Después

1. Anotar aquí sus dudas, sus errores y los tiempos, sin datos personales de la persona.
2. Cambiar la guía en un commit aparte que diga qué se cambió por esta prueba.
3. Actualizar D4 en [RESULTADOS.md](RESULTADOS.md).
4. Quitar a la persona de **Collaborators** en Pages CMS.

## Lo que ya sabemos sin la prueba

La prueba con la cuenta de voluntario, hecha por un miembro del equipo desde el móvil, ya sacó dos problemas que la guía recoge:

- **Fotos de más de unos 3 MB:** dan el error 413. La guía explica cómo pasarlas por WhatsApp.
- **Después de guardar, el editor se queda en la misma ficha:** es fácil cambiar el animal que no era. La guía dice que hay que volver a la lista.
