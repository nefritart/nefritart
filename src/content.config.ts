import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title_cs: z.string(),
    title_en: z.string().optional(),
    title_de: z.string().optional(),
    title_ru: z.string().optional(),
    category: z.enum(['pendants', 'figurines', 'earrings_rings']),
    stone: z.enum(['nephrite', 'jadeite']).optional(),
    dimensions: z.string().optional(),
    price_from_czk: z.number().optional(),
    images: z.array(z.string()).default([]),
    published: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

export const collections = { products };
