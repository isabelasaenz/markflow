import { describe, it, expect, vi } from 'vitest';
import { exportToPDF } from '../src/utils/pdf';

const downloadMock = vi.hoisted(() => vi.fn());

vi.mock('markdown-pdfjs', () => ({
  download: downloadMock,
}));

describe('exportToPDF', () => {
  it('chama MarkdownPDF.download com o markdown e nome padrão', () => {
    exportToPDF('# Título');
    expect(downloadMock).toHaveBeenCalledWith('# Título', { filename: 'documento.pdf' });
  });
  it('permite nome de arquivo customizado', () => {
    exportToPDF('texto', 'meu.pdf');
    expect(downloadMock).toHaveBeenCalledWith('texto', { filename: 'meu.pdf' });
  });
  it('retorna true quando a exportação é bem-sucedida', () => {
    downloadMock.mockImplementationOnce(() => {});
    expect(exportToPDF('# Título')).toBe(true);
  });
  it('retorna false e não lança exceção quando download falha', () => {
    downloadMock.mockImplementation(() => { throw new Error('falha'); });
    let result: boolean | undefined;
    expect(() => { result = exportToPDF('# Título'); }).not.toThrow();
    expect(result).toBe(false);
    downloadMock.mockReset();
  });
});