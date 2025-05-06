import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';
import vercel from '@astrojs/vercel';
import { spectreDark } from './src/ec-theme';

// https://astro.build/config
export default defineConfig({
  site: 'https://paradiselabs.co',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'ParadiseLabs',
      openGraph: {
        home: {
          title: 'Paradise Labs',
          description: 'Building in public at Paradise Labs.'
        },
        blog: {
          title: 'Blog | Paradise Labs',
          description: 'Updates and insights from Paradise Labs.'
        },
        projects: {
          title: 'Projects | Paradise Labs'
        }
      }
    })
  ],
  adapter: vercel()
});