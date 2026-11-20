import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
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
