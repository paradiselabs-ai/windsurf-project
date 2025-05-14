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

// Define the 'projects' collection
const projectsCollection = defineCollection({
  type: 'data', // Set to 'data' as projects are defined in projects.json
  schema: z.array( // Expect an array of projects
    z.object({
      title: z.string(),
      description: z.string().optional(),
      logoIdentifier: z.string().optional(), // Using an identifier for the logo
      url: z.string(), // External URL for the project
      // order: z.number().optional(), // Add back if ordering by number is desired
    })
  ),
});

// Export a 'collections' object
export const collections = {
  other: otherCollection,
  articles: articlesCollection,
  blog: blogCollection,
  projects: projectsCollection,
};
