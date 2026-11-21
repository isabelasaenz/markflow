import { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Toolbar } from './components/Toolbar';
import { exportToPDF } from './utils/pdf';

const STORAGE_KEY = 'markflow-content';
const DEFAULT_CONTENT = '# Meu Documento\n\nComece a escrever...';

function loadFromStorage(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CONTENT;
  } catch {
    return DEFAULT_CONTENT;
  }
}

export default function App() {
  const [markdown, setMarkdown] = useState(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, markdown);
    } catch {
      // localStorage indisponível (ex.: modo privado bloqueado)
    }
  }, [markdown]);

  return (
    <div className="app-container">
      <Toolbar onExportPDF={() => exportToPDF(markdown)} markdown={markdown} />
      <h1 className="app-title">MarkFlow</h1>
      <Editor value={markdown} onChange={setMarkdown} />
    </div>
  );
}