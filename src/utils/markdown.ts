export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function countHeadings(text: string): number {
  return (text.match(/^#{1,6}\s/gm) || []).length;
}

export function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Documento sem título';
}

export function sanitizeMarkdown(markdown: string): string {
  return markdown.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '');
}

export function toggleBold(text: string): string {
  return `**${text}**`;
}

export function toggleItalic(text: string): string {
  return `*${text}*`;
}

export function insertLink(text: string, url: string): string {
  return `[${text}](${url})`;
}

export function toggleCode(text: string): string {
  return `\`${text}\``;
}