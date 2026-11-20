import { countWords, countCharacters } from '../utils/markdown';

interface ToolbarProps {
  markdown: string;
  onExportPDF: () => void;
}

export function Toolbar({ markdown, onExportPDF }: ToolbarProps) {
  return (
    <div className="toolbar">
      <span className="toolbar-item">Palavras: {countWords(markdown) }</span>
      <span className="toolbar-item">Caracteres: {countCharacters(markdown)}</span>
      <button onClick={onExportPDF} className="btn-export">Exportar PDF</button>
    </div>
  );
}