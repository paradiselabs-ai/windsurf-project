import { defineCollection, z } from 'astro:content';

// Define a simple schema for markdown content
const markdownSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  draft: z.boolean().optional(),
});

// Define the 'articles' collection schema
const articlesCollection = defineCollection({
  type: 'content',
  schema: markdownSchema.extend({
    topics: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

// Define the 'blog' collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: markdownSchema.extend({
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

// Define the 'other' collection schema
const otherCollection = defineCollection({
  type: 'content',
  schema: markdownSchema,
});

// Export the collections
export const collections = {
  articles: articlesCollection,
  blog: blogCollection,
  other: otherCollection,
};
