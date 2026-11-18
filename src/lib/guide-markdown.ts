export function headingId(text: string): string {
  return text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

export function guideParts(markdown: string) {
  const withoutH1 = markdown.trimStart().replace(/^# [^\r\n]+\r?\n/, '').trimStart();
  const firstH2 = withoutH1.search(/^## /m);
  if (firstH2 < 0) throw new Error('Guide V2 has no sections.');
  return {
    introduction: withoutH1.slice(0, firstH2).trim(),
    sections: withoutH1.slice(firstH2),
  };
}

export function guideHeadings(markdown: string) {
  return [...markdown.matchAll(/^(#{2,3}) (.+)$/gm)].map((match) => ({
    level: match[1].length,
    title: match[2].trim(),
    id: headingId(match[2].trim()),
  }));
}
