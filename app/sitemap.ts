import type { MetadataRoute } from 'next';

import { articles } from '@/app/articles/articlesData';
import { site } from '@/app/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: site.url,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${site.url}/how-we-work`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${site.url}/approaches`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${site.url}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${site.url}/articles`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${site.url}/tools`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${site.url}/book`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${site.url}/ethics`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${site.url}/tools/anxiety-scale`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/tools/depression-scale`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/tools/thought-diary`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/tools/emotion-wheel`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/tools/schema-test`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/tools/schema-modes-test`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/tools/schema-modes`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/tools/schemas-needs`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map(
    (article) => ({
      url: `${site.url}/articles/${article.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  );

  return [
    ...staticPages,
    ...articlePages,
  ];
}