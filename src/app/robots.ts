import type { MetadataRoute } from 'next';

/**
 * Crawler policy.
 *
 * The site is written to be cited by answer engines, and it is not written to
 * be a training corpus. Those are different requests, and the robots file is
 * where they are separated:
 *
 *   allowed  — the crawlers that fetch a page in order to answer a question
 *              for a person: the search and answer engines.
 *   blocked  — the crawlers that collect pages in bulk for model training.
 *
 * Every entry below was checked against the crawler's own published
 * documentation on 24 October 2026.
 */
const ANSWER_ENGINES = [
  'OAI-SearchBot', // OpenAI — search index for ChatGPT answers
  'ChatGPT-User', // OpenAI — user-triggered fetch
  'ClaudeBot', // Anthropic — crawler
  'Claude-SearchBot', // Anthropic — search index
  'Claude-User', // Anthropic — user-triggered fetch
  'PerplexityBot', // Perplexity — crawler
  'Perplexity-User', // Perplexity — user-triggered fetch
  'Google-Extended', // Google — grounding and Gemini
  'Googlebot', // Google — search, including AI Overviews
  'Bingbot', // Bing — search, and the index behind Copilot answers
];

const TRAINING_CRAWLERS = [
  'GPTBot', // OpenAI — model training
  'Bytespider', // ByteDance — bulk training crawl
  'CCBot', // Common Crawl — training corpus
  'Applebot-Extended', // Apple — Apple Intelligence training
  'meta-externalagent', // Meta — AI training
  'facebookbot', // Meta — Facebook
  'Amazonbot', // Amazon — bulk crawl
];

export default function robots(): MetadataRoute.Robots {
  const base = 'https://www.aquasee.art';
  return {
    rules: [
      {
        userAgent: ANSWER_ENGINES,
        allow: '/',
      },
      {
        userAgent: TRAINING_CRAWLERS,
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}