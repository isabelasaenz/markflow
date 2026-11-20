import { countWords, countCharacters } from '../utils/markdown';

interface ToolbarProps {
  markdown: string;
}

export function Toolbar({ markdown }: ToolbarProps) {
  return (
    <div className="toolbar">
      <span className="toolbar-item">Palavras: {countWords(markdown)} </span>
      <span className="toolbar-item">Caracteres: {countCharacters(markdown)}</span>
    </div>
  );
}