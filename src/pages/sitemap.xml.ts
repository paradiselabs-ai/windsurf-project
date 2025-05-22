import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

// Base URL for your site
const SITE_URL = 'https://paradiselabs.co';

export const GET: APIRoute = async () => {
  // Get all articles and blog posts
  const [articles, posts] = await Promise.all([
    getCollection('articles'),
    getCollection('posts')
  ]);

  // Generate sitemap entries for all content
  const pages = [
    '',
    '/about',
    '/articles',
    '/blog',
    ...articles.map(article => `/articles/${article.id.replace(/\.md$/, '')}`),
    ...posts.map(post => `/blog/${post.id.replace(/\.md$/, '')}`)
  ];

  // Format the sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
