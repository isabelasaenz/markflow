import { MarkdownPDF } from 'markdown-pdfjs';

export function exportToPDF(markdown: string, filename = 'documento.pdf') {
  MarkdownPDF.download(markdown, { filename });
}