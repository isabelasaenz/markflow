declare module 'markdown-pdfjs' {
  export interface PDFOptions {
    filename?: string;
    css?: string;
    header?: string;
    footer?: string;
    [key: string]: unknown;
  }

  export function download(markdown: string, options?: PDFOptions): Promise<void>;
  export function downloadFromElement(element: HTMLElement, options?: PDFOptions): Promise<void>;
  export function render(markdown: string, element: HTMLElement, options?: PDFOptions): Promise<void>;
}