import { describe, it, expect, vi } from 'vitest';
import { exportToPDF } from '../src/utils/pdf';
import { MarkdownPDF } from 'markdown-pdfjs';

vi.mock('markdown-pdfjs', () => ({
  MarkdownPDF: { download: vi.fn() },
}));

describe('exportToPDF', () => {
  it('chama MarkdownPDF.download com o markdown e nome padrão', () => {
    exportToPDF('# Título');
    expect(MarkdownPDF.download).toHaveBeenCalledWith('# Título', { filename: 'documento.pdf' });
  });
  it('permite nome de arquivo customizado', () => {
    exportToPDF('texto', 'meu.pdf');
    expect(MarkdownPDF.download).toHaveBeenCalledWith('texto', { filename: 'meu.pdf' });
  });
});