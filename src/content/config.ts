import { defineCollection, z } from 'astro:content';

// Define the 'other' collection
const otherCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
  }),
});

// Define a common schema for blog posts and articles
const sharedPostSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  updatedDate: z.date().optional(),
  image: z.string().optional(), // Or z.object if using image metadata
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});

// Define the 'articles' collection
const articlesCollection = defineCollection({
  type: 'content',
  schema: sharedPostSchema,
});

// Define the 'blog' collection
const blogCollection = defineCollection({
  type: 'content',
  schema: sharedPostSchema, // Reusing the same schema for consistency
});

// Export a 'collections' object
export const collections = {
  other: otherCollection,
  articles: articlesCollection,
  blog: blogCollection,
};
