import { defineCollection, z } from 'astro:content';

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
  schema: sharedPostSchema.extend({
    // Add topics field specifically for articles
    topics: z.array(
      z.union([
        z.string(),
        z.object({
          id: z.string(),
          name: z.string().optional()
        })
      ])
    ).optional(),
  }),
});

// Define the 'blog' collection
const blogCollection = defineCollection({
  type: 'content',
  schema: sharedPostSchema, // Reusing the same schema for consistency
});

// Define the 'projects' collection
const otherCollection = defineCollection({
  type: 'data', // Set to 'data' as projects are defined in projects.json
  schema: z.array( // Expect an array of projects
    z.object({
      title: z.string(),
      description: z.string().optional(),
      logo: z.string().optional(), // Path to the logo image (relative to /public/images/projects/)
      url: z.string(), // External URL for the project
      order: z.number().optional(), // Optional ordering for projects
    })
  ),
});

// Export a 'collections' object
export const collections = {
  other: otherCollection,
  articles: articlesCollection,
  blog: blogCollection,
};
