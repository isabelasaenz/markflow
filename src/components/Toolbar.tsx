import { countWords, countCharacters, estimateReadingTime } from '../utils/markdown';

interface ToolbarProps {
  markdown: string;
  onExportPDF: () => void;
  onNewDocument?: () => void;
  exporting?: boolean;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export function Toolbar({ markdown, onExportPDF, onNewDocument, exporting = false, theme = 'light', onToggleTheme }: ToolbarProps) {
  return (
    <div className="toolbar">
      <span className="toolbar-item">Palavras: {countWords(markdown)}</span>
      <span className="toolbar-item">Caracteres: {countCharacters(markdown)}</span>
      <span className="toolbar-item">Leitura: {estimateReadingTime(markdown)} min</span>
      <span className="toolbar-separator" />
      <button onClick={onToggleTheme} className="btn-theme" aria-label="Alternar tema">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <button onClick={onNewDocument} className="btn-new">
        Novo
      </button>
      <button onClick={onExportPDF} className="btn-export" disabled={exporting}>
        {exporting ? 'Exportando...' : 'Exportar PDF'}
      </button>
    </div>
  );
}