/**
 * Inquiry attribution.
 *
 * The GEO programme needs to know which inquiries arrived because an answer
 * engine sent the visitor here, so the commercial signal and the visibility
 * signal can be read against each other. The classification is deliberately
 * conservative: it only claims an AI source when the referrer or the user
 * agent is unmistakably one.
 */
export type SourceKind = 'ai' | 'campaign' | 'organic' | 'referral' | 'direct';

export type InquiryAttribution = {
  source: SourceKind;
  /** The answer engine, when the source is an AI engine. */
  engine?: string;
  /** Host of the referring page, when there was one. */
  referrer?: string;
  /** The page the visitor landed on. */
  landingPath?: string;
  /** Campaign marker, when one was present in the URL. */
  campaign?: string;
  /** The language the visitor was reading. */
  locale?: string;
};

const AI_HOSTS: { match: RegExp; engine: string }[] = [
  { match: /(chatgpt\.com|chat\.openai\.com|openai\.com)/i, engine: 'ChatGPT' },
  { match: /(perplexity\.ai|perplexity\.com)/i, engine: 'Perplexity' },
  { match: /(claude\.ai|anthropic\.com)/i, engine: 'Claude' },
  { match: /(gemini\.google\.com|google\.com\/gemini)/i, engine: 'Gemini' },
  { match: /(copilot\.microsoft\.com|microsoft\.com.*copilot|bing\.com\/copilot)/i, engine: 'Copilot' },
  { match: /(you\.com|phind\.com)/i, engine: 'You.com / Phind' },
  { match: /(kimi\.(com|cn)|moonshot)/i, engine: 'Kimi' },
  { match: /(doubao\.com|volcengine)/i, engine: 'Doubao' },
  { match: /(quark\.cn|quark\.com)/i, engine: 'Quark' },
  { match: /(yandex\.(com|ru))/i, engine: 'Yandex' },
  { match: /deepseek/i, engine: 'DeepSeek' },
  { match: /(tongyi\.com|qianwen|dashscope)/i, engine: 'Qwen' },
  { match: /(zhipu|chatglm)/i, engine: 'GLM' },
];

const ORGANIC_HOSTS =
  /(google\.|bing\.com|duckduckgo\.com|yahoo\.|baidu\.com|yandex\.|naver\.com|ecosia\.org|startpage\.com|brave\.com)/i;

export function hostFromUrl(url: string | null | undefined): string {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

/** Detects the answer engine behind a referrer, if there is one. */
export function detectEngine(referrer: string | null | undefined): string | undefined {
  if (!referrer) return undefined;
  const found = AI_HOSTS.find((entry) => entry.match.test(referrer));
  return found?.engine;
}

/**
 * Bots that fetch a page in order to answer a question for a person. Used for
 * the crawler-side visibility signal, not for attribution.
 */
export function isAnswerEngineBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return /OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|PerplexityBot|Perplexity-User|Google-Extended|Googlebot|Bingbot/i.test(
    userAgent,
  );
}

export function classifyAttribution({
  referer,
  userAgent,
  landingPath,
  campaign,
  locale,
}: {
  referer?: string | null;
  userAgent?: string | null;
  landingPath?: string | null;
  campaign?: string | null;
  locale?: string | null;
}): InquiryAttribution {
  const attribution: InquiryAttribution = {
    source: 'direct',
    landingPath: landingPath?.slice(0, 200) || undefined,
    campaign: campaign?.slice(0, 120) || undefined,
    locale: locale?.slice(0, 8) || undefined,
  };

  const host = hostFromUrl(referer);
  if (host) attribution.referrer = host;

  const engine = detectEngine(referer);
  if (engine) {
    attribution.source = 'ai';
    attribution.engine = engine;
    return attribution;
  }

  if (campaign) {
    attribution.source = 'campaign';
    return attribution;
  }

  if (host && ORGANIC_HOSTS.test(host)) {
    attribution.source = 'organic';
    return attribution;
  }

  if (host) attribution.source = 'referral';
  return attribution;
}