import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { headingId } from '@/lib/guide-markdown';

const components: Components = {
  h2: ({ children }) => <h2 id={headingId(String(children))} className="mt-16 first:mt-0 scroll-mt-28 border-t border-line pt-10 font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-ink">{children}</h2>,
  h3: ({ children }) => <h3 id={headingId(String(children))} className="mt-9 scroll-mt-28 font-display text-[1.5rem] leading-snug text-ink">{children}</h3>,
  p: ({ children }) => <p className="mt-5 text-[1.0625rem] leading-[1.85] text-body">{children}</p>,
  ul: ({ children }) => <ul className="my-6 list-disc space-y-3 pl-6 text-[1.0625rem] leading-[1.75] text-body marker:text-accent">{children}</ul>,
  ol: ({ children }) => <ol className="my-6 list-decimal space-y-4 pl-6 text-[1.0625rem] leading-[1.75] text-body marker:font-semibold marker:text-accent">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  a: ({ href, children }) => href?.startsWith('/')
    ? <Link href={href} className="font-medium text-accent underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{children}</Link>
    : <a href={href} className="font-medium text-accent underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{children}</a>,
  hr: () => <hr className="my-14 border-line" />,
  table: ({ children }) => <div className="my-8 max-w-full overflow-x-auto rounded-sm border border-line" role="region" aria-label="Pool slide comparison table" tabIndex={0}><table className="w-full min-w-[42rem] border-collapse text-left text-sm leading-relaxed text-body">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-ink text-paper">{children}</thead>,
  th: ({ children }) => <th scope="col" className="min-w-36 border-r border-white/15 px-4 py-3 align-top font-semibold last:border-0">{children}</th>,
  td: ({ children }) => <td className="border-r border-t border-line px-4 py-4 align-top last:border-r-0">{children}</td>,
};

export function GuideMarkdown({ markdown }: { markdown: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{markdown}</ReactMarkdown>;
}
