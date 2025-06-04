import { defineCollection, z } from 'astro:content';

// Define the 'articles' collection schema
const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    topics: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

// Define the 'blog' collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().optional(), // Assuming blog posts can also be drafts
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

// Define the 'other' collection schema
// For 'other', if it only needs the base fields, we can define it simply or create a base schema if reused elsewhere.
const otherCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Define the 'thoughts' collection schema
const thoughtsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    topics: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

// Export the collections
export const collections = {
  articles: articlesCollection,
  blog: blogCollection,
  other: otherCollection,
  thoughts: thoughtsCollection,
};
