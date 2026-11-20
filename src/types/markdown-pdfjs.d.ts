declare module 'markdown-pdfjs' {
  export interface MarkdownPDFOptions {
    filename?: string;
    css?: string;
    header?: string;
    footer?: string;
    [key: string]: unknown;
  }

  export const MarkdownPDF: {
    download: (markdown: string, options?: MarkdownPDFOptions) => void;
  };

  export function download(markdown: string, options?: MarkdownPDFOptions): void;
  export function render(markdown: string, element: HTMLElement, options?: MarkdownPDFOptions): void;
}