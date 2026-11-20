import { useState } from 'react';
import { Editor } from './components/Editor';
import { Toolbar } from './components/Toolbar';
import { exportToPDF } from './utils/pdf';

export default function App() {
  const [markdown, setMarkdown] = useState('# Meu Documento\n\nComece a escrever...');
  return (
    <div className="app-container">
      <Toolbar onExportPDF={() => exportToPDF(markdown)} markdown={markdown} />
      <h1 className="app-title">MarkFlow</h1>
      <Editor value={markdown} onChange={setMarkdown} />
    </div>
  );
}