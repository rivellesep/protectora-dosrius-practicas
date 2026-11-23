import { getCollection, type CollectionEntry } from 'astro:content';

export type Animal = CollectionEntry<'animales'>;
export type Noticia = CollectionEntry<'noticias'>;

/** Visible animals, newest arrivals first */
export async function getAnimales(): Promise<Animal[]> {
  const todos = await getCollection('animales', ({ data }) => !data.oculto);
  return todos.sort((a, b) => b.data.llegada.getTime() - a.data.llegada.getTime());
}

/** Visible news and events, newest first */
export async function getNoticias(): Promise<Noticia[]> {
  const todas = await getCollection('noticias', ({ data }) => !data.oculto);
  return todas.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

const fmt = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
export const fecha = (d: Date) => fmt.format(d);
