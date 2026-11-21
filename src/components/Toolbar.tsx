import { countWords, countCharacters } from '../utils/markdown';

interface ToolbarProps {
  markdown: string;
  onExportPDF: () => void;
  exporting?: boolean;
}

export function Toolbar({ markdown, onExportPDF, exporting = false }: ToolbarProps) {
  return (
    <div className="toolbar">
      <span className="toolbar-item">Palavras: {countWords(markdown)}</span>
      <span className="toolbar-item">Caracteres: {countCharacters(markdown)}</span>
      <button onClick={onExportPDF} className="btn-export" disabled={exporting}>
        {exporting ? 'Exportando...' : 'Exportar PDF'}
      </button>
    </div>
  );
}