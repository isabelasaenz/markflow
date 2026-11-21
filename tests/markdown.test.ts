import { describe, it, expect } from 'vitest';
import { countWords, extractTitle, countCharacters, countHeadings, sanitizeMarkdown, toggleItalic, toggleBold, insertLink, toggleCode, estimateReadingTime } from '../src/utils/markdown';

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
  it('ignora quebras de linha', () => {
  expect(countWords('uma\nduas\ntrês')).toBe(3);
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

describe('toggleBold', () => {
  it('envolve o texto em asteriscos duplos', () => {
    expect(toggleBold('texto')).toBe('**texto**');
  });
  it('funciona com texto vazio', () => {
    expect(toggleBold('')).toBe('****');
  });
});

describe('toggleItalic', () => {
  it('envolve o texto em asteriscos simples', () => {
    expect(toggleItalic('texto')).toBe('*texto*');
  });
  it('funciona com texto contendo espaços', () => {
    expect(toggleItalic('duas palavras')).toBe('*duas palavras*');
  });
});

describe('insertLink', () => {
  it('cria link Markdown com texto e URL', () => {
    expect(insertLink('Google', 'https://google.com')).toBe('[Google](https://google.com)');
  });
  it('funciona com URL vazia', () => {
    expect(insertLink('texto', '')).toBe('[texto]()');
  });
});

describe('toggleCode', () => {
  it('envolve o texto em crases', () => {
    expect(toggleCode('const x = 1')).toBe('`const x = 1`');
  });
  it('funciona com texto vazio', () => {
    expect(toggleCode('')).toBe('``');
  });
});

describe('estimateReadingTime', () => {
  it('retorna 1 para texto vazio', () => {
    expect(estimateReadingTime('')).toBe(1);
  });
  it('retorna 1 para texto com menos de 200 palavras', () => {
    expect(estimateReadingTime('palavra '.repeat(100).trim())).toBe(1);
  });
  it('retorna 1 para exatamente 200 palavras', () => {
    expect(estimateReadingTime('palavra '.repeat(200).trim())).toBe(1);
  });
  it('retorna 2 para 201 palavras', () => {
    expect(estimateReadingTime('palavra '.repeat(201).trim())).toBe(2);
  });
  it('retorna 2 para 400 palavras', () => {
    expect(estimateReadingTime('palavra '.repeat(400).trim())).toBe(2);
  });
  it('retorna 3 para 401 palavras', () => {
    expect(estimateReadingTime('palavra '.repeat(401).trim())).toBe(3);
  });
});
