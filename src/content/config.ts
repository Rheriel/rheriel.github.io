import { defineCollection, z } from 'astro:content';

const volumes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number()
  })
});

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    level: z.string(),
    volume: z.string(),
    order: z.number(),
    summary: z.string()
  })
});

export const collections = {
  volumes,
  concepts
};
