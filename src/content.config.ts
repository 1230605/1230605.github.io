import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const shared = {
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true),
  demo: z.boolean().default(false),
};
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({ ...shared, date: z.coerce.date() }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...shared,
    order: z.number().default(0),
    cover: z.string().default('/images/project-placeholder.svg'),
    coverAlt: z.string().default('抽象几何图形'),
    code: z.url().optional(),
    paper: z.url().optional(),
  }),
});
export const collections = { articles, projects };
