import { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Toolbar } from './components/Toolbar';
import { exportToPDF } from './utils/pdf';
import { extractTitle } from './utils/markdown';

const STORAGE_KEY = 'markflow-content';
const DEFAULT_CONTENT = '# Meu Documento\n\nComece a escrever...';

function loadFromStorage(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CONTENT;
  } catch {
    return DEFAULT_CONTENT;
  }
}

const THEME_KEY = 'markflow-theme';

export default function App() {
  const [markdown, setMarkdown] = useState(loadFromStorage);
  const [exporting, setExporting] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') ?? 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, markdown);
    } catch {
      // localStorage indisponível (ex.: modo privado bloqueado)
    }
  }, [markdown]);

  useEffect(() => {
    document.title = `${extractTitle(markdown)} – MarkFlow`;
  }, [markdown]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // localStorage indisponível
    }
  }, [theme]);

  function handleToggleTheme() {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  function handleExportPDF() {
    setExporting(true);
    const ok = exportToPDF(markdown);
    if (!ok) alert('Não foi possível exportar o PDF. Tente novamente.');
    setExporting(false);
  }

  return (
    <div className={`app-container app-${theme}`}>
      <Toolbar
          onExportPDF={handleExportPDF}
          markdown={markdown}
          exporting={exporting}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      <h1 className="app-title">MarkFlow</h1>
      <Editor value={markdown} onChange={setMarkdown} theme={theme} />
    </div>
  );
}