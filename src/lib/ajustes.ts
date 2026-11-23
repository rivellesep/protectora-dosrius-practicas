import { z } from 'astro/zod';
import raw from '../data/ajustes.json';

// Site-wide texts edited from the CMS ("Ajustes de la web" in .pages.yml).
// Parsed here so a wrong value from the CMS fails the build instead of the live site.
const schema = z.object({
  titular: z.string().min(1),
  subtitulo: z.string().min(1),
  teaming: z.url(),
  // Placeholder address on purpose: this practice site never shows real contact data
  email: z.email(),
  avisoAdopciones: z.string().min(1),
});

export const ajustes = schema.parse(raw);

// The real organisation, linked from the practice-project notice on every page
export const ENTIDAD_REAL = {
  nombre: 'Amics dels Animals Dosrius',
  url: 'https://www.teaming.net/amicsdelsanimalsdosrius',
};
