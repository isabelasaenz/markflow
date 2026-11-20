export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function countHeadings(text: string): number {
  return (text.match(/^#{1,6}\s/gm) || []).length;
}