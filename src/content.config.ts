import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const optStr = z.string().optional().nullable();
const optNum = z.coerce.number().optional().nullable();

const stones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stones' }),
  schema: z.object({
    title: z.string(),
    tagline: optStr,
    summary: optStr, // short description for cards, search results and SEO
    image: optStr,
    image_alt: optStr,
    image_credit: optStr,
    image_credit_url: optStr,
    section: z.enum(['gemstones', 'decorative-stones', 'crystals-minerals']),
    categories: z.array(z.string()).default([]),
    colors: z.array(z.string()).default([]),
    birth_months: z.array(z.string()).default([]),
    rarity: optStr,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Quick facts (empty fields are hidden)
    hardness_min: optNum,
    hardness_max: optNum,
    mineral_family: optStr,
    chemical_formula: optStr,
    crystal_system: optStr,
    refractive_index: optStr,
    specific_gravity: optStr,
    main_sources: optStr,
    anniversary: optStr,
    price_tier: optStr,
    // Decorative stones
    rock_type: optStr,
    porosity: optStr,
    finishes: z.array(z.string()).default([]),
    best_uses: optStr,
    updated: z.coerce.date().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['learn', 'compare', 'journal']),
    summary: optStr,
    image: optStr,
    image_alt: optStr,
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    related_stones: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { stones, articles };
