import { download } from 'markdown-pdfjs';

export function exportToPDF(markdown: string, filename = 'documento.pdf'): boolean {
  try {
    download(markdown, { filename });
    return true;
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    return false;
  }
}