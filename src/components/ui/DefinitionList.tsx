/**
 * A definition list.
 *
 * Semantically correct markup for "term — meaning" content, and the shape an
 * answer engine can lift cleanly: the term, then the definition, with no
 * surrounding prose to disentangle.
 */
export function DefinitionList({
  items,
  tone = 'light',
}: {
  items: { term: string; definition: string }[];
  tone?: 'light' | 'dark';
}) {
  const termClass = tone === 'dark' ? 'text-on-dark-strong' : 'text-ink';
  const bodyClass = tone === 'dark' ? 'text-on-dark/80' : 'text-body';
  const ruleClass = tone === 'dark' ? 'border-white/10' : 'border-line';

  return (
    <dl className={`divide-y ${ruleClass} border-y ${ruleClass}`}>
      {items.map((item) => (
        <div key={item.term} className="grid gap-x-10 gap-y-2 py-6 lg:grid-cols-[16rem_1fr]">
          <dt className={`text-[1rem] font-medium ${termClass}`}>{item.term}</dt>
          <dd className={`text-[0.9375rem] leading-[1.75] ${bodyClass}`}>{item.definition}</dd>
        </div>
      ))}
    </dl>
  );
}