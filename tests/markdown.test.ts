import { describe, it, expect } from 'vitest';
import { countWords, extractTitle, countCharacters, countHeadings, sanitizeMarkdown } from '../src/utils/markdown';

describe('countWords', () => {
  it('retorna 0 para string vazia', () => {
    expect(countWords('')).toBe(0);
  });
  it('conta palavras separadas por espaço', () => {
    expect(countWords('olá mundo')).toBe(2);
  });
  it('ignora espaços extras', () => {
    expect(countWords('  um   dois  ')).toBe(2);
  });
  it('conta palavras com pontuação', () => {
    expect(countWords('Olá, mundo!')).toBe(2);
  });
});

describe('countCharacters', () => {
  it('retorna 0 para string vazia', () => {
    expect(countCharacters('')).toBe(0);
  });
  it('conta caracteres incluindo espaços', () => {
    expect(countCharacters('abc def')).toBe(7);
  });
  it('conta caracteres unicode', () => {
    expect(countCharacters('ação')).toBe(4);
  });
});

describe('countHeadings', () => {
  it('retorna 0 sem headings', () => {
    expect(countHeadings('texto normal')).toBe(0);
  });
  it('conta heading de nível 1', () => {
    expect(countHeadings('# Título')).toBe(1);
  });
  it('conta múltiplos headings', () => {
    expect(countHeadings('# A\n## B\n### C')).toBe(3);
  });
});

describe('extractTitle', () => {
  it('extrai título de heading nível 1', () => {
    expect(extractTitle('# Meu Título\nconteúdo')).toBe('Meu Título');
  });
  it('retorna fallback quando não há heading', () => {
    expect(extractTitle('sem título')).toBe('Documento sem título');
  });
  it('ignora headings de outros níveis', () => {
    expect(extractTitle('## Subtítulo')).toBe('Documento sem título');
  });
});

describe('sanitizeMarkdown', () => {
  it('remove tags script', () => {
    expect(sanitizeMarkdown('<script>alert("xss")</script>texto')).toBe('texto');
  });
  it('não altera texto normal', () => {
    expect(sanitizeMarkdown('**negrito**')).toBe('**negrito**');
  });
});