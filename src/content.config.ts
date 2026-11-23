import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// .pages.yml (Pages CMS) mirrors these schemas field by field.
// If you add, rename or remove a field here, do the same there, or the CMS will save
// files that fail the build. A failed build never replaces the live site.

// Labels shown on the site for each stored value. Keep the keys in sync with .pages.yml.
export const ESPECIES = { perro: 'Perro', gato: 'Gato', otro: 'Otro' } as const;
export const SEXOS = { macho: 'Macho', hembra: 'Hembra' } as const;
export const TAMANOS = { pequeno: 'Pequeño', mediano: 'Mediano', grande: 'Grande' } as const;
export const ESTADOS = { disponible: 'Disponible', reservado: 'Reservado', adoptado: 'Adoptado' } as const;
export const CONVIVE = { perros: 'Perros', gatos: 'Gatos', ninos: 'Niños y niñas' } as const;

const keys = <T extends Record<string, string>>(obj: T) =>
  Object.keys(obj) as [keyof T & string, ...(keyof T & string)[]];

// The CMS may save an emptied optional field as "" or null instead of leaving it out
const vacio = (v: unknown) => (v === '' || v === null ? undefined : v);

// Animals: one Markdown file per animal in src/content/animales/. The body is the
// description of the animal's character. All animals are invented sample content.
const animales = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/animales' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string().min(1),
      especie: z.enum(keys(ESPECIES)),
      sexo: z.enum(keys(SEXOS)),
      // Free text on purpose: "unos 3 años", "cachorro de 4 meses"
      edad: z.string().min(1),
      tamano: z.enum(keys(TAMANOS)),
      estado: z.enum(keys(ESTADOS)),
      convive: z.preprocess(vacio, z.array(z.enum(keys(CONVIVE))).default([])),
      resumen: z.string().min(1).max(160),
      llegada: z.coerce.date(),
      // At least one photo, each with its own description for people who cannot see it
      fotos: z
        .array(
          z.object({
            imagen: image(),
            alt: z.string().min(1, 'Describe la foto para quien no puede verla'),
          })
        )
        .min(1, 'Cada animal necesita al menos una foto'),
      // Stand-in for drafts: Pages CMS publishes on save, so a half-filled card stays hidden
      oculto: z.preprocess(vacio, z.boolean().default(false)),
    }),
});

// News and events in one list: events add a place and use `fecha` as the event date
const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: ({ image }) =>
    z
      .object({
        titulo: z.string().min(1),
        tipo: z.enum(['noticia', 'evento']),
        fecha: z.coerce.date(),
        lugar: z.preprocess(vacio, z.string().optional()),
        resumen: z.string().min(1).max(200),
        imagen: z.preprocess(vacio, image().optional()),
        alt: z.preprocess(vacio, z.string().optional()),
        oculto: z.preprocess(vacio, z.boolean().default(false)),
      })
      .refine((n) => !n.imagen || (n.alt && n.alt.trim().length > 0), {
        message: 'Si hay imagen, describe la imagen para quien no puede verla',
        path: ['alt'],
      })
      .refine((n) => n.tipo !== 'evento' || (n.lugar && n.lugar.trim().length > 0), {
        message: 'Los eventos necesitan un lugar',
        path: ['lugar'],
      }),
});

// Fixed pages (who we are, how to adopt, how to help, contact). The file name is the URL.
const paginas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paginas' }),
  schema: z.object({
    titulo: z.string().min(1),
    intro: z.string().min(1),
    orden: z.preprocess(vacio, z.number().default(99)),
  }),
});

export const collections = { animales, noticias, paginas };
