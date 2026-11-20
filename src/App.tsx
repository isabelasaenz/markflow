import { useState } from 'react'
import './App.css'
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';

function App() {
  const [markdown, setMarkdown] = useState('Escreva aqui...');
  return (
    <div className="app-container">
      <h1 className="app-title">MarkFlow</h1>
      <Editor value={markdown} onChange={setMarkdown} />
      <Preview markdown={markdown} />
    </div>

  );
}

export default App
