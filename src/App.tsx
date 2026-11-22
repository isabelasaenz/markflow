import { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Toolbar } from './components/Toolbar';
import { ConfirmDialog } from './components/ConfirmDialog';
import { Toast } from './components/Toast';
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
  const [confirmingNew, setConfirmingNew] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
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
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timer);
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        handleExportPDF();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [markdown]);

  function handleNewDocument() {
    setConfirmingNew(true);
  }

  function handleConfirmNew() {
    setMarkdown(DEFAULT_CONTENT);
    setConfirmingNew(false);
  }

  function handleCancelNew() {
    setConfirmingNew(false);
  }

  function handleToggleTheme() {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  function handleExportPDF() {
    setExporting(true);
    const ok = exportToPDF(markdown);
    if (!ok) setErrorMessage('Não foi possível exportar o PDF. Tente novamente.');
    setExporting(false);
  }

  return (
    <div className={`app-root app-${theme}`}>
      <header className="app-header">
        <span className="app-logo">MarkFlow</span>
        {saved && <span className="app-saved">✓ Salvo</span>}
        <Toolbar
          onExportPDF={handleExportPDF}
          onNewDocument={handleNewDocument}
          markdown={markdown}
          exporting={exporting}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      </header>
      <main className="app-main">
        <Editor value={markdown} onChange={setMarkdown} theme={theme} />
      </main>
      {confirmingNew && (
        <ConfirmDialog
          message="Criar novo documento? O conteúdo atual será perdido."
          onConfirm={handleConfirmNew}
          onCancel={handleCancelNew}
        />
      )}
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </div>
  );
}
