import { download } from 'markdown-pdfjs';

export function exportToPDF(markdown: string, filename = 'documento.pdf') {
  download(markdown, { filename });
}