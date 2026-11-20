import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Editor } from './components/Editor';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">MarkFlow</h1>
      <Editor />
    </div>
  );
}

export default App
